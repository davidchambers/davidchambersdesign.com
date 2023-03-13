import * as ES from './es.js';
import * as Serif from './types.js';


type Escaped = string & {_tag: 'Escaped'}

const esFromIdentifierName = (name: string): ES.Identifier => {
  const escapeChar = (c: string): string => (
    '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
  );
  const escape = (name: string): Escaped => (
    /^[a-z][a-z0-9]*$/i.test(name) && !ES.RESERVED_WORDS.has(name)
    ? name as Escaped
    : '_' + name.replace(/[^a-z0-9]/gi, escapeChar) as Escaped
  );
  return esFromEscapedIdentifierName(escape(name));
};

const esFromEscapedIdentifierName = (name: Escaped): ES.Identifier => ({
  type: 'Identifier',
  name,
});

const esFromBooleanLiteral = (boolean: Serif.Boolean): ES.Literal => (
  ES.Literal(boolean.value)
);

const esFromNumber = (number: Serif.Number): ES.UnaryExpression | ES.Literal => (
  number.value < 0
  ? ES.UnaryExpression('-', ES.Literal(-number.value))
  : ES.Literal(number.value)
);

const esFromString = (string: Serif.String): ES.Literal => (
  ES.Literal(string.value)
);

const esFromSymbol = (symbol: Serif.Symbol): ES.CallExpression => (
  ES.CallExpression(
    ES.MemberExpression(
      esFromEscapedIdentifierName('Symbol' as Escaped),
      esFromEscapedIdentifierName('for' as Escaped),
    ),
    [ES.Literal(symbol.name)],
  )
);

const esFromMetaProperty = (metaProperty: Serif.MetaProperty): ES.MetaProperty => (
  ES.MetaProperty(
    esFromEscapedIdentifierName(metaProperty.meta as Escaped),
    esFromEscapedIdentifierName(metaProperty.property as Escaped),
  )
);

const esFromMemberExpression = (memberExpression: Serif.MemberExpression): ES.MemberExpression => (
  ES.MemberExpression(
    esFromExpression(memberExpression.object),
    esFromExpression(memberExpression.property),
    {computed: true}
  )
);

const esFromIdentifier = (identifier: Serif.Identifier): ES.Identifier => (
  esFromIdentifierName(identifier.name)
);

const esFromSpreadElement = (spreadElement: Serif.SpreadElement): ES.SpreadElement => (
  ES.SpreadElement(esFromExpression(spreadElement.argument))
);

const esFromArray = (array: Serif.Array): ES.ArrayExpression => (
  ES.ArrayExpression(
    array.elements.map(element =>
      element.type === 'SpreadElement'
      ? esFromSpreadElement(element)
      : esFromExpression(element)
    )
  )
);

const esFromObject = (object: Serif.Object): ES.ObjectExpression => (
  ES.ObjectExpression(
    object.properties.map(property =>
      property.type === 'SpreadElement'
      ? esFromSpreadElement(property)
      : ES.Property(esFromExpression(property.key), esFromExpression(property.value), {computed: true})
    )
  )
);

const esFromLambda = (lambda: Serif.Lambda): ES.ArrowFunctionExpression => (
  ES.ArrowFunctionExpression(
    [esFromIdentifier(lambda.parameter)],
    esFromExpression(lambda.body),
  )
);

const esFromStatement = (statement: Serif.Statement): ES.ExpressionStatement | ES.VariableDeclaration => {
  switch (statement.type) {
    case 'ExpressionStatement': return esFromExpressionStatement(statement);
    case 'declaration':         return esFromDeclaration(statement);
  }
};

const esFromBlockExpression = (blockExpression: Serif.BlockExpression): ES.Expression => {
  if (blockExpression.statements.length === 1 &&
      blockExpression.statements[0].type === 'ExpressionStatement') {
    return esFromExpression(blockExpression.statements[0].expression);
  }
  const last = blockExpression.statements[blockExpression.statements.length - 1];
  return ES.CallExpression(
    ES.ArrowFunctionExpression(
      [],
      ES.BlockStatement(
        last.type === 'declaration'
        ? [...blockExpression.statements.map(esFromStatement), ES.ReturnStatement(esFromIdentifierName(last.name))]
        : [...blockExpression.statements.slice(0, -1).map(esFromStatement), ES.ReturnStatement(esFromExpression(last.expression))]
      )
    ),
    []
  );
};

const esFromUnaryExpression = (unaryExpression: Serif.UnaryExpression): ES.UnaryExpression => (
  ES.UnaryExpression(
    unaryExpression.operator,
    esFromExpression(unaryExpression.argument)
  )
);

const esFromBinaryExpression = (binaryExpression: Serif.BinaryExpression): ES.BinaryExpression => (
  ES.BinaryExpression(
    binaryExpression.operator,
    esFromExpression(binaryExpression.left),
    esFromExpression(binaryExpression.right)
  )
);

const esFromLogicalExpression = (logicalExpression: Serif.LogicalExpression): ES.LogicalExpression => (
  ES.LogicalExpression(
    logicalExpression.operator,
    esFromExpression(logicalExpression.left),
    esFromExpression(logicalExpression.right),
  )
);

const esFromConditionalExpression = (conditionalExpression: Serif.ConditionalExpression): ES.ConditionalExpression => (
  ES.ConditionalExpression(
    esFromExpression(conditionalExpression.predicate),
    esFromExpression(conditionalExpression.consequent),
    esFromExpression(conditionalExpression.alternative),
  )
);

const esFromNew = (new_: Serif.New): ES.NewExpression => (
  ES.NewExpression(
    esFromExpression(new_.callee),
    new_.arguments.map(esFromExpression),
  )
);

const esFromApplication = (application: Serif.Application): ES.Expression => (
  application.arguments.reduce(
    (callee, argument) => ES.CallExpression(
      callee,
      argument.type === 'SpreadElement'
      ? [esFromSpreadElement(argument)]
      : [esFromExpression(argument)]
    ),
    esFromExpression(application.callee)
  )
);

const esFromCallExpression = (callExpression: Serif.CallExpression): ES.Expression => (
  ES.CallExpression(
    esFromExpression(callExpression.callee),
    callExpression.arguments.map(argument =>
      argument.type === 'SpreadElement'
      ? esFromSpreadElement(argument)
      : esFromExpression(argument)
    )
  )
);

const esFromDeclaration = (declaration: Serif.Declaration): ES.VariableDeclaration => (
  declaration.parameterNames.length === 0 ?
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(declaration.name),
      esFromExpression(declaration.expression),
    ),
  ]) :
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(declaration.name),
      ES.FunctionExpression(
        esFromIdentifierName(declaration.name),
        declaration.parameterNames.slice(0, 1).map(esFromIdentifierName),
        ES.BlockStatement([ES.ReturnStatement(declaration.parameterNames.slice(1).reduceRight(
          (body, name) => ES.ArrowFunctionExpression([esFromIdentifierName(name)], body),
          esFromExpression(declaration.expression)
        ))]),
      ),
    ),
  ])
);

const esFromExpressionStatement = (expressionStatement: Serif.ExpressionStatement): ES.ExpressionStatement => (
  ES.ExpressionStatement(esFromExpression(expressionStatement.expression))
);

const esFromExpression = (expr: Serif.Expression): ES.Expression => {
  switch (expr.type) {
    case 'BooleanLiteral':              return esFromBooleanLiteral(expr);
    case 'number':                      return esFromNumber(expr);
    case 'string':                      return esFromString(expr);
    case 'symbol':                      return esFromSymbol(expr);
    case 'MetaProperty':                return esFromMetaProperty(expr);
    case 'MemberExpression':            return esFromMemberExpression(expr);
    case 'identifier':                  return esFromIdentifier(expr);
    case 'array':                       return esFromArray(expr);
    case 'object':                      return esFromObject(expr);
    case 'lambda':                      return esFromLambda(expr);
    case 'BlockExpression':             return esFromBlockExpression(expr);
    case 'UnaryExpression':             return esFromUnaryExpression(expr);
    case 'BinaryExpression':            return esFromBinaryExpression(expr);
    case 'LogicalExpression':           return esFromLogicalExpression(expr);
    case 'ConditionalExpression':       return esFromConditionalExpression(expr);
    case 'new':                         return esFromNew(expr);
    case 'application':                 return esFromApplication(expr);
    case 'CallExpression':              return esFromCallExpression(expr);
  }
};

export async function toModule(
  module: Serif.Module,
  exportedNames: (source: string) => ReadonlyArray<string>,
): Promise<ES.Program> {
  const imports = await Promise.all(
    module.imports.map(async importDeclaration => ES.ImportDeclaration(
      importDeclaration.specifiers === '*' ?
      (importDeclaration.source.value.endsWith('.serif')
       ? (hiding => exportedNames(importDeclaration.source.value)
                    .filter(name => !hiding.has(name))
                    .map(esFromIdentifierName))
         (new Set(importDeclaration.hiding.map(ident => ident.name)))
       : (Object.keys(await import(importDeclaration.source.value)) as Array<Escaped>)
         .map(esFromEscapedIdentifierName))
      .map(local => ES.ImportSpecifier(local, local)) :
      importDeclaration.specifiers.map(specifier => {
        switch (specifier.type) {
          case 'ImportDefaultSpecifier': {
            return ES.ImportDefaultSpecifier(
              esFromIdentifier(specifier.local)
            );
          }
          case 'ImportSpecifier': {
            return ES.ImportSpecifier(
              esFromIdentifier(specifier.local),
              esFromIdentifier(specifier.imported)
            );
          }
        }
      }),
      importDeclaration.source.value.replace(/[.]serif$/, '.js')
    ))
  );
  const statements = module.statements.map(statement => {
    switch (statement.type) {
      case 'declaration':         return esFromDeclaration(statement);
      case 'ExpressionStatement': return esFromExpressionStatement(statement);
    }
  });
  const exports = module.exports.map(exportDeclaration => {
    switch (exportDeclaration.type) {
      case 'ExportNamedDeclaration': {
        return ES.ExportNamedDeclaration(
          exportDeclaration.specifiers.map(specifier => ES.ExportSpecifier(esFromIdentifier(specifier)))
        );
      }
      case 'ExportDefaultDeclaration': {
        return ES.ExportDefaultDeclaration(
          esFromExpression(exportDeclaration.declaration)
        );
      }
    }
  });
  return ES.Program([...imports, ...statements, ...exports]);
}
