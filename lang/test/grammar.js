'use strict';

const assert = require ('assert');

const S = require ('sanctuary');

const grammar = require ('../grammar.js');


const eq = actual => expected => {
  assert.strictEqual (S.show (actual), S.show (expected));
  assert.strictEqual (S.equals (actual) (expected), true);
};

const parse = S.encase (grammar.parse);


eq (parse ('1'))
   (S.Right ({type: 'number', value: 1}));

eq (parse ('12'))
   (S.Right ({type: 'number', value: 12}));

eq (parse ('123'))
   (S.Right ({type: 'number', value: 123}));

eq (parse (' 123 '))
   (S.Right ({type: 'number', value: 123}));

eq (parse ('[]'))
   (S.Right ({type: 'array', elements: []}));

eq (parse ('[1]'))
   (S.Right ({type: 'array', elements: [{type: 'number', value: 1}]}));

eq (parse ('[1 2]'))
   (S.Right ({type: 'array', elements: [{type: 'number', value: 1},
                                        {type: 'number', value: 2}]}));

eq (parse ('[1 2 3]'))
   (S.Right ({type: 'array', elements: [{type: 'number', value: 1},
                                        {type: 'number', value: 2},
                                        {type: 'number', value: 3}]}));

eq (parse (' [ 1 2 3 ] '))
   (S.Right ({type: 'array', elements: [{type: 'number', value: 1},
                                        {type: 'number', value: 2},
                                        {type: 'number', value: 3}]}));

eq (parse ('[[1] [2] [3]]'))
   (S.Right ({type: 'array', elements: [{type: 'array', elements: [{type: 'number', value: 1}]},
                                        {type: 'array', elements: [{type: 'number', value: 2}]},
                                        {type: 'array', elements: [{type: 'number', value: 3}]}]}));

eq (parse (' [ [ 1 ] [ 2 ] [ 3 ] ]'))
   (S.Right ({type: 'array', elements: [{type: 'array', elements: [{type: 'number', value: 1}]},
                                        {type: 'array', elements: [{type: 'number', value: 2}]},
                                        {type: 'array', elements: [{type: 'number', value: 3}]}]}));
