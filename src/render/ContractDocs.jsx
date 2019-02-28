import React from 'react';

import { FunctionDocs } from './FunctionDocs';

export function ContractDocs(props) {
  const { name, devdoc, functions } = props;

  const functionDocs = functions.map(fn => (
    <FunctionDocs key={ fn.methodIdentifier } {...fn} />
  ));

  return [
    <h2>{ name }</h2>,
    '\n\n',
    devdoc,
    '\n\n',
    functionDocs,
    '\n\n',
  ];
}
