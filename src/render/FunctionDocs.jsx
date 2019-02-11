import React from 'react';

export function FunctionDocs(props) {
  const { methodIdentifier, devdoc } = props;

  return (
    <>
      <h2>{ methodIdentifier }</h2>
      { devdoc }
    </>
  );
}
