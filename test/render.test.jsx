import React from 'react';
import renderer from 'react-test-renderer';

import { FunctionDocs } from '../src/render/FunctionDocs';
import { ContractDocs } from '../src/render/ContractDocs';

describe('ContractDocs', function () {
  test('no functions', function () {
    const contract = {
      name: 'Foo',
      devdoc: 'devdoc',
      functions: [],
    };

    const tree = renderer
      .create(<ContractDocs { ...contract } />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('1 function', function () {
    const foo = {
      methodIdentifier: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [],
      },
      devdoc: 'foo.devdoc',
    };

    const contract = {
      name: 'Foo',
      devdoc: 'devdoc',
      functions: [ foo ],
    };

    const tree = renderer
      .create(<ContractDocs { ...contract } />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('FunctionDocs', function () {
  test('basic function', function () {
    const foo = {
      methodIdentifier: 'foo()',
      astNode: {
        nodeType: 'FunctionDefinition',
        name: 'foo',
        parameters: [],
      },
      devdoc: 'foo.devdoc',
    };

    const tree = renderer
      .create(<FunctionDocs { ...foo } />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
