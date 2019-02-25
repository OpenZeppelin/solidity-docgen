/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import { buildDocId } from './util'
import AstNodeType from '../ast/ast-node-type'
import AstWalker from '../ast/ast-walker'
import checkPathExists from '../util/check-path-exists'
import Document from '../components/document'
import fs from 'fs'
import get from '../util/safe-get'
import Mustache from 'mustache'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

/**
 * Generates a doc file for each contract.
 */
export default function (sources, contractsPath, version, repoBaseUrl, docusaurusPath, repositoryRoot) {
  const docsPath = path.resolve(docusaurusPath, 'docs')
  checkPathExists(docsPath)
  const docTemplate = fs.readFileSync(getDocTemplatePath(), 'utf-8')
  const idToHyperlink = buildIdToHyperlink(sources, contractsPath)
  const docViews = buildDocViews(sources, contractsPath, idToHyperlink, version, repoBaseUrl, repositoryRoot)
  for (const docView of docViews) {
    const docContent = Mustache.render(docTemplate, docView)
    fs.writeFileSync(getDocOutputPath(docsPath, docView.docId), docContent)
  }
}

/**
 * Get path to a document's markdown Mustache template.
 */
function getDocTemplatePath () {
  return path.resolve(__dirname, '..', '..', 'tpl', 'doc.md.mustache')
}

/**
 * Builds an object mapping AST node IDs to their corresponding
 * hyperlinks, where these resouces can be found within the docs.
 */
function buildIdToHyperlink (sources, contractsPath) {
  let state = { idToHyperlink: {}, contractsPath }
  const astWalker = buildBaseAstWalker()
  astWalker.setStartFunction(AstNodeType.CONTRACT_DEFINITION, contractDefinitionStartFunction)
  astWalker.setEndFunction(AstNodeType.CONTRACT_DEFINITION, contractDefinitionEndFunction)
  astWalker.setStartFunction(AstNodeType.FUNCTION_DEFINITION, codeDefinitionStartFunction)
  astWalker.setStartFunction(AstNodeType.MODIFIER_DEFINITION, codeDefinitionStartFunction)
  astWalker.setStartFunction(AstNodeType.EVENT_DEFINITION, codeDefinitionStartFunction)
  for (const source in sources) {
    const ast = sources[source].AST
    state = astWalker.walk(ast, state)
  }
  return state.idToHyperlink

  function contractDefinitionStartFunction (node, state) {
    const nodeName = get(node, 'AST node', 'name')
    const nodeId = get(node, 'AST node', 'id')
    const docId = buildDocId(state.absolutePath, nodeName, state.contractsPath)
    const hyperlink = `${docId}.html`
    return {
      ...state,
      idToHyperlink: {
        ...state.idToHyperlink,
        [nodeId]: hyperlink
      },
      currentHyperlink: hyperlink
    }
  }

  function contractDefinitionEndFunction (node, state) {
    const { currentHyperlink, ...updatedState } = state
    return updatedState
  }

  function codeDefinitionStartFunction (node, state) {
    const nodeName = get(node, 'AST node', 'name')
    const nodeId = get(node, 'AST node', 'id')
    return {
      ...state,
      idToHyperlink: {
        ...state.idToHyperlink,
        [nodeId]: `${state.currentHyperlink}#${nodeName}`
      }
    }
  }
}

/**
 * Builds view objects for all doc files' Mustache templates.
 */
function buildDocViews (sources, contractsPath, idToHyperlink, version, repoBaseUrl, repositoryRoot) {
  let state = { docs: [], contractsPath, idToHyperlink, version, repoBaseUrl }
  const astWalker = buildBaseAstWalker()
  astWalker.setStartFunction(AstNodeType.CONTRACT_DEFINITION, contractDefinitionStartFunction)
  for (const source in sources) {
    const ast = get(sources[source], 'source', 'AST')
    state = astWalker.walk(ast, state)
  }
  return state.docs

  function contractDefinitionStartFunction (node, state) {
    const nodeName = get(node, 'AST node', 'name')
    const { docs, contractsPath, absolutePath, idToHyperlink, version, repoBaseUrl } = state
    const docId = buildDocId(absolutePath, nodeName, contractsPath)
    const content = ReactDOMServer.renderToStaticMarkup(
      <Document
        contractDefinition={node}
        contractsPath={contractsPath}
        absolutePath={absolutePath}
        idToHyperlink={idToHyperlink}
        version={version}
        repoBaseUrl={repoBaseUrl}
        repositoryRoot={repositoryRoot}
      />
    )
    return {
      ...state,
      docs: docs.concat([{
        docId,
        docTitle: nodeName,
        content
      }])
    }
  }
}

/**
 * Builds a basic AST walker which annotates the walk's state
 * with the absolute path of the current source unit.
 */
function buildBaseAstWalker () {
  const astWalker = new AstWalker()
  astWalker.setStartFunction(AstNodeType.SOURCE_UNIT, sourceUnitStartFunction)
  astWalker.setEndFunction(AstNodeType.SOURCE_UNIT, sourceUnitEndFunction)
  return astWalker

  function sourceUnitStartFunction (node, state) {
    return {
      ...state,
      absolutePath: node.absolutePath
    }
  }

  function sourceUnitEndFunction (node, state) {
    const { absolutePath, ...updatedState } = state
    return updatedState
  }
}

/**
 * Get output path for the given doc's markdown file.
 */
function getDocOutputPath (docsPath, docId) {
  return path.resolve(docsPath, `api_${docId}.md`)
}
