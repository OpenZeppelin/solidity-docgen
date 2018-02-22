/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import checkPathExists from './util/check-path-exists'
import fs from 'fs'
import generateDocs from './gen/generate-docs'
import generateSidebar from './gen/generate-sidebar'
import get from './util/safe-get'
import path from 'path'
import shell from 'shelljs'

/**
 * Options given to the Solidity compiler when generating the AST.
 */
const COMBINED_JSON_OPTIONS = [
  'abi',
  'ast',
  'compact-format',
  'devdoc',
  'hashes',
  'interface',
  'metadata',
  'opcodes',
  'srcmap',
  'srcmap-runtime',
  'userdoc'
]

/**
 * Generate Docusaurus docs for the project's API.
 */
export default function (projectPath, contractsPath, docusaurusPath, excludePaths) {
  checkPathExists(projectPath)
  checkPathExists(contractsPath)
  checkPathExists(docusaurusPath)
  excludePaths.forEach(excludePath => checkPathExists(excludePath))
  const solidityCompilerPath = getSolidityCompilerPath(process.env)
  const packageJson = getPackage(projectPath)
  const version = get(packageJson, 'package.json', 'version')
  const repoBaseUrl = getRepoBaseUrl(packageJson)
  const { contracts, sources } = parseProject(solidityCompilerPath, contractsPath)
  generateSidebar(contracts, contractsPath, excludePaths, docusaurusPath)
  generateDocs(sources, contractsPath, version, repoBaseUrl, docusaurusPath)
}

/**
 * Get the path to the Solidity compiler from the SOLC_PATH
 * environment variable, or else default to 'solc'.
 */
function getSolidityCompilerPath (env) {
  if (!env.SOLC_PATH && !shell.which('solc')) {
    throw new Error([
      'Solidity compiler not found. Please, add solc to path or',
      'define environment variable SOLC_PATH.'
    ].join(' '))
  }
  return env.SOLC_PATH || 'solc'
}

/**
 * Get the project's package from package.json.
 */
function getPackage (projectPath) {
  const packagePath = path.resolve(projectPath, 'package.json')
  checkPathExists(packagePath)
  return JSON.parse(fs.readFileSync(packagePath))
}

/**
 * Get the project's base url.
 */
function getRepoBaseUrl (packageJson) {
  const repository = get(packageJson, 'package.json', 'repository')
  if (typeof repository === 'string') {
    if (repository.length > 0 && repository[repository.length - 1] !== '/') {
      return `${repository}/`
    }
    return repository
  } else {
    const type = get(repository, 'repository', 'type')
    const url = get(repository, 'repository', 'url')
    return url.slice(0, url.length - type.length - 1)
  }
}

/**
 * Parse the project using the Solidity compiler.
 */
function parseProject (solidityCompilerPath, contractsPath) {
  const commandOutput = shell.exec([
    `${solidityCompilerPath}`,
    `  --pretty-json`,
    `  --allow-paths ${contractsPath}`,
    `  --combined-json ${COMBINED_JSON_OPTIONS.join(',')}`,
    `  ${contractsPath}/*.sol ${contractsPath}/**/*.sol`
  ].join(' '), { silent: true })
  handleErrorCode(commandOutput)
  return JSON.parse(commandOutput.stdout)
}

/**
 * Handle any potential error codes returned by a shelljs
 * command execution.
 */
function handleErrorCode (commandOutput) {
  if (commandOutput.code !== 0) {
    throw new Error([
      `Command line operation failed with code ${commandOutput.code}.`,
      `Standard error output: ${commandOutput.stderr}`
    ].join('\n'))
  }
}
