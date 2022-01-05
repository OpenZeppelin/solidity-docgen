import Handlebars, { RuntimeOptions } from 'handlebars';
import { Node, NodeType } from 'solidity-ast/node';
import { Site, Page, DocItemWithContext } from './site';
import { accessors, wrapWithAccessors } from './accessors';

export interface Templates {
  page: string;
  partials?: Record<string, string>;
  helpers?: Record<string, (...args: unknown[]) => string>;
}

export interface RenderedPage {
  id: string;
  contents: string;
}

interface TemplateOptions {
  data: {
    site: Site;
  };
}

export function render(site: Site, templates: Templates, collapseNewlines?: boolean): RenderedPage[] {
  const template = buildTemplate(templates);
  const rendered: RenderedPage[] = [];
  for (const page of site.pages) {
    let contents = template(page, { data: { site } });
    if (collapseNewlines) {
      contents = contents.replace(/\n{3,}/g, '\n\n');
    }
    rendered.push({
      id: page.id,
      contents,
    });
  }
  return rendered;
}

export const itemPartialName = (item: DocItemWithContext) => accessors.type(item).replace(' ', '').toLowerCase();

function itemPartial(item: DocItemWithContext, options?: RuntimeOptions) {
  if (!item.__item_context) {
    throw new Error(`Partial 'item' used in unsupported context (not a doc item)`);
  }
  const partial = options?.partials?.[itemPartialName(item)];
  if (!partial) {
    throw new Error(`Missing partial '${itemPartialName(item)}'`);
  }
  return partial(wrapWithAccessors(item), options);
}

function buildTemplate(templates: Templates): (page: Page, options: TemplateOptions) => string {
  const H = Handlebars.create();

  for (const [name, body] of Object.entries(templates.partials ?? {})) {
    H.registerPartial(name, H.compile(body));
  }

  for (const [name, fn] of Object.entries(templates.helpers ?? {})) {
    H.registerHelper(name, fn);
  }

  H.registerPartial('item', itemPartial);

  return H.compile(templates.page);
}
