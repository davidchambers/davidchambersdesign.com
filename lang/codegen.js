'use strict';

const path = require ('node:path');

const S = require ('sanctuary');

const {B, Y} = require ('./combinators.js');
const expression = require ('./expression.js');


const Program = sourceType => body => ({type: 'Program', sourceType, body});
const Statement = expression => ({type: 'ExpressionStatement', expression});
const Assignment = operator => left => right => ({type: 'AssignmentExpression', operator, left, right});
const Member = object => property => ({type: 'MemberExpression', object, property, computed: true, optional: false});
const Cond = test => consequent => alternative => ({type: 'ConditionalExpression', test, consequent, alternate: alternative});
const Unary = prefix => operator => argument => ({type: 'UnaryExpression', prefix, operator, argument});
const Binary = operator => left => right => ({type: 'BinaryExpression', operator, left, right});
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
const Call2 = callee => arg1 => arg2 => Call (callee) ([arg1, arg2]);
const Array_ = elements => ({type: 'ArrayExpression', elements});
const _ArrowFunc = expression => params => body => ({type: 'ArrowFunctionExpression', id: null, expression, generator: false, async: false, params, body});
const ArrowFunc = _ArrowFunc (true);
const ArrowFunc1 = param => ArrowFunc ([param]);
const ArrowFuncStatement = _ArrowFunc (false);
const Object_ = properties => ({type: 'ObjectExpression', properties});
const Property = key => value => ({type: 'Property', method: false, shorthand: false, computed: true, key, value, kind: 'init'});
const ArrayPattern = elements => ({type: 'ArrayPattern', elements});
const New = callee => args => ({type: 'NewExpression', callee, arguments: args});
const SpreadElement = arg => ({type: 'SpreadElement', argument: arg});
const Logical = operator => left => right => ({type: 'LogicalExpression', operator, left, right});

const never = null;

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

// (import ["serif/es"] <body>)
exports.withEcmaScript = body => ({type: 'import', names: ['serif/es'], body});

exports.toJs = dirname => Y (recur => expression.fold ({
  'number': S.ifElse (S.lt (0))
                     (S.pipe ([S.negate, Literal, Unary (true) ('-')]))
                     (Literal),
  'string': Literal,
  'symbol': B (Call1 (Member (Identifier ('Symbol'))
                             (Literal ('for'))))
              (Literal),
  'identifier': name => (
    name === '.' || name === '/' ?
    Identifier (escapeIdentifier (name)) :
    S.array (never)
            (B (S.reduce (expr => B (S.maybe (never) (Member (expr)))
                                    (S.lift2 (S.alt)
                                             (B (S.map (value => recur ({type: 'string', value})))
                                                (S.stripPrefix ('.')))
                                             (B (S.map (name => recur ({type: 'symbol', name})))
                                                (S.stripPrefix ('/'))))))
               (B (Identifier)
                  (escapeIdentifier)))
            (S.reject (S.equals ('')) (name.split (/([./][^./]+)/)))
  ),
  'array': B (Array_) (S.map (recur)),
  'object': B (Object_) (S.map (([key, value]) => Property (recur (key)) (recur (value)))),
  'lambda': S.on (ArrowFunc1) (recur),
  'and': S.on (Logical ('&&')) (recur),
  'or': S.on (Logical ('||')) (recur),
  'if': predicate => consequent => alternative => Cond (recur (predicate)) (recur (consequent)) (recur (alternative)),
  'switch': discriminant => cases => (
    Call1 (ArrowFuncStatement ([Identifier ('$discriminant')])
                              (Block ([Switch (Identifier ('$discriminant'))
                                              (S.map (case_ => Case (recur (case_.predicate))
                                                                    ([Return (recur (case_.consequent))]))
                                                     (cases))])))
          (recur (discriminant))
  ),
  'new': args => (
    S.reduce (receive => arg => provide => receive (n => args => insert => arg.type === 'placeholder' ?
                                                                           provide (n - 1)
                                                                                   (S.prepend (genIdentifier (n)) (args))
                                                                                   (body => ArrowFunc1 (genIdentifier (n))
                                                                                                       (insert (body))) :
                                                                           provide (n - 1)
                                                                                   (S.prepend (recur (arg)) (args))
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
                                                                                   (S.append (recur (arg)) (args))
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
                                                                                      insert (n) (Call1 (callee) (recur (arg))))))
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
                                                      (recur (callee))));
                  default:
                    return insert (1) (recur (callee));
                }
              })
             (n => callee => callee)
  ),
  'import': names => body => (
    Call1 (ArrowFunc1 (ArrayPattern (S.map (symbol => recur ({type: 'identifier', name: Symbol.keyFor (symbol)}))
                                           (Object.getOwnPropertySymbols (S.reduce (env => name => Object.assign (env, require (name.startsWith ('.') ? path.join (dirname, name) : name)))
                                                                                   (Object.create (null))
                                                                                   (names)))))
                      (recur (body)))
          (Call1 (ArrowFunc ([Identifier ('env')])
                            (Call1 (Member (Call1 (Member (Identifier ('Object'))
                                                          (Literal ('getOwnPropertySymbols')))
                                                  (Identifier ('env')))
                                           (Literal ('map')))
                                   (ArrowFunc ([Identifier ('sym')])
                                              (Member (Identifier ('env'))
                                                      (Identifier ('sym'))))))
                 (Call2 (Member (Array_ (S.map (Literal) (names)))
                                (Literal ('reduce')))
                        (ArrowFunc ([Identifier ('env'), Identifier ('path')])
                                   (Call2 (Member (Identifier ('Object'))
                                                  (Literal ('assign')))
                                          (Identifier ('env'))
                                          (Call1 (Identifier ('require'))
                                                 (Identifier ('path')))))
                        (Call1 (Member (Identifier ('Object'))
                                       (Literal ('create')))
                               (Literal (null)))))
  ),
}));

const proxy = exports.proxy = names => expr => (
  Call (ArrowFunc (S.map (B (Identifier) (escapeIdentifier))
                         (names))
                  (expr))
       (S.map (Identifier)
              (names))
);

exports.toCommonJsModule = expr => (
  Program ('script')
          ([Statement (Literal ('use strict')),
            Statement (Assignment ('=')
                                  (Member (Identifier ('module'))
                                          (Literal ('exports')))
                                  (proxy (['__dirname', '__filename', 'exports', 'module', 'require'])
                                         (expr)))])
);
