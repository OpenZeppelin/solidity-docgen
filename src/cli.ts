#!/usr/bin/env node

import { Command, flags } from '@oclif/command'
import path from 'path';
import JSON5 from 'json5';

import { docgen } from './docgen';

class Docgen extends Command {
  static flags = {
    version: flags.version(),
    help: flags.help(),

    input: flags.string({
      char: 'i',
      default: 'contracts',
      description: 'directory where contracts will be taken from',
    }),

    output: flags.string({
      char: 'o',
      default: 'docs',
      description: 'directory where generated docs will be written',
    }),

    exclude: flags.build({
      parse: s => s.split(','),
    })({
      char: 'e',
      description: 'exclude directories that match the pattern (separated by commas)',
    }),

    templates: flags.string({
      char: 't',
      parse: s => path.resolve(s),
      description: 'directory with template files',
    }),

    extension: flags.string({
      char: 'x',
      default: 'md',
      description: 'file extension for generated pages, not necessary when using READMEs',
    }),

    'solc-module': flags.string({
      parse: s => path.resolve(s),
      description: 'path to an alternative solc module',
    }),

    'solc-settings': flags.build({
      parse: s => {
        const settings = JSON5.parse(s) as unknown;
        if (typeof settings !== 'object' || settings === null) {
          throw new Error('--solc-settings must be an object');
        }
        return settings;
      },
    })({
      description: 'compiler settings for solc module',
    }),

    'contract-pages': flags.boolean({
      default: false,
      description: 'enable one page per contract',
    }),
  }

  async run() {
    const { flags } = this.parse(Docgen);

    await docgen(flags);
  }
}

Docgen.run().then(undefined, require('@oclif/errors/handle'));
