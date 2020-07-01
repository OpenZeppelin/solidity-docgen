import test from 'ava';
import { promises as fs } from 'fs';
import proc from 'child_process';
import events from 'events';

import { Docgen } from './cli';

test('fixture 001', async t => {
  await cleanFixtureOutput('001');
  const child = proc.fork(require.resolve('./cli'), [
    '--input', 'fixtures/001/input',
    '--output', 'fixtures/001/output',
    '--output-structure', 'single',
  ]);
  await events.once(child, 'exit');
  const output = await fs.readFile('fixtures/001/output/index.md', 'utf8');
  t.snapshot(output);
});

test('fixture 002', async t => {
  await cleanFixtureOutput('002');
  const child = proc.fork(require.resolve('./cli'), [
    '--input', 'fixtures/002/input',
    '--output', 'fixtures/002/output',
    '--helpers', 'fixtures/002/helpers.js',
    '--templates', 'fixtures/002/templates',
    '--output-structure', 'single',
  ]);
  await events.once(child, 'exit');
  const output = await fs.readFile('fixtures/002/output/index.md', 'utf8');
  t.snapshot(output);
});

async function cleanFixtureOutput(num: string) {
  const outputPath = `fixtures/${num}/output`;

  try {
    await fs.access(outputPath);
  } catch (e) {
    return;
  }

  for (const e of await fs.readdir(`fixtures/${num}/output`)) {
    await fs.unlink(`fixtures/${num}/output/${e}`);
  }
  await fs.rmdir(`fixtures/${num}/output`);
}
