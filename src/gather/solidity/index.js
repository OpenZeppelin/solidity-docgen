import { compile } from './compile';
import { extractDocsPerDirectory } from './extract';

export async function gatherSolidityDocs(directory) {
  const solcOutput = await compile(directory);
  return extractDocsPerDirectory(solcOutput, directory);
}
