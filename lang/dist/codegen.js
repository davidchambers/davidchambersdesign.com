import {maybe} from "./Maybe.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const not = x => !x;
const charCodeAt = index => string => string.charCodeAt(index);
const toUpper = string => string.toUpperCase();
const replaceAll = pattern => replacement => string => string.replaceAll(pattern, replacement);
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    case "[object Object]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Object]":
            return typeof$(this$["fantasy-land/equals"]) === "function" ? this$["fantasy-land/equals"](that) : this$ === that;
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return this$.concat(that);
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const reduce = f => y => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.reduce((y, x) => f(y)(x), y);
    default:
      return xs["fantasy-land/reduce"]((y, x) => f(y)(x), y);
  }
})();
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const flip = f => y => x => f(x)(y);
const chain = f => x => (() => {
  switch (globalThis.Object.prototype.toString.call(x)) {
    case "[object Array]":
      return x.flatMap(x => f(x));
    case "[object Function]":
      return y => x(f(y))(y);
    default:
      return x["fantasy-land/chain"](f);
  }
})();
const contains = this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these);
const match = pattern => value => {
  switch (pattern.type) {
    case "any":
      return {};
    case "identifier":
      return {
        [pattern.name]: value
      };
    case "literal":
      if (equals(pattern.value)(value)) return {};
      return null$;
    case "data":
      if (typeof$(value) === "object" && value.$tag === pattern.tag && value.$values.length === pattern.patterns.length) {
        const context = {};
        for (let index = 0; index < pattern.patterns.length; index += 1) {
          const fragment = match(pattern.patterns[index])(value.$values[index]);
          if (fragment === null$) return null$;
          globalThis.Object.assign(context, fragment);
        }
        return context;
      }
      return null$;
    case "array":
      if (globalThis.Array.isArray(value)) {
        const patterns = pattern.patterns;
        const lengths = [];
        let slices = 0;
        for (let index = 0; index < patterns.length; index += 1) {
          if (patterns[index].type === "slice") {
            lengths[patterns[index].index = slices] = 0;
            slices += 1;
          }
        }
        if (slices === 0) {
          if (value.length !== patterns.length) return null$;
          const context = {};
          for (let index = 0; index < value.length; index += 1) {
            const fragment = match(patterns[index])(value[index]);
            if (fragment === null$) return null$;
            globalThis.Object.assign(context, fragment);
          }
          return context;
        }
        const min = patterns.length - slices;
        if (value.length < min) return null$;
        const lastIndex = slices - 1;
        lengths[lastIndex] = value.length - min;
        const fragments = globalThis.Array(patterns.length);
        while (true) {
          let index = 0;
          let valid = true;
          for (let patternIndex = 0; patternIndex < fragments.length; patternIndex += 1) {
            const pattern = patterns[patternIndex];
            const fragment = pattern.type === "slice" ? match({
              type: "identifier",
              name: pattern.name
            })(value.slice(index, index += lengths[pattern.index])) : match(pattern)(value[index++]);
            if (fragment === null$) {
              valid = false;
              break;
            }
            fragments[patternIndex] = fragment;
          }
          if (valid) return globalThis.Object.assign({}, ...fragments);
          index = lastIndex;
          while (lengths[index] === 0) index -= 1;
          if (index === 0) return null$;
          lengths[index - 1] += 1;
          while (index < lastIndex) lengths[index++] = 0;
          lengths[lastIndex] = value.length - min;
          index = 0;
          while (index < lastIndex) lengths[lastIndex] -= lengths[index++];
        }
      }
      return null$;
  }
};
const RESERVED_WORDS = globalThis.Reflect.construct(Set, [["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "enum", "implements", "interface", "package", "private", "protected", "public", "arguments", "eval"]]);
const validEsIdentifierName = name => (args => target => target.test.apply(target, args))([name])(RegExp("^[$_A-Za-z][$_A-Za-z0-9]*$"));
const fromEscapedIdentifierName = name => ({
  type: "Identifier",
  name
});
const fromIdentifier = (() => {
  const escapeChar = c => concat("$")((args => target => target.padStart.apply(target, args))([4, "0"])(toUpper((args => target => target.toString.apply(target, args))([16])(charCodeAt(0)(c)))));
  const escape = name => contains(name)(["eval", "import"]) ? name : RESERVED_WORDS.has(name) ? name + "$" : validEsIdentifierName(name) ? name : replaceAll(RegExp("[^$_A-Za-z0-9]", "g"))(escapeChar)(name);
  return $ => fromEscapedIdentifierName(escape($));
})();
const fromMemberExpression = object => property => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "data",
      tag: "StringLiteral",
      patterns: [{
        type: "identifier",
        name: "value"
      }]
    });
    if ($result != null$) {
      return (({value}) => validEsIdentifierName(value) ? {
        type: "MemberExpression",
        object: fromNode(object),
        property: fromEscapedIdentifierName(value),
        computed: false,
        optional: false
      } : {
        type: "MemberExpression",
        object: fromNode(object),
        property: fromNode(property),
        computed: true,
        optional: false
      })($result);
    }
  }
  {
    const $result = $match({
      type: "identifier",
      name: "property"
    });
    if ($result != null$) {
      return (({property}) => ({
        type: "MemberExpression",
        object: fromNode(object),
        property: fromNode(property),
        computed: true,
        optional: false
      }))($result);
    }
  }
})(property);
const fromProperty = key => value => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "data",
      tag: "StringLiteral",
      patterns: [{
        type: "identifier",
        name: "keyValue"
      }]
    });
    if ($result != null$) {
      return (({keyValue}) => (() => {
        const computed = not(validEsIdentifierName(keyValue));
        const esKey = computed ? fromNode(key) : fromEscapedIdentifierName(keyValue);
        const esValue = fromNode(value);
        const shorthand = equals(esKey.type)("Identifier") && equals(esValue.type)("Identifier") && equals(esKey.name)(esValue.name);
        return {
          type: "Property",
          key: esKey,
          value: esValue,
          kind: "init",
          method: false,
          shorthand,
          computed
        };
      })())($result);
    }
  }
  {
    const $result = $match({
      type: "identifier",
      name: "key"
    });
    if ($result != null$) {
      return (({key}) => (() => {
        const esKey = fromNode(key);
        const esValue = fromNode(value);
        const shorthand = equals(esKey.type)("Identifier") && equals(esValue.type)("Identifier") && equals(esKey.name)(esValue.name);
        return {
          type: "Property",
          key: esKey,
          value: esValue,
          kind: "init",
          method: false,
          shorthand,
          computed: true
        };
      })())($result);
    }
  }
})(key);
const fromBlock = statements => result => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: maybe(id)(function (result) {
        return $lhs => concat($lhs)([{
          type: "ReturnStatement",
          argument: fromNode(result)
        }]);
      })(result)(map(fromNode)(statements))
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const fromSwitchStatement = discriminant => cases => ({
  type: "SwitchStatement",
  discriminant: fromNode(discriminant),
  cases: chain($ => ($value => {
    const $match = flip(match)($value);
    {
      const $result = $match({
        type: "data",
        tag: "SwitchCase",
        patterns: [{
          type: "identifier",
          name: "predicates"
        }, {
          type: "identifier",
          name: "statements"
        }]
      });
      if ($result != null$) {
        return (({predicates, statements}) => map(function (predicate) {
          return {
            type: "SwitchCase",
            test: maybe(null$)(fromNode)(predicate),
            consequent: map(fromNode)(statements)
          };
        })(predicates))($result);
      }
    }
  })($))(cases)
});
const fromNode = node => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "data",
      tag: "BooleanLiteral",
      patterns: [{
        type: "identifier",
        name: "value"
      }]
    });
    if ($result != null$) {
      return (({value}) => ({
        type: "Literal",
        value
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "NumberLiteral",
      patterns: [{
        type: "identifier",
        name: "value"
      }]
    });
    if ($result != null$) {
      return (({value}) => ({
        type: "Literal",
        value
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "StringLiteral",
      patterns: [{
        type: "identifier",
        name: "value"
      }]
    });
    if ($result != null$) {
      return (({value}) => ({
        type: "Literal",
        value
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "MemberExpression",
      patterns: [{
        type: "identifier",
        name: "object"
      }, {
        type: "identifier",
        name: "property"
      }]
    });
    if ($result != null$) {
      return (({object, property}) => fromMemberExpression(object)(property))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "Identifier",
      patterns: [{
        type: "identifier",
        name: "name"
      }]
    });
    if ($result != null$) {
      return (({name}) => fromIdentifier(name))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ThisExpression",
      patterns: []
    });
    if ($result != null$) {
      return (({}) => ({
        type: "ThisExpression"
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayExpression",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => ({
        type: "ArrayExpression",
        elements: map(fromNode)(elements)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ObjectExpression",
      patterns: [{
        type: "identifier",
        name: "properties"
      }]
    });
    if ($result != null$) {
      return (({properties}) => ({
        type: "ObjectExpression",
        properties: map(fromNode)(properties)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrowFunctionExpression",
      patterns: [{
        type: "identifier",
        name: "parameters"
      }, {
        type: "identifier",
        name: "body"
      }]
    });
    if ($result != null$) {
      return (({parameters, body}) => (() => {
        const esBody = fromNode(body);
        return {
          type: "ArrowFunctionExpression",
          params: map(fromNode)(parameters),
          body: esBody,
          expression: !equals(esBody.type)("BlockStatement")
        };
      })())($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "FunctionExpression",
      patterns: [{
        type: "identifier",
        name: "parameters"
      }, {
        type: "identifier",
        name: "body"
      }]
    });
    if ($result != null$) {
      return (({parameters, body}) => ({
        type: "FunctionExpression",
        params: map(fromNode)(parameters),
        body: {
          type: "BlockStatement",
          body: [{
            type: "ReturnStatement",
            argument: fromNode(body)
          }]
        },
        expression: false
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "GeneratorFunctionDeclaration",
      patterns: [{
        type: "identifier",
        name: "identifier"
      }, {
        type: "identifier",
        name: "parameters"
      }, {
        type: "identifier",
        name: "body"
      }]
    });
    if ($result != null$) {
      return (({identifier, parameters, body}) => ({
        type: "FunctionDeclaration",
        id: fromNode(identifier),
        params: map(fromNode)(parameters),
        body: fromNode(body),
        generator: true
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "Block",
      patterns: [{
        type: "identifier",
        name: "statements"
      }, {
        type: "identifier",
        name: "result"
      }]
    });
    if ($result != null$) {
      return (({statements, result}) => fromBlock(statements)(result))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "BlockStatement",
      patterns: [{
        type: "identifier",
        name: "statements"
      }]
    });
    if ($result != null$) {
      return (({statements}) => ({
        type: "BlockStatement",
        body: map(fromNode)(statements)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "PrefixExpression",
      patterns: [{
        type: "identifier",
        name: "operator"
      }, {
        type: "identifier",
        name: "operand"
      }]
    });
    if ($result != null$) {
      return (({operator, operand}) => ({
        type: "UnaryExpression",
        operator,
        argument: fromNode(operand),
        prefix: true
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "IfStatement",
      patterns: [{
        type: "identifier",
        name: "predicate"
      }, {
        type: "identifier",
        name: "consequent"
      }]
    });
    if ($result != null$) {
      return (({predicate, consequent}) => ({
        type: "IfStatement",
        test: fromNode(predicate),
        consequent: fromNode(consequent),
        alternate: null$
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "IfElseStatement",
      patterns: [{
        type: "identifier",
        name: "predicate"
      }, {
        type: "identifier",
        name: "consequent"
      }, {
        type: "identifier",
        name: "alternative"
      }]
    });
    if ($result != null$) {
      return (({predicate, consequent, alternative}) => ({
        type: "IfStatement",
        test: fromNode(predicate),
        consequent: fromNode(consequent),
        alternate: fromNode(alternative)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "EsOperator",
        patterns: [{
          type: "literal",
          value: "&&"
        }]
      }, {
        type: "identifier",
        name: "left"
      }, {
        type: "identifier",
        name: "right"
      }]
    });
    if ($result != null$) {
      return (({left, right}) => ({
        type: "LogicalExpression",
        operator: "&&",
        left: fromNode(left),
        right: fromNode(right)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "EsOperator",
        patterns: [{
          type: "literal",
          value: "||"
        }]
      }, {
        type: "identifier",
        name: "left"
      }, {
        type: "identifier",
        name: "right"
      }]
    });
    if ($result != null$) {
      return (({left, right}) => ({
        type: "LogicalExpression",
        operator: "||",
        left: fromNode(left),
        right: fromNode(right)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "EsOperator",
        patterns: [{
          type: "identifier",
          name: "operator"
        }]
      }, {
        type: "identifier",
        name: "left"
      }, {
        type: "identifier",
        name: "right"
      }]
    });
    if ($result != null$) {
      return (({operator, left, right}) => ({
        type: "BinaryExpression",
        operator,
        left: fromNode(left),
        right: fromNode(right)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ConditionalExpression",
      patterns: [{
        type: "identifier",
        name: "predicate"
      }, {
        type: "identifier",
        name: "consequent"
      }, {
        type: "identifier",
        name: "alternative"
      }]
    });
    if ($result != null$) {
      return (({predicate, consequent, alternative}) => ({
        type: "ConditionalExpression",
        test: fromNode(predicate),
        consequent: fromNode(consequent),
        alternate: maybe({
          type: "Literal",
          value: undefined
        })(fromNode)(alternative)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "SwitchStatement",
      patterns: [{
        type: "identifier",
        name: "discriminant"
      }, {
        type: "identifier",
        name: "cases"
      }]
    });
    if ($result != null$) {
      return (({discriminant, cases}) => fromSwitchStatement(discriminant)(cases))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "CallExpression",
      patterns: [{
        type: "identifier",
        name: "callee"
      }, {
        type: "identifier",
        name: "arguments"
      }]
    });
    if ($result != null$) {
      return (({callee, arguments: arguments$}) => ({
        type: "CallExpression",
        callee: fromNode(callee),
        arguments: map(fromNode)(arguments$),
        optional: false
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "SpreadElement",
      patterns: [{
        type: "identifier",
        name: "argument"
      }]
    });
    if ($result != null$) {
      return (({argument}) => ({
        type: "SpreadElement",
        argument: fromNode(argument)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ExpressionStatement",
      patterns: [{
        type: "identifier",
        name: "expression"
      }]
    });
    if ($result != null$) {
      return (({expression}) => ({
        type: "ExpressionStatement",
        expression: fromNode(expression)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "VariableDeclaration",
      patterns: [{
        type: "identifier",
        name: "pattern"
      }, {
        type: "identifier",
        name: "expression"
      }]
    });
    if ($result != null$) {
      return (({pattern, expression}) => ({
        type: "VariableDeclaration",
        kind: "const",
        declarations: [{
          type: "VariableDeclarator",
          id: fromNode(pattern),
          init: fromNode(expression)
        }]
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "LetDeclaration",
      patterns: [{
        type: "identifier",
        name: "pattern"
      }, {
        type: "identifier",
        name: "expression"
      }]
    });
    if ($result != null$) {
      return (({pattern, expression}) => ({
        type: "VariableDeclaration",
        kind: "let",
        declarations: [{
          type: "VariableDeclarator",
          id: fromNode(pattern),
          init: fromNode(expression)
        }]
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "Property",
      patterns: [{
        type: "identifier",
        name: "key"
      }, {
        type: "identifier",
        name: "value"
      }]
    });
    if ($result != null$) {
      return (({key, value}) => fromProperty(key)(value))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayPattern",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => ({
        type: "ArrayPattern",
        elements: map(fromNode)(elements)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ObjectPattern",
      patterns: [{
        type: "identifier",
        name: "properties"
      }]
    });
    if ($result != null$) {
      return (({properties}) => ({
        type: "ObjectPattern",
        properties: map(fromNode)(properties)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "RestElement",
      patterns: [{
        type: "identifier",
        name: "argument"
      }]
    });
    if ($result != null$) {
      return (({argument}) => ({
        type: "RestElement",
        argument: fromNode(argument)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ReturnStatement",
      patterns: [{
        type: "identifier",
        name: "argument"
      }]
    });
    if ($result != null$) {
      return (({argument}) => ({
        type: "ReturnStatement",
        argument: fromNode(argument)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "AssignmentExpression",
      patterns: [{
        type: "identifier",
        name: "operator"
      }, {
        type: "identifier",
        name: "left"
      }, {
        type: "identifier",
        name: "right"
      }]
    });
    if ($result != null$) {
      return (({operator, left, right}) => ({
        type: "AssignmentExpression",
        operator,
        left: fromNode(left),
        right: fromNode(right)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "UpdateExpression",
      patterns: [{
        type: "identifier",
        name: "prefix?"
      }, {
        type: "identifier",
        name: "operator"
      }, {
        type: "identifier",
        name: "argument"
      }]
    });
    if ($result != null$) {
      return (({["prefix?"]: prefix$003F, operator, argument}) => ({
        type: "UpdateExpression",
        prefix: prefix$003F,
        operator,
        argument: fromNode(argument)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "WhileStatement",
      patterns: [{
        type: "identifier",
        name: "test"
      }, {
        type: "identifier",
        name: "body"
      }]
    });
    if ($result != null$) {
      return (({test, body}) => ({
        type: "WhileStatement",
        test: fromNode(test),
        body: fromNode(body)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ForStatement",
      patterns: [{
        type: "identifier",
        name: "init"
      }, {
        type: "identifier",
        name: "test"
      }, {
        type: "identifier",
        name: "update"
      }, {
        type: "identifier",
        name: "body"
      }]
    });
    if ($result != null$) {
      return (({init, test, update, body}) => ({
        type: "ForStatement",
        init: fromNode(init),
        test: fromNode(test),
        update: fromNode(update),
        body: fromNode(body)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "BreakStatement",
      patterns: []
    });
    if ($result != null$) {
      return (({}) => ({
        type: "BreakStatement",
        label: null$
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "LabeledStatement",
      patterns: [{
        type: "identifier",
        name: "label"
      }, {
        type: "identifier",
        name: "body"
      }]
    });
    if ($result != null$) {
      return (({label, body}) => ({
        type: "LabeledStatement",
        label: fromNode(label),
        body: fromNode(body)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ContinueStatement",
      patterns: [{
        type: "identifier",
        name: "label"
      }]
    });
    if ($result != null$) {
      return (({label}) => ({
        type: "ContinueStatement",
        label: fromNode(label)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ImportDeclaration",
      patterns: [{
        type: "identifier",
        name: "source"
      }, {
        type: "identifier",
        name: "specifiers"
      }]
    });
    if ($result != null$) {
      return (({source, specifiers}) => ({
        type: "ImportDeclaration",
        specifiers: map(fromNode)(specifiers),
        source: fromNode(source)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ImportDefaultSpecifier",
      patterns: [{
        type: "identifier",
        name: "local"
      }]
    });
    if ($result != null$) {
      return (({local}) => ({
        type: "ImportDefaultSpecifier",
        local: fromNode(local)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ImportNamespaceSpecifier",
      patterns: [{
        type: "identifier",
        name: "local"
      }]
    });
    if ($result != null$) {
      return (({local}) => ({
        type: "ImportNamespaceSpecifier",
        local: fromNode(local)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ImportSpecifier",
      patterns: [{
        type: "identifier",
        name: "imported"
      }, {
        type: "identifier",
        name: "local"
      }]
    });
    if ($result != null$) {
      return (({imported, local}) => ({
        type: "ImportSpecifier",
        imported: fromNode(imported),
        local: fromNode(local)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ExportNamedDeclaration",
      patterns: [{
        type: "identifier",
        name: "specifiers"
      }]
    });
    if ($result != null$) {
      return (({specifiers}) => ({
        type: "ExportNamedDeclaration",
        specifiers: map(fromNode)(specifiers)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ExportDefaultDeclaration",
      patterns: [{
        type: "identifier",
        name: "declaration"
      }]
    });
    if ($result != null$) {
      return (({declaration}) => ({
        type: "ExportDefaultDeclaration",
        declaration: fromNode(declaration)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ExportSpecifier",
      patterns: [{
        type: "identifier",
        name: "local"
      }, {
        type: "identifier",
        name: "exported"
      }]
    });
    if ($result != null$) {
      return (({local, exported}) => ({
        type: "ExportSpecifier",
        local: fromNode(local),
        exported: fromNode(exported)
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "Module",
      patterns: [{
        type: "identifier",
        name: "imports"
      }, {
        type: "identifier",
        name: "exports"
      }, {
        type: "identifier",
        name: "statements"
      }]
    });
    if ($result != null$) {
      return (({imports, exports, statements}) => ({
        type: "Program",
        sourceType: "module",
        body: map(fromNode)(concat(imports)(concat(statements)(exports)))
      }))($result);
    }
  }
})(node);
export default fromNode;
