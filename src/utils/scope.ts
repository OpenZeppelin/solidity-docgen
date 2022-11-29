import { ContractDefinition, SourceUnit } from "solidity-ast";
import { findAll, isNodeType } from "solidity-ast/utils";
import { DocItemWithContext } from "../site";
import { filterValues, mapValues } from './map-values';

export function getContractsInScope(item: DocItemWithContext) {
  const cache = new WeakMap<SourceUnit, Record<string, () => Definition>>();

  return filterValues(
    mapValues(run(item.__item_context.file), getDef => getDef()),
    isNodeType('ContractDefinition'),
  );

  type Definition = SourceUnit['nodes'][number] & { name: string };

  function run(file: SourceUnit): Record<string, () => Definition> {
    if (cache.has(file)) {
      return cache.get(file)!;
    }

    const scope: Record<string, () => Definition> = {};

    cache.set(file, scope);

    for (const c of file.nodes) {
      if ('name' in c) {
        scope[c.name] = () => c;
      }
    }

    for (const i of findAll('ImportDirective', file)) {
      const importedFile = item.__item_context.build.deref('SourceUnit', i.sourceUnit);
      const importedScope = run(importedFile);
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

