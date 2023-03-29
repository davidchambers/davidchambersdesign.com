import Node from "./Node.js";
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude$1;
const {ArrowFunctionExpression, BinaryExpression, CallExpression, CompositionExpression, ConditionalExpression, Identifier, LogicalExpression, MemberExpression, NullLiteral, ObjectExpression, Property, StringLiteral, UnaryExpression} = Node;
const $0023Array = Identifier("Array");
const $0023CasesNotExhaustive = Identifier("CasesNotExhaustive");
const $0023Reflect = Identifier("Reflect");
const $0023Symbol = Identifier("Symbol");
const $0023args = Identifier("args");
const $0023constructor = Identifier("constructor");
const $0023f = Identifier("f");
const $0023idx = Identifier("idx");
const $0023lhs = Identifier("lhs");
const $0023name = Identifier("name");
const $0023operand = Identifier("operand");
const $0023rhs = Identifier("rhs");
const $0023target = Identifier("target");
const $0023that = Identifier("that");
const $0023this = Identifier("this");
const $0023type = Identifier("type");
const $0023x = Identifier("x");
const $0023y = Identifier("y");
const $0027apply = StringLiteral("apply");
const $0027binary = StringLiteral("binary");
const $0027concat = StringLiteral("concat");
const $0027construct = StringLiteral("construct");
const $0027every = StringLiteral("every");
const $0027fantasy$002Dland$002Fchain = StringLiteral("fantasy-land/chain");
const $0027fantasy$002Dland$002Fconcat = StringLiteral("fantasy-land/concat");
const $0027fantasy$002Dland$002Ffilter = StringLiteral("fantasy-land/filter");
const $0027fantasy$002Dland$002Fmap = StringLiteral("fantasy-land/map");
const $0027fantasy$002Dland$002Freduce = StringLiteral("fantasy-land/reduce");
const $0027filter = StringLiteral("filter");
const $0027flatMap = StringLiteral("flatMap");
const $0027for = StringLiteral("for");
const $0027isArray = StringLiteral("isArray");
const $0027length = StringLiteral("length");
const $0027map = StringLiteral("map");
const $0027match = StringLiteral("match");
const $0027null = StringLiteral("null");
const $0027reduce = StringLiteral("reduce");
const $0027reduceRight = StringLiteral("reduceRight");
const $0027string = StringLiteral("string");
const $0027unary = StringLiteral("unary");
const fromEsUnaryOperator = operator => ArrowFunctionExpression([$0023operand])(UnaryExpression(operator)($0023operand));
const fromEsBinaryOperator = operator => ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(BinaryExpression(operator)($0023lhs)($0023rhs)));
const esUnaryOperators = ["~"];
const esBinaryOperators = ["<<", ">>", ">>>", "&", "^", "|"];
const Prelude = fromPrelude => ({
  operators: ObjectExpression([Property($0027unary)(ObjectExpression(map(op => Property(StringLiteral(op))(fromEsUnaryOperator(op)))(esUnaryOperators))), Property($0027binary)(ObjectExpression(map(op => Property(StringLiteral(op))(fromEsBinaryOperator(op)))(esBinaryOperators)))]),
  _apply: ArrowFunctionExpression([$0023name])(ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression(MemberExpression($0023target)($0023name))($0027apply))([$0023target, $0023args])))),
  apply: ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression($0023target)($0027apply))([$0023target, $0023args]))),
  construct: ArrowFunctionExpression([$0023constructor])(ArrowFunctionExpression([$0023args])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023constructor, $0023args]))),
  instanceof: ArrowFunctionExpression([$0023constructor])(ArrowFunctionExpression([$0023x])(BinaryExpression("instanceof")($0023x)($0023constructor))),
  typeof: ArrowFunctionExpression([$0023x])(ConditionalExpression(BinaryExpression("===")($0023x)(NullLiteral))($0027null)(UnaryExpression("typeof")($0023x))),
  match: ArrowFunctionExpression([$0023type])(CallExpression(CallExpression(fromPrelude("match'"))([$0023type]))([ArrowFunctionExpression([$0023x])($0023CasesNotExhaustive)])),
  ["match'"]: ArrowFunctionExpression([$0023type])(MemberExpression($0023type)(CallExpression(MemberExpression($0023Symbol)($0027for))([$0027match]))),
  id: ArrowFunctionExpression([$0023x])($0023x),
  const: ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023y])($0023x)),
  not: ArrowFunctionExpression([$0023x])(UnaryExpression("!")($0023x)),
  equals: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023that])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023this]))(BinaryExpression("&&")(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023that]))(BinaryExpression("&&")(BinaryExpression("===")(MemberExpression($0023this)($0027length))(MemberExpression($0023that)($0027length)))(CallExpression(MemberExpression($0023this)($0027every))([ArrowFunctionExpression([$0023x, $0023idx])(CallExpression(CallExpression(fromPrelude("equals"))([$0023x]))([MemberExpression($0023that)($0023idx)]))]))))(BinaryExpression("===")($0023this)($0023that)))),
  concat: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023that])(ConditionalExpression(LogicalExpression("or")(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023this]))(BinaryExpression("===")(UnaryExpression("typeof")($0023this))($0027string)))(CallExpression(MemberExpression($0023this)($0027concat))([$0023that]))(CallExpression(MemberExpression($0023this)($0027fantasy$002Dland$002Fconcat))([$0023that])))),
  reduce: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023x)(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))($0027reduce)($0027fantasy$002Dland$002Freduce)))([ArrowFunctionExpression([$0023y, $0023x])(CallExpression(CallExpression($0023f)([$0023y]))([$0023x])), $0023y])))),
  reduceRight: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023x)($0027reduceRight))([ArrowFunctionExpression([$0023y, $0023x])(CallExpression(CallExpression($0023f)([$0023y]))([$0023x])), $0023y])))),
  filter: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027filter))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Ffilter))([$0023f])))),
  reject: ArrowFunctionExpression([$0023f])(CallExpression(fromPrelude("filter"))([CompositionExpression(fromPrelude("not"))($0023f)])),
  map: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027map))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Fmap))([$0023f])))),
  flip: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(CallExpression($0023f)([$0023x]))([$0023y])))),
  chain: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027flatMap))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Fchain))([$0023f]))))
});
export default Prelude;
