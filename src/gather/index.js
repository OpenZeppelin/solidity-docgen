import _ from 'lodash';
import { gatherMarkdownDocs } from './markdown';
import { gatherSolidityDocs } from './solidity';

export async function gatherDocs(directory) {
  const contractDocs = await gatherSolidityDocs(directory);
  const markdownDocs = await gatherMarkdownDocs(Object.keys(contractDocs));

  return _.merge(
    markdownDocs,
    _.mapValues(contractDocs, contracts => ({ contracts })),
  );
}
