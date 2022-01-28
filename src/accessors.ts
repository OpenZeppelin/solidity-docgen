import { EnumDefinition, ErrorDefinition, EventDefinition, FunctionDefinition, ModifierDefinition, ParameterList, StructDefinition, UserDefinedValueTypeDefinition, VariableDeclaration } from 'solidity-ast';
import { findAll, isNodeType } from 'solidity-ast/utils';
import { NatSpec, parseNatspec } from './utils/natspec';
import { DocItemWithContext } from './site';
import { mapValues } from './utils/map-values';
import { DocItem, docItemTypes } from './doc-item';

type TypeDefinition = StructDefinition | EnumDefinition | UserDefinedValueTypeDefinition;

/**
 * Returns a new object with all of the item properties plus the accessors
 * applied to the item. The accessors are not reflected in the return type
 * because we assume they are only used in templates, which are untyped anyway.
 */
export function wrapWithAccessors(item: DocItemWithContext): DocItemWithContext {
  return {
    ...item,
    ...mapValues(accessors, fn => fn(item)),
  };
}

type Param = {
  name: string;
  type: string;
  natspec?: string;
};

function getParams(params: ParameterList, natspec: NatSpec['params'] | NatSpec['returns']): Param[] {
  return params.parameters.map((p, i) => ({
    name: p.name,
    type: p.typeDescriptions.typeString!,
    natspec: natspec?.find((q, j) => q.name === undefined ? i === j : p.name === q.name)?.description,
  }));
}

function formatVariable(v: VariableDeclaration): string {
  return [v.typeName?.typeDescriptions.typeString!].concat(v.name || []).join(' ');
}

export const accessors = {
  type(item: DocItemWithContext): string {
    return item.nodeType
      .replace(/(Definition|Declaration)$/, '')
      .replace(/(\w)([A-Z])/g, '$1 $2');
  },

  natspec(item: DocItemWithContext): NatSpec {
    return parseNatspec(item);
  },

  name(item: DocItemWithContext): string {
    if (item.nodeType === 'FunctionDefinition') {
      return item.kind === 'function' ? item.name : item.kind;
    } else {
      return item.name;
    }
  },

  signature(item: DocItemWithContext): string | undefined {
    switch (item.nodeType) {
      case 'ContractDefinition':
        return undefined;

      case 'FunctionDefinition': {
        const { kind, name } = item;
        const params = item.parameters.parameters;
        const returns = item.returnParameters.parameters;
        const head = (kind === 'function' || kind === 'freeFunction') ? [kind, name].join(' ') : kind;
        let res = [
          `${head}(${params.map(formatVariable).join(', ')})`,
          item.visibility,
        ];
        if (item.stateMutability !== 'nonpayable') {
          res.push(item.stateMutability);
        }
        if (item.virtual) {
          res.push('virtual');
        }
        if (returns.length > 0) {
          res.push(`returns (${returns.map(formatVariable).join(', ')})`);
        }
        return res.join(' ');
      }

      case 'EventDefinition': {
        const params = item.parameters.parameters;
        return `event ${item.name}(${params.map(formatVariable).join(', ')})`;
      }

      case 'ErrorDefinition': {
        const params = item.parameters.parameters;
        return `error ${item.name}(${params.map(formatVariable).join(', ')})`;
      }

      case 'ModifierDefinition': {
        const params = item.parameters.parameters;
        return `modifier ${item.name}(${params.map(formatVariable).join(', ')})`;
      }

      case 'VariableDeclaration':
        return formatVariable(item);
    }
  },

  params(item: DocItemWithContext): Param[] | undefined {
    if ('parameters' in item) {
      const natspec = accessors.natspec(item);
      return getParams(item.parameters, natspec.params);
    }
  },

  returns(item: DocItemWithContext): Param[] | undefined {
    if ('returnParameters' in item) {
      const natspec = accessors.natspec(item);
      return getParams(item.returnParameters, natspec.returns);
    }
  },

  items(item: DocItemWithContext): DocItem[] | undefined {
    return (item.nodeType === 'ContractDefinition')
      ? item.nodes.filter(isNodeType(docItemTypes))
      : undefined;
  },

  functions(item: DocItemWithContext): FunctionDefinition[] | undefined {
    return [...findAll('FunctionDefinition', item)];
  },

  events(item: DocItemWithContext): EventDefinition[] | undefined {
    return [...findAll('EventDefinition', item)];
  },

  modifiers(item: DocItemWithContext): ModifierDefinition[] | undefined {
    return [...findAll('ModifierDefinition', item)];
  },

  errors(item: DocItemWithContext): ErrorDefinition[] | undefined {
    return [...findAll('ErrorDefinition', item)];
  },

  variables(item: DocItemWithContext): VariableDeclaration[] | undefined {
    return (item.nodeType === 'ContractDefinition')
      ? item.nodes.filter(isNodeType('VariableDeclaration')).filter(v => v.stateVariable)
      : undefined;
  },

  types(item: DocItemWithContext): TypeDefinition[] | undefined {
    return [...findAll(['StructDefinition', 'EnumDefinition', 'UserDefinedValueTypeDefinition'], item)];
  },
};
