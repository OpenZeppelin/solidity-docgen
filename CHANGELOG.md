# Changelog

## 0.5.4

- Added a `--helpers` (`-H`) option: a path to a file whose exports will be
  registed as handlebars helpers.

## 0.5.2, 0.5.3

- Changed `--solc-module` option to use Node module resolution algorithm.

For example, if you've installed `solc@0.5` alongside `solidity-docgen`, you
can now run `solidity-docgen --solc-module solc`.

This is a small breaking change. If you were using this option before, you need
to make sure its value is now something that Node recognizes as a module, such
as the name of an installed Node module or a path beginning with `./`, `../`,
or `/`.

## 0.5.1

- Fixed a bug in the npm package.

## 0.5.0

**This release contains breaking changes.**

- Replaced `--contract-pages` with `--output-structure [contracts|readmes|single]`.
- Changed default output structure. The new default is equivalent to the old `--contract-pages`.

If you were using `--contract-pages`, you should remove it, since it is the new
default. If you were using the previous defaults, you should now use
`--output-structure single` if you want a single page with all contracts, or
`--output-structure readmes` if you use READMEs to structure your output pages.

- Removed the default prelude template.

The prelude is an advanced feature that most users will not care about. It can
be used to create cross-references in your documentation. If you were using the
default templates before and you would like to keep the prelude, you will have
to copy them into your project. Take `contract.hbs` and `prelude.sample.hbs`
from the [`templates`](templates) directory, rename the latter to
`prelude.hbs`, and put them in a directory in your project. Then invoke
`solidity-docgen` with the `-t <templates-directory>` option.

There is one additional breaking change in 0.5.2. Please refer to the relevant
entry above.

## 0.4.1

- Implemented support for dependency imports in input contracts.

## 0.4.0

- Upgraded solc to 0.6.

If you would like to upgrade `solidity-docgen` but continue using the 0.5
compiler, you can install `solc@0.5` in your project and run `solidity-docgen
--solc-module ./node_modules/solc`.
