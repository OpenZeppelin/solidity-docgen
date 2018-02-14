/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'OpenZeppelin',
  tagline: 'OpenZeppelin is an open framework of reusable and secure smart contracts in the Solidity language.',
  url: 'https://openzeppelin.org',
  baseUrl: '/api/',
  projectName: 'openzeppelin',
  headerLinks: [
    {
      href: 'https://openzeppelin.org',
      label: 'Home'
    },
    {
      href: 'https://github.com/OpenZeppelin',
      label: 'Github'
    },
    {
      href: 'https://blog.zeppelin.solutions/guides/home',
      label: 'Guides'
    },
    {
      href: 'https://blog.zeppelin.solutions',
      label: 'Blog'
    },
    {
      href: '#',
      label: 'Documentation'
    }
  ],
  headerIcon: 'img/logo-zeppelin.png',
  footerIcon: 'img/symbol-zeppelin.png',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#5CB6E4',
    secondaryColor: 'white',
  },
  copyright:
    'Copyright © 2018 Smart Contract Solutions',
  highlight: {
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  stylesheets: [
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Lato:100,200,300,400,500,700,400italic,700italic'
  ],
  repoUrl: 'https://github.com/OpenZeppelin/zeppelin-solidity',
};

module.exports = siteConfig;
