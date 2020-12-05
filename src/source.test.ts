import test, { ExecutionContext } from 'ava';

import { SolcOutputBuilder } from './solc-output-builder';
import { SolcOutput } from './solc';
import { Source } from './source';
import { outputSelection } from './solc';

import { solcCompile } from './solc-fork';

function buildSource(solcOutput: SolcOutput): Source {
  return new Source('', solcOutput, c => c.name);
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

test('two inherited constructors', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('constructor', 'uint256')
    .contract('FooFlavor', 'Foo')
      .function('constructor', 'string');

  const source = buildSource(solcOutput);
  const foof = source.contracts[1];
  t.is(foof.name, 'FooFlavor');
  t.is(foof.functions.length, 1);
});

test('a state variable', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .variable('x', 'uint256');

  const source = buildSource(solcOutput);
  const foo = source.contracts[0];
  t.is(foo.variables.length, 1);
  const variable = foo.variables[0];
  t.is(variable.name, 'x');
  t.is(variable.type, 'uint256');
});

test('an inherited state variable', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .variable('x', 'uint256')
    .contract('Bar', 'Foo')
      .variable('y', 'uint256');

  const source = buildSource(solcOutput);
  const foo = source.contracts[1];
  t.is(foo.name, 'Bar');
  t.is(foo.variables.length, 2);
  const variable = foo.variables[1];
  t.is(variable.name, 'x');
  t.is(variable.type, 'uint256');
});

test('contracts in scope from imported files', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
      .contract('Foo')
    .file('Bar.sol')
      .import('Foo.sol')
      .contract('Bar');

  const source = buildSource(solcOutput);
  const bar = source.file('Bar.sol');
  const scope = bar.contractsInScope;
  t.like(scope, {
    Foo: { name: 'Foo' },
    Bar: { name: 'Bar' },
  });
});

test('contracts in scope from imported files with alias', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
      .contract('Foo')
    .file('Bar.sol')
      .import('Foo.sol', [['Foo', 'FooRenamed']])
      .contract('Bar');

  const source = buildSource(solcOutput);
  const bar = source.file('Bar.sol');
  const scope = bar.contractsInScope;
  t.like(scope, {
    FooRenamed: { name: 'Foo' },
    Bar: { name: 'Bar' },
  });
});

test('contracts in scope from imported files transitively', t => {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
      .contract('Foo')
    .file('Bar.sol')
      .import('Foo.sol')
      .contract('Bar')
    .file('Baz.sol')
      .import('Bar.sol')
      .contract('Baz');

  const source = buildSource(solcOutput);
  const baz = source.file('Baz.sol');
  const scope = baz.contractsInScope;
  t.like(scope, {
    Foo: { name: 'Foo' },
    Bar: { name: 'Bar' },
    Baz: { name: 'Baz' },
  });
});

test('using real compiler output (0.6)', async t => {
  const sourceText = `// SPDX-License-Identifier: MIT
    pragma solidity ^0.6;
    contract Foo {
      uint public x;
      /**
       * @dev docs
       */
      function fun(uint a) public pure returns (uint r) { return a; }
      event Ev(uint a);
      modifier mod(uint a) { _; }
      receive() external payable {}
    }
  `;

  const solcOutput = await solcCompile('solc', {
    language: 'Solidity',
    sources: {
      test: {
        content: sourceText,
      },
    },
    settings: {
      outputSelection,
    },
  });

  t.is('object', typeof solcOutput);
  t.is(undefined, solcOutput.errors);

  const getName = (x: { name: string }) => x.name;

  const source = buildSource(solcOutput);
  t.deepEqual(['Foo'], source.contracts.map(getName));

  const foo = source.contracts[0];

  t.deepEqual(['x'],    foo.variables.map(getName));
  t.deepEqual(['fun', 'receive'],  foo.functions.map(getName));
  t.deepEqual(['mod'],  foo.modifiers.map(getName));
  t.deepEqual(['Ev'],   foo.events.map(getName));

  const fun = foo.functions[0];
  t.is('public', fun.visibility);
  t.deepEqual(['uint256 a'], Array.from(fun.args, a => a.toString()));
  t.deepEqual(['uint256 r'], Array.from(fun.outputs, a => a.toString()));
  t.is('docs', fun.natspec.devdoc);

  const mod = foo.functions[0];
  t.deepEqual(['uint256 a'], Array.from(mod.args, a => a.toString()));
});
