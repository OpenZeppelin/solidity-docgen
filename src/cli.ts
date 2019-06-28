#!/usr/bin/env node

import { Command, flags } from '@oclif/command'
import path from 'path';

import { docgen } from './docgen';

class Docgen extends Command {
  static flags = {
    version: flags.version(),
    help: flags.help(),

    contractsDir: flags.string({
      char: 'c',
      default: 'contracts',
      description: 'directory where contracts will be taken from',
    }),

    outputDir: flags.string({
      char: 'o',
      default: 'docs',
      description: 'directory where generated docs will be written',
    }),

    ignore: flags.build({
      parse: s => s.split(','),
    })({
      char: 'i',
      description: 'ignore directories that match the pattern (separated by commas)',
    }),

    templateFile: flags.string({
      char: 't',
      parse: path.resolve,
      description: 'path to a handlebars template to render each page',
    }),

    solcModule: flags.string({
      parse: path.resolve,
      description: 'path to an alternative solc module',
    }),
  }

  async run() {
    const { flags } = this.parse();

    // @ts-ignore see https://github.com/oclif/parser/pull/53
    await docgen(flags);
  }
}

Docgen.run().then(undefined, require('@oclif/errors/handle'));
