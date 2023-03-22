import * as ES from './es.js';
import * as Prelude from './prelude.js';
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
    templateLiteral.expressions.map(esFromNode),
  );
  const indent = quasi.raw.slice(lineEnding.length).search(/(?! )/);
  const pattern = RegExp(`${lineEnding}[ ]{0,${indent}}`, 'g');
  const dedent = (text: string): string => text.replace(pattern, lineEnding);
  return ES.TemplateLiteral([
    ES.TemplateElement(dedent(quasi.raw).slice(lineEnding.length), quasi.tail),
    ...quasis.map(quasi => ES.TemplateElement(dedent(quasi.raw), quasi.tail)),
  ], templateLiteral.expressions.map(esFromNode));
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
    esFromNode(memberExpression.object),
    esFromEscapedIdentifierName(memberExpression.property.value as Escaped),
    {computed: false}
  ) :
  ES.MemberExpression(
    esFromNode(memberExpression.object),
    esFromNode(memberExpression.property),
    {computed: true}
  )
);

const esFromIdentifier = (identifier: Serif.Identifier): ES.Identifier => (
  esFromIdentifierName(identifier.name)
);

const esFromSpreadElement = (spreadElement: Serif.SpreadElement): ES.SpreadElement => (
  ES.SpreadElement(esFromNode(spreadElement.argument))
);

const esFromArrayExpression = (arrayExpression: Serif.ArrayExpression): ES.ArrayExpression => (
  ES.ArrayExpression(arrayExpression.elements.map(esFromNode))
);

const esFromProperty = (property: Serif.SpreadElement | Serif.Property): ES.SpreadElement | ES.Property => {
  if (property.type === 'SpreadElement') {
    return esFromSpreadElement(property);
  } else if (
    property.key.type === 'StringLiteral' &&
    validEsIdentifierName(property.key.value)
  ) {
    return ES.Property(
      esFromEscapedIdentifierName(property.key.value as Escaped),
      esFromNode(property.value),
      {computed: false}
    );
  } else {
    return ES.Property(
      esFromNode(property.key),
      esFromNode(property.value),
      {computed: true}
    );
  }
};

const esFromObjectExpression = (objectExpression: Serif.ObjectExpression): ES.ObjectExpression => (
  ES.ObjectExpression(objectExpression.properties.map(esFromProperty))
);

const esFromArrowFunctionExpression = (arrowFunctionExpression: Serif.ArrowFunctionExpression): ES.ArrowFunctionExpression => (
  ES.ArrowFunctionExpression(
    arrowFunctionExpression.parameters.map(esFromNode) as Array<ES.Pattern>,
    esFromNode(arrowFunctionExpression.body),
  )
);

const esFromBlockExpression = (blockExpression: Serif.BlockExpression): ES.Expression => {
  const last = blockExpression.statements[blockExpression.statements.length - 1];
  return ES.CallExpression(
    ES.ArrowFunctionExpression(
      [],
      ES.BlockStatement(
        last.type === 'ExpressionStatement'
        ? [...blockExpression.statements.slice(0, -1).map(esFromNode), ES.ReturnStatement(esFromNode(last.expression))] as Array<ES.Statement>
        : blockExpression.statements.map(esFromNode) as unknown as Array<ES.Statement>
      )
    ),
    []
  );
};

const esFromUnaryExpression = (unaryExpression: Serif.UnaryExpression): ES.UnaryExpression => (
  ES.UnaryExpression(
    unaryExpression.operator,
    esFromNode(unaryExpression.argument)
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
    esFromNode(binaryExpression.left),
    esFromNode(binaryExpression.right)
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
    esFromNode(logicalExpression.left),
    esFromNode(logicalExpression.right),
  )
);

const esFromConditionalExpression = (conditionalExpression: Serif.ConditionalExpression): ES.ConditionalExpression => (
  ES.ConditionalExpression(
    esFromNode(conditionalExpression.predicate),
    esFromNode(conditionalExpression.consequent),
    esFromNode(conditionalExpression.alternative),
  )
);

const esFromPipeExpression = ({head, body}: Serif.PipeExpression): ES.Expression => (
  esFromNode(Serif.CallExpression(body, [head]))
);

const esFromCallExpression = (callExpression: Serif.CallExpression): ES.CallExpression => (
  ES.CallExpression(
    esFromNode(callExpression.callee),
    callExpression.arguments.map(esFromNode),
  )
);

const esFromVariableDeclaration = (variableDeclaration: Serif.VariableDeclaration): ES.VariableDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromNode(variableDeclaration.pattern) as ES.Pattern,
      esFromNode(variableDeclaration.expression),
    ),
  ])
);

const esFromFunctionDeclaration = (functionDeclaration: Serif.FunctionDeclaration): ES.VariableDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(functionDeclaration.name),
      ES.ArrowFunctionExpression(
        functionDeclaration.parameters.slice(0, 1).map(esFromNode) as Array<ES.Pattern>,
        functionDeclaration.parameters.slice(1).reduceRight(
          (body, param) => ES.ArrowFunctionExpression([esFromNode(param) as ES.Pattern], body),
          esFromNode(functionDeclaration.body)
        ),
      ),
    ),
  ])
);

const esFromExpressionStatement = (expressionStatement: Serif.ExpressionStatement): ES.ExpressionStatement => (
  ES.ExpressionStatement(esFromNode(expressionStatement.expression))
);

const esFromArrayPattern = (arrayPattern: Serif.ArrayPattern): ES.ArrayPattern => (
  ES.ArrayPattern(arrayPattern.elements.map(element =>
    element == null ? null : esFromNode(element) as ES.Pattern
  ))
);

const esFromObjectPattern = (objectPattern: Serif.ObjectPattern): ES.ObjectPattern => (
  ES.ObjectPattern(objectPattern.properties.map(esFromNode) as unknown as Array<ES.AssignmentProperty>)
);

const esFromRestElement = (restElement: Serif.RestElement): ES.RestElement => (
  ES.RestElement(esFromIdentifier(restElement.argument))
);

const esFromImportDeclaration = (exportedNames: (source: string) => ReadonlyArray<string>) => async (importDeclaration: Serif.ImportDeclaration): Promise<ES.ImportDeclaration> => {
  if (importDeclaration.specifiers === '*') {
    const source = importDeclaration.source.value;
    const hiding = importDeclaration.hiding.map(ident => ident.name);
    const $hiding = Reflect.construct(Set, [importDeclaration.hiding.map(ident => ident.name)]) as Set<string>;
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
      importDeclaration.specifiers.map(specifier => {
        switch (specifier.type) {
          case 'ImportDefaultSpecifier': {
            return ES.ImportDefaultSpecifier(
              esFromIdentifier(specifier.local)
            );
          }
          case 'ImportNamespaceSpecifier': {
            return ES.ImportNamespaceSpecifier(
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
    );
  }
};

const esFromExportNamedDeclaration = (exportNamedDeclaration: Serif.ExportNamedDeclaration): ES.ExportNamedDeclaration => (
  ES.ExportNamedDeclaration(exportNamedDeclaration.specifiers.map(specifier =>
    ES.ExportSpecifier(esFromIdentifier(specifier))
  ))
);

const esFromExportDefaultDeclaration = (exportDefaultDeclaration: Serif.ExportDefaultDeclaration): ES.ExportDefaultDeclaration => (
  ES.ExportDefaultDeclaration(esFromNode(exportDefaultDeclaration.declaration))
);

const esFromNode = (expr: Serif.Node): ES.Expression => {
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
    case 'PropertyAccessor':            return ES.Literal('never');
    case 'BlockExpression':             return esFromBlockExpression(expr);
    case 'UnaryExpression':             return esFromUnaryExpression(expr);
    case 'BinaryExpression':            return esFromBinaryExpression(expr);
    case 'MapExpression':               return ES.Literal('never');
    case 'BindExpression':              return ES.Literal('never');
    case 'LogicalExpression':           return esFromLogicalExpression(expr);
    case 'ConditionalExpression':       return esFromConditionalExpression(expr);
    case 'PipeExpression':              return esFromPipeExpression(expr);
    case 'CallExpression':              return esFromCallExpression(expr);
    case 'SpreadElement':               return esFromSpreadElement(expr) as unknown as ES.Expression;
    case 'ExpressionStatement':         return esFromExpressionStatement(expr) as unknown as ES.Expression;
    case 'VariableDeclaration':         return esFromVariableDeclaration(expr) as unknown as ES.Expression;
    case 'FunctionDeclaration':         return esFromFunctionDeclaration(expr) as unknown as ES.Expression;
    case 'Property':                    return esFromProperty(expr) as unknown as ES.Expression;
    case 'ArrayPattern':                return esFromArrayPattern(expr) as unknown as ES.Expression;
    case 'ObjectPattern':               return esFromObjectPattern(expr) as unknown as ES.Expression;
    case 'RestElement':                 return esFromRestElement(expr) as unknown as ES.Expression;
    case 'ImportDeclaration':           return null as unknown as ES.Expression;
    case 'ExportNamedDeclaration':      return esFromExportNamedDeclaration(expr) as unknown as ES.Expression;
    case 'ExportDefaultDeclaration':    return esFromExportDefaultDeclaration(expr) as unknown as ES.Expression;
  }
};

const unnecessaryHiding = (
  source: string,
  hiding: ReadonlyArray<string>,
  names: ReadonlyArray<string>,
): Error => Reflect.construct(Error, [
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
  } not exported so need not be hidden.\n`,
]);

function namesInPattern(node: Serif.Node): Array<string> {
  switch (node.type) {
    case 'Identifier':    return [node.name];
    case 'ArrayPattern':  return node.elements.flatMap(element => element == null ? [] : namesInPattern(element));
    case 'ObjectPattern': return node.properties.flatMap(namesInPattern);
    case 'Property':      return namesInPattern(node.key);
    case 'RestElement':   return namesInPattern(node.argument);
    default:              return [];
  }
}

export async function toModule(
  module: Serif.Module,
  exportedNames: (source: string) => ReadonlyArray<string>,
): Promise<ES.Program> {
  const topLevelNames = new Set(
    module.statements.flatMap(statement => {
      switch (statement.type) {
        case 'VariableDeclaration': return namesInPattern(statement.pattern);
        case 'FunctionDeclaration': return [statement.name];
        default:                    return [];
      }
    })
  );
  return ES.Program([
    ...(
      await Promise.all(
        module.imports.map(async statement => esFromImportDeclaration(exportedNames)(statement))
      )
    ),
    esFromVariableDeclaration(
      Serif.VariableDeclaration(
        Serif.Identifier('Prelude'),
        Serif.ObjectExpression(
          Object.entries(Prelude).map(([name, expr]) => Serif.Property(Serif.StringLiteral(name), expr)),
        ),
      ),
    ),
    esFromVariableDeclaration(
      Serif.VariableDeclaration(
        Serif.ObjectPattern(
          Object.keys(Prelude)
          // Do not unpack if name conflicts with a top-level binding:
          .filter(name => !topLevelNames.has(name))
          .map(name => Serif.Property(Serif.StringLiteral(name), Serif.Identifier(name)))
        ),
        Serif.Identifier('Prelude'),
      ),
    ),
    ...(
      module.statements.flatMap(statement => {
        switch (statement.type) {
          case 'VariableDeclaration':
          case 'FunctionDeclaration':
          case 'ExpressionStatement':       return [esFromNode(statement)];
          default:                          return [];
        }
      })
    ),
    ...(
      module.exports.map(statement => {
        switch (statement.type) {
          case 'ExportNamedDeclaration':    return esFromExportNamedDeclaration(statement);
          case 'ExportDefaultDeclaration':  return esFromExportDefaultDeclaration(statement);
        }
      })
    ),
  ] as any);
}
