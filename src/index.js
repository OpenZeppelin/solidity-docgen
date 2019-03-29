import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import { promisify } from 'util';
import { gatherDocs } from './gather';
import { renderDocs } from './render';

const mkdirpAsync = promisify(mkdirp);
const writeFileAsync = promisify(fs.writeFile);

export async function renderDirectoryDocs(directory, ignore) {
  const docs = await gatherDocs(directory, ignore);
  return _.mapValues(docs, renderDocs);
}

export async function writeDocs(docs, outputDirectory) {
  await Promise.all(Object.keys(docs).map(async function (name) {
    const outputFile = path.format({
      dir: outputDirectory,
      ext: '.md',
      name,
    });
    await mkdirpAsync(path.dirname(outputFile));
    await writeFileAsync(outputFile, docs[name]);
  }));
}

export async function renderAndWriteDirectoryDocs(directory, outputDirectory, ignore) {
  const docs = await renderDirectoryDocs(directory, ignore);
  await writeDocs(docs, outputDirectory);
}
