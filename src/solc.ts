export interface Output {
  contracts: {
    [file: string]: FileData;
  };
  sources: {
    [file: string]: {
      ast: ast.SourceUnit;
    };
  };
  errors: {
    severity: 'error';
    formattedMessage: string;
  }[];
}

export interface FileData {
  [contract: string]: ContractData;
}

export interface ContractData {
}

export namespace ast {
  export interface SourceUnit {
    nodeType: 'SourceUnit';
    nodes: ContractDefinition[];
  }

  export interface ContractDefinition {
    nodeType: 'ContractDefinition';
    id: number;
    name: string;
    documentation: string | null;
    nodes: FunctionDefinition[];
    baseContracts: { 
      baseName: {
        referencedDeclaration: number;
      };
    }[];
  }

  export interface FunctionDefinition {
    nodeType: 'FunctionDefinition';
    kind: 'function' | 'constructor' | 'fallback';
    visibility: 'internal' | 'external' | 'public';
    name: string;
    documentation: string | null;
    parameters: {
      parameters: {
        typeName: {
          typeDescriptions: {
            typeString: string;
          };
        };
      }[];
    };
  }
}

// fake solc output builder for tests
export class SolcOutputBuilder implements Output {
  contracts: { [file: string]: FileData };
  sources: { [file: string]: { ast: ast.SourceUnit } };

  errors: [] = [];

  _currentFile: string;
  _currentContract: {
    data: ContractData;
    astNode: ast.ContractDefinition;
  };
  _nextId: number;
  _contractIds: { [contract: string]: number };

  constructor() {
    this.sources = {};
    this.contracts = {};
    this._nextId = 0;
    this._contractIds = {};
  }

  file(fileName: string) {
    this._currentFile = fileName;
    this.sources[fileName] = {
      ast: {
        nodeType: 'SourceUnit',
        nodes: [],
      },
    };
    this.contracts[fileName] = {};
    return this;
  }

  contract(contractName: string, ...baseContracts: string[]) {
    const fileName = this._currentFile;
    if (!fileName) throw new Error('No file defined');
    const astNode: ast.ContractDefinition = {
      nodeType: 'ContractDefinition',
      name: contractName,
      documentation: null,
      id: this._getContractId(contractName),
      baseContracts: baseContracts.map(baseName => ({
        baseName: {
          name: baseName,
          referencedDeclaration: this._getContractId(baseName),
        },
      })),
      nodes: [],
    };
    const data = {};
    this._currentContract = { astNode, data };
    this.sources[fileName].ast.nodes.push(astNode);
    this.contracts[fileName][contractName] = data;
    return this;
  }

  _getContractId(contractName: string) {
    if (contractName in this._contractIds) {
      return this._contractIds[contractName];
    } else {
      const id = this._nextId;
      this._nextId += 1;
      this._contractIds[contractName] = id;
      return id;
    }
  }

  function(functionName: string, ...argTypes: string[]) {
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
          typeName: {
            typeDescriptions: {
              typeString: t,
            },
          },
        })),
      },
    };
    this._currentContract.astNode.nodes.push(astNode);
    return this;
  }
}
