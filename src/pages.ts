import { flatten } from 'lodash';
import minimatch from 'minimatch';
import path from 'path';
import yaml from 'js-yaml';

import { SoliditySource, SolidityContract } from './sources/solidity';

export class Page {
  constructor(
    private readonly pagePath: string,
    private readonly frontmatterData: {},
    readonly intro: string,
    private readonly source: SoliditySource
  ) { }

  get contracts(): SolidityContract[] {
    const sourceFiles = this.source.files.filter(f => isContainedIn(this.pagePath, f.path));
    return flatten(sourceFiles.map(f => f.contracts));
  }

  get frontmatter(): string {
    return yaml.safeDump(this.frontmatterData);
  }
}

function isContainedIn(pagePath: string, filePath: string): boolean {
  return minimatch(filePath, path.join(pagePath, '**/*'));
}
