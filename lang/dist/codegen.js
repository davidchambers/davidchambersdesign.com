import Maybe from "./Maybe.js";
import Node from "./Node.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const RESERVED_WORDS = construct(Set)([["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "enum", "implements", "interface", "package", "private", "protected", "public", "arguments", "eval"]]);
const validEsIdentifierName = name => Prelude._apply("test")([name])(RegExp("^[$_A-Za-z][$_A-Za-z0-9]*$"));
const fromEscapedIdentifierName = name => ({
  type: "Identifier",
  name
});
const fromIdentifier = (() => {
  const escapeChar = c => concat("$")(Prelude._apply("padStart")([4, "0"])(Prelude._apply("toUpperCase")([])(Prelude._apply("toString")([16])(Prelude._apply("charCodeAt")([0])(c)))));
  const escape = name => Prelude.equals("import")(name) ? "import" : Prelude._apply("has")([name])(RESERVED_WORDS) ? name + "$" : validEsIdentifierName(name) ? name : Prelude._apply("replaceAll")([apply(["[^$_A-Za-z0-9]", "g"])(RegExp), escapeChar])(name);
  return x => fromEscapedIdentifierName(escape(x));
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
  expressions: Prelude.map(fromNode)(expressions),
  quasis: (() => {
    const lineEnding = Prelude._apply("find")([lineEnding => Prelude._apply("startsWith")([lineEnding])(quasis[0])])(["\n", "\r\n"]);
    return Prelude.equals(undefined)(lineEnding) ? (() => {
      const quasis$0027 = Prelude.map(Prelude._apply("replaceAll")(["`", "\\`"]))(quasis);
      return [...Prelude.map(TemplateElement(false))(Prelude._apply("slice")([0, -1])(quasis$0027)), ...Prelude.map(TemplateElement(true))(Prelude._apply("slice")([-1])(quasis$0027))];
    })() : (() => {
      const indent = Prelude._apply("search")([RegExp("(?! )")])(Prelude._apply("slice")([lineEnding.length])(quasis[0]));
      const pattern = apply([lineEnding + "[ ]{0," + indent + "}", "g"])(RegExp);
      const [head, ...tail] = Prelude.map(x => Prelude._apply("replaceAll")(["`", "\\`"])(Prelude._apply("replaceAll")([pattern, lineEnding])(x)))(quasis);
      const head$0027 = Prelude._apply("slice")([lineEnding.length])(head);
      return Prelude.equals([])(tail) ? [TemplateElement(true)(head$0027)] : [TemplateElement(false)(head$0027), ...Prelude.map(TemplateElement(false))(Prelude._apply("slice")([0, -1])(tail)), ...Prelude.map(TemplateElement(true))(Prelude._apply("slice")([-1])(tail))];
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
  elements: Prelude.map(fromNode)(elements)
});
const fromProperty = key => value => (() => {
  const computed = not(match$0027(Node)(const$(false))({
    StringLiteral: validEsIdentifierName
  })(key));
  const esKey = computed ? fromNode(key) : fromEscapedIdentifierName(key.value);
  const esValue = fromNode(value);
  const shorthand = Prelude.equals("Identifier")(esKey.type) && Prelude.equals("Identifier")(esValue.type) && Prelude.equals(esValue.name)(esKey.name);
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
  properties: Prelude.map(fromNode)(properties)
});
const fromArrowFunctionExpression = parameters => body => (() => {
  const esBody = fromNode(body);
  return {
    type: "ArrowFunctionExpression",
    params: Prelude.map(fromNode)(parameters),
    body: esBody,
    expression: Prelude.not(Prelude.equals("BlockStatement")(esBody.type))
  };
})();
const fromBlockExpression = statements => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: match(Node)({
        VariableDeclaration: pattern => expression => init => Prelude.map(fromNode)(Prelude.concat(init)(Node.VariableDeclaration(pattern)(expression))),
        FunctionDeclaration: name => parameters => body => init => Prelude.concat(Prelude.map(fromNode)(Prelude.concat(init)(Node.FunctionDeclaration(name)(parameters)(body))))([{
          type: "ReturnStatement",
          argument: {
            type: "Identifier",
            name
          }
        }]),
        ExpressionStatement: expression => init => Prelude.concat(Prelude.map(fromNode)(init))([{
          type: "ReturnStatement",
          argument: fromNode(expression)
        }])
      })(Prelude._apply("at")([-1])(statements))(Prelude._apply("slice")([0, -1])(statements))
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
  operator: (() => {
    switch (operator) {
      case "and":
        return "&&";
      case "or":
        return "||";
      case "??":
        return "??";
    }
  })(),
  left: fromNode(left),
  right: fromNode(right)
});
const fromConditionalExpression = predicate => consequent => alternative => ({
  type: "ConditionalExpression",
  test: fromNode(predicate),
  consequent: fromNode(consequent),
  alternate: fromNode(alternative)
});
const fromSwitchCase = consequent => predicate => ({
  type: "SwitchCase",
  test: Maybe.maybe(null)(fromNode)(predicate),
  consequent: Maybe.maybe([])(Array.of)(map(argument => ({
    type: "ReturnStatement",
    argument
  }))(map(fromNode)(consequent)))
});
const fromSwitchCases = predicates => consequent => (() => {
  const init = Prelude._apply("slice")([0, -1])(predicates);
  const last = Prelude._apply("at")([-1])(predicates);
  return Prelude.concat(map(fromSwitchCase(Maybe.Nothing))(init))([fromSwitchCase(Maybe.Just(consequent))(last)]);
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
        cases: Prelude.chain(fromNode)(cases)
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
  arguments: Prelude.map(fromNode)(arguments$),
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
      expression: Prelude.not(Prelude.equals("BlockStatement")(esBody.type))
    }))(fromNode(body))(parameters)
  }]
});
const fromExpressionStatement = expression => ({
  type: "ExpressionStatement",
  expression: fromNode(expression)
});
const fromArrayPattern = elements => ({
  type: "ArrayPattern",
  elements: Prelude.map(fromNode)(elements)
});
const fromObjectPattern = properties => ({
  type: "ObjectPattern",
  properties: Prelude.map(fromNode)(properties)
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
  specifiers: Prelude.map(fromNode)(specifiers)
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
const fromImportSpecifier = local => imported => ({
  type: "ImportSpecifier",
  local: fromNode(local),
  imported: fromNode(imported)
});
const fromImportDeclaration = source => specifiers => ({
  type: "ImportDeclaration",
  specifiers: Prelude.map(fromNode)(specifiers),
  source: fromNode(source)
});
const fromModule = imports => exports => statements => ({
  type: "Program",
  sourceType: "module",
  body: Prelude.map(fromNode)(Prelude.concat(imports)(Prelude.concat(statements)(exports)))
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
