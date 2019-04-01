import path from 'path';
import _ from 'lodash';

export function extractDocsPerDirectory(solcOutput, relativeTo = '') {
  const contractsPerFile = getContractsPerFile(solcOutput);
  const contractsPerDirectory = groupByDirectory(contractsPerFile, relativeTo);

  return _.mapValues(contractsPerDirectory, function (contracts) {
    const pairs = contracts.map(function (contract) {
      const docs = extractDocs(contract);
      return [docs.name, docs];
    });

    return _.fromPairs(pairs);
  });
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

export function groupByDirectory(contractsPerFile, relativeTo = '') {
  const groupedContracts = {};

  for (const file of Object.keys(contractsPerFile)) {
    const dir = path.relative(relativeTo, path.dirname(file));

    if (!groupedContracts[dir]) {
      groupedContracts[dir] = [];
    }

    groupedContracts[dir].push(...contractsPerFile[file]);
  }

  return groupedContracts;
}

export function getEvents(contract) {
  return _(contract.astNode.nodes)
    .filter(['nodeType', 'EventDefinition'])
    .map(function (astNode) {
      const { name, parameters: { parameters } } = astNode;
      const args = _(parameters).map('typeDescriptions.typeString').join(',');
      const identifier = `${name}(${args})`;

      const devdoc = parseDocumentation(astNode.documentation);

      return {
        astNode,
        identifier,
        devdoc,
      };
    })
    .value();
}

export function getFunctions(contract) {
  return _(contract.astNode.nodes)
    .filter(['nodeType', 'FunctionDefinition'])
    .map(function (astNode) {
      const { name, kind } = astNode;

      const parameters = astNode.parameters.parameters;
      const returnParameters = astNode.returnParameters.parameters;

      const args = _(parameters).map('typeDescriptions.typeString').join(',');
      const returnType = returnParameters.length == 0 
        ? undefined
        : _(returnParameters).map('typeDescriptions.typeString').join(',');

      const isRegularFunction = kind === 'function';
      const identifier = isRegularFunction ? `${name}(${args})` : kind;

      const devdoc = parseDocumentation(astNode.documentation);

      return {
        astNode,
        identifier,
        returnType,
        devdoc,
      };
    })
    .value();
}

export function parseDocumentation(documentation) {
  documentation = documentation || '';

  // compensates for a bug in solidity where double newlines are wrongly parsed
  documentation = documentation.replace(/\s+\*\s+/g, '\n\n');

  // extracts the first @dev NatSpec tag
  const matches = documentation.match(/^@dev\s+((?:(?!^@\w+).)*)/ms);
  documentation = matches ? matches[1] : '';

  return documentation;
}

export function extractDocs(contract) {
  const { contractName } = contract;

  const functions = getFunctions(contract);
  const events = getEvents(contract);

  const devdoc = parseDocumentation(contract.astNode.documentation);

  return {
    name: contractName,
    devdoc,
    functions,
    events,
  };
}
