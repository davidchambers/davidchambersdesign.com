'use strict';

const sanctuary = require ('sanctuary');


const {
  K,
  join,
} = sanctuary.unchecked;

//    number :: Number -> Node
const number = exports.number = value => ({__type: 'number', __value: value});

//    string :: String -> Node
const string = exports.string = value => ({__type: 'string', __value: value});

//    symbol :: String -> Node
const symbol = exports.symbol = name => ({__type: 'symbol', __name: name});

//    identifier :: String -> Node
const identifier = exports.identifier = name => ({__type: 'identifier', __name: name});

//    bracketed :: Array Node -> Node
const bracketed = exports.bracketed = elements => ({__type: '[]', __elements: elements});

//    braced :: Array Node -> Node
const braced = exports.braced = elements => ({__type: '{}', __elements: elements});

//    parenthesized :: Array Node -> Node
const parenthesized = exports.parenthesized = elements => ({__type: '()', __elements: elements});

const fold = exports.fold = cases => node => {
  switch (node.__type) {
    case 'number':
      return cases.number (node.__value);
    case 'string':
      return cases.string (node.__value);
    case 'symbol':
      return cases.symbol (node.__name);
    case 'identifier':
      return cases.identifier (node.__name);
    case '[]':
      return cases.bracketed (node.__elements);
    case '{}':
      return cases.braced (node.__elements);
    case '()':
      return cases.parenthesized (node.__elements);
  }
};

exports.onString = other => string => (
  join (fold ({number: K (other),
               string: value => K (string (value)),
               symbol: K (other),
               identifier: K (other),
               bracketed: K (other),
               braced: K (other),
               parenthesized: K (other)}))
);

exports.onIdentifier = other => identifier => (
  join (fold ({number: K (other),
               string: K (other),
               symbol: K (other),
               identifier: name => K (identifier (name)),
               bracketed: K (other),
               braced: K (other),
               parenthesized: K (other)}))
);

exports.onBracketed = other => bracketed => (
  join (fold ({number: K (other),
               string: K (other),
               symbol: K (other),
               identifier: K (other),
               bracketed: elements => K (bracketed (elements)),
               braced: K (other),
               parenthesized: K (other)}))
);
