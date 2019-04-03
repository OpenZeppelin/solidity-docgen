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
  const contractsByAstNodeId = {};

  return _.mapValues(solcOutput.contracts, function (contracts, file) {
    return _.map(contracts, function (contract, name) {
      const { ast } = solcOutput.sources[file];

      const astNode = _(ast.nodes)
        .filter(['nodeType', 'ContractDefinition'])
        .find(['name', name]);

      return contractsByAstNodeId[astNode.id] = {
        astNode,
        name,
        get baseContracts() {
          return astNode.baseContracts.map(c =>
            contractsByAstNodeId[c.baseName.referencedDeclaration]
          );
        },
        ...contract,
      };
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
  const ownEvents = getOwnEvents(contract);
  const inheritedEvents = getInheritedEvents(contract);
  return _.uniqBy(ownEvents.concat(inheritedEvents), 'identifier');
}

export function getOwnEvents(contract) {
  return _(contract.astNode.nodes)
    .filter(['nodeType', 'EventDefinition'])
    .map(function (astNode) {
      const { name, parameters: { parameters } } = astNode;
      const args = _(parameters).map('typeDescriptions.typeString').join(',');
      const identifier = `${name}(${args})`;

      const devdoc = parseDocumentation(astNode.documentation);

      const definedIn = contract.name;

      return {
        astNode,
        identifier,
        devdoc,
        definedIn,
      };
    })
    .value();
}

export function getInheritedEvents(contract) {
  return _(contract.baseContracts)
    .map(function (baseContract) {
      return getOwnEvents(baseContract).map(function (fn) {
        fn.inherited = true;
        return fn;
      })
    })
    .flatten()
    .uniqBy('identifier')
    .value();
}

export function getOwnFunctions(contract) {
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

      const definedIn = contract.name;

      return {
        astNode,
        identifier,
        returnType,
        devdoc,
        definedIn,
      };
    })
    .value();
}

export function getInheritedFunctions(contract) {
  return _(contract.baseContracts)
    .map(function (baseContract) {
      return getOwnFunctions(baseContract).map(function (fn) {
        fn.inherited = true;
        return fn;
      })
    })
    .flatten()
    .uniqBy('identifier')
    .value();
}

export function getFunctions(contract) {
  const ownFunctions = getOwnFunctions(contract);
  const inheritedFunctions = getInheritedFunctions(contract);
  return _.uniqBy(ownFunctions.concat(inheritedFunctions), 'identifier');
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
  const { name } = contract;

  const functions = getFunctions(contract);
  const events = getEvents(contract);

  const devdoc = parseDocumentation(contract.astNode.documentation);

  return {
    name,
    devdoc,
    functions,
    events,
  };
}
