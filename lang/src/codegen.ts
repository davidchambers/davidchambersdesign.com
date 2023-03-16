import * as ES from './es.js';
import * as Serif from './types.js';


type Escaped = string & {_tag: 'Escaped'}

const validEsIdentifierName = (name: string): boolean => (
  /^[a-z][a-z0-9]*$/i.test(name)
);

const esFromIdentifierName = (name: string): ES.Identifier => {
  const escapeChar = (c: string): string => (
    '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
  );
  const escape = (name: string): Escaped => (
    ES.RESERVED_WORDS.has(name) ? name + '_' :
    validEsIdentifierName(name) ? name :
    /* else */                    name.replace(/[^a-z0-9]/gi, escapeChar)
  ) as Escaped;
  return esFromEscapedIdentifierName(escape(name));
};

const esFromEscapedIdentifierName = (name: Escaped): ES.Identifier => ({
  type: 'Identifier',
  name,
});

const esFromBooleanLiteral = (booleanLiteral: Serif.BooleanLiteral): ES.Literal => (
  ES.Literal(booleanLiteral.value)
);

const esFromNumberLiteral = (numberLiteral: Serif.NumberLiteral): ES.UnaryExpression | ES.Literal => (
  numberLiteral.value < 0
  ? ES.UnaryExpression('-', ES.Literal(-numberLiteral.value))
  : ES.Literal(numberLiteral.value)
);

const esFromStringLiteral = (stringLiteral: Serif.StringLiteral): ES.Literal => (
  ES.Literal(stringLiteral.value)
);

const dedentCond = (raw: string, lineEnding: '\n' | '\r\n'): string | null => {
  if (!raw.startsWith(lineEnding)) return null;
  const tail = raw.slice(lineEnding.length);
  const indent = tail.search(/(?! )/);
  return tail.replace(new RegExp(`^[ ]{0,${indent}}`, 'gm'), '');
};

const esFromTemplateLiteral = (templateLiteral: Serif.TemplateLiteral): ES.TemplateLiteral => (
  ES.TemplateLiteral(
    templateLiteral.quasis.map(quasi => ES.TemplateElement(
      dedentCond(quasi.raw, '\n') ?? dedentCond(quasi.raw, '\r\n') ?? quasi.raw,
      quasi.tail,
    )),
    templateLiteral.expressions.map(esFromExpression),
  )
);

const esFromSymbolLiteral = (symbolLiteral: Serif.SymbolLiteral): ES.CallExpression => (
  ES.CallExpression(
    esFromMemberExpression(Serif.MemberExpression(Serif.Identifier('Symbol'), Serif.StringLiteral('for'))),
    [ES.Literal(symbolLiteral.name)],
  )
);

const esFromMetaProperty = (metaProperty: Serif.MetaProperty): ES.MetaProperty => (
  ES.MetaProperty(
    esFromEscapedIdentifierName(metaProperty.meta as Escaped),
    esFromEscapedIdentifierName(metaProperty.property as Escaped),
  )
);

const esFromMemberExpression = (memberExpression: Serif.MemberExpression): ES.MemberExpression => (
  memberExpression.property.type === 'StringLiteral' && validEsIdentifierName(memberExpression.property.value) ?
  ES.MemberExpression(
    esFromExpression(memberExpression.object),
    esFromEscapedIdentifierName(memberExpression.property.value as Escaped),
    {computed: false}
  ) :
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

const esFromArrayExpression = (arrayExpression: Serif.ArrayExpression): ES.ArrayExpression => (
  ES.ArrayExpression(
    arrayExpression.elements.map(element =>
      element.type === 'SpreadElement'
      ? esFromSpreadElement(element)
      : esFromExpression(element)
    )
  )
);

const esFromObjectExpression = (objectExpression: Serif.ObjectExpression): ES.ObjectExpression => (
  ES.ObjectExpression(
    objectExpression.properties.map(property =>
      property.type === 'SpreadElement'
      ? esFromSpreadElement(property)
      : ES.Property(esFromExpression(property.key), esFromExpression(property.value), {computed: true})
    )
  )
);

const esFromArrowFunctionExpression = (arrowFunctionExpression: Serif.ArrowFunctionExpression): ES.ArrowFunctionExpression => (
  ES.ArrowFunctionExpression(
    [esFromIdentifier(arrowFunctionExpression.parameter)],
    esFromExpression(arrowFunctionExpression.body),
  )
);

const esFromStatement = (statement: Serif.Statement): ES.ExpressionStatement | ES.VariableDeclaration => {
  switch (statement.type) {
    case 'ExpressionStatement': return esFromExpressionStatement(statement);
    case 'VariableDeclaration': return esFromVariableDeclaration(statement);
    case 'FunctionDeclaration': return esFromFunctionDeclaration(statement);
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
        last.type !== 'ExpressionStatement'
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

const esFromNewExpression = (newExpression: Serif.NewExpression): ES.NewExpression => (
  ES.NewExpression(
    esFromExpression(newExpression.callee),
    newExpression.arguments.map(esFromExpression),
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

const esFromVariableDeclaration = (variableDeclaration: Serif.VariableDeclaration): ES.VariableDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(variableDeclaration.name),
      esFromExpression(variableDeclaration.expression),
    ),
  ])
);

const esFromFunctionDeclaration = (functionDeclaration: Serif.FunctionDeclaration): ES.VariableDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(functionDeclaration.name),
      ES.ArrowFunctionExpression(
        functionDeclaration.parameterNames.slice(0, 1).map(esFromIdentifierName),
        ES.BlockStatement([ES.ReturnStatement(functionDeclaration.parameterNames.slice(1).reduceRight(
          (body, name) => ES.ArrowFunctionExpression([esFromIdentifierName(name)], body),
          esFromExpression(functionDeclaration.body)
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
    case 'NumberLiteral':               return esFromNumberLiteral(expr);
    case 'StringLiteral':               return esFromStringLiteral(expr);
    case 'TemplateLiteral':             return esFromTemplateLiteral(expr);
    case 'SymbolLiteral':               return esFromSymbolLiteral(expr);
    case 'MetaProperty':                return esFromMetaProperty(expr);
    case 'MemberExpression':            return esFromMemberExpression(expr);
    case 'Identifier':                  return esFromIdentifier(expr);
    case 'ArrayExpression':             return esFromArrayExpression(expr);
    case 'ObjectExpression':            return esFromObjectExpression(expr);
    case 'ArrowFunctionExpression':     return esFromArrowFunctionExpression(expr);
    case 'BlockExpression':             return esFromBlockExpression(expr);
    case 'UnaryExpression':             return esFromUnaryExpression(expr);
    case 'BinaryExpression':            return esFromBinaryExpression(expr);
    case 'LogicalExpression':           return esFromLogicalExpression(expr);
    case 'ConditionalExpression':       return esFromConditionalExpression(expr);
    case 'NewExpression':               return esFromNewExpression(expr);
    case 'Application':                 return esFromApplication(expr);
    case 'CallExpression':              return esFromCallExpression(expr);
  }
};

export async function toModule(
  module: Serif.Module,
  exportedNames: (source: string) => ReadonlyArray<string>,
): Promise<ES.Program> {
  return ES.Program(
    await Promise.all(
      module.statements.map(async statement => {
        switch (statement.type) {
          case 'ImportDeclaration': {
            return ES.ImportDeclaration(
              statement.specifiers === '*' ?
              (statement.source.value.endsWith('.serif')
               ? (hiding => exportedNames(statement.source.value)
                            .filter(name => !hiding.has(name))
                            .map(esFromIdentifierName))
                 (new Set(statement.hiding.map(ident => ident.name)))
               : (Object.keys(await import(statement.source.value)) as Array<Escaped>)
                 .map(esFromEscapedIdentifierName))
              .map(local => ES.ImportSpecifier(local, local)) :
              statement.specifiers.map(specifier => {
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
              statement.source.value.replace(/[.]serif$/, '.js')
            );
          }
          case 'ExportNamedDeclaration': {
            return ES.ExportNamedDeclaration(
              statement.specifiers.map(specifier => ES.ExportSpecifier(esFromIdentifier(specifier)))
            );
          }
          case 'ExportDefaultDeclaration': {
            return ES.ExportDefaultDeclaration(
              esFromExpression(statement.declaration)
            );
          }
          case 'VariableDeclaration':
          case 'FunctionDeclaration':
          case 'ExpressionStatement': {
            return esFromStatement(statement);
          }
        }
      })
    )
  );
}
