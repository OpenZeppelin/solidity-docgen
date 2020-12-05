import { SolcOutput, ast } from './solc';

// fake solc output builder for tests
export class SolcOutputBuilder implements SolcOutput {
  sources: { [file: string]: { ast: ast.SourceUnit } };

  errors: [] = [];

  _currentFile?: string;
  _currentContract?: {
    astNode: ast.ContractDefinition;
  };
  _nextId: number;
  _contractIds: { [contract: string]: number };

  constructor() {
    this.sources = {};
    this._nextId = 0;
    this._contractIds = {};
  }

  file(fileName: string) {
    this._currentFile = fileName;
    this.sources[fileName] = {
      ast: {
        nodeType: 'SourceUnit',
        nodes: [],
        id: this._getNextId(),
      },
    };
    return this;
  }

  import(importedFileName: string, aliases: [string, string?][] = []) {
    const importedSourceUnit = this.sources[importedFileName]?.ast;
    if (importedSourceUnit === undefined) throw new Error('Imported file does not exist');
    const fileName = this._currentFile;
    if (fileName === undefined) throw new Error('No file defined');
    const astNode: ast.ImportDirective = {
      nodeType: 'ImportDirective',
      id: this._getNextId(),
      sourceUnit: importedSourceUnit.id,
      symbolAliases: aliases.map(([name, local]) => ({ foreign: { name }, local })),
    };
    this.sources[fileName].ast.nodes.push(astNode);
    return this;
  }

  contract(contractName: string, ...baseContracts: string[]) {
    const fileName = this._currentFile;
    if (fileName === undefined) throw new Error('No file defined');
    const id = this._getContractId(contractName);
    const astNode: ast.ContractDefinition = {
      nodeType: 'ContractDefinition',
      name: contractName,
      documentation: null,
      id,
      linearizedBaseContracts: [id].concat(
        // this isn't really linearizing, but it'll do
        baseContracts.map(name => this._getContractId(name))
      ),
      nodes: [],
    };
    this._currentContract = { astNode };
    this.sources[fileName].ast.nodes.push(astNode);
    return this;
  }

  _getContractId(contractName: string) {
    if (contractName in this._contractIds) {
      return this._contractIds[contractName];
    } else {
      const id = this._getNextId();
      this._contractIds[contractName] = id;
      return id;
    }
  }

  _getNextId() {
    const id = this._nextId;
    this._nextId += 1;
    return id;
  }

  function(functionName: string, ...argTypes: string[]) {
    const contract = this._currentContract;
    if (contract === undefined) throw new Error('No contract defined');
    const kind =
      functionName === 'fallback' || functionName === 'constructor'
      ? functionName
      : 'function';
    const astNode: ast.FunctionDefinition = {
      nodeType: 'FunctionDefinition',
      kind,
      visibility: 'public',
      name: functionName,
      documentation: null,
      parameters: {
        parameters: argTypes.map(t => ({
          name: '',
          typeName: {
            nodeType: 'ElementaryTypeName',
            typeDescriptions: {
              typeString: t,
            },
          },
        })),
      },
      returnParameters: {
        parameters: [],
      },
    };
    contract.astNode.nodes.push(astNode);
    return this;
  }

  variable(variableName: string, typeString: string) {
    const contract = this._currentContract;
    if (contract === undefined) throw new Error('No contract defined');
    const astNode: ast.VariableDeclaration = {
      nodeType: 'VariableDeclaration',
      visibility: 'public',
      name: variableName,
      constant: false,
      typeName: {
        nodeType: 'ElementaryTypeName',
        typeDescriptions: {
          typeString,
        },
      },
    }
    contract.astNode.nodes.push(astNode);
    return this;
  }
}
