import type * as ES from 'estree';

import * as es from './es.js';
import type * as Serif from './types.js';


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

const escapeChar = (c: string) => (
  '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
);

const escape = (name: string): Escaped => (
  /^[a-z][a-z0-9]*$/i.test(name) && !esReservedWords.has(name)
  ? name as Escaped
  : '_' + name.replace(/[^a-z0-9]/gi, escapeChar) as Escaped
);

const prefix = (name: string): Escaped => (
  '$' + name as Escaped
);

const Identifier = (name: Escaped): ES.Identifier => ({type: 'Identifier', name});

const $callee = Identifier(prefix('callee'));
const $object = Identifier(prefix('object'));

const esFromBooleanLiteral = ({value}: Serif.Boolean): ES.Literal => (
  es.Literal(value)
);

const esFromNumber = ({value}: Serif.Number): ES.UnaryExpression | ES.Literal => (
  value < 0 ? es.UnaryExpression('-', es.Literal(-value)) : es.Literal(value)
);

const esFromString = ({value}: Serif.String): ES.Literal => (
  es.Literal(value)
);

const esFromSymbol = ({name}: Serif.Symbol): ES.CallExpression => (
  es.CallExpression(
    es.MemberExpression(
      Identifier('Symbol' as Escaped),
      Identifier('for' as Escaped),
    ),
    [es.Literal(name)],
  )
);

const esFromMetaProperty = ({meta, property}: Serif.MetaProperty): ES.MetaProperty => (
  es.MetaProperty(
    Identifier(meta as Escaped),
    Identifier(property as Escaped),
  )
);

const esFromMemberExpression = ({object, property}: Serif.MemberExpression): ES.MemberExpression => (
  es.MemberExpression(
    esFromExpression(object),
    esFromExpression(property),
    {computed: true}
  )
);

const esFromIdentifier = ({name}: Serif.Identifier): ES.Identifier => (
  Identifier(escape(name))
);

const esFromArray = ({elements}: Serif.Array): ES.ArrayExpression => (
  es.ArrayExpression(
    elements.map(element =>
      element.type === 'spread-element'
      ? es.SpreadElement(esFromExpression(element.argument))
      : esFromExpression(element)
    )
  )
);

const esFromObject = ({properties}: Serif.Object): ES.ObjectExpression => (
  es.ObjectExpression(
    properties.map(property => {
      switch (property.type) {
        case 'spread-element': {
          return es.SpreadElement(esFromExpression(property.argument));
        }
        case 'property': {
          return es.Property(
            esFromExpression(property.key),
            esFromExpression(property.value),
            {computed: true}
          );
        }
      }
    }),
  )
);

const esFromLambda = ({parameter, body}: Serif.Lambda): ES.ArrowFunctionExpression => (
  es.ArrowFunctionExpression(
    [esFromIdentifier(parameter)],
    esFromExpression(body),
  )
);

const esFromBlockExpression = ({statements}: Serif.BlockExpression): ES.Expression => {
  if (statements.length === 0) {
    return Identifier('undefined' as Escaped);
  }

  const init = statements.slice(0, -1).map(statement => {
    switch (statement.type) {
      case 'ExpressionStatement': return esFromExpressionStatement(statement);
      case 'declaration':         return esFromDeclaration(statement);
    }
  });

  const last = (last => {
    switch (last.type) {
      case 'ExpressionStatement': return [es.ReturnStatement(esFromExpression(last.expression))];
      case 'declaration':         return [esFromDeclaration(last),
                                          es.ReturnStatement(Identifier(escape(last.name)))];
    }
  })(statements[statements.length - 1]);

  return es.CallExpression(
    es.ArrowFunctionExpression([], es.BlockStatement([...init, ...last])),
    []
  );
};

const esFromUnaryExpression = ({
  operator,
  argument,
}: Serif.UnaryExpression): ES.UnaryExpression => ({
  type: 'UnaryExpression',
  prefix: true,
  operator,
  argument: esFromExpression(argument),
});

const esFromBinaryExpression = ({
  operator,
  left,
  right,
}: Serif.BinaryExpression): ES.BinaryExpression => (
  es.BinaryExpression(
    operator,
    esFromExpression(left),
    esFromExpression(right),
  )
);

const esFromLogicalExpression = ({
  operator,
  left,
  right,
}: Serif.LogicalExpression): ES.LogicalExpression => (
  es.LogicalExpression(
    operator,
    esFromExpression(left),
    esFromExpression(right),
  )
);

const esFromConditionalExpression = ({
  predicate,
  consequent,
  alternative,
}: Serif.ConditionalExpression): ES.ConditionalExpression => (
  es.ConditionalExpression(
    esFromExpression(predicate),
    esFromExpression(consequent),
    esFromExpression(alternative),
  )
);

const esFromNew = (expr: Serif.New): ES.NewExpression | ES.ArrowFunctionExpression => (
  [
    ...[expr.callee].flatMap(({type}) =>
      type === 'placeholder' ? [$callee] : []
    ),
    ...expr.arguments.flatMap(({type}, idx) =>
      type === 'placeholder' ? [Identifier(prefix(String(idx + 1)))] : []
    ),
  ]
  .reduceRight<ES.NewExpression | ES.ArrowFunctionExpression>(
    (body, param) => es.ArrowFunctionExpression([param], body),
    es.NewExpression(
      expr.callee.type === 'placeholder' ? $callee : esFromExpression(expr.callee),
      expr.arguments.map((argument, idx) =>
        argument.type === 'placeholder'
        ? Identifier(prefix(String(idx + 1)))
        : esFromExpression(argument)
      ),
    )
  )
);

const esFromInvocation = (expr: Serif.Invocation): ES.CallExpression | ES.ArrowFunctionExpression => {
  const params: Array<ES.Identifier> = [];
  const args: Array<ES.Expression> = [];
  let n = 0;
  for (const argument of expr.arguments) {
    n += 1;
    if (argument.type === 'placeholder') {
      const param = Identifier(escape(n.toString()));
      params.push(param);
      args.push(param);
    } else {
      args.push(esFromExpression(argument));
    }
  }
  return (
    params
    .concat(expr.object.type === 'placeholder' ? [$object] : [])
    .reduceRight<ES.CallExpression | ES.ArrowFunctionExpression>(
      (body, param) => es.ArrowFunctionExpression([param], body),
      es.CallExpression(
        es.MemberExpression(
          expr.object.type === 'placeholder'
          ? $object
          : esFromExpression(expr.object),
          es.Literal(expr.name),
          {computed: true}
        ),
        args,
      )
    )
  );
};

const esFromApplication = (expr: Serif.Application): ES.Expression => (
  expr.arguments.reduceRight(
    (body, argument, idx) => (
      argument.type === 'placeholder'
      ? es.ArrowFunctionExpression([Identifier(prefix(String(idx + 1)))], body)
      : body
    ),
    expr.arguments.reduce(
      (callee, argument, idx) => es.CallExpression(
        callee,
        argument.type === 'placeholder' ?
          [Identifier(prefix(String(idx + 1)))] :
        argument.type === 'spread-element' ?
          [es.SpreadElement(esFromExpression(argument.argument))] :
        // else
          [esFromExpression(argument)]
      ),
      expr.callee.type === 'placeholder'
      ? (param => es.ArrowFunctionExpression([param], param))(Identifier(prefix('0')))
      : esFromExpression(expr.callee)
    )
  )
);

const esFromDeclaration = ({
  name,
  parameterNames,
  expression,
}: Serif.Declaration): ES.VariableDeclaration => (
  parameterNames.length === 0 ?
  es.VariableDeclaration([
    es.VariableDeclarator(
      Identifier(escape(name)),
      esFromExpression(expression),
    ),
  ]) :
  es.VariableDeclaration([
    es.VariableDeclarator(
      Identifier(escape(name)),
      es.FunctionExpression(
        Identifier(escape(name)),
        parameterNames.slice(0, 1).map(name => Identifier(escape(name))),
        es.BlockStatement([es.ReturnStatement(parameterNames.slice(1).reduceRight(
          (body, name) => es.ArrowFunctionExpression([Identifier(escape(name))], body),
          esFromExpression(expression)
        ))]),
      ),
    ),
  ])
);

const esFromExpressionStatement = ({expression}: Serif.ExpressionStatement): ES.ExpressionStatement => (
  es.ExpressionStatement(esFromExpression(expression))
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
    case 'invocation':                  return esFromInvocation(expr);
    case 'application':                 return esFromApplication(expr);
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
