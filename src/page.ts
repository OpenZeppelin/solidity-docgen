import path from 'path';
import handlebars from 'handlebars';

import { VFile } from './vfile';
import { Sitemap, RelativeSitemap } from './sitemap';
import { SolidityContract } from './solidity';

type Template<T> = (data: T) => string;
type PreludeTemplate = Template<RelativeSitemap>;

export interface Page {
  path: string;
  contracts: SolidityContract[];
}

export class ReadmePage {
  constructor(
    private readonly sitemap: Sitemap,
    private readonly readme: VFile,
    readonly contracts: SolidityContract[],
  ) { }

  render(prelude: PreludeTemplate): string {
    const contents = this.template(this);
    return prelude(this.sitemap.relative(this)) + contents;
  }

  get template(): (page: Page) => string {
    return handlebars.compile(this.readme.contents);
  }

  get location(): string {
    return path.dirname(this.readme.path);
  }

  get path(): string {
    const { dir, ext } = path.parse(this.readme.path);
    return path.format({
      dir: path.dirname(dir),
      name: path.basename(dir) || 'index',
      ext,
    });
  }
}
