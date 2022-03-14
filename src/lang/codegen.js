'use strict';

const path = require ('path');

const escodegen = require ('escodegen');
const sanctuary = require ('sanctuary');

const Expr = require ('./Expr.js');
const read = require ('./read.js');
const rewrite = require ('./rewrite.js');
const {B, onArray1, onArray2, onArray3, pairs, traverseE} = require ('./util.js');


const {
  K,
  Left,
  Pair,
  Right,
  array,
  chain,
  encase,
  equals,
  lift2,
  lift3,
  map,
  mapLeft,
  maybe,
  on,
  pair,
  pipe,
  reduce,
  reverse,
  show,
  singleton,
  stripPrefix,
  trim,
  zipWith,
} = sanctuary.unchecked;

const {
  identifier,
  onBracketed,
  onIdentifier,
  onString,
  onSymbol,
  string,
} = Expr;

const Program = sourceType => body => ({type: 'Program', sourceType, body});
const ExprStatement = expression => ({type: 'ExpressionStatement', expression});
const AssignmentExpr = operator => left => right => ({type: 'AssignmentExpression', operator, left, right});
const MemberExpr = object => property => computed => ({type: 'MemberExpression', object, property, computed, optional: false});
const CondExpr = test => consequent => alternative => ({type: 'ConditionalExpression', test, consequent, alternate: alternative});
const UnaryExpr = prefix => operator => argument => ({type: 'UnaryExpression', prefix, operator, argument});
const FuncExpr = id => params => body => ({type: 'FunctionExpression', id, params, body, expression: false, generator: false, async: false});
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

//    ownPropertySymbols :: Object -> Array (Pair Symbol Any)
const ownPropertySymbols = obj => (
  map (sym => Pair (sym) (obj[sym]))
      (Object.getOwnPropertySymbols (obj))
);

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

const toJs = exports.toJs = dirname => Expr.fold ({
  symbol: name => Right (CallExpr1 (MemberExpr (Identifier ('Symbol'))
                                               (Identifier ('for'))
                                               (false))
                                   (Literal (name))),
  number: value => Right (value < 0 ? UnaryExpr (true) ('-') (Literal (-value)) : Literal (value)),
  string: B (Right) (Literal),
  identifier: name => Right (maybe (Identifier (escapeIdentifier (name)))
                                   (name => ArrowFuncExpr1 (Identifier ('obj'))
                                                           (MemberExpr (Identifier ('obj'))
                                                                       (Literal (name))
                                                                       (true)))
                                   (stripPrefix ('#') (name))),
  bracketed: toJs => elements => map (ArrayExpr) (traverseE (toJs) (elements)),
  braced: toJs => elements => map (ObjectExpr)
                                  (map (pair (zipWith (Property)))
                                       (chain (pairs)
                                              (traverseE (toJs) (elements)))),
  parenthesized: toJs =>
    array (Left ('Invalid call expression'))
          (onIdentifier (onSymbol (head => onArray1 (Left ('Invalid call expression'))
                                                    (on (lift2 (CallExpr1)) (toJs) (head)))
                                  (name => onArray1 (Left ('Invalid call expression'))
                                                    (B (map (CallExpr1 (ArrowFuncExpr1 (Identifier ('obj'))
                                                                                       (MemberExpr (Identifier ('obj'))
                                                                                                   (CallExpr1 (MemberExpr (Identifier ('Symbol'))
                                                                                                                          (Identifier ('for'))
                                                                                                                          (false))
                                                                                                              (Literal (name)))
                                                                                                   (true)))))
                                                       (toJs))))
                        (name => name === 'if' ?
                                 onArray3 (Left ('XXX'))
                                          (test => consequent => alternative => lift3 (CondExpr)
                                                                                      (toJs (test))
                                                                                      (toJs (consequent))
                                                                                      (toJs (alternative))) :
                                 name === 'lambda' ?
                                 onArray2 (Left ('XXX'))
                                          (params => body => lift2 (ArrowFuncExpr1)
                                                                   (onBracketed (K (Left ('XXX')))
                                                                                (onArray1 (Left ('XXX'))
                                                                                          (onIdentifier (K (Left ('XXX')))
                                                                                                        (B (toJs) (identifier))))
                                                                                (params))
                                                                   (toJs (body))) :
                                 name === 'function' ?
                                 onArray3 (Left ('XXX'))
                                          (name => params => body => lift3 (name => params => body => FuncExpr (name)
                                                                                                               (params)
                                                                                                               (BlockStatement ([ReturnStatement (body)])))
                                                                           (toJs (name))
                                                                           (onBracketed (K (Left ('XXX')))
                                                                                        (traverseE (toJs))
                                                                                        (params))
                                                                           (toJs (body))) :
                                 name === 'import' ?
                                 array (Left ('Invalid import expression: incorrect arity'))
                                       (fst => array (map (CallExpr1 (Identifier ('require')))
                                                          (toJs (fst)))
                                                     (snd => array (map (CallExpr1 (Identifier ('require')))
                                                                        (toJs (snd)))
                                                                   (K (K (Left ('Invalid import expression: incorrect arity')))))) :
                                 name === 'import*' ?
                                 onArray2 (Left ('Invalid import* expression'))
                                          (paths => body => chain (paths => lift3 (params => paths => body => CallExpr (ArrowFuncExpr ([Identifier (escapeIdentifier ('__dirname')), ArrayPattern (params)]) (body))
                                                                                                                       ([Literal (dirname),
                                                                                                                         CallExpr (ArrowFuncExpr ([Identifier ('env')])
                                                                                                                                                 (CallExpr (MemberExpr (CallExpr (MemberExpr (Identifier ('Object'))
                                                                                                                                                                                             (Identifier ('getOwnPropertySymbols'))
                                                                                                                                                                                             (false))
                                                                                                                                                                                 ([Identifier ('env')]))
                                                                                                                                                                       (Identifier ('map'))
                                                                                                                                                                       (false))
                                                                                                                                                           ([ArrowFuncExpr ([Identifier ('sym')])
                                                                                                                                                                           (MemberExpr (Identifier ('env'))
                                                                                                                                                                                       (Identifier ('sym'))
                                                                                                                                                                                       (true))])))
                                                                                                                                  ([CallExpr (MemberExpr (ArrayExpr (paths))
                                                                                                                                                         (Identifier ('reduce'))
                                                                                                                                                         (false))
                                                                                                                                             ([ArrowFuncExpr ([Identifier ('env'), Identifier ('path')])
                                                                                                                                                             (CallExpr (MemberExpr (Identifier ('Object'))
                                                                                                                                                                                   (Identifier ('assign'))
                                                                                                                                                                                   (false))
                                                                                                                                                                       ([Identifier ('env'),
                                                                                                                                                                         CallExpr (Identifier ('require'))
                                                                                                                                                                                  ([Identifier ('path')])])),
                                                                                                                                               CallExpr (MemberExpr (Identifier ('Object'))
                                                                                                                                                                    (Identifier ('create'))
                                                                                                                                                                    (false))
                                                                                                                                                        ([Literal (null)])])])]))
                                                                                  (traverseE (B (toJs) (B (identifier) (Symbol.keyFor)))
                                                                                             (Object.getOwnPropertySymbols (reduce (env => path_ => Object.assign (env, require (path.join (dirname, path_))))
                                                                                                                                   (Object.create (null))
                                                                                                                                   (paths))))
                                                                                  (traverseE (B (toJs) (string)) (paths))
                                                                                  (toJs (body)))
                                                                  (chain (traverseE (onString (K (Left ('Invalid import* expression')))
                                                                                              (Right)))
                                                                         (onBracketed (K (Left ('Invalid import* expression')))
                                                                                      (Right)
                                                                                      (paths)))) :
                                 // else
                                 maybe (onArray1 (Left ('Invalid call expression'))
                                                 (on (lift2 (CallExpr1)) (toJs) (identifier (name))))
                                       (name => B (array (Left ('Invalid call expression'))
                                                         (target => args => lift2 (target => CallExpr (MemberExpr (target)
                                                                                                                  (Identifier (name))
                                                                                                                  (false)))
                                                                                  (toJs (target))
                                                                                  (traverseE (toJs) (reverse (args)))))
                                                  (reverse))
                                       (stripPrefix ('.') (name)))),
});

const toCommonJsModule = exports.toCommonJsModule = jsExpr => (
  Program ('script')
          ([ExprStatement (Literal ('use strict')),
            ExprStatement (AssignmentExpr ('=')
                                          (MemberExpr (Identifier ('module'))
                                                      (Identifier ('exports'))
                                                      (false))
                                          (jsExpr))])
);


if (process.argv[1] === __filename) {
  const assert = require ('assert');
  const vm = require ('vm');

  const baseEnv = require ('./modules/base.js');

  // Define Symbol#fantasy-land/equals:
  require ('./modules/sanctuary.js');

  const eq = actual => expected => {
    assert.deepStrictEqual (show (actual), show (expected));
    assert.deepStrictEqual (equals (actual) (expected), true);
  };

  const eval_ = _env => {
    const env = reduce (env => pair (sym => val => Object.assign (env, singleton (escapeIdentifier (Symbol.keyFor (sym))) (val))))
                       (Object.create (null))
                       (ownPropertySymbols (_env));
    return pipe ([
      read,
      chain (pair (rest => trim (rest) === '' ? Right : K (Left ('Unread source text')))),
      chain (rewrite ('TK')),
      chain (rewrite ('TK')),
      chain (toJs ('TK')),
      map (toCommonJsModule),
      map (escodegen.generate),
      chain (B (mapLeft (err => err.message))
               (encase (code => vm.runInNewContext (code, {...env, module: {}}, {})))),
    ]);
  };

  eq (eval_ ({}) (':foo'))
     (Right (Symbol.for ('foo')));

  eq (eval_ ({}) (':<*>'))
     (Right (Symbol.for ('<*>')));

  eq (eval_ ({}) ('"foo"'))
     (Right ('foo'));

  eq (eval_ ({}) ('123.45'))
     (Right (123.45));

  eq (eval_ ({[Symbol.for ('x')]: 1, [Symbol.for ('y')]: 2}) ('x'))
     (Right (1));

  eq (eval_ ({}) ('{}')) (Right ({}));
  eq (eval_ ({}) ('{"x"}')) (Left ('Unmatched term'));
  eq (eval_ ({}) ('{"x" 1}')) (Right ({x: 1}));
  eq (eval_ ({}) ('{"x" 1 "y"}')) (Left ('Unmatched term'));
  eq (eval_ ({}) ('{"x" 1 "y" 2}')) (Right ({x: 1, y: 2}));
  eq (eval_ ({}) ('{"x" 1 "y" 2 "z"}')) (Left ('Unmatched term'));
  eq (eval_ ({}) ('{"x" 1 "y" 2 "z" 3}')) (Right ({x: 1, y: 2, z: 3}));

  eq (eval_ ({}) ('()'))
     (Left ('Empty parentheses'));

  eq (eval_ ({}) ('(lambda)'))
     (Left ('Invalid lambda expression: incorrect arity'));

  eq (eval_ ({}) ('(lambda x)'))
     (Left ('Invalid lambda expression: incorrect arity'));

  eq (eval_ ({}) ('(lambda x x x)'))
     (Left ('Invalid lambda expression: incorrect arity'));

  eq (eval_ ({}) ('(lambda x x)'))
     (Left ('Invalid lambda expression: expected []'));

  eq (eval_ ({}) ('(lambda ["x"] x)'))
     (Left ('Invalid lambda expression: expected identifier'));

  eq (eval_ ({}) ('((lambda [x] x) 64)'))
     (Right (64));

  eq (eval_ ({}) ('((lambda [x y z] x) 1 2 3)'))
     (Right (1));

  eq (eval_ ({}) ('((lambda [x y z] y) 1 2 3)'))
     (Right (2));

  eq (eval_ ({}) ('((lambda [x y z] z) 1 2 3)'))
     (Right (3));

  eq (eval_ ({}) ('(let [x 8] x)'))
     (Right (8));

  eq (eval_ ({}) ('(let [x 8 y x] y)'))
     (Right (8));

  eq (eval_ ({}) ('true'))
     (Left ('_true is not defined'));

  eq (eval_ ({}) ('false'))
     (Left ('_false is not defined'));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('true'))
     (Right (true));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('false'))
     (Right (false));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if true 8 x)'))
     (Right (8));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if false x 8)'))
     (Right (8));

  eq (eval_ ({}) ('(if "xxx" "yes" "no")'))
     (Right ('yes'));

  eq (eval_ ({}) ('(if "" "yes" "no")'))
     (Right ('no'));

  eq (eval_ ({}) ('(.toUpperCase "foo")'))
     (Right ('FOO'));

  eq (eval_ ({}) ('(.toFixed 2 123.456)'))
     (Right ('123.46'));

  eq (eval_ (baseEnv) ('(.abs -1 Math)'))
     (Right (1));

  eq (eval_ ({}) ('((function identity [x] x) 64)'))
     (Right (64));

  eq (eval_ ({}) ('((function constant [x y] x) "foo" "bar")'))
     (Right ('foo'));

  eq (eval_ ({[Symbol.for ('=')]: y => x => x === y,
              [Symbol.for ('*')]: y => x => x * y,
              [Symbol.for ('-')]: y => x => x - y})
            (`(let [fact
                    (function factorial [x]
                       (if (= 0 x)
                           1
                           (* x (factorial (- 1 x)))))]
                   (fact 5))`))
     (Right (120));
}
