import * as Serif from './types.js';


function rewriteNode(node: Serif.Node): Serif.Node {
  switch (node.type) {
    case 'TemplateLiteral': {
      return Serif.TemplateLiteral(node.quasis, node.expressions.map(rewriteNode));
    }
    case 'MemberExpression': {
      return Serif.MemberExpression(rewriteNode(node.object), rewriteNode(node.property));
    }
    case 'Identifier': {
      return node;
    }
    case 'ArrayExpression': {
      return Serif.ArrayExpression(node.elements.map(rewriteNode));
    }
    case 'ObjectExpression': {
      return Serif.ObjectExpression(node.properties.map(rewriteNode) as ReadonlyArray<Serif.SpreadElement | Serif.Property>);
    }
    case 'ArrowFunctionExpression': {
      return Serif.ArrowFunctionExpression(node.parameters.map(rewriteNode) as ReadonlyArray<Serif.Pattern>, rewriteNode(node.body));
    }
    case 'PropertyAccessor': {
      return Serif.ArrowFunctionExpression(
        [Serif.Identifier('x')],
        Serif.MemberExpression(Serif.Identifier('x'), Serif.StringLiteral(node.identifier.name)),
      );
    }
    case 'BlockExpression': {
      const [head, ...tail] = node.statements;
      if (tail.length === 0 && head.type === 'ExpressionStatement') {
        return rewriteNode(head.expression);
      } else {
        return Serif.BlockExpression([rewriteNode(head), ...tail.map(rewriteNode)]);
      }
    }
    case 'UnaryExpression': {
      return Serif.UnaryExpression(
        node.operator,
        rewriteNode(node.argument) as Serif.PrimaryExpression,
      );
    }
    case 'BinaryExpression': {
      return Serif.BinaryExpression(
        node.operator,
        rewriteNode(node.left) as Serif.PrimaryExpression,
        rewriteNode(node.right) as Serif.PrimaryExpression,
      );
    }
    case 'MapExpression': {
      return Serif.CallExpression(
        Serif.CallExpression(
          Serif.MemberExpression(Serif.Identifier('Prelude'), Serif.StringLiteral('map')),
          [rewriteNode(node.left)],
        ),
        [rewriteNode(node.right)],
      );
    }
    case 'BindExpression': {
      return Serif.CallExpression(
        Serif.CallExpression(
          Serif.MemberExpression(Serif.Identifier('Prelude'), Serif.StringLiteral('chain')),
          [rewriteNode(node.right)],
        ),
        [rewriteNode(node.left)],
      );
    }
    case 'LogicalExpression': {
      return Serif.LogicalExpression(
        node.operator,
        rewriteNode(node.left) as Serif.BinaryExpression,
        rewriteNode(node.right) as Serif.BinaryExpression,
      );
    }
    case 'ConditionalExpression': {
      return Serif.ConditionalExpression(
        rewriteNode(node.predicate),
        rewriteNode(node.consequent),
        rewriteNode(node.alternative),
      );
    }
    case 'PipeExpression': {
      return Serif.PipeExpression(
        rewriteNode(node.head),
        rewriteNode(node.body),
      );
    }
    case 'CallExpression': {
      return Serif.CallExpression(
        rewriteNode(node.callee),
        node.arguments.map(rewriteNode),
      );
    }
    case 'VariableDeclaration': {
      return Serif.VariableDeclaration(
        rewriteNode(node.pattern) as Serif.Pattern,
        rewriteNode(node.expression),
      );
    }
    case 'FunctionDeclaration': {
      const [head, ...tail] = node.parameters;
      return Serif.FunctionDeclaration(
        node.name,
        [rewriteNode(head) as Serif.Pattern, ...tail.map(rewriteNode) as ReadonlyArray<Serif.Pattern>],
        rewriteNode(node.body),
      );
    }
    case 'ExpressionStatement': {
      return Serif.ExpressionStatement(rewriteNode(node.expression));
    }
    case 'ArrayPattern': {
      return Serif.ArrayPattern(node.elements.map(element => element == null ? null : rewriteNode(element)));
    }
    case 'ObjectPattern': {
      return Serif.ObjectPattern(node.properties.map(rewriteNode));
    }
    case 'SpreadElement': {
      return Serif.SpreadElement(rewriteNode(node.argument));
    }
    case 'RestElement': {
      return Serif.RestElement(rewriteNode(node.argument) as Serif.Identifier);
    }
    case 'Property': {
      return Serif.Property(rewriteNode(node.key), rewriteNode(node.value));
    }
    case 'ExportDefaultDeclaration': {
      return Serif.ExportDefaultDeclaration(rewriteNode(node.declaration));
    }
    default: {
      return node;
    }
  }
}

export default function rewrite(module: Serif.Module): Serif.Module {
  return Serif.Module({
    imports: module.imports,
    exports: module.exports.map(rewriteNode) as ReadonlyArray<Serif.ExportNamedDeclaration | Serif.ExportDefaultDeclaration>,
    statements: module.statements.map(rewriteNode),
  });
};
