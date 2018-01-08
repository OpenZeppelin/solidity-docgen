const antlr4 = require('../antlr4/index')
const { SolidityLexer } = require('../lib/SolidityLexer')
const { SolidityParser } = require('../lib/SolidityParser')
const ASTBuilder = require('./ASTBuilder')
const ErrorListener = require('./ErrorListener')
const { buildTokenList } = require('./tokens')

function ParserError (args) {
  this.name = 'ParserError'
  this.message = args.errors.map(e => e.message).join('. ')
  this.errors = args.errors
  this.stack = new Error().stack
}

ParserError.prototype = Object.create(Error.prototype)
ParserError.prototype.constructor = ParserError

function tokenize (input, options) {
  options = options || {}

  const chars = antlr4.CharStreams.fromString(input)
  const lexer = new SolidityLexer(chars)
  const tokens = new antlr4.CommonTokenStream(lexer)
  
  return buildTokenList(tokens.tokenSource.getAllTokens(), options)
}

function parse (input, options) {
  options = options || {}

  const chars = antlr4.CharStreams.fromString(input)
  const lexer = new SolidityLexer(chars)
  const tokens = new antlr4.CommonTokenStream(lexer)

  const parser = new SolidityParser(tokens)
  const listener = new ErrorListener()

  parser.removeErrorListeners()
  parser.addErrorListener(listener)
  parser.buildParseTrees = true

  const tree = parser.sourceUnit()

  let tokenList
  if (options.tokens) {
    const tokenSource = tokens.tokenSource
    tokenSource.reset()

    tokenList = buildTokenList(tokenSource.getAllTokens(), options)
  }

  if (!options.tolerant && listener.hasErrors()) {
    throw new ParserError({ errors: listener.getErrors() })
  }

  const visitor = new ASTBuilder(options)
  const ast = visitor.visit(tree)

  if (options.tolerant && listener.hasErrors()) {
    ast.errors = listener.getErrors()
  }
  if (options.tokens) {
    ast.tokens = tokenList
  }

  return ast
}

function _isASTNode (node) {
  return !!node && typeof node === 'object' && node.hasOwnProperty('type')
}

function visit (node, visitor) {
  if (Array.isArray(node)) {
    node.forEach(child => visit(child, visitor))
  }

  if (!_isASTNode(node)) return

  let cont = true

  if (visitor[node.type]) {
    cont = visitor[node.type](node)
  }

  if (cont === false) return

  for (const prop in node) {
    if (node.hasOwnProperty(prop)) {
      visit(node[prop], visitor)
    }
  }

  const selector = node.type + ':exit'
  if (visitor[selector]) {
    visitor[selector](node)
  }
}

exports.tokenize = tokenize
exports.parse = parse
exports.visit = visit
exports.ParserError = ParserError
