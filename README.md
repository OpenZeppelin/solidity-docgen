# `solidity-docgen`

**Documentation generator for smart contract libraries.** Use the inline
documentation in your Solidity code for generating websites or any sort of
document.

The output is completely customizable through Handlebars templates that provide
easy access to all the metadata of your smart contract.

## Usage

> **Note:** Detailed usage information is not available yet. Please be patient!

```sh
npm install solidity-docgen
```

`solidity-docgen` takes as input a directory of contracts and `README`
documents. This directory is specified using the `--input`/`-i` flag,
defaulting to `./contracts`. It produces a set of files that it will place in
the output directory specified by `--output`/`-o`, defaulting to `./docs`.

```
solidity-docgen [ -i <input-dir> ] [ -o <output-dir> ] [ -t <templates-dir> ]
```

[NatSpec]: https://solidity.readthedocs.io/en/develop/natspec-format.html

### Solidity 0.7

The built in compiler remains solc 0.6, but users who want to use the newer compiler version can do so by installing the desired solc version and using the flag `--solc-module`. Here's an example using npm aliases:
```
npm install -D solc-0.7@npm:solc@^0.7.0
npx solidity-docgen --solc-module solc-0.7
```