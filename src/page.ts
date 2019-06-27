import { flatten, isEmpty } from 'lodash';
import minimatch from 'minimatch';
import path from 'path';
import yaml from 'js-yaml';

import { SoliditySource, SolidityContract } from './solidity';

export class Page {
  constructor(
    readonly path: string,
    private readonly frontmatterData: {},
    readonly intro: string,
    private readonly source: SoliditySource
  ) { }

  get contracts(): SolidityContract[] {
    const sourceFiles = this.source.files.filter(f => isContainedIn(this.path, f.path));
    return flatten(sourceFiles.map(f => f.contracts));
  }

  get frontmatter(): string {
    const str = isEmpty(this.frontmatterData) ? '' : yaml.safeDump(this.frontmatterData);
    return '---\n' + str + '---';
  }
}

function isContainedIn(pagePath: string, filePath: string): boolean {
  return minimatch(filePath, path.join(pagePath, '**/*'));
}
