import { flatten, uniqBy, groupBy } from 'lodash';
import path from 'path';
import { memoize } from './memoize';

type ContractTemplate = (contract: SourceContract) => string;

import { slug } from './handlebars';
import * as solc from './solc';

export class Source {
  constructor(
    private readonly contractsDir: string,
    private readonly solcOutput: solc.Output,
    readonly contractTemplate: ContractTemplate,
  ) { }

  get contracts(): SourceContract[] {
    return flatten(this.files.map(file => file.contracts));
  }

  get files(): SourceFile[] {
    return Object.keys(this.solcOutput.sources)
      .map(fileName => this.file(fileName));
  }

  @memoize
  file(fileName: string): SourceFile {
    return new SourceFile(
      this,
      this.solcOutput.sources[fileName].ast,
      path.relative(this.contractsDir, fileName),
    );
  }

  contractById(id: number): SourceContract {
    const contract = this.contracts.find(c => c.astId === id);

    if (contract === undefined) {
      throw new Error(`Contract with id ${id} not found`);
    }

    return contract;
  }
}

class SourceFile {
  constructor(
    private readonly source: Source,
    private readonly ast: solc.ast.SourceUnit,
    readonly path: string,
  ) { }

  @memoize
  get contracts(): SourceContract[] {
    const astNodes = this.ast.nodes.filter(n =>
      n.nodeType === 'ContractDefinition'
    );

    return astNodes.map(node => 
      new SourceContract(this.source, this, node)
    );
  }
}

export interface Linkable {
  anchor: string;
  name: string;
  fullName: string;
}

export class SourceContract implements Linkable {
  constructor(
    private readonly source: Source,
    readonly file: SourceFile,
    private readonly astNode: solc.ast.ContractDefinition,
  ) { }

  toString(): string {
    return this.source.contractTemplate(this);
  }

  get name(): string {
    return this.astNode.name;
  }

  get fullName(): string {
    return this.name;
  }

  get anchor(): string {
    return this.name;
  }

  get linkable(): Linkable[] {
    return [this, ...this.ownModifiers, ...this.ownVariables, ...this.ownFunctions, ...this.ownEvents];
  }

  get inheritance(): SourceContract[] {
    return this.astNode.linearizedBaseContracts.map(id =>
      this.source.contractById(id)
    );
  }

  get variables(): SourceStateVariable[] {
    return flatten(this.inheritance.map(c => c.ownVariables));
  }

  @memoize
  get ownVariables(): SourceStateVariable[] {
    return this.astNode.nodes
      .filter(isVariableDeclaration)
      .filter(n => n.visibility !== 'private')
      .map(n => new SourceStateVariable(this, n));
  }

  get functions(): SourceFunction[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownFunctions)),
      f => f.name === 'constructor' ? 'constructor' : f.signature,
    );
  }

  @memoize
  get ownFunctions(): SourceFunction[] {
    return this.astNode.nodes
      .filter(isFunctionDefinition)
      .filter(n => n.visibility !== 'private')
      .map(n => new SourceFunction(this, n))
      .filter(f => !f.isTrivialConstructor);
  }

  get inheritedItems(): InheritedItems[] {
    const variables = groupBy(this.variables, f => f.contract.astId);
    const functions = groupBy(this.functions, f => f.contract.astId);
    const events = groupBy(this.events, f => f.contract.astId);
    const modifiers = groupBy(this.modifiers, f => f.contract.astId);

    return this.inheritance.map(contract => ({
      contract,
      variables: variables[contract.astId],
      functions: functions[contract.astId],
      events: events[contract.astId],
      modifiers: modifiers[contract.astId],
    }));
  }

  get events(): SourceEvent[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownEvents)),
      f => f.signature,
    );
  }

  @memoize
  get ownEvents(): SourceEvent[] {
    return this.astNode.nodes
      .filter(isEventDefinition)
      .map(n => new SourceEvent(this, n));
  }

  get modifiers(): SourceModifier[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownModifiers)),
      f => f.signature,
    );
  }

  @memoize
  get ownModifiers(): SourceModifier[] {
    return this.astNode.nodes
      .filter(isModifierDefinition)
      .map(n => new SourceModifier(this, n));
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

abstract class SourceContractItem implements Linkable {
  constructor(
    readonly contract: SourceContract,
  ) { }

  protected abstract astNode: Exclude<solc.ast.ContractItem, solc.ast.VariableDeclaration>;

  get name(): string {
    return this.astNode.name;
  }

  get fullName(): string {
    return `${this.contract.name}.${this.name}`;
  }

  get anchor(): string {
    return `${this.contract.name}-${slug(this.signature)}`;
  }

  @memoize
  get args(): SourceTypedVariable[] {
    return SourceTypedVariableArray.fromParameterList(
      this.astNode.parameters,
    );
  }

  get signature(): string {
    return `${this.name}(${this.args.map(a => a.type).join(',')})`;
  }

  get natspec(): NatSpec {
    if (this.astNode.documentation === null) {
      return {};
    }

    return parseNatSpec(this.astNode.documentation);
  }
}

class SourceStateVariable implements Linkable {
  constructor(
    readonly contract: SourceContract,
    protected readonly astNode: solc.ast.VariableDeclaration,
  ) { }

  get name(): string {
    return this.astNode.name;
  }

  get fullName(): string {
    return `${this.contract.name}.${this.name}`
  }

  get anchor(): string {
    return `${this.contract.name}-${this.name}-${slug(this.type)}`
  }

  get type(): string {
    return this.astNode.typeName.typeDescriptions.typeString;
  }

  get signature(): string {
    return `${this.type} ${this.name}`;
  }

  get natspec(): {} {
    warnStateVariableNatspec();
    return {}
  }
}

class SourceFunction extends SourceContractItem {
  constructor(
    contract: SourceContract,
    protected readonly astNode: solc.ast.FunctionDefinition,
  ) {
    super(contract);
  }

  get name(): string {
    const { name, kind } = this.astNode;
    const isRegularFunction = kind === 'function';
    return isRegularFunction ? name : kind;
  }

  @memoize
  get outputs(): SourceTypedVariable[] {
    return SourceTypedVariableArray.fromParameterList(
      this.astNode.returnParameters
    );
  }

  get visibility(): 'internal' | 'external' | 'public' | 'private' {
    return this.astNode.visibility;
  }

  get isTrivialConstructor(): boolean {
    return (
      this.astNode.kind === "constructor" &&
      this.visibility === "public" &&
      this.args.length === 0 &&
      Object.keys(this.natspec).length === 0
    );
  }
}

class SourceEvent extends SourceContractItem {
  constructor(
    contract: SourceContract,
    protected readonly astNode: solc.ast.EventDefinition,
  ) {
    super(contract);
  }
}

class SourceModifier extends SourceContractItem {
  constructor(
    contract: SourceContract,
    protected readonly astNode: solc.ast.ModifierDefinition,
  ) {
    super(contract);
  }
}

class SourceTypedVariable {
  constructor(
    private readonly typeNode: solc.ast.TypeName,
    readonly name?: string,
  ) { }

  get type(): string {
    return this.typeNode.typeDescriptions.typeString;
  }

  // TODO: deprecate
  get typeName() {
    return this.type;
  }

  toString(): string {
    if (this.name) {
      return [this.type, this.name].join(' ');
    } else {
      return this.type;
    }
  }
}

interface InheritedItems {
  contract: SourceContract;
  variables: SourceStateVariable[];
  functions: SourceFunction[];
  events: SourceEvent[];
  modifiers: SourceModifier[];
}

class PrettyArray<T extends ToString> extends Array<T> {
  toString() {
    return this.map(e => e.toString()).join(', ');
  }
}

class SourceTypedVariableArray extends PrettyArray<SourceTypedVariable> {
  static fromParameterList(parameters: solc.ast.ParameterList): SourceTypedVariable[] {
    return SourceTypedVariableArray.from(
      parameters.parameters.map(p =>
        new SourceTypedVariable(
          p.typeName,
          p.name || undefined,
        )
      )
    );
  }

  get types(): string[] {
    return this.map(v => v.type);
  }

  get names(): string[] {
    return this.map(v => (v.name === undefined) ? '_' : v.name);
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
  const raw = doc.replace(/\n\n?^[ \t]*(?:\*|\/\/\/)/mg, '\n\n').replace(/^[ \t]*/mg, '');

  const tagMatches = execall(/^(?:@(\w+) )?((?:(?!^@\w+ )[^])*)/m, raw);

  for (const [, tag, content] of tagMatches) {
    if (tag === 'dev') {
      setOrAppend(res, 'devdoc', content); 
    }
    if (tag === 'notice' || tag === undefined) {
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

function* execall(re: RegExp, text: string) {
  re = new RegExp(re, re.flags + (re.sticky ? '' : 'y'));

  while (true) {
    const match = re.exec(text);

    // we break out of the loop if the empty string is matched because no
    // progress will be made and it will loop infinitely

    if (match && match[0] !== '') {
      yield match;
    } else {
      break;
    }
  }
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

function isVariableDeclaration(node: solc.ast.ContractItem): node is solc.ast.VariableDeclaration {
  return node.nodeType === 'VariableDeclaration';
}

function isFunctionDefinition(node: solc.ast.ContractItem): node is solc.ast.FunctionDefinition {
  return node.nodeType === 'FunctionDefinition';
}

function isEventDefinition(node: solc.ast.ContractItem): node is solc.ast.EventDefinition {
  return node.nodeType === 'EventDefinition';
}

function isModifierDefinition(node: solc.ast.ContractItem): node is solc.ast.ModifierDefinition {
  return node.nodeType === 'ModifierDefinition';
}

function oneTimeLogger(msg: string): () => void {
  let warned = false;

  return function () {
    if (!warned) {
      console.warn(msg);
      warned = true;
    }
  };
}

const warnStateVariableNatspec = oneTimeLogger('Warning: NatSpec is currently not available for state variables.');
