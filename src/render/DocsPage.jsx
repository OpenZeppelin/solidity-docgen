import React from 'react';

import { FrontMatter } from './FrontMatter';
import { ContractDocs } from './ContractDocs';

export function DocsPage(props) {
  const { frontMatter, intro, sections } = props;

  return [
    <FrontMatter data={ frontMatter } />,
    '\n\n',
    intro,
    '\n\n',
    sections.map(section => {
      if (section.type === 'contracts') {
        const title = !!frontMatter && `## ${section.title}`;

        return (
          <section>
            { '\n\n' }
            { title }
            { '\n\n' }
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
            { '\n\n' }
            ## { section.title }
            { '\n\n' }
            <DocsPage { ...section } />
          </section>
        );
      }
    }),
  ];
}

