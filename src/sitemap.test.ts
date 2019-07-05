import test from 'ava';
import path from 'path';

import { ReadmeSitemap } from './sitemap';
import { SoliditySource } from './solidity';
import { SolcOutputBuilder } from './solc';

const emptyReadme = (dir: string = '') => ({
  path: path.join(dir, 'README.md'),
  contents: '',
});

test('single readme', t => {
  const source = buildSoliditySource();
  const sitemap = new ReadmeSitemap(source, [emptyReadme()])

  t.is(sitemap.pages.length, 1);
});

test('single readme no contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
  );

  const sitemap = new ReadmeSitemap(source, [emptyReadme()])
  const { pages: [page] } = sitemap;

  t.is(page.contracts.length, 0);
});

test('single readme multiple contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
      .contract('Bar')
  );

  const sitemap = new ReadmeSitemap(source, [emptyReadme()])
  const { pages: [page] } = sitemap;

  t.is(page.contracts.length, 2);
  t.assert(page.contracts.some(c => c.name === 'Foo'));
  t.assert(page.contracts.some(c => c.name === 'Bar'));
});

test('filter subdirectory', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
    .file('sub/Bar.sol')
      .contract('Bar')
  );

  const sitemap = new ReadmeSitemap(source, [emptyReadme('sub')])
  const { pages: [page] } = sitemap;

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

  const sitemap = new ReadmeSitemap(source, [emptyReadme('sub')])
  const { pages: [page] } = sitemap;

  t.is(page.contracts.length, 2);
  t.assert(page.contracts.some(c => c.name === 'Bar'));
  t.assert(page.contracts.some(c => c.name === 'Foo'));
});

test('references', t => {
  const source = buildSoliditySource(b => b
    .file('sub1/Bar.sol')
      .contract('Bar')
    .file('sub2/Foo.sol')
      .contract('Foo')
  );

  const sitemap = new ReadmeSitemap(source, [emptyReadme('sub1'), emptyReadme('sub2')])
  const references = sitemap.references(sitemap.pages[0]);

  t.is(references.length, 2);

  const bar = references[0];
  t.is(bar.target.label, 'Bar');
  t.is(bar.path, 'sub1.md');
  t.is(bar.relativePath, '');

  const foo = references[1];
  t.is(foo.target.label, 'Foo');
  t.is(foo.path, 'sub2.md');
  t.is(foo.relativePath, 'sub2.md');
});

function buildSoliditySource(builder?: (b: SolcOutputBuilder) => void): SoliditySource {
  const solcOutput = new SolcOutputBuilder();
  if (builder) builder(solcOutput);
  return new SoliditySource('', solcOutput, c => c.name);
}
