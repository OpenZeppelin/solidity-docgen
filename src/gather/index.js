import _ from 'lodash';
import { gatherMarkdownDocs } from './markdown';
import { gatherSolidityDocs } from './solidity';

export async function gatherDocs(directory) {
  const markdown = await gatherMarkdownDocs(directory);
  const contracts = await gatherSolidityDocs(directory);

  const docs = {};

  _.merge(docs, _.mapValues(markdown, doc => ({ head: doc })));
  _.merge(docs, _.mapValues(contracts, doc => ({ contracts: doc })));

  return docs;
}
