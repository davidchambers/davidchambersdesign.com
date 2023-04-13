import {Nothing, Just, maybe} from "./Maybe.js";
import Node from "./Node.js";
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const id = x => x;
const const$ = x => y => x;
const not = x => !x;
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
    default:
      return this$ === that;
  }
})();
const compose = f => g => (() => {
  switch (globalThis.Object.prototype.toString.call(g)) {
    case "[object Function]":
      return x => f(g(x));
    default:
      return g["fantasy-land/compose"](f);
  }
})();
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
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
      return xs["fantasy-land/reduce"](f, y);
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
const of = typeRep => (() => {
  switch (typeRep.name) {
    case "Array":
      return globalThis.Array.of;
    case "Function":
      return x => y => x;
    case "Set":
      return x => globalThis.Reflect.construct(globalThis.Set, [[x]]);
    default:
      return typeRep["fantasy-land/of"];
  }
})();
const append = x => xs => concat(xs)(of(xs.constructor)(x));
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
const RESERVED_WORDS = construct(Set)([["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "enum", "implements", "interface", "package", "private", "protected", "public", "arguments", "eval"]]);
const validEsIdentifierName = name => (args => target => target.test.apply(target, args))([name])(RegExp("^[$_A-Za-z][$_A-Za-z0-9]*$"));
const fromEscapedIdentifierName = name => ({
  type: "Identifier",
  name
});
const fromIdentifier = (() => {
  const escapeChar = c => concat("$")((args => target => target.padStart.apply(target, args))([4, "0"])((args => target => target.toUpperCase.apply(target, args))([])((args => target => target.toString.apply(target, args))([16])((args => target => target.charCodeAt.apply(target, args))([0])(c)))));
  const escape = name => contains(name)(["eval", "import"]) ? name : RESERVED_WORDS.has(name) ? name + "$" : validEsIdentifierName(name) ? name : (args => target => target.replaceAll.apply(target, args))([RegExp("[^$_A-Za-z0-9]", "g"), escapeChar])(name);
  return compose(fromEscapedIdentifierName)(escape);
})();
const TemplateElement = tail => raw => ({
  type: "TemplateElement",
  tail,
  value: {
    raw
  }
});
const fromTemplateLiteral = quasis => expressions => ({
  type: "TemplateLiteral",
  expressions: map(fromNode)(expressions),
  quasis: (() => {
    const lineEnding = (args => target => target.find.apply(target, args))([lineEnding => (args => target => target.startsWith.apply(target, args))([lineEnding])(quasis[0])])(["\n", "\r\n"]);
    return equals(undefined)(lineEnding) ? (() => {
      const quasis$0027 = map((args => target => target.replaceAll.apply(target, args))(["`", "\\`"]))(quasis);
      return [...map(TemplateElement(false))((args => target => target.slice.apply(target, args))([0, -1])(quasis$0027)), ...map(TemplateElement(true))((args => target => target.slice.apply(target, args))([-1])(quasis$0027))];
    })() : (() => {
      const indent = (args => target => target.search.apply(target, args))([RegExp("(?! )")])((args => target => target.slice.apply(target, args))([lineEnding.length])(quasis[0]));
      const pattern = RegExp(lineEnding + "[ ]{0," + indent + "}", "g");
      const [head, ...tail] = map(compose((args => target => target.replaceAll.apply(target, args))(["`", "\\`"]))((args => target => target.replaceAll.apply(target, args))([pattern, lineEnding])))(quasis);
      const head$0027 = (args => target => target.slice.apply(target, args))([lineEnding.length])(head);
      return equals([])(tail) ? [TemplateElement(true)(head$0027)] : [TemplateElement(false)(head$0027), ...map(TemplateElement(false))((args => target => target.slice.apply(target, args))([0, -1])(tail)), ...map(TemplateElement(true))((args => target => target.slice.apply(target, args))([-1])(tail))];
    })();
  })()
});
const fromMemberExpression = object => property => (() => {
  const computed = not(Node.matchOr(const$(false))({
    StringLiteral: validEsIdentifierName
  })(property));
  return {
    type: "MemberExpression",
    object: fromNode(object),
    property: computed ? fromNode(property) : fromEscapedIdentifierName(property.value),
    computed,
    optional: false
  };
})();
const fromProperty = key => value => (() => {
  const computed = not(Node.matchOr(const$(false))({
    StringLiteral: validEsIdentifierName
  })(key));
  const esKey = computed ? fromNode(key) : fromEscapedIdentifierName(key.value);
  const esValue = fromNode(value);
  const shorthand = equals("Identifier")(esKey.type) && equals("Identifier")(esValue.type) && equals(esValue.name)(esKey.name);
  return {
    type: "Property",
    key: esKey,
    value: esValue,
    kind: "init",
    method: false,
    shorthand,
    computed
  };
})();
const fromBlock = statements => result => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: maybe(id)(result => $lhs => concat($lhs)([{
        type: "ReturnStatement",
        argument: fromNode(result)
      }]))(result)(map(fromNode)(statements))
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const fromSwitchCase = predicates => consequent => (() => {
  const toReturnStatement = node => ({
    type: "ReturnStatement",
    argument: fromNode(node)
  });
  return predicates.map((pred, idx, preds) => ({
    type: "SwitchCase",
    test: maybe(null)(fromNode)(pred),
    consequent: idx + 1 < preds.length ? [] : [Node.matchOr(toReturnStatement)({
      Block: statements => result => ({
        type: "BlockStatement",
        body: maybe(id)(compose(append)(toReturnStatement))(result)(map(fromNode)(statements))
      })
    })(consequent)]
  }));
})();
const fromSwitchExpression = discriminant => cases => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "SwitchStatement",
        discriminant: fromNode(discriminant),
        cases: chain(fromNode)(cases)
      }]
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const fromNode = Node.match({
  NullLiteral: {
    type: "Literal",
    value: null
  },
  BooleanLiteral: value => ({
    type: "Literal",
    value
  }),
  NumberLiteral: value => ({
    type: "Literal",
    value
  }),
  StringLiteral: value => ({
    type: "Literal",
    value
  }),
  TemplateLiteral: fromTemplateLiteral,
  MemberExpression: fromMemberExpression,
  Identifier: fromIdentifier,
  ArrayExpression: elements => ({
    type: "ArrayExpression",
    elements: map(fromNode)(elements)
  }),
  ObjectExpression: properties => ({
    type: "ObjectExpression",
    properties: map(fromNode)(properties)
  }),
  ArrowFunctionExpression: parameters => body => (() => {
    const esBody = fromNode(body);
    return {
      type: "ArrowFunctionExpression",
      params: map(fromNode)(parameters),
      body: esBody,
      expression: not(equals("BlockStatement")(esBody.type))
    };
  })(),
  Block: fromBlock,
  PrefixExpression: operator => operand => ({
    type: "UnaryExpression",
    operator,
    argument: fromNode(operand),
    prefix: true
  }),
  InfixExpression: operator => left => right => ({
    type: contains(operator)(["&&", "||", "??"]) ? "LogicalExpression" : "BinaryExpression",
    operator,
    left: fromNode(left),
    right: fromNode(right)
  }),
  ConditionalExpression: predicate => consequent => alternative => ({
    type: "ConditionalExpression",
    test: fromNode(predicate),
    consequent: fromNode(consequent),
    alternate: maybe({
      type: "Literal",
      value: undefined
    })(fromNode)(alternative)
  }),
  SwitchExpression: fromSwitchExpression,
  SwitchCase: fromSwitchCase,
  CallExpression: callee => arguments$ => ({
    type: "CallExpression",
    callee: fromNode(callee),
    arguments: map(fromNode)(arguments$),
    optional: false
  }),
  SpreadElement: argument => ({
    type: "SpreadElement",
    argument: fromNode(argument)
  }),
  ExpressionStatement: expression => ({
    type: "ExpressionStatement",
    expression: fromNode(expression)
  }),
  VariableDeclaration: pattern => expression => ({
    type: "VariableDeclaration",
    kind: "const",
    declarations: [{
      type: "VariableDeclarator",
      id: fromNode(pattern),
      init: fromNode(expression)
    }]
  }),
  Property: fromProperty,
  ArrayPattern: elements => ({
    type: "ArrayPattern",
    elements: map(fromNode)(elements)
  }),
  Elision: null,
  ObjectPattern: properties => ({
    type: "ObjectPattern",
    properties: map(fromNode)(properties)
  }),
  RestElement: argument => ({
    type: "RestElement",
    argument: fromNode(argument)
  }),
  ImportDeclaration: source => specifiers => ({
    type: "ImportDeclaration",
    specifiers: map(fromNode)(specifiers),
    source: fromNode(source)
  }),
  ImportDefaultSpecifier: local => ({
    type: "ImportDefaultSpecifier",
    local: fromNode(local)
  }),
  ImportNamespaceSpecifier: local => ({
    type: "ImportNamespaceSpecifier",
    local: fromNode(local)
  }),
  ImportSpecifier: imported => local => ({
    type: "ImportSpecifier",
    imported: fromNode(imported),
    local: fromNode(local)
  }),
  ExportNamedDeclaration: specifiers => ({
    type: "ExportNamedDeclaration",
    specifiers: map(fromNode)(specifiers)
  }),
  ExportDefaultDeclaration: declaration => ({
    type: "ExportDefaultDeclaration",
    declaration: fromNode(declaration)
  }),
  ExportSpecifier: local => exported => ({
    type: "ExportSpecifier",
    local: fromNode(local),
    exported: fromNode(exported)
  }),
  Module: imports => exports => statements => ({
    type: "Program",
    sourceType: "module",
    body: map(fromNode)(concat(imports)(concat(statements)(exports)))
  })
});
export default fromNode;
