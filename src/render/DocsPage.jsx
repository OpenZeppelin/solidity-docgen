import React from 'react';

import { FrontMatter } from './FrontMatter';
import { ContractDocs } from './ContractDocs';

export function DocsPage(props) {
  const { frontMatter, title, intro, sections } = props;

  return [
    <FrontMatter data={ frontMatter } />,
    <h1>{ title }</h1>,
    '\n\n',
    intro,
    '\n\n',
    sections.map(section => {
      if (section.type === 'contracts') {
        return (
          <section>
            <h1>{ section.title }</h1>
            {
              section.contracts.map(contract => (
                <ContractDocs key={ contract.name } { ...contract } />
              ))
            }
          </section>
        );
      } else if (section.type === 'subdirectory') {
        return (
          <section>
            <DocsPage { ...section } />
          </section>
        );
      }
    }),
  ];
}

