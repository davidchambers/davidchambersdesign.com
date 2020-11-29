'use strict';

const S = require ('sanctuary');


const {
  I,
  K,
  Left,
  Pair,
  Right,
  append,
  bimap,
  chain,
  compose: B,
  either,
  encase,
  equals,
  match,
  maybe,
  maybe_,
  pair,
  pipe,
  pipeK,
  prop,
  stripPrefix,
  unless,
} = S.unchecked;

const matchIdentifier = match (/^[^()[\]{}"\s]+/);

const trimLeft = s => (
  unless (equals (s))
         (trimLeft)
         (s
          .replace (/^\s*/, '')
          .replace (/^;.*/, ''))
);

const readGroup = closing => type => elements => (
  B (rest => maybe_ (() => chain (pair (rest => element => readGroup (closing)
                                                                     (type)
                                                                     (append (element) (elements))
                                                                     (rest)))
                                 (read (rest)))
                    (rest => Right (Pair (rest) ({type, elements})))
                    (stripPrefix (closing) (rest)))
    (trimLeft)
);

const read = module.exports = pipe ([
  trimLeft,
  Right,
  pipeK ([
    s => s.startsWith ('(') ? Left (readGroup (')') ('parenthesized') ([]) (s.slice (1))) : Right (s),
    s => s.startsWith (')') ? Left (Left (new SyntaxError ('Unmatched )'))) : Right (s),
    s => s.startsWith ('[') ? Left (readGroup (']') ('array-literal') ([]) (s.slice (1))) : Right (s),
    s => s.startsWith (']') ? Left (Left (new SyntaxError ('Unmatched ]'))) : Right (s),
    s => s.startsWith ('{') ? Left (readGroup ('}') ('map-literal') ([]) (s.slice (1))) : Right (s),
    s => s.startsWith ('}') ? Left (Left (new SyntaxError ('Unmatched }'))) : Right (s),
    s => s.startsWith ('"') ?
         Left (maybe (Left (new SyntaxError ('Unterminated string literal')))
                     (B (raw => bimap (K (new SyntaxError ('Invalid string literal')))
                                      (value => Pair (s.slice (raw.length))
                                                     ({type: 'string-literal', value}))
                                      (encase (JSON.parse) (raw)))
                        (prop ('match')))
                     (match (/"(\\"|[^"])*"/) (s))) :
         Right (s),
    s => maybe (Right (s))
               (s => Left (maybe (Left (new SyntaxError ('Empty symbol')))
                                 (B (name => Right (Pair (s.slice (name.length))
                                                         ({type: 'symbol', value: Symbol.for (name)})))
                                    (prop ('match')))
                                 (matchIdentifier (s))))
               (stripPrefix (':') (s)),
    s => maybe (Right (s))
               (B (raw => Left (Right (Pair (s.slice (raw.length))
                                            ({type: 'number-literal', value: Number (raw)}))))
                  (prop ('match')))
               (match (/^-?[0-9]+([.][0-9]+)?/) (s)),
    s => Left (maybe (Left (new SyntaxError ('Unexpected end of input')))
                     (B (name => Right (Pair (s.slice (name.length))
                                             ({type: 'identifier', name})))
                        (prop ('match')))
                     (matchIdentifier (s))),
  ]),
  either (I) (K (Left (new Error ('Invalid input')))),
]);


if (__filename === process.argv[1]) {
  const assert = require ('assert');

  const eq = actual => expected => {
    assert.deepStrictEqual (S.show (actual), S.show (expected));
    assert.deepStrictEqual (actual, expected);
  };

  eq (read ('')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (read ('(')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (read (')')) (Left (new SyntaxError ('Unmatched )')));
  eq (read (' ')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (read ('\n')) (Left (new SyntaxError ('Unexpected end of input')));

  eq (read ('foo'))
     (Right (Pair ('')
                  ({type: 'identifier', name: 'foo'})));

  eq (read ('foo bar'))
     (Right (Pair (' bar')
                  ({type: 'identifier', name: 'foo'})));

  eq (read ('foo)'))
     (Right (Pair (')')
                  ({type: 'identifier', name: 'foo'})));

  eq (read ('foo(bar))'))
     (Right (Pair ('(bar))')
                  ({type: 'identifier', name: 'foo'})));

  eq (read ('(foo)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('(foo bar)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (read ('(foo bar baz)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (read ('((foo))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'foo'}]}]})));

  eq (read ('(((foo)))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'parenthesized',
                                            elements: [{type: 'identifier', name: 'foo'}]}]}]})));

  eq (read ('((foo) bar)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'foo'}]},
                               {type: 'identifier', name: 'bar'}]})));

  eq (read ('(foo (bar))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'bar'}]}]})));

  eq (read ('((foo) (bar))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'foo'}]},
                               {type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'bar'}]}]})));

  eq (read ('(foo )'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('( foo)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('( foo )'))
     (Right (Pair ('')
            ({type: 'parenthesized',
              elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read (':foo'))
     (Right (Pair ('')
                  ({type: 'symbol', value: Symbol.for ('foo')})));

  eq (read (':<*>'))
     (Right (Pair ('')
                  ({type: 'symbol', value: Symbol.for ('<*>')})));

  eq (read ('"')) (Left (new SyntaxError ('Unterminated string literal')));

  eq (read ('""'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: ''})));

  eq (read ('"foo"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo'})));

  eq (read ('"foo bar"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo bar'})));

  eq (read ('"foo bar baz"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo bar baz'})));

  eq (read ('"foo \\"bar\\" baz"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo "bar" baz'})));

  eq (read ('"\\\\"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: '\\'})));

  eq (read ('"\\n"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: '\n'})));

  eq (read ('"\\t"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: '\t'})));

  eq (read ('"\\"')) (Left (new SyntaxError ('Invalid string literal')));

  eq (read ('0')) (Right (Pair ('') ({type: 'number-literal', value: 0})));
  eq (read ('1')) (Right (Pair ('') ({type: 'number-literal', value: 1})));
  eq (read ('12')) (Right (Pair ('') ({type: 'number-literal', value: 12})));
  eq (read ('123')) (Right (Pair ('') ({type: 'number-literal', value: 123})));
  eq (read ('123.4')) (Right (Pair ('') ({type: 'number-literal', value: 123.4})));
  eq (read ('123.45')) (Right (Pair ('') ({type: 'number-literal', value: 123.45})));
  eq (read ('-1')) (Right (Pair ('') ({type: 'number-literal', value: -1})));
  eq (read ('-12')) (Right (Pair ('') ({type: 'number-literal', value: -12})));
  eq (read ('-123')) (Right (Pair ('') ({type: 'number-literal', value: -123})));
  eq (read ('-123.4')) (Right (Pair ('') ({type: 'number-literal', value: -123.4})));
  eq (read ('-123.45')) (Right (Pair ('') ({type: 'number-literal', value: -123.45})));
  eq (read ('0.001')) (Right (Pair ('') ({type: 'number-literal', value: 0.001})));
  eq (read ('-0.001')) (Right (Pair ('') ({type: 'number-literal', value: -0.001})));

  eq (read ('; comment\nfoo\n; comment'))
     (Right (Pair ('\n; comment')
                  ({type: 'identifier', name: 'foo'})));

  eq (read ('; comment\n"foo"\n; comment'))
     (Right (Pair ('\n; comment')
                  ({type: 'string-literal', value: 'foo'})));

  eq (read ('(foo ; comment\nbar ; comment\nbaz) ; comment'))
     (Right (Pair (' ; comment')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (read ('; comment\n foo'))
     (Right (Pair ('')
                  ({type: 'identifier', name: 'foo'})));

  eq (read ('(foo\n;(\n;)\n bar)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (read ('";"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: ';'})));

  eq (read ('[]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: []})));

  eq (read ('[foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('[foo bar]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (read ('[foo bar baz]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (read ('[foo ]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('[ foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('[ foo ]'))
     (Right (Pair ('')
            ({type: 'array-literal',
              elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('[:foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (read ('[:foo :bar]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')},
                               {type: 'symbol', value: Symbol.for ('bar')}]})));

  eq (read ('[:foo :bar :baz]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')},
                               {type: 'symbol', value: Symbol.for ('bar')},
                               {type: 'symbol', value: Symbol.for ('baz')}]})));

  eq (read ('[:foo ]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (read ('[ :foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (read ('[ :foo ]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (read ('{}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: []})));

  eq (read ('{foo}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('{foo bar}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (read ('{foo bar baz}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (read ('{foo }'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('{ foo}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('{ foo }'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (read ('{"x" 1 "y" 2 "z" 3}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'string-literal', value: 'x'},
                               {type: 'number-literal', value: 1},
                               {type: 'string-literal', value: 'y'},
                               {type: 'number-literal', value: 2},
                               {type: 'string-literal', value: 'z'},
                               {type: 'number-literal', value: 3}]})));

  eq (read ('(lambda [x] x)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'lambda'},
                               {type: 'array-literal',
                                elements: [{type: 'identifier', name: 'x'}]},
                               {type: 'identifier', name: 'x'}]})));

  eq (read ('{:date (datetime "1970-01-01" "00:00:00" :Etc/UTC)}\n\n# Title\n\nText.\n'))
     (Right (Pair ('\n\n# Title\n\nText.\n')
                  ({type: 'map-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('date')},
                               {type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'datetime'},
                                           {type: 'string-literal', value: '1970-01-01'},
                                           {type: 'string-literal', value: '00:00:00'},
                                           {type: 'symbol', value: Symbol.for ('Etc/UTC')}]}]})));
}
