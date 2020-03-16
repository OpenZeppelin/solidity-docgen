import { fromPairs, pick } from 'lodash';
import fs from 'fs-extra';
import semver from 'semver';

import { Output as SolcOutput } from './solc';
import { Filter } from './filter';

export const outputSelection = {
  '*': {
    '': [
      'ast',
    ],
  },
};

export async function compile(
  filter: Filter,
  solcModule: string = 'solc',
  solcSettings: object = {optimizer: {enabled: true, runs: 200}},
): Promise<SolcOutput> {
  const solc = await SolcAdapter.require(solcModule);

  const files = await filter.glob('*.sol');

  const sources = fromPairs(await Promise.all(files.map(async file => [
    file,
    { content: await fs.readFile(file, 'utf8') },
  ])));

  const solcInput = {
    language: "Solidity",
    sources: sources,
    settings: { ...solcSettings, outputSelection },
  };

  const solcOutput = solc.compile(solcInput);

  const { errors: allErrors } = solcOutput;
  if (allErrors && allErrors.some(e => e.severity === 'error')) {
    const errors = allErrors.filter(e => e.severity === 'error');
    const firstError = errors[0].formattedMessage;
    const moreErrors = errors.length === 1 ? '' : ` (And ${errors.length - 1} other errors...)`;
    throw new Error(`Solidity was unable to compile. ${firstError}${moreErrors}`);
  }

  return solcOutput;
}

export class SolcAdapter {
  static async require(solcModule: string): Promise<SolcAdapter> {
    const solc = await import(solcModule);
    return new SolcAdapter(solc);
  }

  constructor(private readonly solc: any) { }

  compile(input: object): SolcOutput {
    const inputJSON = JSON.stringify(input);

    const solcOutputString = semver.satisfies(this.solc.version(), '^0.6')
      ? this.solc.compile(inputJSON, { import: importCallback })
      : this.solc.compileStandardWrapper(inputJSON, importCallback);

    const solcOutput = JSON.parse(solcOutputString);

    if (semver.satisfies(this.solc.version(), '^0.4')) {
      for (const source of Object.values(solcOutput.sources) as any[]) {
        for (const fileNode of source.ast.nodes) {
          if (fileNode.nodeType === 'ContractDefinition') {
            for (const contractNode of fileNode.nodes) {
              if (contractNode.nodeType === 'FunctionDefinition') {
                if (contractNode.isConstructor) {
                  contractNode.kind = 'constructor';
                } else if (contractNode.name === '') {
                  contractNode.kind = 'fallback';
                } else {
                  contractNode.kind = 'function';
                }
              }
            }
          }
        }
      };
    }

    if (semver.satisfies(this.solc.version(), '^0.6')) {
      const adaptDocumentation = (node: any) => {
        if (node.documentation?.text) {
          node.documentation = node.documentation.text;
        }
      };
      for (const source of Object.values(solcOutput.sources) as any[]) {
        for (const fileNode of source.ast.nodes) {
          adaptDocumentation(fileNode);
          if (fileNode.nodeType === 'ContractDefinition') {
            for (const contractNode of fileNode.nodes) {
              adaptDocumentation(contractNode);
            }
          }
        }
      }
    }

    return solcOutput;
  }
}

type SolidityImport = { contents: string } | { error: string };

function importCallback(path: string): SolidityImport {
  try {
    return {
      contents: fs.readFileSync(path, 'utf8'),
    };
  } catch (e) {
    return {
      error: e.message,
    };
  }
}
