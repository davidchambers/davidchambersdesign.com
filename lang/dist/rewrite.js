import * as Future from "fluture";
import {Just, maybe, fromMaybe, fromJust$0021} from "./Maybe.js";
import Node, {ArrowFunctionExpression, Block, CallExpression, ConditionalExpression, ExportSpecifier, ExpressionStatement, Identifier, ImportDeclaration, ImportSpecifier, InfixExpression, MemberExpression, Module, ObjectExpression, ObjectPattern, Property, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, VariableDeclaration} from "./Node.js";
import * as format from "./format.js";
import globals from "./globals.js";
import parallel from "./parallel.js";
import Prelude from "./prelude.js";
const OR = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
    default:
      return lhs | rhs;
  }
})();
const AND = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
    default:
      return lhs & rhs;
  }
})();
const subtract = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
    default:
      return lhs - rhs;
  }
})();
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const id = x => x;
const const$ = x => y => x;
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
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
const empty = typeRep => (() => {
  switch (typeRep.name) {
    case "Array":
      return [];
    case "Object":
      return {};
    case "String":
      return "";
    case "Set":
      return globalThis.Reflect.construct(globalThis.Set, [[]]);
    case "Map":
      return globalThis.Reflect.construct(globalThis.Map, [[]]);
    default:
      return typeRep["fantasy-land/empty"]();
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
const filter = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
    default:
      return xs["fantasy-land/filter"](f);
  }
})();
const reject = f => filter(x => !f(x));
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
const prepend = x => xs => concat(of(xs.constructor)(x))(xs);
const chain = f => x => (() => {
  switch (globalThis.Object.prototype.toString.call(x)) {
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
const vars = Node.foldRec({
  ArrayExpression: varsProperties => mergeAll(varsProperties),
  ArrayPattern: varsProperties => mergeAll(varsProperties),
  ArrowFunctionExpression: varsParameters => varsBody => referencing(subtract(referenced(mergeAll(varsParameters)))(referenced(varsBody))),
  Block: varsStatements => varsResult => (() => {
    const {declared, referenced} = maybe(id)(merge)(varsResult)(mergeAll(varsStatements));
    return referencing(subtract(declared)(referenced));
  })(),
  BooleanLiteral: value => emptyVariables,
  CallExpression: varsCallee => varsArguments => merge(varsCallee)(mergeAll(varsArguments)),
  ConditionalExpression: varsPredicate => varsConsequent => varsAlternative => merge(merge(varsPredicate)(varsConsequent))(fromMaybe(emptyVariables)(varsAlternative)),
  ExportDefaultDeclaration: varsDeclaration => varsDeclaration,
  ExportNamedDeclaration: varsSpecifiers => mergeAll(varsSpecifiers),
  ExportSpecifier: varsLocal => exported => varsLocal,
  ExpressionStatement: varsExpression => varsExpression,
  Identifier: name => referencing(of(Set)(name)),
  ImportAllSpecifier: hiding => emptyVariables,
  ImportDeclaration: source => varsSpecifiers => mergeAll(varsSpecifiers),
  ImportDefaultSpecifier: varsLocal => declaring(referenced(varsLocal)),
  ImportNamespaceSpecifier: varsLocal => declaring(referenced(varsLocal)),
  ImportSpecifier: imported => varsLocal => declaring(referenced(varsLocal)),
  InfixExpression: operator => varsLeft => varsRight => merge(varsLeft)(varsRight),
  MemberExpression: varsObject => varsProperty => merge(varsObject)(varsProperty),
  Module: varsImports => varsExports => varsStatements => merge(merge(mergeAll(varsImports))(mergeAll(varsExports)))(mergeAll(varsStatements)),
  NullLiteral: emptyVariables,
  NumberLiteral: value => emptyVariables,
  ObjectExpression: varsProperties => mergeAll(varsProperties),
  ObjectPattern: varsProperties => mergeAll(varsProperties),
  PrefixExpression: operator => varsOperand => varsOperand,
  Property: varsKey => varsValue => merge(varsKey)(varsValue),
  RestElement: varsArgument => varsArgument,
  SpreadElement: varsArgument => varsArgument,
  StringLiteral: value => emptyVariables,
  SwitchCase: varsPredicates => varsConsequent => merge(mergeAll(chain(fromMaybe([]))(varsPredicates)))(varsConsequent),
  SwitchExpression: varsDiscriminant => varsCases => merge(varsDiscriminant)(mergeAll(varsCases)),
  TemplateLiteral: quasis => varsExpressions => mergeAll(varsExpressions),
  VariableDeclaration: varsPattern => varsExpression => (() => {
    const declared = referenced(varsPattern);
    return variables(declared)(subtract(declared)(referenced(varsExpression)));
  })()
});
const removeUnreferencedPreludeFunctions = module => (() => {
  const {declared, referenced} = vars(module);
  const unreferenced = subtract(referenced)(declared);
  const unnecessary = AND(preludeNames)(unreferenced);
  const statements = reject(Node.matchOr(const$(false))({
    VariableDeclaration: ({name}) => _ => unnecessary.has(name)
  }))(module.statements);
  return equals(module.statements.length)(statements.length) ? module : removeUnreferencedPreludeFunctions(Module(module.imports)(module.exports)(statements));
})();
const rewriteModule = module => namesExportedFrom => (module => (({imports, exports, statements}) => (({declared, referenced}) => chain(imports => (rename => (rename => (({imports, exports, statements}) => (prelude => (module => (({declared, referenced}) => (unreferenced => (undeclared => (() => {
  unreferenced.size > 0 ? console.error(concat("unreferenced: ")((args => target => target.join.apply(target, args))([", "])(Array.from(unreferenced)))) : undefined;
  return (() => {
    undeclared.size > 0 ? console.error(concat("undeclared: ")((args => target => target.join.apply(target, args))([", "])(Array.from(undeclared)))) : undefined;
    return Future.resolve(module);
  })();
})())(subtract(construct(Set)([["CasesNotExhaustive", "DivisionByZero", "import", "console", "fetch"]]))(subtract(globals)(subtract(declared)(referenced)))))(subtract(referenced)(declared)))(vars(module)))(removeUnreferencedPreludeFunctions(Module(imports)(exports)(concat(prelude)(statements)))))(map(([name, value]) => VariableDeclaration(Identifier(name))(value))(Object.entries(Prelude))))(renameIdentifiers(rename)(Module(imports)(exports)(statements))))(reduce(rename => Node.match({
  ImportSpecifier: imported => local => name => equals(imported.name)(name) ? local.name : rename(name),
  ImportNamespaceSpecifier: updateRenamerFromPattern(rename),
  ImportDefaultSpecifier: updateRenamerFromPattern(rename)
}))(rename)(chain($ => $.specifiers)(imports))))(reduce(rename => Node.match({
  DataTypeDeclaration: const$(const$(rename)),
  VariableDeclaration: pattern => expression => updateRenamerFromPattern(rename)(pattern),
  ExpressionStatement: const$(rename)
}))(id)(statements)))(parallel(($lhs => map($lhs)(imports))(Node.match({
  ImportDeclaration: source => specifiers => map(compose(ImportDeclaration(source))(join))(parallel(map(rewriteImportAllSpecifier(subtract(declared)(referenced))(namesExportedFrom)(source))(specifiers)))
})))))(vars(module)))(module))(rewriteNode(module));
const rewriteImportAllSpecifier = undeclared => namesExportedFrom => source => Node.matchOr(compose(Future.resolve)(Array.of))({
  ImportAllSpecifier: hiding => chain(namesExported => (namesExported => (namesHidden => (namesHiddenNeedlessly => namesHiddenNeedlessly.size > 0 ? Future.reject(Error(format.list(Array.from(namesHiddenNeedlessly)) + " " + (equals(1)(namesHiddenNeedlessly.size) ? "is" : "are") + " not exported from " + source.value + " so need not be hidden")) : Future.resolve(map(name => ImportSpecifier(Identifier(name))(Identifier(preludeNames.has(name) ? "$" + name : name)))(Array.from(AND(undeclared)(subtract(namesHidden)(namesExported))))))(subtract(namesExported)(namesHidden)))(construct(Set)([map($ => $.name)(hiding)])))(construct(Set)([namesExported])))((args => target => target.endsWith.apply(target, args))([".serif"])(source.value) ? Future.resolve(namesExportedFrom(source.value)) : map(Object.keys)(Future.attemptP(() => import(source.value))))
});
const $0023$ = Identifier("$");
const $0023$cases = Identifier("$cases");
const $0023$default = Identifier("$default");
const $0023$lhs = Identifier("$lhs");
const $0023$rhs = Identifier("$rhs");
const $0023Object = Identifier("Object");
const $0023Symbol = Identifier("Symbol");
const $0023args = Identifier("args");
const $0023map = Identifier("map");
const $0023match = Identifier("match");
const $0023recur = Identifier("recur");
const $0023target = Identifier("target");
const $0027apply = StringLiteral("apply");
const $0027foldRec = StringLiteral("foldRec");
const $0027for = StringLiteral("for");
const $0027has = StringLiteral("has");
const $0027hasOwn = StringLiteral("hasOwn");
const $0027tag = StringLiteral("tag");
const $0027transform = StringLiteral("transform");
const $0040tag = CallExpression(MemberExpression($0023Symbol)($0027for))([$0027tag]);
const rewriteNode = Node.transform({
  PropertyAccessor: ({name}) => rewriteNode(ArrowFunctionExpression([$0023$])(MemberExpression($0023$)(StringLiteral(name)))),
  LeftSection: operator => lhs => rewriteNode(ArrowFunctionExpression([$0023$rhs])(InfixExpression(operator)(lhs)($0023$rhs))),
  RightSection: operator => rhs => rewriteNode(ArrowFunctionExpression([$0023$lhs])(InfixExpression(operator)($0023$lhs)(rhs))),
  EmptySection: operator => rewriteNode(ArrowFunctionExpression([$0023$lhs])(ArrowFunctionExpression([$0023$rhs])(InfixExpression(operator)($0023$lhs)($0023$rhs)))),
  Block: statements => result => equals([])(statements) ? rewriteNode(fromJust$0021(result)) : Block(map(rewriteNode)(statements))(map(rewriteNode)(result)),
  DoBlockExpression: operations => result => rewriteNode(reduceRight(result => Node.match({
    ArrowAssignmentStatement: pattern => expression => CallExpression(CallExpression(Identifier("chain"))([ArrowFunctionExpression([pattern])(result)]))([expression]),
    VariableDeclaration: pattern => expression => CallExpression(ArrowFunctionExpression([pattern])(result))([expression]),
    FunctionDeclaration: name => parameters => body => CallExpression(ArrowFunctionExpression([Identifier(name)])(result))([reduceRight(body => param => ArrowFunctionExpression([param])(body))(body)(parameters)]),
    ExpressionStatement: expression => Block([ExpressionStatement(expression)])(Just(result))
  }))(result)(operations)),
  InfixCallExpression: operator => left => right => rewriteNode(CallExpression(CallExpression(operator)([left]))([right])),
  InfixExpression: operator => lhs => rhs => (() => {
    switch (operator) {
      case ".":
        return rewriteNode(CallExpression(CallExpression(Identifier("compose"))([lhs]))([rhs]));
      case "-":
        return rewriteNode(CallExpression(CallExpression(Identifier("subtract"))([rhs]))([lhs]));
      case "<>":
        return rewriteNode(CallExpression(CallExpression(Identifier("concat"))([lhs]))([rhs]));
      case "has":
        return rewriteNode(CallExpression(MemberExpression(lhs)($0027has))([rhs]));
      case "in":
        return rewriteNode(CallExpression(CallExpression(Identifier("contains"))([lhs]))([rhs]));
      case "==":
        return rewriteNode(CallExpression(CallExpression(Identifier("equals"))([rhs]))([lhs]));
      case "!=":
        return rewriteNode(CallExpression(Identifier("not"))([InfixExpression("==")(lhs)(rhs)]));
      case "<$>":
        return rewriteNode(CallExpression(CallExpression(Identifier("map"))([lhs]))([rhs]));
      case "&":
        return rewriteNode(CallExpression(CallExpression(Identifier("AND"))([rhs]))([lhs]));
      case "^":
        return rewriteNode(CallExpression(CallExpression(Identifier("XOR"))([rhs]))([lhs]));
      case "|":
        return rewriteNode(CallExpression(CallExpression(Identifier("OR"))([rhs]))([lhs]));
      case ">>=":
        return rewriteNode(CallExpression(CallExpression(Identifier("chain"))([rhs]))([lhs]));
      case "$":
        return rewriteNode(CallExpression(lhs)([rhs]));
      case "%":
        return rewriteNode(CallExpression(rhs)([lhs]));
      default:
        return InfixExpression(operator)(rewriteNode(lhs))(rewriteNode(rhs));
    }
  })(),
  MethodCallExpression: name => rewriteNode(ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression(MemberExpression($0023target)(StringLiteral(name)))($0027apply))([$0023target, $0023args])))),
  CallExpression: flip(arguments$ => Node.matchOr(callee => CallExpression(rewriteNode(callee))(map(rewriteNode)(arguments$)))({
    PropertyAccessor: compose(rewriteNode)(compose(MemberExpression(arguments$[0]))(compose(StringLiteral)($ => $.name)))
  })),
  FunctionDeclaration: name => parameters => body => rewriteNode(VariableDeclaration(Identifier(name))(reduceRight(flip(compose(ArrowFunctionExpression)(Array.of)))(body)(parameters))),
  DataTypeDeclaration: identifier => constructors => rewriteNode((() => {
    const $0023member = Identifier((args => target => target.replace.apply(target, args))([RegExp("^."), (args => target => target.toLowerCase.apply(target, args))([])])(identifier.name));
    const pattern = ObjectPattern(map(join(Property))(prepend(identifier)(map($ => $.identifier)(constructors))));
    return VariableDeclaration(pattern)((() => {
      const $0023$matchOr = Identifier("$matchOr");
      const $0023$match = Identifier("$match");
      const $0023$transform = Identifier("$transform");
      const $0023$foldRec = Identifier("$foldRec");
      const variableDeclarationFromConstructor = Node.match({
        DataConstructorDefinition: identifier => parameters => VariableDeclaration(identifier)(reduceRight(body => parameter => ArrowFunctionExpression([parameter.identifier])(body))(ObjectExpression(prepend(Property($0040tag)(StringLiteral(identifier.name)))(map(parameter => Property(StringLiteral(parameter.name))(parameter))(map($ => $.identifier)(parameters)))))(parameters))
      });
      const matchOr = (() => {
        const case$ = ({identifier, parameters}) => SwitchCase([Just(StringLiteral(identifier.name))])(reduce(callee => parameter => CallExpression(callee)([MemberExpression($0023member)(StringLiteral(parameter.identifier.name))]))(MemberExpression($0023$cases)(StringLiteral(identifier.name)))(parameters));
        return ArrowFunctionExpression([$0023$default])(ArrowFunctionExpression([$0023$cases])(ArrowFunctionExpression([$0023member])(ConditionalExpression(CallExpression(MemberExpression($0023Object)($0027hasOwn))([$0023$cases, MemberExpression($0023member)($0040tag)]))(SwitchExpression(MemberExpression($0023member)($0040tag))(map(case$)(constructors)))(Just(CallExpression($0023$default)([$0023member]))))));
      })();
      const withRecursion = expr => recur => depth => (() => {
        switch (depth) {
          case 0:
            return expr;
          case 1:
            return CallExpression(recur)([expr]);
          default:
            return withRecursion(expr)(CallExpression($0023map)([recur]))(subtract(1)(depth));
        }
      })();
      const transform = ArrowFunctionExpression([$0023$cases])(Block([VariableDeclaration($0023recur)(CallExpression(CallExpression($0023$matchOr)([identifier]))([ObjectExpression(append(SpreadElement($0023$cases))(map(Node.match({
        DataConstructorDefinition: identifier => parameters => Property(StringLiteral(identifier.name))(reduceRight(body => parameter => ArrowFunctionExpression([parameter.identifier])(body))(reduce(callee => Node.match({
          DataConstructorParameter: identifier => recursionDepth => CallExpression(callee)([withRecursion(identifier)($0023recur)(recursionDepth)])
        }))(identifier)(parameters))(parameters))
      }))(constructors)))]))])(Just($0023recur)));
      const foldRec = ArrowFunctionExpression([$0023$cases])(Block([VariableDeclaration($0023recur)(CallExpression(CallExpression($0023$matchOr)([identifier]))([ObjectExpression(map(Node.match({
        DataConstructorDefinition: identifier => parameters => Property(StringLiteral(identifier.name))(reduceRight(body => parameter => ArrowFunctionExpression([parameter.identifier])(body))(reduce(callee => Node.match({
          DataConstructorParameter: identifier => recursionDepth => CallExpression(callee)([withRecursion(identifier)($0023recur)(recursionDepth)])
        }))(MemberExpression($0023$cases)(StringLiteral(identifier.name)))(parameters))(parameters))
      }))(constructors))]))])(Just($0023recur)));
      return Block([...map(variableDeclarationFromConstructor)(constructors), VariableDeclaration($0023$matchOr)(matchOr), VariableDeclaration($0023$match)(CallExpression($0023$matchOr)([ArrowFunctionExpression([$0023member])(Identifier("CasesNotExhaustive"))])), VariableDeclaration($0023$transform)(transform), VariableDeclaration($0023$foldRec)(foldRec)])(Just(ObjectExpression(append(Property(StringLiteral(identifier.name))(ObjectExpression([Property(StringLiteral("matchOr"))($0023$matchOr), Property(StringLiteral("match"))($0023$match), Property(StringLiteral("transform"))($0023$transform), Property(StringLiteral("foldRec"))($0023$foldRec)])))(map(Node.match({
        DataConstructorDefinition: identifier => parameters => Property(StringLiteral(identifier.name))(identifier)
      }))(constructors)))));
    })());
  })())
});
const updateRenamerFromPattern = rename => Node.match({
  Identifier: name => preludeNames.has(name) ? this$ => equals(name)(this$) ? "$" + this$ : rename(this$) : rename,
  ArrayPattern: elements => reduce(updateRenamerFromPattern)(rename)(elements),
  ObjectPattern: properties => reduce(updateRenamerFromPattern)(rename)(properties),
  Property: key => value => updateRenamerFromPattern(rename)(value),
  RestElement: argument => updateRenamerFromPattern(rename)(argument),
  Elision: rename
});
const renameIdentifiers = rename => Node.transform({
  Identifier: compose(Identifier)(rename),
  ImportSpecifier: imported => local => ImportSpecifier(imported)(renameIdentifiers(rename)(local)),
  ExportSpecifier: local => exported => ExportSpecifier(renameIdentifiers(rename)(local))(exported)
});
export default rewriteModule;
