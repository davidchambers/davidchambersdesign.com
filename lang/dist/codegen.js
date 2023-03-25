import {attemptP, parallel, reject, resolve} from "fluture";
import * as Set from "./Set.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
const RESERVED_WORDS = Set.from(["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "enum", "implements", "interface", "package", "private", "protected", "public", "arguments", "eval"]);
const validEsIdentifierName = name => Prelude._apply("test")([name])(RegExp("^[$_A-Za-z][$_A-Za-z0-9]*$"));
const esFromIdentifierName = (() => {
  const escapeChar = c => concat("$")(Prelude._apply("padStart")([4, "0"])(Prelude._apply("toUpperCase")([])(Prelude._apply("toString")([16])(Prelude._apply("charCodeAt")([0])(c)))));
  const escape = name => Prelude._apply("has")([name])(RESERVED_WORDS) ? name + "$" : validEsIdentifierName(name) ? name : Prelude._apply("replaceAll")([apply(["[^$_A-Za-z0-9]", "g"])(RegExp), escapeChar])(name);
  return x => esFromEscapedIdentifierName(escape(x));
})();
const esFromEscapedIdentifierName = name => ({
  type: "Identifier",
  name
});
const esFromNullLiteral = {
  type: "Literal",
  value: null
};
const esFromLiteral = ({value}) => ({
  type: "Literal",
  value
});
const esFromMetaProperty = ({meta, property}) => ({
  type: "MetaProperty",
  meta: esFromEscapedIdentifierName(meta),
  property: esFromEscapedIdentifierName(property)
});
const esFromIdentifier = ({name}) => esFromIdentifierName(name);
const esFromElision = null;
const TemplateElement = tail => raw => ({
  type: "TemplateElement",
  tail,
  value: {
    raw
  }
});
const esFromTemplateLiteral = ({expressions, quasis}) => ({
  type: "TemplateLiteral",
  expressions: Prelude.map(esFromNode)(expressions),
  quasis: (() => {
    const lineEnding = Prelude._apply("find")([lineEnding => Prelude._apply("startsWith")([lineEnding])(quasis[0])])(["\n", "\r\n"]);
    return lineEnding === undefined ? [...Prelude.map(TemplateElement(false))(Prelude._apply("slice")([0, -1])(quasis)), ...Prelude.map(TemplateElement(true))(Prelude._apply("slice")([-1])(quasis))] : (() => {
      const indent = Prelude._apply("search")([RegExp("(?! )")])(Prelude._apply("slice")([lineEnding.length])(quasis[0]));
      const pattern = apply([`${lineEnding}[ ]{0,${indent}}`, "g"])(RegExp);
      const [head, ...tail] = Prelude.map(Prelude._apply("replace")([pattern, lineEnding]))(quasis);
      const head$0027 = Prelude._apply("slice")([lineEnding.length])(head);
      return tail.length === 0 ? [TemplateElement(true)(head$0027)] : [TemplateElement(false)(head$0027), ...Prelude.map(TemplateElement(false))(Prelude._apply("slice")([0, -1])(tail)), ...Prelude.map(TemplateElement(true))(Prelude._apply("slice")([-1])(tail))];
    })();
  })()
});
const esFromMemberExpression = ({object, property}) => (() => {
  const computed = not(property.type === "StringLiteral" && validEsIdentifierName(property.value));
  return {
    type: "MemberExpression",
    object: esFromNode(object),
    property: computed ? esFromNode(property) : esFromEscapedIdentifierName(property.value),
    computed,
    optional: false
  };
})();
const esFromSpreadElement = ({argument}) => ({
  type: "SpreadElement",
  argument: esFromNode(argument)
});
const esFromArrayExpression = ({elements}) => ({
  type: "ArrayExpression",
  elements: Prelude.map(esFromNode)(elements)
});
const esFromProperty = property => property.type === "SpreadElement" ? esFromSpreadElement(property) : (() => {
  const computed = not(property.key.type === "StringLiteral" && validEsIdentifierName(property.key.value));
  const key = computed ? esFromNode(property.key) : esFromEscapedIdentifierName(property.key.value);
  const value = esFromNode(property.value);
  const shorthand = key.type === "Identifier" && value.type === "Identifier" && key.name === value.name;
  return {
    type: "Property",
    key,
    value,
    kind: "init",
    method: false,
    shorthand,
    computed
  };
})();
const esFromObjectExpression = ({properties}) => ({
  type: "ObjectExpression",
  properties: Prelude.map(esFromProperty)(properties)
});
const esFromArrowFunctionExpression = ({parameters, body}) => (() => {
  const esBody = esFromNode(body);
  return {
    type: "ArrowFunctionExpression",
    params: Prelude.map(esFromNode)(parameters),
    body: esBody,
    expression: esBody.type !== "BlockStatement"
  };
})();
const esFromBlockExpression = ({statements}) => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: (() => {
        switch ((x => x.type)(Prelude._apply("at")([-1])(statements))) {
          case "VariableDeclaration":
            return [...Prelude.map(esFromNode)(statements)];
          case "FunctionDeclaration":
            return [...Prelude.map(esFromNode)(statements), {
              type: "ReturnStatement",
              argument: {
                type: "Identifier",
                name: (x => x.name)(Prelude._apply("at")([-1])(statements))
              }
            }];
          case "ExpressionStatement":
            return [...Prelude.map(esFromNode)(Prelude._apply("slice")([0, -1])(statements)), {
              type: "ReturnStatement",
              argument: esFromNode((x => x.expression)(Prelude._apply("at")([-1])(statements)))
            }];
        }
      })()
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const esFromUnaryExpression = ({operator, argument}) => ({
  type: "UnaryExpression",
  operator,
  argument: esFromNode(argument),
  prefix: true
});
const esFromBinaryExpression = ({operator, left, right}) => ({
  type: "BinaryExpression",
  operator: (() => {
    switch (operator) {
      case "is":
        return "===";
      case "isnt":
        return "!==";
      default:
        return operator;
    }
  })(),
  left: esFromNode(left),
  right: esFromNode(right)
});
const esFromLogicalExpression = ({operator, left, right}) => ({
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
  left: esFromNode(left),
  right: esFromNode(right)
});
const esFromConditionalExpression = ({predicate, consequent, alternative}) => ({
  type: "ConditionalExpression",
  test: esFromNode(predicate),
  consequent: esFromNode(consequent),
  alternate: esFromNode(alternative)
});
const esFromSwitchCase = ({predicates, consequent}) => Prelude.map(predicate => ({
  type: "SwitchCase",
  test: esFromNode(predicate),
  consequent: [{
    type: "ReturnStatement",
    argument: esFromNode(consequent)
  }]
}))(predicates);
const esFromSwitchExpression = ({discriminant, cases, default: default$}) => ({
  type: "CallExpression",
  callee: {
    type: "ArrowFunctionExpression",
    params: [],
    body: {
      type: "BlockStatement",
      body: [{
        type: "SwitchStatement",
        discriminant: esFromNode(discriminant),
        cases: (() => {
          const esCases = Prelude.chain(esFromSwitchCase)(cases);
          return default$ === null ? esCases : [...esCases, {
            type: "SwitchCase",
            test: null,
            consequent: [{
              type: "ReturnStatement",
              argument: esFromNode(default$)
            }]
          }];
        })()
      }]
    },
    expression: false
  },
  arguments: [],
  optional: false
});
const esFromCallExpression = ({callee, arguments: args}) => ({
  type: "CallExpression",
  callee: esFromNode(callee),
  arguments: Prelude.map(esFromNode)(args),
  optional: false
});
const esFromVariableDeclaration = ({pattern, expression}) => ({
  type: "VariableDeclaration",
  kind: "const",
  declarations: [{
    type: "VariableDeclarator",
    id: esFromNode(pattern),
    init: esFromNode(expression)
  }]
});
const esFromFunctionDeclaration = ({name, parameters, body}) => ({
  type: "VariableDeclaration",
  kind: "const",
  declarations: [{
    type: "VariableDeclarator",
    id: esFromIdentifierName(name),
    init: Prelude._apply("reduceRight")([(esBody, param) => ({
      type: "ArrowFunctionExpression",
      params: [esFromNode(param)],
      body: esBody,
      expression: esBody.type !== "BlockStatement"
    }), esFromNode(body)])(parameters)
  }]
});
const esFromExpressionStatement = ({expression}) => ({
  type: "ExpressionStatement",
  expression: esFromNode(expression)
});
const esFromArrayPattern = ({elements}) => ({
  type: "ArrayPattern",
  elements: Prelude.map(esFromNode)(elements)
});
const esFromObjectPattern = ({properties}) => ({
  type: "ObjectPattern",
  properties: Prelude.map(esFromNode)(properties)
});
const esFromRestElement = ({argument}) => ({
  type: "RestElement",
  argument: esFromNode(argument)
});
const esFromExportDefaultDeclaration = ({declaration}) => ({
  type: "ExportDefaultDeclaration",
  declaration: esFromNode(declaration)
});
const esFromExportNamedDeclaration = ({specifiers}) => ({
  type: "ExportNamedDeclaration",
  specifiers: Prelude.map(specifier => ({
    type: "ExportSpecifier",
    local: esFromNode(specifier),
    exported: esFromNode(specifier)
  }))(specifiers)
});
const esFromImportExpression = ({source}) => ({
  type: "ImportExpression",
  source: esFromNode(source)
});
const esFromImportDeclaration = exportedNames => importDeclaration => importDeclaration.specifiers === "*" ? (() => {
  const source = importDeclaration.source.value;
  const hiding = Prelude.map(x => x.name)(importDeclaration.hiding);
  const hiding$0021 = Set.from(Prelude.map(x => x.name)(importDeclaration.hiding));
  const visible = name => not(Prelude._apply("delete")([name])(hiding$0021));
  return Prelude._apply("endsWith")([".serif"])(source) ? (() => {
    const names = Prelude._apply("filter")([visible])(exportedNames(source));
    return hiding$0021.size > 0 ? reject(unnecessaryHiding(source)(hiding)(Array.from(hiding$0021))) : resolve({
      type: "ImportDeclaration",
      specifiers: Prelude.map(name => ({
        type: "ImportSpecifier",
        local: esFromIdentifierName(name),
        imported: esFromIdentifierName(name)
      }))(names),
      source: {
        type: "Literal",
        value: Prelude._apply("replace")([RegExp("[.]serif$"), ".js"])(source)
      }
    });
  })() : chain(names => hiding$0021.size > 0 ? reject(unnecessaryHiding(source)(hiding)(Array.from(hiding$0021))) : resolve({
    type: "ImportDeclaration",
    specifiers: Prelude.map(name => ({
      type: "ImportSpecifier",
      local: esFromEscapedIdentifierName(name),
      imported: esFromEscapedIdentifierName(name)
    }))(names),
    source: {
      type: "Literal",
      value: source
    }
  }))(map(Prelude._apply("filter")([visible]))(map(Object.keys)(attemptP(() => import(source)))));
})() : resolve({
  type: "ImportDeclaration",
  specifiers: Prelude.map(specifier => (() => {
    switch (specifier.type) {
      case "ImportDefaultSpecifier":
        return {
          type: "ImportDefaultSpecifier",
          local: esFromIdentifier(specifier.local)
        };
      case "ImportNamespaceSpecifier":
        return {
          type: "ImportNamespaceSpecifier",
          local: esFromIdentifier(specifier.local)
        };
      case "ImportSpecifier":
        return {
          type: "ImportSpecifier",
          local: esFromIdentifier(specifier.local),
          imported: esFromIdentifier(specifier.imported)
        };
    }
  })())(importDeclaration.specifiers),
  source: {
    type: "Literal",
    value: Prelude._apply("replace")([RegExp("[.]serif$"), ".js"])(importDeclaration.source.value)
  }
});
const esFromNode = expr => (() => {
  switch (expr.type) {
    case "NullLiteral":
      return esFromNullLiteral;
    case "BooleanLiteral":
      return esFromLiteral(expr);
    case "NumberLiteral":
      return esFromLiteral(expr);
    case "StringLiteral":
      return esFromLiteral(expr);
    case "TemplateLiteral":
      return esFromTemplateLiteral(expr);
    case "MetaProperty":
      return esFromMetaProperty(expr);
    case "MemberExpression":
      return esFromMemberExpression(expr);
    case "Identifier":
      return esFromIdentifier(expr);
    case "ArrayExpression":
      return esFromArrayExpression(expr);
    case "ObjectExpression":
      return esFromObjectExpression(expr);
    case "ArrowFunctionExpression":
      return esFromArrowFunctionExpression(expr);
    case "BlockExpression":
      return esFromBlockExpression(expr);
    case "UnaryExpression":
      return esFromUnaryExpression(expr);
    case "BinaryExpression":
      return esFromBinaryExpression(expr);
    case "LogicalExpression":
      return esFromLogicalExpression(expr);
    case "ConditionalExpression":
      return esFromConditionalExpression(expr);
    case "SwitchExpression":
      return esFromSwitchExpression(expr);
    case "CallExpression":
      return esFromCallExpression(expr);
    case "SpreadElement":
      return esFromSpreadElement(expr);
    case "ExpressionStatement":
      return esFromExpressionStatement(expr);
    case "VariableDeclaration":
      return esFromVariableDeclaration(expr);
    case "FunctionDeclaration":
      return esFromFunctionDeclaration(expr);
    case "Property":
      return esFromProperty(expr);
    case "ArrayPattern":
      return esFromArrayPattern(expr);
    case "Elision":
      return esFromElision;
    case "ObjectPattern":
      return esFromObjectPattern(expr);
    case "RestElement":
      return esFromRestElement(expr);
    case "ExportNamedDeclaration":
      return esFromExportNamedDeclaration(expr);
    case "ExportDefaultDeclaration":
      return esFromExportDefaultDeclaration(expr);
    case "ImportExpression":
      return esFromImportExpression(expr);
  }
})();
const unnecessaryHiding = source => hiding => names => Error(`import * from "${source}" hiding {${Prelude._apply("join")([", "])(hiding)}};\n\n${names.length > 2 ? `${Prelude._apply("join")([", "])(Prelude._apply("slice")([0, -1])(names))}, and ${Prelude._apply("at")([-1])(names)}` : Prelude._apply("join")([" and "])(names)} ${names.length === 1 ? "is" : "are"} not exported so need not be hidden.\n`);
const toModule = module => exportedNames => map(imports => ({
  type: "Program",
  sourceType: "module",
  body: [...imports, ...Prelude.chain(statement => (() => {
    switch (statement.type) {
      case "VariableDeclaration":
        return [esFromNode(statement)];
      case "FunctionDeclaration":
        return [esFromNode(statement)];
      case "ExpressionStatement":
        return [esFromNode(statement)];
      default:
        return [];
    }
  })())(module.statements), ...Prelude.map(statement => (() => {
    switch (statement.type) {
      case "ExportNamedDeclaration":
        return esFromExportNamedDeclaration(statement);
      case "ExportDefaultDeclaration":
        return esFromExportDefaultDeclaration(statement);
    }
  })())(module.exports)]
}))(parallel(16)(map(esFromImportDeclaration(exportedNames))(module.imports)));
export {toModule};
