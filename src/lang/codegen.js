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
const Return = argument => ({type: 'ReturnStatement', argument});
const Identifier = name => ({type: 'Identifier', name});
const Literal = value => ({type: 'Literal', value});
const Call = callee => args => ({type: 'CallExpression', callee, arguments: args, optional: false});
const Call1 = callee => arg => Call (callee) ([arg]);
const Call2 = callee => arg1 => arg2 => Call (callee) ([arg1, arg2]);
const Array_ = elements => ({type: 'ArrayExpression', elements});
const ArrowFunc = params => body => ({type: 'ArrowFunctionExpression', id: null, expression: true, generator: false, async: false, params, body});
const ArrowFunc1 = param => ArrowFunc ([param]);
const Object_ = properties => ({type: 'ObjectExpression', properties});
const Property = key => value => ({type: 'Property', method: false, shorthand: false, computed: true, key, value, kind: 'init'});
const ArrayPattern = elements => ({type: 'ArrayPattern', elements});
const New = callee => args => ({type: 'NewExpression', callee, arguments: args});
const SpreadElement = arg => ({type: 'SpreadElement', argument: arg});

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
    case 'identifiers': {
      return S.reduce (Member)
                      (Identifier (escapeIdentifier (expr.head)))
                      (S.map (Literal) (expr.tail));
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
    case 'if': {
      return Cond (recur (expr.predicate))
                  (recur (expr.consequent))
                  (recur (expr.alternative));
    }
    case 'application': {
      return Call1 (S.elem (expr.function.type)
                           (['number', 'string', 'symbol']) ?
                    ArrowFunc1 (Identifier ('obj'))
                               (Member (Identifier ('obj'))
                                       (recur (expr.function))) :
                    recur (expr.function))
                   (recur (expr.argument));
    }
    case 'import*': {
      const params = S.map (symbol => recur ({type: 'identifiers', head: Symbol.keyFor (symbol), tail: []}))
                           (Object.getOwnPropertySymbols (S.reduce (env => name => Object.assign (env, require (path.join (dirname, name.value))))
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
                          (Call2 (Member (Array_ (S.map (recur) (expr.names)))
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

const op1 = operator => (
  ArrowFunc1 (Identifier ('operand'))
             (Unary (true)
                    (operator)
                    (Identifier ('operand')))
);

const op2 = operator => (
  ArrowFunc1 (Identifier ('right'))
             (ArrowFunc1 (Identifier ('left'))
                         (Binary (operator)
                                 (Identifier ('left'))
                                 (Identifier ('right'))))
);

const opNew = (
  ArrowFunc1 (Identifier ('Constructor'))
             (ArrowFunc1 (Identifier ('args'))
                         (New (Identifier ('Constructor'))
                              ([SpreadElement (Identifier ('args'))])))
);

const apply = (
  ArrowFunc1 (Identifier ('f'))
             (ArrowFunc1 (Identifier ('args'))
                         (Call1 (Identifier ('f'))
                                (SpreadElement (Identifier ('args')))))
);

const invoke = names => (
  ArrowFunc1 (Identifier ('name'))
             (S.reduce (body => name => ArrowFunc1 (Identifier (name)) (body))
                       (ArrowFunc1 (Identifier ('target'))
                                   (Call (Member (Identifier ('target'))
                                                 (Identifier ('name')))
                                         (S.map (Identifier) (names))))
                       (S.reverse (names)))
);

exports.env = {
  /* eslint-disable key-spacing */
  'apply':              apply,

  'invoke-0':           invoke ([]),
  'invoke-1':           invoke (['$1']),
  'invoke-2':           invoke (['$1', '$2']),
  'invoke-3':           invoke (['$1', '$2', '$3']),
  'invoke-4':           invoke (['$1', '$2', '$3', '$4']),
  'invoke-5':           invoke (['$1', '$2', '$3', '$4', '$5']),
  'invoke-6':           invoke (['$1', '$2', '$3', '$4', '$5', '$6']),
  'invoke-7':           invoke (['$1', '$2', '$3', '$4', '$5', '$6', '$7']),
  'invoke-8':           invoke (['$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8']),
  'invoke-9':           invoke (['$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8', '$9']),

  // https://262.ecma-international.org/6.0/#sec-11.8.1
  'null':               Literal (null),
  // https://262.ecma-international.org/6.0/#sec-11.8.2
  'true':               Literal (true),
  'false':              Literal (false),

  // https://262.ecma-international.org/6.0/#sec-12.3.3
  'new':                opNew,

  // https://262.ecma-international.org/6.0/#sec-12.5.5
  'void':               op1 ('void'),
  // https://262.ecma-international.org/6.0/#sec-12.5.6
  'typeof':             op1 ('typeof'),
  // https://262.ecma-international.org/6.0/#sec-12.5.11
  '~':                  op1 ('~'),
  // https://262.ecma-international.org/6.0/#sec-12.5.12
  '!':                  op1 ('!'),

  // https://262.ecma-international.org/6.0/#sec-12.6
  '*':                  op2 ('*'),
  '/':                  op2 ('/'),
  '%':                  op2 ('%'),

  // https://262.ecma-international.org/6.0/#sec-12.7
  '+':                  op2 ('+'),
  '-':                  op2 ('-'),

  // https://262.ecma-international.org/6.0/#sec-12.8
  '<<':                 op2 ('<<'),
  '>>':                 op2 ('>>'),
  '>>>':                op2 ('>>>'),

  // https://262.ecma-international.org/6.0/#sec-12.9
  '<':                  op2 ('<'),
  '>':                  op2 ('>'),
  '<=':                 op2 ('<='),
  '>=':                 op2 ('>='),
  'instanceof':         op2 ('instanceof'),
  'in':                 op2 ('in'),

  // https://262.ecma-international.org/6.0/#sec-12.10
  '==':                 op2 ('=='),
  '!=':                 op2 ('!='),
  '===':                op2 ('==='),
  '!==':                op2 ('!=='),

  // https://262.ecma-international.org/6.0/#sec-12.11
  '&':                  op2 ('&'),
  '^':                  op2 ('^'),
  '|':                  op2 ('|'),

  // https://262.ecma-international.org/6.0/#sec-12.12
  '&&':                 op2 ('&&'),
  '||':                 op2 ('||'),

  // https://262.ecma-international.org/6.0/#sec-18.1.1
  'Infinity':           Identifier ('Infinity'),
  // https://262.ecma-international.org/6.0/#sec-18.1.2
  'NaN':                Identifier ('NaN'),
  // https://262.ecma-international.org/6.0/#sec-18.1.3
  'undefined':          Identifier ('undefined'),

  // https://262.ecma-international.org/6.0/#sec-18.2.1
  'eval':               Identifier ('eval'),
  // https://262.ecma-international.org/6.0/#sec-18.2.2
  'isFinite':           Identifier ('isFinite'),
  // https://262.ecma-international.org/6.0/#sec-18.2.3
  'isNaN':              Identifier ('isNaN'),
  // https://262.ecma-international.org/6.0/#sec-18.2.4
  'parseFloat':         Identifier ('parseFloat'),
  // https://262.ecma-international.org/6.0/#sec-18.2.5
  'parseInt':           Identifier ('parseInt'),

  // https://262.ecma-international.org/6.0/#sec-18.2.6.2
  'decodeURI':          Identifier ('decodeURI'),
  // https://262.ecma-international.org/6.0/#sec-18.2.6.3
  'decodeURIComponent': Identifier ('decodeURIComponent'),
  // https://262.ecma-international.org/6.0/#sec-18.2.6.4
  'encodeURI':          Identifier ('encodeURI'),
  // https://262.ecma-international.org/6.0/#sec-18.2.6.5
  'encodeURIComponent': Identifier ('encodeURIComponent'),

  // https://262.ecma-international.org/6.0/#sec-18.3.1
  'Array':              Identifier ('Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.2
  'ArrayBuffer':        Identifier ('ArrayBuffer'),
  // https://262.ecma-international.org/6.0/#sec-18.3.3
  'Boolean':            Identifier ('Boolean'),
  // https://262.ecma-international.org/6.0/#sec-18.3.4
  'DataView':           Identifier ('DataView'),
  // https://262.ecma-international.org/6.0/#sec-18.3.5
  'Date':               Identifier ('Date'),
  // https://262.ecma-international.org/6.0/#sec-18.3.6
  'Error':              Identifier ('Error'),
  // https://262.ecma-international.org/6.0/#sec-18.3.7
  'EvalError':          Identifier ('EvalError'),
  // https://262.ecma-international.org/6.0/#sec-18.3.8
  'Float32Array':       Identifier ('Float32Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.9
  'Float64Array':       Identifier ('Float64Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.10
  'Function':           Identifier ('Function'),
  // https://262.ecma-international.org/6.0/#sec-18.3.11
  'Int8Array':          Identifier ('Int8Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.12
  'Int16Array':         Identifier ('Int16Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.13
  'Int32Array':         Identifier ('Int32Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.14
  'Map':                Identifier ('Map'),
  // https://262.ecma-international.org/6.0/#sec-18.3.15
  'Number':             Identifier ('Number'),
  // https://262.ecma-international.org/6.0/#sec-18.3.16
  'Object':             Identifier ('Object'),
  // https://262.ecma-international.org/6.0/#sec-18.3.17
  'Proxy':              Identifier ('Proxy'),
  // https://262.ecma-international.org/6.0/#sec-18.3.18
  'Promise':            Identifier ('Promise'),
  // https://262.ecma-international.org/6.0/#sec-18.3.19
  'RangeError':         Identifier ('RangeError'),
  // https://262.ecma-international.org/6.0/#sec-18.3.20
  'ReferenceError':     Identifier ('ReferenceError'),
  // https://262.ecma-international.org/6.0/#sec-18.3.21
  'RegExp':             Identifier ('RegExp'),
  // https://262.ecma-international.org/6.0/#sec-18.3.22
  'Set':                Identifier ('Set'),
  // https://262.ecma-international.org/6.0/#sec-18.3.23
  'String':             Identifier ('String'),
  // https://262.ecma-international.org/6.0/#sec-18.3.24
  'Symbol':             Identifier ('Symbol'),
  // https://262.ecma-international.org/6.0/#sec-18.3.25
  'SyntaxError':        Identifier ('SyntaxError'),
  // https://262.ecma-international.org/6.0/#sec-18.3.26
  'TypeError':          Identifier ('TypeError'),
  // https://262.ecma-international.org/6.0/#sec-18.3.27
  'Uint8Array':         Identifier ('Uint8Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.28
  'Uint8ClampedArray':  Identifier ('Uint8ClampedArray'),
  // https://262.ecma-international.org/6.0/#sec-18.3.29
  'Uint16Array':        Identifier ('Uint16Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.30
  'Uint32Array':        Identifier ('Uint32Array'),
  // https://262.ecma-international.org/6.0/#sec-18.3.31
  'URIError':           Identifier ('URIError'),
  // https://262.ecma-international.org/6.0/#sec-18.3.32
  'WeakMap':            Identifier ('WeakMap'),
  // https://262.ecma-international.org/6.0/#sec-18.3.33
  'WeakSet':            Identifier ('WeakSet'),

  // https://262.ecma-international.org/6.0/#sec-18.4.1
  'JSON':               Identifier ('JSON'),
  // https://262.ecma-international.org/6.0/#sec-18.4.2
  'Math':               Identifier ('Math'),
  // https://262.ecma-international.org/6.0/#sec-18.4.3
  'Reflect':            Identifier ('Reflect'),
  /* eslint-enable key-spacing */
};

exports.wrap = name => expr => (
  ArrowFunc1 (Identifier (escapeIdentifier (name)))
             (expr)
);

const withEnv = exports.withEnv = env => expr => (
  Call (ArrowFunc (S.map (Identifier)
                         (S.map (escapeIdentifier)
                                (Object.keys (env))))
                  (expr))
       (Object.values (env))
);

const nodeEnv = {
  /* eslint-disable key-spacing */
  '__dirname':          Identifier ('__dirname'),
  'require':            Identifier ('require'),
  /* eslint-enable key-spacing */
};

exports.toCommonJsModule = expr => (
  Program ('script')
          ([Statement (Literal ('use strict')),
            Statement (Assignment ('=')
                                  (Member (Identifier ('module'))
                                          (Literal ('exports')))
                                  (withEnv (nodeEnv) (expr)))])
);
