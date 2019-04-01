import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import { promisify } from 'util';

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

export async function gatherMarkdownDocs(base, directories) {
  const pairs = await Promise.all(
    directories.map(async function (directory) {
      const readmeFile = path.join(base, directory, 'README.md');

      const readme = await exists(readmeFile)
        ? await readFile(readmeFile, 'utf8')
        : '';

      const docs = parseFrontMatter(readme, directory);

      return [directory, docs];
    })
  );

  return _.fromPairs(pairs);
}

export function parseFrontMatter(readme, directory) {
  const regexp = /^---$((?:(?!^---$)[^])*)^---$([^]*)/m;
  const matches = regexp.exec(readme);

  if (!matches) {
    return { intro: readme, frontMatter: undefined };
  }

  const yamlString = matches[1];
  const intro = matches[2];

  try {
    const frontMatter = yaml.safeLoad(yamlString) || {};
    return { intro, frontMatter };
  } catch (e) {
    const relativeDir = path.relative(process.cwd(), directory);
    throw new Error(`Front matter is invalid in ${relativeDir}.`);
  }
}
