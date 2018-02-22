'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = parseNatspec;
/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

/**
 * Parse the contents of a documentation comment to retrieve NatSpec
 * encoded tags. See the NatSpec specification for more details:
 * https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format
 */
function parseNatspec(docString) {
  if (docString === null || docString.length === 0) {
    return {};
  }
  var lines = docString.split('\n');
  var linesPerTag = {};
  var currentTag = void 0;
  var readingTag = false;
  var extraLines = [];
  for (var i = 0; i < lines.length; ++i) {
    var line = lines[i].trim();
    if (line.length > 0 && line[0] === '@') {
      var endOfTag = line.indexOf(' ');
      readingTag = true;
      currentTag = line.substr(1, endOfTag - 1);
      var content = line.substr(endOfTag + 1).trim();
      if (currentTag === 'param' && content.indexOf(' ') !== -1) {
        var paramName = content.substr(0, content.indexOf(' '));
        currentTag = 'param:' + paramName;
        content = content.substr(content.indexOf(' ') + 1).trim();
      }
      linesPerTag[currentTag] = [content];
    } else {
      if (readingTag) {
        linesPerTag[currentTag].push(line);
      } else {
        extraLines.push(line);
      }
    }
  }
  var natspecTags = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(linesPerTag)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var tag = _ref2[0];
      var _lines = _ref2[1];

      natspecTags[tag] = _lines.join(' ');
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

  if (extraLines.length > 0) {
    natspecTags.extra = extraLines.join(' ');
  }
  return natspecTags;
}