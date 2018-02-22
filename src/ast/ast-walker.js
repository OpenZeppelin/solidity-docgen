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
export default class AstWalker {
  constructor () {
    this.startFunctions = {}
    this.endFunctions = {}
  }

  /**
   * Defines a function to be called at the beginning of a
   * visit on a node of type nodeType.
   */
  setStartFunction (nodeType, fn) {
    this.startFunctions[nodeType] = fn
  }

  /**
   * Defines a function to be called at the end of a
   * visit on a node of type nodeType.
   */
  setEndFunction (nodeType, fn) {
    this.endFunctions[nodeType] = fn
  }

  /**
   * Walks over the AST with root at the given node, updating the
   * given initial state upon each visit of a descendant node.
   */
  walk (node, state) {
    if (node === null) {
      return state
    }
    state = this._startVisit(node, state)
    for (const key in node) {
      const child = node[key]
      if (typeof child === 'object') {
        state = this.walk(child, state)
      }
    }
    return this._endVisit(node, state)
  }

  /**
   * Call the corresponding start function when starting a visit
   * on the given node.
   */
  _startVisit (node, state) {
    if (node === null || !(node.nodeType in this.startFunctions)) {
      return state
    } else {
      return this.startFunctions[node.nodeType](node, state)
    }
  }

  /**
   * Call the corresponding end function when finishing a visit
   * on the given node.
   */
  _endVisit (node, state) {
    if (node === null || !(node.nodeType in this.endFunctions)) {
      return state
    } else {
      return this.endFunctions[node.nodeType](node, state)
    }
  }
}
