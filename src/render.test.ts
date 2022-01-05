import test from './utils/test';
import path from 'path';
import { buildSite, PageAssigner } from './site';
import { itemPartialName, render, Templates } from './render';
import { NodeType } from 'solidity-ast/node';

interface TestSpec extends Templates {
  collapseNewlines?: boolean;
}

/**
 * @param contracts The name of the Solidity file whose contents should be considered.
 */
function testRender(title: string, file: string, spec: TestSpec, expected: string) {
  const id = 'index.md';
  const assign: PageAssigner = (_, f) => path.parse(f.absolutePath).name === file ? id : undefined;

  test(title, t => {
    const site = buildSite(t.context.build, assign);
    const rendered = render(site, spec, spec.collapseNewlines);
    t.is(rendered.length, 1);
    t.is(rendered[0]!.contents, expected);
  });
}

testRender('static page',
  'S08_AB',
  { page: 'a page' },
  'a page',
);

testRender('items',
  'S08_AB',
  { page: '{{#each items}}{{name}}, {{/each}}' },
  'A, B, ',
);

testRender('partials',
  'S08_AB',
  {
    page: '{{#each items}}{{>part}}, {{/each}}',
    partials: { part: '{{name}}' },
  },
  'A, B, ',
);

testRender('item partial',
  'S08_AB',
  {
    page: '{{#each items}}{{>item}}, {{/each}}',
    partials: { contract: '{{name}}' },
  },
  'A, B, ',
);
