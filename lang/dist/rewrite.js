import * as Future from "fluture";
import {Nothing, Just, maybe} from "./Maybe.js";
import Node, {ArrowFunctionExpression, BinaryExpression, BlockExpression, CallExpression, CompositionExpression, ConditionalExpression, DataConstructorDefinition, DataTypeDeclaration, ExportSpecifier, ExpressionStatement, FunctionDeclaration, Identifier, ImportDeclaration, ImportSpecifier, MemberExpression, Module, ObjectExpression, ObjectPattern, Property, StringLiteral, SwitchCase, SwitchExpression, VariableDeclaration, transform} from "./Node.js";
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
const chain = f => x => (() => {
  switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, x, [])) {
    case "[object Array]":
      return x.flatMap(x => f(x));
    case "[object Function]":
      return y => x(f(y))(y);
    default:
      return x["fantasy-land/chain"](f);
  }
})();
const join = chain(id);
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
const vars = node => match$0027(Node)(const$(emptyVariables))({
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
  ConditionalExpression: predicate => consequent => alternative => merge(merge(vars(predicate))(vars(consequent)))(maybe(emptyVariables)(vars)(alternative)),
  SwitchExpression: discriminant => cases => mergeAll(map(vars)([discriminant, ...cases])),
  SwitchCase: predicates => consequent => mergeAll(map(vars)([...predicates, consequent])),
  PipeExpression: head => body => merge(vars(head))(vars(body)),
  CallExpression: callee => arguments$ => mergeAll(map(vars)([callee, ...arguments$])),
  ImportDeclaration: const$($ => mergeAll(map(vars)($))),
  ImportAllDeclaration: source => default$ => hiding => emptyVariables,
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
  DataConstructorDefinition: identifier => parameters => declaring(of(Set)(identifier.name)),
  DataTypeDeclaration: identifier => $ => reduce(merge)(declaring(of(Set)(identifier.name)))(map(vars)($))
})(node);
const applyFlip = transform({
  CallExpression: callee3 => arguments3 => match$0027(Node)(const$(CallExpression(callee3)(arguments3)))({
    CallExpression: callee2 => arguments2 => match$0027(Node)(const$(CallExpression(CallExpression(callee2)(arguments2))(arguments3)))({
      CallExpression: callee1 => arguments1 => match$0027(Node)(const$(CallExpression(CallExpression(CallExpression(callee1)(arguments1))(arguments2))(arguments3)))({
        Identifier: name => equals("flip")(name) && equals(1)(arguments1.length) ? CallExpression(CallExpression(arguments1[0])(arguments3))(arguments2) : CallExpression(CallExpression(CallExpression(Identifier(name))(arguments1))(arguments2))(arguments3)
      })(callee1)
    })(callee2)
  })(callee3)
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
    const {imports, exports, statements} = applyFlip(renameIdentifiers(rename$0027)(module$0027));
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
const rewriteImportAllDeclaration = undeclared => namesExportedFrom => source => default$ => hiding => (() => {
  const namesExported = construct(Set)([(args => target => target.endsWith.apply(target, args))([".serif"])(source.value) ? namesExportedFrom(source.value) : map(Object.keys)(Future.attemptP(() => import(source.value)))]);
  const namesHidden = construct(Set)([map($ => $.name)(hiding)]);
  const namesHiddenNeedlessly = subtract(namesExported)(namesHidden);
  return namesHiddenNeedlessly.size > 0 ? Future.reject(Error(`import * from "${source.value}" hiding {${(args => target => target.join.apply(target, args))([", "])(namesHidden)}};\n\n${format.list(Array.from(namesHiddenNeedlessly))} ${equals(1)(namesHiddenNeedlessly.size) ? "is" : "are"} not exported so need not be hidden.\n`)) : Future.resolve(ImportDeclaration(source)(maybe(id)($ => concat(Array.of($)))(default$)(map(name => ImportSpecifier(Identifier(name))(Identifier(preludeNames.has(name) ? "$" + name : name)))(Array.from(XOR(undeclared)(subtract(namesHidden)(namesExported)))))));
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
const $0040match = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027match]);
const $0040tag = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027tag]);
const rewriteNode = transform({
  PropertyAccessor: ({name}) => rewriteNode(ArrowFunctionExpression([$0023dollar])(MemberExpression($0023dollar)(StringLiteral(name)))),
  BlockExpression: statements => result => equals([])(statements) ? rewriteNode(result) : BlockExpression(map(rewriteNode)(statements))(rewriteNode(result)),
  DoBlockExpression: operations => result => rewriteNode(reduceRight(result => match(Node)({
    ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(Identifier("chain"))([ArrowFunctionExpression([pattern])(result)]))([expression]),
    VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
    FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)]),
    ExpressionStatement: expression => BlockExpression([ExpressionStatement(expression)])(result)
  }))(result)(operations)),
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
  PipeExpression: head => body => rewriteNode(CallExpression(body)([head])),
  MethodCallExpression: name => rewriteNode(ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression(MemberExpression($0023target)(StringLiteral(name)))($0027apply))([$0023target, $0023args])))),
  CallExpression: flip(arguments$ => match$0027(Node)(callee => CallExpression(rewriteNode(callee))(map(rewriteNode)(arguments$)))({
    PropertyAccessor: $ => rewriteNode(MemberExpression(arguments$[0])(StringLiteral($.name)))
  })),
  DataTypeDeclaration: identifier => constructors => rewriteNode((() => {
    const pattern = ObjectPattern(map(join(Property))(concat([identifier])(map($ => $.identifier)(constructors))));
    return VariableDeclaration(pattern)((() => {
      const variableDeclarationFromConstructor = match(Node)({
        DataConstructorDefinition: identifier => parameters => VariableDeclaration(identifier)(reduceRight(body => parameter => ArrowFunctionExpression([parameter])(body))(ObjectExpression(concat([Property($0040tag)(StringLiteral(identifier.name))])(map(parameter => Property(StringLiteral(parameter.name))(parameter))(parameters))))(parameters))
      });
      const variableDeclarations = map(variableDeclarationFromConstructor)(constructors);
      const propertyFromConstructor = match(Node)({
        DataConstructorDefinition: identifier => parameters => Property(StringLiteral(identifier.name))(identifier)
      });
      const constructorProperties = map(propertyFromConstructor)(constructors);
      const matchProperty = Property($0040match)((() => {
        const $0023member = Identifier((args => target => target.replace.apply(target, args))([RegExp("^."), (args => target => target.toLowerCase.apply(target, args))([])])(identifier.name));
        const case$ = ({identifier, parameters}) => SwitchCase([Just(StringLiteral(identifier.name))])(reduce(callee => parameter => CallExpression(callee)([MemberExpression($0023member)(StringLiteral(parameter.name))]))(MemberExpression($0023cases)(StringLiteral(identifier.name)))(parameters));
        return ArrowFunctionExpression([$0023default])(ArrowFunctionExpression([$0023cases])(ArrowFunctionExpression([$0023member])(ConditionalExpression(CallExpression(MemberExpression($0023Object)($0027hasOwn))([$0023cases, MemberExpression($0023member)($0040tag)]))(SwitchExpression(MemberExpression($0023member)($0040tag))(map(case$)(constructors)))(Just(CallExpression($0023default)([$0023member]))))));
      })());
      return BlockExpression(variableDeclarations)(ObjectExpression([Property(StringLiteral(identifier.name))(ObjectExpression([...constructorProperties, matchProperty])), ...constructorProperties]));
    })());
  })())
});
const updateRenamerFromPattern = rename => node => match(Node)({
  Identifier: name => preludeNames.has(name) ? this$ => equals(name)(this$) ? "$" + this$ : rename(this$) : rename,
  ArrayPattern: reduce(updateRenamerFromPattern)(rename),
  ObjectPattern: reduce(updateRenamerFromPattern)(rename),
  Property: const$(updateRenamerFromPattern(rename)),
  RestElement: updateRenamerFromPattern(rename),
  Elision: rename
})(node);
const renameIdentifiers = rename => transform({
  Identifier: $ => Identifier(rename($)),
  ImportSpecifier: imported => local => ImportSpecifier(imported)(renameIdentifiers(rename)(local)),
  ExportSpecifier: local => exported => ExportSpecifier(renameIdentifiers(rename)(local))(exported),
  DataConstructorDefinition: identifier => parameters => DataConstructorDefinition(renameIdentifier(rename)(identifier))(parameters),
  DataTypeDeclaration: identifier => constructors => DataTypeDeclaration(renameIdentifiers(rename)(identifier))(map(renameIdentifiers(rename))(constructors)),
  FunctionDeclaration: name => parameters => body => FunctionDeclaration(rename(name))(map(renameIdentifiers(rename))(parameters))(renameIdentifiers(rename)(body))
});
export default rewriteModule;
