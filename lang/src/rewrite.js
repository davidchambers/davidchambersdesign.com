import * as Serif from './types.js';


function rewriteNode(node) {
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
      return Serif.ObjectExpression(node.properties.map(rewriteNode));
    }
    case 'ArrowFunctionExpression': {
      return Serif.ArrowFunctionExpression(node.parameters.map(rewriteNode), rewriteNode(node.body));
    }
    case 'PropertyAccessor': {
      return Serif.ArrowFunctionExpression(
        [Serif.Identifier('x')],
        Serif.MemberExpression(Serif.Identifier('x'), Serif.StringLiteral(node.identifier.name))
      );
    }
    case 'BlockExpression': {
      if (node.statements.length === 1 && node.statements[0].type === 'ExpressionStatement') {
        return rewriteNode(node.statements[0].expression);
      } else {
        return Serif.BlockExpression(node.statements.map(rewriteNode));
      }
    }
    case 'UnaryExpression': {
      return Serif.UnaryExpression(
        node.operator,
        rewriteNode(node.argument)
      );
    }
    case 'BinaryExpression': {
      return Serif.BinaryExpression(
        node.operator,
        rewriteNode(node.left),
        rewriteNode(node.right)
      );
    }
    case 'MapExpression': {
      return Serif.CallExpression(
        Serif.CallExpression(
          Serif.MemberExpression(Serif.Identifier('Prelude'), Serif.StringLiteral('map')),
          [rewriteNode(node.left)]
        ),
        [rewriteNode(node.right)]
      );
    }
    case 'BindExpression': {
      return Serif.CallExpression(
        Serif.CallExpression(
          Serif.MemberExpression(Serif.Identifier('Prelude'), Serif.StringLiteral('chain')),
          [rewriteNode(node.right)]
        ),
        [rewriteNode(node.left)]
      );
    }
    case 'LogicalExpression': {
      return Serif.LogicalExpression(
        node.operator,
        rewriteNode(node.left),
        rewriteNode(node.right)
      );
    }
    case 'ConditionalExpression': {
      return Serif.ConditionalExpression(
        rewriteNode(node.predicate),
        rewriteNode(node.consequent),
        rewriteNode(node.alternative)
      );
    }
    case 'PipeExpression': {
      return Serif.PipeExpression(
        rewriteNode(node.head),
        rewriteNode(node.body)
      );
    }
    case 'CallExpression': {
      return Serif.CallExpression(
        rewriteNode(node.callee),
        node.arguments.map(rewriteNode)
      );
    }
    case 'VariableDeclaration': {
      return Serif.VariableDeclaration(
        rewriteNode(node.pattern),
        rewriteNode(node.expression)
      );
    }
    case 'FunctionDeclaration': {
      return Serif.FunctionDeclaration(
        node.name,
        node.parameters.map(rewriteNode),
        rewriteNode(node.body)
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
      return Serif.RestElement(rewriteNode(node.argument));
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

export default function rewrite(module) {
  return Serif.Module({
    imports: module.imports,
    exports: module.exports.map(rewriteNode),
    statements: module.statements.map(rewriteNode),
  });
}
