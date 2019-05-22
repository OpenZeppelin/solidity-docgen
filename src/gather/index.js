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
      const location = getLocation(directory);

      const docs = markdownDocs[directory];
      delete markdownDocs[directory];

      const { title, sections } = _.defaults(docs.frontMatter, {
        title: getTitle(directory),
        sections: [{
          title: 'Contracts',
          contracts: Object.keys(contractDocs[directory]),
        }],
      });

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

        for (const contract of sections[i].contracts) {
          contract.docsPage = directory;
        }
      });

      fullDocs[location] = {
        title,
        sections,
        ...docs,
      };
    })(directory);
  }

  const allContractDocs = Object.assign({}, ...Object.values(contractDocs).flat());

  for (const location in fullDocs) {
    const { intro, sections } = fullDocs[location];

    fullDocs[location].intro = addCrosslinks(intro, allContractDocs);

    for (const section of sections) {
      for (const contract of section.contracts) {
        contract.devdoc = addCrosslinks(contract.devdoc, allContractDocs, contract.name);

        for (const fn of contract.functions) {
          fn.devdoc = addCrosslinks(fn.devdoc, allContractDocs, contract.name);
        }

        for (const fn of contract.events) {
          fn.devdoc = addCrosslinks(fn.devdoc, allContractDocs, contract.name);
        }
      }
    }
  }

  return fullDocs;
}

function addCrosslinks(text, contracts, defaultContract) {
  return text.replace(/`([\w]+)(?:\.([\w]+))?`/g, function (match, m1, m2) {
    const link = (c, id) => `[${match}](/api/${c.docsPage}#${id})`;

    if (!m2 && m1 in contracts) {
      const c = contracts[m1];
      return link(c, c.name.toLowerCase());
    } else {
      const c = contracts[m2 ? m1 : defaultContract];

      const isFn = ({name}) => name === (m2 || m1);
      const f = c.functions.find(isFn) || c.events.find(isFn);

      if (f) {
        return link(c, `${c.name}.${f.signature}`);
      } else {
        return match;
      }
    }
  });
}

function getLocation(directory) {
  if (directory === '') {
    return 'index';
  } else {
    return directory;
  }
}

function getTitle(directory) {
  if (directory === '') {
    return getRootTitle();
  } else {
    return _.startCase(path.basename(directory));
  }
}

function getRootTitle() {
  return 'Contracts';
}
