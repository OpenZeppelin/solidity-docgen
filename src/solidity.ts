import { flatten, uniqBy, groupBy } from 'lodash';
import path from 'path';
import { memoize } from './memoize';

type ContractTemplate = (contract: SolidityContract) => string;

import { slug } from './handlebars';
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

  @memoize
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

  @memoize
  get contracts(): SolidityContract[] {
    const astNodes = this.ast.nodes.filter(n =>
      n.nodeType === 'ContractDefinition'
    );

    return astNodes.map(node => 
      new SolidityContract(this.source, this, node)
    );
  }
}

export interface Linkable {
  anchor: string;
  name: string;
  fullName: string;
}

export class SolidityContract implements Linkable {
  constructor(
    private readonly source: SoliditySource,
    readonly file: SolidityFile,
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
    return [this, ...this.modifiers, ...this.variables, ...this.functions, ...this.events];
  }

  get inheritance(): SolidityContract[] {
    return this.astNode.linearizedBaseContracts.map(id =>
      this.source.contractById(id)
    );
  }

  get variables(): SolidityStateVariable[] {
    return flatten(this.inheritance.map(c => c.ownVariables));
  }

  @memoize
  get ownVariables(): SolidityStateVariable[] {
    return this.astNode.nodes
      .filter(isVariableDeclaration)
      .filter(n => n.visibility !== 'private')
      .map(n => new SolidityStateVariable(this, n));
  }

  get functions(): SolidityFunction[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownFunctions)),
      f => f.name === 'constructor' ? 'constructor' : f.signature,
    );
  }

  @memoize
  get ownFunctions(): SolidityFunction[] {
    return this.astNode.nodes
      .filter(isFunctionDefinition)
      .filter(n => n.visibility !== 'private')
      .map(n => new SolidityFunction(this, n))
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

  get events(): SolidityEvent[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownEvents)),
      f => f.signature,
    );
  }

  @memoize
  get ownEvents(): SolidityEvent[] {
    return this.astNode.nodes
      .filter(isEventDefinition)
      .map(n => new SolidityEvent(this, n));
  }

  get modifiers(): SolidityModifier[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownModifiers)),
      f => f.signature,
    );
  }

  @memoize
  get ownModifiers(): SolidityModifier[] {
    return this.astNode.nodes
      .filter(isModifierDefinition)
      .map(n => new SolidityModifier(this, n));
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

abstract class SolidityContractItem implements Linkable {
  constructor(
    readonly contract: SolidityContract,
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
  get args(): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.fromParameterList(
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

class SolidityStateVariable implements Linkable {
  constructor(
    readonly contract: SolidityContract,
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

class SolidityFunction extends SolidityContractItem {
  constructor(
    contract: SolidityContract,
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
  get outputs(): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.fromParameterList(
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

class SolidityEvent extends SolidityContractItem {
  constructor(
    contract: SolidityContract,
    protected readonly astNode: solc.ast.EventDefinition,
  ) {
    super(contract);
  }
}

class SolidityModifier extends SolidityContractItem {
  constructor(
    contract: SolidityContract,
    protected readonly astNode: solc.ast.ModifierDefinition,
  ) {
    super(contract);
  }
}

class SolidityTypedVariable {
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
  contract: SolidityContract;
  variables: SolidityStateVariable[];
  functions: SolidityFunction[];
  events: SolidityEvent[];
  modifiers: SolidityModifier[];
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
  const raw = doc.replace(/\n\n?^[ \t]*\*[ \t]*/mg, '\n\n');

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
