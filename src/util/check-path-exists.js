/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import fs from 'fs'

/**
 * Checks that the given path exists in the filesystem.
 * Throws error otherwise.
 */
export default function checkPathExists (givenPath) {
  if (!fs.existsSync(givenPath)) {
    throw new Error(`Path does not exist: ${givenPath}.`)
  }
}
