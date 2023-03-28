import * as Future from "fluture";
import Node from "./Node.js";
import * as format from "./format.js";
import * as Prelude from "./prelude.js";
const Prelude$1 = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  id: x => x,
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  match: type => type[Symbol.for("match")],
  not: b => !b,
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  reject: predicate => Prelude$1.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, id, map, match, not, reduce, reduceRight, reject} = Prelude$1;
const {StringLiteral, TemplateLiteral, MemberExpression, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, ObjectPattern, RestElement, ArrowFunctionExpression, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, CallExpression, ImportDeclaration, ImportSpecifier, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} = Node;
const never = _ => XXX;
const has = element => set => Prelude$1._apply("has")([element])(set);
const add = element => set => construct(Set)([[...set, element]]);
const union = this$ => that => construct(Set)([[...this$, ...that]]);
const nextUnusedIdent = names => desiredName => (() => {
  const recur = counter => (() => {
    const candidate = Object.is(0, counter) ? desiredName : `${desiredName}$${counter}`;
    return has(candidate)(names) ? recur(counter + 1) : Identifier(candidate);
  })();
  return recur(0);
})();
const namesInPattern = pattern => match(Node)(const_([]))({
  Identifier: Array.of,
  ArrayPattern: chain(namesInPattern),
  ObjectPattern: chain(namesInPattern),
  Property: const_(namesInPattern),
  RestElement: namesInPattern
});
const namesInStatement = match(Node)(const_([]))({
  ImportDeclaration: source => specifiers => Prelude$1.map(x => (x => x.name)((x => x.local)(x)))(specifiers),
  VariableDeclaration: pattern => expression => namesInPattern(pattern),
  FunctionDeclaration: name => parameters => body => [name]
});
const rewriteModule = ({imports, exports, statements}) => namesExportedFrom => Prelude$1.chain(imports$0027 => (names => (preludeIdent => (names$0027 => (rewrite => (preludeDefinition => (preludeDestructuring => Future.resolve(Module(imports$0027)(Prelude$1.map(rewrite)(exports))(Prelude$1.map(rewrite)([preludeDefinition, preludeDestructuring, ...statements]))))(VariableDeclaration(ObjectPattern(map(name => Property(StringLiteral(name))(Identifier(name)))(reject(flip(has)(names$0027))(Object.keys(Prelude)))))(preludeIdent)))(VariableDeclaration(preludeIdent)(ObjectExpression(map(([name, implementation]) => Property(StringLiteral(name))(implementation(preludeIdent)))(Object.entries(Prelude))))))(rewriteNode(preludeIdent)(names$0027)))(add(preludeIdent.name)(names)))(nextUnusedIdent(names)("Prelude")))(construct(Set)([Prelude$1.chain(namesInStatement)(Prelude$1.concat(imports$0027)(statements))])))(Future.parallel(16)(Prelude$1.map(rewriteImportDeclaration(namesExportedFrom))(imports)));
const rewriteImportAllDeclaration = namesExportedFrom => source => hiding => (() => {
  const namesExported = Prelude$1._apply("endsWith")([".serif"])(source.value) ? namesExportedFrom(source.value) : Prelude$1.map(Object.keys)(attemptP(() => import(source.value)));
  const namesHidden = Prelude$1.map(x => x.name)(hiding);
  const namesHiddenNeedlessly = reject(name => Prelude$1._apply("includes")([name])(namesExported))(namesHidden);
  return namesHiddenNeedlessly.length > 0 ? Future.reject(Error(`import * from "${source.value}" hiding {${Prelude$1._apply("join")([", "])(namesHidden)}};\n\n${format.list(namesHiddenNeedlessly)} ${Object.is(1, namesHiddenNeedlessly.length) ? "is" : "are"} not exported so need not be hidden.\n`)) : Future.resolve(ImportDeclaration(source)(map(name => ImportSpecifier(Identifier(name))(Identifier(name)))(reject(name => Prelude$1._apply("includes")([name])(namesHidden))(namesExported))));
})();
const rewriteImportDeclaration = namesExportedFrom => match(Node)(never)({
  ImportDeclaration: source => specifiers => Future.resolve(ImportDeclaration(source)(specifiers)),
  ImportAllDeclaration: rewriteImportAllDeclaration(namesExportedFrom)
});
const rewriteNode = preludeIdent => (() => {
  const recur = names => match(Node)(id)({
    TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(Prelude$1.map(recur(names))(expressions)),
    MemberExpression: object => property => MemberExpression(recur(names)(object))(recur(names)(property)),
    ArrayExpression: elements => ArrayExpression(Prelude$1.map(recur(names))(elements)),
    ObjectExpression: properties => ObjectExpression(Prelude$1.map(recur(names))(properties)),
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
        const names$0027 = union(names)(Prelude$1.chain(match(Node)(_ => [])({
          VariableDeclaration: pattern => expression => namesInPattern(pattern),
          FunctionDeclaration: name => parameters => body => [name]
        }))(statements));
        return BlockExpression(Prelude$1.map(recur(names$0027))(statements));
      })();
      return Object.is(1, statements.length) ? match(Node)(otherwise)({
        ExpressionStatement: recur(names)
      })(statements[0]) : otherwise(null);
    })(),
    DoBlockExpression: operations => result => recur(names)(reduceRight(result => match(Node)(never)({
      ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("chain")))([ArrowFunctionExpression([pattern])(result)]))([expression]),
      VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
      FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)])
    }))(result)(operations)),
    UnaryExpression: operator => argument => UnaryExpression(operator)(recur(names)(argument)),
    CompositionExpression: left => right => (() => {
      const param = nextUnusedIdent(names)("x");
      const names$0027 = add(param.name)(names);
      const toCallExpression = match(Node)(flip(CallExpression)([param]))({
        CompositionExpression: left => right => CallExpression(left)([toCallExpression(right)])
      });
      return recur(names$0027)(ArrowFunctionExpression([param])(toCallExpression(CompositionExpression(left)(right))));
    })(),
    BinaryExpression: operator => left => right => Object.is("is", operator) ? recur(names)(CallExpression(MemberExpression(Identifier("Object"))(StringLiteral("is")))([right, left])) : BinaryExpression(operator)(recur(names)(left))(recur(names)(right)),
    ConcatenationExpression: left => right => CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("concat")))([recur(names)(left)]))([recur(names)(right)]),
    MapExpression: left => right => CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("map")))([recur(names)(left)]))([recur(names)(right)]),
    BindExpression: left => right => CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("chain")))([recur(names)(right)]))([recur(names)(left)]),
    LogicalExpression: operator => left => right => LogicalExpression(operator)(recur(names)(left))(recur(names)(right)),
    ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(recur(names)(predicate))(recur(names)(consequent))(recur(names)(alternative)),
    SwitchExpression: discriminant => cases => default$ => SwitchExpression(recur(names)(discriminant))(Prelude$1.map(recur(names))(cases))(Object.is(null, default$) ? null : recur(names)(default$)),
    SwitchCase: predicates => consequent => SwitchCase(Prelude$1.map(recur(names))(predicates))(recur(names)(consequent)),
    PipeExpression: head => body => recur(names)(CallExpression(body)([head])),
    MethodCallExpression: name => recur(names)(CallExpression(MemberExpression(preludeIdent)(StringLiteral("_apply")))([StringLiteral(name)])),
    CallExpression: callee => arguments$ => CallExpression(recur(names)(callee))(Prelude$1.map(recur(names))(arguments$)),
    VariableDeclaration: pattern => expression => VariableDeclaration(recur(names)(pattern))(recur(names)(expression)),
    FunctionDeclaration: name => parameters => body => FunctionDeclaration(name)(Prelude$1.map(recur(names))(parameters))(recur(names)(body)),
    ExpressionStatement: expression => ExpressionStatement(recur(names)(expression)),
    ArrayPattern: elements => ArrayPattern(Prelude$1.map(recur(names))(elements)),
    ObjectPattern: properties => ObjectPattern(Prelude$1.map(recur(names))(properties)),
    SpreadElement: argument => SpreadElement(recur(names)(argument)),
    RestElement: argument => RestElement(recur(names)(argument)),
    Property: key => value => Property(recur(names)(key))(recur(names)(value)),
    ExportDefaultDeclaration: declaration => ExportDefaultDeclaration(recur(names)(declaration)),
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
