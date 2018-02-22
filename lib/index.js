'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (projectPath, docusaurusPath, excludeDirectories) {
  (0, _checkPathExists2.default)(projectPath);
  ensureDocusaurusExists(docusaurusPath);
  var solidityCompilerPath = getSolidityCompilerPath(process.env);
  var packageJson = getPackage(_path2.default.resolve(projectPath, 'package.json'));
  var version = (0, _safeGet2.default)(packageJson, 'package.json', 'version');
  var repoBaseUrl = getRepoBaseUrl(packageJson);
  var contractsPath = _path2.default.resolve(projectPath, 'contracts');
  var excludePaths = excludeDirectories.map(function (directory) {
    return _path2.default.resolve(contractsPath, directory);
  });

  var _parseProject = parseProject(solidityCompilerPath, contractsPath),
      contracts = _parseProject.contracts,
      sources = _parseProject.sources;

  (0, _generateSidebar2.default)(contracts, contractsPath, excludePaths, docusaurusPath);
  (0, _generateDocs2.default)(sources, contractsPath, version, repoBaseUrl, docusaurusPath);
  updateDocusaurusVersion(docusaurusPath, version);
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
 * Creates a docusuaurus template in docusaurusPath if it
 * does not yet exist.
 */
function ensureDocusaurusExists(docusaurusPath) {
  if (!_fs2.default.existsSync(docusaurusPath)) {
    try {
      handleErrorCode(_shelljs2.default.mkdir('-p', docusaurusPath));
      _shelljs2.default.pushd('-q', docusaurusPath);
      handleErrorCode(_shelljs2.default.exec('npm init -y', { silent: true }));
      handleErrorCode(_shelljs2.default.exec('npm install docusaurus-init', { silent: true }));
      handleErrorCode(_shelljs2.default.exec('npx docusaurus-init'));
      _shelljs2.default.pushd('-q', 'website');
      handleErrorCode(_shelljs2.default.exec('npm run examples versions', { silent: true }));
      _shelljs2.default.popd('-q');
      _shelljs2.default.mv('docs-examples-from-docusaurus', 'docs');
      _shelljs2.default.mv('website/blog-examples-from-docusaurus', 'website/blog');
      _shelljs2.default.popd('-q');
    } catch (err) {
      _shelljs2.default.rm('-rf', docusaurusPath);
      throw err;
    }
  }
}

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
 * Get the project's version from package.json.
 */
function getPackage(packagePath) {
  (0, _checkPathExists2.default)(packagePath);
  return JSON.parse(_fs2.default.readFileSync(packagePath));
}

/**
 * Get the project's base url.
 */
function getRepoBaseUrl(packageJson) {
  var _get = (0, _safeGet2.default)(packageJson, 'package.json', 'repository'),
      type = _get.type,
      url = _get.url;

  return url.slice(0, url.length - type.length - 1);
}

/**
 * Parse the project using the Solidity compiler.
 */
function parseProject(solidityCompilerPath, contractsPath) {
  var commandOutput = _shelljs2.default.exec(['' + solidityCompilerPath, '  --pretty-json', '  --allow-paths ' + contractsPath, '  --combined-json ' + COMBINED_JSON_OPTIONS.join(','), '  ' + contractsPath + '/*.sol ' + contractsPath + '/**/*.sol'].join(' '), { silent: true });
  handleErrorCode(commandOutput);
  return JSON.parse(commandOutput.stdout);
}

/**
 * Update Docusaurus docs to new version.
 */
function updateDocusaurusVersion(docusaurusPath, version) {
  var websitePath = _path2.default.resolve(docusaurusPath, 'website');
  _shelljs2.default.cd(websitePath);
  handleErrorCode(_shelljs2.default.exec('npm run version ' + version));
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