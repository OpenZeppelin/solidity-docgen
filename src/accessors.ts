import { ErrorDefinition, EventDefinition, FunctionDefinition, ModifierDefinition, VariableDeclaration } from 'solidity-ast';
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
    ...mapValues(accessors, fn => fn(item)),
    ...item,
  };
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

  signature(item: DocItemWithContext): string | undefined {
    switch (item.nodeType) {
      case 'ContractDefinition':
        return undefined;

      case 'FunctionDefinition': {
        return `${item.name}(${item.parameters.parameters.map(a => a.typeName?.typeDescriptions.typeString!).join(',')})`;
      }
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
