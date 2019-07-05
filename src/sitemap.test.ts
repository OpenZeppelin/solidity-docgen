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

test('relative sitemap', t => {
  const source = buildSoliditySource();

  const sitemap = new ReadmeSitemap(source, [emptyReadme('sub1'), emptyReadme('sub2'), emptyReadme('sub1/sub2')])
  const relative = sitemap.relative(sitemap.pages[0]);

  t.is(relative.pages.length, sitemap.pages.length);
  t.is(relative.pages[1].path, 'sub2.md');
  t.is(relative.pages[2].path, 'sub1/sub2.md');
});

function buildSoliditySource(builder?: (b: SolcOutputBuilder) => void): SoliditySource {
  const solcOutput = new SolcOutputBuilder();
  if (builder) builder(solcOutput);
  return new SoliditySource('', solcOutput, c => c.name);
}
