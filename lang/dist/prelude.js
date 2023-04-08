import {Nothing, Just} from "./Maybe.js";
import {ArrayExpression, ArrowFunctionExpression, BinaryExpression, BooleanLiteral, CallExpression, ConditionalExpression, Identifier, LogicalExpression, MemberExpression, NullLiteral, NumberLiteral, ObjectExpression, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, UnaryExpression} from "./Node.js";
const id = x => x;
const compose = f => g => (() => {
  switch (globalThis.Object.prototype.toString.call(g)) {
    case "[object Function]":
      return x => f(g(x));
    default:
      return g["fantasy-land/compose"](f);
  }
})();
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const reduce = f => y => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.reduce((y, x) => f(y)(x), y);
    default:
      return xs["fantasy-land/reduce"](f, y);
  }
})();
const reduceRight = f => y => x => x.reduceRight((y, x) => f(y)(x), y);
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const flip = f => y => x => f(x)(y);
const of = typeRep => (() => {
  switch (typeRep.name) {
    case "Array":
      return globalThis.Array.of;
    case "Function":
      return x => y => x;
    case "Set":
      return x => globalThis.Reflect.construct(globalThis.Set, [[x]]);
    default:
      return typeRep["fantasy-land/of"];
  }
})();
const append = x => xs => concat(xs)(of(xs.constructor)(x));
const compose$0027 = flip(compose);
const curry2 = f => x => y => f(x, y);
const ident = Identifier;
const boolean = BooleanLiteral;
const number = NumberLiteral;
const string = StringLiteral;
const array = ArrayExpression;
const object = ObjectExpression;
const spread = SpreadElement;
const member = MemberExpression;
const member$0027 = $ => compose$0027(string)(member($));
const lambda = flip(reduceRight(flip($ => ArrowFunctionExpression(Array.of($)))));
const apply = reduce($ => compose$0027(Array.of)(CallExpression($)));
const invoke = object => names => (...arguments$) => CallExpression(reduce(member$0027)(object)(names))(arguments$);
const $0023CasesNotExhaustive = ident("CasesNotExhaustive");
const $0023DivisionByZero = ident("DivisionByZero");
const $0023args = ident("args");
const $0023constructor = ident("constructor");
const $0023f = ident("f");
const $0023g = ident("g");
const $0023globalThis = ident("globalThis");
const $0023idx = ident("idx");
const $0023lhs = ident("lhs");
const $0023rhs = ident("rhs");
const $0023that = ident("that");
const $0023these = ident("these");
const $0023this = ident("this");
const $0023type = ident("type");
const $0023typeRep = ident("typeRep");
const $0023x = ident("x");
const $0023xs = ident("xs");
const $0023y = ident("y");
const _typeof_ = UnaryExpression("typeof");
const _$0021_ = UnaryExpression("!");
const _$002F_ = BinaryExpression("/");
const _$0025_ = BinaryExpression("%");
const _$002B_ = BinaryExpression("+");
const _$002D_ = BinaryExpression("-");
const _instanceof_ = BinaryExpression("instanceof");
const _$003D$003D$003D_ = BinaryExpression("===");
const _$0026_ = BinaryExpression("&");
const _$005E_ = BinaryExpression("^");
const _$007C_ = BinaryExpression("|");
const _$0026$0026_ = LogicalExpression("&&");
const _$007C$007C_ = LogicalExpression("||");
const $construct = curry2(invoke($0023globalThis)(["Reflect", "construct"]));
const Set = $ => $construct(member$0027($0023globalThis)("Set"))(array(Array.of($)));
const Map = $ => $construct(member$0027($0023globalThis)("Map"))(array(Array.of($)));
const cond = predicate => consequent => alternative => ConditionalExpression(predicate)(consequent)(Just(alternative));
const defineSwitch = discriminant => transform => default$ => $ => SwitchExpression(discriminant)(append(SwitchCase([Nothing])(default$))(map(([names, expr]) => SwitchCase(map($ => Just(string(transform($))))((args => target => target.split.apply(target, args))(["/"])(names)))(expr))(Object.entries($))));
const typeSwitch = identifier => defineSwitch(invoke($0023globalThis)(["Object", "prototype", "toString", "call"])(identifier))(tag => "[object " + tag + "]");
const typeRepSwitch = typeRep => defineSwitch(member$0027(typeRep)("name"))(id);
const $filter = predicate => xs => invoke(xs)(["filter"])(predicate);
const Prelude = {
  XOR: lambda([$0023rhs, $0023lhs])(typeSwitch($0023rhs)(_$005E_($0023lhs)($0023rhs))({
    Set: Set(array([spread($filter(lambda([$0023x])(_$0021_(invoke($0023rhs)(["has"])($0023x))))(array([spread($0023lhs)]))), spread($filter(lambda([$0023x])(_$0021_(invoke($0023lhs)(["has"])($0023x))))(array([spread($0023rhs)])))]))
  })),
  OR: lambda([$0023rhs, $0023lhs])(typeSwitch($0023rhs)(_$007C_($0023lhs)($0023rhs))({
    Set: Set(array([spread($0023lhs), spread($0023rhs)]))
  })),
  AND: lambda([$0023rhs, $0023lhs])(typeSwitch($0023rhs)(_$0026_($0023lhs)($0023rhs))({
    Set: Set($filter(lambda([$0023x])(invoke($0023rhs)(["has"])($0023x)))(array([spread($0023lhs)])))
  })),
  subtract: lambda([$0023rhs, $0023lhs])(typeSwitch($0023rhs)(_$002D_($0023lhs)($0023rhs))({
    Set: Set($filter(lambda([$0023x])(_$0021_(invoke($0023rhs)(["has"])($0023x))))(array([spread($0023lhs)])))
  })),
  construct: lambda([$0023constructor, $0023args])($construct($0023constructor)($0023args)),
  instanceof: lambda([$0023constructor, $0023x])(_instanceof_($0023x)($0023constructor)),
  typeof: lambda([$0023x])(cond(_$003D$003D$003D_($0023x)(NullLiteral))(string("null"))(_typeof_($0023x))),
  match: lambda([$0023type])(apply(ident("match'"))([$0023type, lambda([$0023x])($0023CasesNotExhaustive)])),
  ["match'"]: lambda([$0023type])(member($0023type)(invoke($0023globalThis)(["Symbol", "for"])(string("match")))),
  id: lambda([$0023x])($0023x),
  const: lambda([$0023x, $0023y])($0023x),
  not: lambda([$0023x])(_$0021_($0023x)),
  quot: lambda([$0023lhs, $0023rhs])(cond(_$003D$003D$003D_($0023rhs)(number(0)))($0023DivisionByZero)(_$007C_(_$002F_($0023lhs)($0023rhs))(number(0)))),
  rem: lambda([$0023lhs, $0023rhs])(cond(_$003D$003D$003D_($0023rhs)(number(0)))($0023DivisionByZero)(_$0025_($0023lhs)($0023rhs))),
  div: lambda([$0023lhs, $0023rhs])(cond(_$003D$003D$003D_($0023rhs)(number(0)))($0023DivisionByZero)(invoke($0023globalThis)(["Math", "floor"])(_$002F_($0023lhs)($0023rhs)))),
  mod: lambda([$0023lhs, $0023rhs])(cond(_$003D$003D$003D_($0023rhs)(number(0)))($0023DivisionByZero)(_$0025_(_$002B_(_$0025_($0023lhs)($0023rhs))($0023rhs))($0023rhs))),
  equals: lambda([$0023this, $0023that])(typeSwitch($0023this)(_$003D$003D$003D_($0023this)($0023that))({
    Array: typeSwitch($0023that)(boolean(false))({
      Array: _$0026$0026_(_$003D$003D$003D_(member$0027($0023this)("length"))(member$0027($0023that)("length")))(invoke($0023this)(["every"])(ArrowFunctionExpression([$0023x, $0023idx])(apply(ident("equals"))([$0023x, member($0023that)($0023idx)]))))
    })
  })),
  compose: lambda([$0023f, $0023g])(typeSwitch($0023g)(invoke($0023g)(["fantasy-land/compose"])($0023f))({
    Function: lambda([$0023x])(apply($0023f)([apply($0023g)([$0023x])]))
  })),
  concat: lambda([$0023this, $0023that])(typeSwitch($0023this)(invoke($0023this)(["fantasy-land/concat"])($0023that))({
    ["Array/String"]: invoke($0023this)(["concat"])($0023that)
  })),
  empty: lambda([$0023typeRep])(typeRepSwitch($0023typeRep)(invoke($0023typeRep)(["fantasy-land/empty"])())({
    Array: array([]),
    Object: object([]),
    String: string(""),
    Set: Set(array([])),
    Map: Map(array([]))
  })),
  reduce: lambda([$0023f, $0023y, $0023xs])(typeSwitch($0023xs)(invoke($0023xs)(["fantasy-land/reduce"])($0023f, $0023y))({
    Array: invoke($0023xs)(["reduce"])(ArrowFunctionExpression([$0023y, $0023x])(apply($0023f)([$0023y, $0023x])), $0023y)
  })),
  reduceRight: lambda([$0023f, $0023y, $0023x])(invoke($0023x)(["reduceRight"])(ArrowFunctionExpression([$0023y, $0023x])(apply($0023f)([$0023y, $0023x])), $0023y)),
  filter: lambda([$0023f, $0023xs])(typeSwitch($0023xs)(invoke($0023xs)(["fantasy-land/filter"])($0023f))({
    Array: $filter(lambda([$0023x])(apply($0023f)([$0023x])))($0023xs)
  })),
  reject: lambda([$0023f])(apply(ident("filter"))([lambda([$0023x])(_$0021_(apply($0023f)([$0023x])))])),
  map: lambda([$0023f, $0023xs])(typeSwitch($0023xs)(invoke($0023xs)(["fantasy-land/map"])($0023f))({
    Array: invoke($0023xs)(["map"])(lambda([$0023x])(apply($0023f)([$0023x])))
  })),
  flip: lambda([$0023f, $0023y, $0023x])(apply($0023f)([$0023x, $0023y])),
  of: lambda([$0023typeRep])(typeRepSwitch($0023typeRep)(member$0027($0023typeRep)("fantasy-land/of"))({
    Array: reduce(member$0027)($0023globalThis)(["Array", "of"]),
    Function: lambda([$0023x, $0023y])($0023x),
    Set: lambda([$0023x])(Set(array([$0023x])))
  })),
  append: lambda([$0023x, $0023xs])(apply(ident("concat"))([$0023xs, apply(ident("of"))([member$0027($0023xs)("constructor"), $0023x])])),
  prepend: lambda([$0023x, $0023xs])(apply(ident("concat"))([apply(ident("of"))([member$0027($0023xs)("constructor"), $0023x]), $0023xs])),
  chain: lambda([$0023f, $0023x])(typeSwitch($0023x)(invoke($0023x)(["fantasy-land/chain"])($0023f))({
    Array: invoke($0023x)(["flatMap"])(lambda([$0023x])(apply($0023f)([$0023x]))),
    Function: lambda([$0023y])(apply($0023x)([apply($0023f)([$0023y]), $0023y]))
  })),
  join: apply(ident("chain"))([ident("id")]),
  contains: lambda([$0023this, $0023these])(apply(ident("reduce"))([lambda([$0023x, $0023that])(_$007C$007C_($0023x)(apply(ident("equals"))([$0023this, $0023that]))), boolean(false), $0023these]))
};
export default Prelude;
