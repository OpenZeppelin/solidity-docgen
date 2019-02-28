import React from 'react';

import { ContractDocs } from './ContractDocs';

export function DocsPage(props) {
  const { head, contracts } = props;

  return [ 
    head,
    '\n\n',
    contracts.map(contract => <ContractDocs { ...contract } />),
  ];
}
