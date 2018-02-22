/* global describe, it */

/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import assert from 'assert'
import parseNatSpec from '../src/util/parse-natspec'

describe('NatSpec', function () {
  describe('#parseNatSpec()', function () {
    it('should parse conformant NatSpec docstrings for contracts', function () {
      assert.deepEqual(
        parseNatSpec([
          'Some really interesting documentation comment, which ',
          'can also be multi-line.',
          '@title AwesomeContract',
          '@author great@coder.com',
          '@notice Some multi-line comment meant for users interacting ',
          'with this awesome contract.',
          '@dev Some other comment which is specifically meant for developers.'
        ].join('\n')),
        {
          extra: 'Some really interesting documentation comment, which can also be multi-line.',
          title: 'AwesomeContract',
          author: 'great@coder.com',
          notice: 'Some multi-line comment meant for users interacting with this awesome contract.',
          dev: 'Some other comment which is specifically meant for developers.'
        }
      )
    })
  })
  it('should parse conformant NatSpec docstrings for functions', function () {
    assert.deepEqual(
      parseNatSpec([
        'Some really interesting documentation comment, which ',
        'can also be multi-line.',
        '@author great@coder.com',
        '@notice Some multi-line comment meant for users interacting ',
        'with this awesome contract.',
        '@dev Some other comment which is specifically meant for developers.',
        '@param someInt a useful integer parameter',
        '@param someBool a useful bool parameter',
        '@return true if 1 equals 1, else false'
      ].join('\n')),
      {
        extra: 'Some really interesting documentation comment, which can also be multi-line.',
        author: 'great@coder.com',
        notice: 'Some multi-line comment meant for users interacting with this awesome contract.',
        dev: 'Some other comment which is specifically meant for developers.',
        'param:someInt': 'a useful integer parameter',
        'param:someBool': 'a useful bool parameter',
        return: 'true if 1 equals 1, else false'
      }
    )
  })
})
