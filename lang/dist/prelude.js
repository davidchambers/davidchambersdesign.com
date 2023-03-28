import Node from "./Node.js";
const Prelude$1 = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude$1["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude$1.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude$1;
const {ArrowFunctionExpression, BinaryExpression, CallExpression, ConditionalExpression, Identifier, LogicalExpression, MemberExpression, StringLiteral, UnaryExpression} = Node;
const isArray = name => CallExpression(MemberExpression(Identifier("Array"))(StringLiteral("isArray")))([Identifier(name)]);
const isString = name => BinaryExpression("is")(UnaryExpression("typeof")(Identifier(name)))(StringLiteral("string"));
const Prelude = {
  _apply: preludeIdent => ArrowFunctionExpression([Identifier("name")])(ArrowFunctionExpression([Identifier("args")])(ArrowFunctionExpression([Identifier("target")])(CallExpression(MemberExpression(MemberExpression(Identifier("target"))(Identifier("name")))(StringLiteral("apply")))([Identifier("target"), Identifier("args")])))),
  apply: preludeIdent => ArrowFunctionExpression([Identifier("args")])(ArrowFunctionExpression([Identifier("target")])(CallExpression(MemberExpression(Identifier("target"))(StringLiteral("apply")))([Identifier("target"), Identifier("args")]))),
  construct: preludeIdent => ArrowFunctionExpression([Identifier("constructor")])(ArrowFunctionExpression([Identifier("args")])(CallExpression(MemberExpression(Identifier("Reflect"))(StringLiteral("construct")))([Identifier("constructor"), Identifier("args")]))),
  match: preludeIdent => ArrowFunctionExpression([Identifier("type")])(CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("match'")))([Identifier("type")]))([ArrowFunctionExpression([Identifier("_")])(Identifier("CasesNotExhaustive"))])),
  ["match'"]: preludeIdent => ArrowFunctionExpression([Identifier("type")])(MemberExpression(Identifier("type"))(CallExpression(MemberExpression(Identifier("Symbol"))(StringLiteral("for")))([StringLiteral("match")]))),
  id: preludeIdent => ArrowFunctionExpression([Identifier("x")])(Identifier("x")),
  const: preludeIdent => ArrowFunctionExpression([Identifier("x")])(ArrowFunctionExpression([Identifier("y")])(Identifier("x"))),
  not: preludeIdent => ArrowFunctionExpression([Identifier("b")])(UnaryExpression("!")(Identifier("b"))),
  concat: preludeIdent => ArrowFunctionExpression([Identifier("this")])(ArrowFunctionExpression([Identifier("that")])(ConditionalExpression(LogicalExpression("or")(isArray("this"))(isString("this")))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("concat")))([Identifier("that")]))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("fantasy-land/concat")))([Identifier("that")])))),
  reduce: preludeIdent => ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("foldable")])(CallExpression(MemberExpression(Identifier("foldable"))(ConditionalExpression(isArray("foldable"))(StringLiteral("reduce"))(StringLiteral("fantasy-land/reduce"))))([ArrowFunctionExpression([Identifier("y"), Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("y")]))([Identifier("x")])), Identifier("y")])))),
  reduceRight: preludeIdent => ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("foldable")])(CallExpression(MemberExpression(Identifier("foldable"))(StringLiteral("reduceRight")))([ArrowFunctionExpression([Identifier("y"), Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("y")]))([Identifier("x")])), Identifier("y")])))),
  filter: preludeIdent => ArrowFunctionExpression([Identifier("predicate")])(ArrowFunctionExpression([Identifier("filterable")])(ConditionalExpression(isArray("filterable"))(CallExpression(MemberExpression(Identifier("filterable"))(StringLiteral("filter")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("predicate"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("filterable"))(StringLiteral("fantasy-land/filter")))([Identifier("predicate")])))),
  reject: preludeIdent => ArrowFunctionExpression([Identifier("predicate")])(CallExpression(MemberExpression(preludeIdent)(StringLiteral("filter")))([ArrowFunctionExpression([Identifier("x")])(UnaryExpression("!")(CallExpression(Identifier("predicate"))([Identifier("x")])))])),
  map: preludeIdent => ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("functor")])(ConditionalExpression(isArray("functor"))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("map")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("fantasy-land/map")))([Identifier("f")])))),
  flip: preludeIdent => ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("x")]))([Identifier("y")])))),
  chain: preludeIdent => ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("chain")])(ConditionalExpression(isArray("chain"))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("flatMap")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("fantasy-land/chain")))([Identifier("f")]))))
};
export default Prelude;
