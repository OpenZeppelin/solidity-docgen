const assert = require('assert');

const { getContractsWithASTNodes, groupByDirectory, getFunctions, generateContractDocumentation } = require('../src/v2');

describe('getContractsWithASTNodes', function () {
  test('one contract in one file', function () {
    const astNode = {
      nodeType: 'ContractDefinition',
      name: 'Foo',
    };

    const solcOutput = {
      contracts: {
        'Foo.sol': {
          'Foo': {
          },
        },
      },
      sources: {
        'Foo.sol': {
          ast: {
            nodes: [ astNode ],
          },
        },
      },
    };

    const contractsWithASTNodes = getContractsWithASTNodes(solcOutput);

    assert.strictEqual(contractsWithASTNodes['Foo.sol']['Foo'].astNode, astNode);
  });
});

describe('groupByDirectory', function () {
  const A1 = {};
  const A2 = {};
  const B1 = {};
  const C1 = {};

  test('depth 1', function () {
    const contracts = {
      'a/A1.sol': { A1 },
      'a/A2.sol': { A2 },
      'b/B1.sol': { B1 },
    };

    const groupedContracts = {
      'a': { A1, A2 },
      'b': { B1 },
    };

    assert.deepEqual(groupByDirectory(contracts), groupedContracts);
  });

  test('depth 1 and 2', function () {
    const contracts = {
      'a/A1.sol': { A1 },
      'a/A2.sol': { A2 },
      'b/B1.sol': { B1 },
      'b/c/C1.sol': { C1 },
    };

    const groupedContracts = {
      'a': { A1, A2 },
      'b': { B1 },
      'b/c': { C1 },
    };

    assert.deepEqual(groupByDirectory(contracts), groupedContracts);
  });
});

describe('getFunctions', function () {
  test('no arguments', function () {
    const foo = {
      methodIdentifier: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [],
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [ foo.astNode ],
      },
      devdoc: {
        methods: {
          [foo.methodIdentifier]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const functions = [ foo ];

    assert.deepEqual(getFunctions(contract), functions);
  });

  test('1 argument', function () {
    const foo = {
      methodIdentifier: 'foo(uint256)',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [
          {
            typeDescriptions: {
              typeString: 'uint256',
            },
          },
        ],
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [ foo.astNode ],
      },
      devdoc: {
        methods: {
          [foo.methodIdentifier]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const functions = [ foo ];

    assert.deepEqual(getFunctions(contract), functions);
  });

  test('2 arguments', function () {
    const foo = {
      methodIdentifier: 'foo(uint256,uint256)',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [
          {
            typeDescriptions: {
              typeString: 'uint256',
            },
          },
          {
            typeDescriptions: {
              typeString: 'uint256',
            },
          },
        ],
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [ foo.astNode ],
      },
      devdoc: {
        methods: {
          [foo.methodIdentifier]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const functions = [ foo ];

    assert.deepEqual(getFunctions(contract), functions);
  });

  test('2 functions', function () {
    const foo = {
      methodIdentifier: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [],
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const bar = {
      methodIdentifier: 'bar()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'bar',
        parameters: [],
      },
      devdoc: Symbol('bar.devdoc'),
    };


    const contract = {
      astNode: {
        nodes: [ foo.astNode, bar.astNode ],
      },
      devdoc: {
        methods: {
          [bar.methodIdentifier]: {
            details: bar.devdoc,
          },
          [foo.methodIdentifier]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const functions = [ foo, bar ];

    assert.deepEqual(getFunctions(contract), functions);
  });
});

describe('generateContractDocumentation', function () {
  test('no functions', function () {
    const name = Symbol('name');
    const devdoc = Symbol('devdoc');

    const contract = {
      astNode: { nodes: [] },
      devdoc: {
        details: devdoc,
      },
    };

    const documentation = {
      name,
      devdoc,
      functions: [],
    };

    assert.deepEqual(generateContractDocumentation(contract, name), documentation);
  });

  test('1 function', function () {
    const name = Symbol('name');
    const devdoc = Symbol('devdoc');

    const foo = {
      methodIdentifier: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [],
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [
          foo.astNode,
        ],
      },
      devdoc: {
        details: devdoc,
        methods: {
          [foo.methodIdentifier]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const documentation = {
      name,
      devdoc,
      functions: [ foo ],
    };

    assert.deepEqual(generateContractDocumentation(contract, name), documentation);
  });
});
