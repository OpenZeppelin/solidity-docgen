const fs = require('fs')
const path = require('path')

const TYPE_TOKENS = [
  'var', 'bool', 'address', 'string', 'Int', 'Uint', 'Byte', 'Fixed', 'UFixed'
]

function rsplit (str, value) {
  const index = str.lastIndexOf(value)
  return [
    str.substring(0, index),
    str.substring(index + 1, str.length)
  ]
}

function normalizeTokenType (value) {
  if (value.endsWith("'")) {
    value = value.substring(0, value.length - 1)
  }
  if (value.startsWith("'")) {
    value = value.substring(1, value.length)
  }
  return value
}

function getTokenType (value) {
  if (value === 'Identifier' || value === 'from') {
    return 'Identifier'
  } else if (value === 'TrueLiteral' || value === 'FalseLiteral') {
    return 'Boolean'
  } else if (value === 'VersionLiteral') {
    return 'Version'
  } else if (value === 'StringLiteral') {
    return 'String'
  } else if (TYPE_TOKENS.includes(value)) {
    return 'Type'
  } else if (value === 'NumberUnit') {
    return 'Subdenomination'
  } else if (value === 'DecimalNumber') {
    return 'Numeric'
  } else if (value === 'HexLiteral') {
    return 'Hex'
  } else if (value === 'ReservedKeyword') {
    return 'Reserved'
  } else if (/^\W+$/.test(value)) {
    return 'Punctuator'
  } else {
    return value
  }
}

function getTokenTypeMap () {
  const filePath = path.join(__dirname, '../lib/Solidity.tokens')

  return fs.readFileSync(filePath).toString('utf-8').split('\n')
    .map(line => rsplit(line, '='))
    .reduce((acum, [value, key]) => {
      acum[parseInt(key, 10)] = normalizeTokenType(value)
      return acum
    }, {})
}

function buildTokenList (tokens, options) {
  const tokenTypes = getTokenTypeMap()

  return tokens.map(token => {
    const type = getTokenType(tokenTypes[token.type])
    const node = { type, value: token.text }
    if (options.range) {
      node.range = [token.start, token.stop + 1]
    }
    if (options.loc) {
      node.loc = {
        start: { line: token.line, column: token.column },
        end: { line: token.line, column: token.column + token.text.length }
      }
    }
    return node
  })
}

exports.buildTokenList = buildTokenList
