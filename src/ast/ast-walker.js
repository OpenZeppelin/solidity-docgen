
/**
 * 
 */
export default class ASTWalker {
  constructor() {
    this.startFunctions = {}
    this.endFunctions = {}
  }

  setStartFunction (nodeType, fn) {
    this.startFunctions[nodeType] = fn
  }

  setEndFunction (nodeType, fn) {
    this.endFunctions[nodeType] = fn
  }

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

  _startVisit (node, state) {
    if (node === null || !(node.nodeType in this.startFunctions)) {
      return state
    }
    else {
      return this.startFunctions[node.nodeType](node, state)
    }
  }

  _endVisit (node, state) {
    if (node === null || !(node.nodeType in this.endFunctions)) {
      return state
    }
    else {
      return this.endFunctions[node.nodeType](node, state)
    }
  }
}
