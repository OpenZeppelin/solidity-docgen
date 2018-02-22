'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @license
                                                                                                                                                                                                                                                                   * MIT Licensed.
                                                                                                                                                                                                                                                                   * Copyright (c) 2018 OpenZeppelin.
                                                                                                                                                                                                                                                                   * See LICENSE file in project's root directory.
                                                                                                                                                                                                                                                                   */

exports.default = Document;

var _astNodeType = require('../ast/ast-node-type');

var _astNodeType2 = _interopRequireDefault(_astNodeType);

var _astWalker = require('../ast/ast-walker');

var _astWalker2 = _interopRequireDefault(_astWalker);

var _safeGet = require('../util/safe-get');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _parseNatspec = require('../util/parse-natspec');

var _parseNatspec2 = _interopRequireDefault(_parseNatspec);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render the content of a Docusaurus document for a specific contract.
 */
function Document(props) {
  var contractDefinition = props.contractDefinition;

  var itemDefinitions = getItemDefinitions(contractDefinition);
  return _react2.default.createElement(
    'div',
    { className: 'contract-doc' },
    _react2.default.createElement(Contract, props),
    _react2.default.createElement(Index, _extends({ itemDefinitions: itemDefinitions }, props)),
    _react2.default.createElement(Reference, _extends({ itemDefinitions: itemDefinitions }, props))
  );
}

/**
 * Render contract name and general description.
 */
function Contract(props) {
  var contractDefinition = props.contractDefinition;

  var documentation = (0, _safeGet2.default)(contractDefinition, 'contract', 'documentation');
  var natspecTags = (0, _parseNatspec2.default)(documentation);
  return _react2.default.createElement(
    'div',
    { className: 'contract' },
    _react2.default.createElement(Header, _extends({ contractDefinition: contractDefinition }, props)),
    _react2.default.createElement(BaseContracts, _extends({ contractDefinition: contractDefinition }, props)),
    _react2.default.createElement(ContractDescription, { documentation: documentation }),
    _react2.default.createElement(ContractSource, _extends({ contractDefinition: contractDefinition }, props)),
    _react2.default.createElement(ContractAuthor, { natspecTags: natspecTags })
  );
}

/**
 * Render contract kind and name.
 */
function Header(props) {
  var contractDefinition = props.contractDefinition;

  var contractKind = (0, _safeGet2.default)(contractDefinition, 'contract', 'contractKind');
  var name = (0, _safeGet2.default)(contractDefinition, 'contract', 'name');
  return _react2.default.createElement(
    'h2',
    { className: 'contract-header' },
    _react2.default.createElement(
      'span',
      { className: 'contract-kind' },
      contractKind
    ),
    '\xA0',
    name
  );
}

/**
 * Render base contracts.
 */
function BaseContracts(props) {
  var contractDefinition = props.contractDefinition,
      idToHyperlink = props.idToHyperlink;

  var baseContracts = (0, _safeGet2.default)(contractDefinition, 'contract', 'baseContracts');
  if (baseContracts.length === 0) {
    return null;
  }
  var elements = [];
  baseContracts.forEach(function (baseContract, index) {
    var _baseContract$baseNam = baseContract.baseName,
        name = _baseContract$baseNam.name,
        referencedDeclaration = _baseContract$baseNam.referencedDeclaration;

    elements.push(_react2.default.createElement(
      'a',
      { key: elements.length, href: idToHyperlink[referencedDeclaration] },
      name
    ));
    if (index < baseContracts.length - 1) {
      elements.push(_react2.default.createElement(
        'span',
        { key: elements.length },
        ',\xA0'
      ));
    }
  });
  return _react2.default.createElement(
    'p',
    { className: 'base-contracts' },
    _react2.default.createElement(
      'span',
      null,
      'is'
    ),
    '\xA0',
    elements
  );
}

/**
 * Render link to contract's source.
 */
function ContractSource(props) {
  var contractsPath = props.contractsPath,
      absolutePath = props.absolutePath,
      version = props.version,
      repoBaseUrl = props.repoBaseUrl;

  var relativePath = absolutePath.slice(contractsPath.length + 1);
  var href = repoBaseUrl + '/blob/v' + version + '/contracts/' + relativePath;
  return _react2.default.createElement(
    'div',
    { className: 'source' },
    'Source:\xA0',
    _react2.default.createElement(
      'a',
      { href: href, target: '_blank' },
      relativePath
    )
  );
}

/**
 *  Render contract's author.
 */
function ContractAuthor(props) {
  var natspecTags = props.natspecTags;

  if (!('author' in natspecTags)) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'author' },
    'Author:\xA0',
    natspecTags['author']
  );
}

/**
 *  Render the contract's description.
 */
function ContractDescription(props) {
  var documentation = props.documentation;

  var description = buildDescriptionFromDocumentation(documentation);
  if (description === '') {
    return null;
  }
  return _react2.default.createElement(
    'p',
    { className: 'description' },
    description
  );
}

/**
 * Render an index containing all contract items (events, modifiers, functions).
 */
function Index(props) {
  var itemDefinitions = props.itemDefinitions,
      idToHyperlink = props.idToHyperlink;

  if (itemDefinitions.length === 0) {
    return null;
  }
  var sortedItemDefinitions = itemDefinitions.sort(compareItemDefinitionsByName);
  return _react2.default.createElement(
    'div',
    { className: 'index' },
    _react2.default.createElement(
      'h2',
      null,
      'Index'
    ),
    _react2.default.createElement(
      'ul',
      null,
      sortedItemDefinitions.map(function (itemDefinition) {
        var itemName = getItemName(itemDefinition);
        return _react2.default.createElement(
          'li',
          { key: itemName },
          _react2.default.createElement(
            'a',
            { href: idToHyperlink[(0, _safeGet2.default)(itemDefinition, 'item', 'id')] },
            itemName
          )
        );
      })
    )
  );
}

/**
 * Render all contract items' content (events, modifiers, functions).
 */
function Reference(props) {
  var itemDefinitions = props.itemDefinitions;

  if (itemDefinitions.length === 0) {
    return null;
  }
  var eventDefinitions = itemDefinitions.filter(function (itemDefinition) {
    return (0, _safeGet2.default)(itemDefinition, 'item', 'nodeType') === _astNodeType2.default.EVENT_DEFINITION;
  });
  var modifierDefinitions = itemDefinitions.filter(function (itemDefinition) {
    return (0, _safeGet2.default)(itemDefinition, 'item', 'nodeType') === _astNodeType2.default.MODIFIER_DEFINITION;
  });
  var functionDefinitions = itemDefinitions.filter(function (itemDefinition) {
    return (0, _safeGet2.default)(itemDefinition, 'item', 'nodeType') === _astNodeType2.default.FUNCTION_DEFINITION;
  });
  return _react2.default.createElement(
    'div',
    { className: 'reference' },
    _react2.default.createElement(
      'h2',
      null,
      'Reference'
    ),
    _react2.default.createElement(Events, _extends({ eventDefinitions: eventDefinitions }, props)),
    _react2.default.createElement(Modifiers, _extends({ modifierDefinitions: modifierDefinitions }, props)),
    _react2.default.createElement(Functions, _extends({ functionDefinitions: functionDefinitions }, props))
  );
}

/**
 * Render all contract events.
 */
function Events(props) {
  var eventDefinitions = props.eventDefinitions;

  if (eventDefinitions.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'events' },
    _react2.default.createElement(
      'h3',
      null,
      'Events'
    ),
    _react2.default.createElement(
      'ul',
      null,
      eventDefinitions.map(function (eventDefinition) {
        return _react2.default.createElement(
          'li',
          { key: getItemName(eventDefinition) },
          _react2.default.createElement(Event, _extends({ eventDefinition: eventDefinition }, props))
        );
      })
    )
  );
}

/**
 * Render a specific event.
 */
function Event(props) {
  var eventDefinition = props.eventDefinition;

  var eventName = getItemName(eventDefinition);
  return _react2.default.createElement(
    'div',
    { className: 'item event' },
    _react2.default.createElement('span', { id: eventName, className: 'anchor-marker' }),
    _react2.default.createElement(
      'h4',
      { className: 'name' },
      eventName
    ),
    _react2.default.createElement(
      'div',
      { className: 'body' },
      _react2.default.createElement(EventSignature, _extends({ eventDefinition: eventDefinition }, props)),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(ItemDescription, _extends({ itemDefinition: eventDefinition }, props)),
      _react2.default.createElement(EventDetails, _extends({ eventDefinition: eventDefinition }, props))
    )
  );
}

/**
 *  Render an event's signature.
 */
function EventSignature(props) {
  var eventDefinition = props.eventDefinition;

  return _react2.default.createElement(
    'code',
    { className: 'signature' },
    'event\xA0',
    _react2.default.createElement(
      'strong',
      null,
      getItemName(eventDefinition)
    ),
    _react2.default.createElement(SignatureParams, _extends({ itemDefinition: eventDefinition }, props))
  );
}

/**
 * Render details for a specific event.
 */
function EventDetails(props) {
  var eventDefinition = props.eventDefinition;

  var natspecTags = (0, _parseNatspec2.default)((0, _safeGet2.default)(eventDefinition, 'event', 'documentation'));
  var parameters = (0, _safeGet2.default)(eventDefinition, 'event', 'parameters.parameters');
  if (parameters.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'dl',
    null,
    _react2.default.createElement(
      'dt',
      null,
      _react2.default.createElement(
        'span',
        { className: 'label-parameters' },
        'Parameters:'
      )
    ),
    _react2.default.createElement(
      'dd',
      null,
      parameters.map(function (parameter) {
        var parameterName = (0, _safeGet2.default)(parameter, 'parameter', 'name');
        var parameterDescription = '';
        if ('param:' + parameterName in natspecTags) {
          parameterDescription = ' - ' + natspecTags['param:' + parameterName];
        } else {
          parameterDescription = ' - ' + getParameterTypeName(parameter);
        }
        return _react2.default.createElement(
          'div',
          { key: parameterName },
          _react2.default.createElement(
            'code',
            null,
            parameterName
          ),
          parameterDescription
        );
      })
    )
  );
}

/**
 * Render all contract modifiers.
 */
function Modifiers(props) {
  var modifierDefinitions = props.modifierDefinitions;

  if (modifierDefinitions.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'modifiers' },
    _react2.default.createElement(
      'h3',
      null,
      'Modifiers'
    ),
    _react2.default.createElement(
      'ul',
      null,
      modifierDefinitions.map(function (modifierDefinition) {
        return _react2.default.createElement(
          'li',
          { key: getItemName(modifierDefinition) },
          _react2.default.createElement(Modifier, _extends({ key: getItemName(modifierDefinition),
            modifierDefinition: modifierDefinition
          }, props))
        );
      })
    )
  );
}

/**
 * Render Modifier.
 */
function Modifier(props) {
  var modifierDefinition = props.modifierDefinition;

  return _react2.default.createElement(
    'div',
    { className: 'item modifier' },
    _react2.default.createElement('span', { id: getItemName(modifierDefinition), className: 'anchor-marker' }),
    _react2.default.createElement(
      'h4',
      { className: 'name' },
      getItemName(modifierDefinition)
    ),
    _react2.default.createElement(
      'div',
      { className: 'body' },
      _react2.default.createElement(ModifierSignature, _extends({ modifierDefinition: modifierDefinition }, props)),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(ItemDescription, _extends({ itemDefinition: modifierDefinition }, props)),
      _react2.default.createElement(ModifierDetails, _extends({ modifierDefinition: modifierDefinition }, props))
    )
  );
}

/**
 *  Render a modifier's signature.
 */
function ModifierSignature(props) {
  var modifierDefinition = props.modifierDefinition;

  var modifierName = getItemName(modifierDefinition);
  return _react2.default.createElement(
    'code',
    { className: 'signature' },
    'modifier\xA0',
    _react2.default.createElement(
      'strong',
      null,
      modifierName
    ),
    _react2.default.createElement(SignatureParams, _extends({ itemDefinition: modifierDefinition }, props))
  );
}

/**
 * Render details for a specific modifier.
 */
function ModifierDetails(props) {
  var modifierDefinition = props.modifierDefinition;

  var parameters = (0, _safeGet2.default)(modifierDefinition, 'modifier', 'parameters.parameters');
  var natspecTags = (0, _parseNatspec2.default)((0, _safeGet2.default)(modifierDefinition, 'modifier', 'documentation'));
  if (parameters.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'dl',
    null,
    _react2.default.createElement(
      'dt',
      null,
      _react2.default.createElement(
        'span',
        { className: 'label-parameters' },
        'Parameters:'
      )
    ),
    _react2.default.createElement(
      'dd',
      null,
      parameters.map(function (parameter) {
        var parameterName = (0, _safeGet2.default)(parameter, 'parameter', 'name');
        var parameterDescription = '';
        if ('param:' + parameterName in natspecTags) {
          parameterDescription = ' - ' + natspecTags['param:' + parameterName];
        } else {
          parameterDescription = ' - ' + getParameterTypeName(parameter);
        }
        return _react2.default.createElement(
          'div',
          { key: parameterName },
          _react2.default.createElement(
            'code',
            null,
            parameterName
          ),
          parameterDescription
        );
      })
    )
  );
}

/**
 * Render all contract functions.
 */
function Functions(props) {
  var functionDefinitions = props.functionDefinitions;

  if (functionDefinitions.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'functions' },
    _react2.default.createElement(
      'h3',
      null,
      'Functions'
    ),
    _react2.default.createElement(
      'ul',
      null,
      functionDefinitions.map(function (functionDefinition) {
        return _react2.default.createElement(
          'li',
          { key: getItemName(functionDefinition) },
          _react2.default.createElement(Function, _extends({ functionDefinition: functionDefinition }, props))
        );
      })
    )
  );
}

/**
 * Render a specific function.
 */
function Function(props) {
  var functionDefinition = props.functionDefinition;

  return _react2.default.createElement(
    'div',
    { className: 'item function' },
    _react2.default.createElement('span', { id: getItemName(functionDefinition), className: 'anchor-marker' }),
    _react2.default.createElement(
      'h4',
      { className: 'name' },
      getItemName(functionDefinition)
    ),
    _react2.default.createElement(
      'div',
      { className: 'body' },
      _react2.default.createElement(FunctionSignature, _extends({ functionDefinition: functionDefinition }, props)),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(ItemDescription, _extends({ itemDefinition: functionDefinition }, props)),
      _react2.default.createElement(FunctionDetails, _extends({ functionDefinition: functionDefinition }, props))
    )
  );
}

/**
 *  Render a function's signature.
 */
function FunctionSignature(props) {
  var functionDefinition = props.functionDefinition;

  var functionName = (0, _safeGet2.default)(functionDefinition, 'function', 'name');
  var isAbstract = !(0, _safeGet2.default)(functionDefinition, 'function', 'implemented');
  var visibility = (0, _safeGet2.default)(functionDefinition, 'function', 'visibility');
  var stateMutability = functionDefinition.stateMutability;
  return _react2.default.createElement(
    'code',
    { className: 'signature' },
    isAbstract ? _react2.default.createElement(
      'span',
      null,
      'abstract\xA0'
    ) : null,
    'function\xA0',
    _react2.default.createElement(
      'strong',
      null,
      functionName
    ),
    _react2.default.createElement(SignatureParams, _extends({ itemDefinition: functionDefinition }, props)),
    _react2.default.createElement(
      'span',
      null,
      visibility,
      '\xA0'
    ),
    stateMutability !== 'nonpayable' ? _react2.default.createElement(
      'span',
      null,
      stateMutability,
      '\xA0'
    ) : null,
    _react2.default.createElement(SignatureReturnParams, _extends({ itemDefinition: functionDefinition }, props))
  );
}

/**
 * Render details for a specific function.
 */
function FunctionDetails(props) {
  var functionDefinition = props.functionDefinition,
      idToHyperlink = props.idToHyperlink;

  var natspecTags = (0, _parseNatspec2.default)((0, _safeGet2.default)(functionDefinition, 'function', 'documentation'));
  var modifiers = (0, _safeGet2.default)(functionDefinition, 'function', 'modifiers');
  var parameters = (0, _safeGet2.default)(functionDefinition, 'function', 'parameters.parameters');
  var returnParameters = (0, _safeGet2.default)(functionDefinition, 'function', 'returnParameters.parameters');
  var elements = [];
  if (modifiers.length > 0) {
    elements.push(_react2.default.createElement(
      'dt',
      { key: elements.length },
      _react2.default.createElement(
        'span',
        { className: 'label-modifiers' },
        'Modifiers:'
      )
    ));
    var modifierLinks = [];
    modifiers.forEach(function (modifier) {
      var name = (0, _safeGet2.default)(modifier, 'modifier', 'modifierName.name');
      var referencedDeclaration = (0, _safeGet2.default)(modifier, 'modifier', 'modifierName.referencedDeclaration');
      // Hack to work around the fact that solc does not distinguish
      // between super constructor calls and modifiers.
      if (name.length > 0 && name[0] === name[0].toLowerCase()) {
        modifierLinks.push(_react2.default.createElement(
          'a',
          { key: name, href: idToHyperlink[referencedDeclaration] },
          name,
          '\xA0'
        ));
      }
    });
    elements.push(_react2.default.createElement(
      'dd',
      { key: elements.length },
      modifierLinks
    ));
  }
  if (parameters.length > 0) {
    elements.push(_react2.default.createElement(
      'dt',
      { key: elements.length },
      _react2.default.createElement(
        'span',
        { className: 'label-parameters' },
        'Parameters:'
      )
    ));
    elements.push(_react2.default.createElement(
      'dd',
      { key: elements.length },
      parameters.map(function (parameter) {
        var parameterName = (0, _safeGet2.default)(parameter, 'parameter', 'name');
        var parameterDescription = '';
        if ('param:' + parameterName in natspecTags) {
          parameterDescription = ' - ' + natspecTags['param:' + parameterName];
        } else {
          parameterDescription = ' - ' + getParameterTypeName(parameter);
        }
        return _react2.default.createElement(
          'div',
          { key: parameterName },
          _react2.default.createElement(
            'code',
            null,
            parameterName
          ),
          parameterDescription
        );
      })
    ));
  }
  if ('return' in natspecTags) {
    elements.push(_react2.default.createElement(
      'dt',
      { key: elements.length },
      _react2.default.createElement(
        'span',
        { className: 'label-return' },
        'Returns:'
      )
    ));
    elements.push(_react2.default.createElement(
      'dd',
      { key: elements.length },
      natspecTags['return']
    ));
  } else if (returnParameters.length > 0) {
    elements.push(_react2.default.createElement(
      'dt',
      { key: elements.length },
      _react2.default.createElement(
        'span',
        { className: 'label-return' },
        'Returns:'
      )
    ));
    returnParameters.forEach(function (returnParameter) {
      elements.push(_react2.default.createElement(
        'dd',
        { key: elements.length },
        getParameterTypeName(returnParameter)
      ));
    });
  }
  if (elements.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'dl',
    null,
    elements
  );
}

/**
 * Render an item's description (events, modifiers, functions).
 */
function ItemDescription(props) {
  var itemDefinition = props.itemDefinition;

  var description = buildDescriptionFromDocumentation((0, _safeGet2.default)(itemDefinition, 'item', 'documentation'));
  if (description === '') {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'description' },
    _react2.default.createElement(
      'p',
      null,
      description
    )
  );
}

/**
 * Render an item's description from its documentation.
 */
function buildDescriptionFromDocumentation(documentation) {
  var natspecTags = (0, _parseNatspec2.default)(documentation);
  var descriptionParts = [];
  if (natspecTags.extra) {
    descriptionParts.push(natspecTags.extra);
  }
  if ('dev' in natspecTags) {
    descriptionParts.push(natspecTags['dev']);
  }
  if ('notice' in natspecTags) {
    descriptionParts.push(natspecTags['notice']);
  }
  var description = descriptionParts.join(', ');
  if (description.length > 0 && description[0] !== description[0].toUpperCase()) {
    description = [description[0].toUpperCase(), description.slice(1)].join('');
  }
  if (description.length > 0 && description[description.length - 1] !== '.') {
    description = [description, '.'].join('');
  }
  return description;
}

/**
 * Render a signature's parameters.
 */
function SignatureParams(props) {
  var itemDefinition = props.itemDefinition;

  var parameters = (0, _safeGet2.default)(itemDefinition, 'item', 'parameters.parameters');
  return _react2.default.createElement(
    'span',
    null,
    '(',
    parameters.map(function (parameter) {
      var parameterName = (0, _safeGet2.default)(parameter, 'parameter', 'name');
      return getParameterTypeName(parameter) + ' ' + parameterName;
    }).join(', '),
    ')\xA0'
  );
}

/**
 * Render a signature's return parameters.
 */
function SignatureReturnParams(props) {
  var itemDefinition = props.itemDefinition;

  var returnParameters = (0, _safeGet2.default)(itemDefinition, 'item', 'returnParameters.parameters');
  if (returnParameters.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'span',
    null,
    'returns\xA0 (',
    returnParameters.map(function (parameter) {
      return '' + getParameterTypeName(parameter);
    }).join(', '),
    ')\xA0'
  );
}

/**
 * Retrieve all items from the given contract (events, modifiers, functions).
 */
function getItemDefinitions(contractDefinition) {
  var state = { itemDefinitions: [] };
  var astWalker = new _astWalker2.default();
  astWalker.setStartFunction(_astNodeType2.default.EVENT_DEFINITION, itemStartFunction);
  astWalker.setStartFunction(_astNodeType2.default.MODIFIER_DEFINITION, itemStartFunction);
  astWalker.setStartFunction(_astNodeType2.default.FUNCTION_DEFINITION, functionStartFunction);
  state = astWalker.walk(contractDefinition, state);
  return state.itemDefinitions;

  function itemStartFunction(node, state) {
    return _extends({}, state, {
      itemDefinitions: state.itemDefinitions.concat([node])
    });
  }

  function functionStartFunction(node, state) {
    var visibility = (0, _safeGet2.default)(node, 'AST node', 'visibility');
    if (visibility === 'private') {
      return state;
    }
    return itemStartFunction(node, state);
  }
}

/**
 * Compare two items by name.
 */
function compareItemDefinitionsByName(itemDefinition1, itemDefinition2) {
  var itemName1 = getItemName(itemDefinition1);
  var itemName2 = getItemName(itemDefinition2);
  return itemName1 < itemName2 ? -1 : itemName2 < itemName1 ? 1 : 0;
}

/**
 * Display name for fallback function.
 */
var FUNCTION_NAME_FALLBACK = 'fallback';

/**
 * Get an item's name.
 */
function getItemName(itemDefinition) {
  var nodeType = (0, _safeGet2.default)(itemDefinition, 'item', 'nodeType');
  var name = (0, _safeGet2.default)(itemDefinition, 'item', 'name');
  if (nodeType === _astNodeType2.default.FUNCTION_DEFINITION && name === '') {
    return FUNCTION_NAME_FALLBACK;
  }
  return name;
}

/**
 * Get a parameter's type name.
 */
function getParameterTypeName(parameter) {
  var typeName = (0, _safeGet2.default)(parameter, 'parameter', 'typeName');
  var type = [];
  if ((0, _safeGet2.default)(parameter, 'parameter', 'constant')) {
    type.push('constant');
  }
  var nodeType = (0, _safeGet2.default)(typeName, 'typeName', 'nodeType');
  if (nodeType === _astNodeType2.default.ARRAY_TYPE_NAME) {
    type.push((0, _safeGet2.default)(typeName, 'typeName', 'baseType.name') + '[]');
  } else if (nodeType === _astNodeType2.default.FUNCTION_TYPE_NAME) {
    type.push((0, _safeGet2.default)(typeName, 'typeName', 'typeDescriptions.typeString'));
  } else {
    type.push((0, _safeGet2.default)(typeName, 'typeName', 'name'));
  }
  return type.join(' ');
}