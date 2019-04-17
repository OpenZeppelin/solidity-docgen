import assert from 'assert';

import { getContractsPerFile, groupByDirectory, getFunctions, extractDocs, extractDocsPerDirectory } from './extract';

describe('getContractsPerFile', function () {
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

    const contractsPerFile = {
      'Foo.sol': [
        {
          contractName: 'Foo',
          astNode,
        },
      ],
    };

    assert.deepEqual(getContractsPerFile(solcOutput), contractsPerFile);
  });
});

describe('groupByDirectory', function () {
  const A1 = {};
  const A2 = {};
  const B1 = {};
  const C1 = {};

  test('depth 1', function () {
    const contracts = {
      'a/A1.sol': [ A1 ],
      'a/A2.sol': [ A2 ],
      'b/B1.sol': [ B1 ],
    };

    const groupedContracts = {
      'a': [ A1, A2 ],
      'b': [ B1 ],
    };

    assert.deepEqual(groupByDirectory(contracts), groupedContracts);
  });

  test('depth 1 and 2', function () {
    const contracts = {
      'a/A1.sol': [ A1 ],
      'a/A2.sol': [ A2 ],
      'b/B1.sol': [ B1 ],
      'b/c/C1.sol': [ C1 ],
    };

    const groupedContracts = {
      'a': [ A1, A2 ],
      'b': [ B1 ],
      'b/c': [ C1 ],
    };

    assert.deepEqual(groupByDirectory(contracts), groupedContracts);
  });
});

describe('getFunctions', function () {
  test('no arguments', function () {
    const foo = {
      signature: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: {
          parameters: [],
        },
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [ foo.astNode ],
      },
      devdoc: {
        methods: {
          [foo.signature]: {
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
      signature: 'foo(uint256)',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: {
          parameters: [
            {
              typeDescriptions: {
                typeString: 'uint256',
              },
            },
          ],
        },
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [ foo.astNode ],
      },
      devdoc: {
        methods: {
          [foo.signature]: {
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
      signature: 'foo(uint256,uint256)',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: {
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
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      astNode: {
        nodes: [ foo.astNode ],
      },
      devdoc: {
        methods: {
          [foo.signature]: {
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
      signature: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: {
          parameters: [],
        },
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const bar = {
      signature: 'bar()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'bar',
        parameters: {
          parameters: [],
        },
      },
      devdoc: Symbol('bar.devdoc'),
    };


    const contract = {
      astNode: {
        nodes: [ foo.astNode, bar.astNode ],
      },
      devdoc: {
        methods: {
          [bar.signature]: {
            details: bar.devdoc,
          },
          [foo.signature]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const functions = [ foo, bar ];

    assert.deepEqual(getFunctions(contract), functions);
  });
});

describe('extractDocs', function () {
  test('no functions', function () {
    const contractName = Symbol('name');
    const devdoc = Symbol('devdoc');

    const contract = {
      contractName,
      astNode: { nodes: [] },
      devdoc: {
        details: devdoc,
      },
    };

    const documentation = {
      name: contractName,
      devdoc,
      functions: [],
    };

    assert.deepEqual(extractDocs(contract), documentation);
  });

  test('1 function', function () {
    const contractName = Symbol('name');
    const devdoc = Symbol('devdoc');

    const foo = {
      signature: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: {
          parameters: [],
        },
      },
      devdoc: Symbol('foo.devdoc'),
    };

    const contract = {
      contractName,
      astNode: {
        nodes: [
          foo.astNode,
        ],
      },
      devdoc: {
        details: devdoc,
        methods: {
          [foo.signature]: {
            details: foo.devdoc,
          },
        },
      },
    };

    const documentation = {
      name: contractName,
      devdoc,
      functions: [ foo ],
    };

    assert.deepEqual(extractDocs(contract), documentation);
  });
});

describe('extractDocsPerDirectory', function () {
  test('1 contract in 1 subdirectory', function () {
    const astNode = {
      nodeType: 'ContractDefinition',
      name: 'Foo',
    };

    const devdoc = Symbol('devdoc');

    const solcOutput = {
      contracts: {
        'a/Foo.sol': {
          'Foo': {
            devdoc: {
              details: devdoc,
            },
          },
        },
      },
      sources: {
        'a/Foo.sol': {
          ast: {
            nodes: [ astNode ],
          },
        },
      },
    };

    const docsData = {
      'a': [
        {
          name: 'Foo',
          devdoc,
          functions: [],
        },
      ],
    };

    assert.deepEqual(extractDocsPerDirectory(solcOutput), docsData);
  });
});
