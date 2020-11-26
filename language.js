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
             if (tail.length !== 2) {
               return Left (new Error ('Invalid import expression'));
             }
             const [bindings, body] = tail;
             return chain (C (evaluate (dirname)) (body))
                          (chain (bindings => reduce (C (sym => chain (env_ => map (value => ({...env_, [sym]: value}))
                                                                                   (evaluateFile (env) (path.join (dirname, bindings[sym]))))))
                                                     (Right (env))
                                                     (Object.getOwnPropertySymbols (bindings)))
                                 (evaluate (dirname) (env) (bindings)));
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


if (url.fileURLToPath (import.meta.url) === process.argv[1]) {
  { // parse
    const expect = success => input => value => {
      assert.deepStrictEqual (
        either (value => ({success: false, value}))
               (value => ({success: true, value: value.snd}))
               (parse (input)),
        {success, value}
      );
    };
    const succeeds = expect (true);
    const fails = expect (false);

    fails ('') (new SyntaxError ('Unexpected end of input'));
    fails ('(') (new SyntaxError ('Unexpected end of input'));
    fails (')') (new SyntaxError ('Unmatched )'));
    fails (' ') (new SyntaxError ('Unexpected end of input'));
    fails ('\n') (new SyntaxError ('Unexpected end of input'));

    succeeds ('foo')
             ({type: 'identifier', name: 'foo'});

    succeeds ('foo bar')
             ({type: 'identifier', name: 'foo'});

    succeeds ('foo)')
             ({type: 'identifier', name: 'foo'});

    succeeds ('foo(bar))')
             ({type: 'identifier', name: 'foo'});

    succeeds ('(foo)')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('(foo bar)')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'}]});

    succeeds ('(foo bar baz)')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'},
                          {type: 'identifier', name: 'baz'}]});

    succeeds ('((foo))')
             ({type: 'parenthesized',
               elements: [{type: 'parenthesized',
                           elements: [{type: 'identifier', name: 'foo'}]}]});

    succeeds ('(((foo)))')
             ({type: 'parenthesized',
               elements: [{type: 'parenthesized',
                           elements: [{type: 'parenthesized',
                                       elements: [{type: 'identifier', name: 'foo'}]}]}]});

    succeeds ('((foo) bar)')
             ({type: 'parenthesized',
               elements: [{type: 'parenthesized',
                           elements: [{type: 'identifier', name: 'foo'}]},
                          {type: 'identifier', name: 'bar'}]});

    succeeds ('(foo (bar))')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'parenthesized',
                           elements: [{type: 'identifier', name: 'bar'}]}]});

    succeeds ('((foo) (bar))')
             ({type: 'parenthesized',
               elements: [{type: 'parenthesized',
                           elements: [{type: 'identifier', name: 'foo'}]},
                          {type: 'parenthesized',
                           elements: [{type: 'identifier', name: 'bar'}]}]});

    succeeds ('(foo )')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('( foo)')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('( foo )')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds (':foo') ({type: 'symbol', value: Symbol.for ('foo')});
    succeeds (':<*>') ({type: 'symbol', value: Symbol.for ('<*>')});

    fails ('"') (new SyntaxError ('Unterminated string literal'));

    succeeds ('""')
             ({type: 'string-literal', value: ''});

    succeeds ('"foo"')
             ({type: 'string-literal', value: 'foo'});

    succeeds ('"foo bar"')
             ({type: 'string-literal', value: 'foo bar'});

    succeeds ('"foo bar baz"')
             ({type: 'string-literal', value: 'foo bar baz'});

    succeeds ('"foo \\"bar\\" baz"')
             ({type: 'string-literal', value: 'foo "bar" baz'});

    succeeds ('"\\\\"')
             ({type: 'string-literal', value: '\\'});

    succeeds ('"\\n"')
             ({type: 'string-literal', value: '\n'});

    succeeds ('"\\t"')
             ({type: 'string-literal', value: '\t'});

    fails ('"\\"') (new SyntaxError ('Invalid string literal'));

    succeeds ('0') ({type: 'number-literal', value: 0});
    succeeds ('1') ({type: 'number-literal', value: 1});
    succeeds ('12') ({type: 'number-literal', value: 12});
    succeeds ('123') ({type: 'number-literal', value: 123});
    succeeds ('123.4') ({type: 'number-literal', value: 123.4});
    succeeds ('123.45') ({type: 'number-literal', value: 123.45});
    succeeds ('-1') ({type: 'number-literal', value: -1});
    succeeds ('-12') ({type: 'number-literal', value: -12});
    succeeds ('-123') ({type: 'number-literal', value: -123});
    succeeds ('-123.4') ({type: 'number-literal', value: -123.4});
    succeeds ('-123.45') ({type: 'number-literal', value: -123.45});
    succeeds ('0.001') ({type: 'number-literal', value: 0.001});
    succeeds ('-0.001') ({type: 'number-literal', value: -0.001});

    succeeds ('; comment\nfoo\n; comment')
             ({type: 'identifier', name: 'foo'});

    succeeds ('; comment\n"foo"\n; comment')
             ({type: 'string-literal', value: 'foo'});

    succeeds ('(foo ; comment\nbar ; comment\nbaz) ; comment')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'},
                          {type: 'identifier', name: 'baz'}]});

    succeeds ('";"')
             ({type: 'string-literal', value: ';'});

    succeeds ('[]')
             ({type: 'array-literal',
               elements: []});

    succeeds ('[foo]')
             ({type: 'array-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('[foo bar]')
             ({type: 'array-literal',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'}]});

    succeeds ('[foo bar baz]')
             ({type: 'array-literal',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'},
                          {type: 'identifier', name: 'baz'}]});

    succeeds ('[foo ]')
             ({type: 'array-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('[ foo]')
             ({type: 'array-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('[ foo ]')
             ({type: 'array-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('[:foo]')
             ({type: 'array-literal',
               elements: [{type: 'symbol', value: Symbol.for ('foo')}]});

    succeeds ('[:foo :bar]')
             ({type: 'array-literal',
               elements: [{type: 'symbol', value: Symbol.for ('foo')},
                          {type: 'symbol', value: Symbol.for ('bar')}]});

    succeeds ('[:foo :bar :baz]')
             ({type: 'array-literal',
               elements: [{type: 'symbol', value: Symbol.for ('foo')},
                          {type: 'symbol', value: Symbol.for ('bar')},
                          {type: 'symbol', value: Symbol.for ('baz')}]});

    succeeds ('[:foo ]')
             ({type: 'array-literal',
               elements: [{type: 'symbol', value: Symbol.for ('foo')}]});

    succeeds ('[ :foo]')
             ({type: 'array-literal',
               elements: [{type: 'symbol', value: Symbol.for ('foo')}]});

    succeeds ('[ :foo ]')
             ({type: 'array-literal',
               elements: [{type: 'symbol', value: Symbol.for ('foo')}]});

    succeeds ('{}')
             ({type: 'map-literal',
               elements: []});

    succeeds ('{foo}')
             ({type: 'map-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('{foo bar}')
             ({type: 'map-literal',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'}]});

    succeeds ('{foo bar baz}')
             ({type: 'map-literal',
               elements: [{type: 'identifier', name: 'foo'},
                          {type: 'identifier', name: 'bar'},
                          {type: 'identifier', name: 'baz'}]});

    succeeds ('{foo }')
             ({type: 'map-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('{ foo}')
             ({type: 'map-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('{ foo }')
             ({type: 'map-literal',
               elements: [{type: 'identifier', name: 'foo'}]});

    succeeds ('{"x" 1 "y" 2 "z" 3}')
             ({type: 'map-literal',
               elements: [{type: 'string-literal', value: 'x'},
                          {type: 'number-literal', value: 1},
                          {type: 'string-literal', value: 'y'},
                          {type: 'number-literal', value: 2},
                          {type: 'string-literal', value: 'z'},
                          {type: 'number-literal', value: 3}]});

    succeeds ('(lambda [x] x)')
             ({type: 'parenthesized',
               elements: [{type: 'identifier', name: 'lambda'},
                          {type: 'array-literal',
                           elements: [{type: 'identifier', name: 'x'}]},
                          {type: 'identifier', name: 'x'}]});
  }

  { // evaluate
    const expect = success => env => input => expected => {
      either (actual => { assert.deepStrictEqual (false, success);
                          assert.deepStrictEqual (actual, expected); })
             (actual => { assert.deepStrictEqual (true, success);
                          assert.deepStrictEqual (actual, expected); })
             (chain (B (evaluate (path.dirname (url.fileURLToPath (import.meta.url)))
                                 (env))
                       (snd))
                    (parse (input)));
    };
    const succeeds = expect (true);
    const fails = expect (false);

    succeeds ({}) (':foo') (Symbol.for ('foo'));
    succeeds ({}) (':<*>') (Symbol.for ('<*>'));

    succeeds ({}) ('"foo"') ('foo');
    succeeds ({}) ('123.45') (123.45);
    succeeds ({[Symbol.for ('x')]: 1, [Symbol.for ('y')]: 2}) ('x') (1);
    succeeds ({[Symbol.for ('x')]: 1, [Symbol.for ('y')]: 2}) ('y') (2);
    fails ({x: 1, y: 2}) ('z') (new ReferenceError ('z is not defined'));

    succeeds ({}) ('{}') ({});
    succeeds ({}) ('{"x"}') ({x: undefined});
    succeeds ({}) ('{"x" 1}') ({x: 1});
    succeeds ({}) ('{"x" 1 "y"}') ({x: 1, y: undefined});
    succeeds ({}) ('{"x" 1 "y" 2}') ({x: 1, y: 2});
    succeeds ({}) ('{"x" 1 "y" 2 "z"}') ({x: 1, y: 2, z: undefined});
    succeeds ({}) ('{"x" 1 "y" 2 "z" 3}') ({x: 1, y: 2, z: 3});

    fails ({}) ('()') (new Error ('Empty parentheses'));
    succeeds ({[Symbol.for ('Math.sqrt')]: Math.sqrt}) ('(Math.sqrt 64)') (8);
    succeeds ({[Symbol.for ('Math.sqrt')]: Math.sqrt, [Symbol.for ('*')]: x => y => y * x}) ('(Math.sqrt (* 8 8))') (8);
    succeeds ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :x {:x 1 :y 2})') (1);
    succeeds ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :y {:x 1 :y 2})') (2);
    succeeds ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :z {:x 1 :y 2})') (undefined);

    succeeds ({}) ('(:x {:x 1 :y 2})') (1);
    succeeds ({}) ('(:y {:x 1 :y 2})') (2);
    succeeds ({}) ('(:z {:x 1 :y 2})') (undefined);

//  succeeds ({[Symbol.for ('map')]: f => xs => xs.map (x => f (x))}) ('(map :x [{:x 1 :y 2} {:x 3 :y 4}])') ([1, 3]);
//  succeeds ({[Symbol.for ('map')]: f => xs => xs.map (x => f (x))}) ('(map :y [{:x 1 :y 2} {:x 3 :y 4}])') ([2, 4]);
//  succeeds ({[Symbol.for ('map')]: f => xs => xs.map (x => f (x))}) ('(map :z [{:x 1 :y 2} {:x 3 :y 4}])') ([undefined, undefined]);

    succeeds ({}) ('((lambda [x] x) 64)') (64);
    succeeds ({[Symbol.for ('*')]: x => y => y * x}) ('((lambda [x] (* x x)) 4)') (16);

    succeeds ({}) ('((lambda [k] (k {:x 1 :y 2})) :x)') (1);
    succeeds ({}) ('((lambda [k] (k {:x 1 :y 2})) :y)') (2);
    succeeds ({}) ('((lambda [k] (k {:x 1 :y 2})) :z)') (undefined);

    succeeds ({}) ('((lambda [x y z] x) 1 2 3)') (1);
    succeeds ({}) ('((lambda [x y z] y) 1 2 3)') (2);
    succeeds ({}) ('((lambda [x y z] z) 1 2 3)') (3);

    succeeds ({}) ('(let [x 8] x)') (8);
    succeeds ({}) ('(let [x 8 y x] y)') (8);

    succeeds ({}) ("(let' {:x 8} x)") (8);
    fails ({}) ("(let' {:x 8 :y x} y)") (new ReferenceError ('x is not defined'));
    succeeds (baseEnv) (`(let' (invoke "fromEntries" [[[:x 1] [:y 2]]] Object) x)`) (1);
    succeeds (baseEnv) (`(let' (invoke "fromEntries" [[[:x 1] [:y 2]]] Object) y)`) (2);
    fails (baseEnv) (`(let' (invoke "fromEntries" [[[:x 1] [:y 2]]] Object) z)`) (new ReferenceError ('z is not defined'));

    fails ({}) ('true') (new ReferenceError ('true is not defined'));
    fails ({}) ('false') (new ReferenceError ('false is not defined'));
    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('true') (true);
    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('false') (false);

    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if true 8 x)') (8);
    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if false x 8)') (8);
    fails ({}) ('(if "xxx" x x)') (new TypeError ('Predicate evaluated to non-Boolean value'));

    succeeds (baseEnv) ('(invoke "toUpperCase" [] "foo")') ('FOO');
    succeeds (baseEnv) ('(invoke "toFixed" [2] 123.456)') ('123.46');
    succeeds (baseEnv) ('(invoke "abs" [-1] Math)') (1);

    succeeds ({[Symbol.for ('=')]: y => x => x === y,
               [Symbol.for ('*')]: y => x => x * y,
               [Symbol.for ('-')]: y => x => x - y})
             (`(let [fact
                     (function factorial [x]
                        (if (= 0 x)
                            1
                            (* x (factorial (- 1 x)))))]
                    (fact 5))`)
             (120);
  }
}
