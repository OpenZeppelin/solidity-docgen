import React from 'react';

export function FunctionDocs(props) {
  const { methodIdentifier, devdoc } = props;

  return [
    <h3>{ methodIdentifier }</h3>,
    '\n\n',
    devdoc,
    '\n\n',
  ];
}
