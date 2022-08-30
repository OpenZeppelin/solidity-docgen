import { ContractDefinition, SourceUnit } from "solidity-ast";
import { findAll } from "solidity-ast/utils";
import { DocItemWithContext } from "../site";
import { mapValues } from './map-values';

export function getContractsInScope(item: DocItemWithContext) {
  const cache = new WeakMap<SourceUnit, Record<string, () => ContractDefinition>>();
  return mapValues(run(item.__item_context.file), fn => fn());

  function run(
    file: SourceUnit,
    aliasedImport = false,
  ): Record<string, () => ContractDefinition> {
    if (cache.has(file)) {
      return cache.get(file)!;
    }

    const scope: Record<string, () => ContractDefinition> = {};

    cache.set(file, scope);

    for (const c of findAll('ContractDefinition', file)) {
      scope[c.name] = () => c;
    }

    for (const i of findAll('ImportDirective', file)) {
      const importedFile = item.__item_context.build.deref('SourceUnit', i.sourceUnit);
      const importedScope = run(importedFile, aliasedImport || i.symbolAliases.length > 0);
      if (i.symbolAliases.length === 0) {
        Object.assign(scope, importedScope);
      } else {
        for (const a of i.symbolAliases) {
          // Delayed function call supports circular dependencies
          scope[a.local ?? a.foreign.name] = importedScope[a.foreign.name] ?? (() => importedScope[a.foreign.name]!());
        }
      }
    };

    return scope;
  }
}

