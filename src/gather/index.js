import path from 'path';
import _ from 'lodash';
import { gatherMarkdownDocs } from './markdown';
import { gatherSolidityDocs } from './solidity';

export async function gatherDocs(directory, ignore) {
  const contractDocs = await gatherSolidityDocs(directory, ignore);
  const markdownDocs = await gatherMarkdownDocs(directory, Object.keys(contractDocs));

  const fullDocs = {};

  for (const directory in markdownDocs) {
    (function processDocs(directory) {
      const docs = markdownDocs[directory];
      delete markdownDocs[directory];

      const defaults = {
        title: _.startCase(path.basename(directory)),
        sections: [{
          title: 'Contracts',
          contracts: Object.keys(contractDocs[directory]),
        }],
      };

      const title = _.get(docs.frontMatter, 'title', defaults.title);
      const sections = _.get(docs.frontMatter, 'sections', defaults.sections);

      _.unset(docs, 'frontMatter.sections');

      sections.forEach(function (section, i) {
        if (section.subdirectory) {
          const subdirectory = path.join(directory, section.subdirectory);

          if (subdirectory in markdownDocs) {
            processDocs(subdirectory);
          } else if (!(subdirectory in fullDocs)) {
            throw new Error(`${subdirectory} (inlined in ${directory}) either does not exist or is already inlined elsewhere.`);
          }

          const subdocs = fullDocs[subdirectory];
          delete fullDocs[subdirectory];

          if (subdocs.intro.trim().length > 0) {
            throw new Error(`${subdirectory} is being inlined so its README content will be ignored. Please move the content to the README for ${directory}.`);
          }

          if (subdocs.sections.length > 1) {
            throw new Error(`${subdirectory} can only have one section in order to be inlined (in ${directory}).`);
          }

          sections[i] = {
            title: subdocs.title,
            contracts: subdocs.sections[0].contracts,
          };
        } else if (section.contracts) {
          section.contracts = _.at(contractDocs[directory], section.contracts);
        }
      });

      fullDocs[directory] = {
        title,
        sections,
        ...docs,
      };
    })(directory);
  }

  return fullDocs;
}

