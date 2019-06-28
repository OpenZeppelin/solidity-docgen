import { fromPairs } from 'lodash';
import path from 'path';
import fs from 'fs-extra';
import globby from 'globby';
import semver from 'semver';

import { Output as SolcOutput } from './solc';

const compilerSettings = {
  outputSelection: {
    '*': {
      '': [
        'ast',
      ],
      '*': [
        'abi',
        'devdoc',
        'evm.methodIdentifiers',
      ],
    },
  },
};

export async function compile(
  directory: string,
  ignore: string[] = [],
  solcModule: string = 'solc',
): Promise<SolcOutput> {
  const solc = await SolcAdapter.require(solcModule);

  const files = await globby(path.join(directory, '**/*.sol'), {
    ignore: ignore.map(i => path.join(i, '**/*')),
  });

  const sources = fromPairs(await Promise.all(files.map(async file => [
    file,
    { content: await fs.readFile(file, 'utf8') },
  ])));

  const solcInput = {
    language: "Solidity",
    sources: sources,
    settings: compilerSettings,
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

class SolcAdapter {
  static async require(solcModule: string): Promise<SolcAdapter> {
    const solc = await import(solcModule);
    return new SolcAdapter(solc);
  }

  constructor(private readonly solc: any) { }

  compile(input: object): SolcOutput {
    const inputJSON = JSON.stringify(input);

    const solcOutputString = this.solc.compileStandardWrapper(inputJSON);
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

    return solcOutput;
  }
}
