import {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateElement, TemplateLiteral, MetaProperty, MemberExpression, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, CallExpression, ImportExpression, ImportDefaultDeclaration, ImportDeclaration, ImportEverythingDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} from "./types.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const rewrite = node => (discriminant => {
  switch (node.type) {
    case "TemplateLiteral":
      return TemplateLiteral(node.quasis)(Prelude.map(rewrite)(node.expressions));
    case "MemberExpression":
      return MemberExpression(rewrite(node.object))(rewrite(node.property));
    case "ArrayExpression":
      return ArrayExpression(Prelude.map(rewrite)(node.elements));
    case "ObjectExpression":
      return ObjectExpression(Prelude.map(rewrite)(node.properties));
    case "ArrowFunctionExpression":
      return ArrowFunctionExpression(Prelude.map(rewrite)(node.parameters))(rewrite(node.body));
    case "PropertyAccessor":
      return (() => {
        const param = Identifier("x");
        return ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(node.identifier.name)));
      })();
    case "BlockExpression":
      return node.statements.length === 1 && node.statements[0].type === "ExpressionStatement" ? rewrite(node.statements[0].expression) : BlockExpression(Prelude.map(rewrite)(node.statements));
    case "UnaryExpression":
      return UnaryExpression(node.operator)(rewrite(node.argument));
    case "BinaryExpression":
      return BinaryExpression(node.operator)(rewrite(node.left))(rewrite(node.right));
    case "MapExpression":
      return CallExpression(CallExpression(prelude("map"))([rewrite(node.left)]))([rewrite(node.right)]);
    case "BindExpression":
      return CallExpression(CallExpression(prelude("chain"))([rewrite(node.right)]))([rewrite(node.left)]);
    case "LogicalExpression":
      return LogicalExpression(node.operator)(rewrite(node.left))(rewrite(node.right));
    case "ConditionalExpression":
      return ConditionalExpression(rewrite(node.predicate))(rewrite(node.consequent))(rewrite(node.alternative));
    case "SwitchExpression":
      return SwitchExpression(rewrite(node.discriminant))(Prelude.map(rewrite)(node.cases))(node.default === null ? null : rewrite(node.default));
    case "SwitchCase":
      return SwitchCase(Prelude.map(rewrite)(node.predicates))(rewrite(node.consequent));
    case "PipeExpression":
      return rewrite(CallExpression(node.body)([node.head]));
    case "CallExpression":
      return CallExpression(rewrite(node.callee))(Prelude.map(rewrite)(node.arguments));
    case "VariableDeclaration":
      return VariableDeclaration(rewrite(node.pattern))(rewrite(node.expression));
    case "FunctionDeclaration":
      return FunctionDeclaration(node.name)(Prelude.map(rewrite)(node.parameters))(rewrite(node.body));
    case "ExpressionStatement":
      return ExpressionStatement(rewrite(node.expression));
    case "ArrayPattern":
      return ArrayPattern(Prelude.map(rewrite)(node.elements));
    case "ObjectPattern":
      return ObjectPattern(Prelude.map(rewrite)(node.properties));
    case "SpreadElement":
      return SpreadElement(rewrite(node.argument));
    case "RestElement":
      return RestElement(rewrite(node.argument));
    case "Property":
      return Property(rewrite(node.key))(rewrite(node.value));
    case "ExportDefaultDeclaration":
      return ExportDefaultDeclaration(rewrite(node.declaration));
    case "ImportExpression":
      return ImportExpression(rewrite(node.source));
    default:
      return node;
  }
})(node.type);
const prelude = name => MemberExpression(Identifier("Prelude"))(StringLiteral(name));
export default ({imports, exports, statements}) => Module({
  imports,
  exports: Prelude.map(rewrite)(exports),
  statements: Prelude.map(rewrite)(statements)
});
