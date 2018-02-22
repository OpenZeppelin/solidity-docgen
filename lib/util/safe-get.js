'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeGet;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the value at path of object. If no such value can be found,
 * an error is thrown.
 */
function safeGet(object, objectName, path) {
  var value = _lodash2.default.get(object, path, undefined);
  if (value === undefined) {
    throw new Error('Missing property \'' + path + '\' in ' + objectName + '.');
  }
  return value;
} /**
   * @license
   * MIT Licensed.
   * Copyright (c) 2018 OpenZeppelin.
   * See LICENSE file in project's root directory.
   */