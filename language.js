import assert from 'assert';
import fs from 'fs';
import {createRequire} from 'module';
import path from 'path';
import url from 'url';

import S from 'sanctuary';
import $ from 'sanctuary-def';

import baseEnv from './environments/base.env.js';


const {
  Either,
  I,
  Just,
  K,
  Left,
  Nothing,
  Pair,
  Right,
  append,
  array,
  bimap,
  chain,
  compose: B,
  either,
  encase,
  flip: C,
  is,
  map,
  mapLeft,
  match,
  maybe,
  maybe_,
  pair,
  pipe,
  pipeK,
  prepend,
  prop,
  reduce,
  snd,
  stripPrefix,
  tagBy,
  traverse,
  unfoldr,
  value,
  zip,
} = S;

const matchIdentifier = match (/^[^()[\]{}"\s]+/);

const parseGroup = closing => type => elements => (
  B (rest => maybe_ (() => chain (pair (C (B (parseGroup (closing) (type))
                                             (C (append) (elements)))))
                                 (parse (rest)))
                    (rest => Right (Pair (rest) ({type, elements})))
                    (stripPrefix (closing) (rest)))
    (rest => rest.replace (/^\s*/, ''))
);

const parse = pipe ([
  Right,
  pipeK ([
    s => Right (s.replace (/^\s*/, '')),
    s => Right (s.replace (/^;.*\n?/, '')),
    s => s.startsWith ('(') ? Left (parseGroup (')') ('parenthesized') ([]) (s.slice (1))) : Right (s),
    s => s.startsWith (')') ? Left (Left (new SyntaxError ('Unmatched )'))) : Right (s),
    s => s.startsWith ('[') ? Left (parseGroup (']') ('array-literal') ([]) (s.slice (1))) : Right (s),
    s => s.startsWith (']') ? Left (Left (new SyntaxError ('Unmatched ]'))) : Right (s),
    s => s.startsWith ('{') ? Left (parseGroup ('}') ('map-literal') ([]) (s.slice (1))) : Right (s),
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

const evaluate = dirname => env => term => {
  switch (term.type) {
    case 'symbol':
    case 'string-literal':
    case 'number-literal': {
      return Right (term.value);
    }
    case 'identifier': {
      return maybe (Left (new ReferenceError (`${term.name} is not defined`)))
                   (Right)
                   (value (Symbol.for (term.name)) (env));
    }
    case 'array-literal': {
      return traverse (Either)
                      (evaluate (dirname) (env))
                      (term.elements);
    }
    case 'map-literal': {
      return map (values => reduce (m => ([k, v]) => ({...m, [k]: v}))
                                   ({})
                                   (unfoldr (array (Nothing)
                                                   (k => B (pair (v => B (Just)
                                                                         (Pair (Pair (k) (v)))))
                                                           (array (Pair (undefined) ([]))
                                                                  (Pair))))
                                            (values)))
                 (traverse (Either)
                           (evaluate (dirname) (env))
                           (term.elements));
    }
    case 'parenthesized': {
      return array
        (Left (new Error ('Empty parentheses')))
        (head => tail => {
           if (head.type === 'identifier' && head.name === 'if') {
             if (tail.length !== 3) {
               return Left (new Error ('Invalid if expression'));
             }
             const [predicate, consequent, alternative] = tail;
             return chain (value => evaluate (dirname) (env) (value ? consequent : alternative))
                          (chain (B (mapLeft (K (new TypeError ('Predicate evaluated to non-Boolean value'))))
                                    (tagBy (is ($.Boolean))))
                                 (evaluate (dirname) (env) (predicate)));
           }
           if (head.type === 'identifier' && head.name === 'let') {
             if (tail.length !== 2) {
               return Left (new Error ('Invalid let expression'));
             }
             const [bindings, body] = tail;
             if (!(bindings.type === 'array-literal' &&
                   bindings.elements.every ((e, idx) => idx % 2 === 1 || e.type === 'identifier'))) {
               return Left (new Error ('Invalid let expression'));
             }
             return chain (env => evaluate (dirname) (env) (body))
                          (reduce (C (([name, value]) => chain (env => map (value => ({...env, [Symbol.for (name)]: value}))
                                                                           (evaluate (dirname) (env) (value)))))
                                  (Right (env))
                                  (unfoldr (array (Nothing)
                                                  (k => B (pair (v => B (Just)
                                                                        (Pair (Pair (k.name) (v)))))
                                                          (array (Pair (undefined) ([]))
                                                                 (Pair))))
                                           (bindings.elements)));
           }
           if (head.type === 'identifier' && head.name === "let'") {
             if (tail.length !== 2) {
               return Left (new Error ("Invalid let' expression"));
             }
             const [bindings, body] = tail;
             return chain (bindings => evaluate (dirname) ({...env, ...bindings}) (body))
                          (evaluate (dirname) (env) (bindings));
           }
           if (head.type === 'identifier' && head.name === 'lambda') {
             if (tail.length !== 2) {
               return Left (new Error ('Invalid lambda expression'));
             }
             const [params, body] = tail;
             if (!(params.type === 'array-literal' &&
                   params.elements.every (e => e.type === 'identifier'))) {
               return Left (new Error ('Invalid lambda expression'));
             }
             return Right (
               reduce (f => _ => args => arg => f ([...args, arg]))
                      (args => either (err => { throw err; })
                                      (I)
                                      (evaluate (dirname)
                                                (reduce (env => ([{name}, value]) => ({...env, [Symbol.for (name)]: value}))
                                                        (env)
                                                        (zip (params.elements) (args)))
                                                (body)))
                      (params.elements)
                      ([])
             );
           }
           if (head.type === 'identifier' && head.name === 'function') {
             if (tail.length !== 3) {
               return Left (new Error ('Invalid function expression'));
             }
             const [ident, params, body] = tail;
             if (!(ident.type === 'identifier' &&
                   params.type === 'array-literal' &&
                   params.elements.every (e => e.type === 'identifier'))) {
               return Left (new Error ('Invalid function expression'));
             }
             const names = params.elements.map (e => e.name);
             const f = reduce
               (f => K (args => arg => f (append (arg) (args))))
               (args => either (err => { throw err; })
                               (I)
                               (evaluate (dirname)
                                         (reduce (env => ([{name}, value]) => ({...env, [Symbol.for (name)]: value}))
                                                         ({...env, [Symbol.for (ident.name)]: f})
                                                         (zip (params.elements) (args)))
                                         (body)))
               (params.elements)
               ([]);
             return Right (f);
           }
           if (head.type === 'identifier' && head.name === 'import') {
             if (tail.length !== 1) {
               return Left (new Error ('Invalid import expression'));
             }
             const [importPath] = tail;
             return chain (importPath => evaluateFile (env) (path.join (dirname, importPath)))
                          (evaluate (dirname) (env) (importPath));
           }
           if (head.type === 'identifier' && head.name === 'import*') {
             if (tail.length !== 2) {
               return Left (new Error ('Invalid import* expression'));
             }
             const [paths, body] = tail;
             return chain (C (evaluate (dirname)) (body))
                          (chain (reduce (C (p => chain (env_ => map (bindings => ({...env_, ...bindings}))
                                                                     (evaluateFile (env_) (path.join (dirname, p))))))
                                         (Right (env)))
                                 (chain (paths => traverse (Either)
                                                           (B (mapLeft (K (new Error ('Invalid import* expression'))))
                                                              (tagBy (is ($.String))))
                                                           (paths))
                                        (evaluate (dirname) (env) (paths))));
           }
           return map (([f, ...args]) => args.length === 0 ?
                                         f () :
                                         reduce (f => x => (is ($.Symbol) (f) ? o => o[f] : f) (x))
                                                (f)
                                                (args))
                      (traverse (Either)
                                (evaluate (dirname) (env))
                                (prepend (head) (tail)));
         })
        (term.elements);
    }
  }
};

export const evaluateFile = env => filename => {
  switch (path.extname (filename)) {
    case '.clj': {
      return chain (B (evaluate (path.dirname (filename)) (env)) (snd))
                   (chain (parse)
                          (encase (filename => fs.readFileSync (filename, {encoding: 'utf8'}))
                                  (filename)));
    }
    case '.js': {
      return encase (createRequire (import.meta.url)) (filename);
    }
    default: {
      return Left (new Error ('Unsupported file extension'));
    }
  }
};


const __filename = url.fileURLToPath (import.meta.url);
if (__filename === process.argv[1]) {
  const eq = actual => expected => {
    assert.deepStrictEqual (S.show (actual), S.show (expected));
    assert.deepStrictEqual (actual, expected);
  };

  eq (parse ('')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (parse ('(')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (parse (')')) (Left (new SyntaxError ('Unmatched )')));
  eq (parse (' ')) (Left (new SyntaxError ('Unexpected end of input')));
  eq (parse ('\n')) (Left (new SyntaxError ('Unexpected end of input')));

  eq (parse ('foo'))
     (Right (Pair ('')
                  ({type: 'identifier', name: 'foo'})));

  eq (parse ('foo bar'))
     (Right (Pair (' bar')
                  ({type: 'identifier', name: 'foo'})));

  eq (parse ('foo)'))
     (Right (Pair (')')
                  ({type: 'identifier', name: 'foo'})));

  eq (parse ('foo(bar))'))
     (Right (Pair ('(bar))')
                  ({type: 'identifier', name: 'foo'})));

  eq (parse ('(foo)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('(foo bar)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (parse ('(foo bar baz)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (parse ('((foo))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'foo'}]}]})));

  eq (parse ('(((foo)))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'parenthesized',
                                            elements: [{type: 'identifier', name: 'foo'}]}]}]})));

  eq (parse ('((foo) bar)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'foo'}]},
                               {type: 'identifier', name: 'bar'}]})));

  eq (parse ('(foo (bar))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'bar'}]}]})));

  eq (parse ('((foo) (bar))'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'foo'}]},
                               {type: 'parenthesized',
                                elements: [{type: 'identifier', name: 'bar'}]}]})));

  eq (parse ('(foo )'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('( foo)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('( foo )'))
     (Right (Pair ('')
            ({type: 'parenthesized',
              elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse (':foo'))
     (Right (Pair ('')
                  ({type: 'symbol', value: Symbol.for ('foo')})));

  eq (parse (':<*>'))
     (Right (Pair ('')
                  ({type: 'symbol', value: Symbol.for ('<*>')})));

  eq (parse ('"')) (Left (new SyntaxError ('Unterminated string literal')));

  eq (parse ('""'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: ''})));

  eq (parse ('"foo"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo'})));

  eq (parse ('"foo bar"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo bar'})));

  eq (parse ('"foo bar baz"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo bar baz'})));

  eq (parse ('"foo \\"bar\\" baz"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: 'foo "bar" baz'})));

  eq (parse ('"\\\\"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: '\\'})));

  eq (parse ('"\\n"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: '\n'})));

  eq (parse ('"\\t"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: '\t'})));

  eq (parse ('"\\"')) (Left (new SyntaxError ('Invalid string literal')));

  eq (parse ('0')) (Right (Pair ('') ({type: 'number-literal', value: 0})));
  eq (parse ('1')) (Right (Pair ('') ({type: 'number-literal', value: 1})));
  eq (parse ('12')) (Right (Pair ('') ({type: 'number-literal', value: 12})));
  eq (parse ('123')) (Right (Pair ('') ({type: 'number-literal', value: 123})));
  eq (parse ('123.4')) (Right (Pair ('') ({type: 'number-literal', value: 123.4})));
  eq (parse ('123.45')) (Right (Pair ('') ({type: 'number-literal', value: 123.45})));
  eq (parse ('-1')) (Right (Pair ('') ({type: 'number-literal', value: -1})));
  eq (parse ('-12')) (Right (Pair ('') ({type: 'number-literal', value: -12})));
  eq (parse ('-123')) (Right (Pair ('') ({type: 'number-literal', value: -123})));
  eq (parse ('-123.4')) (Right (Pair ('') ({type: 'number-literal', value: -123.4})));
  eq (parse ('-123.45')) (Right (Pair ('') ({type: 'number-literal', value: -123.45})));
  eq (parse ('0.001')) (Right (Pair ('') ({type: 'number-literal', value: 0.001})));
  eq (parse ('-0.001')) (Right (Pair ('') ({type: 'number-literal', value: -0.001})));

  eq (parse ('; comment\nfoo\n; comment'))
     (Right (Pair ('\n; comment')
                  ({type: 'identifier', name: 'foo'})));

  eq (parse ('; comment\n"foo"\n; comment'))
     (Right (Pair ('\n; comment')
                  ({type: 'string-literal', value: 'foo'})));

  eq (parse ('(foo ; comment\nbar ; comment\nbaz) ; comment'))
     (Right (Pair (' ; comment')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (parse ('";"'))
     (Right (Pair ('')
                  ({type: 'string-literal', value: ';'})));

  eq (parse ('[]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: []})));

  eq (parse ('[foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('[foo bar]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (parse ('[foo bar baz]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (parse ('[foo ]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('[ foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('[ foo ]'))
     (Right (Pair ('')
            ({type: 'array-literal',
              elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('[:foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (parse ('[:foo :bar]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')},
                               {type: 'symbol', value: Symbol.for ('bar')}]})));

  eq (parse ('[:foo :bar :baz]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')},
                               {type: 'symbol', value: Symbol.for ('bar')},
                               {type: 'symbol', value: Symbol.for ('baz')}]})));

  eq (parse ('[:foo ]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (parse ('[ :foo]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (parse ('[ :foo ]'))
     (Right (Pair ('')
                  ({type: 'array-literal',
                    elements: [{type: 'symbol', value: Symbol.for ('foo')}]})));

  eq (parse ('{}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: []})));

  eq (parse ('{foo}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('{foo bar}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'}]})));

  eq (parse ('{foo bar baz}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'},
                               {type: 'identifier', name: 'bar'},
                               {type: 'identifier', name: 'baz'}]})));

  eq (parse ('{foo }'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('{ foo}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('{ foo }'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'identifier', name: 'foo'}]})));

  eq (parse ('{"x" 1 "y" 2 "z" 3}'))
     (Right (Pair ('')
                  ({type: 'map-literal',
                    elements: [{type: 'string-literal', value: 'x'},
                               {type: 'number-literal', value: 1},
                               {type: 'string-literal', value: 'y'},
                               {type: 'number-literal', value: 2},
                               {type: 'string-literal', value: 'z'},
                               {type: 'number-literal', value: 3}]})));

  eq (parse ('(lambda [x] x)'))
     (Right (Pair ('')
                  ({type: 'parenthesized',
                    elements: [{type: 'identifier', name: 'lambda'},
                               {type: 'array-literal',
                                elements: [{type: 'identifier', name: 'x'}]},
                               {type: 'identifier', name: 'x'}]})));

  const eval_ = env => input => (
    chain (B (evaluate (path.dirname (__filename)) (env)) (snd))
          (parse (input))
  );

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

  eq (eval_ ({[Symbol.for ('x')]: 1, [Symbol.for ('y')]: 2}) ('y'))
     (Right (2));

  eq (eval_ ({x: 1, y: 2}) ('z'))
     (Left (new ReferenceError ('z is not defined')));

  eq (eval_ ({}) ('{}')) (Right ({}));
  eq (eval_ ({}) ('{"x"}')) (Right ({x: undefined}));
  eq (eval_ ({}) ('{"x" 1}')) (Right ({x: 1}));
  eq (eval_ ({}) ('{"x" 1 "y"}')) (Right ({x: 1, y: undefined}));
  eq (eval_ ({}) ('{"x" 1 "y" 2}')) (Right ({x: 1, y: 2}));
  eq (eval_ ({}) ('{"x" 1 "y" 2 "z"}')) (Right ({x: 1, y: 2, z: undefined}));
  eq (eval_ ({}) ('{"x" 1 "y" 2 "z" 3}')) (Right ({x: 1, y: 2, z: 3}));

  eq (eval_ ({}) ('()'))
     (Left (new Error ('Empty parentheses')));

  eq (eval_ ({[Symbol.for ('Math.sqrt')]: Math.sqrt}) ('(Math.sqrt 64)'))
     (Right (8));

  eq (eval_ ({[Symbol.for ('Math.sqrt')]: Math.sqrt, [Symbol.for ('*')]: x => y => y * x}) ('(Math.sqrt (* 8 8))'))
     (Right (8));

  eq (eval_ ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :x {:x 1 :y 2})'))
     (Right (1));

  eq (eval_ ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :y {:x 1 :y 2})'))
     (Right (2));

  eq (eval_ ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :z {:x 1 :y 2})'))
     (Right (undefined));

  eq (eval_ ({}) ('(:x {:x 1 :y 2})'))
     (Right (1));

  eq (eval_ ({}) ('(:y {:x 1 :y 2})'))
     (Right (2));

  eq (eval_ ({}) ('(:z {:x 1 :y 2})'))
     (Right (undefined));

  eq (eval_ ({}) ('((lambda [x] x) 64)'))
     (Right (64));

  eq (eval_ ({[Symbol.for ('*')]: x => y => y * x}) ('((lambda [x] (* x x)) 4)'))
     (Right (16));

  eq (eval_ ({}) ('((lambda [k] (k {:x 1 :y 2})) :x)'))
     (Right (1));

  eq (eval_ ({}) ('((lambda [k] (k {:x 1 :y 2})) :y)'))
     (Right (2));

  eq (eval_ ({}) ('((lambda [k] (k {:x 1 :y 2})) :z)'))
     (Right (undefined));

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

  eq (eval_ ({}) ("(let' {:x 8} x)"))
     (Right (8));

  eq (eval_ ({}) ("(let' {:x 8 :y x} y)"))
     (Left (new ReferenceError ('x is not defined')));

  eq (eval_ (baseEnv) (`(let' (invoke "fromEntries" [[[:x 1] [:y 2]]] Object) x)`))
     (Right (1));

  eq (eval_ (baseEnv) (`(let' (invoke "fromEntries" [[[:x 1] [:y 2]]] Object) y)`))
     (Right (2));

  eq (eval_ (baseEnv) (`(let' (invoke "fromEntries" [[[:x 1] [:y 2]]] Object) z)`))
     (Left (new ReferenceError ('z is not defined')));

  eq (eval_ ({}) ('true'))
     (Left (new ReferenceError ('true is not defined')));

  eq (eval_ ({}) ('false'))
     (Left (new ReferenceError ('false is not defined')));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('true'))
     (Right (true));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('false'))
     (Right (false));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if true 8 x)'))
     (Right (8));

  eq (eval_ ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if false x 8)'))
     (Right (8));

  eq (eval_ ({}) ('(if "xxx" x x)'))
     (Left (new TypeError ('Predicate evaluated to non-Boolean value')));

  eq (eval_ (baseEnv) ('(invoke "toUpperCase" [] "foo")'))
     (Right ('FOO'));

  eq (eval_ (baseEnv) ('(invoke "toFixed" [2] 123.456)'))
     (Right ('123.46'));

  eq (eval_ (baseEnv) ('(invoke "abs" [-1] Math)'))
     (Right (1));

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
