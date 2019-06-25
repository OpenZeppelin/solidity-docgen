#!/usr/bin/env node

import program from 'commander';
import { version } from '../package.json';
import { docgen } from './docgen';

program
  .version(version, '-v, --version')
  .option(
    '-c, --contractsDir <directory>',
    'directory where contracts will be taken from',
    'contracts',
  )
  .option(
    '-o, --outDir <directory>',
    'directory where generated docs will be written',
    'docs',
  )
  .option(
    '-i, --ignore <pattern>',
    'ignore directories that match the pattern',
    (val, arr) => arr.concat(val),
    [],
  )
  .parse(process.argv);

docgen(program).catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
