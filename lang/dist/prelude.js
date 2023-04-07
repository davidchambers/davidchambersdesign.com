import {Nothing, Just} from "./Maybe.js";
import {ArrayExpression, ArrowFunctionExpression, BinaryExpression, BooleanLiteral, CallExpression, ConditionalExpression, Identifier, LogicalExpression, MemberExpression, NullLiteral, NumberLiteral, ObjectExpression, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, UnaryExpression} from "./Node.js";
const $0023CasesNotExhaustive = Identifier("CasesNotExhaustive");
const $0023DivisionByZero = Identifier("DivisionByZero");
const $0023args = Identifier("args");
const $0023chain = Identifier("chain");
const $0023constructor = Identifier("constructor");
const $0023equals = Identifier("equals");
const $0023f = Identifier("f");
const $0023filter = Identifier("filter");
const $0023globalThis = Identifier("globalThis");
const $0023id = Identifier("id");
const $0023idx = Identifier("idx");
const $0023lhs = Identifier("lhs");
const $0023match$0027 = Identifier("match'");
const $0023reduce = Identifier("reduce");
const $0023rhs = Identifier("rhs");
const $0023that = Identifier("that");
const $0023these = Identifier("these");
const $0023this = Identifier("this");
const $0023type = Identifier("type");
const $0023typeRep = Identifier("typeRep");
const $0023x = Identifier("x");
const $0023y = Identifier("y");
const $0023Array = MemberExpression($0023globalThis)(StringLiteral("Array"));
const $0023Math = MemberExpression($0023globalThis)(StringLiteral("Math"));
const $0023Object = MemberExpression($0023globalThis)(StringLiteral("Object"));
const $0023Reflect = MemberExpression($0023globalThis)(StringLiteral("Reflect"));
const $0023Set = MemberExpression($0023globalThis)(StringLiteral("Set"));
const $0023Symbol = MemberExpression($0023globalThis)(StringLiteral("Symbol"));
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
  XOR: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([ArrayExpression([SpreadElement(CallExpression(MemberExpression(ArrayExpression([SpreadElement($0023lhs)]))($0027filter))([ArrowFunctionExpression([$0023x])(UnaryExpression("!")(CallExpression(MemberExpression($0023rhs)($0027has))([$0023x])))])), SpreadElement(CallExpression(MemberExpression(ArrayExpression([SpreadElement($0023rhs)]))($0027filter))([ArrowFunctionExpression([$0023x])(UnaryExpression("!")(CallExpression(MemberExpression($0023lhs)($0027has))([$0023x])))]))])])])), SwitchCase([Nothing])(BinaryExpression("^")($0023lhs)($0023rhs))]))),
  OR: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([ArrayExpression([SpreadElement($0023lhs), SpreadElement($0023rhs)])])])), SwitchCase([Nothing])(BinaryExpression("|")($0023lhs)($0023rhs))]))),
  AND: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([CallExpression(MemberExpression(ArrayExpression([SpreadElement($0023lhs)]))($0027filter))([ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023rhs)($0027has))([$0023x]))])])])), SwitchCase([Nothing])(BinaryExpression("&")($0023lhs)($0023rhs))]))),
  subtract: ArrowFunctionExpression([$0023rhs])(ArrowFunctionExpression([$0023lhs])(SwitchExpression(Object$0023toString($0023rhs))([SwitchCase([Just(StringLiteral("[object Set]"))])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023Set, ArrayExpression([CallExpression(MemberExpression(ArrayExpression([SpreadElement($0023lhs)]))($0027filter))([ArrowFunctionExpression([$0023x])(UnaryExpression("!")(CallExpression(MemberExpression($0023rhs)($0027has))([$0023x])))])])])), SwitchCase([Nothing])(BinaryExpression("-")($0023lhs)($0023rhs))]))),
  construct: ArrowFunctionExpression([$0023constructor])(ArrowFunctionExpression([$0023args])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023constructor, $0023args]))),
  instanceof: ArrowFunctionExpression([$0023constructor])(ArrowFunctionExpression([$0023x])(BinaryExpression("instanceof")($0023x)($0023constructor))),
  typeof: ArrowFunctionExpression([$0023x])(ConditionalExpression(BinaryExpression("===")($0023x)(NullLiteral))($0027null)(Just(UnaryExpression("typeof")($0023x)))),
  match: ArrowFunctionExpression([$0023type])(CallExpression(CallExpression($0023match$0027)([$0023type]))([ArrowFunctionExpression([$0023x])($0023CasesNotExhaustive)])),
  ["match'"]: ArrowFunctionExpression([$0023type])(MemberExpression($0023type)(CallExpression(MemberExpression($0023Symbol)($0027for))([$0027match]))),
  id: ArrowFunctionExpression([$0023x])($0023x),
  const: ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023y])($0023x)),
  not: ArrowFunctionExpression([$0023x])(UnaryExpression("!")($0023x)),
  quot: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(BinaryExpression("|")(BinaryExpression("/")($0023lhs)($0023rhs))(NumberLiteral(0)))))),
  rem: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(BinaryExpression("%")($0023lhs)($0023rhs))))),
  div: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(CallExpression(MemberExpression($0023Math)($0027floor))([BinaryExpression("/")($0023lhs)($0023rhs)]))))),
  mod: ArrowFunctionExpression([$0023lhs])(ArrowFunctionExpression([$0023rhs])(ConditionalExpression(BinaryExpression("===")($0023rhs)(NumberLiteral(0)))($0023DivisionByZero)(Just(BinaryExpression("%")(BinaryExpression("+")(BinaryExpression("%")($0023lhs)($0023rhs))($0023rhs))($0023rhs))))),
  equals: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023that])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023this]))(BinaryExpression("&&")(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023that]))(BinaryExpression("&&")(BinaryExpression("===")(MemberExpression($0023this)($0027length))(MemberExpression($0023that)($0027length)))(CallExpression(MemberExpression($0023this)($0027every))([ArrowFunctionExpression([$0023x, $0023idx])(CallExpression(CallExpression($0023equals)([$0023x]))([MemberExpression($0023that)($0023idx)]))]))))(Just(BinaryExpression("===")($0023this)($0023that))))),
  concat: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023that])(ConditionalExpression(LogicalExpression("or")(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023this]))(BinaryExpression("===")(UnaryExpression("typeof")($0023this))($0027string)))(CallExpression(MemberExpression($0023this)($0027concat))([$0023that]))(Just(CallExpression(MemberExpression($0023this)($0027fantasy$002Dland$002Fconcat))([$0023that]))))),
  empty: ArrowFunctionExpression([$0023typeRep])(SwitchExpression(MemberExpression($0023typeRep)($0027name))([SwitchCase([Just($0027Array)])(ArrayExpression([])), SwitchCase([Just($0027Object)])(ObjectExpression([])), SwitchCase([Just($0027String)])(StringLiteral("")), SwitchCase([Just($0027Set), Just($0027Map)])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023typeRep, ArrayExpression([ArrayExpression([])])])), SwitchCase([Nothing])(CallExpression(MemberExpression($0023typeRep)($0027fantasy$002Dland$002Fempty))([]))])),
  reduce: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023x)(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))($0027reduce)(Just($0027fantasy$002Dland$002Freduce))))([ArrowFunctionExpression([$0023y, $0023x])(CallExpression(CallExpression($0023f)([$0023y]))([$0023x])), $0023y])))),
  reduceRight: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023x)($0027reduceRight))([ArrowFunctionExpression([$0023y, $0023x])(CallExpression(CallExpression($0023f)([$0023y]))([$0023x])), $0023y])))),
  filter: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027filter))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(Just(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Ffilter))([$0023f]))))),
  reject: ArrowFunctionExpression([$0023f])(CallExpression($0023filter)([ArrowFunctionExpression([$0023x])(UnaryExpression("!")(CallExpression($0023f)([$0023x])))])),
  map: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(ConditionalExpression(CallExpression(MemberExpression($0023Array)($0027isArray))([$0023x]))(CallExpression(MemberExpression($0023x)($0027map))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))]))(Just(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Fmap))([$0023f]))))),
  flip: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023y])(ArrowFunctionExpression([$0023x])(CallExpression(CallExpression($0023f)([$0023x]))([$0023y])))),
  of: ArrowFunctionExpression([$0023typeRep])(SwitchExpression(MemberExpression($0023typeRep)($0027name))([SwitchCase([Just($0027Array)])(MemberExpression($0023Array)($0027of)), SwitchCase([Just($0027Function)])(ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023y])($0023x))), SwitchCase([Just($0027Set)])(ArrowFunctionExpression([$0023x])(CallExpression(MemberExpression($0023Reflect)($0027construct))([$0023typeRep, ArrayExpression([ArrayExpression([$0023x])])]))), SwitchCase([Nothing])(MemberExpression($0023typeRep)($0027fantasy$002Dland$002Fof))])),
  chain: ArrowFunctionExpression([$0023f])(ArrowFunctionExpression([$0023x])(SwitchExpression(Object$0023toString($0023x))([SwitchCase([Just(StringLiteral("[object Array]"))])(CallExpression(MemberExpression($0023x)($0027flatMap))([ArrowFunctionExpression([$0023x])(CallExpression($0023f)([$0023x]))])), SwitchCase([Just(StringLiteral("[object Function]"))])(ArrowFunctionExpression([$0023y])(CallExpression(CallExpression($0023x)([CallExpression($0023f)([$0023y])]))([$0023y]))), SwitchCase([Nothing])(CallExpression(MemberExpression($0023x)($0027fantasy$002Dland$002Fchain))([$0023f]))]))),
  join: CallExpression($0023chain)([$0023id]),
  contains: ArrowFunctionExpression([$0023this])(ArrowFunctionExpression([$0023these])(CallExpression(CallExpression(CallExpression($0023reduce)([ArrowFunctionExpression([$0023x])(ArrowFunctionExpression([$0023that])(LogicalExpression("or")($0023x)(CallExpression(CallExpression($0023equals)([$0023this]))([$0023that]))))]))([BooleanLiteral(false)]))([$0023these])))
};
export default Prelude;
