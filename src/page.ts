import path from 'path';
import handlebars from 'handlebars';

import { VFile } from './vfile';
import { Sitemap, Reference } from './sitemap';
import { SolidityContract } from './solidity';

type Template<T> = (data: T) => string;
type PreludeTemplate = Template<{ references: Reference[] }>;

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

  render(preludeTemplate: PreludeTemplate): string {
    const contents = this.template(this);
    const references = this.sitemap.references(this);
    const prelude = preludeTemplate({ references });
    return addPrelude(contents, prelude);
  }

  get template(): (page: Page) => string {
    return handlebars.compile(this.readme.contents);
  }

  get location(): string {
    return path.dirname(this.readme.path);
  }

  get path(): string {
    const { dir, ext } = path.parse(this.readme.path);
    return path.normalize(path.format({
      dir: path.dirname(dir),
      name: path.basename(dir) || 'index',
      ext,
    }));
  }
}

function addPrelude(contents: string, prelude: string): string {
  const preludeRegex = /^(---\n([^]*?\n)?---\n)?/;
  return contents.replace(preludeRegex, (_: unknown, frontmatter?: string) =>
    frontmatter ? frontmatter + prelude : prelude
  );
}
