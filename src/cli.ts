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

    outDir: flags.string({
      char: 'o',
      default: 'docs',
      description: 'directory where generated docs will be written',
    }),

    ignore: flags.build({
      parse: s => s.split(','),
    })({
      char: 'i',
      default: [],
      description: 'ignore directories that match the pattern (separated by commas)',
    }),

    template: flags.string({
      char: 't',
      default: path.resolve(__dirname, '../page.hbs'),
      description: 'path to a handlebars template to render each page',
    }),

    solcModule: flags.build({
      parse: s => path.resolve(s),
    })({
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
