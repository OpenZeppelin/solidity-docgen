import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import { promisify } from 'util';

// @ts-ignore
import solc from 'solc';

import { Output as SolcOutput } from './solc';

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

export async function compile(
  directory: string,
  ignore: string[],
): Promise<SolcOutput> {

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
  const solcOutput: SolcOutput = JSON.parse(solcOutputString);

  const { errors: allErrors } = solcOutput;
  if (allErrors && allErrors.some(e => e.severity === 'error')) {
    const errors = allErrors.filter(e => e.severity === 'error');
    const firstError = errors[0].formattedMessage;
    const moreErrors = errors.length === 1 ? '' : ` (And ${errors.length - 1} other errors...)`;
    throw new Error(`Solidity was unable to compile. ${firstError}${moreErrors}`);
  }

  return solcOutput;
}
