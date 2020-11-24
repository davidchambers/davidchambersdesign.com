import assert from 'assert';
import fs from 'fs';
import path from 'path';
import url from 'url';


const I = x => x;
const K = x => y => x;

const parse = input => reject => resolve => {
  let match;
  if (input === '') {
    return reject (new SyntaxError ('Unexpected end of input'));
  } else if (input.startsWith (';')) {
    return parse (input.replace (/.*\n?/, '')) (reject) (resolve);
  } else if (input.startsWith ('(')) {
    let rest = input.slice (1);
    const elements = [];
    while ((match = /^\s*\)/.exec (rest)) == null) {
      const result = parse (rest)
                           (error => ({success: false, error}))
                           (element => rest => ({success: true, element, rest}));
      if (!result.success) return reject (result.error);
      elements.push (result.element);
      rest = result.rest;
    }
    return resolve ({type: 'parenthesized', elements})
                   (rest.slice (match[0].length));
  } else if (input.startsWith (')')) {
    return reject (new SyntaxError ('Unmatched )'));
  } else if (input.startsWith ('[')) {
    let rest = input.slice (1);
    const elements = [];
    while ((match = /^\s*\]/.exec (rest)) == null) {
      const result = parse (rest)
                           (error => ({success: false, error}))
                           (element => rest => ({success: true, element, rest}));
      if (!result.success) return reject (result.error);
      elements.push (result.element);
      rest = result.rest;
    }
    return resolve ({type: 'array-literal', elements})
                   (rest.slice (match[0].length));
  } else if (input.startsWith (']')) {
    return reject (new SyntaxError ('Unmatched ]'));
  } else if (input.startsWith ('{')) {
    const recur = elements => input => (
      input.startsWith ('}') ?
      resolve ({type: 'map-literal', elements}) (input.slice (1)) :
      parse (input)
            (reject)
            (element => recur ([...elements, element]))
    );
    return recur ([]) (input.slice (1));
  } else if (input.startsWith ('}')) {
    return reject (new SyntaxError ('Unmatched }'));
  } else if (input.startsWith ('"')) {
    const match = /"(\\"|[^"])*"/.exec (input);
    if (match == null) {
      return reject (new SyntaxError ('Unterminated string literal'));
    }
    const [raw] = match;
    let value;
    try {
      value = JSON.parse (raw);
    } catch (err) {
      return reject (new SyntaxError ('Invalid string literal'));
    }
    return resolve ({type: 'string-literal', value})
                   (input.slice (raw.length));
  } else if (input.startsWith (':')) {
    const [name] = /^[^()\s]*/.exec (input.slice (1));
    return name === '' ?
           reject (new SyntaxError ('Empty symbol')) :
           resolve ({type: 'symbol', value: Symbol.for (name)})
                   (input.slice (1 + name.length));
  } else if ((match = /^-?[0-9]+([.][0-9]+)?/.exec (input)) != null) {
    return resolve ({type: 'number-literal', value: Number (match[0])})
                   (input.slice (match[0].length));
  } else if ((match = /^\s+/.exec (input)) != null) {
    return parse (input.slice (match[0].length)) (reject) (resolve);
  } else {
    const [name] = /^[^()[\]{}"\s,]+/.exec (input);
    return resolve ({type: 'identifier', name}) (input.slice (name.length));
  }
};

const evaluate = dirname => env => term => reject => resolve => {
  switch (term.type) {
    case 'symbol':
    case 'string-literal':
    case 'number-literal': {
      return resolve (term.value);
    }
    case 'identifier': {
      const key = Symbol.for (term.name);
      if (Object.prototype.hasOwnProperty.call (env, key)) {
        return resolve (env[key]);
      } else {
        return reject (new ReferenceError (`${term.name} is not defined`));
      }
    }
    case 'array-literal': {
      const values = [];
      for (const element of term.elements) {
        const {success, value} = evaluate (dirname)
                                          (env)
                                          (element)
                                          (value => ({success: false, value}))
                                          (value => ({success: true, value}));
        if (!success) return reject (value);
        values.push (value);
      }
      return resolve (values);
    }
    case 'map-literal': {
      const values = [];
      for (const element of term.elements) {
        const {success, value} = evaluate (dirname)
                                          (env)
                                          (element)
                                          (value => ({success: false, value}))
                                          (value => ({success: true, value}));
        if (!success) return reject (value);
        values.push (value);
      }
      const map = Object.create (null);
      for (let idx = 0; idx < values.length; idx += 2) {
        map[values[idx]] = values[idx + 1];
      }
      return resolve (map);
    }
    case 'parenthesized': {
      if (term.elements.length === 0) {
        return reject (new Error ('Empty parentheses'));
      }
      if (term.elements[0].type === 'identifier' &&
          term.elements[0].name === 'if') {
        if (term.elements.length !== 4) {
          return reject (new Error ('Invalid if expression'));
        }
        const predicate = evaluate (dirname)
                                   (env)
                                   (term.elements[1])
                                   (value => ({success: false, value}))
                                   (value => ({success: true, value}));
        if (!predicate.success) return reject (predicate.value);
        if (typeof predicate.value !== 'boolean') {
          return reject (new TypeError ('Predicate evaluated to non-Boolean value'));
        }
        if (predicate.value) {
          const consequent = evaluate (dirname)
                                      (env)
                                      (term.elements[2])
                                      (value => ({success: false, value}))
                                      (value => ({success: true, value}));
          if (!consequent.success) return reject (consequent.value);
          return resolve (consequent.value);
        } else {
          const alternative = evaluate (dirname)
                                       (env)
                                       (term.elements[3])
                                       (value => ({success: false, value}))
                                       (value => ({success: true, value}));
          if (!alternative.success) return reject (alternative.value);
          return resolve (alternative.value);
        }
      }
      if (term.elements[0].type === 'identifier' &&
          term.elements[0].name === 'let') {
        if (term.elements.length !== 3) {
          return reject (new Error ('Invalid let expression'));
        }
        if (!(term.elements[1].type === 'array-literal' &&
              term.elements[1].elements
              .every ((e, idx) => idx % 2 === 1 || e.type === 'identifier'))) {
          return reject (new Error ('Invalid let expression'));
        }
        let env_ = env;
        for (let idx = 0; idx < term.elements[1].elements.length; idx += 2) {
          const name = term.elements[1].elements[idx].name;
          const {success, value} = evaluate (dirname)
                                            (env_)
                                            (term.elements[1].elements[idx + 1])
                                            (value => ({success: false, value}))
                                            (value => ({success: true, value}));
          if (!success) return reject (value);
          env_ = {...env_, [Symbol.for (name)]: value};
        }
        return evaluate (dirname) (env_) (term.elements[2]) (reject) (resolve);
      }
      if (term.elements[0].type === 'identifier' &&
          term.elements[0].name === 'lambda') {
        if (term.elements.length !== 3) {
          return reject (new Error ('Invalid lambda expression'));
        }
        if (!(term.elements[1].type === 'array-literal' &&
              term.elements[1].elements.every (e => e.type === 'identifier'))) {
          return reject (new Error ('Invalid lambda expression'));
        }
        const params = term.elements[1].elements.map (e => e.name);
        return resolve (
          params.reduce (
            f => args => arg => f ([...args, arg]),
            args => evaluate (dirname)
                             (params.reduce ((env, param, idx) =>
                                               ({...env, [Symbol.for (param)]: args[idx]}),
                                             env))
                             (term.elements[2])
                             (err => { throw err; })
                             (I)
          ) ([])
        );
      }
      if (term.elements[0].type === 'identifier' &&
          term.elements[0].name === 'import') {
        if (term.elements.length !== 3) {
          return reject (new Error ('Invalid import expression'));
        }
        const paths = evaluate (dirname)
                               (env)
                               (term.elements[1])
                               (value => ({success: false, value}))
                               (value => ({success: true, value}));
        if (!paths.success) return reject (paths.value);
        if (!(paths.value.every (path => typeof path === 'string'))) {
          return reject (new Error ('Invalid import expression'));
        }
        let env_ = env;
        for (const p of paths.value) {
          const {success, value} = evaluateFile (env_)
                                                (path.join (dirname, p))
                                                (value => ({success: false, value}))
                                                (value => ({success: true, value}));
          if (!success) return reject (value);
          env_ = {...env_, ...value};
        }
        return evaluate (dirname)
                        (env_)
                        (term.elements[2])
                        (reject)
                        (resolve);
      }
      const values = [];
      for (const element of term.elements) {
        const {success, value} = evaluate (dirname)
                                          (env)
                                          (element)
                                          (value => ({success: false, value}))
                                          (value => ({success: true, value}));
        if (!success) return reject (value);
        values.push (value);
      }
      const [f, ...args] = values;
      return resolve (
        args.length === 0 ?
        f () :
        args.reduce ((f, x) => (typeof f === 'symbol' ? o => o[f] : f) (x), f)
      );
    }
    default: {
      return reject (new Error ('TK'));
    }
  }
};

export const evaluateFile = env => filename => reject => resolve => {
  let src;
  try {
    src = fs.readFileSync (filename, {encoding: 'utf8'});
  } catch (err) {
    return reject (err);
  }
  return parse (src)
               (reject)
               (value => _ => evaluate (path.dirname (filename))
                                       (env)
                                       (value)
                                       (reject)
                                       (resolve));
};


if (url.fileURLToPath (import.meta.url) === process.argv[1]) {
  { // parse
    const expect = success => input => value => {
      assert.deepStrictEqual (
        parse (input)
              (value => ({success: false, value}))
              (value => _ => ({success: true, value})),
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
    const expect = success => env => input => value => {
      assert.deepStrictEqual (
        parse (input)
              (value => ({success: false, value}))
              (value => _ => evaluate (path.dirname (url.fileURLToPath (import.meta.url)))
                                      (env)
                                      (value)
                                      (value => ({success: false, value}))
                                      (value => ({success: true, value}))),
        {success, value}
      );
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

    succeeds ({}) ('{}') (Object.create (null));
    succeeds ({}) ('{"x"}') (Object.assign (Object.create (null), {x: undefined}));
    succeeds ({}) ('{"x" 1}') (Object.assign (Object.create (null), {x: 1}));
    succeeds ({}) ('{"x" 1 "y"}') (Object.assign (Object.create (null), {x: 1, y: undefined}));
    succeeds ({}) ('{"x" 1 "y" 2}') (Object.assign (Object.create (null), {x: 1, y: 2}));
    succeeds ({}) ('{"x" 1 "y" 2 "z"}') (Object.assign (Object.create (null), {x: 1, y: 2, z: undefined}));
    succeeds ({}) ('{"x" 1 "y" 2 "z" 3}') (Object.assign (Object.create (null), {x: 1, y: 2, z: 3}));

    fails ({}) ('()') (new Error ('Empty parentheses'));
    succeeds ({[Symbol.for ('Math.sqrt')]: Math.sqrt}) ('(Math.sqrt 64)') (8);
    succeeds ({[Symbol.for ('Math.sqrt')]: Math.sqrt, [Symbol.for ('*')]: x => y => y * x}) ('(Math.sqrt (* 8 8))') (8);
    succeeds ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :x {:x 1 :y 2})') (1);
    succeeds ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :y {:x 1 :y 2})') (2);
    succeeds ({[Symbol.for ('get')]: k => m => m[k]}) ('(get :z {:x 1 :y 2})') (undefined);

    succeeds ({}) ('(:x {:x 1 :y 2})') (1);
    succeeds ({}) ('(:y {:x 1 :y 2})') (2);
    succeeds ({}) ('(:z {:x 1 :y 2})') (undefined);

//  succeeds ({map: f => xs => xs.map (x => f (x))}) ('(map :x [{:x 1 :y 2} {:x 3 :y 4}])') ([1, 3]);
//  succeeds ({map: f => xs => xs.map (x => f (x))}) ('(map :y [{:x 1 :y 2} {:x 3 :y 4}])') ([2, 4]);
//  succeeds ({map: f => xs => xs.map (x => f (x))}) ('(map :z [{:x 1 :y 2} {:x 3 :y 4}])') ([undefined, undefined]);

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

    fails ({}) ('true') (new ReferenceError ('true is not defined'));
    fails ({}) ('false') (new ReferenceError ('false is not defined'));
    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('true') (true);
    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('false') (false);

    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if true 8 x)') (8);
    succeeds ({[Symbol.for ('true')]: true, [Symbol.for ('false')]: false}) ('(if false x 8)') (8);
    fails ({}) ('(if "xxx" x x)') (new TypeError ('Predicate evaluated to non-Boolean value'));
  }
}
