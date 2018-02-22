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
export default function (projectPath, docusaurusPath, excludeDirectories) {
  checkPathExists(projectPath)
  ensureDocusaurusExists(docusaurusPath)
  const solidityCompilerPath = getSolidityCompilerPath(process.env)
  const packageJson = getPackage(path.resolve(projectPath, 'package.json'))
  const version = get(packageJson, 'package.json', 'version')
  const repoBaseUrl = getRepoBaseUrl(packageJson)
  const contractsPath = path.resolve(projectPath, 'contracts')
  const excludePaths = excludeDirectories.map(directory => {
    return path.resolve(contractsPath, directory)
  })
  const { contracts, sources } = parseProject(solidityCompilerPath, contractsPath)
  generateSidebar(contracts, contractsPath, excludePaths, docusaurusPath)
  generateDocs(sources, contractsPath, version, repoBaseUrl, docusaurusPath)
  updateDocusaurusVersion(docusaurusPath, version)
}

/**
 * Creates a docusuaurus template in docusaurusPath if it
 * does not yet exist.
 */
function ensureDocusaurusExists (docusaurusPath) {
  if (!fs.existsSync(docusaurusPath)) {
    try {
      handleErrorCode(shell.mkdir('-p', docusaurusPath))
      shell.pushd('-q', docusaurusPath)
      handleErrorCode(shell.exec('npm init -y', { silent: true }))
      handleErrorCode(shell.exec('npm install docusaurus-init', { silent: true }))
      handleErrorCode(shell.exec('npx docusaurus-init'))
      shell.pushd('-q', 'website')
      handleErrorCode(shell.exec('npm run examples versions', { silent: true }))
      shell.popd('-q')
      shell.mv('docs-examples-from-docusaurus', 'docs')
      shell.mv('website/blog-examples-from-docusaurus', 'website/blog')
      shell.popd('-q')
    } catch (err) {
      shell.rm('-rf', docusaurusPath)
      throw err
    }
  }
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
 * Get the project's version from package.json.
 */
function getPackage (packagePath) {
  checkPathExists(packagePath)
  return JSON.parse(fs.readFileSync(packagePath))
}

/**
 * Get the project's base url.
 */
function getRepoBaseUrl (packageJson) {
  const { type, url } = get(packageJson, 'package.json', 'repository')
  return url.slice(0, url.length - type.length - 1)
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
 * Update Docusaurus docs to new version.
 */
function updateDocusaurusVersion (docusaurusPath, version) {
  const websitePath = path.resolve(docusaurusPath, 'website')
  shell.cd(websitePath)
  handleErrorCode(shell.exec(`npm run version ${version}`))
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
