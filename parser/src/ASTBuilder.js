const antlr4 = require('../antlr4/index')

function mapCommasToNulls(children) {
  let comma = true

  let lastNotEmpty = children.reduce(function (acc, el, idx) {
    if (el.children) {
      return idx
    }
    return acc
  })

  return children.reduce(function (acc, el, idx) {
    // we assume el is a terminal node if it has no children
    if (!el.children) {
      if (comma || idx > lastNotEmpty) {
        acc.push(null)
      } else {
        comma = true
      }
    } else {
      acc.push(el)
      comma = false
    }
    return acc
  }, [])
}

const transformAST = {
  SourceUnit (ctx) {
    // last element is EOF terminal node
    return {
      children: this.visit(ctx.children.slice(0, -1))
    }
  },

  EnumDefinition (ctx) {
    let natspec = null
    if (ctx.natspec(0)) {
      natspec = ctx.natspec(0).getText()
    }

    return {
      name: ctx.identifier().getText(),
      members: this.visit(ctx.enumValue()),
      natspec
    }
  },

  EnumValue (ctx) {
    return {
      name: ctx.identifier().getText()
    }
  },

  UsingForDeclaration (ctx) {
    let typeName = null
    if (ctx.getChild(3).getText() !== '*') {
      typeName = this.visit(ctx.getChild(3))
    }

    return {
      typeName,
      libraryName: ctx.identifier().getText()
    }
  },

  PragmaDirective (ctx) {
    return {
      name: ctx.pragmaName().getText(),
      value: ctx.pragmaValue().getText()
    }
  },

  ContractDefinition (ctx) {
    const name = ctx.identifier().getText()
    this._currentContract = name
    
    const maybeKind = ctx.getChild(0).getText()
    const natspec = ctx.natspec(0)
    const kind = natspec ? ctx.getChild(1).getText() : ctx.getChild(0).getText()

    return {
      name,
      baseContracts: this.visit(ctx.inheritanceSpecifier()),
      subNodes: this.visit(ctx.contractPart()),
      natspec: natspec && natspec.getText(),
      kind
    }
  },

  InheritanceSpecifier (ctx) {
    return {
      baseName: this.visit(ctx.userDefinedTypeName()),
      arguments: this.visit(ctx.expression())
    }
  },

  ContractPart (ctx) {
    return this.visit(ctx.children[0])
  },

  FunctionDefinition (ctx) {
    let name = ''
    if (ctx.identifier(0)) {
      name = ctx.identifier(0).getText()
    }
    const parameters = this.visit(ctx.parameterList())

    let block = null
    if (ctx.block()) {
      block = this.visit(ctx.block())
    }

    let natspec = null
    if (ctx.natspec(0)) {
      natspec = ctx.natspec(0).getText()
    }

    const modifiers = ctx
      .modifierList()
      .modifierInvocation()
      .map(mod => this.visit(mod))

    // parse function visibility
    let visibility = 'default'
    if (ctx.modifierList().ExternalKeyword(0)) {
      visibility = 'external'
    } else if (ctx.modifierList().InternalKeyword(0)) {
      visibility = 'internal'
    } else if (ctx.modifierList().PublicKeyword(0)) {
      visibility = 'public'
    } else if (ctx.modifierList().PrivateKeyword(0)) {
      visibility = 'private'
    }

    let stateMutability = null
    if (ctx.modifierList().stateMutability(0)) {
      stateMutability = ctx.modifierList().stateMutability(0).getText()
    }

    return {
      name,
      parameters,
      body: block,
      visibility,
      modifiers,
      isConstructor: name === this._currentContract,
      stateMutability,
      natspec
    }
  },

  ModifierInvocation (ctx) {
    const exprList = ctx.expressionList()

    let args
    if (exprList != null) {
      args = this.visit(exprList.expression())
    } else {
      args = []
    }

    return {
      name: ctx.identifier().getText(),
      arguments: args
    }
  },

  ElementaryTypeNameExpression (ctx) {
    return {
      typeName: this.visit(ctx.elementaryTypeName())
    }
  },

  TypeName (ctx) {
    if (
      ctx.children.length === 4 &&
      ctx.getChild(1).getText() === '[' &&
      ctx.getChild(3).getText() === ']'
    ) {
      this.visit(ctx.children[0])

      return {
        type: 'ArrayTypeName',
        baseTypeName: this.visit(ctx.getChild(0)),
        length: this.visit(ctx.getChild(2))
      }
    }
    return this.visit(ctx.getChild(0))
  },

  FunctionTypeName (ctx) {
    const parameterTypes = ctx
      .functionTypeParameterList(0)
      .functionTypeParameter()
      .map(typeCtx => this.visit(typeCtx))

    let returnTypes = []
    if (ctx.functionTypeParameterList(1)) {
      returnTypes = ctx
        .functionTypeParameterList(1)
        .functionTypeParameter()
        .map(typeCtx => this.visit(typeCtx))
    }

    let visibility = 'default'
    if (ctx.InternalKeyword(0)) {
      visibility = 'internal'
    } else if (ctx.ExternalKeyword(0)) {
      visibility = 'external'
    }

    let stateMutability = null
    if (ctx.stateMutability(0)) {
      stateMutability = ctx.stateMutability(0).getText()
    }

    return {
      parameterTypes,
      returnTypes,
      visibility,
      stateMutability,
    }
  },

  ReturnStatement (ctx) {
    let expression = null
    if (ctx.expression()) {
      expression = this.visit(ctx.expression())
    }

    return { expression }
  },

  StructDefinition (ctx) {
    return {
      name: ctx.identifier().getText(),
      members: this.visit(ctx.variableDeclaration())
    }
  },

  VariableDeclaration (ctx) {
    let storageLocation = null
    if (ctx.storageLocation()) {
      storageLocation = ctx.storageLocation().getText()
    }

    return {
      typeName: this.visit(ctx.typeName()),
      name: ctx.identifier().getText(),
      storageLocation,
      isStateVar: false,
      isIndexed: false
    }
  },

  EventParameter (ctx) {
    let storageLocation = null
    if (ctx.storageLocation(0)) {
      storageLocation = ctx.storageLocation(0).getText()
    }

    return {
      type: 'VariableDeclaration',
      typeName: this.visit(ctx.typeName()),
      name: ctx.identifier().getText(),
      storageLocation,
      isStateVar: false,
      isIndexed: !!ctx.IndexedKeyword(0)
    }
  },

  FunctionTypeParameter (ctx) {
    let storageLocation = null
    if (ctx.storageLocation()) {
      storageLocation = ctx.storageLocation().getText()
    }

    return {
      type: 'VariableDeclaration',
      typeName: this.visit(ctx.typeName()),
      name: null,
      storageLocation,
      isStateVar: false,
      isIndexed: false
    }
  },

  WhileStatement (ctx) {
    return {
      condition: this.visit(ctx.expression()),
      body: this.visit(ctx.statement())
    }
  },

  DoWhileStatement (ctx) {
    return {
      condition: this.visit(ctx.expression()),
      body: this.visit(ctx.statement())
    }
  },

  IfStatement (ctx) {
    const trueBody = this.visit(ctx.statement(0))

    let falseBody = null
    if (ctx.statement().length > 1) {
      falseBody = this.visit(ctx.statement(1))
    }

    return {
      condition: this.visit(ctx.expression()),
      trueBody,
      falseBody
    }
  },

  UserDefinedTypeName (ctx) {
    return {
      namePath: ctx.getText()
    }
  },

  ElementaryTypeName (ctx) {
    return {
      name: ctx.getText()
    }
  },

  Block (ctx) {
    return {
      statements: this.visit(ctx.statement())
    }
  },

  ExpressionStatement (ctx) {
    return {
      expression: this.visit(ctx.expression())
    }
  },

  NumberLiteral (ctx) {
    const number = ctx.getChild(0).getText()
    let subdenomination = null

    if (ctx.children.length === 2) {
      subdenomination = ctx.getChild(1).getText()
    }

    return {
      number,
      subdenomination
    }
  },

  Mapping (ctx) {
    return {
      keyType: this.visit(ctx.elementaryTypeName()),
      valueType: this.visit(ctx.typeName())
    }
  },

  ModifierDefinition (ctx) {
    let parameters = []
    if (ctx.parameterList()) {
      parameters = this.visit(ctx.parameterList())
    }

    let natspec = null
    if (ctx.natspec(0)) {
      natspec = ctx.natspec(0).getText()
    }

    return {
      name: ctx.identifier().getText(),
      parameters,
      body: this.visit(ctx.block()),
      natspec
    }
  },

  Statement (ctx) {
    return this.visit(ctx.getChild(0))
  },

  SimpleStatement (ctx) {
    return this.visit(ctx.getChild(0))
  },

  Expression (ctx) {
    let op

    switch (ctx.children.length) {
      case 1:
        // primary expression
        return this.visit(ctx.getChild(0))

      case 2:
        op = ctx.getChild(0).getText()

        // new expression
        if (op === 'new') {
          return {
            type: 'NewExpression',
            typeName: this.visit(ctx.typeName())
          }
        }

        // prefix operators
        if (['+', '-', '++', '--', '!', '~', 'after', 'delete'].includes(op)) {
          return {
            type: 'UnaryOperation',
            operator: op,
            subExpression: this.visit(ctx.getChild(1)),
            isPrefix: true
          }
        }

        op = ctx.getChild(1).getText()

        // postfix operators
        if (['++', '--'].includes(op)) {
          return {
            type: 'UnaryOperation',
            operator: op,
            subExpression: this.visit(ctx.getChild(0)),
            isPrefix: false
          }
        }
        break

      case 3:
        // treat parenthesis as no-op
        if (
          ctx.getChild(0).getText() === '(' &&
          ctx.getChild(2).getText() === ')'
        ) {
          return {
            type: 'TupleExpression',
            components: [this.visit(ctx.getChild(1))],
            isArray: false
          }
        }

        op = ctx.getChild(1).getText()

        // tuple separator
        if (op === ',') {
          return {
            type: 'TupleExpression',
            components: [
              this.visit(ctx.getChild(0)),
              this.visit(ctx.getChild(2))
            ],
            isArray: false
          }
        }

        // member access
        if (op === '.') {
          const expression = this.visit(ctx.getChild(0))
          const memberName = ctx.getChild(2).getText()
          return {
            type: 'MemberAccess',
            expression,
            memberName
          }
        }

        // binary operation
        const binOps = [
          '+',
          '-',
          '*',
          '/',
          '**',
          '%',
          '<<',
          '>>',
          '&&',
          '||',
          '&',
          '|',
          '^',
          '<',
          '>',
          '<=',
          '>=',
          '==',
          '!=',
          '=',
          '|=',
          '^=',
          '&=',
          '<<=',
          '>>=',
          '+=',
          '-=',
          '*=',
          '/=',
          '%='
        ]

        if (binOps.includes(op)) {
          return {
            type: 'BinaryOperation',
            operator: op,
            left: this.visit(ctx.getChild(0)),
            right: this.visit(ctx.getChild(2))
          }
        }
        break

      case 4:
        // function call
        if (
          ctx.getChild(1).getText() === '(' &&
          ctx.getChild(3).getText() === ')'
        ) {
          let args = []
          const names = []

          const ctxArgs = ctx.functionCallArguments()
          if (ctxArgs.expressionList()) {
            args = ctxArgs
              .expressionList()
              .expression()
              .map(exprCtx => this.visit(exprCtx))
          } else if (ctxArgs.nameValueList()) {
            for (const nameValue of ctxArgs.nameValueList().nameValue()) {
              args.push(this.visit(nameValue.expression()))
              names.push(nameValue.identifier().getText())
            }
          }

          return {
            type: 'FunctionCall',
            expression: this.visit(ctx.getChild(0)),
            arguments: args,
            names
          }
        }

        // index access
        if (
          ctx.getChild(1).getText() === '[' &&
          ctx.getChild(3).getText() === ']'
        ) {
          return {
            type: 'IndexAccess',
            base: this.visit(ctx.getChild(0)),
            index: this.visit(ctx.getChild(2))
          }
        }
        break

      case 5:
        // ternary operator
        if (
          ctx.getChild(1).getText() === '?' &&
          ctx.getChild(3).getText() === ':'
        ) {
          return {
            type: 'Conditional',
            condition: this.visit(ctx.getChild(0)),
            trueExpression: this.visit(ctx.getChild(2)),
            falseExpression: this.visit(ctx.getChild(4))
          }
        }
        break
    }

    throw new Error('unrecognized expression')
  },

  StateVariableDeclaration (ctx) {
    const type = this.visit(ctx.typeName())
    const iden = ctx.identifier()
    const name = iden.getText()

    let expression = null
    if (ctx.expression()) {
      expression = this.visit(ctx.expression())
    }

    let visibility = 'default'
    if (ctx.InternalKeyword(0)) {
      visibility = 'internal'
    } else if (ctx.PublicKeyword(0)) {
      visibility = 'public'
    } else if (ctx.PrivateKeyword(0)) {
      visibility = 'private'
    }

    let isDeclaredConst = false
    if (ctx.ConstantKeyword(0)) {
      isDeclaredConst = true
    }

    let natspec = null
    if (ctx.natspec(0)) {
      natspec = ctx.natspec(0).getText()
    }

    const decl = this.createNode({
      type: 'VariableDeclaration',
      typeName: type,
      name,
      expression,
      visibility,
      isStateVar: true,
      isDeclaredConst,
      isIndexed: false
    }, iden)

    return {
      variables: [decl],
      initialValue: expression,
      natspec
    }
  },

  ForStatement (ctx) {
    return {
      initExpression: this.visit(ctx.simpleStatement()),
      conditionExpression: this.visit(ctx.expression(0)),
      loopExpression: {
        type: 'ExpressionStatement',
        expression: this.visit(ctx.expression(1))
      },
      body: this.visit(ctx.statement())
    }
  },

  PrimaryExpression (ctx) {
    if (ctx.BooleanLiteral()) {
      return {
        type: 'BooleanLiteral',
        value: ctx.BooleanLiteral().getText() === 'true'
      }
    }

    if (ctx.HexLiteral()) {
      return {
        type: 'HexLiteral',
        value: ctx.HexLiteral().getText()
      }
    }

    if (ctx.StringLiteral()) {
      const text = ctx.getText()
      return {
        type: 'StringLiteral',
        value: text.substring(1, text.length - 1)
      }
    }

    return this.visit(ctx.getChild(0))
  },

  Identifier (ctx) {
    return {
      name: ctx.getText()
    }
  },

  TupleExpression (ctx) {
    // remove parentheses
    const children = ctx.children.slice(1, -1)
    const elements = mapCommasToNulls(children).map(expr => {
      // add a null for each empty value
      if (expr === null) {
        return null
      }
      return this.visit(expr)
    })

    return {
      elements,
      isArray: ctx.getChild(0).getText() === '['
    }
  },

  IdentifierList (ctx) {
    // remove parentheses
    const children = ctx.children.slice(1, -1)
    return mapCommasToNulls(children).map(iden => {
      // add a null for each empty value
      if (iden === null) {
        return null
      }

      return this.createNode(
        {
          type: 'VariableDeclaration',
          name: iden.getText(),
          isStateVar: false,
          isIndexed: false
        },
        iden
      )
    })
  },

  VariableDeclarationStatement (ctx) {
    let variables
    if (ctx.variableDeclaration()) {
      variables = [this.visit(ctx.variableDeclaration())]
    } else {
      variables = this.visit(ctx.identifierList())
    }

    let initialValue = null
    if (ctx.expression()) {
      initialValue = this.visit(ctx.expression())
    }

    return {
      variables,
      initialValue
    }
  },

  ImportDirective (ctx) {
    const pathString = ctx.StringLiteral().getText()
    let unitAlias = null
    let symbolAliases = null

    if (ctx.importDeclaration().length > 0) {
      symbolAliases = ctx.importDeclaration().map(decl => {
        const symbol = decl.identifier(0).getText()
        let alias = null
        if (decl.identifier(1)) {
          alias = decl.identifier(1).getText()
        }
        return [symbol, alias]
      })
    } else if (ctx.children.length === 7) {
      unitAlias = ctx.getChild(3).getText()
    } else if (ctx.children.length === 5) {
      unitAlias = ctx.getChild(3).getText()
    }

    return {
      path: pathString.substring(1, pathString.length - 1),
      unitAlias,
      symbolAliases
    }
  },

  EventDefinition (ctx) {
    let natspec = null
    if (ctx.natspec(0)) {
      natspec = ctx.natspec(0).getText()
    }

    return {
      name: ctx.identifier().getText(),
      parameters: this.visit(ctx.eventParameterList()),
      isAnonymous: !!ctx.AnonymousKeyword(),
      natspec
    }
  },

  EventParameterList (ctx) {
    const parameters = ctx.eventParameter().map(function (paramCtx) {
      const type = this.visit(paramCtx.typeName())
      let name = null
      if (paramCtx.identifier()) {
        name = paramCtx.identifier().getText()
      }

      return this.createNode({
        type: 'VariableDeclaration',
        typeName: type,
        name,
        isStateVar: false,
        isIndexed: !!paramCtx.IndexedKeyword(0)
      }, paramCtx)

    }, this)

    return {
      type: 'ParameterList',
      parameters
    }
  },

  ParameterList (ctx) {
    const parameters = ctx.parameter()
      .map(paramCtx => this.visit(paramCtx))
    return { parameters }
  },

  Parameter (ctx) {
    let storageLocation = null
    if (ctx.storageLocation()) {
      storageLocation = ctx.storageLocation().getText()
    }

    let name = null
    if (ctx.identifier()) {
      name = ctx.identifier().getText()
    }

    return {
      typeName: this.visit(ctx.typeName()),
      name,
      storageLocation,
      isStateVar: false,
      isIndexed: false
    }
  },

  InlineAssemblyStatement (ctx) {
    let language = null
    if (ctx.StringLiteral()) {
      language = ctx.StringLiteral().getText()
      language = language.substring(1, language.length - 1)
    }

    return {
      language,
      body: this.visit(ctx.assemblyBlock())
    }
  },

  AssemblyBlock (ctx) {
    const operations = ctx.assemblyItem().map(it => this.visit(it))

    return { operations }
  },

  AssemblyItem (ctx) {
    let text

    if (ctx.HexLiteral()) {
      return {
        type: 'HexLiteral',
        value: ctx.HexLiteral().getText()
      }
    }

    if (ctx.StringLiteral()) {
      text = ctx.StringLiteral().getText()
      return {
        type: 'StringLiteral',
        value: text.substring(1, text.length - 1)
      }
    }

    if (ctx.BreakKeyword()) {
      return {
        type: 'Break'
      }
    }

    if (ctx.ContinueKeyword()) {
      return {
        type: 'Continue'
      }
    }

    return this.visit(ctx.getChild(0))
  },

  AssemblyExpression (ctx) {
    return this.visit(ctx.getChild(0))
  },

  AssemblyCall (ctx) {
    const functionName = ctx.getChild(0).getText()
    const args = ctx.assemblyExpression().map(arg => this.visit(arg))

    return {
      functionName,
      arguments: args
    }
  },

  AssemblyLiteral (ctx) {
    let text

    if (ctx.StringLiteral()) {
      text = ctx.getText()
      return {
        type: 'StringLiteral',
        value: text.substring(1, text.length - 1)
      }
    }

    if (ctx.DecimalNumber()) {
      return {
        type: 'DecimalNumber',
        value: ctx.getText()
      }
    }

    if (ctx.HexNumber()) {
      return {
        type: 'HexNumber',
        value: ctx.getText()
      }
    }

    if (ctx.HexLiteral()) {
      return {
        type: 'HexLiteral',
        value: ctx.getText()
      }
    }
  },

  AssemblySwitch (ctx) {
    return {
      expression: this.visit(ctx.assemblyExpression()),
      cases: ctx.assemblyCase().map(c => this.visit(c))
    }
  },

  AssemblyCase (ctx) {
    let value = null
    if (ctx.getChild(0).getText() === 'case') {
      value = this.visit(ctx.assemblyLiteral())
    }

    const node = { block: this.visit(ctx.assemblyBlock()) }
    if (value !== null) {
      node.value = value
    } else {
      node.default = true
    }

    return node
  },

  AssemblyLocalDefinition (ctx) {
    let names = ctx.assemblyIdentifierOrList()
    if (names.identifier()) {
      names = [this.visit(names.identifier())]
    } else {
      names = this.visit(names.assemblyIdentifierList().identifier())
    }

    return {
      names,
      expression: this.visit(ctx.assemblyExpression())
    }
  },

  AssemblyFunctionDefinition (ctx) {
    const args = ctx.assemblyIdentifierList().identifier()
    const returnArgs = ctx
      .assemblyFunctionReturns()
      .assemblyIdentifierList()
      .identifier()

    return {
      name: ctx.identifier().getText(),
      arguments: this.visit(args),
      returnArguments: this.visit(returnArgs),
      body: this.visit(ctx.assemblyBlock())
    }
  },

  AssemblyAssignment (ctx) {
    let names = ctx.assemblyIdentifierOrList()
    if (names.identifier()) {
      names = [this.visit(names.identifier())]
    } else {
      names = this.visit(names.assemblyIdentifierList().identifier())
    }

    return {
      names,
      expression: this.visit(ctx.assemblyExpression())
    }
  },

  LabelDefinition (ctx) {
    return {
      name: ctx.identifier().getText()
    }
  },

  AssemblyStackAssignment (ctx) {
    return {
      name: ctx.identifier().getText()
    }
  },

  AssemblyFor (ctx) {
    return {
      pre: this.visit(ctx.getChild(1)),
      condition: this.visit(ctx.getChild(2)),
      post: this.visit(ctx.getChild(3)),
      body: this.visit(ctx.getChild(4))
    }
  },

  AssemblyIf (ctx) {
    return {
      condition: this.visit(ctx.assemblyExpression()),
      body: this.visit(ctx.assemblyBlock())
    }
  }
}

function ASTBuilder (options) {
  antlr4.tree.ParseTreeVisitor.call(this)
  this.options = options
}

ASTBuilder.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype)
ASTBuilder.prototype.constructor = ASTBuilder

ASTBuilder.prototype._loc = function (ctx) {
  const sourceLocation = {
    start: {
      line: ctx.start.line,
      column: ctx.start.column
    },
    end: {
      line: ctx.stop.line,
      column: ctx.stop.column
    }
  }
  return { loc: sourceLocation }
}

ASTBuilder.prototype._range = function (ctx) {
  return { range: [ctx.start.start, ctx.stop.stop] }
}

ASTBuilder.prototype.meta = function (ctx) {
  const ret = {}
  if (this.options.loc) {
    Object.assign(ret, this._loc(ctx))
  }
  if (this.options.range) {
    Object.assign(ret, this._range(ctx))
  }
  return ret
}

ASTBuilder.prototype.createNode = function (obj, ctx) {
  return Object.assign(obj, this.meta(ctx))
}

ASTBuilder.prototype.visit = function (ctx) {
  if (ctx == null) {
    return null
  }

  if (Array.isArray(ctx)) {
    return ctx.map(function (child) {
      return this.visit(child)
    }, this)
  }

  let name = ctx.constructor.name
  if (name.endsWith('Context')) {
    name = name.substring(0, name.length - 'Context'.length)
  }

  const node = { type: name }

  if (name in transformAST) {
    const visited = transformAST[name].call(this, ctx)
    if (Array.isArray(visited)) {
      return visited
    }
    Object.assign(node, visited)
  }

  return this.createNode(node, ctx)
}

module.exports = ASTBuilder
