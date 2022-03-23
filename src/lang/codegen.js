'use strict';

const path = require ('path');

const S = require ('sanctuary');


const Program = sourceType => body => ({type: 'Program', sourceType, body});
const ExprStatement = expression => ({type: 'ExpressionStatement', expression});
const AssignmentExpr = operator => left => right => ({type: 'AssignmentExpression', operator, left, right});
const MemberExpr = computed => object => property => ({type: 'MemberExpression', object, property, computed, optional: false});
const ComputedMemberExpr = MemberExpr (true);
const StaticMemberExpr = MemberExpr (false);
const CondExpr = test => consequent => alternative => ({type: 'ConditionalExpression', test, consequent, alternate: alternative});
const UnaryExpr = prefix => operator => argument => ({type: 'UnaryExpression', prefix, operator, argument});
const BinaryExpr = operator => left => right => ({type: 'BinaryExpression', operator, left, right});
const FuncExpr = id => params => body => ({type: 'FunctionExpression', id, params, body, expression: false, generator: false, async: false});
const FuncExpr1 = id => param => FuncExpr (id) ([param]);
const BlockStatement = body => ({type: 'BlockStatement', body});
const ReturnStatement = argument => ({type: 'ReturnStatement', argument});
const Identifier = name => ({type: 'Identifier', name});
const Literal = value => ({type: 'Literal', value});
const CallExpr = callee => args => ({type: 'CallExpression', callee, arguments: args, optional: false});
const CallExpr1 = callee => arg => CallExpr (callee) ([arg]);
const ArrayExpr = elements => ({type: 'ArrayExpression', elements});
const ArrowFuncExpr = params => body => ({type: 'ArrowFunctionExpression', id: null, expression: true, generator: false, async: false, params, body});
const ArrowFuncExpr1 = param => ArrowFuncExpr ([param]);
const ObjectExpr = properties => ({type: 'ObjectExpression', properties});
const Property = key => value => ({type: 'Property', method: false, shorthand: false, computed: true, key, value, kind: 'init'});
const ArrayPattern = elements => ({type: 'ArrayPattern', elements});
const NewExpr = callee => args => ({type: 'NewExpression', callee, arguments: args});
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
      return expr.value < 0 ? UnaryExpr (true) ('-') (Literal (-expr.value)) : Literal (expr.value);
    }
    case 'string': {
      return Literal (expr.value);
    }
    case 'symbol': {
      return CallExpr1 (StaticMemberExpr (Identifier ('Symbol'))
                                         (Identifier ('for')))
                       (Literal (expr.name));
    }
    case 'property': {
      return ArrowFuncExpr1 (Identifier ('obj'))
                            (ComputedMemberExpr (Identifier ('obj'))
                                                (Literal (expr.name)));
    }
    case 'identifiers': {
      return S.reduce (ComputedMemberExpr)
                      (Identifier (escapeIdentifier (expr.head)))
                      (S.map (Literal) (expr.tail));
    }
    case 'array': {
      return ArrayExpr (S.map (recur) (expr.elements));
    }
    case 'object': {
      return ObjectExpr (S.map (([key, value]) => Property (recur (key)) (recur (value)))
                               (expr.entries));
    }
    case 'import*': {
      const params = S.map (symbol => recur ({type: 'identifiers', head: Symbol.keyFor (symbol), tail: []}))
                           (Object.getOwnPropertySymbols (S.reduce (env => name => Object.assign (env, require (path.join (dirname, name.value))))
                                                                   (Object.create (null))
                                                                   (expr.names)));
      return CallExpr1 (ArrowFuncExpr1 (ArrayPattern (params))
                                       (recur (expr.body)))
                       (CallExpr (ArrowFuncExpr ([Identifier ('env')])
                                                (CallExpr (StaticMemberExpr (CallExpr (StaticMemberExpr (Identifier ('Object'))
                                                                                                        (Identifier ('getOwnPropertySymbols')))
                                                                                      ([Identifier ('env')]))
                                                                            (Identifier ('map')))
                                                          ([ArrowFuncExpr ([Identifier ('sym')])
                                                                          (ComputedMemberExpr (Identifier ('env'))
                                                                                              (Identifier ('sym')))])))
                                 ([CallExpr (StaticMemberExpr (ArrayExpr (S.map (recur) (expr.names)))
                                                              (Identifier ('reduce')))
                                            ([ArrowFuncExpr ([Identifier ('env'), Identifier ('path')])
                                                            (CallExpr (StaticMemberExpr (Identifier ('Object'))
                                                                                        (Identifier ('assign')))
                                                                      ([Identifier ('env'),
                                                                        CallExpr (Identifier ('require'))
                                                                                 ([Identifier ('path')])])),
                                              CallExpr (StaticMemberExpr (Identifier ('Object'))
                                                                         (Identifier ('create')))
                                                       ([Literal (null)])])]));
    }
    case 'function': {
      return FuncExpr1 (recur (expr.name))
                       (recur (expr.parameter))
                       (BlockStatement ([ReturnStatement (recur (expr.body))]));
    }
    case 'lambda': {
      return ArrowFuncExpr1 (recur (expr.parameter))
                            (recur (expr.body));
    }
    case 'if': {
      return CondExpr (recur (expr.predicate))
                      (recur (expr.consequent))
                      (recur (expr.alternative));
    }
    case 'application': {
      return CallExpr1 (expr.function.type === 'symbol' ?
                        ArrowFuncExpr1 (Identifier ('obj'))
                                       (ComputedMemberExpr (Identifier ('obj'))
                                                           (CallExpr1 (StaticMemberExpr (Identifier ('Symbol'))
                                                                                        (Identifier ('for')))
                                                                      (Literal (expr.function.name)))) :
                        recur (expr.function))
                       (recur (expr.argument));
    }
  }
};

const op1 = operator => (
  ArrowFuncExpr1 (Identifier ('operand'))
                 (UnaryExpr (true)
                            (operator)
                            (Identifier ('operand')))
);

const op2 = operator => (
  ArrowFuncExpr1 (Identifier ('right'))
                 (ArrowFuncExpr1 (Identifier ('left'))
                                 (BinaryExpr (operator)
                                             (Identifier ('left'))
                                             (Identifier ('right'))))
);

const opNew = (
  ArrowFuncExpr1 (Identifier ('Constructor'))
                 (ArrowFuncExpr1 (Identifier ('args'))
                                 (NewExpr (Identifier ('Constructor'))
                                          ([SpreadElement (Identifier ('args'))])))
);

const apply = (
  ArrowFuncExpr1 (Identifier ('f'))
                 (ArrowFuncExpr1 (Identifier ('args'))
                                 (CallExpr1 (Identifier ('f'))
                                            (SpreadElement (Identifier ('args')))))
);

const invoke = names => (
  ArrowFuncExpr1 (Identifier ('name'))
                 (S.reduce (body => name => ArrowFuncExpr1 (Identifier (name)) (body))
                           (ArrowFuncExpr1 (Identifier ('target'))
                                           (CallExpr (ComputedMemberExpr (Identifier ('target'))
                                                                         (Identifier ('name')))
                                                     (S.map (Identifier) (names))))
                           (S.reverse (names)))
);

const env = {
  /* eslint-disable key-spacing */
  '__dirname':          Identifier ('__dirname'),
  'require':            Identifier ('require'),

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

exports.toCommonJsModule = jsExpr => (
  Program ('script')
          ([ExprStatement (Literal ('use strict')),
            ExprStatement (AssignmentExpr ('=')
                                          (StaticMemberExpr (Identifier ('module'))
                                                            (Identifier ('exports')))
                                          (CallExpr (ArrowFuncExpr (S.map (Identifier)
                                                                          (S.map (escapeIdentifier)
                                                                                 (Object.keys (env))))
                                                                   (jsExpr))
                                                    (Object.values (env))))])
);
