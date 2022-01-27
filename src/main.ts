import path from 'path';
import { promises as fs } from 'fs';
import { SolcOutput } from 'solidity-ast/solc';
import { render, Templates } from './render';
import { Build, PageAssigner, buildSite } from './site';
import { exists, findIn } from './utils/fs-exists';
import { ensureArray } from './utils/ensure-array';
import { Config, defaults } from './config';

/**
 * Given a set of builds (i.e. solc outputs) and a user configuration, this
 * function builds the site and renders it, writing all pages to the output
 * directory.
 */
export async function main(builds: Build[], userConfig?: Config): Promise<void> {
  const config = { ...defaults, ...userConfig };

  const site = buildSite(builds, config.pages);

  const templates = await readTemplates(ensureArray(config.templates), config.root);
  const renderedSite = render(site, templates, config.collapseNewlines);

  for (const { id, contents } of renderedSite) {
    const outputFile = path.resolve(config.root, config.output, id);
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, contents);
  }
}

/**
 * The array of strings containing either directory paths or built-in names is
 * searched sequentially for templates and helpers, and merged into an object.
 */
export async function readTemplates(templates: string[], root: string): Promise<Templates> {
  const partials: Record<string, string> = {};
  const helpers: Record<string, any> = {};

  for (const nameOrPath of templates) {
    // Look in src because built-in templates are not copied to dist
    const templatesDir = await findIn(nameOrPath, [root, path.join(__dirname, '../src/templates')]);
    if (templatesDir === undefined) {
      throw new Error(`Templates directory '${nameOrPath}' not found`);
    }

    for (const t of await fs.readdir(templatesDir)) {
      const { name, ext } = path.parse(t);
      if (!(name in partials) && ext === '.hbs') {
        partials[name] = await fs.readFile(path.join(templatesDir, t), 'utf8');
      }
    }

    const helpersDir = await findIn(nameOrPath, [root, path.join(__dirname, './templates')]);
    if (helpersDir === undefined) {
      throw new Error(`Templates directory '${nameOrPath}' not found`);
    }

    const h = await import(path.join(helpersDir, 'helpers')).catch(() => undefined);
    for (const name in h) {
      if (!(name in helpers) && typeof h[name] === 'function') {
        helpers[name] = h[name];
      }
    }
  }

  if (partials.page === undefined) {
    throw new Error(`Missing 'page' template`);
  }

  return {
    page: partials.page,
    partials,
    helpers,
  };
}
