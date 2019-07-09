import { flatten, uniqBy } from 'lodash';
import path from 'path';
import execall from 'execall';
import handlebars from 'handlebars';

type ContractTemplate = (contract: SolidityContract) => string;

import * as solc from './solc';

export class SoliditySource {
  constructor(
    private readonly contractsDir: string,
    private readonly solcOutput: solc.Output,
    readonly contractTemplate: ContractTemplate,
  ) { }

  get contracts(): SolidityContract[] {
    return flatten(this.files.map(file => file.contracts));
  }

  get files(): SolidityFile[] {
    return Object.keys(this.solcOutput.sources)
      .map(fileName => this.file(fileName));
  }

  file(fileName: string): SolidityFile {
    return new SolidityFile(
      this,
      this.solcOutput.sources[fileName].ast,
      path.relative(this.contractsDir, fileName),
    );
  }

  contractById(id: number): SolidityContract {
    const contract = this.contracts.find(c => c.astId === id);

    if (contract === undefined) {
      throw new Error(`Contract with id ${id} not found`);
    }

    return contract;
  }
}

class SolidityFile {
  constructor(
    private readonly source: SoliditySource,
    private readonly ast: solc.ast.SourceUnit,
    readonly path: string,
  ) { }

  get contracts(): SolidityContract[] {
    const astNodes = this.ast.nodes.filter(n =>
      n.nodeType === 'ContractDefinition'
    );

    return astNodes.map(node => 
      new SolidityContract(this.source, this, node)
    );
  }
}

export abstract class Referenceable {
  abstract label: string;
  abstract slug: string;

  get anchor(): handlebars.SafeString {
    return new handlebars.SafeString(`<span id="${this.slug}"></span>`);
  }
}

export class SolidityContract extends Referenceable {
  constructor(
    private readonly source: SoliditySource,
    readonly file: SolidityFile,
    private readonly astNode: solc.ast.ContractDefinition,
  ) {
    super();
  }

  toHTML(): string {
    return this.source.contractTemplate(this);
  }

  get name(): string {
    return this.astNode.name;
  }

  get slug(): string {
    return this.name;
  }

  get label(): string {
    return this.name;
  }

  get inheritance(): SolidityContract[] {
    return this.astNode.linearizedBaseContracts.map(id =>
      this.source.contractById(id)
    );
  }

  get functions(): SolidityFunction[] {
    return [...this.ownFunctions, ...this.inheritedFunctions];
  }

  get ownFunctions(): SolidityFunction[] {
    return this.astNode.nodes
      .filter(isFunctionDefinition)
      .filter(n => n.visibility !== 'private')
      .map(n => new SolidityFunction(this, n));
  }

  get inheritedFunctions(): SolidityFunction[] {
    return uniqBy(
      flatten(this.inheritance.slice(1).map(c => c.functions)),
      f => f.signature,
    );
  }

  get events(): SolidityEvent[] {
    return [...this.ownEvents, ...this.inheritedEvents];
  }

  get ownEvents(): SolidityEvent[] {
    return this.astNode.nodes
      .filter(isEventDefinition)
      .map(n => new SolidityEvent(this, n));
  }

  get inheritedEvents(): SolidityEvent[] {
    return uniqBy(
      flatten(this.inheritance.slice(1).map(c => c.events)),
      f => f.signature,
    );
  }

  get natspec(): NatSpec {
    if (this.astNode.documentation === null) {
      return {};
    }

    return parseNatSpec(this.astNode.documentation);
  }

  get astId(): number {
    return this.astNode.id;
  }
}

class SolidityFunction extends Referenceable {
  constructor(
    readonly contract: SolidityContract,
    private readonly astNode: solc.ast.FunctionDefinition,
  ) {
    super();
  }

  get name(): string {
    const { name, kind } = this.astNode;
    const isRegularFunction = kind === 'function';
    return isRegularFunction ? name : kind;
  }

  get slug(): string {
    return `${this.contract.name}-${slugSignature(this.signature)}`
  }

  get label(): string {
    return `${this.contract.name}.${this.name}`
  }

  get args(): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.fromParameterList(
      this.astNode.parameters
    );
  }

  get outputs(): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.fromParameterList(
      this.astNode.returnParameters
    );
  }

  get signature(): string {
    return `${this.name}(${this.args.map(a => a.typeName).join(',')})`;
  }

  get visibility(): 'internal' | 'external' | 'public' | 'private' {
    return this.astNode.visibility;
  }

  get natspec(): NatSpec {
    if (this.astNode.documentation === null) {
      return {};
    }

    return parseNatSpec(this.astNode.documentation);
  }
}

class SolidityEvent extends Referenceable {
  constructor(
    readonly contract: SolidityContract,
    private readonly astNode: solc.ast.FunctionDefinition,
  ) {
    super();
  }

  get name(): string {
    return this.astNode.name;
  }

  get slug(): string {
    return `${this.contract.name}-${slugSignature(this.signature)}`
  }

  get label(): string {
    return `${this.contract.name}.${this.name}`
  }

  get args(): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.fromParameterList(
      this.astNode.parameters
    );
  }

  get signature(): string {
    return `${this.name}(${this.args.map(a => a.typeName).join(',')})`;
  }

  get natspec(): NatSpec {
    if (this.astNode.documentation === null) {
      return {};
    }

    return parseNatSpec(this.astNode.documentation);
  }
}

class SolidityTypedVariable {
  constructor(
    readonly type: solc.ast.TypeName,
    readonly name?: string,
  ) { }

  get typeName() {
    return this.type.typeDescriptions.typeString;
  }

  toString(): string {
    if (this.name) {
      return [this.typeName, this.name].join(' ');
    } else {
      return this.typeName;
    }
  }
}

class PrettyArray<T extends ToString> extends Array<T> {
  toString() {
    return this.map(e => e.toString()).join(', ');
  }
}

class SolidityTypedVariableArray extends PrettyArray<SolidityTypedVariable> {
  static fromParameterList(parameters: solc.ast.ParameterList): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.from(
      parameters.parameters.map(p =>
        new SolidityTypedVariable(
          p.typeName,
          p.name || undefined,
        )
      )
    );
  }

  get types(): string[] {
    return this.map(v => v.typeName);
  }

  get names(): (string | undefined)[] {
    return this.map(v => v.name);
  }
}

interface NatSpec {
  devdoc?: string;
  userdoc?: string;
  title?: string;
  params?: {
    param: string;
    description: string;
  }[];
  returns?: {
    param: string;
    description: string;
  }[];
}

function parseNatSpec(doc: string): NatSpec {
  const res: NatSpec = {};

  // fix solc buggy parsing of doc comments
  // reverse engineered from solc behavior...
  const raw = doc.replace(/\n\n?^[ \t]*\*[ \t]*/mg, '\n\n');

  const untagged = raw.match(/^(?:(?!^@\w+ )[^])+/m);
  if (untagged) {
    setOrAppend(res, 'userdoc', untagged[0]);
  }

  const tagMatches = execall(/^@(\w+) ((?:(?!^@\w+ )[^])*)/gm, raw);
  for (const m of tagMatches) {
    const [tag, content] = m.subMatches;
    if (tag === 'dev') {
      setOrAppend(res, 'devdoc', content); 
    }
    if (tag === 'notice') {
      setOrAppend(res, 'userdoc', content);
    }
    if (tag === 'title') {
      res.title = content;
    }
    if (tag === 'param') {
      const paramMatches = content.match(/(\w+) ([^]*)/);
      if (paramMatches) {
        const [, param, description] = paramMatches;
        if (res.params === undefined) {
          res.params = [];
        }
        res.params.push({ param, description });
      }
    }
    if (tag === 'return') {
      const paramMatches = content.match(/(\w+) ([^]*)/);
      if (paramMatches) {
        const [, param, description] = paramMatches;
        if (res.returns === undefined) {
          res.returns = [];
        }
        res.returns.push({ param, description });
      }
    }
  }

  return res;
}

function setOrAppend<K extends string>(
  obj: { [key in K]?: string },
  key: K,
  value: string,
) {
  if (obj[key] === undefined) {
    obj[key] = value;
  } else {
    obj[key] += value;
  }
}

interface ToString {
  toString(): string;
}

function isFunctionDefinition(
  node: solc.ast.FunctionDefinition | solc.ast.EventDefinition,
): node is solc.ast.FunctionDefinition {
  return node.nodeType === 'FunctionDefinition';
}

function isEventDefinition(
  node: solc.ast.FunctionDefinition | solc.ast.EventDefinition,
): node is solc.ast.FunctionDefinition {
  return node.nodeType === 'EventDefinition';
}

function slugSignature(signature: string): string {
  return signature.replace(/\(?\)$/, '').replace(/[(, ]/g, '-');
}
