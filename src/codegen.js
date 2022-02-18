'use strict';

const fs = require ('fs');
const path = require ('path');
const util = require ('util');

const acorn = require ('acorn');
const escodegen = require ('escodegen');
const sanctuary = require ('sanctuary');

const nodes = require ('./nodes.js');
const read = require ('./read.js');


const {
  Either,
  K,
  Left,
  Pair,
  Right,
  array,
  chain,
  either,
  lift2,
  lift3,
  map,
  on,
  pair,
  pipe,
  reduce,
  traverse,
  trim,
  zipWith,
} = sanctuary.unchecked;

const {
  braced,
  bracketed,
  identifier,
  number,
  onBracketed,
  onIdentifier,
  onString,
  parenthesized,
  string,
  symbol,
} = nodes;

//    B :: (b -> c) -> (a -> b) -> a -> c
const B = f => g => x => f (g (x));

const traverseE = traverse (Either);

//    pairs :: Array a -> Either String (Pair (Array a) (Array a))
const pairs = kvs => {
  const [ks, vs] = kvs.reduce (
    (acc, x, idx) => ((acc[idx % 2].push (x), acc)),
    [[], []],
  );
  return (
    ks.length === vs.length ?
    Right (Pair (ks) (vs)) :
    Left ('Unmatched term')
  );
};

(
util.inspect (
  acorn.parse (`
module.exports = 42;
`, {
      ecmaVersion: 2020,
  }),
  {depth: Infinity},
)
);

const ExprStatement = expression => ({type: 'ExpressionStatement', expression});
const AssignmentExpr = operator => left => right => ({type: 'AssignmentExpression', operator, left, right});
const MemberExpr = object => property => computed => ({type: 'MemberExpression', object, property, computed, optional: false});
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

//    symbolToString :: Symbol -> String
const symbolToString = sym => (
  String (sym)
  .slice ('Symbol('.length, -')'.length)
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

const rewrite = nodes.fold ({
  symbol: B (Right) (symbol),
  number: B (Right) (number),
  string: B (Right) (string),
  identifier: B (Right) (identifier),
  bracketed: elements => map (bracketed) (traverseE (rewrite) (elements)),
  braced: elements => map (braced) (traverseE (rewrite) (elements)),
  parenthesized: (
    array (Left ('Empty parentheses'))
          (onIdentifier (head => tail => lift2 (reduce (f => x => parenthesized ([f, x])))
                                               (rewrite (head))
                                               (traverseE (rewrite) (tail)))
                        (name => name === 'lambda' ?
                                 array (Left ('Invalid lambda expression'))
                                       (params => array (Left ('Invalid lambda expression'))
                                                        (body => array (onBracketed (K (Left ('Invalid lambda expression')))
                                                                                    (B (lift2 (reduce (body => ident => parenthesized ([identifier ('lambda'), bracketed ([ident]), body])))
                                                                                              (rewrite (body)))
                                                                                       (traverseE (onIdentifier (K (Left ('Invalid lambda expression')))
                                                                                                                (B (rewrite) (identifier))))))
                                                                       (K (K (Left ('Invalid lambda expression')))))) :
                                 name === 'let' ?
                                 array (Left ('Invalid let expression'))
                                       (bindings => array (Left ('Invalid let expression'))
                                                          (body => array (onBracketed (K (Left ('Invalid let expression')))
                                                                                      (B (chain (pair (idents => exprs => chain (idents => rewrite (parenthesized ([identifier ('lambda'), bracketed (idents), ...exprs])))
                                                                                                                                (traverseE (onIdentifier (K (Left ('Invalid let expression')))
                                                                                                                                                         (B (Right) (identifier)))
                                                                                                                                           (idents)))))
                                                                                         (pairs))
                                                                                      (bindings))
                                                                         (K (K (Left ('Invalid let expression')))))) :
                                 name === 'import*' ?
                                 B (map (tail => parenthesized ([identifier (name), ...tail])))
                                   (traverseE (rewrite)) :
                                 // else
                                 B (lift2 (reduce (f => x => parenthesized ([f, x])))
                                          (rewrite (identifier (name))))
                                   (traverseE (rewrite))))
  ),
});

const onArray1 = x => f => (
  array (x)
        (a => array (f (a))
                    (x))
);

const onArray2 = x => f => (
  array (x)
        (a => array (x)
                    (b => array (f (a) (b))
                                (K (K (x)))))
);

const Object$assign = MemberExpr (Identifier ('Object')) (Identifier ('assign')) (false);
const Object$create = MemberExpr (Identifier ('Object')) (Identifier ('create')) (false);
const Object$getOwnPropertySymbols = MemberExpr (Identifier ('Object')) (Identifier ('getOwnPropertySymbols')) (false);
const Symbol$for = MemberExpr (Identifier ('Symbol')) (Identifier ('for')) (false);
const module$exports = MemberExpr (Identifier ('module')) (Identifier ('exports')) (false);

const toJs = nodes.fold ({
  symbol: name => Right (CallExpr1 (Symbol$for) (Literal (name))),
  number: B (Right) (Literal),
  string: B (Right) (Literal),
  identifier: B (Right) (B (Identifier) (escapeIdentifier)),
  bracketed: elements => map (ArrayExpr) (traverseE (toJs) (elements)),
  braced: elements => map (ObjectExpr)
                          (map (pair (zipWith (Property)))
                               (chain (pairs)
                                      (traverseE (toJs) (elements)))),
  parenthesized:
    array (Left ('Invalid call expression'))
          (onIdentifier (head => onArray1 (Left ('Invalid call expression'))
                                          (on (lift2 (CallExpr1)) (toJs) (head)))
                        (name => name === 'lambda' ?
                                 onArray2 (Left ('Invalid lambda expression'))
                                          (pipe ([onBracketed (K (Left ('Invalid lambda expression')))
                                                              (traverseE (onIdentifier (K (Left ('Invalid lambda expression'))) (Right))),
                                                  chain (onArray1 (Left ('Invalid lambda expression'))
                                                                  (B (Right) (identifier))),
                                                  on (lift2 (ArrowFuncExpr1)) (toJs)])) :
                                 name === 'import*' ?
                                 onArray2 (Left ('Invalid import* expression'))
                                          (paths => body => chain (paths => lift3 (params => paths => body => ExprStatement (AssignmentExpr ('=')
                                                                                                                                            (module$exports)
                                                                                                                                            (CallExpr (ArrowFuncExpr ([ArrayPattern (params)]) (body))
                                                                                                                                                      ([CallExpr (ArrowFuncExpr ([Identifier ('env')])
                                                                                                                                                                                (CallExpr (MemberExpr (CallExpr (Object$getOwnPropertySymbols)
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
                                                                                                                                                                                            (CallExpr (Object$assign)
                                                                                                                                                                                                      ([Identifier ('env'),
                                                                                                                                                                                                        CallExpr (Identifier ('require'))
                                                                                                                                                                                                                 ([Identifier ('path')])])),
                                                                                                                                                                              CallExpr (Object$create)
                                                                                                                                                                                       ([Literal (null)])])])]))))
                                                                                  (traverseE (B (toJs) (B (identifier) (symbolToString)))
                                                                                             (Object.getOwnPropertySymbols (reduce (env => path => Object.assign (env, require (path)))
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
                                 onArray1 (Left ('Invalid call expression'))
                                          (on (lift2 (CallExpr1)) (toJs) (identifier (name))))),
});

const asdf = pipe ([
  read,
  chain (pair (rest => trim (rest) === '' ? Right : K (Left ('Unread source text')))),
  chain (rewrite),
  chain (rewrite),
  chain (toJs),
  map (escodegen.generate),
  either (err => { console.error (err); process.exit (1); })
         (console.log),
]);

//asdf ('(lambda [x y] (+ x y))');
//asdf ('[:foo :bar 123 "abc" (+ x y) (thunk) (lambda [x] (+ x x)) ($ "hi") (- 5)]');
//asdf ('(link {:rel "stylesheet" :href "/css/print.css" :media "print"})');
//asdf (fs.readFileSync (path.resolve (__dirname, 'elements.clj'), 'utf8'));
//asdf ('(let [x 1 y 2] (+ x y))');
asdf ('(import* ["./base.js" "./foo.js" "./quux.js"] (+ foo bar))');
//asdf ('{:x 1 :y 2}');
