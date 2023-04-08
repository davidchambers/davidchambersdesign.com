import {Nothing, Just, maybe} from "./Maybe.js";
import Node from "./Node.js";
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const match = type => match$0027(type)(x => CasesNotExhaustive);
const match$0027 = type => type[globalThis.Symbol.for("match")];
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
const reduceRight = f => y => x => x.reduceRight((y, x) => f(y)(x), y);
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
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
  return $ => fromEscapedIdentifierName(escape($));
})();
const fromLiteral = value => ({
  type: "Literal",
  value
});
const fromElision = null;
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
      const [head, ...tail] = map($ => (args => target => target.replaceAll.apply(target, args))(["`", "\\`"])((args => target => target.replaceAll.apply(target, args))([pattern, lineEnding])($)))(quasis);
      const head$0027 = (args => target => target.slice.apply(target, args))([lineEnding.length])(head);
      return equals([])(tail) ? [TemplateElement(true)(head$0027)] : [TemplateElement(false)(head$0027), ...map(TemplateElement(false))((args => target => target.slice.apply(target, args))([0, -1])(tail)), ...map(TemplateElement(true))((args => target => target.slice.apply(target, args))([-1])(tail))];
    })();
  })()
});
const fromMemberExpression = object => property => (() => {
  const computed = not(match$0027(Node)(const$(false))({
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
const fromSpreadElement = argument => ({
  type: "SpreadElement",
  argument: fromNode(argument)
});
const fromArrayExpression = elements => ({
  type: "ArrayExpression",
  elements: map(fromNode)(elements)
});
const fromProperty = key => value => (() => {
  const computed = not(match$0027(Node)(const$(false))({
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
const fromObjectExpression = properties => ({
  type: "ObjectExpression",
  properties: map(fromNode)(properties)
});
const fromArrowFunctionExpression = parameters => body => (() => {
  const esBody = fromNode(body);
  return {
    type: "ArrowFunctionExpression",
    params: map(fromNode)(parameters),
    body: esBody,
    expression: not(equals("BlockStatement")(esBody.type))
  };
})();
const fromBlockExpression = statements => result => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: concat(map(fromNode)(statements))([{
        type: "ReturnStatement",
        argument: fromNode(result)
      }])
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const fromBlockStatement = statements => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: map(fromNode)(statements)
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const fromUnaryExpression = operator => argument => ({
  type: "UnaryExpression",
  operator,
  argument: fromNode(argument),
  prefix: true
});
const fromBinaryExpression = operator => left => right => ({
  type: "BinaryExpression",
  operator,
  left: fromNode(left),
  right: fromNode(right)
});
const fromLogicalExpression = operator => left => right => ({
  type: "LogicalExpression",
  operator,
  left: fromNode(left),
  right: fromNode(right)
});
const fromConditionalExpression = predicate => consequent => alternative => ({
  type: "ConditionalExpression",
  test: fromNode(predicate),
  consequent: fromNode(consequent),
  alternate: maybe(fromLiteral(undefined))(fromNode)(alternative)
});
const fromSwitchCase = consequent => predicate => ({
  type: "SwitchCase",
  test: maybe(null)(fromNode)(predicate),
  consequent: (() => {
    const toReturnStatement = node => ({
      type: "ReturnStatement",
      argument: fromNode(node)
    });
    const toConsequent = match$0027(Node)(toReturnStatement)({
      BlockExpression: statements => result => ({
        type: "BlockStatement",
        body: concat(map(fromNode)(statements))([toReturnStatement(result)])
      })
    });
    return maybe([])($ => Array.of(toConsequent($)))(consequent);
  })()
});
const fromSwitchCases = predicates => consequent => (() => {
  const init = (args => target => target.slice.apply(target, args))([0, -1])(predicates);
  const last = (args => target => target.at.apply(target, args))([-1])(predicates);
  return concat(map(fromSwitchCase(Nothing))(init))([fromSwitchCase(Just(consequent))(last)]);
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
const fromCallExpression = callee => arguments$ => ({
  type: "CallExpression",
  callee: fromNode(callee),
  arguments: map(fromNode)(arguments$),
  optional: false
});
const fromVariableDeclaration = pattern => expression => ({
  type: "VariableDeclaration",
  kind: "const",
  declarations: [{
    type: "VariableDeclarator",
    id: fromNode(pattern),
    init: fromNode(expression)
  }]
});
const fromFunctionDeclaration = name => parameters => body => ({
  type: "VariableDeclaration",
  kind: "const",
  declarations: [{
    type: "VariableDeclarator",
    id: fromIdentifier(name),
    init: reduceRight(esBody => param => ({
      type: "ArrowFunctionExpression",
      params: [fromNode(param)],
      body: esBody,
      expression: not(equals("BlockStatement")(esBody.type))
    }))(fromNode(body))(parameters)
  }]
});
const fromExpressionStatement = expression => ({
  type: "ExpressionStatement",
  expression: fromNode(expression)
});
const fromArrayPattern = elements => ({
  type: "ArrayPattern",
  elements: map(fromNode)(elements)
});
const fromObjectPattern = properties => ({
  type: "ObjectPattern",
  properties: map(fromNode)(properties)
});
const fromRestElement = argument => ({
  type: "RestElement",
  argument: fromNode(argument)
});
const fromExportDefaultDeclaration = declaration => ({
  type: "ExportDefaultDeclaration",
  declaration: fromNode(declaration)
});
const fromExportNamedDeclaration = specifiers => ({
  type: "ExportNamedDeclaration",
  specifiers: map(fromNode)(specifiers)
});
const fromExportSpecifier = local => exported => ({
  type: "ExportSpecifier",
  local: fromNode(local),
  exported: fromNode(exported)
});
const fromImportDefaultSpecifier = local => ({
  type: "ImportDefaultSpecifier",
  local: fromNode(local)
});
const fromImportNamespaceSpecifier = local => ({
  type: "ImportNamespaceSpecifier",
  local: fromNode(local)
});
const fromImportSpecifier = imported => local => ({
  type: "ImportSpecifier",
  imported: fromNode(imported),
  local: fromNode(local)
});
const fromImportDeclaration = source => specifiers => ({
  type: "ImportDeclaration",
  specifiers: map(fromNode)(specifiers),
  source: fromNode(source)
});
const fromModule = imports => exports => statements => ({
  type: "Program",
  sourceType: "module",
  body: map(fromNode)(concat(imports)(concat(statements)(exports)))
});
const fromNode = match(Node)({
  NullLiteral: fromLiteral(null),
  BooleanLiteral: fromLiteral,
  NumberLiteral: fromLiteral,
  StringLiteral: fromLiteral,
  TemplateLiteral: fromTemplateLiteral,
  MemberExpression: fromMemberExpression,
  Identifier: fromIdentifier,
  ArrayExpression: fromArrayExpression,
  ObjectExpression: fromObjectExpression,
  ArrowFunctionExpression: fromArrowFunctionExpression,
  BlockExpression: fromBlockExpression,
  BlockStatement: fromBlockStatement,
  UnaryExpression: fromUnaryExpression,
  BinaryExpression: fromBinaryExpression,
  LogicalExpression: fromLogicalExpression,
  ConditionalExpression: fromConditionalExpression,
  SwitchExpression: fromSwitchExpression,
  SwitchCase: fromSwitchCases,
  CallExpression: fromCallExpression,
  SpreadElement: fromSpreadElement,
  ExpressionStatement: fromExpressionStatement,
  VariableDeclaration: fromVariableDeclaration,
  FunctionDeclaration: fromFunctionDeclaration,
  Property: fromProperty,
  ArrayPattern: fromArrayPattern,
  Elision: fromElision,
  ObjectPattern: fromObjectPattern,
  RestElement: fromRestElement,
  ImportDeclaration: fromImportDeclaration,
  ImportDefaultSpecifier: fromImportDefaultSpecifier,
  ImportNamespaceSpecifier: fromImportNamespaceSpecifier,
  ImportSpecifier: fromImportSpecifier,
  ExportNamedDeclaration: fromExportNamedDeclaration,
  ExportDefaultDeclaration: fromExportDefaultDeclaration,
  ExportSpecifier: fromExportSpecifier,
  Module: fromModule
});
export default fromNode;
