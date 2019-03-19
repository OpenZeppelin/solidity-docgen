import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import { promisify } from 'util';

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

export async function gatherMarkdownDocs(directories) {
  const pairs = await Promise.all(
    directories.map(async function (directory) {
      const readmeFile = path.join(directory, 'README.md');

      const readme = await exists(readmeFile)
        ? await readFile(readmeFile, 'utf8')
        : '';

      const docs = parseReadme(readme, directory);

      return [directory, docs];
    })
  );

  return _.fromPairs(pairs);
}

export function parseReadme(content, directory) {
  const frontMatter = parseFrontMatter(content, directory);

  const metadata = _.defaults(frontMatter, {
    get title() {
      const basename = path.basename(directory);
      return _.startCase(basename);
    },
  });

  const head = (frontMatter ? '' : '---\n---\n') + content;

  return {
    metadata,
    head,
  };
}

export function parseFrontMatter(content, directory) {
  const regexp = /^---$((?:(?!^---$).)*)^---$/ms;
  const matches = regexp.exec(content);

  if (!matches) {
    return undefined;
  }

  const yamlString = matches[1]

  try {
    return yaml.safeLoad(yamlString) || {};
  } catch (e) {
    const relativeDir = path.relative(process.cwd(), directory);
    throw new Error(`Front matter is invalid in ${relativeDir}.`);
  }
}
