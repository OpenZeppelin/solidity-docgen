import { SolcOutputBuilder } from './solc';
import { SoliditySource } from './solidity';

test('no files', function () {
  const solcOutput = new SolcOutputBuilder();

  const source = new SoliditySource(solcOutput);

  expect(source.files).toHaveLength(0);
  expect(source.contracts).toHaveLength(0);
});

test('one empty file', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol');

  const source = new SoliditySource(solcOutput);

  expect(source.files).toHaveLength(1);
});

test('one contract', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo');

  const source = new SoliditySource(solcOutput);

  expect(source.contracts).toHaveLength(1);
});

test('one own function', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test');

  const source = new SoliditySource(solcOutput);

  const foo = source.contracts[0];

  expect(foo.functions).toHaveLength(1);
});

test('one inherited function', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test')
    .contract('Bar', 'Foo');
    
  const source = new SoliditySource(solcOutput);

  const bar = source.contracts[1];

  expect(bar.functions).toHaveLength(1);
});

test('one multiply inherited function', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test')
    .contract('FooFlavor')
      .function('test')
    .contract('Bar', 'Foo', 'FooFlavor');
    
  const source = new SoliditySource(solcOutput);

  const bar = source.contracts[2];
  expect(bar.name).toBe('Bar');
  expect(bar.functions).toHaveLength(1);
});

test('two inherited functions with name overloading', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test', 'uint256')
      .function('test', 'string')
    .contract('FooFlavor', 'Foo');

  const source = new SoliditySource(solcOutput);
  const foof = source.contracts[1];
  expect(foof.functions).toHaveLength(2);
});
