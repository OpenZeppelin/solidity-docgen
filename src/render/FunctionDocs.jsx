import React from 'react';

export function FunctionDocs(props) {
  const { identifier, devdoc } = props;

  return (
    <>
    <h3>{ identifier }</h3>
    { '\n\n' }
    { devdoc }
    { '\n\n' }
    </>
  );
}
