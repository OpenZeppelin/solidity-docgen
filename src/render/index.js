import React from 'react';
import ReactDOMServer from 'react-dom/server';
import yaml from 'js-yaml';
import _ from 'lodash';

import { ContractDocs } from './ContractDocs';

export function renderDocs(docs) {
  const { frontMatter, intro, sections } = docs;

  const parts = [
    renderFrontMatter(frontMatter),
    intro,
    '<div class="contracts">',
    sections.map(renderSection),
    '</div>',
  ];

  return _.flattenDeep(parts)
    .filter(p => !_.isEmpty(p))
    .reduce(joinWithParagraphBreak);
}

export function renderSection(section) {
  const { title, contracts } = section;

  return [
    `## ${title}`,
    contracts.map(renderContract),
  ];
}

export function renderContract(contract) {
  return ReactDOMServer.renderToStaticMarkup(
    <ContractDocs { ...contract } />,
  );
}

export function renderFrontMatter(data) {
  if (_.isEmpty(data)) {
    return '---\n---\n';
  } else {
    const frontMatter = yaml.safeDump(data);
    return `---\n${frontMatter}---\n`;
  }
}

export function joinWithParagraphBreak(acc, str) {
  return acc.replace(/\n?\n?$/, str.replace(/^\n?\n?/, '\n\n'));
}
