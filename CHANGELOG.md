# Changelog

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

## 0.4.1

- Implemented support for dependency imports in input contracts.

## 0.4.0

- Upgraded solc to 0.6.

If you would like to upgrade `solidity-docgen` but continue using the 0.5
compiler, you can install `solc@0.5` in your project and run `solidity-docgen
--solc-module ./node_modules/solc`.
