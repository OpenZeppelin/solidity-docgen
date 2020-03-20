export interface Output {
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
    nodes: ContractItem[];
    linearizedBaseContracts: number[];
  }

  export type ContractItem = VariableDeclaration | FunctionDefinition | EventDefinition | ModifierDefinition;

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
