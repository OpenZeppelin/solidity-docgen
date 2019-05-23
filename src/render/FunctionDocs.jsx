import React from 'react';

import { FunctionIdentifier } from './FunctionIdentifier';

export function FunctionDocs(props) {
  const { signature, devdoc, contractName, visibility } = props;

  return (
    <>
    { '\n\n' }
    <h4>
      <a className="anchor" aria-hidden="true" id={ contractName + '.' + signature }></a>
      <FunctionIdentifier withReturn { ...props } />
      <span className="function-visibility">{ visibility }</span>
    </h4>
    { '\n\n' }
    { devdoc }
    { '\n\n' }
    </>
  );
}
