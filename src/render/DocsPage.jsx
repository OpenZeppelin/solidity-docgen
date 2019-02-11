import React from 'react';

export function DocsPage(props) {
  const { readme, contracts } = props;

  return [ 
    readme,
    contracts.map(contract => <ContractDocs { ...contract } />),
  ];
}
