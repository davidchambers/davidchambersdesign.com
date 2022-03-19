'use strict';

const assert = require ('assert');

const S = require ('sanctuary');

const expression = require ('../../src/lang/expression.js');
const grammar = require ('../../src/lang/grammar.js');


const eq = actual => expected => {
  assert.strictEqual (S.show (actual), S.show (expected));
  assert.strictEqual (S.equals (actual) (expected), true);
};

const parse = S.encase (grammar.parse);


eq (parse ('1'))
   (S.Right (expression.number (1)));

eq (parse ('12'))
   (S.Right (expression.number (12)));

eq (parse ('123'))
   (S.Right (expression.number (123)));

eq (parse (' 123 '))
   (S.Right (expression.number (123)));

eq (parse ('[]'))
   (S.Right (expression.bracketed ([])));

eq (parse ('[1]'))
   (S.Right (expression.bracketed ([expression.number (1)])));

eq (parse ('[1 2]'))
   (S.Right (expression.bracketed ([expression.number (1),
                                    expression.number (2)])));

eq (parse ('[1 2 3]'))
   (S.Right (expression.bracketed ([expression.number (1),
                                    expression.number (2),
                                    expression.number (3)])));

eq (parse (' [ 1 2 3 ] '))
   (S.Right (expression.bracketed ([expression.number (1),
                                    expression.number (2),
                                    expression.number (3)])));

eq (parse ('[[1] [2] [3]]'))
   (S.Right (expression.bracketed ([expression.bracketed ([expression.number (1)]),
                                    expression.bracketed ([expression.number (2)]),
                                    expression.bracketed ([expression.number (3)])])));

eq (parse (' [ [ 1 ] [ 2 ] [ 3 ] ]'))
   (S.Right (expression.bracketed ([expression.bracketed ([expression.number (1)]),
                                    expression.bracketed ([expression.number (2)]),
                                    expression.bracketed ([expression.number (3)])])));
