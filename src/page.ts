import { flatten, isEmpty } from 'lodash';
import minimatch from 'minimatch';
import path from 'path';
import yaml from 'js-yaml';

import { SoliditySource, SolidityContract } from './solidity';

export class Page {
  constructor(
    private readonly inputFile: string,
    private readonly frontmatterData: {},
    readonly intro: string,
    private readonly source: SoliditySource,
  ) { }

  static parse(
    inputFile: string,
    contents: string,
    source: SoliditySource,
  ): Page {
    const match = // non-null assertion because this regexp always matches
      contents.match(/^(?:---\n([^]*?\n)?---\n)?([^]*)$/)!;
    const frontmatterData = match[1] ? yaml.safeLoad(match[1]) : {};
    const intro = match[2];
    return new Page(inputFile, frontmatterData, intro, source);
  }

  get contracts(): SolidityContract[] {
    const sourceFiles = this.source.files.filter(f => isContainedIn(this.location, f.path));
    return flatten(sourceFiles.map(f => f.contracts));
  }

  get frontmatter(): string {
    const str = isEmpty(this.frontmatterData) ? '' : yaml.safeDump(this.frontmatterData);
    return '---\n' + str + '---';
  }

  get location(): string {
    return path.dirname(this.inputFile);
  }

  get outputFile(): string {
    const { dir, ext } = path.parse(this.inputFile);
    return path.format({
      dir: path.dirname(dir),
      name: path.basename(dir),
      ext,
    });
  }
}

function isContainedIn(pagePath: string, filePath: string): boolean {
  return minimatch(filePath, path.join(pagePath, '**/*'));
}
