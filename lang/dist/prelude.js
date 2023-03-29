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
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude$1.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude$1.filter(x => Prelude$1.not(predicate(x))),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude$1;
const {ArrowFunctionExpression, BinaryExpression, CallExpression, CompositionExpression, ConditionalExpression, Identifier, LogicalExpression, MemberExpression, StringLiteral, UnaryExpression} = Node;
const isArray = name => CallExpression(MemberExpression(Identifier("Array"))(StringLiteral("isArray")))([Identifier(name)]);
const isString = name => BinaryExpression("===")(UnaryExpression("typeof")(Identifier(name)))(StringLiteral("string"));
const Prelude = fromPrelude => ({
  _apply: ArrowFunctionExpression([Identifier("name")])(ArrowFunctionExpression([Identifier("args")])(ArrowFunctionExpression([Identifier("target")])(CallExpression(MemberExpression(MemberExpression(Identifier("target"))(Identifier("name")))(StringLiteral("apply")))([Identifier("target"), Identifier("args")])))),
  apply: ArrowFunctionExpression([Identifier("args")])(ArrowFunctionExpression([Identifier("target")])(CallExpression(MemberExpression(Identifier("target"))(StringLiteral("apply")))([Identifier("target"), Identifier("args")]))),
  construct: ArrowFunctionExpression([Identifier("constructor")])(ArrowFunctionExpression([Identifier("args")])(CallExpression(MemberExpression(Identifier("Reflect"))(StringLiteral("construct")))([Identifier("constructor"), Identifier("args")]))),
  match: ArrowFunctionExpression([Identifier("type")])(CallExpression(CallExpression(fromPrelude("match'"))([Identifier("type")]))([ArrowFunctionExpression([Identifier("_")])(Identifier("CasesNotExhaustive"))])),
  ["match'"]: ArrowFunctionExpression([Identifier("type")])(MemberExpression(Identifier("type"))(CallExpression(MemberExpression(Identifier("Symbol"))(StringLiteral("for")))([StringLiteral("match")]))),
  id: ArrowFunctionExpression([Identifier("x")])(Identifier("x")),
  const: ArrowFunctionExpression([Identifier("x")])(ArrowFunctionExpression([Identifier("y")])(Identifier("x"))),
  not: ArrowFunctionExpression([Identifier("b")])(UnaryExpression("!")(Identifier("b"))),
  equals: ArrowFunctionExpression([Identifier("this")])(ArrowFunctionExpression([Identifier("that")])(ConditionalExpression(isArray("this"))(BinaryExpression("&&")(isArray("that"))(BinaryExpression("&&")(BinaryExpression("===")(MemberExpression(Identifier("this"))(StringLiteral("length")))(MemberExpression(Identifier("that"))(StringLiteral("length"))))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("every")))([ArrowFunctionExpression([Identifier("x"), Identifier("idx")])(CallExpression(CallExpression(fromPrelude("equals"))([Identifier("x")]))([MemberExpression(Identifier("that"))(Identifier("idx"))]))]))))(BinaryExpression("===")(Identifier("this"))(Identifier("that"))))),
  concat: ArrowFunctionExpression([Identifier("this")])(ArrowFunctionExpression([Identifier("that")])(ConditionalExpression(LogicalExpression("or")(isArray("this"))(isString("this")))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("concat")))([Identifier("that")]))(CallExpression(MemberExpression(Identifier("this"))(StringLiteral("fantasy-land/concat")))([Identifier("that")])))),
  reduce: ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("foldable")])(CallExpression(MemberExpression(Identifier("foldable"))(ConditionalExpression(isArray("foldable"))(StringLiteral("reduce"))(StringLiteral("fantasy-land/reduce"))))([ArrowFunctionExpression([Identifier("y"), Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("y")]))([Identifier("x")])), Identifier("y")])))),
  reduceRight: ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("foldable")])(CallExpression(MemberExpression(Identifier("foldable"))(StringLiteral("reduceRight")))([ArrowFunctionExpression([Identifier("y"), Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("y")]))([Identifier("x")])), Identifier("y")])))),
  filter: ArrowFunctionExpression([Identifier("predicate")])(ArrowFunctionExpression([Identifier("filterable")])(ConditionalExpression(isArray("filterable"))(CallExpression(MemberExpression(Identifier("filterable"))(StringLiteral("filter")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("predicate"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("filterable"))(StringLiteral("fantasy-land/filter")))([Identifier("predicate")])))),
  reject: ArrowFunctionExpression([Identifier("predicate")])(CallExpression(fromPrelude("filter"))([CompositionExpression(fromPrelude("not"))(Identifier("predicate"))])),
  map: ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("functor")])(ConditionalExpression(isArray("functor"))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("map")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("functor"))(StringLiteral("fantasy-land/map")))([Identifier("f")])))),
  flip: ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("y")])(ArrowFunctionExpression([Identifier("x")])(CallExpression(CallExpression(Identifier("f"))([Identifier("x")]))([Identifier("y")])))),
  chain: ArrowFunctionExpression([Identifier("f")])(ArrowFunctionExpression([Identifier("chain")])(ConditionalExpression(isArray("chain"))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("flatMap")))([ArrowFunctionExpression([Identifier("x")])(CallExpression(Identifier("f"))([Identifier("x")]))]))(CallExpression(MemberExpression(Identifier("chain"))(StringLiteral("fantasy-land/chain")))([Identifier("f")]))))
});
export default Prelude;
