import type * as ES from 'estree';

import * as es from './es.js';
import * as Serif from './types.js';


type Escaped = string & {_tag: 'Escaped'}

// https://262.ecma-international.org/13.0/#sec-keywords-and-reserved-words
const esReservedWords = new Set([
  // reserved words
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  // future reserved words
  'enum',
  'implements',
  'interface',
  'package',
  'private',
  'protected',
  'public',
]);

const escapeChar = (c: string): string => (
  '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
);

const escape = (name: string): Escaped => (
  /^[a-z][a-z0-9]*$/i.test(name) && !esReservedWords.has(name)
  ? name as Escaped
  : '_' + name.replace(/[^a-z0-9]/gi, escapeChar) as Escaped
);

const Identifier = (name: Escaped): ES.Identifier => ({type: 'Identifier', name});

const esFromBooleanLiteral = (boolean: Serif.Boolean): ES.Literal => (
  es.Literal(boolean.value)
);

const esFromNumber = (number: Serif.Number): ES.UnaryExpression | ES.Literal => (
  number.value < 0
  ? es.UnaryExpression('-', es.Literal(-number.value))
  : es.Literal(number.value)
);

const esFromString = (string: Serif.String): ES.Literal => (
  es.Literal(string.value)
);

const esFromSymbol = (symbol: Serif.Symbol): ES.CallExpression => (
  es.CallExpression(
    es.MemberExpression(
      Identifier('Symbol' as Escaped),
      Identifier('for' as Escaped),
    ),
    [es.Literal(symbol.name)],
  )
);

const esFromMetaProperty = (metaProperty: Serif.MetaProperty): ES.MetaProperty => (
  es.MetaProperty(
    Identifier(metaProperty.meta as Escaped),
    Identifier(metaProperty.property as Escaped),
  )
);

const esFromMemberExpression = (memberExpression: Serif.MemberExpression): ES.MemberExpression => (
  es.MemberExpression(
    esFromExpression(memberExpression.object),
    esFromExpression(memberExpression.property),
    {computed: true}
  )
);

const esFromIdentifier = (identifier: Serif.Identifier): ES.Identifier => (
  Identifier(escape(identifier.name))
);

const esFromSpreadElement = (spreadElement: Serif.SpreadElement): ES.SpreadElement => (
  es.SpreadElement(esFromExpression(spreadElement.argument))
);

const esFromArray = (array: Serif.Array): ES.ArrayExpression => (
  es.ArrayExpression(
    array.elements.map(element =>
      element.type === 'SpreadElement'
      ? esFromSpreadElement(element)
      : esFromExpression(element)
    )
  )
);

const esFromObject = (object: Serif.Object): ES.ObjectExpression => (
  es.ObjectExpression(
    object.properties.map(property =>
      property.type === 'SpreadElement'
      ? esFromSpreadElement(property)
      : es.Property(esFromExpression(property.key), esFromExpression(property.value), {computed: true})
    )
  )
);

const esFromLambda = (lambda: Serif.Lambda): ES.ArrowFunctionExpression => (
  es.ArrowFunctionExpression(
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
  return es.CallExpression(
    es.ArrowFunctionExpression(
      [],
      es.BlockStatement(
        last.type === 'declaration'
        ? [...blockExpression.statements.map(esFromStatement), es.ReturnStatement(Identifier(escape(last.name)))]
        : [...blockExpression.statements.slice(0, -1).map(esFromStatement), es.ReturnStatement(esFromExpression(last.expression))]
      )
    ),
    []
  );
};

const esFromUnaryExpression = (unaryExpression: Serif.UnaryExpression): ES.UnaryExpression => (
  es.UnaryExpression(
    unaryExpression.operator,
    esFromExpression(unaryExpression.argument)
  )
);

const esFromBinaryExpression = (binaryExpression: Serif.BinaryExpression): ES.BinaryExpression => (
  es.BinaryExpression(
    binaryExpression.operator,
    esFromExpression(binaryExpression.left),
    esFromExpression(binaryExpression.right)
  )
);

const esFromLogicalExpression = (logicalExpression: Serif.LogicalExpression): ES.LogicalExpression => (
  es.LogicalExpression(
    logicalExpression.operator,
    esFromExpression(logicalExpression.left),
    esFromExpression(logicalExpression.right),
  )
);

const esFromConditionalExpression = (conditionalExpression: Serif.ConditionalExpression): ES.ConditionalExpression => (
  es.ConditionalExpression(
    esFromExpression(conditionalExpression.predicate),
    esFromExpression(conditionalExpression.consequent),
    esFromExpression(conditionalExpression.alternative),
  )
);

const esFromNew = (new_: Serif.New): ES.NewExpression => (
  es.NewExpression(
    esFromExpression(new_.callee),
    new_.arguments.map(esFromExpression),
  )
);

const esFromApplication = (application: Serif.Application): ES.Expression => (
  application.arguments.reduce(
    (callee, argument) => es.CallExpression(
      callee,
      argument.type === 'SpreadElement'
      ? [esFromSpreadElement(argument)]
      : [esFromExpression(argument)]
    ),
    esFromExpression(application.callee)
  )
);

const esFromCallExpression = (callExpression: Serif.CallExpression): ES.Expression => (
  es.CallExpression(
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
  es.VariableDeclaration([
    es.VariableDeclarator(
      Identifier(escape(declaration.name)),
      esFromExpression(declaration.expression),
    ),
  ]) :
  es.VariableDeclaration([
    es.VariableDeclarator(
      Identifier(escape(declaration.name)),
      es.FunctionExpression(
        Identifier(escape(declaration.name)),
        declaration.parameterNames.slice(0, 1).map(name => Identifier(escape(name))),
        es.BlockStatement([es.ReturnStatement(declaration.parameterNames.slice(1).reduceRight(
          (body, name) => es.ArrowFunctionExpression([Identifier(escape(name))], body),
          esFromExpression(declaration.expression)
        ))]),
      ),
    ),
  ])
);

const esFromExpressionStatement = (expressionStatement: Serif.ExpressionStatement): ES.ExpressionStatement => (
  es.ExpressionStatement(esFromExpression(expressionStatement.expression))
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
    module.imports.map(async importDeclaration => es.ImportDeclaration(
      importDeclaration.specifiers === '*' ?
      (importDeclaration.source.value.endsWith('.serif')
       ? (hiding => exportedNames(importDeclaration.source.value)
                    .filter(name => !hiding.has(name))
                    .map(escape))
         (new Set(importDeclaration.hiding.map(ident => ident.name)))
       : Object.keys(await import(importDeclaration.source.value)) as Array<Escaped>)
      .map(name => es.ImportSpecifier(Identifier(name), Identifier(name))) :
      importDeclaration.specifiers.map(specifier => {
        switch (specifier.type) {
          case 'ImportDefaultSpecifier': {
            return es.ImportDefaultSpecifier(
              esFromIdentifier(specifier.local)
            );
          }
          case 'ImportSpecifier': {
            return es.ImportSpecifier(
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
        return es.ExportNamedDeclaration(
          exportDeclaration.specifiers.map(specifier => es.ExportSpecifier(esFromIdentifier(specifier)))
        );
      }
      case 'ExportDefaultDeclaration': {
        return es.ExportDefaultDeclaration(
          esFromExpression(exportDeclaration.declaration)
        );
      }
    }
  });
  return es.Program([...imports, ...statements, ...exports]);
}
