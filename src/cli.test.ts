import test from 'ava';
import fs from 'promisified/fs';
import proc from 'child_process';
import events from 'events';

import { Docgen } from './cli';

for (const f of fs.readdirSync('fixtures')) {
  testFixture(f);
}

function testFixture(num: string) {
  test(`fixture ${num}`, async t => {
    await cleanFixtureOutput(num);
    const templates = await fs.access(`fixtures/${num}/templates`, fs.constants.F_OK)
      .then(
        () => ['--templates', `fixtures/${num}/templates`],
        () => [],
      );
    const helpers = await fs.access(`fixtures/${num}/helpers.js`, fs.constants.F_OK)
      .then(
        () => ['--helpers', `fixtures/${num}/helpers.js`],
        () => [],
      );
    const solc = await fs.access(`fixtures/${num}/solc`, fs.constants.F_OK)
      .then(
        async () => ['--solc-module', (await fs.readFile(`fixtures/${num}/solc`, 'utf8')).trim()],
        () => [],
      );
    const child = proc.fork(require.resolve('./cli'), [
      '--input', `fixtures/${num}/input`,
      '--output', `fixtures/${num}/output`,
      ...templates,
      ...helpers,
      ...solc,
      '--output-structure', 'single',
    ]);
    await events.once(child, 'exit');
    const output = await fs.readFile(`fixtures/${num}/output/index.md`, 'utf8');
    t.snapshot(output);
  });
}

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
