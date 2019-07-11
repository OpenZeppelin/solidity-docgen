import test from 'ava';
import path from 'path';

import { Sitemap } from './sitemap';
import { SoliditySource } from './solidity';
import { SolcOutputBuilder } from './solc';

const emptyReadme = (dir: string = '') => ({
  path: path.join(dir, 'README.md'),
  contents: '',
});

test('single readme', t => {
  const source = buildSoliditySource();
  const sitemap = Sitemap.generate(source, [emptyReadme()], 'md');

  t.is(sitemap.pages.length, 1);
});

test('single readme no contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
  );

  const sitemap = Sitemap.generate(source, [emptyReadme()], 'md');
  const { pages: [page] } = sitemap;

  t.is(page.contracts.length, 0);
});

test('single readme multiple contracts', t => {
  const source = buildSoliditySource(b => b
    .file('Foo.sol')
      .contract('Foo')
      .contract('Bar')
  );

  const sitemap = Sitemap.generate(source, [emptyReadme()], 'md');
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

  const sitemap = Sitemap.generate(source, [emptyReadme('sub')], 'md');
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

  const sitemap = Sitemap.generate(source, [emptyReadme('sub')], 'md');
  const { pages: [page] } = sitemap;

  t.is(page.contracts.length, 2);
  t.assert(page.contracts.some(c => c.name === 'Bar'));
  t.assert(page.contracts.some(c => c.name === 'Foo'));
});

test('links', t => {
  const source = buildSoliditySource(b => b
    .file('sub1/Bar.sol')
      .contract('Bar')
    .file('sub2/Foo.sol')
      .contract('Foo')
  );

  const sitemap = Sitemap.generate(source, [emptyReadme('sub1'), emptyReadme('sub2')], 'md');
  const links = sitemap.links(sitemap.pages[0]);

  t.is(links.length, 2);

  const bar = links[0];
  t.is(bar.target.name, 'Bar');
  t.is(bar.path, 'sub1.md');
  t.is(bar.relativePath, '');

  const foo = links[1];
  t.is(foo.target.name, 'Foo');
  t.is(foo.path, 'sub2.md');
  t.is(foo.relativePath, 'sub2.md');
});

function buildSoliditySource(builder?: (b: SolcOutputBuilder) => void): SoliditySource {
  const solcOutput = new SolcOutputBuilder();
  if (builder) builder(solcOutput);
  return new SoliditySource('', solcOutput, c => c.name);
}
