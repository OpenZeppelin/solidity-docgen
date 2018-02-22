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

/**
 * Generates a doc file for each contract.
 */


exports.default = function (sources, contractsPath, version, repoBaseUrl, docusaurusPath) {
  var docsPath = _path2.default.resolve(docusaurusPath, 'docs');
  (0, _checkPathExists2.default)(docsPath);
  var docTemplate = _fs2.default.readFileSync(getDocTemplatePath(), 'utf-8');
  var idToHyperlink = buildIdToHyperlink(sources, contractsPath);
  var docViews = buildDocViews(sources, contractsPath, idToHyperlink, version, repoBaseUrl);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = docViews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var docView = _step.value;

      var docContent = _mustache2.default.render(docTemplate, docView);
      _fs2.default.writeFileSync(getDocOutputPath(docsPath, docView.docId), docContent);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var _util = require('./util');

var _astNodeType = require('../ast/ast-node-type');

var _astNodeType2 = _interopRequireDefault(_astNodeType);

var _astWalker = require('../ast/ast-walker');

var _astWalker2 = _interopRequireDefault(_astWalker);

var _checkPathExists = require('../util/check-path-exists');

var _checkPathExists2 = _interopRequireDefault(_checkPathExists);

var _document = require('../components/document');

var _document2 = _interopRequireDefault(_document);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _safeGet = require('../util/safe-get');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Get path to a document's markdown Mustache template.
 */
function getDocTemplatePath() {
  return _path2.default.resolve(__dirname, '..', '..', 'tpl', 'doc.md.mustache');
}

/**
 * Builds an object mapping AST node IDs to their corresponding
 * hyperlinks, where these resouces can be found within the docs.
 */
function buildIdToHyperlink(sources, contractsPath) {
  var state = { idToHyperlink: {}, contractsPath: contractsPath };
  var astWalker = buildBaseAstWalker();
  astWalker.setStartFunction(_astNodeType2.default.CONTRACT_DEFINITION, contractDefinitionStartFunction);
  astWalker.setEndFunction(_astNodeType2.default.CONTRACT_DEFINITION, contractDefinitionEndFunction);
  astWalker.setStartFunction(_astNodeType2.default.FUNCTION_DEFINITION, codeDefinitionStartFunction);
  astWalker.setStartFunction(_astNodeType2.default.MODIFIER_DEFINITION, codeDefinitionStartFunction);
  astWalker.setStartFunction(_astNodeType2.default.EVENT_DEFINITION, codeDefinitionStartFunction);
  for (var source in sources) {
    var ast = sources[source].AST;
    state = astWalker.walk(ast, state);
  }
  return state.idToHyperlink;

  function contractDefinitionStartFunction(node, state) {
    var nodeName = (0, _safeGet2.default)(node, 'AST node', 'name');
    var nodeId = (0, _safeGet2.default)(node, 'AST node', 'id');
    var docId = (0, _util.buildDocId)(state.absolutePath, nodeName, state.contractsPath);
    var hyperlink = docId + '.html';
    return _extends({}, state, {
      idToHyperlink: _extends({}, state.idToHyperlink, _defineProperty({}, nodeId, hyperlink)),
      currentHyperlink: hyperlink
    });
  }

  function contractDefinitionEndFunction(node, state) {
    var currentHyperlink = state.currentHyperlink,
        updatedState = _objectWithoutProperties(state, ['currentHyperlink']);

    return updatedState;
  }

  function codeDefinitionStartFunction(node, state) {
    var nodeName = (0, _safeGet2.default)(node, 'AST node', 'name');
    var nodeId = (0, _safeGet2.default)(node, 'AST node', 'id');
    return _extends({}, state, {
      idToHyperlink: _extends({}, state.idToHyperlink, _defineProperty({}, nodeId, state.currentHyperlink + '#' + nodeName))
    });
  }
}

/**
 * Builds view objects for all doc files' Mustache templates.
 */
function buildDocViews(sources, contractsPath, idToHyperlink, version, repoBaseUrl) {
  var state = { docs: [], contractsPath: contractsPath, idToHyperlink: idToHyperlink, version: version, repoBaseUrl: repoBaseUrl };
  var astWalker = buildBaseAstWalker();
  astWalker.setStartFunction(_astNodeType2.default.CONTRACT_DEFINITION, contractDefinitionStartFunction);
  for (var source in sources) {
    var ast = (0, _safeGet2.default)(sources[source], 'source', 'AST');
    state = astWalker.walk(ast, state);
  }
  return state.docs;

  function contractDefinitionStartFunction(node, state) {
    var nodeName = (0, _safeGet2.default)(node, 'AST node', 'name');
    var docs = state.docs,
        contractsPath = state.contractsPath,
        absolutePath = state.absolutePath,
        idToHyperlink = state.idToHyperlink,
        version = state.version,
        repoBaseUrl = state.repoBaseUrl;

    var docId = (0, _util.buildDocId)(absolutePath, nodeName, contractsPath);
    var content = _server2.default.renderToStaticMarkup(_react2.default.createElement(_document2.default, {
      contractDefinition: node,
      contractsPath: contractsPath,
      absolutePath: absolutePath,
      idToHyperlink: idToHyperlink,
      version: version,
      repoBaseUrl: repoBaseUrl
    }));
    return _extends({}, state, {
      docs: docs.concat([{
        docId: docId,
        docTitle: nodeName,
        content: content
      }])
    });
  }
}

/**
 * Builds a basic AST walker which annotates the walk's state
 * with the absolute path of the current source unit.
 */
function buildBaseAstWalker() {
  var astWalker = new _astWalker2.default();
  astWalker.setStartFunction(_astNodeType2.default.SOURCE_UNIT, sourceUnitStartFunction);
  astWalker.setEndFunction(_astNodeType2.default.SOURCE_UNIT, sourceUnitEndFunction);
  return astWalker;

  function sourceUnitStartFunction(node, state) {
    return _extends({}, state, {
      absolutePath: node.absolutePath
    });
  }

  function sourceUnitEndFunction(node, state) {
    var absolutePath = state.absolutePath,
        updatedState = _objectWithoutProperties(state, ['absolutePath']);

    return updatedState;
  }
}

/**
 * Get output path for the given doc's markdown file.
 */
function getDocOutputPath(docsPath, docId) {
  return _path2.default.resolve(docsPath, 'api_' + docId + '.md');
}