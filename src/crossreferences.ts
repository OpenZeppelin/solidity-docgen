import path from 'path';
import { Root, Definition } from 'mdast';
import unified from 'unified';
// @ts-ignore
import stringify from 'remark-stringify';

import { Page } from './page';

interface Reference {
  slug: string;
  location: string;
}

export function crossreferencer(pages: Page[]): (location: string, input: string) => string {
  return function (location: string, input: string) {
    return input;
  };
}

function* generateReferencePairs(pages: Page[]): IterableIterator<Reference> {
  for (const p of pages) {
    for (const c of p.contracts) {
      yield { slug: c.slug, location: p.outputFile };

      for (const f of c.ownFunctions) {
        yield { slug: f.slug, location: p.outputFile };
      }

      for (const e of c.ownEvents) {
        yield { slug: e.slug, location: p.outputFile };
      }
    }
  }
}

function getDefinitions(origin: string, references: Reference[] = []): Root {
  const definitions: Definition[] = references.map(({ slug, location }) => ({
    type: 'definition',
    identifier: `\`${slug}\``,
    url: relative(origin, location) + `#${slug}`,
  }));

  return { type: 'root', children: definitions };
}

function relative(origin: string, target: string): string {
  if (path.normalize(origin) === path.normalize(target)) {
    return '';
  } else {
    return path.relative(path.dirname(origin), target);
  }
}
