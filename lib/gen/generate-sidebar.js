'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT Licensed.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright (c) 2018 OpenZeppelin.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * See LICENSE file in project's root directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

/**
 * Generates sidebars.json file.
 */


exports.default = function (contracts, contractsPath, excludePaths, docusaurusPath) {
  var sidebarPath = getSidebarPath(docusaurusPath);
  (0, _checkPathExists2.default)(sidebarPath);
  var sidebarTemplate = _fs2.default.readFileSync(getSidebarTemplatePath(), 'utf-8');
  var sidebarView = buildSidebarView(contracts, contractsPath, excludePaths);
  var sidebarApi = _mustache2.default.render(sidebarTemplate, sidebarView);
  var previousSidebar = JSON.parse(_fs2.default.readFileSync(sidebarPath));
  var sidebarContent = Object.assign({}, previousSidebar, JSON.parse(sidebarApi));
  _fs2.default.writeFileSync(sidebarPath, JSON.stringify(sidebarContent, null, 2));
};

var _util = require('./util');

var _checkPathExists = require('../util/check-path-exists');

var _checkPathExists2 = _interopRequireDefault(_checkPathExists);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get path to sidebars.json Mustache template.
 */
function getSidebarTemplatePath() {
  return _path2.default.resolve(__dirname, '..', '..', 'tpl', 'sidebars.json.mustache');
}

/**
 * Builds a view object for the sidebars.json file's Mustache template.
 */
function buildSidebarView(contracts, contractsPath, excludePaths) {
  var docsPerSection = getDocsPerSection(contracts, contractsPath, excludePaths);
  var entries = Object.entries(docsPerSection);
  var sortedEntries = entries.sort(function (entry1, entry2) {
    return (0, _util.compareSectionIds)(entry1[0], entry2[0]);
  });
  var sections = [];
  for (var i = 0; i < sortedEntries.length; ++i) {
    var _sortedEntries$i = _slicedToArray(sortedEntries[i], 2),
        sectionId = _sortedEntries$i[0],
        docIds = _sortedEntries$i[1];

    var docs = buildSidebarViewDocs(docIds);
    sections.push({
      sectionId: sectionId,
      docs: docs,
      last: i === sortedEntries.length - 1
    });
  }
  return { sections: sections };
}

/**
 * Populates each section with its corresponding docs.
 */
function getDocsPerSection(contracts, contractsPath, excludePaths) {
  var docsPerSection = {};

  var _loop = function _loop(contract) {
    var _contract$split = contract.split(':'),
        _contract$split2 = _slicedToArray(_contract$split, 2),
        path = _contract$split2[0],
        contractName = _contract$split2[1];

    if (!path.startsWith(contractsPath) || excludePaths.some(function (prefix) {
      return path.startsWith(prefix);
    })) {
      return 'continue';
    }
    var sectionId = (0, _util.buildSectionId)(path, contractsPath);
    var docId = (0, _util.buildDocId)(path, contractName, contractsPath);
    if (!(sectionId in docsPerSection)) {
      docsPerSection[sectionId] = [docId];
    } else {
      docsPerSection[sectionId].push(docId);
    }
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(contracts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var contract = _step.value;

      var _ret = _loop(contract);

      if (_ret === 'continue') continue;
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

  return docsPerSection;
}

/**
 * Builds a view object for a given section in the sidebars.json
 * file's Mustache template.
 */
function buildSidebarViewDocs(docIds) {
  var docs = [];
  var sortedDocIds = docIds.sort();
  for (var j = 0; j < sortedDocIds.length; ++j) {
    docs.push({
      docId: sortedDocIds[j],
      last: j === sortedDocIds.length - 1
    });
  }
  return docs;
}

/**
 * Get output path for sidebars.json file.
 */
function getSidebarPath(docusaurusPath) {
  return _path2.default.resolve(docusaurusPath, 'website', 'sidebars.json');
}