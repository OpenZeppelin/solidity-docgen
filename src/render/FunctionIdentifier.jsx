import React from 'react';

export function FunctionIdentifier(props) {
  const { identifier, returnType } = props;

  const returnArrowAndType = returnType && [
    <span className="return-arrow">&rarr;</span>,
    <span className="return-type">returnType</span>,
  ];

  return <code className="function-identifier">{ identifier }{ returnArrowAndType }</code>;
}
