import React from 'react';
import renderer from 'react-test-renderer';

import { FunctionDocs } from './FunctionDocs';

describe('FunctionDocs', function () {
  test('basic function', function () {
    const foo = {
      signature: 'foo()',
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
