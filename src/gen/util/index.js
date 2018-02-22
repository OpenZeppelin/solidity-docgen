/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

/**
 * ID of section corresponding to the root contracts directory.
 */
export const SECTION_ID_ROOT = 'UNCATEGORIZED'

/**
 * Derives a section ID from the given path.
 * E.g.: path "/a/b/C.sol" yields ID "A / B".
 */
export function buildSectionId(path, contractsPath) {
  const relativePath = path.substr(contractsPath.length + 1)
  const directoryParts = relativePath.split('/').slice(0, -1)
  if (directoryParts.length === 0) {
    return SECTION_ID_ROOT
  }
  return directoryParts.join(' / ').toUpperCase()
}

/**
 * Compares two section IDs. The root section is considered
 * greater than any other section.
 */
export function compareSectionIds(id1, id2) {
  if (id1 === SECTION_ID_ROOT && id2 === SECTION_ID_ROOT) {
    return 0
  }
  else if (id1 === SECTION_ID_ROOT) {
    return 1
  }
  else if (id2 === SECTION_ID_ROOT) {
    return -1
  }
  else {
    return id1 < id2 ? -1 : id2 < id1 ? 1 : 0
  }
}

/**
 * Derives a doc ID from the given path and contract name.
 * E.g.: path "/a/b/C.sol" and contract "Base" yield ID "a_b_C_Base".
 */
export function buildDocId(path, contractName, contractsPath) {
  const relativePath = path.substr(contractsPath.length + 1)
  const pathParts = relativePath.split('/')
  const directoryParts = pathParts.slice(0, -1)
  const filename = pathParts[pathParts.length - 1]
  const filenameWithoutExtension = filename.substr(0, filename.lastIndexOf('.'))
  const idParts = directoryParts.concat(filenameWithoutExtension)
  if (filenameWithoutExtension !== contractName) {
    idParts.push(contractName)
  }
  return idParts.join('_')
}
