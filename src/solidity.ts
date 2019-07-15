import { flatten, uniqBy } from 'lodash';
import path from 'path';
import execall from 'execall';

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
    return [this, ...this.functions, ...this.events];
  }

  get inheritance(): SolidityContract[] {
    return this.astNode.linearizedBaseContracts.map(id =>
      this.source.contractById(id)
    );
  }

  get functions(): SolidityFunction[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownFunctions)),
      f => f.signature,
    );
  }

  get ownFunctions(): SolidityFunction[] {
    return this.astNode.nodes
      .filter(isFunctionDefinition)
      .filter(n => n.visibility !== 'private')
      .map(n => new SolidityFunction(this, n));
  }

  get events(): SolidityEvent[] {
    return uniqBy(
      flatten(this.inheritance.map(c => c.ownEvents)),
      f => f.signature,
    );
  }

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
    astNode: solc.ast.ContractItem,
  ) { }

  protected abstract astNode: solc.ast.ContractItem;

  get name(): string {
    return this.astNode.name;
  }

  get fullName(): string {
    return `${this.contract.name}.${this.name}`
  }

  get anchor(): string {
    return `${this.contract.name}-${slug(this.signature)}`
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

class SolidityFunction extends SolidityContractItem {
  constructor(
    contract: SolidityContract,
    protected readonly astNode: solc.ast.FunctionDefinition,
  ) {
    super(contract, astNode);
  }

  get name(): string {
    const { name, kind } = this.astNode;
    const isRegularFunction = kind === 'function';
    return isRegularFunction ? name : kind;
  }

  get outputs(): SolidityTypedVariable[] {
    return SolidityTypedVariableArray.fromParameterList(
      this.astNode.returnParameters
    );
  }

  get visibility(): 'internal' | 'external' | 'public' | 'private' {
    return this.astNode.visibility;
  }
}

class SolidityEvent extends SolidityContractItem {
  constructor(
    contract: SolidityContract,
    protected readonly astNode: solc.ast.EventDefinition,
  ) {
    super(contract, astNode);
  }
}

class SolidityModifier extends SolidityContractItem {
  constructor(
    contract: SolidityContract,
    protected readonly astNode: solc.ast.ModifierDefinition,
  ) {
    super(contract, astNode);
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

function isFunctionDefinition(node: solc.ast.ContractItem): node is solc.ast.FunctionDefinition {
  return node.nodeType === 'FunctionDefinition';
}

function isEventDefinition(node: solc.ast.ContractItem): node is solc.ast.EventDefinition {
  return node.nodeType === 'EventDefinition';
}

function isModifierDefinition(node: solc.ast.ContractItem): node is solc.ast.ModifierDefinition {
  return node.nodeType === 'ModifierDefinition';
}
