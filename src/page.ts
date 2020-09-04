import path from 'path';
import * as handlebars from './handlebars';
import { defaults, keyBy } from 'lodash';

import { VFile } from './vfile';
import { Sitemap, Link } from './sitemap';
import { SourceContract } from './source';

type Template<T> = (data: T) => string;
type PreludeTemplate = Template<{ links: Link[] }>;

export abstract class Page {
  abstract path: string;
  abstract contracts: SourceContract[];
  abstract contents: string;

  constructor(private readonly sitemap: Sitemap) { }

  render(preludeTemplate: PreludeTemplate): string {
    const links = this.sitemap.links(this);
    const prelude = preludeTemplate({ links });
    return addPrelude(this.contents, prelude);
  }
}

export class DefaultPage extends Page {
  constructor(
    sitemap: Sitemap,
    private readonly ext: string,
    readonly contracts: SourceContract[],
  ) {
    super(sitemap);
  }

  get contents(): string {
    return this.contracts.map(c => c.toString()).join('\n\n');
  }

  get path(): string {
    return path.format({
      name: 'index',
      ext: '.' + this.ext,
    });
  }
}

export class ReadmePage extends Page {
  constructor(
    sitemap: Sitemap,
    private readonly readme: VFile,
    readonly contracts: SourceContract[],
  ) {
    super(sitemap);
    defaults(this, keyBy(this.contracts, c => c.name));
  }

  get contents(): string {
    return this.template(this);
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

export class ContractPage extends Page {
  constructor(
    sitemap: Sitemap,
    private readonly contract: SourceContract,
    private readonly ext: string,
  ) {
    super(sitemap);
  }

  get contents(): string {
    return this.contract.toString();
  }

  get contracts(): SourceContract[] {
    return [this.contract];
  }

  get path(): string {
    const dir = path.dirname(this.contract.file.path);
    return path.format({ dir, name: this.contract.name, ext: '.' + this.ext });
  }
}

function addPrelude(contents: string, prelude: string): string {
  const preludeRegex = /^(---\n([^]*?\n)?---\n)?/;
  return contents.replace(preludeRegex, (_: unknown, frontmatter?: string) =>
    frontmatter ? frontmatter + prelude : prelude
  );
}
