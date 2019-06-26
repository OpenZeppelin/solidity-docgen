#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import { docgen } from './docgen';

const { version } = JSON.parse(fs.readFileSync(
  path.join(__dirname, '../package.json'),
  'utf8',
));

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

// @ts-ignore
docgen(program).catch(function (error: Error) {
  console.error(error);
  process.exit(1);
});
