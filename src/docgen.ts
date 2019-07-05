import path from 'path';
import Handlebars from 'handlebars';
import fs from 'fs-extra';
import globby from 'globby';

import { VFile } from './vfile';
import { compile } from './compile';
import { SoliditySource, SolidityContract } from './solidity';
import { ReadmeSitemap, Reference } from './sitemap';

interface Options {
  contractsDir: string;
  outputDir: string;
  contractTemplate?: string;
  preludeTemplate?: string;
  ignore?: string[];
  solcModule?: string;
}

interface Templates {
  contract: (c: SolidityContract) => string;
  prelude: (s: { references: Reference[] }) => string;
}

export async function docgen(options: Options) {
  const solcOutput = await compile(options.contractsDir, options.ignore, options.solcModule);
  const templates = await getTemplates(options.contractTemplate, options.preludeTemplate);
  const readmes = await getReadmes(options.contractsDir);
  const source = new SoliditySource(options.contractsDir, solcOutput, templates.contract);
  const sitemap = new ReadmeSitemap(source, readmes);

  for (const page of sitemap.pages) {
    const dest = path.join(options.outputDir, page.path);
    await fs.outputFile(dest, page.render(templates.prelude));
  }
}

async function getReadmes(contractsDir: string): Promise<VFile[]> {
  const readmes = await globby(path.join(contractsDir, '**/README.*'));
  return await Promise.all(
    readmes.map(async readmePath => ({
      path: path.relative(contractsDir, readmePath),
      contents: await fs.readFile(readmePath, 'utf8'),
    }))
  );
}

async function getTemplates(contractTemplate?: string, preludeTemplate?: string): Promise<Templates> {
  const contract = await readTemplate(resolve('../contract.hbs'), contractTemplate);
  const prelude = await readTemplate(resolve('../prelude.hbs'), preludeTemplate);
  return { contract, prelude };
}

async function readTemplate(defaultPath: string, path: string = defaultPath): Promise<(data: any) => string> {
  const template = await fs.readFile(path, 'utf8');
  return Handlebars.compile(template);
}

function resolve(relativePath: string): string {
  return path.resolve(__dirname, relativePath);
}
