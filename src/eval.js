'use strict';

const path = require ('path');

const sanctuary = require ('sanctuary');
const $ = require ('sanctuary-def');

const import_ = require ('./import.js');
const read = require ('./read.js');


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
  chain,
  compose: B,
  either,
  elem,
  flip: C,
  fromMaybe_,
  is,
  join,
  lift2,
  map,
  mapLeft,
  maybe,
  pair,
  reduce,
  reverse,
  show,
  snd,
  stripPrefix,
  tagBy,
  traverse,
  unfoldr,
  value,
  zip,
} = sanctuary.unchecked;

const evaluate = module.exports = dirname => _env => term => {
  const env = {..._env, [Symbol.for ('__dirname')]: dirname};
  switch (term.__type) {
    case 'symbol': {
      return Right (Symbol.for (term.__name));
    }
    case 'string':
    case 'number': {
      return Right (term.__value);
    }
    case 'identifier': {
      return maybe (Left (new ReferenceError (`${term.__name} is not defined`)))
                   (Right)
                   (value (Symbol.for (term.__name)) (env));
    }
    case '[]': {
      return traverse (Either)
                      (evaluate (dirname) (env))
                      (term.__elements);
    }
    case '{}': {
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
                           (term.__elements));
    }
    case '()': {
      return array
        (Left (new Error ('Empty parentheses')))
        (head => tail => {
           if (head.__type === 'identifier' && head.__name === 'if') {
             if (tail.length !== 3) {
               return Left (new Error ('Invalid if expression'));
             }
             const [predicate, consequent, alternative] = tail;
             return chain (value => evaluate (dirname) (env) (value ? consequent : alternative))
                          (chain (B (mapLeft (K (new TypeError ('Predicate evaluated to non-Boolean value'))))
                                    (tagBy (is ($.Boolean))))
                                 (evaluate (dirname) (env) (predicate)));
           }
           if (head.__type === 'identifier' && head.__name === 'let') {
             if (tail.length !== 2) {
               return Left (new Error ('Invalid let expression'));
             }
             const [bindings, body] = tail;
             if (!(bindings.__type === '[]' &&
                   bindings.__elements.every ((e, idx) => idx % 2 === 1 || e.__type === 'identifier'))) {
               return Left (new Error ('Invalid let expression'));
             }
             return chain (env => evaluate (dirname) (env) (body))
                          (reduce (C (([name, value]) => chain (env => map (value => ({...env, [Symbol.for (name)]: value}))
                                                                           (evaluate (dirname) (env) (value)))))
                                  (Right (env))
                                  (unfoldr (array (Nothing)
                                                  (k => B (pair (v => B (Just)
                                                                        (Pair (Pair (k.__name) (v)))))
                                                          (array (Pair (undefined) ([]))
                                                                 (Pair))))
                                           (bindings.__elements)));
           }
           if (head.__type === 'identifier' && head.__name === 'lambda') {
             if (tail.length !== 2) {
               return Left (new Error ('Invalid lambda expression'));
             }
             const [params, body] = tail;
             if (!(params.__type === '[]' &&
                   params.__elements.every (e => e.__type === 'identifier'))) {
               return Left (new Error ('Invalid lambda expression'));
             }
             return Right (
               reduce (f => _ => args => arg => f ([...args, arg]))
                      (args => either (err => { throw err; })
                                      (I)
                                      (evaluate (dirname)
                                                (reduce (env => ([{name}, value]) => ({...env, [Symbol.for (name)]: value}))
                                                        (env)
                                                        (zip (params.__elements) (args)))
                                                (body)))
                      (params.__elements)
                      ([]),
             );
           }
           if (head.__type === 'identifier' && head.__name === 'function') {
             if (tail.length !== 3) {
               return Left (new Error ('Invalid function expression'));
             }
             const [ident, params, body] = tail;
             if (!(ident.__type === 'identifier' &&
                   params.__type === '[]' &&
                   params.__elements.every (e => e.__type === 'identifier'))) {
               return Left (new Error ('Invalid function expression'));
             }
             const f = reduce
               (f => K (args => arg => f (append (arg) (args))))
               (args => either (err => { throw err; })
                               (I)
                               (evaluate (dirname)
                                         (reduce (env => ([{name}, value]) => ({...env, [Symbol.for (name)]: value}))
                                                         ({...env, [Symbol.for (ident.__name)]: f})
                                                         (zip (params.__elements) (args)))
                                         (body)))
               (params.__elements)
               ([]);
             return Right (f);
           }
           if (head.__type === 'identifier' && head.__name === 'import') {
             switch (tail.length) {
               case 1: {
                 const [importPath] = tail;
                 return chain (importPath => import_ ({})
                                                     (importPath.includes ('/') ?
                                                      path.resolve (dirname, importPath) :
                                                      importPath))
                              (evaluate (dirname) (env) (importPath));
               }
               case 2: {
                 const [env_, importPath] = tail;
                 return join (lift2 (env => importPath => import_ (env)
                                                                  (importPath.includes ('/') ?
                                                                   path.resolve (dirname, importPath) :
                                                                   importPath))
                                    (evaluate (dirname) (env) (env_))
                                    (evaluate (dirname) (env) (importPath)));
               }
               default: {
                 return Left (new Error ('Invalid import expression'));
               }
             }
           }
           if (head.__type === 'identifier' && head.__name === 'import*') {
             if (tail.length !== 2) {
               return Left (new Error ('Invalid import* expression'));
             }
             const [importPaths, body] = tail;
             return chain (C (evaluate (dirname)) (body))
                          (chain (reduce (C (importPath => chain (env_ => map (bindings => ({...env_, ...bindings}))
                                                                              (import_ ({})
                                                                                       (importPath.includes ('/') ?
                                                                                        path.resolve (dirname, importPath) :
                                                                                        importPath)))))
                                         (Right (env)))
                                 (chain (traverse (Either)
                                                  (B (mapLeft (K (new Error ('Invalid import* expression'))))
                                                     (tagBy (is ($.String)))))
                                        (evaluate (dirname) (env) (importPaths))));
           }
           return fromMaybe_
             (() => lift2 (head => args => args.length === 0 ?
                                           head () :
                                           reduce (I)
                                                  (elem (typeof head) (['number', 'string', 'symbol']) ? o => o[head] : head)
                                                  (args))
                          (evaluate (dirname) (env) (head))
                          (traverse (Either)
                                    (evaluate (dirname) (env))
                                    (tail)))
             (lift2 (name => pair (self => args => lift2 (args => self => self[name] (...args))
                                                         (traverse (Either)
                                                                   (evaluate (dirname) (env))
                                                                   (args))
                                                         (evaluate (dirname) (env) (self))))
                    (head.__type === 'identifier' ? stripPrefix ('.') (head.__name) : Nothing)
                    (array (Nothing)
                           (B (B (B (Just) (map (reverse)))) (Pair))
                           (reverse (tail))));
         })
        (term.__elements);
    }
  }
};


if (process.argv[1] === __filename) {
  const assert = require ('assert');

  const baseEnv = require ('./base.js');

  const eq = actual => expected => {
    assert.deepStrictEqual (show (actual), show (expected));
    assert.deepStrictEqual (actual, expected);
  };

  const eval_ = env => input => (
    chain (B (evaluate (path.dirname (__filename)) (env)) (snd))
          (read (input))
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

  eq (eval_ (baseEnv) ('(.toUpperCase "foo")'))
     (Right ('FOO'));

  eq (eval_ (baseEnv) ('(.toFixed 2 123.456)'))
     (Right ('123.46'));

  eq (eval_ (baseEnv) ('(.abs -1 Math)'))
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

  eq (eval_ (baseEnv) ('(=== :foo (:x {:x :foo}))'))
     (Right (true));
}
