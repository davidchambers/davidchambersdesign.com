'use strict';

const sanctuary = require ('sanctuary');


const {
  K,
  join,
} = sanctuary.unchecked;

//    number :: Number -> Node
const number = value => ({__type: 'number', __value: value});

//    string :: String -> Node
const string = value => ({__type: 'string', __value: value});

//    symbol :: String -> Node
const symbol = name => ({__type: 'symbol', __name: name});

//    identifier :: String -> Node
const identifier = name => ({__type: 'identifier', __name: name});

//    bracketed :: Array Node -> Node
const bracketed = elements => ({__type: '[]', __elements: elements});

//    braced :: Array Node -> Node
const braced = elements => ({__type: '{}', __elements: elements});

//    parenthesized :: Array Node -> Node
const parenthesized = elements => ({__type: '()', __elements: elements});

const fold = cases => function recur(expr) {
  switch (expr.__type) {
    case 'number':
      return cases.number (expr.__value);
    case 'string':
      return cases.string (expr.__value);
    case 'symbol':
      return cases.symbol (expr.__name);
    case 'identifier':
      return cases.identifier (expr.__name);
    case '[]':
      return cases.bracketed (recur) (expr.__elements);
    case '{}':
      return cases.braced (recur) (expr.__elements);
    case '()':
      return cases.parenthesized (recur) (expr.__elements);
  }
};

const onString = other => string => (
  join (fold ({number: K (other),
               string: value => K (string (value)),
               symbol: K (other),
               identifier: K (other),
               bracketed: K (K (other)),
               braced: K (K (other)),
               parenthesized: K (K (other))}))
);

const onSymbol = other => symbol => (
  join (fold ({number: K (other),
               string: K (other),
               symbol: value => K (symbol (value)),
               identifier: K (other),
               bracketed: K (K (other)),
               braced: K (K (other)),
               parenthesized: K (K (other))}))
);

const onIdentifier = other => identifier => (
  join (fold ({number: K (other),
               string: K (other),
               symbol: K (other),
               identifier: name => K (identifier (name)),
               bracketed: K (K (other)),
               braced: K (K (other)),
               parenthesized: K (K (other))}))
);

const onBracketed = other => bracketed => (
  join (fold ({number: K (other),
               string: K (other),
               symbol: K (other),
               identifier: K (other),
               bracketed: K (elements => K (bracketed (elements))),
               braced: K (K (other)),
               parenthesized: K (K (other))}))
);

const onBraced = other => bracketed => (
  join (fold ({number: K (other),
               string: K (other),
               symbol: K (other),
               identifier: K (other),
               bracketed: K (K (other)),
               braced: K (elements => K (braced (elements))),
               parenthesized: K (K (other))}))
);

module.exports = {
  braced,
  bracketed,
  fold,
  identifier,
  number,
  onBraced,
  onBracketed,
  onIdentifier,
  onString,
  onSymbol,
  parenthesized,
  string,
  symbol,
};
