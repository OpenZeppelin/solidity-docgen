/**
 * Copyright (c) 2018-present, Open Zeppelin. 
 * Copyright (c) 2017, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const siteConfig = require(process.cwd() + '/siteConfig.js');

class Index extends React.Component {
  render() {
    const script = `window.location.replace("${docUrl('open-zeppelin.html')}")`;
    return (
      <script dangerouslySetInnerHTML={{ __html: script }}></script>
    );
  }
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

module.exports = Index;
