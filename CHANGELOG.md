# Changelog

## 0.6.0

This version is a complete rewrite and redesign of the library that is currently in beta.

## 0.5.16

- Change handling of circular dependencies to an incomplete but correct approach, fixing a potential issue with bad caching.

## 0.5.15

- Fix use of `@inheritdoc` in circularly dependent files.

## 0.5.14

- Add support for documenting structs and enums: `{{structs}}`, `{{ownStructs}}`, and likewise for enums.

## 0.5.13

- Fix a bug when parsing @custom NatSpec tags.

## 0.5.12

- Add support for @custom: NatSpec tags.

## 0.5.11

- Provide a `privateFunctions` array variable in the contract template.

## 0.5.10

- Add support for @inheritdoc NatSpec tag.

## 0.5.9

- Fix bug introduced in 0.5.8 for projects with dependencies.

## 0.5.8

- Fixed trimming of whitespace at the beginning of NatSpec lines.
- Fixed issues with ignored newlines in solc >= 0.6.9.

This may change the output slightly for all users of solc >= 0.6. This
shouldn't be an issue if the output format is Markdown.

## 0.5.7

- Fixed a bug that caused `solidity-docgen` to fail with solc >=0.7.1.

## 0.5.6

- Fixed a bug that prevented using solc 0.7 with the `--solc-module` option.

The built in compiler remains solc 0.6, but users who want to use the newer
compiler version can do so by installing the desired solc version and using the
flag `--solc-module`. Here's an example using npm aliases:

```
npm install -D solc-0.7@npm:solc@^0.7.0
npx solidity-docgen --solc-module solc-0.7
```

## 0.5.5

- Fixed a bug in the `contracts` output structure that would result in
  contracts missing from the output if there was more than one defined in the
  same Solidity source file.

This is technically a breaking change in how output paths are generated, but it
should not affect most people. In particular, users who follow the convention
of naming Solidity files by the contract that they contain will not be affected
at all. Users who follow a different convention and who use the `contracts`
output structure (the default) will see output files generated in a
different path.

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
