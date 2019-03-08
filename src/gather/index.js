import _ from 'lodash';
import { gatherMarkdownDocs } from './markdown';
import { gatherSolidityDocs } from './solidity';

export async function gatherDocs(directory) {
  const markdownPerDirectory = await gatherMarkdownDocs(directory);
  const contractsPerDirectory = await gatherSolidityDocs(directory);

  return _.mapValues(markdownPerDirectory, function (head, directory) {
    const contracts = contractsPerDirectory[directory];
    return { head, contracts };
  });

  return docs;
}
