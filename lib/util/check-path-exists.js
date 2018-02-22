'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkPathExists;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks that the given path exists in the filesystem.
 * Throws error otherwise.
 */
function checkPathExists(givenPath) {
  if (!_fs2.default.existsSync(givenPath)) {
    throw new Error('Path does not exist: ' + givenPath + '.');
  }
} /**
   * @license
   * MIT Licensed.
   * Copyright (c) 2018 OpenZeppelin.
   * See LICENSE file in project's root directory.
   */