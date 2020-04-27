import test from 'ava';
import fs from 'fs-extra';

import { docgen } from './docgen';

test('fixture 001', async t => {
  await fs.remove('fixtures/001/output');
  await docgen({
    input: 'fixtures/001/input',
    output: 'fixtures/001/output',
    extension: 'md',
    'output-structure': 'single',
  });
  const output = await fs.readFile('fixtures/001/output/index.md', 'utf8');
  t.snapshot(output);
});
