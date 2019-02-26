import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob);
const readFileAsync = promisify(fs.readFile);

export async function gatherMarkdownDocs(directory) {
  const files = await globAsync(path.join(directory, '**/README.md'));

  const pairs = await Promise.all(
    files.map(async function (file) {
      const content = await readFileAsync(file, 'utf8');
      const fileDirectory = path.dirname(path.relative(directory, file));
      return [fileDirectory, content];
    })
  );

  return _.fromPairs(pairs);
}
