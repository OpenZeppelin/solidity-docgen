import Handlebars from 'handlebars';

import { Page } from './pages';
import { SoliditySource } from './sources/solidity';
import { SolcOutputBuilder } from './sources/solc';

test('constant template', function () {
  const source = buildSoliditySource();
  const pageContent = 'constant';
  const template = () => pageContent;

  const rendered = new Page('', {}, '', source).render(template);

  expect(rendered).toBe(pageContent);
});

test('simple contract name list', function () {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
      .contract('Bar')
  );
  const template = ({ contracts }) => contracts.map(({ name }) => name);

  const rendered = new Page('', {}, '', source).render(template);

  expect(rendered).toHaveLength(2);
  expect(rendered).toContain('Foo');
  expect(rendered).toContain('Bar');
});

test('render only subdirectory', function () {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
    .file('sub/Bar.sol')
      .contract('Bar')
  );
  const template = ({ contracts }) => contracts.map(({ name }) => name);

  const rendered = new Page('sub', {}, '', source).render(template);

  expect(rendered).toHaveLength(1);
  expect(rendered).toContain('Bar');
});

test('render nested subdirectories', function () {
  const source = buildSoliditySource(b => b
    .file('sub/Bar.sol')
      .contract('Bar')
    .file('sub/sub2/Foo.sol')
      .contract('Foo')
  );
  const template = ({ contracts }) => contracts.map(({ name }) => name);

  const rendered = new Page('sub', {}, '', source).render(template);

  expect(rendered).toHaveLength(2);
  expect(rendered).toContain('Bar');
  expect(rendered).toContain('Foo');
});

test('handlebars', function () {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
      .contract('Bar')
  );
  const template = Handlebars.compile(`\
{{#contracts}}
{{name}}
{{/contracts}}`);

  const rendered = new Page('', {}, '', source).render(template);

  expect(rendered).toBe(`Foo\nBar\n`);
});

test('handlebars with functions', function () {
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

  const rendered = new Page('', {}, '', source).render(template);

  expect(rendered).toBe(`Foo\ntest1\ntest2\n`);
});

test('page with intro', function () {
  const source = buildSoliditySource(b => b);
  const template = ({ intro }) => intro;

  const rendered = new Page('', {}, 'intro', source).render(template);

  expect(rendered).toBe(`intro`);
});

test('frontmatter', function () {
  const source = buildSoliditySource(b => b);
  const frontmatterData = { a: 1 };
  const page = new Page('', frontmatterData, '', source);

  expect(page.frontmatter).toBe('a: 1\n');
});

function buildSoliditySource(builder?: (b: SolcOutputBuilder) => void): SoliditySource {
  const solcOutput = new SolcOutputBuilder();
  if (builder) builder(solcOutput);
  return new SoliditySource(solcOutput);
}
