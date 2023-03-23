import * as Future from 'fluture';
import * as Prelude_ from './prelude.js';
import * as Serif from './types.js';
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain['fantasy-land/chain'](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor['fantasy-land/map'](f)
};
const {chain, map} = Prelude;
const RESERVED_WORDS = Reflect.construct(Set, [[
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
    'enum',
    'implements',
    'interface',
    'package',
    'private',
    'protected',
    'public'
  ]]);
const validEsIdentifierName = name => Reflect.apply(RegExp.prototype.test, RegExp('^[a-z][a-z0-9]*$', 'i'), [name]);
const esFromIdentifierName = (() => {
  const escapeChar = c => '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
  const escape = name => RESERVED_WORDS.has(name) ? name + '$' : validEsIdentifierName(name) ? name : Reflect.apply(String.prototype.replace, name, [
    RegExp('[^a-z0-9_]', 'gi'),
    escapeChar
  ]);
  return name => esFromEscapedIdentifierName(escape(name));
})();
const esFromEscapedIdentifierName = name => ({
  type: 'Identifier',
  name
});
const esFromNullLiteral = {
  type: 'Literal',
  value: null
};
const esFromLiteral = ({value}) => ({
  type: 'Literal',
  value
});
const esFromMetaProperty = ({meta, property}) => ({
  type: 'MetaProperty',
  meta: esFromEscapedIdentifierName(meta),
  property: esFromEscapedIdentifierName(property)
});
const esFromIdentifier = ({name}) => esFromIdentifierName(name);
const esFromElision = null;
const esFromTemplateLiteral = ({expressions, quasis}) => ({
  type: 'TemplateLiteral',
  expressions: Prelude.map(esFromNode)(expressions),
  quasis: (() => {
    const lineEnding = [
      '\n',
      '\r\n'
    ].find(lineEnding => quasis[0].raw.startsWith(lineEnding));
    return lineEnding === undefined ? Prelude.map(({tail, raw}) => ({
      type: 'TemplateElement',
      tail,
      value: { raw }
    }))(quasis) : (() => {
      const [head, ...tail] = quasis;
      const indent = head.raw.slice(lineEnding.length).search(RegExp('(?! )'));
      const pattern = RegExp(`${ lineEnding }[ ]{0,${ indent }}`, 'g');
      const dedent = text => text.replace(pattern, lineEnding);
      return [
        {
          type: 'TemplateElement',
          tail: head.tail,
          value: { raw: dedent(head.raw).slice(lineEnding.length) }
        },
        ...Prelude.map(({tail, raw}) => ({
          type: 'TemplateElement',
          tail,
          value: { raw: dedent(raw) }
        }))(tail)
      ];
    })();
  })()
});
const esFromMemberExpression = ({object, property}) => (() => {
  const computed = !(property.type === 'StringLiteral' && validEsIdentifierName(property.value));
  return {
    type: 'MemberExpression',
    object: esFromNode(object),
    property: computed ? esFromNode(property) : esFromEscapedIdentifierName(property.value),
    computed,
    optional: false
  };
})();
const esFromSpreadElement = ({argument}) => ({
  type: 'SpreadElement',
  argument: esFromNode(argument)
});
const esFromArrayExpression = ({elements}) => ({
  type: 'ArrayExpression',
  elements: Prelude.map(esFromNode)(elements)
});
const esFromProperty = property => property.type === 'SpreadElement' ? esFromSpreadElement(property) : (() => {
  const computed = !(property.key.type === 'StringLiteral' && validEsIdentifierName(property.key.value));
  const key = computed ? esFromNode(property.key) : esFromEscapedIdentifierName(property.key.value);
  const value = esFromNode(property.value);
  const shorthand = key.type === 'Identifier' && value.type === 'Identifier' && key.name === value.name;
  return {
    type: 'Property',
    key,
    value,
    kind: 'init',
    method: false,
    shorthand,
    computed
  };
})();
const esFromObjectExpression = ({properties}) => ({
  type: 'ObjectExpression',
  properties: Prelude.map(esFromProperty)(properties)
});
const esFromArrowFunctionExpression = ({parameters, body}) => (() => {
  const esBody = esFromNode(body);
  return {
    type: 'ArrowFunctionExpression',
    params: Prelude.map(esFromNode)(parameters),
    body: esBody,
    expression: esBody.type !== 'BlockStatement'
  };
})();
const esFromBlockExpression = ({statements}) => ({
  type: 'CallExpression',
  callee: {
    type: 'ArrowFunctionExpression',
    params: [],
    body: {
      type: 'BlockStatement',
      body: (() => {
        const statements$0021 = [...statements];
        const last = statements$0021.pop();
        return last.type === 'ExpressionStatement' ? (() => {
          const return$ = {
            type: 'ReturnStatement',
            argument: esFromNode(last.expression)
          };
          return [
            ...Prelude.map(esFromNode)(statements$0021),
            return$
          ];
        })() : Prelude.map(esFromNode)(statements);
      })()
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const esFromUnaryExpression = ({operator, argument}) => ({
  type: 'UnaryExpression',
  operator,
  argument: esFromNode(argument),
  prefix: true
});
const esFromBinaryExpression = ({operator, left, right}) => ({
  type: 'BinaryExpression',
  operator: operator === '==' ? '===' : operator === '!=' ? '!==' : operator,
  left: esFromNode(left),
  right: esFromNode(right)
});
const esFromLogicalExpression = ({operator, left, right}) => ({
  type: 'LogicalExpression',
  operator: operator === 'and' ? '&&' : operator === 'or' ? '||' : operator,
  left: esFromNode(left),
  right: esFromNode(right)
});
const esFromConditionalExpression = ({predicate, consequent, alternative}) => ({
  type: 'ConditionalExpression',
  test: esFromNode(predicate),
  consequent: esFromNode(consequent),
  alternate: esFromNode(alternative)
});
const esFromCallExpression = ({
  callee,
  arguments: args
}) => ({
  type: 'CallExpression',
  callee: esFromNode(callee),
  arguments: Prelude.map(esFromNode)(args),
  optional: false
});
const esFromVariableDeclaration = ({pattern, expression}) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [{
      type: 'VariableDeclarator',
      id: esFromNode(pattern),
      init: esFromNode(expression)
    }]
});
const esFromFunctionDeclaration = ({name, parameters, body}) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [{
      type: 'VariableDeclarator',
      id: esFromIdentifierName(name),
      init: parameters.reduceRight((esBody, param) => ({
        type: 'ArrowFunctionExpression',
        params: [esFromNode(param)],
        body: esBody,
        expression: esBody.type !== 'BlockStatement'
      }), esFromNode(body))
    }]
});
const esFromExpressionStatement = ({expression}) => ({
  type: 'ExpressionStatement',
  expression: esFromNode(expression)
});
const esFromArrayPattern = ({elements}) => ({
  type: 'ArrayPattern',
  elements: Prelude.map(esFromNode)(elements)
});
const esFromObjectPattern = ({properties}) => ({
  type: 'ObjectPattern',
  properties: Prelude.map(esFromNode)(properties)
});
const esFromRestElement = ({argument}) => ({
  type: 'RestElement',
  argument: esFromNode(argument)
});
const esFromExportDefaultDeclaration = ({declaration}) => ({
  type: 'ExportDefaultDeclaration',
  declaration: esFromNode(declaration)
});
const esFromExportNamedDeclaration = ({specifiers}) => ({
  type: 'ExportNamedDeclaration',
  specifiers: Prelude.map(specifier => ({
    type: 'ExportSpecifier',
    local: esFromNode(specifier),
    exported: esFromNode(specifier)
  }))(specifiers)
});
const esFromImportExpression = ({source}) => ({
  type: 'ImportExpression',
  source: esFromNode(source)
});
const esFromImportDeclaration = exportedNames => importDeclaration => importDeclaration.specifiers === '*' ? (() => {
  const source = importDeclaration.source.value;
  const hiding = Prelude.map(x => x.name)(importDeclaration.hiding);
  const hiding$0021 = Reflect.construct(Set, [Prelude.map(x => x.name)(importDeclaration.hiding)]);
  const visible = name => !hiding$0021.delete(name);
  return source.endsWith('.serif') ? (() => {
    const names = exportedNames(source).filter(visible);
    return hiding$0021.size > 0 ? Future.reject(unnecessaryHiding(source, hiding, Array.from(hiding$0021.values()))) : Future.resolve({
      type: 'ImportDeclaration',
      specifiers: Prelude.map(name => ({
        type: 'ImportSpecifier',
        local: esFromIdentifierName(name),
        imported: esFromIdentifierName(name)
      }))(names),
      source: {
        type: 'Literal',
        value: source.replace(RegExp('[.]serif$'), '.js')
      }
    });
  })() : chain(names => hiding$0021.size > 0 ? Future.reject(unnecessaryHiding(source, hiding, Array.from(hiding$0021.values()))) : Future.resolve({
    type: 'ImportDeclaration',
    specifiers: Prelude.map(name => ({
      type: 'ImportSpecifier',
      local: esFromEscapedIdentifierName(name),
      imported: esFromEscapedIdentifierName(name)
    }))(names),
    source: {
      type: 'Literal',
      value: source
    }
  }))(map(names => names.filter(visible))(map(Object.keys)(Future.attemptP(() => import(source)))));
})() : Future.resolve({
  type: 'ImportDeclaration',
  specifiers: Prelude.map(specifier => specifier.type === 'ImportDefaultSpecifier' ? {
    type: 'ImportDefaultSpecifier',
    local: esFromIdentifier(specifier.local)
  } : specifier.type === 'ImportNamespaceSpecifier' ? {
    type: 'ImportNamespaceSpecifier',
    local: esFromIdentifier(specifier.local)
  } : {
    type: 'ImportSpecifier',
    local: esFromIdentifier(specifier.local),
    imported: esFromIdentifier(specifier.imported)
  })(importDeclaration.specifiers),
  source: {
    type: 'Literal',
    value: importDeclaration.source.value.replace(RegExp('[.]serif$'), '.js')
  }
});
const esFromNode = expr => expr.type === 'NullLiteral' ? esFromNullLiteral : expr.type === 'BooleanLiteral' ? esFromLiteral(expr) : expr.type === 'NumberLiteral' ? esFromLiteral(expr) : expr.type === 'StringLiteral' ? esFromLiteral(expr) : expr.type === 'TemplateLiteral' ? esFromTemplateLiteral(expr) : expr.type === 'MetaProperty' ? esFromMetaProperty(expr) : expr.type === 'MemberExpression' ? esFromMemberExpression(expr) : expr.type === 'Identifier' ? esFromIdentifier(expr) : expr.type === 'ArrayExpression' ? esFromArrayExpression(expr) : expr.type === 'ObjectExpression' ? esFromObjectExpression(expr) : expr.type === 'ArrowFunctionExpression' ? esFromArrowFunctionExpression(expr) : expr.type === 'BlockExpression' ? esFromBlockExpression(expr) : expr.type === 'UnaryExpression' ? esFromUnaryExpression(expr) : expr.type === 'BinaryExpression' ? esFromBinaryExpression(expr) : expr.type === 'LogicalExpression' ? esFromLogicalExpression(expr) : expr.type === 'ConditionalExpression' ? esFromConditionalExpression(expr) : expr.type === 'CallExpression' ? esFromCallExpression(expr) : expr.type === 'SpreadElement' ? esFromSpreadElement(expr) : expr.type === 'ExpressionStatement' ? esFromExpressionStatement(expr) : expr.type === 'VariableDeclaration' ? esFromVariableDeclaration(expr) : expr.type === 'FunctionDeclaration' ? esFromFunctionDeclaration(expr) : expr.type === 'Property' ? esFromProperty(expr) : expr.type === 'ArrayPattern' ? esFromArrayPattern(expr) : expr.type === 'Elision' ? esFromElision : expr.type === 'ObjectPattern' ? esFromObjectPattern(expr) : expr.type === 'RestElement' ? esFromRestElement(expr) : expr.type === 'ExportNamedDeclaration' ? esFromExportNamedDeclaration(expr) : expr.type === 'ExportDefaultDeclaration' ? esFromExportDefaultDeclaration(expr) : esFromImportExpression(expr);
const unnecessaryHiding = (source, hiding, names) => Reflect.construct(Error, [`import * from "${ source }" hiding {${ hiding.join(', ') }};\n\n${ names.length > 2 ? names.slice(0, -1).join(', ') + ', and ' + names.at(-1) : names.join(' and ') } ${ names.length === 1 ? 'is' : 'are' } not exported so need not be hidden.\n`]);
const namesInPattern = node => node.type === 'Identifier' ? [node.name] : node.type === 'ArrayPattern' ? Prelude.chain(namesInPattern)(node.elements) : node.type === 'ObjectPattern' ? Prelude.chain(namesInPattern)(node.properties) : node.type === 'Property' ? namesInPattern(node.key) : node.type === 'RestElement' ? namesInPattern(node.argument) : [];
const toModule = module => exportedNames => (() => {
  const topLevelNames = Reflect.construct(Set, [Prelude.chain(statement => statement.type === 'VariableDeclaration' ? namesInPattern(statement.pattern) : statement.type === 'FunctionDeclaration' ? [statement.name] : [])(module.statements)]);
  return map(imports => ({
    type: 'Program',
    sourceType: 'module',
    body: [
      ...imports,
      esFromVariableDeclaration(Serif.VariableDeclaration(Serif.Identifier('Prelude'))(Serif.ObjectExpression(map(([name, expr]) => Serif.Property(Serif.StringLiteral(name))(expr))(Object.entries(Prelude_))))),
      esFromVariableDeclaration(Serif.VariableDeclaration((names => Serif.ObjectPattern(map(name => Serif.Property(Serif.StringLiteral(name))(Serif.Identifier(name)))(names.filter(name => !topLevelNames.has(name)))))(Object.keys(Prelude_)))(Serif.Identifier('Prelude'))),
      ...Prelude.chain(statement => [
        'VariableDeclaration',
        'FunctionDeclaration',
        'ExpressionStatement'
      ].includes(statement.type) ? [esFromNode(statement)] : [])(module.statements),
      ...Prelude.map(statement => statement.type === 'ExportNamedDeclaration' ? esFromExportNamedDeclaration(statement) : esFromExportDefaultDeclaration(statement))(module.exports)
    ]
  }))(Future.parallel(16)(map(esFromImportDeclaration(exportedNames))(module.imports)));
})();
export {
  toModule
};
