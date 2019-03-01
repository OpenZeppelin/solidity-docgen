#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import { version } from '../package.json';
import { renderAndWriteDirectoryDocs } from '.';

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
  .parse(process.argv);

const { contractsDir, outDir } = program;
renderAndWriteDirectoryDocs(contractsDir, outDir).catch(console.error);
