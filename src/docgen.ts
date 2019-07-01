import path from 'path';
import Handlebars from 'handlebars';
import fs from 'fs-extra';
import globby from 'globby';

import { compile } from './compile';
import { SoliditySource } from './solidity';
import { Page } from './page';

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

  const readmes = await globby(path.join(options.contractsDir, '**/README.*'));

  const pages = await Promise.all(
    readmes.map(async readmePath =>
      Page.parse(
        path.relative(options.contractsDir, readmePath),
        await fs.readFile(readmePath, 'utf8'),
        source,
      )
    )
  );

  const template = await getTemplate(options.templateFile);

  for (const page of pages) {
    const dest = path.join(options.outputDir, page.outputFile);
    await fs.outputFile(dest, template(page));
  }
}

async function getTemplate(templatePath?: string): Promise<Handlebars.TemplateDelegate> {
  if (templatePath === undefined) {
    templatePath = path.resolve(__dirname, '../page.hbs');
  }

  const template = await fs.readFile(templatePath, 'utf8');
  return Handlebars.compile(template);
}
