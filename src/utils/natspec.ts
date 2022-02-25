import { FunctionDefinition } from 'solidity-ast';
import { findAll } from 'solidity-ast/utils';
import { accessors } from '../accessors';
import { DocItemWithContext } from '../site';
import { arraysEqual } from './arrays-equal';
import { execAll } from './execall';
import { getContractsInScope } from './scope';

export interface NatSpec {
  title?: string;
  notice?: string;
  dev?: string;
  params?: {
    name: string;
    description: string;
  }[];
  returns?: {
    name?: string;
    description: string;
  }[];
  custom?: {
    [tag: string]: string;
  };
}

export function parseNatspec(item: DocItemWithContext): NatSpec {
  if (!item.__item_context) throw new Error(`Not an item or item is missing context`);

  let res: NatSpec = {};

  const docString = 'documentation' in item && item.documentation?.text
    ? cleanUpDocstring(item.documentation.text)
    : '';

  const tagMatches = execAll(
    /^(?:@(\w+|custom:[a-z][a-z-]*) )?((?:(?!^@(?:\w+|custom:[a-z][a-z-]*) )[^])*)/m,
    docString,
  );

  let inheritFrom: FunctionDefinition | undefined;

  for (const [, tag = 'notice', content] of tagMatches) {
    if (content === undefined) throw new Error('Unexpected error');

    if (tag === 'dev' || tag === 'notice') {
      res[tag] ??= '';
      res[tag] += content;
    }

    if (tag === 'title') {
      res.title = content.trim();
    }

    if (tag === 'param') {
      const paramMatches = content.match(/(\w+) ([^]*)/);
      if (paramMatches) {
        const [, name, description] = paramMatches as [string, string, string];
        res.params ??= [];
        res.params.push({ name, description: description.trim() });
      }
    }

    if (tag === 'return') {
      if (!('returnParameters' in item)) {
        throw new Error(`Item does not contain return parameters`);
      }
      res.returns ??= [];
      const i = res.returns.length;
      const p = item.returnParameters.parameters[i];
      if (p === undefined) {
        throw new Error(`Got more @return tags than expected for '${item.name}'`);
      }
      if (!p.name) {
        res.returns.push({ description: content.trim() });
      } else {
        const paramMatches = content.match(/(\w+) ([^]*)/);
        if (!paramMatches || paramMatches[1] !== p.name) {
          throw new Error(`Expected @return tag to start with name '${p.name}'`);
        }
        const [, name, description] = paramMatches as [string, string, string];
        res.returns.push({ name, description: description.trim() });
      }
    }

    if (tag?.startsWith('custom:')) {
      const key = tag.replace(/^custom:/, '');
      res.custom ??= {};
      res.custom[key] ??= '';
      res.custom[key] += content;
    }

    if (tag === 'inheritdoc') {
      if (!(item.nodeType === 'FunctionDefinition' || item.nodeType === 'VariableDeclaration')) {
        throw new Error(`Expected function or variable but saw ${accessors.type(item)}`);
      }
      const parentContractName = content.trim();
      const parentContract = getContractsInScope(item)[parentContractName];
      if (!parentContract) {
        throw new Error(`Parent contract '${parentContractName}' not found`);
      }
      inheritFrom = [...findAll('FunctionDefinition', parentContract)].find(f => item.baseFunctions?.includes(f.id));
    }
  }

  if (docString.length === 0) {
    if ('baseFunctions' in item && item.baseFunctions?.length === 1) {
      const baseFn = item.__item_context.build.deref('FunctionDefinition', item.baseFunctions[0]!);
      const shouldInherit = item.nodeType === 'VariableDeclaration' || arraysEqual(item.parameters.parameters, baseFn.parameters.parameters, p => p.name);
      if (shouldInherit) {
        inheritFrom = baseFn;
      }
    }
  }

  if (res.dev) res.dev = res.dev.trim();
  if (res.notice) res.notice = res.notice.trim();

  if (inheritFrom) {
    res = { ...parseNatspec(inheritFrom as DocItemWithContext), ...res };
  }

  return res;
}

// Fix solc buggy parsing of doc comments.
// Reverse engineered from solc behavior.
function cleanUpDocstring(text: string) {
  return text
    .replace(/\n\n?^[ \t]*(?:\*|\/\/\/)/mg, '\n\n')
    .replace(/^[ \t]?/mg, '');
}
