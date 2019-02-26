import _ from 'lodash';
import path from 'path';
import glob from 'glob';
import solc from 'solc';
import process from 'process';
import { promisify } from 'util';
import { gatherSources } from '@resolver-engine/imports';
import { ImportsFsEngine } from '@resolver-engine/imports-fs';

const globAsync = promisify(glob);

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

export async function compile(directory) {
  const files = await globAsync(path.join(directory, '**/*.sol'));
  const sourceObjects = await gatherSources(files, process.cwd(), ImportsFsEngine());
  const sources = _.fromPairs(sourceObjects.map(source => [source.name, { content: source.source }]));

  const inputJSON = {
    language: "Solidity",
    sources: sources,
    settings: compilerSettings,
  };

  const solcOutputString = solc.compile(JSON.stringify(inputJSON));
  const solcOutput = JSON.parse(solcOutputString);

  if (solcOutput.errors) {
    console.error(solcOutput.errors);
    throw new Error();
  }

  return solcOutput;
}
