'use strict';

const Expr = require ('./Expr.js');


const {
  braced,
  bracketed,
  identifier,
  number,
  parenthesized,
  string,
  symbol,
} = Expr;

const wrap = pre => post => f => elements => (
  pre + (elements.map (f)).join (' ') + post
);

//    print :: Expr -> String
const print = module.exports = Expr.fold ({
  /* eslint-disable key-spacing */
  number:         value => String (value),
  string:         value => '"' +
                           value
                           .replace (/\\/g, '\\\\')
                           .replace (/\n/g, '\\n')
                           .replace (/\t/g, '\\t')
                           .replace (/"/g, '\\"') +
                           '"',
  symbol:         name => ':' + name,
  identifier:     name => name,
  bracketed:      wrap ('[') (']'),
  braced:         wrap ('{') ('}'),
  parenthesized:  wrap ('(') (')'),
  /* eslint-enable key-spacing */
});


if (process.argv[1] === __filename) {
  const assert = require ('assert');

  const eq = actual => expected => {
    assert.strictEqual (actual, expected);
  };

  eq (print (number (123)))
     ('123');

  eq (print (number (123.456)))
     ('123.456');

  eq (print (string ('foo')))
     ('"foo"');

  eq (print (string ('foo "bar" baz')))
     ('"foo \\"bar\\" baz"');

  eq (print (string ('\\')))
     ('"\\\\"');

  eq (print (string ('\t\n\t\n')))
     ('"\\t\\n\\t\\n"');

  eq (print (symbol ('foo')))
     (':foo');

  eq (print (identifier ('foo')))
     ('foo');

  eq (print (bracketed ([])))
     ('[]');

  eq (print (bracketed ([identifier ('foo')])))
     ('[foo]');

  eq (print (bracketed ([identifier ('foo'), identifier ('bar')])))
     ('[foo bar]');

  eq (print (braced ([])))
     ('{}');

  eq (print (braced ([identifier ('foo')])))
     ('{foo}');

  eq (print (braced ([identifier ('foo'), identifier ('bar')])))
     ('{foo bar}');

  eq (print (parenthesized ([])))
     ('()');
}
