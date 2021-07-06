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


## Example Handlebars Formatting

Each of the following examples will go through various methods exposed by the solidity-docgen library, how to use them in handlebars, and what the resulting markdown output would look like.

1. Getting the natspec @dev and @notice tags

### Handlebars formatting:

``` {{{natspec.userdoc}}}
    {{{natspec.devdoc}}}
```

### Markdown output:

This is the comment next to the @notice tag.
This is the comment next to the @dev tag. 


2. Functions and Events
Your handlebars template can check if the underlying contract code is a function or an event with {{#if ownFunctions}} and {{#if ownEvents}} respectively. This lets you generate different markdown depending on if the underlying natspec is for functions or events. Use {{ownFunctions}} and {{ownEvents}} to iterate over all functions and events in the contract respectively.

### Handlebars formatting:
``` {{#if ownFunctions}
    ### Functions
    {{/if}}
    {{#ownFunctions}}
    - function {{name}}
    {{/ownFunctions}}
    {{/if ownFunctions}}
```


### Markdown Output:

### Functions
- function example1
- function example2
- function example3

3. Getting more data about a funcion

In 2. we saw how to iterate over the functions in a contract and each of the function names. Here is an example that gets more information related to a function including the input parameters, and visibility.

### Handlebars formatting:

``` {{#if ownFunctions}
    ### Functions
    {{/if}}
    {{#ownFunctions}}
    #### function {{name}}
    Parameters:
    {{natspec.params}}
    - {{param}}
    {{/natspec.params}}
    Visibility:
    - {{visibility}}
    {{#if outputs}} 
    Outputs:
    - {{outputs}}
    {{/if}}
    {{/ownFunctions}}
    {{/if ownFunctions}}
```

### Markdown Output:

### Functions
#### function example1
Parameters:
- param1
- param2
Visibliity:
- external
Outputs:
- bool return1

#### function example2
Parameters:
- param1
- param2
- param3
Visibliity:
- internal
Outputs:
- uint128 return0, uint128 return1

#### function example3
Parameters:
- param1
Visibliity:
- external
Outputs:
- int24 return1

4. Formatting a function signature
The nice thing about handlebars templating is that it just populates data into a markdown format. So you can use any markdown syntax to arrange your data such that it looks pretty when the markdown is generated! (The below does some fancy handlebar manipulation that you don't really need to understand. It essentially is populating the types of the parameters so that the output in markdown looks like a function signature.)

### Handlebars formatting:
``` 
### {{name}}
```solidity
  function {{name}}(
    {{#natspec.params}}
    {{#lookup ../args.types @index}}{{/lookup}} {{param}}{{#if @last}}{{else}},{{/if}}
    {{/natspec.params}}
  ) {{visibility}}{{#if outputs}} returns ({{outputs}}){{/if}}```

```

### Markdown Output:
Here is what the output for the example1 function would look like.

### example1
```solidity
    function example1(
    int24 param1,
    int24 param2
  ) external returns (bool return1)
```