import React from 'react';

export function FunctionDocs(props) {
  const { identifier, devdoc, contractName } = props;

  return (
    <>
    <h3 id={ contractName + '.' + identifier }>{ identifier }</h3>
    { '\n\n' }
    { devdoc }
    { '\n\n' }
    </>
  );
}
