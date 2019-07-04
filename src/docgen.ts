import path from 'path';
import Handlebars from 'handlebars';
import fs from 'fs-extra';
import globby from 'globby';

import { compile } from './compile';
import { SoliditySource } from './solidity';
import { Page } from './page';
import { crossreferencer } from './crossreferences';

interface Options {
  contractsDir: string;
  outputDir: string;
  templateFile?: string;
  ignore?: string[];
  solcModule?: string;
}

export async function docgen(options: Options) {
  const solcOutput = await compile(options.contractsDir, options.ignore, options.solcModule);
  const source = new SoliditySource(options.contractsDir, solcOutput);
  const pages = await getPages(options.contractsDir, source);
  const template = await getTemplate(options.templateFile);
  const crossreference = crossreferencer(pages);

  for (const page of pages) {
    const dest = path.join(options.outputDir, page.outputFile);
    await fs.outputFile(dest, crossreference(page.outputFile, template(page)));
  }
}

async function getPages(contractsDir: string, source: SoliditySource): Promise<Page[]> {
  const readmes = await globby(path.join(contractsDir, '**/README.*'));

  if (readmes.length === 0) {
    return [new Page('README.md', {}, '', source)];
  } else {
    return await Promise.all(
      readmes.map(async readmePath =>
        Page.parse(
          path.relative(contractsDir, readmePath),
          await fs.readFile(readmePath, 'utf8'),
          source,
        )
      )
    );
  }
}

const defaultTemplatePath = path.resolve(__dirname, '../page.hbs');

async function getTemplate(templatePath: string = defaultTemplatePath): Promise<Handlebars.TemplateDelegate> {
  const template = await fs.readFile(templatePath, 'utf8');
  return Handlebars.compile(template);
}
