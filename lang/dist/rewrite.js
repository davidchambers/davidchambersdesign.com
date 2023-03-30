import * as Future from "fluture";
import Node from "./Node.js";
import * as format from "./format.js";
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
  apply: args => target => target.apply(target, args),
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
const has = element => set => Prelude$1._apply("has")([element])(set);
const add = element => set => construct(Set)([[...set, element]]);
const union = this$ => that => construct(Set)([[...this$, ...that]]);
const nextUnusedIdent = names => desiredName => (() => {
  const recur = counter => (() => {
    const candidate = Prelude$1.equals(0)(counter) ? desiredName : desiredName + "$" + counter;
    return has(candidate)(names) ? recur(counter + 1) : Identifier(candidate);
  })();
  return recur(0);
})();
const namesInPattern = match$0027(Node)(const$([]))({
  Identifier: name => [name],
  ArrayPattern: elements => Prelude$1.chain(namesInPattern)(elements),
  ObjectPattern: properties => Prelude$1.chain(namesInPattern)(properties),
  Property: key => value => namesInPattern(value),
  RestElement: argument => namesInPattern(argument)
});
const namesInStatement = match$0027(Node)(const$([]))({
  ImportDeclaration: source => specifiers => Prelude$1.map(x => (x => x.name)((x => x.local)(x)))(specifiers),
  VariableDeclaration: pattern => expression => namesInPattern(pattern),
  FunctionDeclaration: name => parameters => body => [name]
});
const rewriteModule = ({imports, exports, statements}) => namesExportedFrom => Prelude$1.chain(imports$0027 => (names => (preludeIdent => (names$0027 => (fromPrelude => (rewrite => (preludeEntries => (preludeDefinition => (preludeDestructuring => Future.resolve(Module(imports$0027)(Prelude$1.map(rewrite)(exports))(Prelude$1.map(rewrite)([preludeDefinition, preludeDestructuring, ...statements]))))(VariableDeclaration(ObjectPattern(Prelude$1.chain(([name]) => has(name)(names$0027) ? [] : [Property(StringLiteral(name))(Identifier(name))])(preludeEntries)))(preludeIdent)))(VariableDeclaration(preludeIdent)(ObjectExpression(Prelude$1.map(([name, value]) => Property(StringLiteral(name))(value))(preludeEntries)))))(Object.entries(Prelude(fromPrelude))))(rewriteNode(fromPrelude)(names$0027)))(x => MemberExpression(preludeIdent)(StringLiteral(x))))(add(preludeIdent.name)(names)))(nextUnusedIdent(names)("Prelude")))(construct(Set)([Prelude$1.chain(namesInStatement)(Prelude$1.concat(imports$0027)(statements))])))(Future.parallel(16)(Prelude$1.map(rewriteImportDeclaration(namesExportedFrom))(imports)));
const rewriteImportAllDeclaration = namesExportedFrom => source => hiding => (() => {
  const namesExported = Prelude$1._apply("endsWith")([".serif"])(source.value) ? namesExportedFrom(source.value) : Prelude$1.map(Object.keys)(attemptP(() => import(source.value)));
  const namesHidden = Prelude$1.map(x => x.name)(hiding);
  const namesHiddenNeedlessly = reject(name => Prelude$1._apply("includes")([name])(namesExported))(namesHidden);
  return namesHiddenNeedlessly.length > 0 ? Future.reject(Error(`import * from "${source.value}" hiding {${Prelude$1._apply("join")([", "])(namesHidden)}};\n\n${format.list(namesHiddenNeedlessly)} ${Prelude$1.equals(1)(namesHiddenNeedlessly.length) ? "is" : "are"} not exported so need not be hidden.\n`)) : Future.resolve(ImportDeclaration(source)(map(name => ImportSpecifier(Identifier(name))(Identifier(name)))(reject(name => Prelude$1._apply("includes")([name])(namesHidden))(namesExported))));
})();
const rewriteImportDeclaration = namesExportedFrom => match(Node)({
  ImportDeclaration: source => specifiers => Future.resolve(ImportDeclaration(source)(specifiers)),
  ImportAllDeclaration: rewriteImportAllDeclaration(namesExportedFrom)
});
const rewriteNode = fromPrelude => (() => {
  const recur = names => match$0027(Node)(id)({
    TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(Prelude$1.map(recur(names))(expressions)),
    MemberExpression: object => property => MemberExpression(recur(names)(object))(recur(names)(property)),
    ArrayExpression: x => ArrayExpression(map(recur(names))(x)),
    ObjectExpression: x => ObjectExpression(map(recur(names))(x)),
    ArrowFunctionExpression: parameters => body => (() => {
      const params = Prelude$1.map(recur(names))(parameters);
      const names$0027 = union(names)(Prelude$1.map(x => x.name)(params));
      return ArrowFunctionExpression(params)(recur(names$0027)(body));
    })(),
    PropertyAccessor: identifier => (() => {
      const param = Identifier("x");
      const names$0027 = add(param.name)(names);
      return recur(names$0027)(ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(identifier.name))));
    })(),
    BlockExpression: statements => (() => {
      const otherwise = _ => (() => {
        const names$0027 = union(names)(Prelude$1.chain(match$0027(Node)(const$([]))({
          VariableDeclaration: pattern => expression => namesInPattern(pattern),
          FunctionDeclaration: name => parameters => body => [name]
        }))(statements));
        return BlockExpression(Prelude$1.map(recur(names$0027))(statements));
      })();
      return Prelude$1.equals(1)(statements.length) ? match$0027(Node)(otherwise)({
        ExpressionStatement: recur(names)
      })(statements[0]) : otherwise(null);
    })(),
    DoBlockExpression: operations => result => recur(names)(reduceRight(result => match(Node)({
      ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(fromPrelude("chain"))([ArrowFunctionExpression([pattern])(result)]))([expression]),
      VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
      FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)])
    }))(result)(operations)),
    UnaryExpression: operator => argument => UnaryExpression(operator)(recur(names)(argument)),
    CompositionExpression: left => right => (() => {
      const param = nextUnusedIdent(names)("x");
      const names$0027 = add(param.name)(names);
      const toCallExpression = match$0027(Node)(flip(CallExpression)([param]))({
        CompositionExpression: left => right => CallExpression(left)([toCallExpression(right)])
      });
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
    ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(recur(names)(predicate))(recur(names)(consequent))(recur(names)(alternative)),
    SwitchExpression: discriminant => cases => default$ => SwitchExpression(recur(names)(discriminant))(Prelude$1.map(recur(names))(cases))(Prelude$1.equals(null)(default$) ? null : recur(names)(default$)),
    SwitchCase: predicates => consequent => SwitchCase(Prelude$1.map(recur(names))(predicates))(recur(names)(consequent)),
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
        const case$ = ({name, parameters}) => SwitchCase([StringLiteral(name)])(reduce(callee => name => CallExpression(callee)([MemberExpression($0023member)(StringLiteral(name))]))(MemberExpression($0023cases)(StringLiteral(name)))(parameters));
        return ArrowFunctionExpression([$0023default])(ArrowFunctionExpression([$0023cases])(ArrowFunctionExpression([$0023member])(ConditionalExpression(CallExpression(MemberExpression(Identifier("Object"))(StringLiteral("hasOwn")))([$0023cases, MemberExpression($0023member)($0040tag)]))(SwitchExpression(MemberExpression($0023member)($0040tag))(Prelude$1.map(case$)(constructors))(null))(CallExpression($0023default)([$0023member])))));
      })())])(map(({name, parameters}) => Property(StringLiteral(name))(reduceRight(body => parameter => ArrowFunctionExpression([Identifier(parameter)])(body))(ObjectExpression(concat([Property($0040tag)(StringLiteral(name))])(map(name => Property(StringLiteral(name))(Identifier(name)))(parameters))))(parameters)))(constructors)))));
    })()
  });
  return recur;
})();
export default rewriteModule;
