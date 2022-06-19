import { relative } from 'path';
import { ContractDefinition, SourceUnit } from 'solidity-ast';
import { SolcOutput, SolcInput } from 'solidity-ast/solc';
import { astDereferencer, ASTDereferencer, findAll } from 'solidity-ast/utils';
import { FullConfig } from './config';
import { DocItem, docItemTypes, isDocItem } from './doc-item';
import { clone } from './utils/clone';

export interface Build {
  input: SolcInput;
  output: SolcOutput;
}

export interface BuildContext extends Build {
  deref: ASTDereferencer;
}

export type SiteConfig = Pick<FullConfig, 'pages' | 'sourcesDir' | 'pageExtension'>;
export type PageStructure = SiteConfig['pages'];
export type PageAssigner = ((item: DocItem, file: SourceUnit, config: SiteConfig) => string | undefined);

const assignIfSource: (a: PageAssigner) => PageAssigner =
  assign => (item, file, config) =>
    file.absolutePath.startsWith(config.sourcesDir)
      ? assign(item, file, config)
      : undefined;

export const pageAssigner: Record<PageStructure & string, PageAssigner> = {
  single: assignIfSource((_1, _2, { pageExtension: ext }) => 'index' + ext),
  items: assignIfSource((item, _, { pageExtension: ext }) => item.name + ext),
  files: assignIfSource((_, file, { pageExtension: ext, sourcesDir }) =>
    relative(sourcesDir, file.absolutePath).replace('.sol', ext)
  ),
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
  page?: string;
  node: DocItemWithContext;
  contract?: ContractDefinition;
  file: SourceUnit;
  build: BuildContext;
}

export function buildSite(builds: Build[], siteConfig: SiteConfig): Site {
  const assign = typeof siteConfig.pages === 'string' ? pageAssigner[siteConfig.pages] : siteConfig.pages;

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

        const page = assign(topLevelItem, file, siteConfig);

        const withContext = Object.assign(topLevelItem, {
          __item_context: { page, node: topLevelItem as DocItemWithContext, file, build },
        });
        items.push(withContext);
        if (page !== undefined) {
          (pages[page] ??= []).push(withContext);
        }

        for (const node of findAll(docItemTypes, topLevelItem)) {
          if (node === topLevelItem) continue;
          const contract = topLevelItem.nodeType === 'ContractDefinition' ? topLevelItem : undefined;
          const __item_context: DocItemContext  = { page, node: node as DocItemWithContext, contract, file, build };
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
