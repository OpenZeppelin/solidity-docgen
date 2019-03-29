import { compile } from './compile';
import { extractDocsPerDirectory } from './extract';

export async function gatherSolidityDocs(directory, ignore) {
  const solcOutput = await compile(directory, ignore);
  return extractDocsPerDirectory(solcOutput, directory);
}
