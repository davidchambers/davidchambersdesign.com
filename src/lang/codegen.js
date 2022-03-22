'use strict';

const path = require ('path');

const sanctuary = require ('sanctuary');

const expression = require ('./expression.js');


const {
  map,
  reduce,
} = sanctuary.unchecked;

const Program = sourceType => body => ({type: 'Program', sourceType, body});
const ExprStatement = expression => ({type: 'ExpressionStatement', expression});
const AssignmentExpr = operator => left => right => ({type: 'AssignmentExpression', operator, left, right});
const MemberExpr = computed => object => property => ({type: 'MemberExpression', object, property, computed, optional: false});
const CondExpr = test => consequent => alternative => ({type: 'ConditionalExpression', test, consequent, alternate: alternative});
const UnaryExpr = prefix => operator => argument => ({type: 'UnaryExpression', prefix, operator, argument});
const FuncExpr = id => params => body => ({type: 'FunctionExpression', id, params, body, expression: false, generator: false, async: false});
const FuncExpr1 = id => param => FuncExpr (id) ([param]);
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


exports.toJs = dirname => {
  const rewriteModuleSymbol = expr => {
    if (expr.type === 'symbol') {
      const [head, ...tail] = (
        path.relative (dirname, path.join (__dirname, 'modules', expr.name))
        .split (path.sep)
      );
      return expression.string (
        [...(head === '.' || head === '..' ? [] : ['.']), head, ...tail]
        .join ('/'),
      );
    } else {
      return expr;
    }
  };

  return function recur(expr) {
    switch (expr.type) {
      case 'number':
        return expr.value < 0 ? UnaryExpr (true) ('-') (Literal (-expr.value)) : Literal (expr.value);
      case 'string':
        return Literal (expr.value);
      case 'symbol':
        return CallExpr1 (MemberExpr (false)
                                     (Identifier ('Symbol'))
                                     (Identifier ('for')))
                         (Literal (expr.name));
      case 'identifier': {
        if (expr.name.startsWith ('#')) {
          return ArrowFuncExpr1 (Identifier ('obj'))
                                (MemberExpr (true)
                                            (Identifier ('obj'))
                                            (Literal (expr.name.slice ('#'.length))));
        } else if (expr.name === '/') {
          return Identifier (escapeIdentifier (expr.name));
        } else {
          const [head, ...tail] = expr.name.split ('/');
          return reduce (MemberExpr (true))
                        (Identifier (escapeIdentifier (head)))
                        (map (Literal) (tail));
        }
      }
      case 'array':
        return ArrayExpr (map (recur) (expr.elements));
      case 'object':
        return ObjectExpr (map (([key, value]) => Property (recur (key)) (recur (value)))
                               (expr.entries));
      case 'import':
        return CallExpr1 (Identifier ('require')) (recur (rewriteModuleSymbol (expr.name)));
      case 'import*': {
        const names = map (rewriteModuleSymbol) (expr.names);
        const params = map (symbol => recur (expression.identifier (Symbol.keyFor (symbol))))
                           (Object.getOwnPropertySymbols (reduce (env => name => Object.assign (env, require (path.join (dirname, name.value))))
                                                                 (Object.create (null))
                                                                 (names)));
        return CallExpr (ArrowFuncExpr ([Identifier (escapeIdentifier ('__dirname')),
                                         ArrayPattern (params)])
                                       (recur (expr.body)))
                        ([Literal (dirname),
                          CallExpr (ArrowFuncExpr ([Identifier ('env')])
                                                  (CallExpr (MemberExpr (false)
                                                                        (CallExpr (MemberExpr (false)
                                                                                              (Identifier ('Object'))
                                                                                              (Identifier ('getOwnPropertySymbols')))
                                                                                  ([Identifier ('env')]))
                                                                        (Identifier ('map')))
                                                            ([ArrowFuncExpr ([Identifier ('sym')])
                                                                            (MemberExpr (true)
                                                                                        (Identifier ('env'))
                                                                                        (Identifier ('sym')))])))
                                   ([CallExpr (MemberExpr (false)
                                                          (ArrayExpr (map (recur) (names)))
                                                          (Identifier ('reduce')))
                                              ([ArrowFuncExpr ([Identifier ('env'), Identifier ('path')])
                                                              (CallExpr (MemberExpr (false)
                                                                                    (Identifier ('Object'))
                                                                                    (Identifier ('assign')))
                                                                        ([Identifier ('env'),
                                                                          CallExpr (Identifier ('require'))
                                                                                   ([Identifier ('path')])])),
                                                CallExpr (MemberExpr (false)
                                                                     (Identifier ('Object'))
                                                                     (Identifier ('create')))
                                                         ([Literal (null)])])])]);
      }
      case 'function':
        return FuncExpr1 (recur (expr.name))
                         (recur (expr.parameter))
                         (BlockStatement ([ReturnStatement (recur (expr.body))]));
      case 'lambda':
        return ArrowFuncExpr1 (recur (expr.parameter))
                              (recur (expr.body));
      case 'if':
        return CondExpr (recur (expr.predicate))
                        (recur (expr.consequent))
                        (recur (expr.alternative));
      case 'application': {
        if (expr.function.type === 'symbol') {
          return CallExpr1 (ArrowFuncExpr1 (Identifier ('obj'))
                                           (MemberExpr (true)
                                                       (Identifier ('obj'))
                                                       (CallExpr1 (MemberExpr (false)
                                                                              (Identifier ('Symbol'))
                                                                              (Identifier ('for')))
                                                                  (Literal (expr.function.name)))))
                           (recur (expr.argument));
        } else {
          return CallExpr1 (recur (expr.function))
                           (recur (expr.argument));
        }
      }
    }
  };
};

exports.toCommonJsModule = jsExpr => (
  Program ('script')
          ([ExprStatement (Literal ('use strict')),
            ExprStatement (AssignmentExpr ('=')
                                          (MemberExpr (false)
                                                      (Identifier ('module'))
                                                      (Identifier ('exports')))
                                          (jsExpr))])
);
