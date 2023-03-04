import type * as ES from 'estree';

import * as es from './es.js';
import type * as Serif from './types.js';


type Escaped = string & {_tag: 'Escaped'}

const escapeChar = (c: string) => (
  '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
);

const escape = (name: string): Escaped => (
  '_' + name.replace(/[^A-Za-z0-9_]/g, escapeChar) as Escaped
);

const prefix = (name: string): Escaped => (
  '$' + name as Escaped
);

const Identifier = (name: Escaped): ES.Identifier => ({type: 'Identifier', name});

const $callee = Identifier(prefix('callee'));
const $discriminant = Identifier(prefix('discriminant'));
const $object = Identifier(prefix('object'));

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
    property.type === 'identifier' ?
      es.Literal(property.name) :
    property.type === 'symbol' ?
      esFromSymbol(property) :
    // else
      esFromMemberExpression(property),
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

const esFromLet = ({bindings, body}: Serif.Let): ES.Expression => (
  bindings.reduceRight(
    (body, binding) => {
      if (binding.parameterNames.length > 0) {
        const [param, ...params] = binding.parameterNames.map(name => Identifier(escape(name)));
        return es.CallExpression(
          es.ArrowFunctionExpression([Identifier(escape(binding.name))], body),
          [es.FunctionExpression(
            Identifier(escape(binding.name)),
            [param],
            es.BlockStatement([es.ReturnStatement(params.reduceRight(
              (body, param) => es.ArrowFunctionExpression([param], body),
              esFromExpression(binding.expression)
            ))]),
          )],
        );
      } else {
        return es.CallExpression(
          es.ArrowFunctionExpression([Identifier(escape(binding.name))], body),
          [esFromExpression(binding.expression)],
        );
      }
    },
    esFromExpression(body)
  )
);

const esFromAnd = ({left, right}: Serif.And): ES.LogicalExpression => (
  es.LogicalExpression('&&', esFromExpression(left), esFromExpression(right))
);

const esFromOr = ({left, right}: Serif.Or): ES.LogicalExpression => (
  es.LogicalExpression('||', esFromExpression(left), esFromExpression(right))
);

const esFromIf = ({predicate, consequent, alternative}: Serif.If): ES.ConditionalExpression => (
  es.ConditionalExpression(
    esFromExpression(predicate),
    esFromExpression(consequent),
    esFromExpression(alternative),
  )
);

const esFromSwitch = ({discriminant, cases}: Serif.Switch): ES.CallExpression => (
  es.CallExpression(
    es.ArrowFunctionExpression(
      [$discriminant],
      es.BlockStatement([es.SwitchStatement(
        $discriminant,
        cases.map(({predicate, consequent}) => es.SwitchCase(
          esFromExpression(predicate),
          [es.ReturnStatement(esFromExpression(consequent))],
        )),
      )]),
    ),
    [esFromExpression(discriminant)],
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

const esFromApplication = (expr: Serif.Application): ES.Expression => {
  const callee: ES.Expression = (() => {
    switch (expr.callee.type) {
      case 'placeholder': {
        const param = Identifier(prefix('0'));
        return es.ArrowFunctionExpression([param], param);
      }
      case 'number':
      case 'string':
      case 'symbol': {
        const param = Identifier(prefix('0'));
        return es.ArrowFunctionExpression(
          [param],
          es.MemberExpression(param, esFromExpression(expr.callee), {computed: true})
        );
      }
      default: {
        return esFromExpression(expr.callee);
      }
    }
  })();
  return (
    expr.arguments
    .flatMap((argument, idx) =>
      argument.type === 'placeholder'
      ? Identifier(prefix(String(idx + 1)))
      : []
    )
    .reduceRight(
      (body, param) => es.ArrowFunctionExpression([param], body),
      expr.arguments.reduce<ES.Expression>(
        (callee, argument, idx) => {
          switch (argument.type) {
            case 'placeholder': {
              return es.CallExpression(
                callee,
                [Identifier(prefix(String(idx + 1)))],
              );
            }
            case 'spread-element': {
              return es.CallExpression(
                callee,
                [es.SpreadElement(esFromExpression(argument.argument))],
              );
            }
            default: {
              return es.CallExpression(
                callee,
                [esFromExpression(argument)],
              );
            }
          }
        },
        callee
      )
    )
  );
};

const esFromExpression = (expr: Serif.Expression): ES.Expression => {
  switch (expr.type) {
    case 'number':              return esFromNumber(expr);
    case 'string':              return esFromString(expr);
    case 'symbol':              return esFromSymbol(expr);
    case 'MetaProperty':        return esFromMetaProperty(expr);
    case 'MemberExpression':    return esFromMemberExpression(expr);
    case 'identifier':          return esFromIdentifier(expr);
    case 'array':               return esFromArray(expr);
    case 'object':              return esFromObject(expr);
    case 'lambda':              return esFromLambda(expr);
    case 'let':                 return esFromLet(expr);
    case 'and':                 return esFromAnd(expr);
    case 'or':                  return esFromOr(expr);
    case 'if':                  return esFromIf(expr);
    case 'switch':              return esFromSwitch(expr);
    case 'new':                 return esFromNew(expr);
    case 'invocation':          return esFromInvocation(expr);
    case 'application':         return esFromApplication(expr);
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
      es.ExpressionStatement(esFromExpression(statement))
    )),
  );
}
