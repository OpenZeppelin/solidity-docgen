import { flatten, uniqBy, groupBy, defaults } from 'lodash';
import path from 'path';
import { memoize } from './memoize';

type ContractTemplate = (contract: SourceContract) => string;

import { slug } from './handlebars';
import { SolcOutput, ast } from './solc';

export class Source {
  constructor(
    private readonly contractsDir: string,
    private readonly solcOutput: SolcOutput,
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

  fileById(id: number): SourceFile {
    const file = this.files.find(f => f.astId === id);

    if (file === undefined) {
      throw new Error(`File with id ${id} not found`);
    }

    return file;
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
    readonly source: Source,
    readonly ast: ast.SourceUnit,
    readonly path: string,
  ) { }

  @memoize
  get contracts(): SourceContract[] {
    const astNodes = this.ast.nodes.filter(isContractDefinition);

    return astNodes.map(node => 
      new SourceContract(this.source, this, node)
    );
  }

  @memoize
  get contractsInScope(): Record<string, SourceContract> {
    return contractsInScope(this);
  }

  get astId(): number {
    return this.ast.id;
  }
}

function contractsInScope(
  file: SourceFile,
  stack = new Set<SourceFile>(),
  aliasedImport = false,
): Record<string, SourceContract> {
  if (stack.has(file)) {
    if (aliasedImport) {
      throw new Error('Circular dependency detected: aliased imports not supported');
    } else {
      return {};
    }
  }

  stack.add(file);

  const scope: Record<string, SourceContract> = {};

  for (const c of file.contracts) {
    scope[c.name] = c;
  }

  const imports = file.ast.nodes.filter(isImportDirective);
  for (const i of imports) {
    const importedFile = file.source.fileById(i.sourceUnit);
    const importedScope = contractsInScope(importedFile, stack, aliasedImport || i.symbolAliases.length > 0);
    if (i.symbolAliases.length === 0) {
      Object.assign(scope, importedScope);
    } else {
      for (const a of i.symbolAliases) {
        scope[a.local ?? a.foreign.name] = importedScope[a.foreign.name];
      }
    }
  };

  stack.delete(file);

  return scope;
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
    private readonly astNode: ast.ContractDefinition,
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
    return [
      this,
      ...this.ownModifiers,
      ...this.ownVariables,
      ...this.ownFunctions,
      ...this.ownEvents,
      ...this.ownStructs,
      ...this.ownEnums,
    ];
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

  @memoize
  get privateFunctions(): SourceFunction[] {
    return this.astNode.nodes
      .filter(isFunctionDefinition)
      .filter(n => n.visibility === 'private')
      .map(n => new SourceFunction(this, n));
  }

  get inheritedItems(): InheritedItems[] {
    const variables = groupBy(this.variables, f => f.contract.astId);
    const functions = groupBy(this.functions, f => f.contract.astId);
    const events = groupBy(this.events, f => f.contract.astId);
    const modifiers = groupBy(this.modifiers, f => f.contract.astId);
    const structs = groupBy(this.structs, f => f.contract.astId);
    const enums = groupBy(this.enums, f => f.contract.astId);

    return this.inheritance.map(contract => ({
      contract,
      variables: variables[contract.astId],
      functions: functions[contract.astId],
      events: events[contract.astId],
      modifiers: modifiers[contract.astId],
      structs: structs[contract.astId],
      enums: enums[contract.astId],
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

  get structs(): SourceStruct[] {
    return flatten(this.inheritance.map(c => c.ownStructs));
  }

  @memoize
  get ownStructs(): SourceStruct[] {
    return this.astNode.nodes
      .filter(isStructDefinition)
      .map(n => new SourceStruct(this, n))
  }

  get enums(): SourceEnum[] {
    return flatten(this.inheritance.map(c => c.ownEnums));
  }

  @memoize
  get ownEnums(): SourceEnum[] {
    return this.astNode.nodes
      .filter(isEnumDefinition)
      .map(n => new SourceEnum(this, n))
  }

  @memoize
  get natspec(): NatSpec {
    if (this.astNode.documentation === null || this.astNode.documentation === undefined) {
      return {};
    }

    return parseNatSpec(this.astNode.documentation, this);
  }

  get astId(): number {
    return this.astNode.id;
  }
}

abstract class SourceContractItem implements Linkable {
  protected abstract astNode: Exclude<ast.ContractItem, ast.VariableDeclaration>;

  constructor(
    readonly contract: SourceContract,
  ) { }

  get name(): string {
    return this.astNode.name;
  }

  get fullName(): string {
    return `${this.contract.name}.${this.name}`;
  }

  get anchor(): string {
    return `${this.contract.name}-${this.name}`;
  }
}

abstract class SourceFunctionLike extends SourceContractItem {
  protected abstract astNode: ast.FunctionDefinition | ast.ModifierDefinition | ast.EventDefinition;

  constructor(
    readonly contract: SourceContract,
  ) {
    super(contract);
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

  @memoize
  get natspec(): NatSpec {
    if (this.astNode.documentation === null || this.astNode.documentation === undefined) {
      return {};
    }

    return parseNatSpec(this.astNode.documentation, this);
  }
}

class SourceStateVariable implements Linkable {
  constructor(
    readonly contract: SourceContract,
    protected readonly astNode: ast.VariableDeclaration,
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

class SourceStructVariable {
  constructor(
    readonly struct: SourceStruct,
    protected readonly astNode: ast.VariableDeclaration,
  ) { }

  get name(): string {
    return this.astNode.name;
  }

  get type(): string {
    return this.astNode.typeName.typeDescriptions.typeString;
  }
}

class SourceFunction extends SourceFunctionLike {
  constructor(
    contract: SourceContract,
    protected readonly astNode: ast.FunctionDefinition,
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

class SourceEvent extends SourceFunctionLike {
  constructor(
    contract: SourceContract,
    protected readonly astNode: ast.EventDefinition,
  ) {
    super(contract);
  }
}

class SourceModifier extends SourceFunctionLike {
  constructor(
    contract: SourceContract,
    protected readonly astNode: ast.ModifierDefinition,
  ) {
    super(contract);
  }
}

class SourceStruct extends SourceContractItem {
  constructor(
    contract: SourceContract,
    protected readonly astNode: ast.StructDefinition,
  ) {
    super(contract);
  }

  @memoize
  get members(): SourceStructVariable[] {
    return this.astNode.members.map(m => new SourceStructVariable(this, m));
  }

  get natspec(): {} {
    warnStateVariableNatspec();
    return {}
  }
}

class SourceEnum extends SourceContractItem {
  constructor(
    contract: SourceContract,
    protected readonly astNode: ast.EnumDefinition,
  ) {
    super(contract);
  }

  @memoize
  get members(): string[] {
    return this.astNode.members.map(m => m.name);
  }

  get natspec(): {} {
    warnStateVariableNatspec();
    return {}
  }
}

class SourceTypedVariable {
  constructor(
    private readonly typeNode: ast.TypeName,
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
  structs: SourceStruct[];
  enums: SourceEnum[];
}

class PrettyArray<T extends ToString> extends Array<T> {
  toString() {
    return this.map(e => e.toString()).join(', ');
  }
}

class SourceTypedVariableArray extends PrettyArray<SourceTypedVariable> {
  static fromParameterList(parameters: ast.ParameterList): SourceTypedVariable[] {
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
  custom?: {
    [tag: string]: string;
  };
}

function parseNatSpec(doc: string, context: SourceFunctionLike | SourceContract): NatSpec {
  const res: NatSpec = {};

  const tagMatches = execall(/^(?:@(\w+|custom:[a-z][a-z-]*) )?((?:(?!^@(?:\w+|custom:[a-z][a-z-]*) )[^])*)/m, doc);

  let inheritFrom: SourceFunction | undefined;

  for (const [, tag, content] of tagMatches) {
    if (tag === 'dev') {
      res.devdoc ??= '';
      res.devdoc += content;
    }
    if (tag === 'notice' || tag === undefined) {
      res.userdoc ??= '';
      res.userdoc += content;
    }
    if (tag === 'title') {
      res.title = content;
    }
    if (tag === 'param') {
      const paramMatches = content.match(/(\w+) ([^]*)/);
      if (paramMatches) {
        const [, param, description] = paramMatches;
        res.params ??= [];
        res.params.push({ param, description });
      }
    }
    if (tag === 'return') {
      const paramMatches = content.match(/(\w+) ([^]*)/);
      if (paramMatches) {
        const [, param, description] = paramMatches;
        res.returns ??= [];
        res.returns.push({ param, description });
      }
    }
    if (tag === 'inheritdoc') {
      if (!(context instanceof SourceFunction)) {
        throw new Error('@inheritdoc only supported in functions');
      }
      const parentContract = context.contract.file.contractsInScope[content.trim()];
      inheritFrom = parentContract.functions.find(f => f.name === context.name);
    }
    if (tag?.startsWith('custom:')) {
      const key = tag.replace(/^custom:/, '');
      res.custom ??= {};
      res.custom[key] ??= '';
      res.custom[key] += content;
    }
  }

  if (inheritFrom) {
    defaults(res, inheritFrom.natspec);
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

interface ToString {
  toString(): string;
}

function isVariableDeclaration(node: ast.ContractItem): node is ast.VariableDeclaration {
  return node.nodeType === 'VariableDeclaration';
}

function isFunctionDefinition(node: ast.ContractItem): node is ast.FunctionDefinition {
  return node.nodeType === 'FunctionDefinition';
}

function isEventDefinition(node: ast.ContractItem): node is ast.EventDefinition {
  return node.nodeType === 'EventDefinition';
}

function isModifierDefinition(node: ast.ContractItem): node is ast.ModifierDefinition {
  return node.nodeType === 'ModifierDefinition';
}

function isStructDefinition(node: ast.ContractItem): node is ast.StructDefinition {
  return node.nodeType == 'StructDefinition';
}

function isEnumDefinition(node: ast.ContractItem): node is ast.EnumDefinition {
  return node.nodeType == 'EnumDefinition';
}

function isContractDefinition(node: ast.SourceItem): node is ast.ContractDefinition {
  return node.nodeType === 'ContractDefinition';
}

function isImportDirective(node: ast.SourceItem): node is ast.ImportDirective {
  return node.nodeType === 'ImportDirective';
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

const warnStateVariableNatspec = oneTimeLogger('Warning: NatSpec is currently not available for state variables, structs, or enums.');
