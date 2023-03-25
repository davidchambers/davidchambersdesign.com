import * as Prelude from "./prelude.js";
import {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MetaProperty, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, CallExpression, ImportExpression, ImportDeclaration, ImportEverythingDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} from "./types.js";
const Prelude$1 = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude$1;
const has = element => set => set.has(element);
const add = element => set => Reflect.construct(Set, [[...set, element]]);
const union = this$ => that => Reflect.construct(Set, [[...this$, ...that]]);
const nextUnusedIdent = names => desiredName => (() => {
  const recur = counter => (() => {
    const candidate = counter === 0 ? desiredName : `${desiredName}$${counter}`;
    return has(candidate)(names) ? recur(counter + 1) : Identifier(candidate);
  })();
  return recur(0);
})();
const namesInPattern = pattern => (() => {
  switch (pattern.type) {
    case "Identifier":
      return [pattern.name];
    case "ArrayPattern":
      return Prelude$1.chain(namesInPattern)(pattern.elements);
    case "ObjectPattern":
      return Prelude$1.chain(namesInPattern)(pattern.properties);
    case "Property":
      return namesInPattern(pattern.value);
    case "RestElement":
      return namesInPattern(pattern.argument);
  }
})();
const namesInStatement = node => (() => {
  switch (node.type) {
    case "ImportDeclaration":
      return node.specifiers === "*" ? (() => {
        node.source;
        node.hiding;
        return [];
      })() : Prelude$1.map(x => (x => x.name)((x => x.local)(x)))(node.specifiers);
    case "VariableDeclaration":
      return namesInPattern(node.pattern);
    case "FunctionDeclaration":
      return [node.name];
    case "ExpressionStatement":
      return [];
  }
})();
const rewriteModule = module => (() => {
  const names = Reflect.construct(Set, [Prelude$1.chain(namesInStatement)([...module.imports, ...module.statements])]);
  const preludeIdent = nextUnusedIdent(names)("Prelude");
  const names$0027 = add(preludeIdent.name)(names);
  const rewrite = rewriteNode(preludeIdent)(names$0027);
  const preludeDefinition = VariableDeclaration(preludeIdent)(ObjectExpression(map(([name, expr]) => Property(StringLiteral(name))(expr))(Object.entries(Prelude))));
  const preludeDestructuring = VariableDeclaration((names => ObjectPattern(map(name => Property(StringLiteral(name))(Identifier(name)))(names.filter(name => !has(name)(names$0027)))))(Object.keys(Prelude)))(preludeIdent);
  return Module({
    imports: Prelude$1.map(rewrite)(module.imports),
    exports: Prelude$1.map(rewrite)(module.exports),
    statements: Prelude$1.map(rewrite)([preludeDefinition, preludeDestructuring, ...module.statements])
  });
})();
const rewriteNode = preludeIdent => (() => {
  const recur = names => node => (() => {
    switch (node.type) {
      case "TemplateLiteral":
        return TemplateLiteral(node.quasis)(Prelude$1.map(recur(names))(node.expressions));
      case "MemberExpression":
        return MemberExpression(recur(names)(node.object))(recur(names)(node.property));
      case "ArrayExpression":
        return ArrayExpression(Prelude$1.map(recur(names))(node.elements));
      case "ObjectExpression":
        return ObjectExpression(Prelude$1.map(recur(names))(node.properties));
      case "ArrowFunctionExpression":
        return (() => {
          const params = Prelude$1.map(recur(names))(node.parameters);
          const names$0027 = union(names)(Prelude$1.map(x => x.name)(params));
          return ArrowFunctionExpression(params)(recur(names$0027)(node.body));
        })();
      case "PropertyAccessor":
        return (() => {
          const param = Identifier("x");
          const names$0027 = add(param.name)(names);
          return recur(names$0027)(ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(node.identifier.name))));
        })();
      case "BlockExpression":
        return node.statements.length === 1 && node.statements[0].type === "ExpressionStatement" ? recur(names)(node.statements[0].expression) : (() => {
          const names$0027 = union(names)(Prelude$1.chain(statement => (() => {
            switch (statement.type) {
              case "VariableDeclaration":
                return namesInPattern(statement.pattern);
              case "FunctionDeclaration":
                return [statement.name];
              case "ExpressionStatement":
                return [];
            }
          })())(node.statements));
          return BlockExpression(Prelude$1.map(recur(names$0027))(node.statements));
        })();
      case "UnaryExpression":
        return UnaryExpression(node.operator)(recur(names)(node.argument));
      case "CompositionExpression":
        return (() => {
          const param = nextUnusedIdent(names)("x");
          const names$0027 = add(param.name)(names);
          const toCallExpression = expr => expr.type === "CompositionExpression" ? CallExpression(expr.left)([toCallExpression(expr.right)]) : CallExpression(expr)([param]);
          return recur(names$0027)(ArrowFunctionExpression([param])(toCallExpression(node)));
        })();
      case "BinaryExpression":
        return BinaryExpression(node.operator)(recur(names)(node.left))(recur(names)(node.right));
      case "MapExpression":
        return CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("map")))([recur(names)(node.left)]))([recur(names)(node.right)]);
      case "BindExpression":
        return CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("chain")))([recur(names)(node.right)]))([recur(names)(node.left)]);
      case "LogicalExpression":
        return LogicalExpression(node.operator)(recur(names)(node.left))(recur(names)(node.right));
      case "ConditionalExpression":
        return ConditionalExpression(recur(names)(node.predicate))(recur(names)(node.consequent))(recur(names)(node.alternative));
      case "SwitchExpression":
        return SwitchExpression(recur(names)(node.discriminant))(Prelude$1.map(recur(names))(node.cases))(node.default === null ? null : recur(names)(node.default));
      case "SwitchCase":
        return SwitchCase(Prelude$1.map(recur(names))(node.predicates))(recur(names)(node.consequent));
      case "PipeExpression":
        return recur(names)(CallExpression(node.body)([node.head]));
      case "CallExpression":
        return CallExpression(recur(names)(node.callee))(Prelude$1.map(recur(names))(node.arguments));
      case "VariableDeclaration":
        return VariableDeclaration(recur(names)(node.pattern))(recur(names)(node.expression));
      case "FunctionDeclaration":
        return FunctionDeclaration(node.name)(Prelude$1.map(recur(names))(node.parameters))(recur(names)(node.body));
      case "ExpressionStatement":
        return ExpressionStatement(recur(names)(node.expression));
      case "ArrayPattern":
        return ArrayPattern(Prelude$1.map(recur(names))(node.elements));
      case "ObjectPattern":
        return ObjectPattern(Prelude$1.map(recur(names))(node.properties));
      case "SpreadElement":
        return SpreadElement(recur(names)(node.argument));
      case "RestElement":
        return RestElement(recur(names)(node.argument));
      case "Property":
        return Property(recur(names)(node.key))(recur(names)(node.value));
      case "ExportDefaultDeclaration":
        return ExportDefaultDeclaration(recur(names)(node.declaration));
      case "ImportExpression":
        return ImportExpression(recur(names)(node.source));
      default:
        return node;
    }
  })();
  return recur;
})();
export default rewriteModule;
