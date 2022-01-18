# Architecture

The `main` function is the low level entry point to the solidity-docgen pipeline.

The input into the pipeline is one or more of the compiler's [standard JSON outputs] with at least the `ast` file output selection.

[standard JSON output]: https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description 

Users are not expected to use the low level entry point (though they can do it if it's the better option). Rather, they would normally use a higher level integration with their development environment that will read user configuration from a standard location and know how to request the compiler output JSON files. See the `hardhat` module as an example.

The pipeline is relatively simple and consists of two major stages:

1. `buildSite`: Searches Solidity files for documentable items (`DocItem`) and assigns each to an output page, also annotating items with the context in which they appear.
2. `render`: Renders each output page according to the templates.

Templates use [Handlebars].

[Handlebars]: https://handlebarsjs.com/

There is a special template partial (i.e. a sub-template) called `item` (defined in the function `itemPartial`) that augments an item with custom properties we call accessors that make templates easier to write, defined in `accessors`. Most things should not be accessors but template helpers, which are more versatile, available anywhere independently of the `item` partial, and can be provided by the user. A helper may become an accessor if this significantly improves template syntax.
