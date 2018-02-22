'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

/**
 * Defines a walk over the Abstract Syntax Tree produced by
 * the Solidity compiler.
 */
var AstWalker = function () {
  function AstWalker() {
    _classCallCheck(this, AstWalker);

    this.startFunctions = {};
    this.endFunctions = {};
  }

  /**
   * Defines a function to be called at the beginning of a
   * visit on a node of type nodeType.
   */


  _createClass(AstWalker, [{
    key: 'setStartFunction',
    value: function setStartFunction(nodeType, fn) {
      this.startFunctions[nodeType] = fn;
    }

    /**
     * Defines a function to be called at the end of a
     * visit on a node of type nodeType.
     */

  }, {
    key: 'setEndFunction',
    value: function setEndFunction(nodeType, fn) {
      this.endFunctions[nodeType] = fn;
    }

    /**
     * Walks over the AST with root at the given node, updating the
     * given initial state upon each visit of a descendant node.
     */

  }, {
    key: 'walk',
    value: function walk(node, state) {
      if (node === null) {
        return state;
      }
      state = this._startVisit(node, state);
      for (var key in node) {
        var child = node[key];
        if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
          state = this.walk(child, state);
        }
      }
      return this._endVisit(node, state);
    }

    /**
     * Call the corresponding start function when starting a visit
     * on the given node.
     */

  }, {
    key: '_startVisit',
    value: function _startVisit(node, state) {
      if (node === null || !(node.nodeType in this.startFunctions)) {
        return state;
      } else {
        return this.startFunctions[node.nodeType](node, state);
      }
    }

    /**
     * Call the corresponding end function when finishing a visit
     * on the given node.
     */

  }, {
    key: '_endVisit',
    value: function _endVisit(node, state) {
      if (node === null || !(node.nodeType in this.endFunctions)) {
        return state;
      } else {
        return this.endFunctions[node.nodeType](node, state);
      }
    }
  }]);

  return AstWalker;
}();

exports.default = AstWalker;