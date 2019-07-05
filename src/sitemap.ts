import path from 'path';
import minimatch from 'minimatch';
import { maxBy } from 'lodash';

import { VFile } from './vfile';
import { SoliditySource, SolidityContract } from './solidity';
import { Page, ReadmePage } from './page';

export abstract class Sitemap {
  abstract pages: Page[];

  relative(origin: Page): RelativeSitemap {
    return new RelativeSitemap(this, origin);
  }
}

export class ReadmeSitemap extends Sitemap {
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

  locate(contract: SolidityContract): string | undefined {
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

export class RelativeSitemap {
  constructor(
    private readonly base: Sitemap,
    private readonly current: Page,
  ) { }

  get pages(): Page[] {
    return this.base.pages.map(p => ({
      contracts: p.contracts,
      path: relative(this.current.path, p.path),
    }));
  }
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
