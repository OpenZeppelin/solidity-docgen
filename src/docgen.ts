import path from 'path';
import fs from 'fs-extra';
import globby from 'globby';

import * as handlebars from './handlebars';
import { VFile } from './vfile';
import { compile } from './compile';
import { Source, SourceContract } from './source';
import { Sitemap, Link } from './sitemap';
import { Filter } from './filter';

interface Options {
  input: string;
  output: string;
  templates?: string;
  exclude?: string[];
  extension: string;
  'solc-module'?: string;
  'solc-settings'?: object;
  'contract-pages': boolean;
}

interface Templates {
  contract: handlebars.Template<SourceContract>;
  prelude: handlebars.Template<{ links: Link[] }>;
}

export async function docgen(options: Options) {
  const filter = new Filter(options.input, options.exclude);

  const solcOutput = await compile(filter, options['solc-module'], options['solc-settings']);
  const templates = await getTemplates(options.templates);
  const readmes = await getReadmes(filter);

  const source = new Source(options.input, solcOutput, templates.contract);
  const sitemap = Sitemap.generate(source, filter, readmes, options.extension, options['contract-pages']);

  for (const page of sitemap.pages) {
    const dest = path.join(options.output, page.path);
    await fs.outputFile(dest, page.render(templates.prelude));
  }
}

async function getReadmes(filter: Filter): Promise<VFile[]> {
  const readmes = await filter.glob('README.*');
  return await Promise.all(
    readmes.map(async readmePath => ({
      path: path.relative(filter.root, readmePath),
      contents: await fs.readFile(readmePath, 'utf8'),
    }))
  );
}

async function getTemplates(directory?: string): Promise<Templates> {
  if (directory === undefined) {
    directory = path.join(__dirname, '..');
  }
  const contract = await readTemplate(path.join(directory, 'contract.hbs'));
  const prelude = await readTemplate(path.join(directory, 'prelude.hbs'), true);
  return { contract, prelude };
}

async function readTemplate(path: string, allowMissing: boolean = false): Promise<(data: any) => string> {
  try {
    const template = await fs.readFile(path, 'utf8');
    return handlebars.compile(template);
  } catch (e) {
    if (e.code === 'ENOENT' && allowMissing) {
      // default to empty template
      return () => '';
    } else {
      throw e;
    }
  }
}
