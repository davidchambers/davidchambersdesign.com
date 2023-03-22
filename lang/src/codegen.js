import {attemptP, chain, map, parallel, reject, resolve} from 'fluture';

import * as ES from './es.js';
import * as Prelude from './prelude.js';
import * as Serif from './types.js';


const validEsIdentifierName = name => (
  /^[a-z][a-z0-9]*$/i.test(name)
);

const esFromIdentifierName = name => {
  const escapeChar = c => (
    '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
  );
  const escape = name => (
    ES.RESERVED_WORDS.has(name) ? name + '_' :
    validEsIdentifierName(name) ? name :
    /* else */                    name.replace(/[^a-z0-9]/gi, escapeChar)
  );
  return esFromEscapedIdentifierName(escape(name));
};

const esFromEscapedIdentifierName = name => ({
  type: 'Identifier',
  name,
});

const esFromBooleanLiteral = booleanLiteral => (
  ES.Literal(booleanLiteral.value)
);

const esFromNumberLiteral = numberLiteral => (
  ES.Literal(numberLiteral.value)
);

const esFromStringLiteral = stringLiteral => (
  ES.Literal(stringLiteral.value)
);

const esFromTemplateLiteral = templateLiteral => {
  const [quasi, ...quasis] = templateLiteral.quasis;
  const lineEnding = ['\n', '\r\n'].find(lineEnding => quasi.raw.startsWith(lineEnding));
  if (lineEnding == null) return ES.TemplateLiteral(
    templateLiteral.quasis.map(quasi => ES.TemplateElement(quasi.raw, quasi.tail)),
    templateLiteral.expressions.map(esFromNode),
  );
  const indent = quasi.raw.slice(lineEnding.length).search(/(?! )/);
  const pattern = RegExp(`${lineEnding}[ ]{0,${indent}}`, 'g');
  const dedent = text => text.replace(pattern, lineEnding);
  return ES.TemplateLiteral([
    ES.TemplateElement(dedent(quasi.raw).slice(lineEnding.length), quasi.tail),
    ...quasis.map(quasi => ES.TemplateElement(dedent(quasi.raw), quasi.tail)),
  ], templateLiteral.expressions.map(esFromNode));
};

const esFromMetaProperty = metaProperty => (
  ES.MetaProperty(
    esFromEscapedIdentifierName(metaProperty.meta),
    esFromEscapedIdentifierName(metaProperty.property),
  )
);

const esFromMemberExpression = memberExpression => (
  memberExpression.property.type === 'StringLiteral' && validEsIdentifierName(memberExpression.property.value) ?
  ES.MemberExpression(
    esFromNode(memberExpression.object),
    esFromEscapedIdentifierName(memberExpression.property.value),
    {computed: false}
  ) :
  ES.MemberExpression(
    esFromNode(memberExpression.object),
    esFromNode(memberExpression.property),
    {computed: true}
  )
);

const esFromIdentifier = identifier => (
  esFromIdentifierName(identifier.name)
);

const esFromSpreadElement = spreadElement => (
  ES.SpreadElement(esFromNode(spreadElement.argument))
);

const esFromArrayExpression = arrayExpression => (
  ES.ArrayExpression(arrayExpression.elements.map(esFromNode))
);

const esFromProperty = property => {
  if (property.type === 'SpreadElement') {
    return esFromSpreadElement(property);
  } else if (
    property.key.type === 'StringLiteral' &&
    validEsIdentifierName(property.key.value)
  ) {
    return ES.Property(
      esFromEscapedIdentifierName(property.key.value),
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

const esFromObjectExpression = objectExpression => (
  ES.ObjectExpression(objectExpression.properties.map(esFromProperty))
);

const esFromArrowFunctionExpression = arrowFunctionExpression => (
  ES.ArrowFunctionExpression(
    arrowFunctionExpression.parameters.map(esFromNode),
    esFromNode(arrowFunctionExpression.body),
  )
);

const esFromBlockExpression = blockExpression => {
  const last = blockExpression.statements[blockExpression.statements.length - 1];
  return ES.CallExpression(
    ES.ArrowFunctionExpression(
      [],
      ES.BlockStatement(
        last.type === 'ExpressionStatement'
        ? [...blockExpression.statements.slice(0, -1).map(esFromNode), ES.ReturnStatement(esFromNode(last.expression))]
        : blockExpression.statements.map(esFromNode)
      )
    ),
    []
  );
};

const esFromUnaryExpression = unaryExpression => (
  ES.UnaryExpression(
    unaryExpression.operator,
    esFromNode(unaryExpression.argument)
  )
);

const esFromBinaryExpression = binaryExpression => (
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

const esFromLogicalExpression = logicalExpression => (
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

const esFromConditionalExpression = conditionalExpression => (
  ES.ConditionalExpression(
    esFromNode(conditionalExpression.predicate),
    esFromNode(conditionalExpression.consequent),
    esFromNode(conditionalExpression.alternative),
  )
);

const esFromPipeExpression = ({head, body}) => (
  esFromNode(Serif.CallExpression(body, [head]))
);

const esFromCallExpression = callExpression => (
  ES.CallExpression(
    esFromNode(callExpression.callee),
    callExpression.arguments.map(esFromNode),
  )
);

const esFromVariableDeclaration = variableDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromNode(variableDeclaration.pattern),
      esFromNode(variableDeclaration.expression),
    ),
  ])
);

const esFromFunctionDeclaration = functionDeclaration => (
  ES.VariableDeclaration([
    ES.VariableDeclarator(
      esFromIdentifierName(functionDeclaration.name),
      ES.ArrowFunctionExpression(
        functionDeclaration.parameters.slice(0, 1).map(esFromNode),
        functionDeclaration.parameters.slice(1).reduceRight(
          (body, param) => ES.ArrowFunctionExpression([esFromNode(param)], body),
          esFromNode(functionDeclaration.body)
        ),
      ),
    ),
  ])
);

const esFromExpressionStatement = expressionStatement => (
  ES.ExpressionStatement(esFromNode(expressionStatement.expression))
);

const esFromArrayPattern = arrayPattern => (
  ES.ArrayPattern(arrayPattern.elements.map(element =>
    element == null ? null : esFromNode(element)
  ))
);

const esFromObjectPattern = objectPattern => (
  ES.ObjectPattern(objectPattern.properties.map(esFromNode))
);

const esFromRestElement = restElement => (
  ES.RestElement(esFromIdentifier(restElement.argument))
);

const esFromImportDeclaration = exportedNames => importDeclaration => {
  if (importDeclaration.specifiers === '*') {
    const source = importDeclaration.source.value;
    const hiding = importDeclaration.hiding.map(ident => ident.name);
    const $hiding = Reflect.construct(Set, [importDeclaration.hiding.map(ident => ident.name)]);
    const visible = name => !$hiding.delete(name);
    if (source.endsWith('.serif')) {
      const names = exportedNames(source).filter(visible);
      return (
        $hiding.size > 0
        ? reject(unnecessaryHiding(source, hiding, Array.from($hiding.values())))
        : resolve(ES.ImportDeclaration(names.map(esFromIdentifierName).map(local => ES.ImportSpecifier(local, local)), source.replace(/[.]serif$/, '.js')))
      );
    } else {
      return (
        chain(names => $hiding.size > 0
                       ? reject(unnecessaryHiding(source, hiding, Array.from($hiding.values())))
                       : resolve(ES.ImportDeclaration(names.map(esFromEscapedIdentifierName).map(local => ES.ImportSpecifier(local, local)), source)))
             (map(module => Object.keys(module).filter(visible))
                 (attemptP(() => import(source))))
      );
    }
  } else {
    return resolve(
      ES.ImportDeclaration(
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
      )
    );
  }
};

const esFromExportNamedDeclaration = exportNamedDeclaration => (
  ES.ExportNamedDeclaration(exportNamedDeclaration.specifiers.map(specifier =>
    ES.ExportSpecifier(esFromIdentifier(specifier))
  ))
);

const esFromExportDefaultDeclaration = exportDefaultDeclaration => (
  ES.ExportDefaultDeclaration(esFromNode(exportDefaultDeclaration.declaration))
);

const esFromNode = expr => {
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
    case 'CallExpression':              return esFromCallExpression(expr);
    case 'SpreadElement':               return esFromSpreadElement(expr);
    case 'ExpressionStatement':         return esFromExpressionStatement(expr);
    case 'VariableDeclaration':         return esFromVariableDeclaration(expr);
    case 'FunctionDeclaration':         return esFromFunctionDeclaration(expr);
    case 'Property':                    return esFromProperty(expr);
    case 'ArrayPattern':                return esFromArrayPattern(expr);
    case 'ObjectPattern':               return esFromObjectPattern(expr);
    case 'RestElement':                 return esFromRestElement(expr);
    case 'ExportNamedDeclaration':      return esFromExportNamedDeclaration(expr);
    case 'ExportDefaultDeclaration':    return esFromExportDefaultDeclaration(expr);
  }
};

const unnecessaryHiding = (
  source,
  hiding,
  names,
) => Reflect.construct(Error, [
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

function namesInPattern(node) {
  switch (node.type) {
    case 'Identifier':    return [node.name];
    case 'ArrayPattern':  return node.elements.flatMap(element => element == null ? [] : namesInPattern(element));
    case 'ObjectPattern': return node.properties.flatMap(namesInPattern);
    case 'Property':      return namesInPattern(node.key);
    case 'RestElement':   return namesInPattern(node.argument);
    default:              return [];
  }
}

export function toModule(module, exportedNames) {
  const topLevelNames = new Set(
    module.statements.flatMap(statement => {
      switch (statement.type) {
        case 'VariableDeclaration': return namesInPattern(statement.pattern);
        case 'FunctionDeclaration': return [statement.name];
        default:                    return [];
      }
    })
  );
  return (
    map(imports => ES.Program([
      ...imports,
      esFromVariableDeclaration(
        Serif.VariableDeclaration(
          Serif.Identifier('Prelude'),
          Serif.ObjectExpression(
            Object.entries(Prelude).map(([name, expr]) => Serif.Property(Serif.StringLiteral(name), expr))
          )
        )
      ),
      esFromVariableDeclaration(
        Serif.VariableDeclaration(
          Serif.ObjectPattern(
            Object.keys(Prelude)
            // Do not unpack if name conflicts with a top-level binding:
            .filter(name => !topLevelNames.has(name))
            .map(name => Serif.Property(Serif.StringLiteral(name), Serif.Identifier(name)))
          ),
          Serif.Identifier('Prelude')
        )
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
    ]))
    (parallel(16)(module.imports.map(statement => esFromImportDeclaration(exportedNames)(statement))))
  );
}
