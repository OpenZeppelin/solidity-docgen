import test from 'ava';

import { SolcOutputBuilder } from './solc';
import { SoliditySource } from './solidity';

function buildSource(solcOutput: SolcOutputBuilder): SoliditySource {
  return new SoliditySource('', solcOutput, c => c.name);
}

test('no files', t => {
  const solcOutput = new SolcOutputBuilder();

  const source = buildSource(solcOutput);

  t.is(source.files.length, 0);
  t.is(source.contracts.length, 0);
});

test('one empty file', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol');

  const source = buildSource(solcOutput);

  t.is(source.files.length, 1);
});

test('one contract', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo');

  const source = buildSource(solcOutput);

  t.is(source.contracts.length, 1);
});

test('one own function', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test');

  const source = buildSource(solcOutput);

  const foo = source.contracts[0];

  t.is(foo.functions.length, 1);
});

test('one inherited function', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test')
    .contract('Bar', 'Foo');
    
  const source = buildSource(solcOutput);

  const bar = source.contracts[1];

  t.is(bar.functions.length, 1);
});

test('one multiply inherited function', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test')
    .contract('FooFlavor')
      .function('test')
    .contract('Bar', 'Foo', 'FooFlavor');
    
  const source = buildSource(solcOutput);

  const bar = source.contracts[2];
  t.is(bar.name, 'Bar');
  t.is(bar.functions.length, 1);
});

test('two inherited functions with name overloading', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test', 'uint256')
      .function('test', 'string')
    .contract('FooFlavor', 'Foo');

  const source = buildSource(solcOutput);
  const foof = source.contracts[1];
  t.is(foof.functions.length, 2);
});

test('grouped inherited items', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('foo-test')
    .contract('Bar')
      .function('bar-test')
    .contract('Child', 'Foo', 'Bar');

  const source = buildSource(solcOutput);
  const child = source.contracts[2];
  t.is(child.name, 'Child');

  const items = child.inheritedItems;
  t.is(items.length, 3);
  t.is(items[1].contract.name, 'Foo');
  t.is(items[1].functions[0].name, 'foo-test');
});
