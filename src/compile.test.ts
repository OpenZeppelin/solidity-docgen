import test from 'ava';

import { SolcAdapter, outputSelection } from './compile';

test('smoke test', async t => {
  const adapter = await SolcAdapter.require('solc');
  const output = adapter.compile({
    language: 'Solidity',
    sources: {
      test: {
        content: 'pragma solidity ^0.5; contract Foo { }',
      },
    },
    settings: {
      outputSelection
    },
  });
  t.is(typeof output, 'object');
  t.is(output.errors, undefined);
});
