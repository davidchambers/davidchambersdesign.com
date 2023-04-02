import * as Future from "fluture";
import Maybe from "./Maybe.js";
import Node from "./Node.js";
import * as Set from "./Set.js";
import * as format from "./format.js";
import globals from "./globals.js";
import Prelude from "./prelude.js";
const Prelude$1 = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude$1["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude$1.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude$1.filter(x => Prelude$1.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude$1;
const {StringLiteral, TemplateLiteral, MemberExpression, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, ObjectPattern, RestElement, ArrowFunctionExpression, BlockExpression, BlockStatement, UnaryExpression, CompositionExpression, BinaryExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, CallExpression, ImportDeclaration, ImportSpecifier, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} = Node;
const nextUnusedIdent = names => desiredName => (() => {
  const recur = counter => (() => {
    const candidate = Prelude$1.equals(0)(counter) ? desiredName : desiredName + "$" + counter;
    return Set.has(candidate)(names) ? recur(counter + 1) : Identifier(candidate);
  })();
  return recur(0);
})();
const variables = declared => referenced => ({
  declared,
  referenced
});
const declaring = names => variables(names)(Set.empty);
const referencing = names => variables(Set.empty)(names);
const empty = variables(Set.empty)(Set.empty);
const declared = x => x.declared;
const referenced = x => x.referenced;
const merge = lhs => rhs => ({
  declared: Set.union(lhs.declared)(rhs.declared),
  referenced: Set.union(lhs.referenced)(rhs.referenced)
});
const mergeAll = reduce(merge)(empty);
const foo = bar => baz;
const vars = match$0027(Node)(const$(empty))({
  TemplateLiteral: quasis => x => mergeAll(map(vars)(x)),
  MemberExpression: object => property => merge(vars(object))(vars(property)),
  Identifier: name => referencing(Set.of(name)),
  SpreadElement: argument => vars(argument),
  ArrayExpression: x => mergeAll(map(vars)(x)),
  Property: key => value => merge(vars(key))(vars(value)),
  ObjectExpression: properties => mergeAll(Prelude$1.map(vars)(properties)),
  ArrayPattern: elements => mergeAll(Prelude$1.map(vars)(elements)),
  ObjectPattern: properties => mergeAll(Prelude$1.map(vars)(properties)),
  RestElement: argument => vars(argument),
  ArrowFunctionExpression: parameters => body => referencing(Set.without(referenced(mergeAll(Prelude$1.map(vars)(parameters))))(referenced(vars(body)))),
  BlockExpression: statements => result => (() => {
    const {declared, referenced} = reduce(merge)(vars(result))(Prelude$1.map(vars)(statements));
    return referencing(Set.without(declared)(referenced));
  })(),
  BlockStatement: statements => (() => {
    const {declared, referenced} = mergeAll(Prelude$1.map(vars)(statements));
    return referencing(Set.without(declared)(referenced));
  })(),
  DoBlockExpression: operations => result => referencing(reduceRight(names => match(Node)({
    FunctionDeclaration: name => parameters => body => Set.without(referenced(mergeAll(Prelude$1.map(vars)(parameters))))(Set.union(names)(referenced(vars(body)))),
    VariableDeclaration: pattern => expression => Set.union(referenced(vars(expression)))(Set.without(referenced(vars(pattern)))(names)),
    ArrowAssignmentStatement: pattern => expression => Set.union(referenced(vars(expression)))(Set.without(referenced(vars(pattern)))(names)),
    ExpressionStatement: expression => Set.union(referenced(vars(expression)))(names)
  }))(referenced(vars(result)))(operations)),
  UnaryExpression: operator => vars,
  CompositionExpression: left => right => merge(vars(left))(vars(right)),
  InfixCallExpression: operator => left => right => merge(merge(vars(operator))(vars(left)))(vars(right)),
  BinaryExpression: operator => left => right => merge(vars(left))(vars(right)),
  ConcatenationExpression: left => right => merge(vars(left))(vars(right)),
  MapExpression: left => right => merge(vars(left))(vars(right)),
  BindExpression: left => right => merge(vars(left))(vars(right)),
  LogicalExpression: operator => left => right => merge(vars(left))(vars(right)),
  ConditionalExpression: predicate => consequent => alternative => merge(merge(vars(predicate))(vars(consequent)))(Maybe.maybe(empty)(vars)(alternative)),
  SwitchExpression: discriminant => cases => mergeAll(Prelude$1.map(vars)([discriminant, ...cases])),
  SwitchCase: predicates => consequent => mergeAll(Prelude$1.map(vars)([...predicates, consequent])),
  PipeExpression: head => body => merge(vars(head))(vars(body)),
  CallExpression: callee => arguments$ => mergeAll(Prelude$1.map(vars)([callee, ...arguments$])),
  ImportDeclaration: source => x => mergeAll(map(vars)(x)),
  ImportAllDeclaration: source => hiding => empty,
  ImportDefaultSpecifier: local => declaring(referenced(vars(local))),
  ImportSpecifier: local => imported => declaring(referenced(vars(local))),
  ImportNamespaceSpecifier: local => declaring(referenced(vars(local))),
  ExportNamedDeclaration: specifiers => mergeAll(Prelude$1.map(vars)(specifiers)),
  ExportDefaultDeclaration: declaration => vars(declaration),
  ExportSpecifier: local => exported => vars(local),
  VariableDeclaration: pattern => expression => variables(referenced(vars(pattern)))(referenced(vars(expression))),
  FunctionDeclaration: name => parameters => body => (() => {
    const names = Set.add(name)(referenced(mergeAll(Prelude$1.map(vars)(parameters))));
    return variables(Set.of(name))(Set.without(names)(referenced(vars(body))));
  })(),
  ExpressionStatement: expression => vars(expression),
  Module: imports => exports => statements => mergeAll(Prelude$1.map(vars)(Prelude$1.concat(imports)(Prelude$1.concat(exports)(statements)))),
  DataTypeDeclaration: name => constructors => declaring(Set.of(name))
});
const rewriteModule = module => namesExportedFrom => (() => {
  const {declared, referenced} = vars(module);
  const undeclared = Set.without(declared)(referenced);
  const imports = Future.parallel(16)(Prelude$1.map(rewriteImportDeclaration(undeclared)(namesExportedFrom))(module.imports));
  const withImports = module => (() => {
    const {declared, referenced} = vars(module);
    const preludeIdent = nextUnusedIdent(declared)("Prelude");
    const declared$0027 = Set.add(preludeIdent.name)(declared);
    const fromPrelude = x => MemberExpression(preludeIdent)(StringLiteral(x));
    const rewrite = rewriteNode(fromPrelude)(declared$0027);
    const preludeEntries = Object.entries(Prelude(fromPrelude));
    const preludeNames = Prelude$1.map(([name]) => name)(preludeEntries);
    const unreferenced = Set.sub(preludeIdent.name)(Set.without(referenced)(declared));
    const undeclared = Set.without(Set.from(["import", "console", "fetch"]))(Set.without(globals)(Set.without(Set.from(preludeNames))(Set.without(declared)(referenced))));
    unreferenced.size > 0 ? console.error(concat("unreferenced: ")((args => target => target.join.apply(target, args))([", "])(Array.from(unreferenced)))) : undefined;
    undeclared.size > 0 ? console.error(concat("undeclared: ")((args => target => target.join.apply(target, args))([", "])(Array.from(undeclared)))) : undefined;
    const preludeDefinition = VariableDeclaration(preludeIdent)(ObjectExpression(Prelude$1.map(([name, value]) => Property(StringLiteral(name))(value))(preludeEntries)));
    const preludeDestructuring = VariableDeclaration(ObjectPattern(Prelude$1.chain(name => Set.has(name)(declared$0027) ? [] : [Property(StringLiteral(name))(Identifier(name))])(preludeNames)))(preludeIdent);
    return Module(module.imports)(Prelude$1.map(rewrite)(module.exports))(Prelude$1.map(rewrite)([preludeDefinition, preludeDestructuring, ...module.statements]));
  })();
  return Prelude$1.map(imports => withImports(Module(imports)(module.exports)(module.statements)))(imports);
})();
const rewriteImportAllDeclaration = undeclared => namesExportedFrom => source => hiding => (() => {
  const namesExported = (args => target => target.endsWith.apply(target, args))([".serif"])(source.value) ? namesExportedFrom(source.value) : Prelude$1.map(Object.keys)(Future.attemptP(() => import(source.value)));
  const namesHidden = Prelude$1.map(x => x.name)(hiding);
  const namesHiddenNeedlessly = reject(name => (args => target => target.includes.apply(target, args))([name])(namesExported))(namesHidden);
  return namesHiddenNeedlessly.length > 0 ? Future.reject(Error(`import * from "${source.value}" hiding {${(args => target => target.join.apply(target, args))([", "])(namesHidden)}};\n\n${format.list(namesHiddenNeedlessly)} ${Prelude$1.equals(1)(namesHiddenNeedlessly.length) ? "is" : "are"} not exported so need not be hidden.\n`)) : Future.resolve(ImportDeclaration(source)(map(name => ImportSpecifier(Identifier(name))(Identifier(name)))(reject(name => (args => target => target.includes.apply(target, args))([name])(namesHidden))(filter(flip(Set.has)(undeclared))(namesExported)))));
})();
const rewriteImportDeclaration = undeclared => namesExportedFrom => match(Node)({
  ImportDeclaration: source => specifiers => Future.resolve(ImportDeclaration(source)(specifiers)),
  ImportAllDeclaration: rewriteImportAllDeclaration(undeclared)(namesExportedFrom)
});
const $0023Object = Identifier("Object");
const $0023Symbol = Identifier("Symbol");
const $0023args = Identifier("args");
const $0023cases = Identifier("cases");
const $0023default = Identifier("default");
const $0023target = Identifier("target");
const $0023x = Identifier("x");
const $0027apply = StringLiteral("apply");
const $0027for = StringLiteral("for");
const $0027hasOwn = StringLiteral("hasOwn");
const $0027match = StringLiteral("match");
const $0027tag = StringLiteral("tag");
const rewriteNode = fromPrelude => (() => {
  const recur = names => match$0027(Node)(id)({
    TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(Prelude$1.map(recur(names))(expressions)),
    MemberExpression: object => property => MemberExpression(recur(names)(object))(recur(names)(property)),
    ArrayExpression: x => ArrayExpression(map(recur(names))(x)),
    ObjectExpression: x => ObjectExpression(map(recur(names))(x)),
    ArrowFunctionExpression: parameters => body => (() => {
      const params = Prelude$1.map(recur(names))(parameters);
      const names$0027 = Set.union(names)(Prelude$1.map(x => x.name)(params));
      return ArrowFunctionExpression(params)(recur(names$0027)(body));
    })(),
    PropertyAccessor: identifier => (() => {
      const param = $0023x;
      const names$0027 = Set.add(param.name)(names);
      return recur(names$0027)(ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(identifier.name))));
    })(),
    BlockExpression: statements => result => Prelude$1.equals([])(statements) ? recur(names)(result) : (() => {
      const names$0027 = Set.union(names)(declared(mergeAll(Prelude$1.map(vars)(statements))));
      return BlockExpression(Prelude$1.map(recur(names$0027))(statements))(recur(names$0027)(result));
    })(),
    BlockStatement: statements => (() => {
      const names$0027 = Set.union(names)(declared(mergeAll(Prelude$1.map(vars)(statements))));
      return BlockStatement(Prelude$1.map(recur(names$0027))(statements));
    })(),
    DoBlockExpression: operations => result => recur(names)(reduceRight(result => match(Node)({
      ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(fromPrelude("chain"))([ArrowFunctionExpression([pattern])(result)]))([expression]),
      VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
      FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)]),
      ExpressionStatement: expression => BlockExpression([ExpressionStatement(expression)])(result)
    }))(result)(operations)),
    UnaryExpression: operator => argument => UnaryExpression(operator)(recur(names)(argument)),
    CompositionExpression: left => right => (() => {
      const param = nextUnusedIdent(names)("x");
      const names$0027 = Set.add(param.name)(names);
      const toCallExpression = node => match$0027(Node)(flip(CallExpression)([param]))({
        CompositionExpression: left => right => CallExpression(left)([toCallExpression(right)])
      })(node);
      return recur(names$0027)(ArrowFunctionExpression([param])(toCallExpression(CompositionExpression(left)(right))));
    })(),
    InfixCallExpression: operator => left => right => recur(names)(CallExpression(CallExpression(operator)([left]))([right])),
    BinaryExpression: operator => left => right => (() => {
      switch (operator) {
        case "==":
          return recur(names)(CallExpression(CallExpression(fromPrelude("equals"))([right]))([left]));
        case "!=":
          return recur(names)(CallExpression(fromPrelude("not"))([BinaryExpression("==")(left)(right)]));
        default:
          return BinaryExpression(operator)(recur(names)(left))(recur(names)(right));
      }
    })(),
    ConcatenationExpression: left => right => recur(names)(CallExpression(CallExpression(fromPrelude("concat"))([left]))([right])),
    MapExpression: left => right => recur(names)(CallExpression(CallExpression(fromPrelude("map"))([left]))([right])),
    BindExpression: left => right => recur(names)(CallExpression(CallExpression(fromPrelude("chain"))([right]))([left])),
    LogicalExpression: operator => left => right => LogicalExpression(operator)(recur(names)(left))(recur(names)(right)),
    ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(recur(names)(predicate))(recur(names)(consequent))(Prelude$1.map(recur(names))(alternative)),
    SwitchExpression: discriminant => cases => SwitchExpression(recur(names)(discriminant))(Prelude$1.map(recur(names))(cases)),
    SwitchCase: predicates => consequent => SwitchCase(map(map(recur(names)))(predicates))(recur(names)(consequent)),
    PipeExpression: head => body => recur(names)(CallExpression(body)([head])),
    MethodCallExpression: name => recur(names)(ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression(MemberExpression($0023target)(StringLiteral(name)))($0027apply))([$0023target, $0023args])))),
    CallExpression: callee => arguments$ => CallExpression(recur(names)(callee))(Prelude$1.map(recur(names))(arguments$)),
    VariableDeclaration: pattern => expression => VariableDeclaration(recur(names)(pattern))(recur(names)(expression)),
    FunctionDeclaration: name => parameters => body => FunctionDeclaration(name)(Prelude$1.map(recur(names))(parameters))(recur(names)(body)),
    ExpressionStatement: x => ExpressionStatement(recur(names)(x)),
    ArrayPattern: x => ArrayPattern(map(recur(names))(x)),
    ObjectPattern: x => ObjectPattern(map(recur(names))(x)),
    SpreadElement: x => SpreadElement(recur(names)(x)),
    RestElement: x => RestElement(recur(names)(x)),
    Property: key => value => Property(recur(names)(key))(recur(names)(value)),
    ExportDefaultDeclaration: x => ExportDefaultDeclaration(recur(names)(x)),
    DataTypeDeclaration: name => constructors => (() => {
      const $0040tag = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027tag]);
      const $0040match = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027match]);
      return recur(names)(VariableDeclaration(Identifier(name))(ObjectExpression(concat([Property($0040match)((() => {
        const $0023member = Identifier((args => target => target.replace.apply(target, args))([RegExp("^."), (args => target => target.toLowerCase.apply(target, args))([])])(name));
        const case$ = ({name, parameters}) => SwitchCase([Maybe.Just(StringLiteral(name))])(reduce(callee => name => CallExpression(callee)([MemberExpression($0023member)(StringLiteral(name))]))(MemberExpression($0023cases)(StringLiteral(name)))(parameters));
        return ArrowFunctionExpression([$0023default])(ArrowFunctionExpression([$0023cases])(ArrowFunctionExpression([$0023member])(ConditionalExpression(CallExpression(MemberExpression($0023Object)($0027hasOwn))([$0023cases, MemberExpression($0023member)($0040tag)]))(SwitchExpression(MemberExpression($0023member)($0040tag))(Prelude$1.map(case$)(constructors)))(Maybe.Just(CallExpression($0023default)([$0023member]))))));
      })())])(map(({name, parameters}) => Property(StringLiteral(name))(reduceRight(body => parameter => ArrowFunctionExpression([Identifier(parameter)])(body))(ObjectExpression(concat([Property($0040tag)(StringLiteral(name))])(map(name => Property(StringLiteral(name))(Identifier(name)))(parameters))))(parameters)))(constructors)))));
    })()
  });
  return recur;
})();
export default rewriteModule;
