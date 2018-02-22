'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

/**
 * AST nodes types produced by the Solidity compiler.
 */
exports.default = Object.freeze({
  SOURCE_UNIT: 'SourceUnit',
  CONTRACT_DEFINITION: 'ContractDefinition',
  FUNCTION_DEFINITION: 'FunctionDefinition',
  MODIFIER_DEFINITION: 'ModifierDefinition',
  EVENT_DEFINITION: 'EventDefinition',
  ARRAY_TYPE_NAME: 'ArrayTypeName',
  FUNCTION_TYPE_NAME: 'FunctionTypeName'
});