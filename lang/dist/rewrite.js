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
  _apply: name => args => target => target[name].apply(target, args),
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude$1;
const {StringLiteral, TemplateLiteral, MemberExpression, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, ObjectPattern, RestElement, ArrowFunctionExpression, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, CallExpression, ImportDeclaration, ImportSpecifier, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} = Node;
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
  BlockExpression: statements => (() => {
    const {declared, referenced} = mergeAll(Prelude$1.map(vars)(statements));
    return referencing(Set.without(declared)(referenced));
  })(),
  DoBlockExpression: operations => result => referencing(reduceRight(names => match(Node)({
    FunctionDeclaration: name => parameters => body => Set.without(referenced(mergeAll(Prelude$1.map(vars)(parameters))))(Set.union(names)(referenced(vars(body)))),
    VariableDeclaration: pattern => expression => Set.union(referenced(vars(expression)))(Set.without(referenced(vars(pattern)))(names)),
    ArrowAssignmentStatement: pattern => expression => Set.union(referenced(vars(expression)))(Set.without(referenced(vars(pattern)))(names))
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
const rewriteModule = module => namesExportedFrom => (({declared, referenced}) => (undeclared => Prelude$1.chain(imports => (module => (({declared, referenced}) => (unreferenced => (undeclared => (preludeIdent => (declared => (fromPrelude => (rewrite => (preludeEntries => (preludeNames => (_ => (preludeDefinition => (preludeDestructuring => Future.resolve(Module(module.imports)(Prelude$1.map(rewrite)(module.exports))(Prelude$1.map(rewrite)([preludeDefinition, preludeDestructuring, ...module.statements]))))(VariableDeclaration(ObjectPattern(Prelude$1.chain(name => Set.has(name)(declared) ? [] : [Property(StringLiteral(name))(Identifier(name))])(preludeNames)))(preludeIdent)))(VariableDeclaration(preludeIdent)(ObjectExpression(Prelude$1.map(([name, value]) => Property(StringLiteral(name))(value))(preludeEntries)))))((() => {
  const unreferenced$0027 = Set.sub(preludeIdent.name)(unreferenced);
  const undeclared$0027 = Set.without(Set.add("fetch")(Set.add("console")(Set.add("import")(Set.union(globals)(preludeNames)))))(undeclared);
  unreferenced$0027.size > 0 ? console.error(concat("unreferenced: ")(Prelude$1._apply("join")([", "])(Array.from(unreferenced$0027)))) : undefined;
  undeclared$0027.size > 0 ? console.error(concat("undeclared: ")(Prelude$1._apply("join")([", "])(Array.from(undeclared$0027)))) : undefined;
  return undefined;
})()))(Prelude$1.map(([name]) => name)(preludeEntries)))(Object.entries(Prelude(fromPrelude))))(rewriteNode(fromPrelude)(declared)))(x => MemberExpression(preludeIdent)(StringLiteral(x))))(Set.add(preludeIdent.name)(declared)))(nextUnusedIdent(declared)("Prelude")))(Set.without(declared)(referenced)))(Set.without(referenced)(declared)))(vars(module)))(Module(imports)(module.exports)(module.statements)))(Future.parallel(16)(Prelude$1.map(rewriteImportDeclaration(undeclared)(namesExportedFrom))(module.imports))))(Set.without(declared)(referenced)))(vars(module));
const rewriteImportAllDeclaration = undeclared => namesExportedFrom => source => hiding => (() => {
  const namesExported = Prelude$1._apply("endsWith")([".serif"])(source.value) ? namesExportedFrom(source.value) : Prelude$1.map(Object.keys)(Future.attemptP(() => import(source.value)));
  const namesHidden = Prelude$1.map(x => x.name)(hiding);
  const namesHiddenNeedlessly = reject(name => Prelude$1._apply("includes")([name])(namesExported))(namesHidden);
  return namesHiddenNeedlessly.length > 0 ? Future.reject(Error(`import * from "${source.value}" hiding {${Prelude$1._apply("join")([", "])(namesHidden)}};\n\n${format.list(namesHiddenNeedlessly)} ${Prelude$1.equals(1)(namesHiddenNeedlessly.length) ? "is" : "are"} not exported so need not be hidden.\n`)) : Future.resolve(ImportDeclaration(source)(map(name => ImportSpecifier(Identifier(name))(Identifier(name)))(reject(name => Prelude$1._apply("includes")([name])(namesHidden))(filter(flip(Set.has)(undeclared))(namesExported)))));
})();
const rewriteImportDeclaration = undeclared => namesExportedFrom => match(Node)({
  ImportDeclaration: source => specifiers => Future.resolve(ImportDeclaration(source)(specifiers)),
  ImportAllDeclaration: rewriteImportAllDeclaration(undeclared)(namesExportedFrom)
});
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
      const param = Identifier("x");
      const names$0027 = Set.add(param.name)(names);
      return recur(names$0027)(ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(identifier.name))));
    })(),
    BlockExpression: statements => Prelude$1.equals(1)(statements.length) ? match$0027(Node)(_ => BlockExpression(map(recur(Set.union(names)(declared(mergeAll(Prelude$1.map(vars)(statements))))))(statements)))({
      ExpressionStatement: recur(names)
    })(statements[0]) : BlockExpression(map(recur(Set.union(names)(declared(mergeAll(Prelude$1.map(vars)(statements))))))(statements)),
    DoBlockExpression: operations => result => recur(names)(reduceRight(result => match(Node)({
      ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(fromPrelude("chain"))([ArrowFunctionExpression([pattern])(result)]))([expression]),
      VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
      FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)])
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
    MethodCallExpression: name => recur(names)(CallExpression(fromPrelude("_apply"))([StringLiteral(name)])),
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
      const $0040tag = CallExpression(MemberExpression(Identifier("Symbol"))(StringLiteral("for")))([StringLiteral("tag")]);
      const $0040match = CallExpression(MemberExpression(Identifier("Symbol"))(StringLiteral("for")))([StringLiteral("match")]);
      return recur(names)(VariableDeclaration(Identifier(name))(ObjectExpression(concat([Property($0040match)((() => {
        const $0023default = Identifier("default");
        const $0023cases = Identifier("cases");
        const $0023member = Identifier(Prelude$1._apply("replace")([RegExp("^."), Prelude$1._apply("toLowerCase")([])])(name));
        const case$ = ({name, parameters}) => SwitchCase([Maybe.Just(StringLiteral(name))])(reduce(callee => name => CallExpression(callee)([MemberExpression($0023member)(StringLiteral(name))]))(MemberExpression($0023cases)(StringLiteral(name)))(parameters));
        return ArrowFunctionExpression([$0023default])(ArrowFunctionExpression([$0023cases])(ArrowFunctionExpression([$0023member])(ConditionalExpression(CallExpression(MemberExpression(Identifier("Object"))(StringLiteral("hasOwn")))([$0023cases, MemberExpression($0023member)($0040tag)]))(SwitchExpression(MemberExpression($0023member)($0040tag))(Prelude$1.map(case$)(constructors)))(Maybe.Just(CallExpression($0023default)([$0023member]))))));
      })())])(map(({name, parameters}) => Property(StringLiteral(name))(reduceRight(body => parameter => ArrowFunctionExpression([Identifier(parameter)])(body))(ObjectExpression(concat([Property($0040tag)(StringLiteral(name))])(map(name => Property(StringLiteral(name))(Identifier(name)))(parameters))))(parameters)))(constructors)))));
    })()
  });
  return recur;
})();
export default rewriteModule;
