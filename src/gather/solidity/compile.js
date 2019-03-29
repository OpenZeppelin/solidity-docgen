import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import solc from 'solc';
import process from 'process';
import { promisify } from 'util';

const globAsync = promisify(glob);
const readFileAsync = promisify(fs.readFile);

const compilerSettings = {
  outputSelection: {
    '*': {
      '': [
        'ast',
      ],
      '*': [
        'abi',
        'devdoc',
        'evm.methodIdentifiers',
      ],
    },
  },
};

export async function compile(directory, ignore) {
  const files = await globAsync(path.join(directory, '**/*.sol'), {
    ignore: ignore.map(i => path.join(i, '**/*')),
  });

  const sources = _.fromPairs(await Promise.all(files.map(async file => [
    file,
    { content: await readFileAsync(file, 'utf8') },
  ])));

  const inputJSON = {
    language: "Solidity",
    sources: sources,
    settings: compilerSettings,
  };

  const solcOutputString = solc.compile(JSON.stringify(inputJSON));
  const solcOutput = JSON.parse(solcOutputString);

  if (_.some(solcOutput.errors, ['severity', 'error'])) {
    console.error(solcOutput.errors);
    throw new Error();
  }

  return solcOutput;
}
