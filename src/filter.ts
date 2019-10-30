// globby and its fast-glob dependency don't support backward slashes in paths,
// so we "posixify" all paths in the Filter constructor and use the
// POSIX-specific path module to ensure everything stays forward-slashed

import { posix as path, sep as platformPathSep } from 'path';
import globby from 'globby';
import micromatch from 'micromatch';

import { memoize } from './memoize';

export class Filter {
  readonly root: string;
  private readonly excludePaths: string[];

  constructor(
    root: string,
    excludePaths: string[] = [],
  ) {
    this.root = posixifyPath(root);
    this.excludePaths = excludePaths.map(posixifyPath);
  }

  @memoize
  get matcher(): (path: string) => boolean {
    return micromatch.matcher('**/*.sol', {
      ignore: this.excludePaths.map(e => path.join(path.relative(this.root, e), '**/*')),
    });
  }

  async glob(pattern: string): Promise<string[]> {
    return await globby(path.join(this.root, '**', pattern), {
      ignore: this.excludePaths.map(e => path.join(e, '**/*')),
    });
  }
}

function posixifyPath(p: string): string {
  return p.replace(platformPathSep, path.sep);
}
