import path from 'path';
import _ from 'lodash';

export function extractDocsPerDirectory(solcOutput) {
  const contractsPerFile = getContractsPerFile(solcOutput);
  const contractsPerDirectory = groupByDirectory(contractsPerFile);
  return _.mapValues(contractsPerDirectory, contracts => contracts.map(extractDocs));
}

export function getContractsPerFile(solcOutput) {
  return _.mapValues(solcOutput.contracts, function (contracts, file) {
    return _.map(contracts, function (contract, contractName) {
      const { ast } = solcOutput.sources[file];

      const astNode = _(ast.nodes)
        .filter(['nodeType', 'ContractDefinition'])
        .find(['name', contractName]);

      return _.assign({ astNode, contractName }, contract);
    });
  });
}

export function groupByDirectory(contractsPerFile) {
  const groupedContracts = {};

  for (const file of Object.keys(contractsPerFile)) {
    const dir = path.dirname(file);

    if (!groupedContracts[dir]) {
      groupedContracts[dir] = [];
    }

    groupedContracts[dir].push(...contractsPerFile[file]);
  }

  return groupedContracts;
}

export function getFunctions(contract) {
  return _(contract.astNode.nodes)
    .filter(['nodeType', 'FunctionDefinition'])
    .map(function (astNode) {
      const { name, parameters: { parameters } } = astNode;
      const args = _(parameters).map('typeDescriptions.typeString').join(',');
      const methodIdentifier = `${name}(${args})`;

      const devdoc = contract.devdoc.methods[methodIdentifier].details;

      return {
        astNode,
        methodIdentifier,
        devdoc,
      };
    })
    .value();
}

export function extractDocs(contract) {
  const { contractName } = contract;

  const functions = getFunctions(contract);

  return {
    name: contractName,
    devdoc: contract.devdoc.details,
    functions,
  };
}
