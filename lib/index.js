'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (projectPath, contractsPath, docusaurusPath, excludePaths) {
  (0, _checkPathExists2.default)(projectPath);
  (0, _checkPathExists2.default)(contractsPath);
  (0, _checkPathExists2.default)(docusaurusPath);
  excludePaths.forEach(function (excludePath) {
    return (0, _checkPathExists2.default)(excludePath);
  });
  var solidityCompilerPath = getSolidityCompilerPath(process.env);
  var solidityCompilerExtraArgs = getSolidityCompilerExtraArgs(process.env);
  var packageJson = getPackage(projectPath);
  var version = (0, _safeGet2.default)(packageJson, 'package.json', 'version');
  var repoBaseUrl = getRepoBaseUrl(packageJson);

  var _parseProject = parseProject(solidityCompilerPath, solidityCompilerExtraArgs, contractsPath),
      contracts = _parseProject.contracts,
      sources = _parseProject.sources;

  (0, _generateSidebar2.default)(contracts, contractsPath, excludePaths, docusaurusPath);
  (0, _generateDocs2.default)(sources, contractsPath, version, repoBaseUrl, docusaurusPath);
};

var _checkPathExists = require('./util/check-path-exists');

var _checkPathExists2 = _interopRequireDefault(_checkPathExists);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _generateDocs = require('./gen/generate-docs');

var _generateDocs2 = _interopRequireDefault(_generateDocs);

var _generateSidebar = require('./gen/generate-sidebar');

var _generateSidebar2 = _interopRequireDefault(_generateSidebar);

var _safeGet = require('./util/safe-get');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Options given to the Solidity compiler when generating the AST.
 */
var COMBINED_JSON_OPTIONS = ['abi', 'ast', 'compact-format', 'devdoc', 'hashes', 'interface', 'metadata', 'opcodes', 'srcmap', 'srcmap-runtime', 'userdoc'];

/**
 * Generate Docusaurus docs for the project's API.
 */
/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

/**
 * Get the path to the Solidity compiler from the SOLC_PATH
 * environment variable, or else default to 'solc'.
 */
function getSolidityCompilerPath(env) {
  if (!env.SOLC_PATH && !_shelljs2.default.which('solc')) {
    throw new Error(['Solidity compiler not found. Please, add solc to path or', 'define environment variable SOLC_PATH.'].join(' '));
  }
  return env.SOLC_PATH || 'solc';
}

/**
 * Get optional extra arguments for the Solidity compiler
 * from the SOLC_ARGS environment variable.
 */
function getSolidityCompilerExtraArgs(env) {
  return env.SOLC_ARGS || '';
}

/**
 * Get the project's package from package.json.
 */
function getPackage(projectPath) {
  var packagePath = _path2.default.resolve(projectPath, 'package.json');
  (0, _checkPathExists2.default)(packagePath);
  return JSON.parse(_fs2.default.readFileSync(packagePath));
}

/**
 * Get the project's base url.
 */
function getRepoBaseUrl(packageJson) {
  var repository = (0, _safeGet2.default)(packageJson, 'package.json', 'repository');
  if (typeof repository === 'string') {
    if (repository.length > 0 && repository[repository.length - 1] !== '/') {
      return repository + '/';
    }
    return repository;
  } else {
    var type = (0, _safeGet2.default)(repository, 'repository', 'type');
    var url = (0, _safeGet2.default)(repository, 'repository', 'url');
    return url.slice(0, url.length - type.length - 1);
  }
}

/**
 * Parse the project using the Solidity compiler.
 */
function parseProject(solidityCompilerPath, solidityCompilerExtraArgs, contractsPath) {
  var commandOutput = _shelljs2.default.exec(['' + solidityCompilerPath, '  --pretty-json', '  --allow-paths ' + contractsPath, '  --combined-json ' + COMBINED_JSON_OPTIONS.join(','), '  ' + solidityCompilerExtraArgs, '  $(find ' + contractsPath + ' -type f -name "*.sol")'].join(' '), { silent: true });
  handleErrorCode(commandOutput);
  return JSON.parse(commandOutput.stdout);
}

/**
 * Handle any potential error codes returned by a shelljs
 * command execution.
 */
function handleErrorCode(commandOutput) {
  if (commandOutput.code !== 0) {
    throw new Error(['Command line operation failed with code ' + commandOutput.code + '.', 'Standard error output: ' + commandOutput.stderr].join('\n'));
  }
}