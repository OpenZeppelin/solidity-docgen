import { relative } from 'path';
import { ContractDefinition, SourceUnit } from 'solidity-ast';
import { SolcOutput, SolcInput } from 'solidity-ast/solc';
import { astDereferencer, ASTDereferencer, findAll } from 'solidity-ast/utils';
import { Config } from './config';
import { DocItem, docItemTypes, isDocItem } from './doc-item';
import { clone } from './utils/clone';

export interface Build {
  input: SolcInput;
  output: SolcOutput;
}

export interface BuildContext extends Build {
  deref: ASTDereferencer;
}

export type PageStructure = NonNullable<Config['pages']>;

export type PageAssigner = ((item: DocItem, file: SourceUnit, config: Required<Config>) => string | undefined);

const pageAssigner: Record<PageStructure & string, PageAssigner> = {
  single: () => 'index.md',
  items: (item) => item.name,
  files: (_, file, config) =>
    file.absolutePath.startsWith(config.sourcesDir)
      ? relative(config.sourcesDir, file.absolutePath).replace('.sol', '.md')
      : file.absolutePath,
};

export interface Site {
  items: DocItemWithContext[];
  pages: Page[];
}

export interface Page {
  id: string;
  items: DocItemWithContext[];
}

export const DOC_ITEM_CONTEXT = '__item_context' as const;
export type DocItemWithContext = DocItem & { [DOC_ITEM_CONTEXT]: DocItemContext };

export interface DocItemContext {
  page: string;
  node: DocItem;
  contract?: ContractDefinition;
  file: SourceUnit;
  build: BuildContext;
}

export function buildSite(builds: Build[], pageStructure: PageStructure): Site {
  const assign = typeof pageStructure === 'string' ? pageAssigner[pageStructure] : pageStructure;

  const seen = new Set<string>();
  const items: DocItemWithContext[] = [];
  const pages: Record<string, DocItemWithContext[]> = {};

  for (const originalBuild of builds) {
    // Clone because we will mutate in order to add item context.
    const output = clone(originalBuild.output);
    const input = clone(originalBuild.input);
    const deref = astDereferencer(output);
    const build = { input, output, deref };

    for (const { ast: file } of Object.values(build.output.sources)) {
      // Some files may appear in different builds but we only use one.
      if (seen.has(file.src)) continue;
      seen.add(file.src);

      for (const topLevelItem of file.nodes) {
        if (!isDocItem(topLevelItem)) continue;

        const page = assign(topLevelItem, file);
        if (page === undefined) continue;

        const withContext = Object.assign(topLevelItem, {
          __item_context: { page, node: topLevelItem, file, build },
        });
        items.push(withContext);
        (pages[page] ??= []).push(withContext);

        for (const node of findAll(docItemTypes, topLevelItem)) {
          if (node === topLevelItem) continue;
          const contract = topLevelItem.nodeType === 'ContractDefinition' ? topLevelItem : undefined;
          const __item_context: DocItemContext  = { page, node, contract, file, build };
          Object.assign(node, { __item_context });
        }
      }
    }
  }

  return {
    items,
    pages: Object.entries(pages).map(([id, items]) => ({ id, items })),
  };
}
