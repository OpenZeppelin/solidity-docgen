# `solidity-docgen` (WIP)

**Documentation generator for libraries of smart contracts.**

`solidity-docgen` combines inline documentation with long form documents to
generate documentation pages that can be easily made into a static site.

Used to generate the documentation for OpenZeppelin.

## Install

```sh
npm install solidity-docgen
```

## Usage

1. Document your source code in inline comments using `@dev` tags in the [NatSpec] format.
2. Write longer form documentation in a README.md file next to your smart contracts. (Optional)
3. Run `npx solidity-docgen` at the root of your project to generate documentation pages in the `docs/` directory.
4. Serve the documentation using a static site generator.

[NatSpec]: https://solidity.readthedocs.io/en/develop/natspec-format.html
