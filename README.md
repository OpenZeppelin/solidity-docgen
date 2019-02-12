# `solidity-docgen` (WIP)

**Documentation generator for libraries of smart contracts.**

`solidity-docgen` combines inline documentation with long form documents to
generate cohesive documentation pages that can be integrated into a static
website.

Used to generate the OpenZeppelin documentation.

## Features

- [ ] **Cross references.** Converts mentions of contracts and functions into links to their documentation.
- [ ] **Inheritance visualization.** Displays inheritance relationships and overriden functions.

## Install

```sh
npm install solidity-docgen
```

## Usage

1. Document your source code inline using the NatSpec format.
2. Write longer form documentation in markdown files next to your smart contracts.
3. Run `npx solidity-docgen` at the root of your project to generate documentation pages in the `docs/` directory.
4. Serve the documentation using a static site generator.
