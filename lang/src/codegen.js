import {attemptP, chain, map, parallel, reject, resolve} from 'fluture';

import * as Prelude from './prelude.js';
import * as Serif from './types.js';


// https://262.ecma-international.org/13.0/#sec-keywords-and-reserved-words
const RESERVED_WORDS = Reflect.construct(Set, [[
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
]]);

const validEsIdentifierName = name => (
  /^[a-z][a-z0-9]*$/i.test(name)
);

const esFromIdentifierName = name => {
  const escapeChar = c => (
    '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
  );
  const escape = name => (
    RESERVED_WORDS.has(name)    ? name + '$' :
    validEsIdentifierName(name) ? name :
    /* else */                    name.replace(/[^a-z0-9_]/gi, escapeChar)
  );
  return esFromEscapedIdentifierName(escape(name));
};

const esFromEscapedIdentifierName = name => ({
  type: 'Identifier',
  name,
});

const esFromNullLiteral = {
  type: 'Literal',
  value: null,
};

const esFromLiteral = ({value}) => ({
  type: 'Literal',
  value,
});

const esFromTemplateLiteral = templateLiteral => {
  const [quasi, ...quasis] = templateLiteral.quasis;
  const lineEnding = ['\n', '\r\n'].find(lineEnding => quasi.raw.startsWith(lineEnding));
  if (lineEnding == null) {
    return {
      type: 'TemplateLiteral',
      quasis: templateLiteral.quasis.map(({tail, raw}) => ({type: 'TemplateElement', tail, value: {raw}})),
      expressions: templateLiteral.expressions.map(esFromNode),
    };
  }
  const indent = quasi.raw.slice(lineEnding.length).search(/(?! )/);
  const pattern = RegExp(`${lineEnding}[ ]{0,${indent}}`, 'g');
  const dedent = text => text.replace(pattern, lineEnding);
  return {
    type: 'TemplateLiteral',
    quasis: [
      {type: 'TemplateElement', tail: quasi.tail, value: {raw: dedent(quasi.raw).slice(lineEnding.length)}},
      ...quasis.map(quasi => ({type: 'TemplateElement', tail: quasi.tail, value: {raw: dedent(quasi.raw)}})),
    ],
    expressions: templateLiteral.expressions.map(esFromNode),
  };
};

const esFromMetaProperty = ({meta, property}) => ({
  type: 'MetaProperty',
  meta: esFromEscapedIdentifierName(meta),
  property: esFromEscapedIdentifierName(property),
});

const esFromMemberExpression = ({object, property}) => {
  const computed = !(
    property.type === 'StringLiteral' &&
    validEsIdentifierName(property.value)
  );
  return ({
    type: 'MemberExpression',
    object: esFromNode(object),
    property: computed ? esFromNode(property) : esFromEscapedIdentifierName(property.value),
    computed,
    optional: false,
  });
};

const esFromIdentifier = ({name}) => (
  esFromIdentifierName(name)
);

const esFromSpreadElement = ({argument}) => ({
  type: 'SpreadElement',
  argument: esFromNode(argument),
});

const esFromArrayExpression = ({elements}) => ({
  type: 'ArrayExpression',
  elements: elements.map(esFromNode),
});

const esFromProperty = property => {
  if (property.type === 'SpreadElement') return esFromSpreadElement(property);
  const computed = !(
    property.key.type === 'StringLiteral' &&
    validEsIdentifierName(property.key.value)
  );
  const key = computed ? esFromNode(property.key) : esFromEscapedIdentifierName(property.key.value);
  const value = esFromNode(property.value);
  return {
    type: 'Property',
    key,
    value,
    kind: 'init',
    method: false,
    shorthand: key.type === 'Identifier' && value.type === 'Identifier' && key.name === value.name,
    computed,
  };
};

const esFromObjectExpression = ({properties}) => ({
  type: 'ObjectExpression',
  properties: properties.map(esFromProperty),
});

const esFromArrowFunctionExpression = ({parameters, body}) => {
  const esBody = esFromNode(body);
  return {
    type: 'ArrowFunctionExpression',
    params: parameters.map(esFromNode),
    body: esBody,
    expression: esBody.type !== 'BlockStatement',
  };
};

const esFromBlockExpression = ({statements}) => ({
  type: 'CallExpression',
  callee: {
    type: 'ArrowFunctionExpression',
    params: [],
    body: {
      type: 'BlockStatement',
      body: (
        statements.at(-1).type === 'ExpressionStatement'
        ? [...statements.slice(0, -1).map(esFromNode),
           {type: 'ReturnStatement', argument: esFromNode(statements.at(-1).expression)}]
        : statements.map(esFromNode)
      ),
    },
    expression: false,
  },
  arguments: [],
  optional: false,
});

const esFromUnaryExpression = ({operator, argument}) => ({
  type: 'UnaryExpression',
  operator: operator,
  argument: esFromNode(argument),
  prefix: true,
});

const esFromBinaryExpression = ({operator, left, right}) => ({
  type: 'BinaryExpression',
  operator: (() => {
    switch (operator) {
      case '==':  return '===';
      case '!=':  return '!==';
      default:    return operator;
    }
  })(),
  left: esFromNode(left),
  right: esFromNode(right),
});

const esFromLogicalExpression = ({operator, left, right}) => ({
  type: 'LogicalExpression',
  operator: (() => {
    switch (operator) {
      case 'and': return '&&';
      case 'or':  return '||';
      case '??':  return '??';
    }
  })(),
  left: esFromNode(left),
  right: esFromNode(right),
});

const esFromConditionalExpression = ({predicate, consequent, alternative}) => ({
  type: 'ConditionalExpression',
  test: esFromNode(predicate),
  consequent: esFromNode(consequent),
  alternate: esFromNode(alternative),
});

const esFromCallExpression = ({callee, arguments: args}) => ({
  type: 'CallExpression',
  callee: esFromNode(callee),
  arguments: args.map(esFromNode),
  optional: false,
});

const esFromVariableDeclaration = ({pattern, expression}) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [{
    type: 'VariableDeclarator',
    id: esFromNode(pattern),
    init: esFromNode(expression),
  }],
});

const esFromFunctionDeclaration = ({name, parameters, body}) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [{
    type: 'VariableDeclarator',
    id: esFromIdentifierName(name),
    init: parameters.reduceRight(
      (esBody, param) => ({
        type: 'ArrowFunctionExpression',
        params: [esFromNode(param)],
        body: esBody,
        expression: esBody.type !== 'BlockStatement',
      }),
      esFromNode(body)
    ),
  }],
});

const esFromExpressionStatement = ({expression}) => ({
  type: 'ExpressionStatement',
  expression: esFromNode(expression),
});

const esFromArrayPattern = ({elements}) => ({
  type: 'ArrayPattern',
  elements: elements.map(esFromNode),
});

const esFromElision = null;

const esFromObjectPattern = ({properties}) => ({
  type: 'ObjectPattern',
  properties: properties.map(esFromNode),
});

const esFromRestElement = ({argument}) => ({
  type: 'RestElement',
  argument,
});

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
        : resolve({
            type: 'ImportDeclaration',
            specifiers: (
              names
              .map(esFromIdentifierName)
              .map(local => ({type: 'ImportSpecifier', local, imported: local}))
            ),
            source: {
              type: 'Literal',
              value: source.replace(/[.]serif$/, '.js'),
            },
          })
      );
    } else {
      return (
        chain(names => $hiding.size > 0
                       ? reject(unnecessaryHiding(source, hiding, Array.from($hiding.values())))
                       : resolve({
                           type: 'ImportDeclaration',
                           specifiers: (
                             names
                             .map(esFromEscapedIdentifierName)
                             .map(local => ({type: 'ImportSpecifier', local, imported: local}))
                           ),
                           source: {
                             type: 'Literal',
                             value: source,
                           },
                         }))
             (map(module => Object.keys(module).filter(visible))
                 (attemptP(() => import(source))))
      );
    }
  } else {
    return resolve({
      type: 'ImportDeclaration',
      specifiers: importDeclaration.specifiers.map(specifier => {
        switch (specifier.type) {
          case 'ImportDefaultSpecifier': {
            return {
              type: 'ImportDefaultSpecifier',
              local: esFromIdentifier(specifier.local),
            };
          }
          case 'ImportNamespaceSpecifier': {
            return {
              type: 'ImportNamespaceSpecifier',
              local: esFromIdentifier(specifier.local),
            };
          }
          case 'ImportSpecifier': {
            return {
              type: 'ImportSpecifier',
              local: esFromIdentifier(specifier.local),
              imported: esFromIdentifier(specifier.imported),
            };
          }
        }
      }),
      source: {
        type: 'Literal',
        value: importDeclaration.source.value.replace(/[.]serif$/, '.js'),
      },
    });
  }
};

const esFromExportNamedDeclaration = ({specifiers}) => ({
  type: 'ExportNamedDeclaration',
  specifiers: specifiers.map(esFromNode).map(local => ({
    type: 'ExportSpecifier',
    local,
    exported: local,
  })),
});

const esFromExportDefaultDeclaration = ({declaration}) => ({
  type: 'ExportDefaultDeclaration',
  declaration: esFromNode(declaration),
});

const esFromNode = expr => {
  switch (expr.type) {
    case 'NullLiteral':                 return esFromNullLiteral;
    case 'BooleanLiteral':              return esFromLiteral(expr);
    case 'NumberLiteral':               return esFromLiteral(expr);
    case 'StringLiteral':               return esFromLiteral(expr);
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
    case 'CallExpression':              return esFromCallExpression(expr);
    case 'SpreadElement':               return esFromSpreadElement(expr);
    case 'ExpressionStatement':         return esFromExpressionStatement(expr);
    case 'VariableDeclaration':         return esFromVariableDeclaration(expr);
    case 'FunctionDeclaration':         return esFromFunctionDeclaration(expr);
    case 'Property':                    return esFromProperty(expr);
    case 'ArrayPattern':                return esFromArrayPattern(expr);
    case 'Elision':                     return esFromElision;
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
    case 'ArrayPattern':  return node.elements.flatMap(namesInPattern);
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
    map(imports => ({
      type: 'Program',
      sourceType: 'module',
      body: [
        ...imports,
        esFromVariableDeclaration(
          Serif.VariableDeclaration(Serif.Identifier('Prelude'))
                                   (Serif.ObjectExpression(Object.entries(Prelude)
                                                           .map(([name, expr]) => Serif.Property(Serif.StringLiteral(name))(expr))))
        ),
        esFromVariableDeclaration(
          Serif.VariableDeclaration(Serif.ObjectPattern(Object.keys(Prelude)
                                                        // Do not unpack if name conflicts with a top-level binding:
                                                        .filter(name => !topLevelNames.has(name))
                                                        .map(name => Serif.Property(Serif.StringLiteral(name))(Serif.Identifier(name)))))
                                   (Serif.Identifier('Prelude'))
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
      ],
    }))
    (parallel(16)(module.imports.map(statement => esFromImportDeclaration(exportedNames)(statement))))
  );
}
