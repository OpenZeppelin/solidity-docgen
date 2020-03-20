import test, { ExecutionContext } from 'ava';

import { SolcAdapter, outputSelection } from './solc';

function smokeTest<T>(t: ExecutionContext<T>, adapter: SolcAdapter, version: string) {
  const output = adapter.compile({
    language: 'Solidity',
    sources: {
      test: {
        content: `pragma solidity ^${version}; contract Foo { }`,
      },
    },
    settings: {
      outputSelection,
    },
  });
  t.is('object', typeof output);
  t.is(undefined, output.errors);
}

test('smoke test 0.6', async t => {
  const adapter = await SolcAdapter.require('solc');
  smokeTest(t, adapter, '0.6');
});

test('smoke test 0.5', async t => {
  const adapter = await SolcAdapter.require('solc-0-5');
  smokeTest(t, adapter, '0.5');
});

test('smoke test 0.4', async t => {
  const adapter = await SolcAdapter.require('solc-0-4');
  smokeTest(t, adapter, '0.4');
});
