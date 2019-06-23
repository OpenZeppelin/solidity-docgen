export interface Output {
  contracts: {
    [file: string]: FileData;
  };
  sources: {
    [file: string]: ast.SourceUnit;
  };
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
    name: string;
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
