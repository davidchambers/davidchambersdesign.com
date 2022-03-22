'use strict';

//    number :: Number -> Expression
const number = value => ({type: 'number', value});

//    string :: String -> Expression
const string = value => ({type: 'string', value});

//    symbol :: String -> Expression
const symbol = name => ({type: 'symbol', name});

//    identifier :: String -> Expression
const identifier = name => ({type: 'identifier', name});

//    array :: Array Expression -> Expression
const array = elements => ({type: 'array', elements});

//    object :: Array (Array2 Expression Expression) -> Expression
const object = entries => ({type: 'object', entries});

//    application :: Expression -> Expression -> Expression
const application = func => arg => ({type: 'application', function: func, argument: arg});

//    import_ :: Expression -> Expression
const import_ = name => ({type: 'import', name});

//    importStar :: Array Expression -> Expression -> Expression
const importStar = names => body => ({type: 'import*', names, body});

//    function_ :: Expression -> Expression -> Expression -> Expression
const function_ = name => parameter => body => ({type: 'function', name, parameter, body});

//    lambda :: Expression -> Expression -> Expression
const lambda = parameter => body => ({type: 'lambda', parameter, body});

//    if_ :: Expression -> Expression -> Expression -> Expression
const if_ = predicate => consequent => alternative => ({type: 'if', predicate, consequent, alternative});

module.exports = {
  application,
  array,
  if: if_,
  identifier,
  import: import_,
  importStar,
  function: function_,
  lambda,
  number,
  object,
  string,
  symbol,
};
