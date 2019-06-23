import * as solc from './solc';
import { SoliditySource } from './solidity';

test('no files', function () {
  const solcOutput = new SolcOutputBuilder();

  const source = new SoliditySource(solcOutput);

  expect(source.files).toHaveLength(0);
  expect(source.contracts).toHaveLength(0);
});

test('one empty file', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol');

  const source = new SoliditySource(solcOutput);

  expect(source.files).toHaveLength(1);
});

test('one contract', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo');

  const source = new SoliditySource(solcOutput);

  expect(source.contracts).toHaveLength(1);
});

test('one own function', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test');

  const source = new SoliditySource(solcOutput);

  const foo = source.contracts[0];

  expect(foo.functions).toHaveLength(1);
});

test('one inherited function', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test')
    .contract('Bar', 'Foo');
    
  const source = new SoliditySource(solcOutput);

  const bar = source.contracts[1];

  expect(bar.functions).toHaveLength(1);
});

test('one multiply inherited function', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test')
    .contract('FooFlavor')
      .function('test')
    .contract('Bar', 'Foo', 'FooFlavor');
    
  const source = new SoliditySource(solcOutput);

  const bar = source.contracts[2];
  expect(bar.name).toBe('Bar');
  expect(bar.functions).toHaveLength(1);
});

test('two inherited functions with name overloading', function () {
  const solcOutput = new SolcOutputBuilder()
    .file('Foo.sol')
    .contract('Foo')
      .function('test', 'uint256')
      .function('test', 'string')
    .contract('FooFlavor', 'Foo');

  const source = new SoliditySource(solcOutput);
  const foof = source.contracts[1];
  expect(foof.functions).toHaveLength(2);
});

class SolcOutputBuilder implements solc.Output {
  contracts: { [file: string]: solc.FileData };
  sources: { [file: string]: solc.ast.SourceUnit };

  _currentFile: string;
  _currentContract: {
    data: solc.ContractData;
    astNode: solc.ast.ContractDefinition;
  };
  _nextId: number;
  _contractIds: { [contract: string]: number };

  constructor() {
    this.sources = {};
    this.contracts = {};
    this._nextId = 0;
    this._contractIds = {};
  }

  file(fileName: string) {
    this._currentFile = fileName;
    this.sources[fileName] = {
      nodeType: 'SourceUnit',
      nodes: [],
    };
    this.contracts[fileName] = {};
    return this;
  }

  contract(contractName: string, ...baseContracts: string[]) {
    const fileName = this._currentFile;
    if (!fileName) throw new Error('No file defined');
    const astNode: solc.ast.ContractDefinition = {
      nodeType: 'ContractDefinition',
      name: contractName,
      id: this._getContractId(contractName),
      baseContracts: baseContracts.map(baseName => ({
        baseName: {
          name: baseName,
          referencedDeclaration: this._getContractId(baseName),
        },
      })),
      nodes: [],
    };
    const data = {};
    this._currentContract = { astNode, data };
    this.sources[fileName].nodes.push(astNode);
    this.contracts[fileName][contractName] = data;
    return this;
  }

  _getContractId(contractName: string) {
    if (contractName in this._contractIds) {
      return this._contractIds[contractName];
    } else {
      const id = this._nextId;
      this._nextId += 1;
      this._contractIds[contractName] = id;
      return id;
    }
  }

  function(functionName: string, ...argTypes: string[]) {
    const kind =
      functionName === 'fallback' || functionName === 'constructor'
      ? functionName
      : 'function';
    const astNode: solc.ast.FunctionDefinition = {
      nodeType: 'FunctionDefinition',
      kind,
      name: functionName,
      parameters: {
        parameters: argTypes.map(t => ({
          typeName: {
            typeDescriptions: {
              typeString: t,
            },
          },
        })),
      },
    };
    this._currentContract.astNode.nodes.push(astNode);
    return this;
  }
}
