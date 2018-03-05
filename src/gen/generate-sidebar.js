/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import { buildSectionId, compareSectionIds, buildDocId } from './util'
import checkPathExists from '../util/check-path-exists'
import fs from 'fs'
import Mustache from 'mustache'
import path from 'path'

/**
 * Generates sidebars.json file.
 */
export default function (contracts, contractsPath, excludePaths, docusaurusPath) {
  const sidebarPath = getSidebarPath(docusaurusPath)
  checkPathExists(sidebarPath)
  const sidebarTemplate = fs.readFileSync(getSidebarTemplatePath(), 'utf-8')
  const sidebarView = buildSidebarView(contracts, contractsPath, excludePaths)
  const sidebarApi = Mustache.render(sidebarTemplate, sidebarView)
  const previousSidebar = JSON.parse(fs.readFileSync(sidebarPath))
  const sidebarContent = Object.assign({}, previousSidebar, JSON.parse(sidebarApi))
  fs.writeFileSync(sidebarPath, JSON.stringify(sidebarContent, null, 2))
}

/**
 * Get path to sidebars.json Mustache template.
 */
function getSidebarTemplatePath () {
  return path.resolve(__dirname, '..', '..', 'tpl', 'sidebars.json.mustache')
}

/**
 * Builds a view object for the sidebars.json file's Mustache template.
 */
function buildSidebarView (contracts, contractsPath, excludePaths) {
  const docsPerSection = getDocsPerSection(contracts, contractsPath, excludePaths)
  const entries = Object.entries(docsPerSection)
  const sortedEntries = entries.sort((entry1, entry2) => {
    return compareSectionIds(entry1[0], entry2[0])
  })
  const sections = []
  for (let i = 0; i < sortedEntries.length; ++i) {
    const [sectionId, docIds] = sortedEntries[i]
    const docs = buildSidebarViewDocs(docIds)
    sections.push({
      sectionId,
      docs,
      last: i === sortedEntries.length - 1
    })
  }
  return { sections }
}

/**
 * Populates each section with its corresponding docs.
 */
function getDocsPerSection (contracts, contractsPath, excludePaths) {
  const docsPerSection = {}
  for (const contract of Object.keys(contracts)) {
    const [path, contractName] = contract.split(':')
    if (!path.startsWith(contractsPath) ||
        excludePaths.some(prefix => path.startsWith(prefix))) {
      continue
    }
    const sectionId = buildSectionId(path, contractsPath)
    const docId = buildDocId(path, contractName, contractsPath)
    if (!(sectionId in docsPerSection)) {
      docsPerSection[sectionId] = [docId]
    } else {
      docsPerSection[sectionId].push(docId)
    }
  }
  return docsPerSection
}

/**
 * Builds a view object for a given section in the sidebars.json
 * file's Mustache template.
 */
function buildSidebarViewDocs (docIds) {
  const docs = []
  const sortedDocIds = docIds.sort()
  for (let j = 0; j < sortedDocIds.length; ++j) {
    docs.push({
      docId: sortedDocIds[j],
      last: j === sortedDocIds.length - 1
    })
  }
  return docs
}

/**
 * Get output path for sidebars.json file.
 */
function getSidebarPath (docusaurusPath) {
  return path.resolve(docusaurusPath, 'website', 'sidebars.json')
}
