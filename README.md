# Solidity documentation generator

Simple documentation generator for Solidity files currently used for [OpenZeppelin](https://github.com/OpenZeppelin/zeppelin-solidity).

Builds a fully customizable [Docusaurus](https://docusaurus.io/)-powered website containing your API and any additional informational documents you may choose to add.

## Dependencies

* [Node.js](https://nodejs.org/en/): 8.x.
* [npm](https://nodejs.org/en/): 5.6.x.
* [solc](https://github.com/ethereum/solidity): v0.4.21 &ast;.
* [Docusaurus](http://docusaurus.io/): existing Docusaurus project.

&ast; For `soldoc` to work properly, a bug-fix was submitted via pull request to the Solidity compiler. Any release after the corresponding [commit](https://github.com/ethereum/solidity/commit/ca6957da37454ddd474b1feeaf02f7d06cba06b0) should include the bug-fix.

## Installation and Usage

### Globally

You may wish to install this package globally:

```
npm install -g soldoc
```

This will allow you to use `soldoc` as an executable with the following command-line interface:

```
Usage: soldoc [options] <project_path> <contracts_path> <docusaurus_path>
  Options:

    -v, --version          output the version number
    -x, --exclude <paths>  Comma-separated list of paths to exclude
    -h, --help             output usage information
```

where `project_path` is the path to any directory containing a `package.json` file, `contracts_path` is the path to the directory containing all the project's Solidity contracts, and `docusaurus_path` is path to an existing Docusaurus project where all API documents will be created.

For example, if your [Truffle](http://truffleframework.com/) project is at location `~/dev/smartcontractz` and your Docusaurus project for documentation is at location `~/dev/smartcontractz/docs`, you can use the following commands to generate API documentation for your project:

```sh
soldoc --exclude examples ~/dev/smartcontractz ~/dev/smartcontractz/contracts ~/dev/smartcontractz/docs
```

which will generate a Docusaurus document for every contract in your codebase.

### Locally

You can also install this package locally with the following command:

```sh
npm install --save-dev soldoc
```

You can still use `soldoc` as an executable found at `<project_root>/node_modules/.bin/soldoc` or with the help of [npx](https://www.npmjs.com/package/npx).

### Programatically

If you wish to call `soldoc` from your code, you can simply `require` the project and use it as a function:

```javascript
const soldoc = require('soldoc').default
soldoc('~/dev/smartcontractz/', '~/dev/smartcontractz/contracts/', '~/dev/smartcontractz/docs/', ['examples'])
```

## How Does it Work?

Given a [Docusarus](https://docusaurus.io/) template project, `soldoc` uses the combined-json output produced by the [Solidity compiler](https://github.com/ethereum/solidity) to generate a Docusaurus document for every Solidity contract in the `<contracts_path>` directory. You can modify the Docusaurus project, for example by customizing styles or adding new introductory documents, and re-run `soldoc` at a later stage.

## Development

To develop `soldoc`, the following commands will come in handy:

* `npm run lint`: Runs the [StandardJS](https://standardjs.com/) linter on the codebase.
* `npm run build`: Babelifies the `src` directory into the `lib` directory.
* `npm run build:watch`: Like the previous, but repeats the build after any changes on the `src` directory.
* `npm run test`: Runs all tests.

## TODOs

- [ ] Add more tests.
- [ ] Continuous Integration.
