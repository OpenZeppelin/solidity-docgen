import path from 'path';
import handlebars from 'handlebars';
import fs from 'fs-extra';
import globby from 'globby';

import { VFile } from './vfile';
import { compile } from './compile';
import { SoliditySource, SolidityContract } from './solidity';
import { ReadmeSitemap, Link } from './sitemap';

interface Options {
  input: string;
  output: string;
  templates?: string;
  exclude?: string[];
  solcModule?: string;
}

interface Templates {
  contract: (c: SolidityContract) => string;
  prelude: (s: { links: Link[] }) => string;
}

export async function docgen(options: Options) {
  registerHandlebarsHelpers();
  const solcOutput = await compile(options.input, options.exclude, options.solcModule);
  const templates = await getTemplates(options.templates);
  const readmes = await getReadmes(options.input);
  const source = new SoliditySource(options.input, solcOutput, templates.contract);
  const sitemap = new ReadmeSitemap(source, readmes);

  for (const page of sitemap.pages) {
    const dest = path.join(options.output, page.path);
    await fs.outputFile(dest, page.render(templates.prelude));
  }
}

async function getReadmes(inputDir: string): Promise<VFile[]> {
  const readmes = await globby(path.join(inputDir, '**/README.*'));
  return await Promise.all(
    readmes.map(async readmePath => ({
      path: path.relative(inputDir, readmePath),
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

function registerHandlebarsHelpers() {
  handlebars.registerHelper('slug', str => str.replace(/\W/g, '-'));
}
