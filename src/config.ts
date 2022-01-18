import { SourceUnit } from 'solidity-ast';
import { DocItem } from './doc-item';
import { PageAssigner } from './site';

export interface UserConfig {
  /**
   * The directory where rendered pages will be written.
   */
  output?: string;

  /**
   * A function that returns the page assigned to a documentable item
   * (contract, function, etc.) given the AST node for the item and the source
   * unit where it is defined.
   * Defaults to assigning all items to an index.md file.
   */
  pages?: (item: DocItem, file: SourceUnit) => string | undefined;

  /**
   * An array of directories or built-in names that should be searched
   * sequentially for templates and helpers. A single string is equal to an
   * array with only that string.
   * Defaults to built-in markdown templates.
   */
  templates?: string[] | string;

  /**
   * Clean up the output by collapsing 3 or more contiguous newlines into only 2.
   * Enabled by default.
   */
  collapseNewlines?: boolean;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// Other config parameters that will be provided by the environment (e.g. Hardhat)
// rather than by the user manually, unless using the library directly.
export interface Config extends UserConfig {
  /**
   * The root directory relative to which 'output' and 'templates' are
   * specified. Defaults to the working directory.
   */
  root?: string;
}

export const defaults: Required<Config> = {
  root: process.cwd(),
  output: 'docs',
  pages: () => 'index.md',
  templates: 'markdown',
  collapseNewlines: true,
};
