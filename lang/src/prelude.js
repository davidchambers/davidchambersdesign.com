import {
  ArrowFunctionExpression,
  CallExpression,
  ConditionalExpression,
  Identifier,
  MemberExpression,
  StringLiteral,
} from './types.js';


const isArray = name => (
  CallExpression(MemberExpression(Identifier('Array'))(StringLiteral('isArray')))
                ([Identifier(name)])
);

export const map = (
  ArrowFunctionExpression([Identifier('f')])
                         (ArrowFunctionExpression([Identifier('functor')])
                                                 (ConditionalExpression(isArray('functor'))
                                                                       (CallExpression(MemberExpression(Identifier('functor'))
                                                                                                       (StringLiteral('map')))
                                                                                      ([ArrowFunctionExpression([Identifier('x')])
                                                                                                               (CallExpression(Identifier('f'))
                                                                                                                              ([Identifier('x')]))]))
                                                                       (CallExpression(MemberExpression(Identifier('functor'))
                                                                                                       (StringLiteral('fantasy-land/map')))
                                                                                      ([Identifier('f')]))))
);

export const chain = (
  ArrowFunctionExpression([Identifier('f')])
                         (ArrowFunctionExpression([Identifier('chain')])
                                                 (ConditionalExpression(isArray('chain'))
                                                                       (CallExpression(MemberExpression(Identifier('chain'))
                                                                                                       (StringLiteral('flatMap')))
                                                                                      ([ArrowFunctionExpression([Identifier('x')])
                                                                                                               (CallExpression(Identifier('f'))
                                                                                                                              ([Identifier('x')]))]))
                                                                       (CallExpression(MemberExpression(Identifier('chain'))
                                                                                                       (StringLiteral('fantasy-land/chain')))
                                                                                      ([Identifier('f')]))))
);
