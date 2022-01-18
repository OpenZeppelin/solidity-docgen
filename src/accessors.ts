import { ErrorDefinition, EventDefinition, FunctionDefinition, ModifierDefinition, ParameterList, VariableDeclaration } from 'solidity-ast';
import { findAll, isNodeType } from 'solidity-ast/utils';
import { NatSpec, parseNatspec } from './utils/natspec';
import { DocItemWithContext } from './site';
import { mapValues } from './utils/map-values';

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

function getParams(params: ParameterList, natspec: NatSpec): Param[] {
  return params.parameters.map(p => ({
    name: p.name,
    type: p.typeDescriptions.typeString!,
    natspec: natspec.params?.find(q => p.name === q.name)?.description,
  }));
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
        const name = accessors.name(item);
        return `${name}(${item.parameters.parameters.map(a => a.typeName?.typeDescriptions.typeString!).join(',')})`;
      }
    }
  },

  params(item: DocItemWithContext): Param[] | undefined {
    if (item.nodeType === 'FunctionDefinition') {
      const natspec = accessors.natspec(item);
      return getParams(item.parameters, natspec);
    }
  },

  returns(item: DocItemWithContext): Param[] | undefined {
    if (item.nodeType === 'FunctionDefinition') {
      const natspec = accessors.natspec(item);
      return getParams(item.returnParameters, natspec);
    }
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
};
