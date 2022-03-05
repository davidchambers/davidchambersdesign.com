'use strict';

const sanctuary = require ('sanctuary');

const Expr = require ('./Expr.js');


const {
  I,
  Just,
  K,
  Left,
  Maybe,
  Pair,
  Right,
  append,
  chain,
  compose: B,
  either,
  equals,
  filter,
  fromMaybe,
  ifElse,
  lines,
  map,
  match,
  maybe,
  maybe_,
  pair,
  parseInt: parseInt_,
  pipe,
  pipeK,
  prop,
  show,
  stripPrefix,
  traverse,
  unless,
  unlines,
} = sanctuary.unchecked;

const {
  braced,
  bracketed,
  identifier,
  number,
  parenthesized,
  string,
  symbol,
} = Expr;

const matchIdentifier = match (/^[^()[\]{}"\s]+/);

const trimLeft = s => (
  unless (equals (s))
         (trimLeft)
         (s
          .replace (/^\s*/, '')
          .replace (/^;.*/, ''))
);

const readGroup = closing => ctor => elements => (
  B (rest => maybe_ (() => chain (pair (rest => element => readGroup (closing)
                                                                     (ctor)
                                                                     (append (element) (elements))
                                                                     (rest)))
                                 (read (rest)))
                    (rest => Right (Pair (rest) (ctor (elements))))
                    (stripPrefix (closing) (rest)))
    (trimLeft)
);

const readString = rest => {
  let value = '';
  let idx = 0;
  outer:
  while (true) {
    let c;
    switch (c = rest[idx++]) {  // eslint-disable-line no-plusplus
      case undefined: return Left (new SyntaxError ('Unterminated string literal'));
      case '"':       return Right (Pair (rest.slice (idx)) (string (value)));
      case '\\':
        switch (c = rest[idx++]) {  // eslint-disable-line no-plusplus
          case '"':   value += '"'; continue outer;
          case 'n':   value += '\n'; continue outer;
          case 't':   value += '\t'; continue outer;
          case '\\':  value += '\\'; continue outer;
          case 'u': {
            const code = chain (parseInt_ (16))
                               (filter (B (equals (4)) (prop ('length')))
                                       (Just (rest.slice (idx, idx += 4))));
            if (code.isJust) {
              value += String.fromCharCode (code.value);
              continue outer;
            }
          }
          default:    return Left (new SyntaxError ('Invalid escape sequence'));
        }
      default:        value += c;
    }
  }
};

const read = module.exports = pipe ([
  trimLeft,
  Right,
  pipeK ([
    s => s.startsWith ('(') ? Left (readGroup (')') (parenthesized) ([]) (s.slice (1))) : Right (s),
    s => s.startsWith (')') ? Left (Left (new SyntaxError ('Unmatched )'))) : Right (s),
    s => s.startsWith ('[') ? Left (readGroup (']') (bracketed) ([]) (s.slice (1))) : Right (s),
    s => s.startsWith (']') ? Left (Left (new SyntaxError ('Unmatched ]'))) : Right (s),
    s => s.startsWith ('{') ? Left (readGroup ('}') (braced) ([]) (s.slice (1))) : Right (s),
    s => s.startsWith ('}') ? Left (Left (new SyntaxError ('Unmatched }'))) : Right (s),
    s => s.startsWith ('"""') ?
         Left (maybe (Left (new SyntaxError ('Unterminated """')))
                     (({groups: [{value}, {value: rest}]}) =>
                        maybe (Left (new SyntaxError ('Inconsistent indentation within """')))
                              (value => Right (Pair (rest) (string (value))))
                              (maybe (Just (value))
                                     (({groups: [{value}, {value: prefix}]}) =>
                                        map (unlines)
                                            (traverse (Maybe)
                                                      (ifElse (equals (''))
                                                              (Just)
                                                              (stripPrefix (prefix)))
                                                      (lines (fromMaybe (value)
                                                                        (stripPrefix ('\n')
                                                                                     (value))))))
                                     (match (/^([^]*)\n([ ]*)$/) (value))))
                     (match (/^"""([^]*?)"""([^]*)$/) (s))) :
         Right (s),
    s => s.startsWith ('"') ? Left (readString (s.slice (1))) : Right (s),
    s => maybe (Right (s))
               (s => Left (maybe (Left (new SyntaxError ('Empty symbol')))
                                 (B (name => Right (Pair (s.slice (name.length))
                                                         (symbol (name))))
                                    (prop ('match')))
                                 (matchIdentifier (s))))
               (stripPrefix (':') (s)),
    s => maybe (Right (s))
               (B (raw => Left (Right (Pair (s.slice (raw.length))
                                            (number (Number (raw))))))
                  (prop ('match')))
               (match (/^-?[0-9]+([.][0-9]+)?/) (s)),
    s => Left (maybe (Left (new SyntaxError ('Unexpected end of input')))
                     (B (name => Right (Pair (s.slice (name.length))
                                             (identifier (name))))
                        (prop ('match')))
                     (matchIdentifier (s))),
  ]),
  either (I) (K (Left (new Error ('Invalid input')))),
]);


if (process.argv[1] === __filename) {
  const assert = require ('assert');

  const eq = actual => expected => {
    assert.deepStrictEqual (show (actual), show (expected));
    assert.deepStrictEqual (actual, expected);
  };

  eq (read ('')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (read ('(')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (read (')')) (Left (new SyntaxError ('Unmatched )')));
  eq (read (' ')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (read ('\n')) (Left (new SyntaxError ('Unexpected end of input')));

  eq (read ('foo'))
     (Right (Pair ('')
                  (identifier ('foo'))));

  eq (read ('foo bar'))
     (Right (Pair (' bar')
                  (identifier ('foo'))));

  eq (read ('foo)'))
     (Right (Pair (')')
                  (identifier ('foo'))));

  eq (read ('foo(bar))'))
     (Right (Pair ('(bar))')
                  (identifier ('foo'))));

  eq (read ('(foo)'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo')]))));

  eq (read ('(foo bar)'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo'),
                                   identifier ('bar')]))));

  eq (read ('(foo bar baz)'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo'),
                                   identifier ('bar'),
                                   identifier ('baz')]))));

  eq (read ('((foo))'))
     (Right (Pair ('')
                  (parenthesized ([parenthesized ([identifier ('foo')])]))));

  eq (read ('(((foo)))'))
     (Right (Pair ('')
                  (parenthesized ([parenthesized ([parenthesized ([identifier ('foo')])])]))));

  eq (read ('((foo) bar)'))
     (Right (Pair ('')
                  (parenthesized ([parenthesized ([identifier ('foo')]),
                                   identifier ('bar')]))));

  eq (read ('(foo (bar))'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo'),
                                   parenthesized ([identifier ('bar')])]))));

  eq (read ('((foo) (bar))'))
     (Right (Pair ('')
                  (parenthesized ([parenthesized ([identifier ('foo')]),
                                   parenthesized ([identifier ('bar')])]))));

  eq (read ('(foo )'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo')]))));

  eq (read ('( foo)'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo')]))));

  eq (read ('( foo )'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo')]))));

  eq (read (':foo'))
     (Right (Pair ('')
                  (symbol ('foo'))));

  eq (read (':<*>'))
     (Right (Pair ('')
                  (symbol ('<*>'))));

  eq (read ('"')) (Left (new SyntaxError ('Unterminated string literal')));
  eq (read ('"\\"')) (Left (new SyntaxError ('Unterminated string literal')));
  eq (read ('"\\z"')) (Left (new SyntaxError ('Invalid escape sequence')));
  eq (read ('"\\uXXXX"')) (Left (new SyntaxError ('Invalid escape sequence')));

  eq (read ('""'))
     (Right (Pair ('')
                  (string (''))));

  eq (read ('"foo"'))
     (Right (Pair ('')
                  (string ('foo'))));

  eq (read ('"foo bar"'))
     (Right (Pair ('')
                  (string ('foo bar'))));

  eq (read ('"foo bar baz"'))
     (Right (Pair ('')
                  (string ('foo bar baz'))));

  eq (read ('"foo \\"bar\\" baz"'))
     (Right (Pair ('')
                  (string ('foo "bar" baz'))));

  eq (read ('"\\\\"'))
     (Right (Pair ('')
                  (string ('\\'))));

  eq (read ('"\\n"'))
     (Right (Pair ('')
                  (string ('\n'))));

  eq (read ('"\\t"'))
     (Right (Pair ('')
                  (string ('\t'))));

  eq (read ('"""foo"""'))
     (Right (Pair ('')
                  (string ('foo'))));

  eq (read ('"""foo "bar" baz"""'))
     (Right (Pair ('')
                  (string ('foo "bar" baz'))));

  eq (read ('"""\\"""'))
     (Right (Pair ('')
                  (string ('\\'))));

  eq (read ('"""\\n"""'))
     (Right (Pair ('')
                  (string ('\\n'))));

  eq (read ('"""\\t"""'))
     (Right (Pair ('')
                  (string ('\\t'))));

  eq (read ('"""\nfoo\n"""'))
     (Right (Pair ('')
                  (string ('foo\n'))));

  eq (read ('"""\n  foo\n  bar\n  baz\n  """'))
     (Right (Pair ('')
                  (string ('foo\nbar\nbaz\n'))));

  eq (read ('"""\n  <h1>\n    Hello\n  </h1>\n  """'))
     (Right (Pair ('')
                  (string ('<h1>\n  Hello\n</h1>\n'))));

  eq (read ('0')) (Right (Pair ('') (number (0))));
  eq (read ('1')) (Right (Pair ('') (number (1))));
  eq (read ('12')) (Right (Pair ('') (number (12))));
  eq (read ('123')) (Right (Pair ('') (number (123))));
  eq (read ('123.4')) (Right (Pair ('') (number (123.4))));
  eq (read ('123.45')) (Right (Pair ('') (number (123.45))));
  eq (read ('-1')) (Right (Pair ('') (number (-1))));
  eq (read ('-12')) (Right (Pair ('') (number (-12))));
  eq (read ('-123')) (Right (Pair ('') (number (-123))));
  eq (read ('-123.4')) (Right (Pair ('') (number (-123.4))));
  eq (read ('-123.45')) (Right (Pair ('') (number (-123.45))));
  eq (read ('0.001')) (Right (Pair ('') (number (0.001))));
  eq (read ('-0.001')) (Right (Pair ('') (number (-0.001))));

  eq (read ('; comment\nfoo\n; comment'))
     (Right (Pair ('\n; comment')
                  (identifier ('foo'))));

  eq (read ('; comment\n"foo"\n; comment'))
     (Right (Pair ('\n; comment')
                  (string ('foo'))));

  eq (read ('(foo ; comment\nbar ; comment\nbaz) ; comment'))
     (Right (Pair (' ; comment')
                  (parenthesized ([identifier ('foo'),
                                   identifier ('bar'),
                                   identifier ('baz')]))));

  eq (read ('; comment\n foo'))
     (Right (Pair ('')
                  (identifier ('foo'))));

  eq (read ('(foo\n;(\n;)\n bar)'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('foo'),
                                   identifier ('bar')]))));

  eq (read ('";"'))
     (Right (Pair ('')
                  (string (';'))));

  eq (read ('[]'))
     (Right (Pair ('')
                  (bracketed ([]))));

  eq (read ('[foo]'))
     (Right (Pair ('')
                  (bracketed ([identifier ('foo')]))));

  eq (read ('[foo bar]'))
     (Right (Pair ('')
                  (bracketed ([identifier ('foo'),
                               identifier ('bar')]))));

  eq (read ('[foo bar baz]'))
     (Right (Pair ('')
                  (bracketed ([identifier ('foo'),
                               identifier ('bar'),
                               identifier ('baz')]))));

  eq (read ('[foo ]'))
     (Right (Pair ('')
                  (bracketed ([identifier ('foo')]))));

  eq (read ('[ foo]'))
     (Right (Pair ('')
                  (bracketed ([identifier ('foo')]))));

  eq (read ('[ foo ]'))
     (Right (Pair ('')
                  (bracketed ([identifier ('foo')]))));

  eq (read ('[:foo]'))
     (Right (Pair ('')
                  (bracketed ([symbol ('foo')]))));

  eq (read ('[:foo :bar]'))
     (Right (Pair ('')
                  (bracketed ([symbol ('foo'),
                               symbol ('bar')]))));

  eq (read ('[:foo :bar :baz]'))
     (Right (Pair ('')
                  (bracketed ([symbol ('foo'),
                               symbol ('bar'),
                               symbol ('baz')]))));

  eq (read ('[:foo ]'))
     (Right (Pair ('')
                  (bracketed ([symbol ('foo')]))));

  eq (read ('[ :foo]'))
     (Right (Pair ('')
                  (bracketed ([symbol ('foo')]))));

  eq (read ('[ :foo ]'))
     (Right (Pair ('')
                  (bracketed ([symbol ('foo')]))));

  eq (read ('{}'))
     (Right (Pair ('')
                  (braced ([]))));

  eq (read ('{foo}'))
     (Right (Pair ('')
                  (braced ([identifier ('foo')]))));

  eq (read ('{foo bar}'))
     (Right (Pair ('')
                  (braced ([identifier ('foo'),
                            identifier ('bar')]))));

  eq (read ('{foo bar baz}'))
     (Right (Pair ('')
                  (braced ([identifier ('foo'),
                            identifier ('bar'),
                            identifier ('baz')]))));

  eq (read ('{foo }'))
     (Right (Pair ('')
                  (braced ([identifier ('foo')]))));

  eq (read ('{ foo}'))
     (Right (Pair ('')
                  (braced ([identifier ('foo')]))));

  eq (read ('{ foo }'))
     (Right (Pair ('')
                  (braced ([identifier ('foo')]))));

  eq (read ('{"x" 1 "y" 2 "z" 3}'))
     (Right (Pair ('')
                  (braced ([string ('x'),
                            number (1),
                            string ('y'),
                            number (2),
                            string ('z'),
                            number (3)]))));

  eq (read ('(lambda [x] x)'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('lambda'),
                                   bracketed ([identifier ('x')]),
                                   identifier ('x')]))));

  eq (read ('{:date (datetime "1970-01-01" "00:00:00" :Etc/UTC)}\n\n# Title\n\nText.\n'))
     (Right (Pair ('\n\n# Title\n\nText.\n')
                  (braced ([symbol ('date'),
                            parenthesized ([identifier ('datetime'),
                                            string ('1970-01-01'),
                                            string ('00:00:00'),
                                            symbol ('Etc/UTC')])]))));

  eq (read ('(.toUpperCase "foo")'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('.toUpperCase'),
                                   string ('foo')]))));

  eq (read ('(.concat "bar" "foo")'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('.concat'),
                                   string ('bar'),
                                   string ('foo')]))));

  eq (read ('(.slice 1 -1 "foo")'))
     (Right (Pair ('')
                  (parenthesized ([identifier ('.slice'),
                                   number (1),
                                   number (-1),
                                   string ('foo')]))));
}
