import {Nothing, Just} from "./Maybe.js";
import {ArrayExpression, ArrowFunctionExpression, AssignmentExpression, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, ConditionalExpression, ExpressionStatement, ForStatement, Identifier, IfStatement, InfixExpression, LetDeclaration, MemberExpression, NumberLiteral, ObjectExpression, PrefixExpression, Property, ReturnStatement, SpreadElement, StringLiteral, SwitchCase, SwitchStatement, UpdateExpression, VariableDeclaration, WhileStatement} from "./Node.js";
import {EsOperator} from "./Operator.js";
const id = x => x;
const splitOn = separator => string => string.split(separator);
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return this$.concat(that);
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
      return xs["fantasy-land/reduce"]((y, x) => f(y)(x), y);
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
const ident = Identifier;
const boolean = BooleanLiteral;
const number = NumberLiteral;
const string = StringLiteral;
const array = ArrayExpression;
const object = ObjectExpression;
const spread = SpreadElement;
const member = MemberExpression;
const member$002A = reduce(member);
const prefix = PrefixExpression;
const infix = InfixExpression;
const lambda = flip(reduceRight(flip($ => ArrowFunctionExpression(Array.of($)))));
const call$002A = CallExpression;
const call = callee => argument => call$002A(callee)([argument]);
const $0023DivisionByZero = ident("DivisionByZero");
const $0023chain = ident("chain");
const $0023concat = ident("concat");
const $0023constructor = ident("constructor");
const $0023context = ident("context");
const $0023count = ident("count");
const $0023equals = ident("equals");
const $0023f = ident("f");
const $0023filter = ident("filter");
const $0023fragment = ident("fragment");
const $0023fragments = ident("fragments");
const $0023from = ident("from");
const $0023g = ident("g");
const $0023globalThis = ident("globalThis");
const $0023id = ident("id");
const $0023idx = ident("idx");
const $0023index = ident("index");
const $0023lastIndex = ident("lastIndex");
const $0023lengths = ident("lengths");
const $0023lhs = ident("lhs");
const $0023match = ident("match");
const $0023min = ident("min");
const $0023null = ident("null");
const $0023pattern = ident("pattern");
const $0023patternIndex = ident("patternIndex");
const $0023patterns = ident("patterns");
const $0023prefix = ident("prefix");
const $0023pure = ident("pure");
const $0023reduce = ident("reduce");
const $0023replacement = ident("replacement");
const $0023rhs = ident("rhs");
const $0023separator = ident("separator");
const $0023slices = ident("slices");
const $0023string = ident("string");
const $0023suffix = ident("suffix");
const $0023test = ident("test");
const $0023that = ident("that");
const $0023these = ident("these");
const $0023this = ident("this");
const $0023to = ident("to");
const $0023typeRep = ident("typeRep");
const $0023typeof = ident("typeof");
const $0023valid = ident("valid");
const $0023value = ident("value");
const $0023x = ident("x");
const $0023xs = ident("xs");
const $0023y = ident("y");
const $0027$tag = string("$tag");
const $0027$values = string("$values");
const $0027Array = string("Array");
const $0027JSON = string("JSON");
const $0027Map = string("Map");
const $0027Math = string("Math");
const $0027Object = string("Object");
const $0027Reflect = string("Reflect");
const $0027Set = string("Set");
const $0027any = string("any");
const $0027array = string("array");
const $0027assign = string("assign");
const $0027call = string("call");
const $0027charAt = string("charAt");
const $0027charCodeAt = string("charCodeAt");
const $0027codePointAt = string("codePointAt");
const $0027concat = string("concat");
const $0027construct = string("construct");
const $0027constructor = string("constructor");
const $0027data = string("data");
const $0027endsWith = string("endsWith");
const $0027every = string("every");
const $0027fantasy$002Dland$002Fap = string("fantasy-land/ap");
const $0027fantasy$002Dland$002Fchain = string("fantasy-land/chain");
const $0027fantasy$002Dland$002Fcompose = string("fantasy-land/compose");
const $0027fantasy$002Dland$002Fconcat = string("fantasy-land/concat");
const $0027fantasy$002Dland$002Fempty = string("fantasy-land/empty");
const $0027fantasy$002Dland$002Fequals = string("fantasy-land/equals");
const $0027fantasy$002Dland$002Ffilter = string("fantasy-land/filter");
const $0027fantasy$002Dland$002Fmap = string("fantasy-land/map");
const $0027fantasy$002Dland$002Fof = string("fantasy-land/of");
const $0027fantasy$002Dland$002Freduce = string("fantasy-land/reduce");
const $0027filter = string("filter");
const $0027flatMap = string("flatMap");
const $0027floor = string("floor");
const $0027identifier = string("identifier");
const $0027index = string("index");
const $0027isArray = string("isArray");
const $0027join = string("join");
const $0027length = string("length");
const $0027literal = string("literal");
const $0027map = string("map");
const $0027name = string("name");
const $0027null = string("null");
const $0027object = string("object");
const $0027of = string("of");
const $0027parse = string("parse");
const $0027patterns = string("patterns");
const $0027prototype = string("prototype");
const $0027reduce = string("reduce");
const $0027reduceRight = string("reduceRight");
const $0027repeat = string("repeat");
const $0027replace = string("replace");
const $0027replaceAll = string("replaceAll");
const $0027slice = string("slice");
const $0027split = string("split");
const $0027startsWith = string("startsWith");
const $0027tag = string("tag");
const $0027toLowerCase = string("toLowerCase");
const $0027toString = string("toString");
const $0027toUpperCase = string("toUpperCase");
const $0027trim = string("trim");
const $0027trimEnd = string("trimEnd");
const $0027trimStart = string("trimStart");
const $0027type = string("type");
const $0027value = string("value");
const $0027$002F$0027 = infix(EsOperator("/"));
const $0027$0025$0027 = infix(EsOperator("%"));
const $0027$002B$0027 = infix(EsOperator("+"));
const $0027$002D$0027 = infix(EsOperator("-"));
const $0027$003C$0027 = infix(EsOperator("<"));
const $0027$003C$003D$0027 = infix(EsOperator("<="));
const $0027instanceof$0027 = infix(EsOperator("instanceof"));
const $0027$003D$003D$003D$0027 = infix(EsOperator("==="));
const $0027$0021$003D$003D$0027 = infix(EsOperator("!=="));
const $0027$007C$0027 = infix(EsOperator("|"));
const $0027$0026$0026$0027 = infix(EsOperator("&&"));
const $0027$007C$007C$0027 = infix(EsOperator("||"));
const $0027$003D$0027 = AssignmentExpression("=");
const $0027$002B$003D$0027 = AssignmentExpression("+=");
const $0027$002D$003D$0027 = AssignmentExpression("-=");
const $0027$002B$002B$0027 = UpdateExpression(false)("++");
const construct = constructor => arguments$ => call$002A(member$002A($0023globalThis)([$0027Reflect, $0027construct]))([constructor, arguments$]);
const Set = values => construct(member($0023globalThis)($0027Set))(array([values]));
const Map = entries => construct(member($0023globalThis)($0027Map))(array([entries]));
const cond = predicate => consequent => alternative => ConditionalExpression(predicate)(consequent)(Just(alternative));
const defineSwitch = discriminant => transform => default$ => cases => call$002A(ArrowFunctionExpression([])(BlockStatement([SwitchStatement(discriminant)(concat(map(function ([names, expr]) {
  return SwitchCase(map($ => Just(($ => string(transform($)))($)))(splitOn("/")(names)))([ReturnStatement(expr)]);
})(Object.entries(cases)))([SwitchCase([Nothing])([ReturnStatement(default$)])]))])))([]);
const typeSwitch = identifier => defineSwitch(call(member$002A($0023globalThis)([$0027Object, $0027prototype, $0027toString, $0027call]))(identifier))(function (tag) {
  return "[object " + tag + "]";
});
const typeRepSwitch = typeRep => defineSwitch(member(typeRep)($0027name))(id);
const $filter = predicate => xs => call(member(xs)($0027filter))(predicate);
const zero = number(0);
const one = number(1);
const Prelude = {
  null: call(member$002A($0023globalThis)([$0027JSON, $0027parse]))($0027null),
  complement: lambda([$0023rhs])(prefix("~")($0023rhs)),
  instanceof: lambda([$0023constructor, $0023x])($0027instanceof$0027($0023x)($0023constructor)),
  typeof: lambda([$0023x])(cond($0027$003D$003D$003D$0027($0023x)($0023null))($0027null)(prefix("typeof")($0023x))),
  id: lambda([$0023x])($0023x),
  const: lambda([$0023x, $0023y])($0023x),
  not: lambda([$0023x])(prefix("!")($0023x)),
  negate: lambda([$0023x])(prefix("-")($0023x)),
  quot: lambda([$0023lhs, $0023rhs])(cond($0027$003D$003D$003D$0027($0023rhs)(zero))($0023DivisionByZero)($0027$007C$0027($0027$002F$0027($0023lhs)($0023rhs))(zero))),
  rem: lambda([$0023lhs, $0023rhs])(cond($0027$003D$003D$003D$0027($0023rhs)(zero))($0023DivisionByZero)($0027$0025$0027($0023lhs)($0023rhs))),
  div: lambda([$0023lhs, $0023rhs])(cond($0027$003D$003D$003D$0027($0023rhs)(zero))($0023DivisionByZero)(call(member$002A($0023globalThis)([$0027Math, $0027floor]))($0027$002F$0027($0023lhs)($0023rhs)))),
  mod: lambda([$0023lhs, $0023rhs])(cond($0027$003D$003D$003D$0027($0023rhs)(zero))($0023DivisionByZero)($0027$0025$0027($0027$002B$0027($0027$0025$0027($0023lhs)($0023rhs))($0023rhs))($0023rhs))),
  charAt: lambda([$0023index, $0023string])(call(member($0023string)($0027charAt))($0023index)),
  charCodeAt: lambda([$0023index, $0023string])(call(member($0023string)($0027charCodeAt))($0023index)),
  codePointAt: lambda([$0023index, $0023string])(call(member($0023string)($0027codePointAt))($0023index)),
  startsWith: lambda([$0023prefix, $0023string])(call(member($0023string)($0027startsWith))($0023prefix)),
  endsWith: lambda([$0023suffix, $0023string])(call(member($0023string)($0027endsWith))($0023suffix)),
  toLower: lambda([$0023string])(call$002A(member($0023string)($0027toLowerCase))([])),
  toUpper: lambda([$0023string])(call$002A(member($0023string)($0027toUpperCase))([])),
  trim: lambda([$0023string])(call$002A(member($0023string)($0027trim))([])),
  trimStart: lambda([$0023string])(call$002A(member($0023string)($0027trimStart))([])),
  trimEnd: lambda([$0023string])(call$002A(member($0023string)($0027trimEnd))([])),
  repeat: lambda([$0023count, $0023string])(call(member($0023string)($0027repeat))($0023count)),
  replace: lambda([$0023pattern, $0023replacement, $0023string])(call$002A(member($0023string)($0027replace))([$0023pattern, $0023replacement])),
  replaceAll: lambda([$0023pattern, $0023replacement, $0023string])(call$002A(member($0023string)($0027replaceAll))([$0023pattern, $0023replacement])),
  splitOn: lambda([$0023separator, $0023string])(call(member($0023string)($0027split))($0023separator)),
  joinWith: lambda([$0023separator, $0023xs])(call(member($0023xs)($0027join))($0023separator)),
  slice: lambda([$0023from, $0023to, $0023xs])(call$002A(member($0023xs)($0027slice))([$0023from, $0023to])),
  sliceFrom: lambda([$0023from, $0023xs])(call$002A(member($0023xs)($0027slice))([$0023from])),
  sliceTo: lambda([$0023to, $0023xs])(call$002A(member($0023xs)($0027slice))([zero, $0023to])),
  equals: lambda([$0023this, $0023that])(typeSwitch($0023this)($0027$003D$003D$003D$0027($0023this)($0023that))({
    Array: typeSwitch($0023that)(boolean(false))({
      Array: $0027$0026$0026$0027($0027$003D$003D$003D$0027(member($0023this)($0027length))(member($0023that)($0027length)))(call(member($0023this)($0027every))(ArrowFunctionExpression([$0023x, $0023idx])(call(call($0023equals)($0023x))(member($0023that)($0023idx)))))
    }),
    Object: typeSwitch($0023that)(boolean(false))({
      Object: cond($0027$003D$003D$003D$0027(call(ident("typeof"))(member($0023this)($0027fantasy$002Dland$002Fequals)))(StringLiteral("function")))(call(member($0023this)($0027fantasy$002Dland$002Fequals))($0023that))($0027$003D$003D$003D$0027($0023this)($0023that))
    })
  })),
  min: lambda([$0023x, $0023y])(cond($0027$003C$003D$0027($0023x)($0023y))($0023x)($0023y)),
  max: lambda([$0023x, $0023y])(cond($0027$003C$003D$0027($0023x)($0023y))($0023y)($0023x)),
  compose: lambda([$0023f, $0023g])(typeSwitch($0023g)(call(member($0023g)($0027fantasy$002Dland$002Fcompose))($0023f))({
    Function: lambda([$0023x])(call($0023f)(call($0023g)($0023x)))
  })),
  concat: lambda([$0023this, $0023that])(typeSwitch($0023this)(call(member($0023this)($0027fantasy$002Dland$002Fconcat))($0023that))({
    ["Array/String"]: call(member($0023this)($0027concat))($0023that)
  })),
  empty: lambda([$0023typeRep])(typeRepSwitch($0023typeRep)(call$002A(member($0023typeRep)($0027fantasy$002Dland$002Fempty))([]))({
    Array: array([]),
    Object: object([]),
    String: string(""),
    Set: Set(array([])),
    Map: Map(array([]))
  })),
  reduce: lambda([$0023f, $0023y, $0023xs])(typeSwitch($0023xs)(call$002A(member($0023xs)($0027fantasy$002Dland$002Freduce))([ArrowFunctionExpression([$0023y, $0023x])(call(call($0023f)($0023y))($0023x)), $0023y]))({
    Array: call$002A(member($0023xs)($0027reduce))([ArrowFunctionExpression([$0023y, $0023x])(call(call($0023f)($0023y))($0023x)), $0023y])
  })),
  reduceRight: lambda([$0023f, $0023y, $0023x])(call$002A(member($0023x)($0027reduceRight))([ArrowFunctionExpression([$0023y, $0023x])(call(call($0023f)($0023y))($0023x)), $0023y])),
  filter: lambda([$0023f, $0023xs])(typeSwitch($0023xs)(call(member($0023xs)($0027fantasy$002Dland$002Ffilter))($0023f))({
    Array: $filter(lambda([$0023x])(call($0023f)($0023x)))($0023xs),
    Set: Set(call(call($0023filter)($0023f))(array([spread($0023xs)])))
  })),
  reject: lambda([$0023f])(call($0023filter)(lambda([$0023x])(prefix("!")(call($0023f)($0023x))))),
  map: lambda([$0023f, $0023xs])(typeSwitch($0023xs)(call(member($0023xs)($0027fantasy$002Dland$002Fmap))($0023f))({
    Array: call(member($0023xs)($0027map))(lambda([$0023x])(call($0023f)($0023x)))
  })),
  flip: lambda([$0023f, $0023y, $0023x])(call(call($0023f)($0023x))($0023y)),
  pure: lambda([$0023typeRep])(typeRepSwitch($0023typeRep)(member($0023typeRep)($0027fantasy$002Dland$002Fof))({
    Array: member$002A($0023globalThis)([$0027Array, $0027of]),
    Function: lambda([$0023x, $0023y])($0023x),
    Set: lambda([$0023x])(Set(array([$0023x])))
  })),
  ap: lambda([$0023lhs, $0023rhs])(typeSwitch($0023lhs)(call(member($0023rhs)($0027fantasy$002Dland$002Fap))($0023lhs))({
    Array: call(member($0023lhs)($0027flatMap))(lambda([$0023f])(call(member($0023rhs)($0027map))(lambda([$0023x])(call($0023f)($0023x)))))
  })),
  append: lambda([$0023x, $0023xs])(call(call($0023concat)($0023xs))(call(call($0023pure)(member($0023xs)($0027constructor)))($0023x))),
  prepend: lambda([$0023x, $0023xs])(call(call($0023concat)(call(call($0023pure)(member($0023xs)($0027constructor)))($0023x)))($0023xs)),
  chain: lambda([$0023f, $0023x])(typeSwitch($0023x)(call(member($0023x)($0027fantasy$002Dland$002Fchain))($0023f))({
    Array: call(member($0023x)($0027flatMap))(lambda([$0023x])(call($0023f)($0023x))),
    Function: lambda([$0023y])(call(call($0023x)(call($0023f)($0023y)))($0023y))
  })),
  join: call($0023chain)($0023id),
  contains: lambda([$0023this, $0023these])(call(call(call($0023reduce)(lambda([$0023x, $0023that])($0027$007C$007C$0027($0023x)(call(call($0023equals)($0023this))($0023that)))))(boolean(false)))($0023these)),
  match: lambda([$0023pattern, $0023value])(BlockStatement([SwitchStatement(member($0023pattern)($0027type))([SwitchCase([Just($0027any)])([ReturnStatement(ObjectExpression([]))]), SwitchCase([Just($0027identifier)])([ReturnStatement(ObjectExpression([Property(member($0023pattern)($0027name))($0023value)]))]), SwitchCase([Just($0027literal)])([IfStatement(call(call($0023equals)(member($0023pattern)($0027value)))($0023value))(ReturnStatement(ObjectExpression([]))), ReturnStatement($0023null)]), SwitchCase([Just($0027data)])([IfStatement($0027$0026$0026$0027($0027$0026$0026$0027($0027$003D$003D$003D$0027(call($0023typeof)($0023value))($0027object))($0027$003D$003D$003D$0027(member($0023value)($0027$tag))(member($0023pattern)($0027tag))))($0027$003D$003D$003D$0027(member(member($0023value)($0027$values))($0027length))(member(member($0023pattern)($0027patterns))($0027length))))(BlockStatement([VariableDeclaration($0023context)(ObjectExpression([])), ForStatement(LetDeclaration($0023index)(zero))($0027$003C$0027($0023index)(member(member($0023pattern)($0027patterns))($0027length)))($0027$002B$003D$0027($0023index)(one))(BlockStatement([VariableDeclaration($0023fragment)(call(call($0023match)(member(member($0023pattern)($0027patterns))($0023index)))(member(member($0023value)($0027$values))($0023index))), IfStatement($0027$003D$003D$003D$0027($0023fragment)($0023null))(ReturnStatement($0023null)), ExpressionStatement(call$002A(member(member($0023globalThis)($0027Object))($0027assign))([$0023context, $0023fragment]))])), ReturnStatement($0023context)])), ReturnStatement($0023null)]), SwitchCase([Just($0027array)])([IfStatement(call(member(member($0023globalThis)($0027Array))($0027isArray))($0023value))(BlockStatement([VariableDeclaration($0023patterns)(member($0023pattern)($0027patterns)), VariableDeclaration($0023lengths)(ArrayExpression([])), LetDeclaration($0023slices)(zero), ForStatement(LetDeclaration($0023index)(zero))($0027$003C$0027($0023index)(member($0023patterns)($0027length)))($0027$002B$003D$0027($0023index)(one))(BlockStatement([IfStatement($0027$003D$003D$003D$0027(member(member($0023patterns)($0023index))($0027type))($0027slice))(BlockStatement([ExpressionStatement($0027$003D$0027(member($0023lengths)($0027$003D$0027(member(member($0023patterns)($0023index))($0027index))($0023slices)))(zero)), ExpressionStatement($0027$002B$003D$0027($0023slices)(one))]))])), IfStatement($0027$003D$003D$003D$0027($0023slices)(zero))(BlockStatement([IfStatement($0027$0021$003D$003D$0027(member($0023value)($0027length))(member($0023patterns)($0027length)))(ReturnStatement($0023null)), VariableDeclaration($0023context)(ObjectExpression([])), ForStatement(LetDeclaration($0023index)(zero))($0027$003C$0027($0023index)(member($0023value)($0027length)))($0027$002B$003D$0027($0023index)(one))(BlockStatement([VariableDeclaration($0023fragment)(call(call($0023match)(member($0023patterns)($0023index)))(member($0023value)($0023index))), IfStatement($0027$003D$003D$003D$0027($0023fragment)($0023null))(ReturnStatement($0023null)), ExpressionStatement(call$002A(member(member($0023globalThis)($0027Object))($0027assign))([$0023context, $0023fragment]))])), ReturnStatement($0023context)])), VariableDeclaration($0023min)($0027$002D$0027(member($0023patterns)($0027length))($0023slices)), IfStatement($0027$003C$0027(member($0023value)($0027length))($0023min))(ReturnStatement($0023null)), VariableDeclaration($0023lastIndex)($0027$002D$0027($0023slices)(one)), ExpressionStatement($0027$003D$0027(member($0023lengths)($0023lastIndex))($0027$002D$0027(member($0023value)($0027length))($0023min))), VariableDeclaration($0023fragments)(call(member($0023globalThis)($0027Array))(member($0023patterns)($0027length))), WhileStatement(boolean(true))(BlockStatement([LetDeclaration($0023index)(zero), LetDeclaration($0023valid)(boolean(true)), ForStatement(LetDeclaration($0023patternIndex)(zero))($0027$003C$0027($0023patternIndex)(member($0023fragments)($0027length)))($0027$002B$003D$0027($0023patternIndex)(one))(BlockStatement([VariableDeclaration($0023pattern)(member($0023patterns)($0023patternIndex)), VariableDeclaration($0023fragment)(cond($0027$003D$003D$003D$0027(member($0023pattern)($0027type))($0027slice))(call(call($0023match)(ObjectExpression([Property($0027type)($0027identifier), Property($0027name)(member($0023pattern)($0027name))])))(call$002A(member($0023value)($0027slice))([$0023index, $0027$002B$003D$0027($0023index)(member($0023lengths)(member($0023pattern)($0027index)))])))(call(call($0023match)($0023pattern))(member($0023value)($0027$002B$002B$0027($0023index))))), IfStatement($0027$003D$003D$003D$0027($0023fragment)($0023null))(BlockStatement([ExpressionStatement($0027$003D$0027($0023valid)(boolean(false))), BreakStatement])), ExpressionStatement($0027$003D$0027(member($0023fragments)($0023patternIndex))($0023fragment))])), IfStatement($0023valid)(ReturnStatement(call$002A(member(member($0023globalThis)($0027Object))($0027assign))([ObjectExpression([]), spread($0023fragments)]))), ExpressionStatement($0027$003D$0027($0023index)($0023lastIndex)), WhileStatement($0027$003D$003D$003D$0027(member($0023lengths)($0023index))(zero))(ExpressionStatement($0027$002D$003D$0027($0023index)(one))), IfStatement($0027$003D$003D$003D$0027($0023index)(zero))(ReturnStatement($0023null)), ExpressionStatement($0027$002B$003D$0027(member($0023lengths)($0027$002D$0027($0023index)(one)))(one)), WhileStatement($0027$003C$0027($0023index)($0023lastIndex))(ExpressionStatement($0027$003D$0027(member($0023lengths)($0027$002B$002B$0027($0023index)))(zero))), ExpressionStatement($0027$003D$0027(member($0023lengths)($0023lastIndex))($0027$002D$0027(member($0023value)($0027length))($0023min))), ExpressionStatement($0027$003D$0027($0023index)(zero)), WhileStatement($0027$003C$0027($0023index)($0023lastIndex))(ExpressionStatement($0027$002D$003D$0027(member($0023lengths)($0023lastIndex))(member($0023lengths)($0027$002B$002B$0027($0023index)))))]))])), ReturnStatement($0023null)])])]))
};
export default Prelude;
