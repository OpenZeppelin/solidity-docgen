/* global describe, it */

/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import { buildSectionId, compareSectionIds, buildDocId } from '../src/gen/util/index'
import assert from 'assert'

describe('NatSpec', function () {
  describe('#buildSectionId()', function () {
    it('should build section ids correctly', function () {
      assert.equal(
        buildSectionId('/d/contracts/a/b/C.sol', '/d/contracts'),
        'A / B'
      )
    })
  })
  describe('#compareSectionIds()', function () {
    it('should compare section ids correctly', function () {
      assert.equal(
        compareSectionIds('A / B', 'A / B / C'),
        -1
      )
      assert.equal(
        compareSectionIds('D', 'A / B / C'),
        1
      )
      assert.equal(
        compareSectionIds('UNCATEGORIZED', 'Z'),
        1
      )
    })
  })
  describe('#buildDocId()', function () {
    it('should build doc ids correctly', function () {
      assert.equal(
        buildDocId('/d/contracts/a/b/C.sol', 'I', '/d/contracts'),
        'a_b_C_I'
      )
    })
  })
})
