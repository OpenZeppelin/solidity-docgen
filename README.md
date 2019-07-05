# `solidity-docgen`

**Documentation generator for smart contract libraries.**

`solidity-docgen` allows you to document your code inline using [NatSpec]
comments (a format similar to Javadoc and JSDoc) and then produce a website
to publish the documentation.

Built with :heart: by OpenZeppelin.

## Usage

```sh
npm install solidity-docgen
```

```
solidity-docgen [ -c <contractsDir> ] [ -o <outputDir> ]
```



## Usage

1. Document your source code in inline comments using `@dev` tags in the [NatSpec] format.
2. Write longer form documentation in a README.md file next to your smart contracts. (Optional)
3. Run `npx solidity-docgen` at the root of your project to generate documentation pages in the `docs/` directory.
4. Serve the documentation using a static site generator.

[NatSpec]: https://solidity.readthedocs.io/en/develop/natspec-format.html
