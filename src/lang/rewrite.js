'use strict';

const path = require ('path');

const sanctuary = require ('sanctuary');

const Expr = require ('./Expr.js');
const {B, C, onArray1, onArray2, onArray3, pairs, traverseE} = require ('./util.js');


const {
  K,
  Left,
  Pair,
  Right,
  array,
  chain,
  lift2,
  lift3,
  map,
  pair,
  pipe,
  prepend,
  reduce,
  reverse,
  zip,
} = sanctuary.unchecked;

const {
  braced,
  bracketed,
  identifier,
  number,
  onBracketed,
  onIdentifier,
  onSymbol,
  parenthesized,
  string,
  symbol,
} = Expr;

//    toModulePath :: String -> String -> Expr
const toModulePath = dirname => name => {
  const comps = (path.relative (dirname, path.join (__dirname, 'modules', name))).split (path.sep);
  return string ((comps[0] === '.' || comps[0] === '..' ? comps : ['.', ...comps]).join ('/'));
};

//    lambda :: Expr -> Expr -> Expr
const lambda = body => ident => (
  parenthesized ([identifier ('lambda'),
                  bracketed ([ident]),
                  body])
);

module.exports = dirname => Expr.fold ({
  symbol: B (Right) (symbol),
  number: B (Right) (number),
  string: B (Right) (string),
  identifier: B (Right) (identifier),
  bracketed: rewrite => elements => map (bracketed) (traverseE (rewrite) (elements)),
  braced: rewrite => elements => map (braced) (traverseE (rewrite) (elements)),
  parenthesized: rewrite => (
    array (Left ('Empty parentheses'))
          (onIdentifier (head => tail => lift2 (reduce (f => x => parenthesized ([f, x])))
                                               (rewrite (head))
                                               (traverseE (rewrite) (tail)))
                        (name => name === 'if' ?
                                 onArray3 (Left ('Invalid if expression: incorrect arity'))
                                          (test => consequent => alternative =>
                                             lift3 (test => consequent => alternative =>
                                                      parenthesized ([identifier ('if'),
                                                                      test,
                                                                      consequent,
                                                                      alternative]))
                                                   (rewrite (test))
                                                   (rewrite (consequent))
                                                   (rewrite (alternative))) :
                                 name === 'lambda' ?
                                 onArray2 (Left ('Invalid lambda expression: incorrect arity'))
                                          (params => body => lift2 (C (reduce (lambda)))
                                                                   (onBracketed (K (Left ('Invalid lambda expression: expected []')))
                                                                                (B (traverseE (onIdentifier (K (Left ('Invalid lambda expression: expected identifier')))
                                                                                                            (B (rewrite) (identifier))))
                                                                                   (reverse))
                                                                                (params))
                                                                   (rewrite (body))) :
                                 name === 'function' ?
                                 onArray3 (Left ('Invalid function expression: incorrect arity'))
                                          (name => params => body => lift3 (name => pair (ident => idents => body => parenthesized ([identifier ('function'),
                                                                                                                                     name,
                                                                                                                                     bracketed ([ident]),
                                                                                                                                     reduce (lambda) (body) (reverse (idents))])))
                                                                           (onIdentifier (K (Left ('Invalid function expression: expected identifier')))
                                                                                         (B (rewrite) (identifier))
                                                                                         (name))
                                                                           (chain (array (Left ('Invalid function expression: no parameters'))
                                                                                         (ident => idents => Right (Pair (ident) (idents))))
                                                                                  (onBracketed (K (Left ('Invalid function expression: expected []')))
                                                                                               (traverseE (onIdentifier (K (Left ('Invalid function expression: expected identifier')))
                                                                                                                        (B (rewrite) (identifier))))
                                                                                               (params)))
                                                                           (rewrite (body))) :
                                 name === 'let' ?
                                 onArray2 (Left ('Invalid let expression: incorrect arity'))
                                          (bindings => body => onBracketed (K (Left ('Invalid let expression: expected []')))
                                                                           (pipe ([pairs,
                                                                                   map (pipe ([pair (zip),
                                                                                               reverse,
                                                                                               reduce (body => pair (ident => arg => parenthesized ([parenthesized ([identifier ('lambda'), bracketed ([ident]), body]), arg])))
                                                                                                      (body)])),
                                                                                   chain (rewrite)]))
                                                                           (bindings)) :
                                 name === 'import' ?
                                 onArray1 (Left ('Invalid import expression: incorrect arity'))
                                          (B (map (expr => parenthesized ([identifier ('import'), expr])))
                                             (onSymbol (rewrite)
                                                       (B (rewrite) (toModulePath (dirname))))) :
                                 name === 'import*' ?
                                 onArray2 (Left ('Invalid import* expression: incorrect arity'))
                                          (paths => body => lift2 (paths => body => parenthesized ([identifier ('import*'), paths, body]))
                                                                  (onBracketed (rewrite)
                                                                               (B (map (bracketed))
                                                                                  (traverseE (onSymbol (rewrite)
                                                                                                       (B (rewrite) (toModulePath (dirname))))))
                                                                               (paths))
                                                                  (rewrite (body))) :
                                 name.startsWith ('#') ?
                                 B (map (parenthesized))
                                   (B (lift2 (prepend) (rewrite (identifier (name))))
                                      (traverseE (rewrite))) :
                                 // else
                                 B (lift2 (reduce (f => x => parenthesized ([f, x])))
                                          (rewrite (identifier (name))))
                                   (traverseE (rewrite))))
  ),
});
