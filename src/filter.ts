import path from 'path';
import globby from 'globby';
import micromatch from 'micromatch';

import { memoize } from './memoize';

export class Filter {
  constructor(
    private readonly root: string,
    private readonly excludePaths: string[] = [],
  ) { }

  @memoize
  get matcher(): (path: string) => boolean {
    return micromatch.matcher('**/*.sol', {
      ignore: this.excludePaths.map(e => path.join(path.relative(this.root, e), '**/*')),
    });
  }

  async files(): Promise<string[]> {
    return await globby(path.join(this.root, '**/*.sol'), {
      ignore: this.excludePaths.map(e => path.join(e, '**/*')),
    });
  }
}
