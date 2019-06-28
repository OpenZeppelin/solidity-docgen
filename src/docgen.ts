import yaml from 'js-yaml';
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
  template: string;
  ignore: string[];
  solcModule?: string;
}

export async function docgen(options: Options) {
  const solcOutput = await compile(options.contractsDir, options.ignore, options.solcModule);
  const source = new SoliditySource(options.contractsDir, solcOutput);

  const readmes = await globby(path.join(options.contractsDir, '**/README.*'));

  const pages = await Promise.all(
    readmes.map(async readmePath => {
      const contents = await fs.readFile(readmePath, 'utf8');
      const { frontmatterData, intro } = parsePage(contents);

      return new Page(
        path.relative(options.contractsDir, readmePath),
        frontmatterData,
        intro,
        source,
      );
    })
  );

  const template = await getTemplate(options.template);

  for (const page of pages) {
    const dest = path.join(options.outputDir, page.outputFile);
    await fs.outputFile(dest, template(page));
  }
}

function parsePage(contents: string): { frontmatterData: {}, intro: string } {
  const match = // non-null assertion because this regexp always matches
    contents.match(/^(?:---\n([^]*?\n)?---\n)?([^]*)$/)!;
  const frontmatterData = match[1] ? yaml.safeLoad(match[1]) : {};
  const intro = match[2];
  return { frontmatterData, intro };
}

async function getTemplate(templatePath: string): Promise<Handlebars.TemplateDelegate> {
  const template = await fs.readFile(templatePath, 'utf8');
  return Handlebars.compile(template);
}
