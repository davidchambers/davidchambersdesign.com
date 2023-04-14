import {maybe, fromMaybe} from "./Maybe.js";
import Node from "./Node.js";
const OR = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
    default:
      return lhs | rhs;
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
const id = x => x;
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
const variables = declared => referenced => ({
  declared,
  referenced
});
const declaring = names => variables(names)(empty(Set));
const referencing = names => variables(empty(Set))(names);
const emptyVariables = variables(empty(Set))(empty(Set));
const declared = $ => $.declared;
const referenced = $ => $.referenced;
const merge = lhs => rhs => ({
  declared: OR(rhs.declared)(lhs.declared),
  referenced: OR(rhs.referenced)(lhs.referenced)
});
const mergeAll = reduce(merge)(emptyVariables);
const vars = Node.foldRec({
  ArrayExpression: varsProperties => mergeAll(varsProperties),
  ArrayPattern: varsProperties => mergeAll(varsProperties),
  ArrowAssignmentStatement: varsPattern => varsExpression => merge(declaring(referenced(varsPattern)))(varsExpression),
  ArrowFunctionExpression: varsParameters => varsBody => referencing(subtract(referenced(mergeAll(varsParameters)))(referenced(varsBody))),
  Block: varsStatements => varsResult => (() => {
    const {declared, referenced} = maybe(id)(merge)(varsResult)(mergeAll(varsStatements));
    return referencing(subtract(declared)(referenced));
  })(),
  BooleanLiteral: value => emptyVariables,
  CallExpression: varsCallee => varsArguments => merge(varsCallee)(mergeAll(varsArguments)),
  ConditionalExpression: varsPredicate => varsConsequent => varsAlternative => merge(merge(varsPredicate)(varsConsequent))(fromMaybe(emptyVariables)(varsAlternative)),
  DataConstructorDefinition: varsIdentifier => varsParameters => varsIdentifier,
  DataConstructorParameter: varsIdentifier => recursionDepth => emptyVariables,
  DataTypeDeclaration: varsIdentifier => varsConstructors => declaring(referenced(merge(varsIdentifier)(mergeAll(varsConstructors)))),
  DoBlockExpression: varsOperations => varsResult => merge(mergeAll(varsOperations))(varsResult),
  ExportAllSpecifier: hiding => emptyVariables,
  ExportDefaultDeclaration: varsDeclaration => varsDeclaration,
  ExportNamedDeclaration: varsSpecifiers => mergeAll(varsSpecifiers),
  ExportSpecifier: varsLocal => exported => varsLocal,
  ExpressionStatement: varsExpression => varsExpression,
  FunctionDeclaration: name => varsParameters => varsBody => variables(of(Set)(name))(subtract(of(Set)(name))(subtract(referenced(mergeAll(varsParameters)))(referenced(varsBody)))),
  Identifier: name => referencing(of(Set)(name)),
  ImportAllSpecifier: hiding => emptyVariables,
  ImportDeclaration: source => varsSpecifiers => mergeAll(varsSpecifiers),
  ImportDefaultSpecifier: varsLocal => declaring(referenced(varsLocal)),
  ImportNamespaceSpecifier: varsLocal => declaring(referenced(varsLocal)),
  ImportSpecifier: imported => varsLocal => declaring(referenced(varsLocal)),
  InfixCallExpression: operator => varsLeft => varsRight => merge(varsLeft)(varsRight),
  InfixExpression: operator => varsLeft => varsRight => merge(varsLeft)(varsRight),
  LeftSection: operator => varsOperand => varsOperand,
  MemberExpression: varsObject => varsProperty => merge(varsObject)(varsProperty),
  MethodCallExpression: name => emptyVariables,
  Module: varsImports => varsExports => varsStatements => merge(merge(mergeAll(varsImports))(mergeAll(varsExports)))(mergeAll(varsStatements)),
  NullLiteral: emptyVariables,
  NumberLiteral: value => emptyVariables,
  ObjectExpression: varsProperties => mergeAll(varsProperties),
  ObjectPattern: varsProperties => mergeAll(varsProperties),
  PrefixExpression: operator => varsOperand => varsOperand,
  Property: varsKey => varsValue => merge(varsKey)(varsValue),
  PropertyAccessor: varsIdentifier => emptyVariables,
  RestElement: varsArgument => varsArgument,
  RightSection: operator => varsOperand => varsOperand,
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
export default vars;
export {declared, referenced, merge, mergeAll};
