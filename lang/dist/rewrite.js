import {
  NullLiteral,
  BooleanLiteral,
  NumberLiteral,
  StringLiteral,
  TemplateElement,
  TemplateLiteral,
  MetaProperty,
  MemberExpression,
  Identifier,
  SpreadElement,
  ArrayExpression,
  Property,
  ObjectExpression,
  ArrayPattern,
  Elision,
  ObjectPattern,
  RestElement,
  ArrowFunctionExpression,
  PropertyAccessor,
  BlockExpression,
  UnaryExpression,
  BinaryExpression,
  MapExpression,
  BindExpression,
  LogicalExpression,
  ConditionalExpression,
  PipeExpression,
  CallExpression,
  ImportExpression,
  ImportDefaultDeclaration,
  ImportDeclaration,
  ImportEverythingDeclaration,
  ImportDefaultSpecifier,
  ImportSpecifier,
  ImportNamespaceSpecifier,
  ExportNamedDeclaration,
  ExportDefaultDeclaration,
  VariableDeclaration,
  FunctionDeclaration,
  ExpressionStatement,
  Module
} from './types.js';
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const rewrite = node => node.type === 'TemplateLiteral' ? TemplateLiteral(node.quasis)(Prelude.map(rewrite)(node.expressions)) : node.type === 'MemberExpression' ? MemberExpression(rewrite(node.object))(rewrite(node.property)) : node.type === 'ArrayExpression' ? ArrayExpression(Prelude.map(rewrite)(node.elements)) : node.type === 'ObjectExpression' ? ObjectExpression(Prelude.map(rewrite)(node.properties)) : node.type === 'ArrowFunctionExpression' ? ArrowFunctionExpression(Prelude.map(rewrite)(node.parameters))(rewrite(node.body)) : node.type === 'PropertyAccessor' ? (() => {
  const param = Identifier('x');
  return ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(node.identifier.name)));
})() : node.type === 'BlockExpression' ? node.statements.length === 1 && node.statements[0].type === 'ExpressionStatement' ? rewrite(node.statements[0].expression) : BlockExpression(Prelude.map(rewrite)(node.statements)) : node.type === 'UnaryExpression' ? UnaryExpression(node.operator)(rewrite(node.argument)) : node.type === 'BinaryExpression' ? BinaryExpression(node.operator)(rewrite(node.left))(rewrite(node.right)) : node.type === 'MapExpression' ? CallExpression(CallExpression(prelude('map'))([rewrite(node.left)]))([rewrite(node.right)]) : node.type === 'BindExpression' ? CallExpression(CallExpression(prelude('chain'))([rewrite(node.right)]))([rewrite(node.left)]) : node.type === 'LogicalExpression' ? LogicalExpression(node.operator)(rewrite(node.left))(rewrite(node.right)) : node.type === 'ConditionalExpression' ? ConditionalExpression(rewrite(node.predicate))(rewrite(node.consequent))(rewrite(node.alternative)) : node.type === 'PipeExpression' ? rewrite(CallExpression(node.body)([node.head])) : node.type === 'CallExpression' ? CallExpression(rewrite(node.callee))(Prelude.map(rewrite)(node.arguments)) : node.type === 'VariableDeclaration' ? VariableDeclaration(rewrite(node.pattern))(rewrite(node.expression)) : node.type === 'FunctionDeclaration' ? FunctionDeclaration(node.name)(Prelude.map(rewrite)(node.parameters))(rewrite(node.body)) : node.type === 'ExpressionStatement' ? ExpressionStatement(rewrite(node.expression)) : node.type === 'ArrayPattern' ? ArrayPattern(Prelude.map(rewrite)(node.elements)) : node.type === 'ObjectPattern' ? ObjectPattern(Prelude.map(rewrite)(node.properties)) : node.type === 'SpreadElement' ? SpreadElement(rewrite(node.argument)) : node.type === 'RestElement' ? RestElement(rewrite(node.argument)) : node.type === 'Property' ? Property(rewrite(node.key))(rewrite(node.value)) : node.type === 'ExportDefaultDeclaration' ? ExportDefaultDeclaration(rewrite(node.declaration)) : node.type === 'ImportExpression' ? ImportExpression(rewrite(node.source)) : node;
const prelude = name => MemberExpression(Identifier('Prelude'))(StringLiteral(name));
export default ({imports, exports, statements}) => Module({
  imports,
  exports: Prelude.map(rewrite)(exports),
  statements: Prelude.map(rewrite)(statements)
});
