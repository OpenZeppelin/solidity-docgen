import React from 'react';

export function FunctionIdentifier(props) {
  const { signatureWithNames, returnType, withReturn = false } = props;

  const returnArrowAndType = returnType !== undefined && withReturn && <>
    {' '}
    <span className="return-arrow">&rarr;</span>
    {' '}
    <span className="return-type">{ returnType }</span>
  </>;

  return (
    <code className="function-signature">
      { signatureWithNames }{ returnArrowAndType }
    </code>
  );
}
