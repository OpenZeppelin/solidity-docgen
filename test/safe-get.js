/* global describe, it */

/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import assert from 'assert'
import safeGet from '../src/util/safe-get'

describe('Safe Get', function () {
  describe('#safeGet()', function () {
    const TEST_OBJECT = { a: [{ b: { c: [1, 2, 3] } }] }
    it('should return existing nested values', function () {
      assert.deepEqual(
        safeGet(TEST_OBJECT, 'some object', 'a[0].b.c[1]'),
        2
      )
    })
    it('should throw error when value is missing', function () {
      assert.throws(() => {
        safeGet(TEST_OBJECT, 'some object', 'a[0].b.d')
      })
    })
  })
})
