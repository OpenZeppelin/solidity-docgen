import path from 'path';
import _ from 'lodash';

export function getContractsWithASTNodes(solcOutput) {
  const res = {};

  for (const file of Object.keys(solcOutput.contracts)) {
    res[file] = {};

    for (const contract of Object.keys(solcOutput.contracts[file])) {
      const { ast } = solcOutput.sources[file];

      const astNode = ast.nodes.find(function (node) {
        return node.nodeType === 'ContractDefinition' && node.name === contract;
      });

      res[file][contract] = Object.assign({ astNode }, solcOutput.contracts[file][contract]);
    }
  }

  return res;
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
