/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'OpenZeppelin' /* title for your website */,
  tagline: 'OpenZeppelin is an open framework of reusable and secure smart contracts in the Solidity language.',
  url: 'https://openzeppelin.org' /* your website url */,
  baseUrl: '/test-docs/' /* base url for your project */,
  projectName: 'openzeppelin',
  headerLinks: [
    {doc: 'api', label: 'API'},
    {page: 'help', label: 'Help'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#5cb6e4',
    secondaryColor: '#205C3B',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © 2017 Zeppelin Solutions',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/OpenZeppelin/zeppelin-solidity',
};

module.exports = siteConfig;
