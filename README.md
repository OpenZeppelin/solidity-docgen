# Solidity Documentation Generator

Simple documentation generator for Solidity files currently used for [OpenZeppelin](https://github.com/OpenZeppelin/zeppelin-solidity).

Builds a fully customizable [Docusaurus](https://docusaurus.io/)-powered website containing your API and any additional informational documents you may choose to add.

## Dependencies

* [Node.js](https://nodejs.org/en/): 8.x.
* [npm](https://nodejs.org/en/): 5.6.x.
* [solc](https://github.com/ethereum/solidity): v0.4.21 &ast;.
* [Docusaurus](http://docusaurus.io/): existing Docusaurus project.

&ast; For `solidity-docgen` to work properly, a bug-fix was submitted via pull request to the Solidity compiler. Any release after the corresponding [commit](https://github.com/ethereum/solidity/commit/ca6957da37454ddd474b1feeaf02f7d06cba06b0) should include the bug-fix.

## Installation and Usage

### Globally

You may wish to install this package globally:

```sh
npm install -g solidity-docgen
```

This will allow you to use `solidity-docgen` as an executable with the following command-line interface:

```
Usage: solidity-docgen [options] <project_path> <contracts_path> <docusaurus_path>
  Options:

    -v, --version          output the version number
    -x, --exclude <paths>  Comma-separated list of paths to exclude
    -h, --help             output usage information
```

where `project_path` is the path to any directory containing a `package.json` file, `contracts_path` is the path to the directory containing all the project's Solidity contracts, and `docusaurus_path` is path to an existing Docusaurus project where all API documents will be created.

For example, if your [Truffle](http://truffleframework.com/) project is at location `~/dev/smartcontractz` and your Docusaurus project for documentation is at location `~/dev/smartcontractz/docs`, you can use the following commands to generate API documentation for your project:

```sh
solidity-docgen --exclude examples ~/dev/smartcontractz ~/dev/smartcontractz/contracts ~/dev/smartcontractz/docs
```

which will generate a Docusaurus document for every contract in your codebase.

### Locally

You can also install this package locally with the following command:

```sh
npm install --save-dev solidity-docgen
```

You can still use `solidity-docgen` as an executable found at `<project_root>/node_modules/.bin/solidity-docgen` or with the help of [npx](https://www.npmjs.com/package/npx).

### Programatically

If you wish to call `solidity-docgen` from your code, you can simply `require` the project and use it as a function:

```javascript
const docgen = require('solidity-docgen').default
docgen('~/dev/smartcontractz/', '~/dev/smartcontractz/contracts/', '~/dev/smartcontractz/docs/', ['examples'])
```

## Dealing with Imports

If your project uses imports from code which is external to your codebase - like is often the case when using [Truffle](http://truffleframework.com/) - `solc` needs to know where to find the external modules.

For example, if you have the following code in your project:

```solidity
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';

contract MyCrowdsale is Crowdsale {
  // ...
}
```

You can run `solidity-docgen` with the following command in order for `solc` to parse your project correctly:

```sh
SOLC_ARGS='zeppelin-solidity=~/dev/smartcontractz/node_modules/zeppelin-solidity' \
solidity-docgen ~/dev/smartcontractz ~/dev/smartcontractz/contracts ~/dev/smartcontractz/docs
```

## How Does it Work?

Given a [Docusarus](https://docusaurus.io/) template project, `solidity-docgen` uses the combined-json output produced by the [Solidity compiler](https://github.com/ethereum/solidity) to generate a Docusaurus document for every Solidity contract in the `<contracts_path>` directory. You can modify the Docusaurus project, for example by customizing styles or adding new introductory documents, and re-run `solidity-docgen` at a later stage.

## Development

To develop `solidity-docgen`, the following commands will come in handy:

* `npm run lint`: Runs the [StandardJS](https://standardjs.com/) linter on the codebase.
* `npm run build`: Babelifies the `src` directory into the `lib` directory.
* `npm run build:watch`: Like the previous, but repeats the build after any changes on the `src` directory.
* `npm run test`: Runs all tests.

## TODOs

- [ ] Add more tests.
- [ ] Continuous Integration.
