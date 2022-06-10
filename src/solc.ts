import { fromPairs, pick } from 'lodash';
import fs from 'fs';
import semver from 'semver';

import { Filter } from './filter';

export interface SolcOutput {
  sources: {
    [file: string]: {
      ast: ast.SourceUnit;
    };
  };
  errors: {
    severity: string;
    formattedMessage: string;
  }[];
}

export namespace ast {
  export interface SourceUnit {
    nodeType: 'SourceUnit';
    id: number;
    nodes: SourceItem[];
  }

  export type SourceItem = ContractDefinition | ImportDirective;

  export interface ImportDirective {
    nodeType: 'ImportDirective';
    id: number;
    sourceUnit: number;
    symbolAliases: {
      foreign: {
        name: string;
      };
      local?: null | string;
    }[]
  }

  export interface ContractDefinition {
    nodeType: 'ContractDefinition';
    id: number;
    name: string;
    documentation: string | null;
    nodes: ContractItem[];
    linearizedBaseContracts: number[];
  }

  export type ContractItem = VariableDeclaration | FunctionDefinition | EventDefinition | ModifierDefinition | StructDefinition | EnumDefinition;

  export interface VariableDeclaration {
    nodeType: 'VariableDeclaration';
    visibility: 'internal' | 'public' | 'private';
    name: string;
    constant: boolean;
    typeName: TypeName;
  }

  export interface FunctionDefinition {
    nodeType: 'FunctionDefinition';
    kind: 'function' | 'constructor' | 'fallback';
    visibility: 'internal' | 'external' | 'public' | 'private';
    name: string;
    documentation: string | null;
    parameters: ParameterList;
    returnParameters: ParameterList;
  }

  export interface EventDefinition {
    nodeType: 'EventDefinition';
    name: string;
    documentation: string | null;
    parameters: ParameterList;
  }

  export interface ModifierDefinition {
    nodeType: 'ModifierDefinition';
    name: string;
    documentation: string | null;
    parameters: ParameterList;
  }

  export interface StructDefinition {
    nodeType: 'StructDefinition';
    name: string;
    members: VariableDeclaration[];
    visibility: 'internal' | 'external' | 'public' | 'private';
  }

  export interface EnumDefinition {
    nodeType: 'EnumDefinition';
    name: string;
    members: EnumValue[];
  }

  export interface EnumValue {
    nodeType: 'EnumValue';
    id: number;
    name: string;
  }

  export interface ParameterList {
    parameters: {
      name: string;
      typeName: TypeName;
    }[];
  }

  export interface TypeName {
    nodeType: 'ElementaryTypeName' | 'UserDefinedTypeName';
    typeDescriptions: {
      typeString: string;
    };
  }
}

export const outputSelection = {
  '*': {
    '': [
      'ast',
    ],
  },
};

export async function compile(
  filter: Filter,
  solcModule: string = require.resolve('solc'),
  solcSettings: object = {optimizer: {enabled: true, runs: 200}},
): Promise<SolcOutput> {
  const solc = await SolcAdapter.require(solcModule);

  const files = await filter.glob('*.sol');

  const sources = fromPairs(await Promise.all(files.map(async file => [
    file,
    { content: await fs.promises.readFile(file, 'utf8') },
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

    const solcOutputString = semver.satisfies(this.solc.version(), '>=0.6')
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

    const reader = new ASTReader(input, solcOutput);

    const adaptDocumentation = (node: any) => {
      if (typeof node.documentation === 'string') {
        // fix solc buggy parsing of doc comments
        // reverse engineered from solc behavior...
        node.documentation = cleanUpDocstringFromSolc(node.documentation);
      } else if (node.documentation?.text !== undefined) {
        const source = reader.read(node.documentation);
        if (source !== undefined) {
          node.documentation = cleanUpDocstringFromSource(source);
        } else {
          node.documentation = cleanUpDocstringFromSolc(node.documentation.text);
        }
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

    return solcOutput;
  }
}

type SolidityImport = { contents: string } | { error: string };

function importCallback(path: string): SolidityImport {
  try {
    const resolved = require.resolve(path, { paths: ['.'] });
    return {
      contents: fs.readFileSync(resolved, 'utf8'),
    };
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
}

class ASTReader {
  constructor(private readonly input: any, private readonly output: any) {}

  read(node: { src: string }): string | undefined {
    const { source, start, length } = this.decodeSrc(node.src);
    const content = this.input.sources[source]?.content;
    if (content !== undefined) {
      return Buffer.from(content, 'utf8').slice(start, start + length).toString('utf8');
    }
  }

  private decodeSrc(src: string): { source: string; start: number; length: number } {
    const [start, length, sourceId] = src.split(':').map(s => parseInt(s));
    const source = Object.keys(this.output.sources).find(s => this.output.sources[s].id === sourceId);
    if (source === undefined) {
      throw new Error(`No source with id ${sourceId}`);
    }
    return { source, start, length };
  }
}

function cleanUpDocstringFromSolc(text: string) {
  // fix solc buggy parsing of doc comments
  // reverse engineered from solc behavior
  return text
    .replace(/\n\n?^[ \t]*(?:\*|\/\/\/)/mg, '\n\n')
    .replace(/^[ \t]?/mg, '');
}

function cleanUpDocstringFromSource(text: string) {
  return text
    .replace(/^\/\*\*(.*)\*\/$/s, '$1')
    .trim()
    .replace(/^[ \t]*(\*|\/\/\/)[ \t]?/mg, '');
}
