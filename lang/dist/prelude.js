import Maybe from "./Maybe.js";
import Node from "./Node.js";
const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
const {Just} = Maybe;
const {ArrayExpression, ArrowFunctionExpression, BinaryExpression, BooleanLiteral, CallExpression, ConditionalExpression, Identifier, LogicalExpression, MemberExpression, NullLiteral, NumberLiteral, ObjectExpression, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, UnaryExpression} = Node;
const $0023globalThis = Identifier("globalThis");
const $0023Array = MemberExpression($0023globalThis)(StringLiteral("Array"));
const $0023Math = MemberExpression($0023globalThis)(StringLiteral("Math"));
const $0023Object = MemberExpression($0023globalThis)(StringLiteral("Object"));
const $0023Reflect = MemberExpression($0023globalThis)(StringLiteral("Reflect"));
const $0023Set = MemberExpression($0023globalThis)(StringLiteral("Set"));
const $0023Symbol = MemberExpression($0023globalThis)(StringLiteral("Symbol"));
const $0023CasesNotExhaustive = Identifier("CasesNotExhaustive");
const $0023DivisionByZero = Identifier("DivisionByZero");
const $0023args = Identifier("args");
const $0023constructor = Identifier("constructor");
const $0023equals = Identifier("equals");
const $0023f = Identifier("f");
const $0023idx = Identifier("idx");
const $0023lhs = Identifier("lhs");
const $0023reduce = Identifier("reduce");
const $0023rhs = Identifier("rhs");
const $0023that = Identifier("that");
const $0023these = Identifier("these");
const $0023this = Identifier("this");
const $0023type = Identifier("type");
const $0023typeRep = Identifier("typeRep");
const $0023x = Identifier("x");
const $0023y = Identifier("y");
const $0027Array = StringLiteral("Array");
const $0027Function = StringLiteral("Function");
const $0027Map = StringLiteral("Map");
const $0027Object = StringLiteral("Object");
const $0027Set = StringLiteral("Set");
const $0027String = StringLiteral("String");
const $0027apply = StringLiteral("apply");
const $0027concat = StringLiteral("concat");
const $0027construct = StringLiteral("construct");
const $0027every = StringLiteral("every");
const $0027fantasy$002Dland$002Fchain = StringLiteral("fantasy-land/chain");
const $0027fantasy$002Dland$002Fconcat = StringLiteral("fantasy-land/concat");
const $0027fantasy$002Dland$002Fempty = StringLiteral("fantasy-land/empty");
const $0027fantasy$002Dland$002Ffilter = StringLiteral("fantasy-land/filter");
const $0027fantasy$002Dland$002Fmap = StringLiteral("fantasy-land/map");
const $0027fantasy$002Dland$002Fof = StringLiteral("fantasy-land/of");
const $0027fantasy$002Dland$002Freduce = StringLiteral("fantasy-land/reduce");
const $0027filter = StringLiteral("filter");
const $0027flatMap = StringLiteral("flatMap");
const $0027floor = StringLiteral("floor");
const $0027for = StringLiteral("for");
const $0027has = StringLiteral("has");
const $0027isArray = StringLiteral("isArray");
const $0027length = StringLiteral("length");
const $0027map = StringLiteral("map");
const $0027match = StringLiteral("match");
const $0027name = StringLiteral("name");
const $0027null = StringLiteral("null");
const $0027of = StringLiteral("of");
const $0027prototype = StringLiteral("prototype");
const $0027reduce = StringLiteral("reduce");
const $0027reduceRight = StringLiteral("reduceRight");
const $0027string = StringLiteral("string");
const $0027toString = StringLiteral("toString");
const Object$0023toString = identifier => CallExpression(MemberExpression($0023Reflect)($0027apply))([MemberExpression(MemberExpression($0023Object)($0027prototype))($0027toString), identifier, ArrayExpression([])]);
const Prelude = {
  XOR: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Maybe.Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([CallExpression(MemberExpression(ArrayExpression([SpreadElement($0023lhs)]))($0027filter))([ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023rhs)($0027has))([$0023x]))])])])), SwitchCase([Maybe.Nothing])(BinaryExpression("^")($0023lhs)($0023rhs))]))),
  OR: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Maybe.Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([ArrayExpression([SpreadElement($0023lhs), SpreadElement($0023rhs)])])])), SwitchCase([Maybe.Nothing])(BinaryExpression("|")($0023lhs)($0023rhs))]))),
  subtract: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Maybe.Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([CallExpression(MemberExpression(ArrayExpression([SpreadElement($0023lhs)]))($0027filter))([ArrowFunctionExpression([$0023x])(UnaryExpression("!")(CallExpression(MemberExpression($0023rhs)($0027has))([$0023x])))])])])), SwitchCase([Maybe.Nothing])(BinaryExpression("-")($0023lhs)($0023rhs))]))),
  apply: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023args])(CallExpression(MemberExpression($0023f)($0027apply))([NullLiteral, $0023args]))),
  construct: ArrowFunctionExpression([$0023constructor])(ArrowFunctionExpression([$0023args])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023constructor, $0023args]))),
  instanceof: ArrowFunctionExpression([$0023constructor])(ArrowFunctionExpression([$0023x])(BinaryExpression("instanceof")($0023x)($0023constructor))),
  typeof: ArrowFunctionExpression([$0023x])(ConditionalExpression(BinaryExpression("===")($0023x)(NullLiteral))($0027null)(Just(UnaryExpression("typeof")($0023x)))),
  match: ArrowFunctionExpression([$0023type])(CallExpression(CallExpression(Identifier("match'"))([$0023type]))([ArrowFunctionExpression([$0023x])($0023CasesNotExhaustive)])),
  ["match'"]: ArrowFunctionExpression([$0023type])(MemberExpression($0023type)(CallExpression(MemberExpression($0023Symbol)($0027for))([$0027match]))),
  id: ArrowFunctionExpression([$0023x])($0023x),
  const: ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023y])($0023x)),
  not: ArrowFunctionExpression([$0023x])(UnaryExpression("!")($0023x)),
  quot: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(BinaryExpression("|")(BinaryExpression("/")($0023lhs)($0023rhs))(NumberLiteral(0)))))),
  rem: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(BinaryExpression("%")($0023lhs)($0023rhs))))),
  div: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(CallExpression(MemberExpression($0023Math)($0027floor))([BinaryExpression("/")($0023lhs)($0023rhs)]))))),
  mod: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(BinaryExpression("%")(BinaryExpression("+")(BinaryExpression("%")($0023lhs)($0023rhs))($0023rhs))($0023rhs))))),
  equals: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023that])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023this]))(BinaryExpression("&&")(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023that]))(BinaryExpression("&&")(BinaryExpression("===")(MemberExpression($0023this)($0027length))(MemberExpression($0023that)($0027length)))(CallExpression(MemberExpression($0023this)($0027every))([ArrowFunctionExpression([$0023x, $0023idx])(CallExpression(CallExpression(Identifier("equals"))([$0023x]))([MemberExpression($0023that)($0023idx)]))]))))(Just(BinaryExpression("===")($0023this)($0023that))))),
  concat: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023that])(ConditionalExpression(LogicalExpression("or")(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023this]))(BinaryExpression("===")(UnaryExpression("typeof")($0023this))($0027string)))(CallExpression(MemberExpression($0023this)($0027concat))([$0023that]))(Just(CallExpression(MemberExpression($0023this)($0027fantasy$002Dland$002Fconcat))([$0023that]))))),
  empty: ArrowFunctionExpression([$0023typeRep])(SwitchExpression(MemberExpression($0023typeRep)($0027name))([SwitchCase([Maybe.Just($0027Array)])(ArrayExpression([])), SwitchCase([Maybe.Just($0027Object)])(ObjectExpression([])), SwitchCase([Maybe.Just($0027String)])(StringLiteral("")), SwitchCase([Maybe.Just($0027Set), Maybe.Just($0027Map)])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023typeRep, ArrayExpression([ArrayExpression([])])])), SwitchCase([Maybe.Nothing])(CallExpression(MemberExpression($0023typeRep)($0027fantasy$002Dland$002Fempty))([]))])),
  reduce: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023x)(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))($0027reduce)(Just($0027fantasy$002Dland$002Freduce))))([ArrowFunctionExpression([$0023y, $0023x])(CallExpression(CallExpression($0023f)([$0023y]))([$0023x])), $0023y])))),
  reduceRight: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023x)($0027reduceRight))([ArrowFunctionExpression([$0023y, $0023x])(CallExpression(CallExpression($0023f)([$0023y]))([$0023x])), $0023y])))),
  filter: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027filter))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(Just(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Ffilter))([$0023f]))))),
  reject: ArrowFunctionExpression([$0023f])(CallExpression(Identifier("filter"))([ArrowFunctionExpression([$0023x])(UnaryExpression("!")(CallExpression($0023f)([$0023x])))])),
  map: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027map))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(Just(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Fmap))([$0023f]))))),
  flip: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(CallExpression($0023f)([$0023x]))([$0023y])))),
  of: ArrowFunctionExpression([$0023typeRep])(SwitchExpression(MemberExpression($0023typeRep)($0027name))([SwitchCase([Maybe.Just($0027Array)])(MemberExpression($0023Array)($0027of)), SwitchCase([Maybe.Just($0027Function)])(ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023y])($0023x))), SwitchCase([Maybe.Just($0027Set)])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023typeRep, ArrayExpression([ArrayExpression([$0023x])])]))), SwitchCase([Maybe.Nothing])(MemberExpression($0023typeRep)($0027fantasy$002Dland$002Fof))])),
  chain: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027flatMap))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(Just(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Fchain))([$0023f]))))),
  contains: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023these])(CallExpression(CallExpression(CallExpression($0023reduce)([ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023that])(LogicalExpression("or")($0023x)(CallExpression(CallExpression($0023equals)([$0023this]))([$0023that]))))]))([BooleanLiteral(false)]))([$0023these])))
};
export default Prelude;
