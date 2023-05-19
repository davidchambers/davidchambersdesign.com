import {Array, ArrowFunctionExpression, Block, Boolean, Call, ConditionalExpression, Identifier, If, Infix, Member, Number, Object, Prefix, Return, Spread, String} from "./InternalNode.js";
import {Nothing} from "./Maybe.js";
const id = x => x;
const concat = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return this$.concat(that);
  }
  if ($discriminant === "[object String]") {
    return this$.concat(that);
  }
  return this$["fantasy-land/concat"](that);
})(globalThis.Object.prototype.toString.call(this$));
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
const pure = typeRep => ($discriminant => {
  if ($discriminant === "Array") {
    return globalThis.Array.of;
  }
  if ($discriminant === "Function") {
    return x => y => x;
  }
  if ($discriminant === "Set") {
    return x => globalThis.Reflect.construct(globalThis.Set, [[x]]);
  }
  return typeRep["fantasy-land/of"];
})(typeRep.name);
const append = x => xs => concat(xs)(pure(xs.constructor)(x));
const Function = ArrowFunctionExpression;
const $0023$discriminant = Identifier("$discriminant");
const $0023DivisionByZero = Identifier("DivisionByZero");
const $0023chain = Identifier("chain");
const $0023concat = Identifier("concat");
const $0023constructor = Identifier("constructor");
const $0023count = Identifier("count");
const $0023equals = Identifier("equals");
const $0023f = Identifier("f");
const $0023filter = Identifier("filter");
const $0023from = Identifier("from");
const $0023g = Identifier("g");
const $0023globalThis = Identifier("globalThis");
const $0023id = Identifier("id");
const $0023idx = Identifier("idx");
const $0023index = Identifier("index");
const $0023lhs = Identifier("lhs");
const $0023null = Identifier("null");
const $0023pattern = Identifier("pattern");
const $0023prefix = Identifier("prefix");
const $0023pure = Identifier("pure");
const $0023reduce = Identifier("reduce");
const $0023replacement = Identifier("replacement");
const $0023rhs = Identifier("rhs");
const $0023separator = Identifier("separator");
const $0023string = Identifier("string");
const $0023suffix = Identifier("suffix");
const $0023that = Identifier("that");
const $0023these = Identifier("these");
const $0023this = Identifier("this");
const $0023to = Identifier("to");
const $0023typeRep = Identifier("typeRep");
const $0023typeof = Identifier("typeof");
const $0023x = Identifier("x");
const $0023xs = Identifier("xs");
const $0023y = Identifier("y");
const $0027Array = String("Array");
const $0027JSON = String("JSON");
const $0027Map = String("Map");
const $0027Math = String("Math");
const $0027Object = String("Object");
const $0027Reflect = String("Reflect");
const $0027Set = String("Set");
const $0027call = String("call");
const $0027charAt = String("charAt");
const $0027charCodeAt = String("charCodeAt");
const $0027codePointAt = String("codePointAt");
const $0027concat = String("concat");
const $0027construct = String("construct");
const $0027constructor = String("constructor");
const $0027endsWith = String("endsWith");
const $0027every = String("every");
const $0027fantasy$002Dland$002Fap = String("fantasy-land/ap");
const $0027fantasy$002Dland$002Fchain = String("fantasy-land/chain");
const $0027fantasy$002Dland$002Fcompose = String("fantasy-land/compose");
const $0027fantasy$002Dland$002Fconcat = String("fantasy-land/concat");
const $0027fantasy$002Dland$002Fempty = String("fantasy-land/empty");
const $0027fantasy$002Dland$002Fequals = String("fantasy-land/equals");
const $0027fantasy$002Dland$002Ffilter = String("fantasy-land/filter");
const $0027fantasy$002Dland$002Fmap = String("fantasy-land/map");
const $0027fantasy$002Dland$002Fof = String("fantasy-land/of");
const $0027fantasy$002Dland$002Freduce = String("fantasy-land/reduce");
const $0027filter = String("filter");
const $0027flatMap = String("flatMap");
const $0027floor = String("floor");
const $0027function = String("function");
const $0027join = String("join");
const $0027length = String("length");
const $0027map = String("map");
const $0027name = String("name");
const $0027null = String("null");
const $0027of = String("of");
const $0027parse = String("parse");
const $0027prototype = String("prototype");
const $0027reduce = String("reduce");
const $0027reduceRight = String("reduceRight");
const $0027repeat = String("repeat");
const $0027replace = String("replace");
const $0027replaceAll = String("replaceAll");
const $0027slice = String("slice");
const $0027split = String("split");
const $0027startsWith = String("startsWith");
const $0027toLowerCase = String("toLowerCase");
const $0027toString = String("toString");
const $0027toUpperCase = String("toUpperCase");
const $0027trim = String("trim");
const $0027trimEnd = String("trimEnd");
const $0027trimStart = String("trimStart");
const construct = constructor => arguments$ => Call(Member(Member($0023globalThis)($0027Reflect))($0027construct))([constructor, arguments$]);
const Set = values => construct(Member($0023globalThis)($0027Set))(Array([values]));
const Map = entries => construct(Member($0023globalThis)($0027Map))(Array([entries]));
const defineSwitch = discriminant => transform => default$ => cases => Call(Function([$0023$discriminant])(Block(($lhs => append(Return(default$))($lhs))(map($ => ($value => {
  if (globalThis.Array.isArray($value)) {
    if ($value.length === 2) {
      const name = $value[0];
      {
        const consequent = $value[1];
        return If(Infix("===")($0023$discriminant)(String(transform(name))))(Block([Return(consequent)]))(Nothing);
      }
    }
  }
  throw globalThis.Error("Pattern matching failure");
})($))(globalThis.Object.entries(cases))))))([discriminant]);
const typeSwitch = identifier => defineSwitch(Call(Member(Member(Member(Member($0023globalThis)($0027Object))($0027prototype))($0027toString))($0027call))([identifier]))(tag => "[object " + tag + "]");
const typeRepSwitch = typeRep => defineSwitch(Member(typeRep)($0027name))(id);
const Prelude = {
  null: Call(Member(Member($0023globalThis)($0027JSON))($0027parse))([$0027null]),
  complement: Function([$0023rhs])(Prefix("~")($0023rhs)),
  instanceof: Function([$0023constructor])(Function([$0023x])(Infix("instanceof")($0023x)($0023constructor))),
  typeof: Function([$0023x])(ConditionalExpression(Infix("===")($0023x)($0023null))($0027null)(Prefix("typeof")($0023x))),
  id: Function([$0023x])($0023x),
  const: Function([$0023x])(Function([$0023y])($0023x)),
  not: Function([$0023x])(Prefix("!")($0023x)),
  negate: Function([$0023x])(Prefix("-")($0023x)),
  quot: Function([$0023lhs])(Function([$0023rhs])(Block([Return(ConditionalExpression(Infix("===")($0023rhs)(Number(0)))($0023DivisionByZero)(Infix("|")(Infix("/")($0023lhs)($0023rhs))(Number(0))))]))),
  rem: Function([$0023lhs])(Function([$0023rhs])(ConditionalExpression(Infix("===")($0023rhs)(Number(0)))($0023DivisionByZero)(Infix("%")($0023lhs)($0023rhs)))),
  div: Function([$0023lhs])(Function([$0023rhs])(ConditionalExpression(Infix("===")($0023rhs)(Number(0)))($0023DivisionByZero)(Call(Member(Member($0023globalThis)($0027Math))($0027floor))([Infix("/")($0023lhs)($0023rhs)])))),
  mod: Function([$0023lhs])(Function([$0023rhs])(ConditionalExpression(Infix("===")($0023rhs)(Number(0)))($0023DivisionByZero)(Infix("%")(Infix("+")(Infix("%")($0023lhs)($0023rhs))($0023rhs))($0023rhs)))),
  charAt: Function([$0023index])(Function([$0023string])(Call(Member($0023string)($0027charAt))([$0023index]))),
  charCodeAt: Function([$0023index])(Function([$0023string])(Call(Member($0023string)($0027charCodeAt))([$0023index]))),
  codePointAt: Function([$0023index])(Function([$0023string])(Call(Member($0023string)($0027codePointAt))([$0023index]))),
  startsWith: Function([$0023prefix])(Function([$0023string])(Call(Member($0023string)($0027startsWith))([$0023prefix]))),
  endsWith: Function([$0023suffix])(Function([$0023string])(Call(Member($0023string)($0027endsWith))([$0023suffix]))),
  toLower: Function([$0023string])(Call(Member($0023string)($0027toLowerCase))([])),
  toUpper: Function([$0023string])(Call(Member($0023string)($0027toUpperCase))([])),
  trim: Function([$0023string])(Call(Member($0023string)($0027trim))([])),
  trimStart: Function([$0023string])(Call(Member($0023string)($0027trimStart))([])),
  trimEnd: Function([$0023string])(Call(Member($0023string)($0027trimEnd))([])),
  repeat: Function([$0023count])(Function([$0023string])(Call(Member($0023string)($0027repeat))([$0023count]))),
  replace: Function([$0023pattern])(Function([$0023replacement])(Function([$0023string])(Call(Member($0023string)($0027replace))([$0023pattern, $0023replacement])))),
  replaceAll: Function([$0023pattern])(Function([$0023replacement])(Function([$0023string])(Call(Member($0023string)($0027replaceAll))([$0023pattern, $0023replacement])))),
  splitOn: Function([$0023separator])(Function([$0023string])(Call(Member($0023string)($0027split))([$0023separator]))),
  joinWith: Function([$0023separator])(Function([$0023xs])(Call(Member($0023xs)($0027join))([$0023separator]))),
  slice: Function([$0023from])(Function([$0023to])(Function([$0023xs])(Call(Member($0023xs)($0027slice))([$0023from, $0023to])))),
  sliceFrom: Function([$0023from])(Function([$0023xs])(Call(Member($0023xs)($0027slice))([$0023from]))),
  sliceTo: Function([$0023to])(Function([$0023xs])(Call(Member($0023xs)($0027slice))([Number(0), $0023to]))),
  equals: Function([$0023this])(Function([$0023that])(typeSwitch($0023this)(Infix("===")($0023this)($0023that))({
    Array: typeSwitch($0023that)(Boolean(false))({
      Array: Infix("&&")(Infix("===")(Member($0023this)($0027length))(Member($0023that)($0027length)))(Call(Member($0023this)($0027every))([Function([$0023x, $0023idx])(Call(Call($0023equals)([$0023x]))([Member($0023that)($0023idx)]))]))
    }),
    Object: typeSwitch($0023that)(Boolean(false))({
      Object: ConditionalExpression(Infix("===")(Call($0023typeof)([Member($0023this)($0027fantasy$002Dland$002Fequals)]))($0027function))(Call(Member($0023this)($0027fantasy$002Dland$002Fequals))([$0023that]))(Infix("===")($0023this)($0023that))
    })
  }))),
  min: Function([$0023x])(Function([$0023y])(ConditionalExpression(Infix("<=")($0023x)($0023y))($0023x)($0023y))),
  max: Function([$0023x])(Function([$0023y])(ConditionalExpression(Infix("<=")($0023x)($0023y))($0023y)($0023x))),
  compose: Function([$0023f])(Function([$0023g])(typeSwitch($0023g)(Call(Member($0023g)($0027fantasy$002Dland$002Fcompose))([$0023f]))({
    Function: Function([$0023x])(Call($0023f)([Call($0023g)([$0023x])]))
  }))),
  concat: Function([$0023this])(Function([$0023that])(typeSwitch($0023this)(Call(Member($0023this)($0027fantasy$002Dland$002Fconcat))([$0023that]))({
    Array: Call(Member($0023this)($0027concat))([$0023that]),
    String: Call(Member($0023this)($0027concat))([$0023that])
  }))),
  empty: Function([$0023typeRep])(typeRepSwitch($0023typeRep)(Call(Member($0023typeRep)($0027fantasy$002Dland$002Fempty))([]))({
    Array: Array([]),
    Object: Object([]),
    String: String(""),
    Set: Set(Array([])),
    Map: Map(Array([]))
  })),
  reduce: Function([$0023f])(Function([$0023y])(Function([$0023xs])(typeSwitch($0023xs)(Call(Member($0023xs)($0027fantasy$002Dland$002Freduce))([Function([$0023y, $0023x])(Call(Call($0023f)([$0023y]))([$0023x])), $0023y]))({
    Array: Call(Member($0023xs)($0027reduce))([Function([$0023y, $0023x])(Call(Call($0023f)([$0023y]))([$0023x])), $0023y])
  })))),
  reduceRight: Function([$0023f])(Function([$0023y])(Function([$0023x])(Call(Member($0023x)($0027reduceRight))([Function([$0023y, $0023x])(Call(Call($0023f)([$0023y]))([$0023x])), $0023y])))),
  filter: Function([$0023f])(Function([$0023xs])(typeSwitch($0023xs)(Call(Member($0023xs)($0027fantasy$002Dland$002Ffilter))([$0023f]))({
    Array: Call(Member($0023xs)($0027filter))([Function([$0023x])(Call($0023f)([$0023x]))]),
    Set: Set(Call(Call($0023filter)([$0023f]))([Array([Spread($0023xs)])]))
  }))),
  reject: Function([$0023f])(Call($0023filter)([Function([$0023x])(Prefix("!")(Call($0023f)([$0023x])))])),
  map: Function([$0023f])(Function([$0023xs])(typeSwitch($0023xs)(Call(Member($0023xs)($0027fantasy$002Dland$002Fmap))([$0023f]))({
    Array: Call(Member($0023xs)($0027map))([Function([$0023x])(Call($0023f)([$0023x]))])
  }))),
  flip: Function([$0023f])(Function([$0023y])(Function([$0023x])(Call(Call($0023f)([$0023x]))([$0023y])))),
  pure: Function([$0023typeRep])(typeRepSwitch($0023typeRep)(Member($0023typeRep)($0027fantasy$002Dland$002Fof))({
    Array: Member(Member($0023globalThis)($0027Array))($0027of),
    Function: Function([$0023x])(Function([$0023y])($0023x)),
    Set: Function([$0023x])(Set(Array([$0023x])))
  })),
  ap: Function([$0023lhs])(Function([$0023rhs])(typeSwitch($0023lhs)(Call(Member($0023rhs)($0027fantasy$002Dland$002Fap))([$0023lhs]))({
    Array: Call(Member($0023lhs)($0027flatMap))([Function([$0023f])(Call(Member($0023rhs)($0027map))([Function([$0023x])(Call($0023f)([$0023x]))]))])
  }))),
  append: Function([$0023x])(Function([$0023xs])(Call(Call($0023concat)([$0023xs]))([Call(Call($0023pure)([Member($0023xs)($0027constructor)]))([$0023x])]))),
  prepend: Function([$0023x])(Function([$0023xs])(Call(Call($0023concat)([Call(Call($0023pure)([Member($0023xs)($0027constructor)]))([$0023x])]))([$0023xs]))),
  chain: Function([$0023f])(Function([$0023x])(typeSwitch($0023x)(Call(Member($0023x)($0027fantasy$002Dland$002Fchain))([$0023f]))({
    Array: Call(Member($0023x)($0027flatMap))([Function([$0023x])(Call($0023f)([$0023x]))]),
    Function: Function([$0023y])(Call(Call($0023x)([Call($0023f)([$0023y])]))([$0023y]))
  }))),
  join: Call($0023chain)([$0023id]),
  contains: Function([$0023this])(Function([$0023these])(Call(Call(Call($0023reduce)([Function([$0023x])(Function([$0023that])(Infix("||")($0023x)(Call(Call($0023equals)([$0023this]))([$0023that]))))]))([Boolean(false)]))([$0023these])))
};
export default Prelude;
