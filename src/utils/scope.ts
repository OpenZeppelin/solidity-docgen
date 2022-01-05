import { ContractDefinition, SourceUnit } from "solidity-ast";
import { findAll } from "solidity-ast/utils";
import { DocItemWithContext } from "../site";

export function getContractsInScope(item: DocItemWithContext) {
  const cache = new WeakMap<SourceUnit, Record<string, ContractDefinition>>();
  return run(item.__item_context.file);

  function run(
    file: SourceUnit,
    stack = new Set<SourceUnit>(),
    aliasedImport = false,
  ): Record<string, ContractDefinition> {
    if (stack.has(file)) {
      if (aliasedImport) {
        throw new Error('Circular dependency detected: aliased imports not supported');
      } else {
        return {};
      }
    }

    if (cache.has(file)) {
      return cache.get(file)!;
    }

    stack.add(file);

    const scope: Record<string, ContractDefinition> = {};

    for (const c of findAll('ContractDefinition', file)) {
      scope[c.name] = c;
    }

    for (const i of findAll('ImportDirective', file)) {
      const importedFile = item.__item_context.build.deref('SourceUnit', i.sourceUnit);
      const importedScope = run(importedFile, stack, aliasedImport || i.symbolAliases.length > 0);
      if (i.symbolAliases.length === 0) {
        Object.assign(scope, importedScope);
      } else {
        for (const a of i.symbolAliases) {
          scope[a.local ?? a.foreign.name] = importedScope[a.foreign.name]!;
        }
      }
    };

    stack.delete(file);

    cache.set(file, scope);
    return scope;
  }
}

