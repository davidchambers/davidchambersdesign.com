'use strict';

const sanctuary = require ('sanctuary');
const $ = require ('sanctuary-def');

const base = require ('./base.js');


const {
  concat,
  is,
  joinWith,
  reduce,
} = sanctuary.unchecked;

module.exports = {
  [Symbol.for ('string->symbol')]: Symbol.for,
  [Symbol.for ('symbol->string')]: Symbol.keyFor,

  [Symbol.for ('array?')]: Array.isArray,
  [Symbol.for ('string?')]: x => typeof x === 'string',
  [Symbol.for ('symbol?')]: x => typeof x === 'symbol',

  [Symbol.for ('++')]: joinWith (''),

  [Symbol.for ('reduce-object')]: reducer => initial => object => (
    reduce (accum => key => reducer (key) (object[key]) (accum))
           (initial)
           (concat (Object.getOwnPropertyNames (object))
                   (Object.getOwnPropertySymbols (object)))
  ),

  [Symbol.for ('concat')]: m1 => m2 => (
    is ($.Object) (m1) ?
    Object.assign ({}, m1, m2) :
    concat (m1) (m2)
  ),
  [Symbol.for ('insert')]: key => val => obj => (
    Object.assign ({}, obj, Object.fromEntries ([[key, val]]))
  ),

  [Symbol.for ('union')]: s1 => s2 => (
    new Set ([...s1, ...s2])
  ),
  [Symbol.for ('intersection')]: s1 => s2 => (
    new Set ([...s1].filter (x => s2.has (x)))
  ),
};
