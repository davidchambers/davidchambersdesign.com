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
  ES.Literal(numberLiteral.value)
);

const esFromStringLiteral = (stringLiteral: Serif.StringLiteral): ES.Literal => (
  ES.Literal(stringLiteral.value)
);

const esFromTemplateLiteral = (templateLiteral: Serif.TemplateLiteral): ES.TemplateLiteral => {
  const [quasi, ...quasis] = templateLiteral.quasis;
  const lineEnding = ['\n', '\r\n'].find(lineEnding => quasi.raw.startsWith(lineEnding));
  if (lineEnding == null) return ES.TemplateLiteral(
    templateLiteral.quasis.map(quasi => ES.TemplateElement(quasi.raw, quasi.tail)),
    templateLiteral.expressions.map(esFromExpression),
  );
  const indent = quasi.raw.slice(lineEnding.length).search(/(?! )/);
  const pattern = new RegExp(`${lineEnding}[ ]{0,${indent}}`, 'g');
  const dedent = (text: string): string => text.replace(pattern, lineEnding);
  return ES.TemplateLiteral([
    ES.TemplateElement(dedent(quasi.raw).slice(lineEnding.length), quasi.tail),
    ...quasis.map(quasi => ES.TemplateElement(dedent(quasi.raw), quasi.tail)),
  ], templateLiteral.expressions.map(esFromExpression));
};

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
    objectExpression.properties.map(property => {
      if (property.type === 'SpreadElement') {
        return esFromSpreadElement(property);
      } else if (
        property.key.type === 'StringLiteral' &&
        validEsIdentifierName(property.key.value)
      ) {
        return ES.Property(
          esFromEscapedIdentifierName(property.key.value as Escaped),
          esFromExpression(property.value as Serif.Expression),
          {computed: false}
        );
      } else {
        return ES.Property(
          esFromExpression(property.key),
          esFromExpression(property.value as Serif.Expression),
          {computed: true}
        );
      }
    })
  )
);

const esFromArrayPattern = (arrayPattern: Serif.ArrayPattern): ES.ArrayPattern => (
  ES.ArrayPattern(arrayPattern.elements.map(element =>
    element == null ? null : esFromPattern(element)
  ))
);

const esFromObjectPattern = (objectPattern: Serif.ObjectPattern): ES.ObjectPattern => (
  ES.ObjectPattern(objectPattern.properties.map(property => {
    switch (property.type) {
      case 'Property':        return ES.AssignmentProperty(esFromExpression(property.key), esFromPattern(property.value));
      case 'RestElement':     return ES.RestElement(esFromIdentifier(property.argument));
    }
  }))
);

const esFromPattern = (pattern: Serif.Pattern): ES.Pattern => {
  switch (pattern.type) {
    case 'ArrayPattern':    return esFromArrayPattern(pattern);
    case 'ObjectPattern':   return esFromObjectPattern(pattern);
    case 'RestElement':     return ES.RestElement(esFromIdentifier(pattern.argument));
    case 'Identifier':      return esFromIdentifier(pattern);
  }
};

const esFromArrowFunctionExpression = (arrowFunctionExpression: Serif.ArrowFunctionExpression): ES.ArrowFunctionExpression => (
  ES.ArrowFunctionExpression(
    arrowFunctionExpression.parameters.map(esFromPattern),
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
        last.type === 'ExpressionStatement'
        ? [...blockExpression.statements.slice(0, -1).map(esFromStatement), ES.ReturnStatement(esFromExpression(last.expression))]
        : blockExpression.statements.map(esFromStatement)
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
    (() => {
      switch (binaryExpression.operator) {
        case '==':  return '===';
        case '!=':  return '!==';
        default:    return binaryExpression.operator;
      }
    })(),
    esFromExpression(binaryExpression.left),
    esFromExpression(binaryExpression.right)
  )
);

const esFromLogicalExpression = (logicalExpression: Serif.LogicalExpression): ES.LogicalExpression => (
  ES.LogicalExpression(
    (() => {
      switch (logicalExpression.operator) {
        case 'and': return '&&';
        case 'or':  return '||';
        case '??':  return '??';
      }
    })(),
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

const replaceTopicReferencesInArrayExpression = (replacement: Serif.Expression) => (arrayExpression: Serif.ArrayExpression): Serif.ArrayExpression => (
  Serif.ArrayExpression(arrayExpression.elements.map(element =>
    element.type === 'SpreadElement'
    ? Serif.SpreadElement(replaceTopicReferences(replacement)(element.argument))
    : replaceTopicReferences(replacement)(element)
  ))
);

const TOPIC_REFERENCE_NAME = '?';

const replaceTopicReferencesInIdentifier = (replacement: Serif.Expression) => (identifier: Serif.Identifier): Serif.Expression => (
  identifier.name === TOPIC_REFERENCE_NAME ? replacement : identifier
);

const replaceTopicReferencesInObjectExpression = (replacement: Serif.Expression) => (objectExpression: Serif.ObjectExpression): Serif.ObjectExpression => (
  Serif.ObjectExpression(objectExpression.properties.map(property => {
    if (property.type === 'SpreadElement') {
      return Serif.SpreadElement(replaceTopicReferences(replacement)(property.argument));
    } else {
      switch (property.value.type) {
        case 'ArrayPattern':    return Serif.Property(property.key, Serif.ArrayPattern(property.value.elements.map(element => element == null ? null : replaceTopicReferencesInPattern(replacement)(element))));
        case 'ObjectPattern':   return Serif.Property(property.key, replaceTopicReferencesInPattern(replacement)(property.value));
        case 'RestElement':     return Serif.Property(property.key, Serif.RestElement(replaceTopicReferencesInIdentifier(replacement)(property.value.argument) as Serif.Identifier));
        case 'Identifier':      return Serif.Property(property.key, replaceTopicReferencesInIdentifier(replacement)(property.value));
        default:                return Serif.Property(property.key, replaceTopicReferences(replacement)(property.value));
      }
    }
  }))
);

const replaceTopicReferencesInStatement = (replacement: Serif.Expression) => (statement: Serif.Statement): Serif.Statement => {
  switch (statement.type) {
    case 'VariableDeclaration': return Serif.VariableDeclaration(statement.pattern, replaceTopicReferences(replacement)(statement.expression));
    case 'FunctionDeclaration': return Serif.FunctionDeclaration(statement.name, statement.parameters, replaceTopicReferences(replacement)(statement.body));
    case 'ExpressionStatement': return Serif.ExpressionStatement(replaceTopicReferences(replacement)(statement.expression));
  }
};

const replaceTopicReferencesInBlockExpression = (replacement: Serif.Expression) => (blockExpression: Serif.BlockExpression): Serif.BlockExpression => {
  const [head, ...tail] = blockExpression.statements;
  return Serif.BlockExpression([
    replaceTopicReferencesInStatement(replacement)(head),
    ...tail.map(replaceTopicReferencesInStatement(replacement)),
  ]);
};

const replaceTopicReferencesInApplication = (replacement: Serif.Expression) => (application: Serif.Application): Serif.Application => (
  Serif.Application(
    replaceTopicReferences(replacement)(application.callee),
    application.arguments.map(argument =>
      argument.type === 'SpreadElement'
      ? Serif.SpreadElement(replaceTopicReferences(replacement)(argument.argument))
      : replaceTopicReferences(replacement)(argument)
    )
  )
);

const replaceTopicReferencesInCallExpression = (replacement: Serif.Expression) => (callExpression: Serif.CallExpression): Serif.CallExpression => (
  Serif.CallExpression(
    replaceTopicReferences(replacement)(callExpression.callee),
    callExpression.arguments.map(argument =>
      argument.type === 'SpreadElement'
      ? Serif.SpreadElement(replaceTopicReferences(replacement)(argument.argument))
      : replaceTopicReferences(replacement)(argument)
    )
  )
);

const replaceTopicReferencesInPattern = (replacement: Serif.Expression) => (pattern: Serif.Pattern): Serif.Pattern => {
  switch (pattern.type) {
    case 'ArrayPattern':    return Serif.ArrayPattern(pattern.elements.map(element => element == null ? null : replaceTopicReferencesInPattern(replacement)(element)));
    case 'ObjectPattern':   return Serif.ObjectPattern(pattern.properties.map(property => property.type === 'RestElement' ? property : Serif.AssignmentProperty(property.key, replaceTopicReferencesInPattern(replacement)(property.value))));
    case 'RestElement':     return pattern;
    case 'Identifier':      return pattern;
  }
};

const patternContainsTopicReference = (pattern: Serif.Pattern): boolean => {
  switch (pattern.type) {
    case 'ArrayPattern':                return pattern.elements.some(element => element != null && patternContainsTopicReference(element));
    case 'ObjectPattern':               return pattern.properties.some(property => { switch (property.type) { case 'RestElement': return containsTopicReference(property.argument); case 'Property': return containsTopicReference(property.key) || patternContainsTopicReference(property.value); } });
    case 'RestElement':                 return containsTopicReference(pattern.argument);
    case 'Identifier':                  return containsTopicReference(pattern);
  }
};

const statementContainsTopicReference = (statement: Serif.Statement): boolean => {
  switch (statement.type) {
    case 'VariableDeclaration':         return containsTopicReference(statement.expression);
    case 'FunctionDeclaration':         return containsTopicReference(statement.body);
    case 'ExpressionStatement':         return containsTopicReference(statement.expression);
  }
};

const containsTopicReference = (expr: Serif.Expression): boolean => {
  switch (expr.type) {
    case 'BooleanLiteral':              return false;
    case 'NumberLiteral':               return false;
    case 'StringLiteral':               return false;
    case 'TemplateLiteral':             return expr.expressions.some(containsTopicReference);
    case 'MetaProperty':                return false;
    case 'MemberExpression':            return containsTopicReference(expr.object) || containsTopicReference(expr.property);
    case 'Identifier':                  return expr.name === TOPIC_REFERENCE_NAME;
    case 'ArrayExpression':             return expr.elements.some(element => element.type === 'SpreadElement' ? containsTopicReference(element.argument) : containsTopicReference(element));
    case 'ObjectExpression':            return expr.properties.some(property => property.type === 'SpreadElement' ? containsTopicReference(property.argument) : containsTopicReference(property.key) || (() => { switch (property.value.type) { case 'BooleanLiteral': return containsTopicReference(property.value); case 'NumberLiteral': return containsTopicReference(property.value); case 'StringLiteral': return containsTopicReference(property.value); case 'TemplateLiteral': return containsTopicReference(property.value); case 'MetaProperty': return containsTopicReference(property.value); case 'MemberExpression': return containsTopicReference(property.value); case 'Identifier': return containsTopicReference(property.value); case 'ArrayExpression': return containsTopicReference(property.value); case 'ObjectExpression': return containsTopicReference(property.value); case 'ArrowFunctionExpression': return containsTopicReference(property.value); case 'BlockExpression': return containsTopicReference(property.value); case 'UnaryExpression': return containsTopicReference(property.value); case 'BinaryExpression': return containsTopicReference(property.value); case 'LogicalExpression': return containsTopicReference(property.value); case 'ConditionalExpression': return containsTopicReference(property.value); case 'PipeExpression': return containsTopicReference(property.value); case 'NewExpression': return containsTopicReference(property.value); case 'Application': return containsTopicReference(property.value); case 'CallExpression': return containsTopicReference(property.value); case 'ArrayPattern': return patternContainsTopicReference(property.value); case 'ObjectPattern': return patternContainsTopicReference(property.value); case 'RestElement': return patternContainsTopicReference(property.value); } })());
    case 'ArrowFunctionExpression':     return containsTopicReference(expr.body);
    case 'BlockExpression':             return expr.statements.some(statementContainsTopicReference);
    case 'UnaryExpression':             return containsTopicReference(expr.argument);
    case 'BinaryExpression':            return containsTopicReference(expr.left) || containsTopicReference(expr.right);
    case 'LogicalExpression':           return containsTopicReference(expr.left) || containsTopicReference(expr.right);
    case 'ConditionalExpression':       return containsTopicReference(expr.predicate) || containsTopicReference(expr.consequent) || containsTopicReference(expr.alternative);
    case 'PipeExpression':              return false;
    case 'NewExpression':               return containsTopicReference(expr.callee) || expr.arguments.some(containsTopicReference);
    case 'Application':                 return containsTopicReference(expr.callee) || expr.arguments.some(argument => argument.type === 'SpreadElement' ? containsTopicReference(argument.argument) : containsTopicReference(argument));
    case 'CallExpression':              return containsTopicReference(expr.callee) || expr.arguments.some(argument => argument.type === 'SpreadElement' ? containsTopicReference(argument.argument) : containsTopicReference(argument));
  }
};

const replaceTopicReferences = (replacement: Serif.Expression) => (expr: Serif.Expression): Serif.Expression => {
  switch (expr.type) {
    case 'BooleanLiteral':              return expr;
    case 'NumberLiteral':               return expr;
    case 'StringLiteral':               return expr;
    case 'TemplateLiteral':             return Serif.TemplateLiteral(expr.quasis, expr.expressions.map(replaceTopicReferences(replacement)));
    case 'MetaProperty':                return expr;
    case 'MemberExpression':            return Serif.MemberExpression(replaceTopicReferences(replacement)(expr.object), replaceTopicReferences(replacement)(expr.property));
    case 'Identifier':                  return replaceTopicReferencesInIdentifier(replacement)(expr);
    case 'ArrayExpression':             return replaceTopicReferencesInArrayExpression(replacement)(expr);
    case 'ObjectExpression':            return replaceTopicReferencesInObjectExpression(replacement)(expr);
    case 'ArrowFunctionExpression':     return Serif.ArrowFunctionExpression(expr.parameters, replaceTopicReferences(replacement)(expr.body));
    case 'BlockExpression':             return replaceTopicReferencesInBlockExpression(replacement)(expr);
    case 'UnaryExpression':             return Serif.UnaryExpression(expr.operator, replaceTopicReferences(replacement)(expr.argument) as Serif.UnaryOperand);
    case 'BinaryExpression':            return Serif.BinaryExpression(expr.operator, replaceTopicReferences(replacement)(expr.left) as Serif.BinaryOperand, replaceTopicReferences(replacement)(expr.right) as Serif.BinaryOperand);
    case 'LogicalExpression':           return Serif.LogicalExpression(expr.operator, replaceTopicReferences(replacement)(expr.left) as Serif.LogicalOperand, replaceTopicReferences(replacement)(expr.right) as Serif.LogicalOperand);
    case 'ConditionalExpression':       return Serif.ConditionalExpression(replaceTopicReferences(replacement)(expr.predicate), replaceTopicReferences(replacement)(expr.consequent), replaceTopicReferences(replacement)(expr.alternative));
    case 'PipeExpression':              return replaceTopicReferences(replaceTopicReferences(replacement)(expr.head))(containsTopicReference(expr.body) ? expr.body : Serif.Application(expr.body, [Serif.Identifier(TOPIC_REFERENCE_NAME)]));
    case 'NewExpression':               return Serif.NewExpression(replaceTopicReferences(replacement)(expr.callee), expr.arguments.map(replaceTopicReferences(replacement)));
    case 'Application':                 return replaceTopicReferencesInApplication(replacement)(expr);
    case 'CallExpression':              return replaceTopicReferencesInCallExpression(replacement)(expr);
  }
};

const esFromPipeExpression = ({head, body}: Serif.PipeExpression): ES.Expression => (
  esFromExpression(
    replaceTopicReferences(head)(
      containsTopicReference(body)
      ? body
      : Serif.Application(body, [Serif.Identifier(TOPIC_REFERENCE_NAME)])
    )
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
      esFromPattern(variableDeclaration.pattern),
      esFromExpression(variableDeclaration.expression),
    ),
  ])
);

const esFromFunctionDeclaration = (functionDeclaration: Serif.FunctionDeclaration): ES.VariableDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(functionDeclaration.name),
      ES.ArrowFunctionExpression(
        functionDeclaration.parameters.slice(0, 1).map(esFromPattern),
        functionDeclaration.parameters.slice(1).reduceRight(
          (body, param) => ES.ArrowFunctionExpression([esFromPattern(param)], body),
          esFromExpression(functionDeclaration.body)
        ),
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
    case 'PipeExpression':              return esFromPipeExpression(expr);
    case 'NewExpression':               return esFromNewExpression(expr);
    case 'Application':                 return esFromApplication(expr);
    case 'CallExpression':              return esFromCallExpression(expr);
  }
};

const unnecessaryHiding = (
  source: string,
  hiding: ReadonlyArray<string>,
  names: ReadonlyArray<string>,
): Error => new Error(
  `import * from "${
    source
  }" hiding {${
    hiding.join(', ')
  }};\n\n${
    names.length > 2
    ? names.slice(0, -1).join(', ') + ', and ' + names.at(-1)
    : names.join(' and ')
  } ${
    names.length === 1 ? 'is' : 'are'
  } not exported so need not be hidden.\n`
);

export async function toModule(
  module: Serif.Module,
  exportedNames: (source: string) => ReadonlyArray<string>,
): Promise<ES.Program> {
  return ES.Program(
    await Promise.all(
      module.statements.map(async statement => {
        switch (statement.type) {
          case 'ImportDeclaration': {
            if (statement.specifiers === '*') {
              const source = statement.source.value;
              const hiding = statement.hiding.map(ident => ident.name);
              const $hiding = new Set(statement.hiding.map(ident => ident.name));
              const visible = (name: string): boolean => !$hiding.delete(name);
              if (source.endsWith('.serif')) {
                const names = exportedNames(source).filter(visible);
                if ($hiding.size > 0) throw unnecessaryHiding(source, hiding, Array.from($hiding.values()));
                return ES.ImportDeclaration(names.map(esFromIdentifierName).map(local => ES.ImportSpecifier(local, local)), source.replace(/[.]serif$/, '.js'));
              } else {
                const names = Object.keys(await import(source)).filter(visible);
                if ($hiding.size > 0) throw unnecessaryHiding(source, hiding, Array.from($hiding.values()));
                return ES.ImportDeclaration((names as Array<Escaped>).map(esFromEscapedIdentifierName).map(local => ES.ImportSpecifier(local, local)), source);
              }
            } else {
              return ES.ImportDeclaration(
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
