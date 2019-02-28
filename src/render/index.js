import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { DocsPage } from './DocsPage';

export function renderDocs(docs) {
  return ReactDOMServer.renderToStaticMarkup(
    <DocsPage { ...docs } />,
  );
}
