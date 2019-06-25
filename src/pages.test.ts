import test from 'ava';

import Handlebars from 'handlebars';

import { Page } from './pages';
import { SoliditySource } from './sources/solidity';
import { SolcOutputBuilder } from './sources/solc';

test('single file no contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
  );

  const page = new Page('', {}, '', source)

  t.is(page.contracts.length, 0);
});

test('single file multiple contracts ', t => {
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

test('render nested subdirectories', t => {
  const source = buildSoliditySource(b => b
    .file('sub/Bar.sol')
      .contract('Bar')
    .file('sub/sub2/Foo.sol')
      .contract('Foo')
  );
  const template = ({ contracts }) => contracts.map(({ name }) => name);

  const page = new Page('sub', {}, '', source);
  const rendered = template(page);

  t.is(rendered.length, 2);
  t.assert(rendered.includes('Bar'));
  t.assert(rendered.includes('Foo'));
});

test('handlebars', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
      .contract('Bar')
  );
  const template = Handlebars.compile(`\
{{#contracts}}
{{name}}
{{/contracts}}`);

  const page = new Page('', {}, '', source);
  const rendered = template(page);

  t.is(rendered, `Foo\nBar\n`);
});

test('handlebars with functions', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
        .function('test1')
        .function('test2')
  );
  const template = Handlebars.compile(`\
{{#contracts}}
{{name}}
{{#functions}}
{{name}}
{{/functions}}
{{/contracts}}`);

  const page = new Page('', {}, '', source);
  const rendered = template(page);

  t.is(rendered, `Foo\ntest1\ntest2\n`);
});

test('page with intro', t => {
  const source = buildSoliditySource(b => b);
  const template = ({ intro }) => intro;

  const page = new Page('', {}, 'intro', source);
  const rendered = template(page);

  t.is(rendered, `intro`);
});

test('frontmatter', t => {
  const source = buildSoliditySource(b => b);
  const frontmatterData = { a: 1 };
  const page = new Page('', frontmatterData, '', source);

  t.is(page.frontmatter, 'a: 1\n');
});

function buildSoliditySource(builder?: (b: SolcOutputBuilder) => void): SoliditySource {
  const solcOutput = new SolcOutputBuilder();
  if (builder) builder(solcOutput);
  return new SoliditySource(solcOutput);
}
