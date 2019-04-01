import React from 'react';

export function FunctionIdentifier(props) {
  const { identifier, returnType, withReturn = false } = props;

  const returnArrowAndType = returnType !== undefined && withReturn && <>
    {' '}
    <span className="return-arrow">&rarr;</span>
    {' '}
    <span className="return-type">{ returnType }</span>
  </>;

  return (
    <code className="function-signature">
      { identifier }{ returnArrowAndType }
    </code>
  );
}
