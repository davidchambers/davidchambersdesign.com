'use strict';

const sanctuary = require ('sanctuary');
const $ = require ('sanctuary-def');

const base = require ('./base.js');


const {
  compose,
  concat,
  is,
  joinWith,
  reduce,
} = sanctuary.unchecked;

module.exports = {
  [Symbol.for ('string->symbol')]: Symbol.for,
  [Symbol.for ('symbol->string')]:
    sym => (String (sym)).slice ('Symbol('.length, -')'.length),

  [Symbol.for ('curry-2')]: f => a => b => (
    base[Symbol.for ('apply')] (f) ([a, b])
  ),
  [Symbol.for ('curry-3')]: f => a => b => c => (
    base[Symbol.for ('apply')] (f) ([a, b, c])
  ),
  [Symbol.for ('curry-4')]: f => a => b => c => d => (
    base[Symbol.for ('apply')] (f) ([a, b, c, d])
  ),
  [Symbol.for ('curry-5')]: f => a => b => c => d => e => (
    base[Symbol.for ('apply')] (f) ([a, b, c, d, e])
  ),

  [Symbol.for ('array?')]: Array.isArray,
  [Symbol.for ('string?')]:
    compose (base[Symbol.for ('===')] ('string'))
            (base[Symbol.for ('type-of')]),
  [Symbol.for ('symbol?')]:
    compose (base[Symbol.for ('===')] ('symbol'))
            (base[Symbol.for ('type-of')]),

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
};
