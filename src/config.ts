import { SourceUnit } from 'solidity-ast';
import { DocItem } from './doc-item';
import { PageStructure } from './site';

export interface UserConfig {
  /**
   * The directory where rendered pages will be written.
   * Defaults to 'docs'.
   */
  outputDir?: string;

  /**
   * A directory of custom templates that should take precedence over the
   * theme's templates.
   */
  templates?: string;

  /**
   * The name of the built-in templates that will be used by default.
   * Defaults to 'markdown'.
   */
  theme?: string;

  /**
   * The way documentable items (contracts, functions, etc.) will be organized
   * in pages. Built in options are: 'single' for all items in one page, and
   * 'items' for one page per item. More customization is possible by defining
   * a function that returns a page path given the AST node for the item and
   * the source unit where it is defined.
   * Defaults to 'single'.
   */
  pages?: 'single' | 'items' | ((item: DocItem, file: SourceUnit) => string | undefined);

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

export const defaults: Omit<Required<Config>, 'templates'> = {
  root: process.cwd(),
  outputDir: 'docs',
  pages: 'single',
  theme: 'markdown',
  collapseNewlines: true,
};
