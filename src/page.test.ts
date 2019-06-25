import test from 'ava';

import { Page } from './page';
import { SoliditySource } from './sources/solidity';
import { SolcOutputBuilder } from './sources/solc';

test('single file no contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
  );

  const page = new Page('', {}, '', source)

  t.is(page.contracts.length, 0);
});

test('single file multiple contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
      .contract('Bar')
  );

  const page = new Page('', {}, '', source);

  t.is(page.contracts.length, 2);
  t.assert(page.contracts.some(c => c.name === 'Foo'));
  t.assert(page.contracts.some(c => c.name === 'Bar'));
});

test('filter subdirectory ', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
    .file('sub/Bar.sol')
      .contract('Bar')
  );

  const page = new Page('sub', {}, '', source);

  t.is(page.contracts.length, 1);
  t.is(page.contracts[0].name, 'Bar');
});

test('filter nested subdirectories', t => {
  const source = buildSoliditySource(b => b
    .file('sub/Bar.sol')
      .contract('Bar')
    .file('sub/sub2/Foo.sol')
      .contract('Foo')
  );

  const page = new Page('sub', {}, '', source);

  t.is(page.contracts.length, 2);
  t.assert(page.contracts.some(c => c.name === 'Bar'));
  t.assert(page.contracts.some(c => c.name === 'Foo'));
});

test('intro', t => {
  const source = buildSoliditySource();

  const page = new Page('', {}, 'intro', source);

  t.is(page.intro, `intro`);
});

test('frontmatter', t => {
  const source = buildSoliditySource();
  const frontmatterData = { a: 1 };
  const page = new Page('', frontmatterData, '', source);

  t.is(page.frontmatter, '---\na: 1\n---');
});

function buildSoliditySource(builder?: (b: SolcOutputBuilder) => void): SoliditySource {
  const solcOutput = new SolcOutputBuilder();
  if (builder) builder(solcOutput);
  return new SoliditySource(solcOutput);
}
