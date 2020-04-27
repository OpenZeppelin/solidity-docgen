import test from 'ava';
import fs from 'fs-extra';

import { Docgen } from './cli';

test('fixture 001', async t => {
  await fs.remove('fixtures/001/output');
  await Docgen.run([
    '--input', 'fixtures/001/input',
    '--output', 'fixtures/001/output',
    '--output-structure', 'single',
  ]);
  const output = await fs.readFile('fixtures/001/output/index.md', 'utf8');
  t.snapshot(output);
});
