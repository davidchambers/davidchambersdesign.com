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

const esFromPlaceholder = ({}: Serif.Placeholder): ES.ArrowFunctionExpression => {
  const param = Identifier(prefix(String(1)));
  return es.ArrowFunctionExpression([param], param);
};

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

const esFromMemberExpression = ({
  object,
  property,
}: Serif.MemberExpression): ES.MemberExpression | ES.ArrowFunctionExpression => {
  if (object === Serif.Placeholder) {
    const param = Identifier(prefix(String(1)));
    return es.ArrowFunctionExpression(
      [param],
      es.MemberExpression(param, esFromExpression(property), {computed: true})
    );
  }
  return es.MemberExpression(
    esFromExpression(object),
    esFromExpression(property),
    {computed: true}
  );
};

const esFromIdentifier = ({name}: Serif.Identifier): ES.Identifier => (
  Identifier(escape(name))
);

const esFromArray = ({elements}: Serif.Array): ES.ArrayExpression | ES.ArrowFunctionExpression => {
  const params: Array<ES.Identifier> = [];
  const elements$ = elements.map(element => {
    switch (element.type) {
      case 'placeholder':     return params[params.length] = Identifier(prefix(String(params.length)));
      case 'spread-element':  return es.SpreadElement(esFromExpression(element.argument));
      default:                return esFromExpression(element);
    }
  });
  return params.reduceRight<ES.ArrayExpression | ES.ArrowFunctionExpression>(
    (body, param) => es.ArrowFunctionExpression([param], body),
    es.ArrayExpression(elements$)
  );
};

const esFromObject = ({properties}: Serif.Object): ES.ObjectExpression | ES.ArrowFunctionExpression => {;
  const params: Array<ES.Identifier> = [];
  const properties$ = properties.map(property => {
    switch (property.type) {
      case 'spread-element': {
        return es.SpreadElement(esFromExpression(property.argument));
      }
      case 'property': {
        const {key, value} = property;
        const key$ = (
          key === Serif.Placeholder
          ? (params[params.length] = Identifier(prefix(String(params.length + 1))))
          : esFromExpression(key)
        );
        const value$ = (
          value === Serif.Placeholder
          ? (params[params.length] = Identifier(prefix(String(params.length + 1))))
          : esFromExpression(value)
        );
        return es.Property(key$, value$, {computed: true});
      }
    }
  });
  return params.reduceRight<ES.ObjectExpression | ES.ArrowFunctionExpression>(
    (body, param) => es.ArrowFunctionExpression([param], body),
    es.ObjectExpression(properties$)
  );
};

const esFromLambda = ({parameter, body}: Serif.Lambda): ES.ArrowFunctionExpression => (
  es.ArrowFunctionExpression(
    [esFromIdentifier(parameter)],
    esFromExpression(body),
  )
);

const esFromStatement = (statement: Serif.Statement): ES.ExpressionStatement | ES.VariableDeclaration => {
  switch (statement.type) {
    case 'ExpressionStatement': return esFromExpressionStatement(statement);
    case 'declaration':         return esFromDeclaration(statement);
  }
};

const esFromBlockExpression = ({statements}: Serif.BlockExpression): ES.Expression => {
  if (statements.length === 1 && statements[0].type === 'ExpressionStatement') {
    return esFromExpression(statements[0].expression);
  }
  const last = statements[statements.length - 1];
  return es.CallExpression(
    es.ArrowFunctionExpression(
      [],
      es.BlockStatement(
        last.type === 'declaration'
        ? [...statements.map(esFromStatement), es.ReturnStatement(Identifier(escape(last.name)))]
        : [...statements.slice(0, -1).map(esFromStatement), es.ReturnStatement(esFromExpression(last.expression))]
      )
    ),
    []
  );
};

const esFromUnaryExpression = ({
  operator,
  argument,
}: Serif.UnaryExpression): ES.UnaryExpression | ES.ArrowFunctionExpression => {
  const params: Array<ES.Identifier> = [];
  const argument$ = (
    argument === Serif.Placeholder
    ? (params[params.length] = Identifier(prefix(String(params.length + 1))))
    : esFromExpression(argument)
  );
  return params.reduceRight<ES.UnaryExpression | ES.ArrowFunctionExpression>(
    (body, param) => es.ArrowFunctionExpression([param], body),
    es.UnaryExpression(operator, argument$)
  );
};

const esFromBinaryExpression = ({
  operator,
  left,
  right,
}: Serif.BinaryExpression): ES.BinaryExpression | ES.ArrowFunctionExpression => {
  const params: Array<ES.Identifier> = [];
  const left$ = (
    left === Serif.Placeholder
    ? (params[params.length] = Identifier(prefix(String(params.length + 1))))
    : esFromExpression(left)
  );
  const right$ = (
    right === Serif.Placeholder
    ? (params[params.length] = Identifier(prefix(String(params.length + 1))))
    : esFromExpression(right)
  );
  return params.reduceRight<ES.BinaryExpression | ES.ArrowFunctionExpression>(
    (body, param) => es.ArrowFunctionExpression([param], body),
    es.BinaryExpression(operator, left$, right$)
  );
};

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
    ...[expr.callee].flatMap(callee =>
      callee === Serif.Placeholder ? [$callee] : []
    ),
    ...expr.arguments.flatMap((argument, idx) =>
      argument === Serif.Placeholder ? [Identifier(prefix(String(idx + 1)))] : []
    ),
  ]
  .reduceRight<ES.NewExpression | ES.ArrowFunctionExpression>(
    (body, param) => es.ArrowFunctionExpression([param], body),
    es.NewExpression(
      expr.callee === Serif.Placeholder ? $callee : esFromExpression(expr.callee),
      expr.arguments.map((argument, idx) =>
        argument === Serif.Placeholder
        ? Identifier(prefix(String(idx + 1)))
        : esFromExpression(argument)
      ),
    )
  )
);

const esFromApplication = (expr: Serif.Application): ES.Expression => {
  if (expr.callee.type === 'MemberExpression' && expr.callee.object === Serif.Placeholder) {
    const param = Identifier(prefix(String(0)));
    return es.ArrowFunctionExpression(
      [param],
      expr.arguments.reduceRight(
        (body, argument, idx) => (
          argument === Serif.Placeholder
          ? es.ArrowFunctionExpression([Identifier(prefix(String(idx + 1)))], body)
          : body
        ),
        expr.arguments.reduce<ES.Expression>(
          (callee, argument, idx) => es.CallExpression(
            callee,
            argument === Serif.Placeholder ?
              [Identifier(prefix(String(idx + 1)))] :
            argument.type === 'spread-element' ?
              [es.SpreadElement(esFromExpression(argument.argument))] :
            // else
              [esFromExpression(argument)]
          ),
          es.MemberExpression(param, esFromExpression(expr.callee.property), {computed: true})
        )
      )
    );
  }
  return expr.arguments.reduceRight(
    (body, argument, idx) => (
      argument === Serif.Placeholder
      ? es.ArrowFunctionExpression([Identifier(prefix(String(idx + 1)))], body)
      : body
    ),
    expr.arguments.reduce(
      (callee, argument, idx) => es.CallExpression(
        callee,
        argument === Serif.Placeholder ?
          [Identifier(prefix(String(idx + 1)))] :
        argument.type === 'spread-element' ?
          [es.SpreadElement(esFromExpression(argument.argument))] :
        // else
          [esFromExpression(argument)]
      ),
      expr.callee === Serif.Placeholder
      ? (param => es.ArrowFunctionExpression([param], param))(Identifier(prefix('0')))
      : esFromExpression(expr.callee)
    )
  );
};

const esFromCallExpression_ = (expr: Serif.CallExpression_): ES.Expression => {
  if (expr.callee.type === 'MemberExpression' && expr.callee.object === Serif.Placeholder) {
    const param = Identifier(prefix(String(0)));
    return es.ArrowFunctionExpression(
      [param],
      expr.arguments.reduceRight<ES.Expression>(
        (body, argument, idx) => (
          argument === Serif.Placeholder
          ? es.ArrowFunctionExpression([Identifier(prefix(String(idx + 1)))], body)
          : body
        ),
        es.CallExpression(
          es.MemberExpression(param, esFromExpression(expr.callee.property), {computed: true}),
          expr.arguments.map((argument, idx) => {
            switch (argument.type) {
              case 'placeholder': {
                return Identifier(prefix(String(idx + 1)));
              }
              case 'spread-element': {
                return es.SpreadElement(esFromExpression(argument.argument));
              }
              default: {
                return esFromExpression(argument);
              }
            }
          })
        )
      )
    );
  }
  if (expr.callee === Serif.Placeholder) {
    const param = Identifier(prefix(String(0)));
    return expr.arguments.reduceRight<ES.Expression>(
      (body, argument, idx) => (
        argument === Serif.Placeholder
        ? es.ArrowFunctionExpression([Identifier(prefix(String(idx + 1)))], body)
        : body
      ),
      es.CallExpression(
        param,
        expr.arguments.map((argument, idx) => {
          switch (argument.type) {
            case 'placeholder': {
              return Identifier(prefix(String(idx + 1)));
            }
            case 'spread-element': {
              return es.SpreadElement(esFromExpression(argument.argument));
            }
            default: {
              return esFromExpression(argument);
            }
          }
        })
      )
    );
  }
  return expr.arguments.reduceRight<ES.Expression>(
    (body, argument, idx) => (
      argument === Serif.Placeholder
      ? es.ArrowFunctionExpression([Identifier(prefix(String(idx + 1)))], body)
      : body
    ),
    es.CallExpression(
      esFromExpression(expr.callee),
      expr.arguments.map((argument, idx) => {
        switch (argument.type) {
          case 'placeholder': {
            return Identifier(prefix(String(idx + 1)));
          }
          case 'spread-element': {
            return es.SpreadElement(esFromExpression(argument.argument));
          }
          default: {
            return esFromExpression(argument);
          }
        }
      })
    )
  );
};

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
    case 'placeholder':                 return esFromPlaceholder(expr);
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
    case 'CallExpression_':             return esFromCallExpression_(expr);
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
