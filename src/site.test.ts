import test from './utils/test';
import path from 'path';
import { PageAssigner, buildSite, Site } from './site';

interface PageSummary {
  id: string;
  items: string[];
}

/**
 * @param contracts The name of the Solidity file whose contents should be considered.
 */
function testPages(title: string, contracts: string, assign: PageAssigner, expected: PageSummary[]) {
  test(title, t => {
    const site = buildSite(t.context.build,
      (i, f) => path.parse(f.absolutePath).name === contracts ? assign(i, f) : undefined
    );
    const pages = site.pages.map(p => ({
      id: p.id,
      items: p.items.map(i => i.name),
    }));
    t.deepEqual(pages, expected);
  });
}

testPages('assign to single page',
  'S08_AB',
  () => 'index.md',
  [{ id: 'index.md', items: ['A', 'B'] }],
);

testPages('assign to separate pages',
  'S08_AB',
  item => item.name.replace(/V\d+/, ''),
  [
    { id: 'A', items: ['A'] },
    { id: 'B', items: ['B'] },
  ],
);
