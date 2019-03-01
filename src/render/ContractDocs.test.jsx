import React from 'react';
import renderer from 'react-test-renderer';

import { ContractDocs } from './ContractDocs';

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
    identifier: 'foo()',
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
