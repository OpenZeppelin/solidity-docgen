import path from 'path';
import minimatch from 'minimatch';
import { maxBy } from 'lodash';

import { VFile } from './vfile';
import { SoliditySource, SolidityContract, Linkable } from './solidity';
import { Page, ReadmePage, DefaultPage } from './page';

export interface Link {
  target: Linkable;
  path: string;
  relativePath: string;
}

export abstract class Sitemap {
  static generate(source: SoliditySource, readmes: VFile[], ext: string): Sitemap {
    if (readmes.length > 0) {
      return new ReadmeSitemap(source, readmes)
    } else {
      return new DefaultSitemap(source, ext);
    }
  }

  abstract pages: Page[];

  links(origin: Page): Link[] {
    function* generate(sitemap: Sitemap): IterableIterator<Link> {
      for (const { path, contracts } of sitemap.pages) {
        const relativePath = relative(origin.path, path);

        for (const c of contracts) {
          for (const target of c.linkable) {
            yield { target, path, relativePath };
          }
        }
      }
    }

    return Array.from(generate(this));
  }
}

class DefaultSitemap extends Sitemap {
  constructor(
    private readonly source: SoliditySource,
    private readonly ext: string,
  ) {
    super();
  }

  get pages(): DefaultPage[] {
    return [new DefaultPage(this, this.ext, this.source.contracts)];
  }
}

class ReadmeSitemap extends Sitemap {
  constructor(
    private readonly source: SoliditySource,
    private readonly readmes: VFile[],
  ) {
    super();
  }

  get pages(): ReadmePage[] {
    const contracts = groupBy(this.source.contracts, c => this.locate(c));
    return this.readmes.map(r =>
      new ReadmePage(this, r, contracts[path.dirname(r.path)] || [])
    );
  }

  private locate(contract: SolidityContract): string | undefined {
    const matches = this.locations.filter(l =>
      isContainedIn(l, contract.file.path));
    return maxBy(matches, l => l.length);
  }

  private get locations(): string[] {
    return this.readmes.map(r => path.dirname(r.path));
  }
}

function isContainedIn(location: string, file: string): boolean {
  return minimatch(file, path.join(location, '**/*'));
}

function relative(origin: string, target: string): string {
  if (path.normalize(origin) === path.normalize(target)) {
    return '';
  } else {
    return path.relative(path.dirname(origin), target);
  }
}

type Dictionary<T> = { [key: string]: T | undefined };

function groupBy<T>(collection: T[], key: (elem: T) => string | undefined): Dictionary<T[]> {
  const res: Dictionary<T[]> = {};

  for (const elem of collection) {
    const k = key(elem);
    if (k !== undefined) {
      (res[k] || (res[k] = [])).push(elem);
    }
  }

  return res;
}
