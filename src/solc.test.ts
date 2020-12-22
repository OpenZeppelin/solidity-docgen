import test, { ExecutionContext } from 'ava';
import proc from 'child_process';
import events from 'events';
import assert from 'assert';

import { outputSelection } from './solc';

import { solcCompile } from './solc-fork';

async function smokeTest<T>(t: ExecutionContext<T>, solcModule: string, version: string) {
  const input = {
    language: 'Solidity',
    sources: {
      test: {
        content: `// SPDX-License-Identifier: MIT\npragma solidity ^${version}; contract Foo { }`,
      },
    },
    settings: {
      outputSelection,
    },
  };

  const output = await solcCompile(solcModule, input);

  t.is('object', typeof output);
  t.is(undefined, output.errors);
}

test('smoke test 0.8', async t => {
  await smokeTest(t, 'solc-0-8', '0.8');
});

test('smoke test 0.7', async t => {
  await smokeTest(t, 'solc-0-7', '0.7');
});

test('smoke test 0.6', async t => {
  await smokeTest(t, 'solc', '0.6');
});

test('smoke test 0.5', async t => {
  await smokeTest(t, 'solc-0-5', '0.5');
});

test('smoke test 0.4', async t => {
  await smokeTest(t, 'solc-0-4', '0.4');
});
