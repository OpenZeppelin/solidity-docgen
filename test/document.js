/* global describe, it */

/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import assert from 'assert'
import Document from '../src/components/document'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

describe('Document', function () {
  describe('#render()', function () {
    it('should render a document successfully', function () {
      const solcOutput = JSON.parse(fs.readFileSync('test/data/solc-output.json'))
      const contractDefinition = solcOutput.sources['bla/SomeContract.sol'].AST.nodes[1]
      ReactDOMServer.renderToStaticMarkup(
        <Document
          contractDefinition={contractDefinition}
          contractsPath={'bla/'}
          absolutePath={'bla/SomeContract.sol'}
          idToHyperlink={{}}
          version={'1.0.0'}
          repoBaseUrl={'http://gitlab.com/somerepo/'}
          repositoryRoot={''}
        />
      )
      assert.doesNotThrow(() => {
      })
    })
  })
})
