'use strict';

const sanctuary = require ('sanctuary');


const {
  K,
  join,
} = sanctuary.unchecked;

//    number :: Number -> Expression
const number = value => number => _ => _ => _ => _ => _ => _ => number (value);

//    string :: String -> Expression
const string = value => _ => string => _ => _ => _ => _ => _ => string (value);

//    symbol :: String -> Expression
const symbol = name => _ => _ => symbol => _ => _ => _ => _ => symbol (name);

//    identifier :: String -> Expression
const identifier = name => _ => _ => _ => identifier => _ => _ => _ => identifier (name);

//    bracketed :: Array Expression -> Expression
const bracketed = elements => _ => _ => _ => _ => bracketed => _ => _ => bracketed (elements);

//    braced :: Array Expression -> Expression
const braced = elements => _ => _ => _ => _ => _ => braced => _ => braced (elements);

//    parenthesized :: Array Expression -> Expression
const parenthesized = elements => _ => _ => _ => _ => _ => _ => parenthesized => parenthesized (elements);

const fold = cases => function recur(expr) {
  return expr (cases.number)
              (cases.string)
              (cases.symbol)
              (cases.identifier)
              (cases.bracketed (recur))
              (cases.braced (recur))
              (cases.parenthesized (recur));
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
