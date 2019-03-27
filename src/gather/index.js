import path from 'path';
import _ from 'lodash';
import { gatherMarkdownDocs } from './markdown';
import { gatherSolidityDocs } from './solidity';

export async function gatherDocs(directory) {
  const contractDocs = await gatherSolidityDocs(directory);
  const markdownDocs = await gatherMarkdownDocs(directory, Object.keys(contractDocs));

  const fullDocs = {};

  for (const directory in markdownDocs) {
    const docs = markdownDocs[directory];

    (function processDocs(docs, directory) {
      const { title, sections } = _.defaults(docs.frontMatter, {
        title: _.startCase(path.basename(directory)),
        sections: [{
          contracts: Object.keys(contractDocs[directory]),
        }],
      });

      delete docs.frontMatter.sections;

      sections.forEach(function (section, i) {
        if (section.subdirectory) {
          const subdirectory = path.join(directory, section.subdirectory);

          if (subdirectory in markdownDocs) {
            const subdocs = markdownDocs[subdirectory];
            delete markdownDocs[subdirectory];
            processDocs(subdocs, subdirectory);
          } else if (!(subdirectory in fullDocs)) {
            throw new Error(`${subdirectory} (inlined in ${directory}) either does not exist or is already inlined elsewhere.`);
          }

          sections[i] = fullDocs[subdirectory];
          delete fullDocs[subdirectory];

          sections[i].type = 'subdirectory';
          delete sections[i].frontMatter;
        } else if (section.contracts) {
          section.type = 'contracts';
          section.contracts = _.at(contractDocs[directory], section.contracts);
        }
      });

      fullDocs[directory] = {
        title,
        sections,
        ...docs,
      };
    })(docs, directory);
  }

  return fullDocs;
}
