/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import _ from 'lodash'

/**
 * Gets the value at path of object. If no such value can be found,
 * an error is thrown.
 */
export default function safeGet (object, objectName, path) {
  const value = _.get(object, path, undefined)
  if (value === undefined) {
    throw new Error(`Missing property '${path}' in ${objectName}.`)
  }
  return value
}
