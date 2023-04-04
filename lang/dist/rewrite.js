import * as Future from "fluture";
import Maybe from "./Maybe.js";
import Node from "./Node.js";
import * as format from "./format.js";
import globals from "./globals.js";
import Prelude from "./prelude.js";
const XOR = rhs => lhs => (() => {
  switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
    default:
      return lhs ^ rhs;
  }
})();
const OR = rhs => lhs => (() => {
  switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
    default:
      return lhs | rhs;
  }
})();
const subtract = rhs => lhs => (() => {
  switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
    default:
      return lhs - rhs;
  }
})();
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const match = type => match$0027(type)(x => CasesNotExhaustive);
const match$0027 = type => type[globalThis.Symbol.for("match")];
const id = x => x;
const const$ = x => y => x;
const equals = this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that;
const concat = this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that);
const empty = typeRep => (() => {
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
})();
const reduce = f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y);
const reduceRight = f => y => x => x.reduceRight((y, x) => f(y)(x), y);
const filter = f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f);
const reject = f => filter(x => !f(x));
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const flip = f => y => x => f(x)(y);
const of = typeRep => (() => {
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
})();
const chain = f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f);
const {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MemberExpression, Identifier, SpreadElement, ArrayExpression, Elision, Property, ObjectExpression, ArrayPattern, ObjectPattern, RestElement, ArrowFunctionExpression, BlockExpression, BlockStatement, UnaryExpression, CompositionExpression, BinaryExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, CallExpression, ImportDeclaration, ImportSpecifier, ImportDefaultSpecifier, ImportNamespaceSpecifier, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} = Node;
const preludeNames = construct(Set)([Object.keys(Prelude)]);
const variables = declared => referenced => ({
  declared,
  referenced
});
const declaring = names => variables(names)(empty(Set));
const referencing = names => variables(empty(Set))(names);
const emptyVariables = variables(empty(Set))(empty(Set));
const referenced = $ => $.referenced;
const merge = lhs => rhs => ({
  declared: OR(rhs.declared)(lhs.declared),
  referenced: OR(rhs.referenced)(lhs.referenced)
});
const mergeAll = reduce(merge)(emptyVariables);
const vars = node => flip(match$0027(Node)(const$(emptyVariables)))(node)({
  TemplateLiteral: const$($ => mergeAll(map(vars)($))),
  MemberExpression: object => property => merge(vars(object))(vars(property)),
  Identifier: $ => referencing(of(Set)($)),
  SpreadElement: vars,
  ArrayExpression: $ => mergeAll(map(vars)($)),
  Property: key => value => merge(vars(key))(vars(value)),
  ObjectExpression: $ => mergeAll(map(vars)($)),
  ArrayPattern: $ => mergeAll(map(vars)($)),
  ObjectPattern: $ => mergeAll(map(vars)($)),
  RestElement: vars,
  ArrowFunctionExpression: parameters => body => referencing(subtract(referenced(mergeAll(map(vars)(parameters))))(referenced(vars(body)))),
  BlockExpression: statements => result => (() => {
    const {declared, referenced} = reduce(merge)(vars(result))(map(vars)(statements));
    return referencing(subtract(declared)(referenced));
  })(),
  BlockStatement: statements => (() => {
    const {declared, referenced} = mergeAll(map(vars)(statements));
    return referencing(subtract(declared)(referenced));
  })(),
  DoBlockExpression: operations => result => referencing(reduceRight(names => match(Node)({
    FunctionDeclaration: name => parameters => body => OR(subtract(referenced(mergeAll(map(vars)(parameters))))(referenced(vars(body))))(names),
    VariableDeclaration: pattern => expression => OR(referenced(vars(expression)))(subtract(names)(referenced(vars(pattern)))),
    ArrowAssignmentStatement: pattern => expression => OR(referenced(vars(expression)))(subtract(names)(referenced(vars(pattern)))),
    ExpressionStatement: expression => OR(referenced(vars(expression)))(names)
  }))(referenced(vars(result)))(operations)),
  UnaryExpression: const$(vars),
  CompositionExpression: left => right => merge(vars(left))(vars(right)),
  InfixCallExpression: operator => left => right => merge(merge(vars(operator))(vars(left)))(vars(right)),
  BinaryExpression: operator => left => right => merge(vars(left))(vars(right)),
  ConcatenationExpression: left => right => merge(vars(left))(vars(right)),
  MapExpression: left => right => merge(vars(left))(vars(right)),
  BindExpression: left => right => merge(vars(left))(vars(right)),
  LogicalExpression: operator => left => right => merge(vars(left))(vars(right)),
  ConditionalExpression: predicate => consequent => alternative => merge(merge(vars(predicate))(vars(consequent)))(Maybe.maybe(emptyVariables)(vars)(alternative)),
  SwitchExpression: discriminant => cases => mergeAll(map(vars)([discriminant, ...cases])),
  SwitchCase: predicates => consequent => mergeAll(map(vars)([...predicates, consequent])),
  PipeExpression: head => body => merge(vars(head))(vars(body)),
  CallExpression: callee => arguments$ => mergeAll(map(vars)([callee, ...arguments$])),
  ImportDeclaration: const$($ => mergeAll(map(vars)($))),
  ImportAllDeclaration: const$(const$(emptyVariables)),
  ImportDefaultSpecifier: $ => declaring(referenced(vars($))),
  ImportSpecifier: const$($ => declaring(referenced(vars($)))),
  ImportNamespaceSpecifier: $ => declaring(referenced(vars($))),
  ExportNamedDeclaration: $ => mergeAll(map(vars)($)),
  ExportDefaultDeclaration: vars,
  ExportSpecifier: $ => const$(vars($)),
  VariableDeclaration: pattern => expression => (() => {
    const declared = referenced(vars(pattern));
    return variables(declared)(subtract(declared)(referenced(vars(expression))));
  })(),
  FunctionDeclaration: name => parameters => body => (() => {
    const declared = of(Set)(name);
    return variables(declared)(subtract(declared)(subtract(referenced(mergeAll(map(vars)(parameters))))(referenced(vars(body)))));
  })(),
  ExpressionStatement: vars,
  Module: imports => exports => statements => mergeAll(map(vars)(concat(imports)(concat(exports)(statements)))),
  DataTypeDeclaration: $ => const$(declaring(of(Set)($)))
});
const removeUnreferencedPreludeFunctions = module => (() => {
  const {declared, referenced} = vars(module);
  const unreferenced = subtract(referenced)(declared);
  const unnecessary = XOR(preludeNames)(unreferenced);
  const statements = reject(match$0027(Node)(const$(false))({
    VariableDeclaration: ({name}) => _ => unnecessary.has(name)
  }))(module.statements);
  return equals(module.statements.length)(statements.length) ? module : removeUnreferencedPreludeFunctions(Module(module.imports)(module.exports)(statements));
})();
const rewriteModule = module => namesExportedFrom => (() => {
  const {declared, referenced} = vars(module);
  const undeclared = subtract(declared)(referenced);
  const imports = Future.parallel(16)(map(rewriteImportDeclaration(undeclared)(namesExportedFrom))(module.imports));
  const withImports = module => (() => {
    const module$0027 = rewriteNode(module);
    const rename = reduce(rename => match(Node)({
      DataTypeDeclaration: const$(const$(rename)),
      VariableDeclaration: pattern => expression => updateRenamerFromPattern(rename)(pattern),
      FunctionDeclaration: name => parameters => body => updateRenamerFromPattern(rename)(Identifier(name)),
      ExpressionStatement: const$(rename)
    }))(id)(module$0027.statements);
    const rename$0027 = reduce(rename => match(Node)({
      ImportSpecifier: imported => local => name => equals(imported.name)(name) ? local.name : rename(name),
      ImportNamespaceSpecifier: updateRenamerFromPattern(rename),
      ImportDefaultSpecifier: updateRenamerFromPattern(rename)
    }))(rename)(chain($ => $.specifiers)(module$0027.imports));
    const {imports, exports, statements} = renameIdentifiers(rename$0027)(module$0027);
    const prelude = map(([name, value]) => VariableDeclaration(Identifier(name))(value))(Object.entries(Prelude));
    const module$0027$0027 = removeUnreferencedPreludeFunctions(Module(imports)(exports)(concat(prelude)(statements)));
    const {declared, referenced} = vars(module$0027$0027);
    const unreferenced = subtract(referenced)(declared);
    const undeclared = subtract(construct(Set)([["CasesNotExhaustive", "DivisionByZero", "import", "console", "fetch"]]))(subtract(globals)(subtract(declared)(referenced)));
    unreferenced.size > 0 ? console.error(concat("unreferenced: ")((args => target => target.join.apply(target, args))([", "])(Array.from(unreferenced)))) : undefined;
    undeclared.size > 0 ? console.error(concat("undeclared: ")((args => target => target.join.apply(target, args))([", "])(Array.from(undeclared)))) : undefined;
    return module$0027$0027;
  })();
  return map(imports => withImports(Module(imports)(module.exports)(module.statements)))(imports);
})();
const rewriteImportAllDeclaration = undeclared => namesExportedFrom => source => hiding => (() => {
  const namesExported = construct(Set)([(args => target => target.endsWith.apply(target, args))([".serif"])(source.value) ? namesExportedFrom(source.value) : map(Object.keys)(Future.attemptP(() => import(source.value)))]);
  const namesHidden = construct(Set)([map($ => $.name)(hiding)]);
  const namesHiddenNeedlessly = subtract(namesExported)(namesHidden);
  return namesHiddenNeedlessly.size > 0 ? Future.reject(Error(`import * from "${source.value}" hiding {${(args => target => target.join.apply(target, args))([", "])(namesHidden)}};\n\n${format.list(Array.from(namesHiddenNeedlessly))} ${equals(1)(namesHiddenNeedlessly.size) ? "is" : "are"} not exported so need not be hidden.\n`)) : Future.resolve(ImportDeclaration(source)(map(name => ImportSpecifier(Identifier(name))(Identifier(preludeNames.has(name) ? "$" + name : name)))(Array.from(XOR(undeclared)(subtract(namesHidden)(namesExported))))));
})();
const rewriteImportDeclaration = undeclared => namesExportedFrom => match(Node)({
  ImportDeclaration: source => specifiers => Future.resolve(ImportDeclaration(source)(specifiers)),
  ImportAllDeclaration: rewriteImportAllDeclaration(undeclared)(namesExportedFrom)
});
const $0023Object = Identifier("Object");
const $0023Symbol = Identifier("Symbol");
const $0023args = Identifier("args");
const $0023cases = Identifier("cases");
const $0023default = Identifier("default");
const $0023dollar = Identifier("$");
const $0023target = Identifier("target");
const $0027apply = StringLiteral("apply");
const $0027for = StringLiteral("for");
const $0027has = StringLiteral("has");
const $0027hasOwn = StringLiteral("hasOwn");
const $0027match = StringLiteral("match");
const $0027tag = StringLiteral("tag");
const rewriteNode = node => flip(match$0027(Node)(id))(node)({
  TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(map(rewriteNode)(expressions)),
  MemberExpression: object => property => MemberExpression(rewriteNode(object))(rewriteNode(property)),
  ArrayExpression: $ => ArrayExpression(map(rewriteNode)($)),
  ObjectExpression: $ => ObjectExpression(map(rewriteNode)($)),
  ArrowFunctionExpression: parameters => body => ArrowFunctionExpression(map(rewriteNode)(parameters))(rewriteNode(body)),
  PropertyAccessor: ({name}) => rewriteNode(ArrowFunctionExpression([$0023dollar])(MemberExpression($0023dollar)(StringLiteral(name)))),
  BlockExpression: statements => result => equals([])(statements) ? rewriteNode(result) : BlockExpression(map(rewriteNode)(statements))(rewriteNode(result)),
  BlockStatement: $ => BlockStatement(map(rewriteNode)($)),
  DoBlockExpression: operations => result => rewriteNode(reduceRight(result => match(Node)({
    ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(Identifier("chain"))([ArrowFunctionExpression([pattern])(result)]))([expression]),
    VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
    FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)]),
    ExpressionStatement: expression => BlockExpression([ExpressionStatement(expression)])(result)
  }))(result)(operations)),
  UnaryExpression: operator => $ => UnaryExpression(operator)(rewriteNode($)),
  CompositionExpression: left => right => (() => {
    const recur = match$0027(Node)(flip(CallExpression)([$0023dollar]))({
      CompositionExpression: left => right => CallExpression(left)([recur(right)])
    });
    return rewriteNode(ArrowFunctionExpression([$0023dollar])(recur(CompositionExpression(left)(right))));
  })(),
  InfixCallExpression: operator => left => right => rewriteNode(CallExpression(CallExpression(operator)([left]))([right])),
  BinaryExpression: operator => left => right => (() => {
    switch (operator) {
      case "==":
        return rewriteNode(CallExpression(CallExpression(Identifier("equals"))([right]))([left]));
      case "!=":
        return rewriteNode(CallExpression(Identifier("not"))([BinaryExpression("==")(left)(right)]));
      case "has":
        return rewriteNode(CallExpression(MemberExpression(left)($0027has))([right]));
      case "in":
        return rewriteNode(CallExpression(CallExpression(Identifier("contains"))([left]))([right]));
      case "^":
        return rewriteNode(CallExpression(CallExpression(Identifier("XOR"))([right]))([left]));
      case "|":
        return rewriteNode(CallExpression(CallExpression(Identifier("OR"))([right]))([left]));
      case "-":
        return rewriteNode(CallExpression(CallExpression(Identifier("subtract"))([right]))([left]));
      default:
        return BinaryExpression(operator)(rewriteNode(left))(rewriteNode(right));
    }
  })(),
  ConcatenationExpression: left => right => rewriteNode(CallExpression(CallExpression(Identifier("concat"))([left]))([right])),
  MapExpression: left => right => rewriteNode(CallExpression(CallExpression(Identifier("map"))([left]))([right])),
  BindExpression: left => right => rewriteNode(CallExpression(CallExpression(Identifier("chain"))([right]))([left])),
  LogicalExpression: operator => left => right => LogicalExpression(operator)(rewriteNode(left))(rewriteNode(right)),
  ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(rewriteNode(predicate))(rewriteNode(consequent))(map(rewriteNode)(alternative)),
  SwitchExpression: discriminant => cases => SwitchExpression(rewriteNode(discriminant))(map(rewriteNode)(cases)),
  SwitchCase: predicates => consequent => SwitchCase(map(map(rewriteNode))(predicates))(rewriteNode(consequent)),
  PipeExpression: head => body => rewriteNode(CallExpression(body)([head])),
  MethodCallExpression: name => rewriteNode(ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression(MemberExpression($0023target)(StringLiteral(name)))($0027apply))([$0023target, $0023args])))),
  CallExpression: callee => $ => CallExpression(rewriteNode(callee))(map(rewriteNode)($)),
  VariableDeclaration: pattern => $ => VariableDeclaration(rewriteNode(pattern))(rewriteNode($)),
  FunctionDeclaration: name => parameters => $ => FunctionDeclaration(name)(map(rewriteNode)(parameters))(rewriteNode($)),
  ExpressionStatement: $ => ExpressionStatement(rewriteNode($)),
  ArrayPattern: $ => ArrayPattern(map(rewriteNode)($)),
  ObjectPattern: $ => ObjectPattern(map(rewriteNode)($)),
  SpreadElement: $ => SpreadElement(rewriteNode($)),
  RestElement: $ => RestElement(rewriteNode($)),
  Property: key => value => Property(rewriteNode(key))(rewriteNode(value)),
  ExportDefaultDeclaration: $ => ExportDefaultDeclaration(rewriteNode($)),
  DataTypeDeclaration: name => constructors => (() => {
    const $0040tag = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027tag]);
    const $0040match = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027match]);
    return rewriteNode(VariableDeclaration(Identifier(name))(ObjectExpression(concat([Property($0040match)((() => {
      const $0023member = Identifier((args => target => target.replace.apply(target, args))([RegExp("^."), (args => target => target.toLowerCase.apply(target, args))([])])(name));
      const case$ = ({name, parameters}) => SwitchCase([Maybe.Just(StringLiteral(name))])(reduce(callee => name => CallExpression(callee)([MemberExpression($0023member)(StringLiteral(name))]))(MemberExpression($0023cases)(StringLiteral(name)))(parameters));
      return ArrowFunctionExpression([$0023default])(ArrowFunctionExpression([$0023cases])(ArrowFunctionExpression([$0023member])(ConditionalExpression(CallExpression(MemberExpression($0023Object)($0027hasOwn))([$0023cases, MemberExpression($0023member)($0040tag)]))(SwitchExpression(MemberExpression($0023member)($0040tag))(map(case$)(constructors)))(Maybe.Just(CallExpression($0023default)([$0023member]))))));
    })())])(map(({name, parameters}) => Property(StringLiteral(name))(reduceRight(body => parameter => ArrowFunctionExpression([Identifier(parameter)])(body))(ObjectExpression(concat([Property($0040tag)(StringLiteral(name))])(map(name => Property(StringLiteral(name))(Identifier(name)))(parameters))))(parameters)))(constructors)))));
  })(),
  Module: imports => exports => statements => Module(map(rewriteNode)(imports))(map(rewriteNode)(exports))(map(rewriteNode)(statements))
});
const updateRenamerFromPattern = rename => node => flip(match(Node))(node)({
  Identifier: name => preludeNames.has(name) ? this$ => equals(name)(this$) ? "$" + this$ : rename(this$) : rename,
  ArrayPattern: reduce(updateRenamerFromPattern)(rename),
  ObjectPattern: reduce(updateRenamerFromPattern)(rename),
  Property: const$(updateRenamerFromPattern(rename)),
  RestElement: updateRenamerFromPattern(rename),
  Elision: rename
});
const renameIdentifiers = rename => (() => {
  const recur = node => flip(match(Node))(node)({
    Identifier: $ => Identifier(rename($)),
    FunctionDeclaration: name => parameters => $ => FunctionDeclaration(rename(name))(map(recur)(parameters))(recur($)),
    ArrayExpression: $ => ArrayExpression(map(recur)($)),
    ArrayPattern: $ => ArrayPattern(map(recur)($)),
    ArrowFunctionExpression: parameters => $ => ArrowFunctionExpression(map(recur)(parameters))(recur($)),
    BinaryExpression: operator => left => right => BinaryExpression(operator)(recur(left))(recur(right)),
    BlockExpression: statements => $ => BlockExpression(map(recur)(statements))(recur($)),
    BlockStatement: $ => BlockStatement(map(recur)($)),
    BooleanLiteral,
    CallExpression: callee => arguments$ => CallExpression(recur(callee))(map(recur)(arguments$)),
    ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(recur(predicate))(recur(consequent))(map(recur)(alternative)),
    Elision,
    ExportDefaultDeclaration: $ => ExportDefaultDeclaration(recur($)),
    ExportNamedDeclaration: $ => ExportNamedDeclaration(map(recur)($)),
    ExportSpecifier: $ => ExportSpecifier(recur($)),
    ExpressionStatement: $ => ExpressionStatement(recur($)),
    ImportDeclaration: source => $ => ImportDeclaration(source)(map(recur)($)),
    ImportDefaultSpecifier: $ => ImportDefaultSpecifier(recur($)),
    ImportNamespaceSpecifier: $ => ImportNamespaceSpecifier(recur($)),
    ImportSpecifier: imported => $ => ImportSpecifier(imported)(recur($)),
    LogicalExpression: operator => left => right => LogicalExpression(operator)(recur(left))(recur(right)),
    MemberExpression: object => property => MemberExpression(recur(object))(recur(property)),
    Module: imports => exports => statements => Module(map(recur)(imports))(map(recur)(exports))(map(recur)(statements)),
    NullLiteral,
    NumberLiteral,
    ObjectExpression: $ => ObjectExpression(map(recur)($)),
    ObjectPattern: $ => ObjectPattern(map(recur)($)),
    Property: key => value => Property(recur(key))(recur(value)),
    RestElement: $ => RestElement(recur($)),
    SpreadElement: $ => SpreadElement(recur($)),
    StringLiteral,
    SwitchCase: predicates => consequent => SwitchCase(map(map(recur))(predicates))(recur(consequent)),
    SwitchExpression: discriminant => cases => SwitchExpression(recur(discriminant))(map(recur)(cases)),
    TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(map(recur)(expressions)),
    UnaryExpression: operator => operand => UnaryExpression(operator)(recur(operand)),
    VariableDeclaration: pattern => expression => VariableDeclaration(recur(pattern))(recur(expression))
  });
  return recur;
})();
export default rewriteModule;
