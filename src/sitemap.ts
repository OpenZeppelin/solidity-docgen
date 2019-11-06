import path from 'path';
import minimatch from 'minimatch';
import { maxBy } from 'lodash';

import { VFile } from './vfile';
import { SoliditySource, SolidityContract, Linkable } from './solidity';
import { Page, ReadmePage, DefaultPage, ContractPage } from './page';
import { Filter } from './filter';
import { memoize } from './memoize';

export interface Link {
  target: Linkable;
  path: string;
  relativePath: string;
}

export abstract class Sitemap {
  static generate(
    source: SoliditySource,
    filter: Filter,
    readmes: VFile[],
    ext: string,
    contractPages: boolean,
  ): Sitemap {

    if (contractPages) {
      return new ContractSitemap(source, filter, ext);
    } else if (readmes.length > 0) {
      return new ReadmeSitemap(source, filter, readmes)
    } else {
      return new DefaultSitemap(source, filter, ext);
    }
  }

  protected abstract source: SoliditySource;
  protected abstract filter: Filter;

  abstract pages: Page[];

  @memoize
  get contracts(): SolidityContract[] {
    return this.source.contracts.filter(c => this.filter.matcher(c.file.path));
  }

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
    protected readonly source: SoliditySource,
    protected readonly filter: Filter,
    private readonly ext: string,
  ) {
    super();
  }

  get pages(): DefaultPage[] {
    return [new DefaultPage(this, this.ext, this.contracts)];
  }
}

class ReadmeSitemap extends Sitemap {
  constructor(
    protected readonly source: SoliditySource,
    protected readonly filter: Filter,
    private readonly readmes: VFile[],
  ) {
    super();
  }

  get pages(): ReadmePage[] {
    const contracts = groupBy(this.contracts, c => this.locate(c));
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

class ContractSitemap extends Sitemap {
  constructor(
    protected readonly source: SoliditySource,
    protected readonly filter: Filter,
    private readonly ext: string,
  ) {
    super();
  }

  get pages(): ContractPage[] {
    return this.contracts.map(c => new ContractPage(this, c, this.ext));
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
