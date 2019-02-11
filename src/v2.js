import path from 'path';
import _ from 'lodash';

export function getContractsWithASTNodes(solcOutput) {
  return _.mapValues(solcOutput.contracts, function (contracts, file) {
    return _.mapValues(contracts, function (contract, contractName) {
      const { ast } = solcOutput.sources[file];

      const astNode = _(ast.nodes)
        .filter(['nodeType', 'ContractDefinition'])
        .find(['name', contractName]);

      return _.assign({ astNode }, contract);
    });
  });
}

export function groupByDirectory(contracts) {
  const groupedContracts = {};

  for (const file of Object.keys(contracts)) {
    const dir = path.dirname(file);

    groupedContracts[dir] = groupedContracts[dir] || {};
    
    Object.assign(groupedContracts[dir], contracts[file]);
  }

  return groupedContracts;
}

export function getFunctions(contract) {
  return _(contract.astNode.nodes)
    .filter(['nodeType', 'FunctionDefinition'])
    .map(function (astNode) {
      const { name, parameters } = astNode;
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

export function generateContractDocumentation(contract, contractName) {
  const functions = getFunctions(contract);

  return {
    name: contractName,
    devdoc: contract.devdoc.details,
    functions,
  };
}
