import S from 'sanctuary';

import * as expression from './expression.js';


const B = f => g => x => f (g (x));
const Y = f => (g => g (g)) (g => f (x => g (g) (x)));

const Program = sourceType => body => ({type: 'Program', sourceType, body});
const Member_ = computed => object => property => ({type: 'MemberExpression', object, property, computed, optional: false});
const Member = Member_ (true);
const Cond = test => consequent => alternative => ({type: 'ConditionalExpression', test, consequent, alternate: alternative});
const Unary = prefix => operator => argument => ({type: 'UnaryExpression', prefix, operator, argument});
const Func = id => params => body => ({type: 'FunctionExpression', id, params, body, expression: false, generator: false, async: false});
const Func1 = id => param => Func (id) ([param]);
const Block = body => ({type: 'BlockStatement', body});
const Switch = discriminant => cases => ({type: 'SwitchStatement', discriminant, cases});
const Case = test => consequent => ({type: 'SwitchCase', test, consequent});
const Return = argument => ({type: 'ReturnStatement', argument});
const Identifier = name => ({type: 'Identifier', name});
const Literal = value => ({type: 'Literal', value});
const Call = callee => args => ({type: 'CallExpression', callee, arguments: args, optional: false});
const Call1 = callee => arg => Call (callee) ([arg]);
const Array_ = elements => ({type: 'ArrayExpression', elements});
const _ArrowFunc = expression => params => body => ({type: 'ArrowFunctionExpression', id: null, expression, generator: false, async: false, params, body});
const ArrowFunc = _ArrowFunc (true);
const ArrowFunc1 = param => ArrowFunc ([param]);
const ArrowFuncStatement = _ArrowFunc (false);
const Object_ = properties => ({type: 'ObjectExpression', properties});
const Property = key => value => ({type: 'Property', method: false, shorthand: false, computed: true, key, value, kind: 'init'});
const New = callee => args => ({type: 'NewExpression', callee, arguments: args});
const Logical = operator => left => right => ({type: 'LogicalExpression', operator, left, right});
const ImportDeclaration = specifiers => source => ({type: 'ImportDeclaration', specifiers, source});
const ImportDefaultSpecifier = local => ({type: 'ImportDefaultSpecifier', local});
const ImportNamespaceSpecifier = local => ({type: 'ImportNamespaceSpecifier', local});
const ImportSpecifier = imported => ({type: 'ImportSpecifier', local: imported, imported});
const ExportDefaultDeclaration = declaration => ({type: 'ExportDefaultDeclaration', declaration});
const ExportNamedDeclaration = specifiers => ({type: 'ExportNamedDeclaration', declaration: null, specifiers, source: null});
const ExportSpecifier = exported => ({type: 'ExportSpecifier', local: exported, exported});
const VariableDeclaration = kind => declarations => ({type: 'VariableDeclaration', kind, declarations});
const Const = VariableDeclaration ('const');
const VariableDeclarator = id => init => ({type: 'VariableDeclarator', id, init});

const never = null;

//    array2 :: (a -> b -> c) -> Array2 a b -> c
const array2 = f => ([a, b]) => f (a) (b);

const escapeIdentifier = name => (
  '_' +
  name.replace (/[^A-Za-z0-9_]/g,
                c => '$' +
                     c
                     .charCodeAt (0)
                     .toString (16)
                     .toUpperCase ()
                     .padStart (4, '0'))
);

const genIdentifier = S.pipe ([String, S.concat ('_'), Identifier]);

//    reference :: Array String -> String -> Node
const reference = context => name => (
  S.elem (name) (context) ?
  Identifier (escapeIdentifier (name)) :
  Member (Identifier ('$')) (Literal (escapeIdentifier (name)))
);

const Object$       = Member (Identifier ('Object'));
const Object$assign = Object$ (Literal ('assign'));
const Object$create = Object$ (Literal ('create'));
const Symbol$       = Member (Identifier ('Symbol'));
const Symbol$for    = Symbol$ (Literal ('for'));

export const toJs = Y (recur => context => expr => expression.fold ({
  'number': value => value < 0 ? Unary (true) ('-') (Literal (-value)) : Literal (value),
  'string': Literal,
  'symbol': B (Call1 (Symbol$for)) (Literal),
  'identifier': name => (
    name === 'import.meta' ?
    Member_ (false) (Identifier ('import')) (Identifier ('meta')) :
    S.array (reference (context) (name))  // . and /
            (B (S.reduce (expr => B (S.maybe (never) (Member (expr)))
                                    (S.lift2 (S.alt)
                                             (B (S.map (Literal))
                                                (S.stripPrefix ('.')))
                                             (B (S.map (B (Call1 (Symbol$for)) (Literal)))
                                                (S.stripPrefix ('/'))))))
               (reference (context)))
            (S.reject (S.equals ('')) (name.split (/([./][^./]+)/)))
  ),
  'array': B (Array_) (S.map (recur (context))),
  'object': B (Object_) (B (S.map (array2 (Property))) (S.map (S.map (recur (context))))),
  'lambda': parameter => body => ArrowFunc1 (recur ([...context, parameter.name]) (parameter))
                                            (recur ([...context, parameter.name]) (body)),
  'let': bindings => body => S.reduce (body => S.array (body)
                                                       (binding => bindings => Call1 (ArrowFunc1 (Identifier (escapeIdentifier (binding.name)))
                                                                                                 (body))
                                                                                     (S.array (expr => expr)
                                                                                              (param => params => expr => Func1 (Identifier (escapeIdentifier (binding.name)))
                                                                                                                                (param)
                                                                                                                                (Block ([Return (S.reduce (S.flip (ArrowFunc1))
                                                                                                                                                          (expr)
                                                                                                                                                          (S.reverse (params)))])))
                                                                                              (S.map (B (Identifier) (escapeIdentifier)) (binding.parameterNames))
                                                                                              (recur ([...context,
                                                                                                       ...(S.map (binding => binding.name) (bindings)),  // preceding bindings
                                                                                                       ...binding.parameterNames])
                                                                                                     (binding.expression)))))
                                      (recur (S.concat (context) (S.map (binding => binding.name) (bindings))) (body))
                                      (S.extend (S.I) (S.reverse (bindings))),
  'and': S.on (Logical ('&&')) (recur (context)),
  'or': S.on (Logical ('||')) (recur (context)),
  'if': predicate => consequent => alternative => Cond (recur (context) (predicate)) (recur (context) (consequent)) (recur (context) (alternative)),
  'switch': discriminant => cases => (
    Call1 (ArrowFuncStatement ([Identifier ('$discriminant')])
                              (Block ([Switch (Identifier ('$discriminant'))
                                              (S.map (case_ => Case (recur (context) (case_.predicate))
                                                                    ([Return (recur (context) (case_.consequent))]))
                                                     (cases))])))
          (recur (context) (discriminant))
  ),
  'new': args => (
    S.reduce (receive => arg => provide => receive (n => args => insert => arg.type === 'placeholder' ?
                                                                           provide (n - 1)
                                                                                   (S.prepend (genIdentifier (n)) (args))
                                                                                   (body => ArrowFunc1 (genIdentifier (n))
                                                                                                       (insert (body))) :
                                                                           provide (n - 1)
                                                                                   (S.prepend (recur (context) (arg)) (args))
                                                                                   (insert)))
             (provide => n => args => insert => provide (n) (args) (insert))
             (S.reverse (args))
             (n => args => insert => insert (args))
             (args.length - 1)
             ([])
             (([callee, ...args]) => New (callee) (args))
  ),
  'invocation': name => args => (
    S.reduce (receive => arg => provide => receive (n => args => insert => arg.type === 'placeholder' ?
                                                                           provide (n - 1)
                                                                                   (S.append (genIdentifier (n)) (args))
                                                                                   (B (ArrowFunc1 (genIdentifier (n))) (insert)) :
                                                                           provide (n - 1)
                                                                                   (S.append (recur (context) (arg)) (args))
                                                                                   (insert)))
             (provide => n => args => insert => provide (n) (args) (insert))
             (S.reverse (args))
             (n => args => insert => insert (args))
             (args.length)
             ([])
             (([object, ...args]) => Call (Member (object) (Literal (name)))
                                          (S.reverse (args)))
  ),
  'application': callee => args => (
    S.reduce (receive => arg => provide => receive (insert => provide (n => callee => arg.type === 'placeholder' ?
                                                                                      ArrowFunc1 (genIdentifier (n))
                                                                                                 (insert (n + 1) (Call1 (callee) (genIdentifier (n)))) :
                                                                                      insert (n) (Call1 (callee) (recur (context) (arg))))))
             (provide => insert => provide (insert))
             (S.reverse (args))
             (insert => {
                switch (callee.type) {
                  case 'placeholder':
                    return ArrowFunc1 (genIdentifier (0))
                                      (insert (1) (genIdentifier (0)));
                  case 'number':
                  case 'string':
                  case 'symbol':
                    return insert (1)
                                  (ArrowFunc1 (genIdentifier (0))
                                              (Member (genIdentifier (0))
                                                      (recur (context) (callee))));
                  default:
                    return insert (1) (recur (context) (callee));
                }
              })
             (n => callee => callee)
  ),
}) (expr));

export const toEsModule = statements => {
  //  Exports are allowed to occur anywhere in a Serif module, to allow
  //  exports to follow imports near the top of the module if desired.
  const orderedStatements = (
    S.pair (S.concat)
           (S.reduce (pair => statement => S.either (B (S.mapLeft) (S.append))
                                                    (B (S.map)     (S.append))
                                                    (S.tagBy (statement => S.elem (statement.type)
                                                                                  (['default-export',
                                                                                    'named-exports']))
                                                             (statement))
                                                    (pair))
                     (S.Pair ([]) ([]))
                     (statements))
  );
  const {sourceIdentifiers, imports, declarations, exports} = (
    S.reduce (({sourceIdentifiers, context, imports, declarations, exports}) => statement => {
                switch (statement.type) {
                  case 'star-import': {
                    const sourceIdentifier = Identifier (escapeIdentifier (statement.source));
                    return {
                      sourceIdentifiers: [...sourceIdentifiers, sourceIdentifier],
                      context,
                      imports: [
                        ...imports,
                        ImportDeclaration ([ImportNamespaceSpecifier (sourceIdentifier)])
                                          (Literal (S.maybe (statement.source)
                                                            (S.flip (S.concat) ('.js'))
                                                            (S.stripSuffix ('.serif') (statement.source)))),
                      ],
                      declarations,
                      exports,
                    };
                  }
                  case 'named-imports': {
                    return {
                      sourceIdentifiers,
                      context: [...context, ...statement.names],
                      imports: [
                        ...imports,
                        ImportDeclaration (S.map (name => ImportSpecifier (Identifier (escapeIdentifier (name))))
                                                 (statement.names))
                                          (Literal (S.maybe (statement.source)
                                                            (S.flip (S.concat) ('.js'))
                                                            (S.stripSuffix ('.serif') (statement.source)))),
                      ],
                      declarations,
                      exports,
                    };
                  }
                  case 'default-import': {
                    return {
                      sourceIdentifiers,
                      context: [...context, statement.name],
                      imports: [
                        ...imports,
                        ImportDeclaration ([ImportDefaultSpecifier (Identifier (escapeIdentifier (statement.name)))])
                                          (Literal (S.maybe (statement.source)
                                                            (S.flip (S.concat) ('.js'))
                                                            (S.stripSuffix ('.serif') (statement.source)))),
                      ],
                      declarations,
                      exports,
                    };
                  }
                  case 'default-export': {
                    return {
                      sourceIdentifiers,
                      context,
                      imports,
                      declarations,
                      exports: [
                        ...exports,
                        ExportDefaultDeclaration (toJs (context) (statement.expression)),
                      ],
                    };
                  }
                  case 'named-exports': {
                    return {
                      sourceIdentifiers,
                      context,
                      imports,
                      declarations,
                      exports: [
                        ...exports,
                        ExportNamedDeclaration (S.map (name => ExportSpecifier (Identifier (escapeIdentifier (name))))
                                                      (statement.names)),
                      ],
                    };
                  }
                  case 'declaration': {
                    return {
                      sourceIdentifiers,
                      context: [...context, statement.name],
                      imports,
                      declarations: [
                        ...declarations,
                        Const ([VariableDeclarator (Identifier (escapeIdentifier (statement.name)))
                                                   (S.array (body => body)
                                                            (param => params => body => Func1 (Identifier (escapeIdentifier (statement.name)))
                                                                                              (param)
                                                                                              (Block ([Return (S.reduce (S.flip (ArrowFunc1))
                                                                                                                        (body)
                                                                                                                        (S.reverse (params)))])))
                                                            (S.map (B (Identifier) (escapeIdentifier)) (statement.parameterNames))
                                                            (toJs ([...context, statement.name, ...statement.parameterNames])
                                                                  (statement.expression)))]),
                      ],
                      exports,
                    };
                  }
                  default: {
                    console.error (statement);
                    throw new Error ('XXX');
                  }
                }
              })
             ({sourceIdentifiers: [], context: [], imports: [], declarations: [], exports: []})
             (orderedStatements)
  );
  return (
    Program ('module')
            ([...imports,
              Const ([VariableDeclarator (Identifier ('$'))
                                         (Call (Member (Array_ (sourceIdentifiers)) (Literal ('reduce')))
                                               ([ArrowFunc ([Identifier ('$'), Identifier ('o')])
                                                           (Call (Object$assign)
                                                                 ([Identifier ('$'), Identifier ('o')])),
                                                 Call (Object$create)
                                                      ([Literal (null)])]))]),
              ...declarations,
              ...exports])
  );
};
