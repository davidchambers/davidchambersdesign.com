'use strict';

const path = require ('node:path');

const S = require ('sanctuary');


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

exports.toJs = dirname => function recur(expr) {
  switch (expr.type) {
    case 'number': {
      return S.ifElse (S.lt (0))
                      (S.pipe ([S.negate, Literal, Unary (true) ('-')]))
                      (Literal)
                      (expr.value);
    }
    case 'string': {
      return Literal (expr.value);
    }
    case 'symbol': {
      return Call1 (Member (Identifier ('Symbol'))
                           (Literal ('for')))
                   (Literal (expr.name));
    }
    case 'identifier': {
      if (expr.name === '.' || expr.name === '/') {
        return Identifier (escapeIdentifier (expr.name));
      } else {
        const [head, ...tail] = (
          expr.name
          .split (/([./][^./]+)/)
          .filter (s => s !== '')
        );
        return tail.reduce (
          (expr, name) => {
            switch (name.slice (0, 1)) {
              case '.': return Member (expr) (recur ({type: 'string', value: name.slice (1)}));
              case '/': return Member (expr) (recur ({type: 'symbol', name: name.slice (1)}));
            }
          },
          Identifier (escapeIdentifier (head))
        );
      }
    }
    case 'array': {
      return Array_ (S.map (recur) (expr.elements));
    }
    case 'object': {
      return Object_ (S.map (([key, value]) => Property (recur (key)) (recur (value)))
                            (expr.entries));
    }
    case 'lambda': {
      return ArrowFunc1 (recur (expr.parameter))
                        (recur (expr.body));
    }
    case 'function': {
      return Func1 (recur (expr.name))
                   (recur (expr.parameter))
                   (Block ([Return (recur (expr.body))]));
    }
    case 'and': {
      return Logical ('&&')
                     (recur (expr.left))
                     (recur (expr.right));
    }
    case 'or': {
      return Logical ('||')
                     (recur (expr.left))
                     (recur (expr.right));
    }
    case 'if': {
      return Cond (recur (expr.predicate))
                  (recur (expr.consequent))
                  (recur (expr.alternative));
    }
    case 'switch': {
      return Call1 (ArrowFuncStatement ([Identifier ('$discriminant')])
                                       (Block ([Switch (Identifier ('$discriminant'))
                                                       (S.map (case_ => Case (recur (case_.predicate))
                                                                             ([Return (recur (case_.consequent))]))
                                                              (expr.cases))])))
                   (recur (expr.discriminant));
    }
    case 'new': {
      return S.reduce (receive => arg => provide => receive (n => args => insert => arg.type === 'placeholder' ?
                                                                                    provide (n - 1)
                                                                                            (S.prepend (genIdentifier (n)) (args))
                                                                                            (body => ArrowFunc1 (genIdentifier (n))
                                                                                                                (insert (body))) :
                                                                                    provide (n - 1)
                                                                                            (S.prepend (recur (arg)) (args))
                                                                                            (insert)))
                      (provide => n => args => insert => provide (n) (args) (insert))
                      (S.reverse (expr.arguments))
                      (n => args => insert => insert (args))
                      (expr.arguments.length - 1)
                      ([])
                      (([callee, ...args]) => New (callee) (args));
    }
    case 'invocation': {
      return S.reduce (receive => arg => provide => receive (n => args => insert => arg.type === 'placeholder' ?
                                                                                    provide (n - 1)
                                                                                            (S.append (genIdentifier (n)) (args))
                                                                                            (S.compose (ArrowFunc1 (genIdentifier (n))) (insert)) :
                                                                                    provide (n - 1)
                                                                                            (S.append (recur (arg)) (args))
                                                                                            (insert)))
                      (provide => n => args => insert => provide (n) (args) (insert))
                      (S.reverse (expr.arguments))
                      (n => args => insert => insert (args))
                      (expr.arguments.length)
                      ([])
                      (([object, ...args]) => Call (Member (object) (Literal (expr.name)))
                                                   (S.reverse (args)));
    }
    case 'application': {
      return S.reduce (receive => arg => provide => receive (n => insert => provide (n - 1)
                                                                                    (callee => arg.type === 'placeholder' ?
                                                                                               ArrowFunc1 (genIdentifier (n))
                                                                                                          (insert (Call1 (callee) (genIdentifier (n)))) :
                                                                                               insert (Call1 (callee) (recur (arg))))))
                      (provide => n => insert => provide (n) (insert))
                      (S.reverse (expr.arguments))
                      (n => insert => {
                         switch (expr.callee.type) {
                           case 'placeholder':
                             return ArrowFunc1 (genIdentifier (n))
                                               (insert (genIdentifier (n)));
                           case 'number':
                           case 'string':
                           case 'symbol':
                             return insert (ArrowFunc1 (genIdentifier (n))
                                                       (Member (genIdentifier (n))
                                                               (recur (expr.callee))));
                           default:
                             return insert (recur (expr.callee));
                         }
                       })
                      (expr.arguments.length)
                      (callee => callee);
    }
    case 'import': {
      const params = S.map (symbol => recur ({type: 'identifier', name: Symbol.keyFor (symbol)}))
                           (Object.getOwnPropertySymbols (S.reduce (env => name => Object.assign (env, require (name.startsWith ('.') ? path.join (dirname, name) : name)))
                                                                   (Object.create (null))
                                                                   (expr.names)));
      return Call1 (ArrowFunc1 (ArrayPattern (params))
                               (recur (expr.body)))
                   (Call1 (ArrowFunc ([Identifier ('env')])
                                     (Call1 (Member (Call1 (Member (Identifier ('Object'))
                                                                   (Literal ('getOwnPropertySymbols')))
                                                           (Identifier ('env')))
                                                    (Literal ('map')))
                                            (ArrowFunc ([Identifier ('sym')])
                                                       (Member (Identifier ('env'))
                                                               (Identifier ('sym'))))))
                          (Call2 (Member (Array_ (S.map (Literal) (expr.names)))
                                         (Literal ('reduce')))
                                 (ArrowFunc ([Identifier ('env'), Identifier ('path')])
                                            (Call2 (Member (Identifier ('Object'))
                                                           (Literal ('assign')))
                                                   (Identifier ('env'))
                                                   (Call1 (Identifier ('require'))
                                                          (Identifier ('path')))))
                                 (Call1 (Member (Identifier ('Object'))
                                                (Literal ('create')))
                                        (Literal (null)))));
    }
  }
};

const proxy = exports.proxy = names => expr => (
  Call (ArrowFunc (S.map (S.compose (Identifier) (escapeIdentifier))
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
