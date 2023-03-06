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

const esFromIdentifier = ({name}: Serif.Identifier): ES.Identifier | ES.MemberExpression => (
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
  const init = statements.slice(0, -1).flatMap<ES.Statement>(statement => {
    switch (statement.type) {
      case 'ExpressionStatement': {
        return [esFromExpressionStatement(statement)];
      }
      case 'declaration': {
        if (statement.parameterNames.length === 0) {
          return [es.VariableDeclaration([
            es.VariableDeclarator(
              Identifier(escape(statement.name)),
              esFromExpression(statement.expression),
            ),
          ])];
        } else {
          const [param, ...params] = statement.parameterNames.map(name => Identifier(escape(name)));
          return [es.VariableDeclaration([
            es.VariableDeclarator(
              Identifier(escape(statement.name)),
              es.FunctionExpression(
                Identifier(escape(statement.name)),
                [param],
                es.BlockStatement([es.ReturnStatement(params.reduceRight(
                  (body, param) => es.ArrowFunctionExpression([param], body),
                  esFromExpression(statement.expression)
                ))])
              )
            ),
          ])];
        }
      }
      default: {
        return [];
      }
    }
  });

  const last = (last => {
    switch (last.type) {
      case 'ExpressionStatement': {
        return [es.ReturnStatement(esFromExpression(last.expression))];
      }
      case 'declaration': {
        // TODO: Return function
        return [];
      }
      default: {
        return [];
      }
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

const exportTypes = new Set(['named-exports', 'default-export']);

const exportsLast = (
  statements: ReadonlyArray<Serif.Statement>,
): ReadonlyArray<Serif.Statement> => (
  [...statements].sort((s1, s2) =>
    (exportTypes.has(s1.type) ? 1 : 0) -
    (exportTypes.has(s2.type) ? 1 : 0)
  )
);

export async function toModule(
  statements: ReadonlyArray<Serif.Statement>,
  exportedNames: (source: string) => ReadonlyArray<string>,
): Promise<ES.Program> {
  return es.Program(
    await Promise.all(exportsLast(statements).map(async statement =>
      statement.type === 'star-import' ? es.ImportDeclaration(
        (statement.source.endsWith('.serif')
         ? (hiding => exportedNames(statement.source).filter(name => !hiding.has(name)).map(escape))(new Set(statement.hiding))
         : Object.keys(await import(statement.source)) as Array<Escaped>)
        .map(name => es.ImportSpecifier(Identifier(name), Identifier(name))),
        statement.source.replace(/[.]serif$/, '.js')
      ) :
      statement.type === 'named-imports' ? es.ImportDeclaration(
        statement.names.map(name => es.ImportSpecifier(Identifier(escape(name)), Identifier(escape(name)))),
        statement.source.replace(/[.]serif$/, '.js')
      ) :
      statement.type === 'default-import' ? es.ImportDeclaration(
        [es.ImportDefaultSpecifier(Identifier(escape(statement.name)))],
        statement.source.replace(/[.]serif$/, '.js')
      ) :
      statement.type === 'named-exports' ? es.ExportNamedDeclaration(
        statement.names.map(name => es.ExportSpecifier(Identifier(escape(name))))
      ) :
      statement.type === 'default-export' ? es.ExportDefaultDeclaration(
        esFromExpression(statement.expression),
      ) :
      statement.type === 'declaration' && statement.parameterNames.length === 0 ? es.VariableDeclaration([
        es.VariableDeclarator(
          Identifier(escape(statement.name)),
          esFromExpression(statement.expression),
        ),
      ]) :
      statement.type === 'declaration' ? es.VariableDeclaration([
        es.VariableDeclarator(
          Identifier(escape(statement.name)),
          es.FunctionExpression(
            Identifier(escape(statement.name)),
            statement.parameterNames.slice(0, 1).map(name => Identifier(escape(name))),
            es.BlockStatement([es.ReturnStatement(statement.parameterNames.slice(1).reduceRight(
              (body, name) => es.ArrowFunctionExpression([Identifier(escape(name))], body),
              esFromExpression(statement.expression)
            ))]),
          ),
        ),
      ]) :
      esFromExpressionStatement(statement)
    )),
  );
}
