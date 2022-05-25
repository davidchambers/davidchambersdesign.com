'use strict';

exports.fold = cases => expr => {
  switch (expr.type) {
    case 'number':          return cases.number (expr.value);
    case 'string':          return cases.string (expr.value);
    case 'symbol':          return cases.symbol (expr.name);
    case 'identifier':      return cases.identifier (expr.name);
    case 'array':           return cases.array (expr.elements);
    case 'object':          return cases.object (expr.entries);
    case 'lambda':          return cases.lambda (expr.parameter) (expr.body);
    case 'and':             return cases.and (expr.left) (expr.right);
    case 'or':              return cases.or (expr.left) (expr.right);
    case 'if':              return cases.if (expr.predicate) (expr.consequent) (expr.alternative);
    case 'switch':          return cases.switch (expr.discriminant) (expr.cases);
    case 'new':             return cases.new (expr.arguments);
    case 'invocation':      return cases.invocation (expr.name) (expr.arguments);
    case 'application':     return cases.application (expr.callee) (expr.arguments);
    case 'placeholder':     return cases.placeholder;
    case 'import':          return cases.import (expr.names) (expr.body);
  }
};
