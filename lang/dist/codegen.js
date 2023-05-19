import {maybe} from "./Maybe.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const not = x => !x;
const charCodeAt = index => string => string.charCodeAt(index);
const toUpper = string => string.toUpperCase();
const replaceAll = pattern => replacement => string => string.replaceAll(pattern, replacement);
const equals = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return ($discriminant => {
      if ($discriminant === "[object Array]") {
        return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
      }
      return false;
    })(globalThis.Object.prototype.toString.call(that));
  }
  if ($discriminant === "[object Object]") {
    return ($discriminant => {
      if ($discriminant === "[object Object]") {
        return typeof$(this$["fantasy-land/equals"]) === "function" ? this$["fantasy-land/equals"](that) : this$ === that;
      }
      return false;
    })(globalThis.Object.prototype.toString.call(that));
  }
  return this$ === that;
})(globalThis.Object.prototype.toString.call(this$));
const concat = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return this$.concat(that);
  }
  if ($discriminant === "[object String]") {
    return this$.concat(that);
  }
  return this$["fantasy-land/concat"](that);
})(globalThis.Object.prototype.toString.call(this$));
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
const RESERVED_WORDS = globalThis.Reflect.construct(Set, [["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void", "while", "with", "yield", "enum", "implements", "interface", "package", "private", "protected", "public", "arguments", "eval"]]);
const validEsIdentifierName = name => (args => target => target.test.apply(target, args))([name])(RegExp("^[$_A-Za-z][$_A-Za-z0-9]*$"));
const fromEscapedIdentifierName = name => ({
  type: "Identifier",
  name
});
const escapeChar = c => concat("$")((args => target => target.padStart.apply(target, args))([4, "0"])(toUpper((args => target => target.toString.apply(target, args))([16])(charCodeAt(0)(c)))));
const escape = name => name === "eval" || name === "import" ? name : RESERVED_WORDS.has(name) ? name + "$" : validEsIdentifierName(name) ? name : replaceAll(RegExp("[^$_A-Za-z0-9]", "g"))(escapeChar)(name);
const fromMember = object => property => ($value => {
  if ($value.$tag === "String" && $value.$size === 1) {
    const value = $value[0];
    return validEsIdentifierName(value) ? {
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
    };
  }
  {
    const property = $value;
    return {
      type: "MemberExpression",
      object: fromNode(object),
      property: fromNode(property),
      computed: true,
      optional: false
    };
  }
})(property);
const fromNode = node => ($value => {
  if ($value.$tag === "Array" && $value.$size === 1) {
    const elements = $value[0];
    return {
      type: "ArrayExpression",
      elements: map(fromNode)(elements)
    };
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      if ($value[1].$tag === "Block" && $value[1].$size === 1) {
        return {
          type: "ArrowFunctionExpression",
          params: map(fromNode)(parameters),
          body: fromNode(body),
          expression: false
        };
      }
    }
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      return {
        type: "ArrowFunctionExpression",
        params: map(fromNode)(parameters),
        body: fromNode(body),
        expression: true
      };
    }
  }
  if ($value.$tag === "AssignmentExpression" && $value.$size === 3) {
    const operator = $value[0];
    {
      const left = $value[1];
      {
        const right = $value[2];
        return {
          type: "AssignmentExpression",
          operator,
          left: fromNode(left),
          right: fromNode(right)
        };
      }
    }
  }
  if ($value.$tag === "Block" && $value.$size === 1) {
    const statements = $value[0];
    return {
      type: "BlockStatement",
      body: map(fromNode)(statements)
    };
  }
  if ($value.$tag === "Boolean" && $value.$size === 1) {
    const value = $value[0];
    return {
      type: "Literal",
      value
    };
  }
  if ($value.$tag === "Break" && $value.$size === 0) {
    return {
      type: "BreakStatement",
      label: null$
    };
  }
  if ($value.$tag === "Call" && $value.$size === 2) {
    const callee = $value[0];
    {
      const arguments$ = $value[1];
      return {
        type: "CallExpression",
        callee: fromNode(callee),
        arguments: map(fromNode)(arguments$),
        optional: false
      };
    }
  }
  if ($value.$tag === "ConditionalExpression" && $value.$size === 3) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      {
        const alternative = $value[2];
        return {
          type: "ConditionalExpression",
          test: fromNode(predicate),
          consequent: fromNode(consequent),
          alternate: fromNode(alternative)
        };
      }
    }
  }
  if ($value.$tag === "ExportDefaultDeclaration" && $value.$size === 1) {
    const declaration = $value[0];
    return {
      type: "ExportDefaultDeclaration",
      declaration: fromNode(declaration)
    };
  }
  if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
    const specifiers = $value[0];
    return {
      type: "ExportNamedDeclaration",
      specifiers: map(fromNode)(specifiers)
    };
  }
  if ($value.$tag === "ExportSpecifier" && $value.$size === 2) {
    const local = $value[0];
    {
      const exported = $value[1];
      return {
        type: "ExportSpecifier",
        local: fromNode(local),
        exported: fromNode(exported)
      };
    }
  }
  if ($value.$tag === "Expression" && $value.$size === 1) {
    const expression = $value[0];
    return {
      type: "ExpressionStatement",
      expression: fromNode(expression)
    };
  }
  if ($value.$tag === "For" && $value.$size === 4) {
    const init = $value[0];
    {
      const test = $value[1];
      {
        const update = $value[2];
        {
          const body = $value[3];
          return {
            type: "ForStatement",
            init: fromNode(init),
            test: fromNode(test),
            update: fromNode(update),
            body: fromNode(body)
          };
        }
      }
    }
  }
  if ($value.$tag === "FunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      return {
        type: "FunctionExpression",
        params: map(fromNode)(parameters),
        body: fromNode(body),
        expression: false
      };
    }
  }
  if ($value.$tag === "Identifier" && $value.$size === 1) {
    const name = $value[0];
    return fromEscapedIdentifierName(escape(name));
  }
  if ($value.$tag === "If" && $value.$size === 3) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      {
        const alternative = $value[2];
        return {
          type: "IfStatement",
          test: fromNode(predicate),
          consequent: fromNode(consequent),
          alternate: maybe(null$)(fromNode)(alternative)
        };
      }
    }
  }
  if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
    const source = $value[0];
    {
      const specifiers = $value[1];
      return {
        type: "ImportDeclaration",
        specifiers: map(fromNode)(specifiers),
        source: fromNode(source)
      };
    }
  }
  if ($value.$tag === "ImportDefaultSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return {
      type: "ImportDefaultSpecifier",
      local: fromNode(local)
    };
  }
  if ($value.$tag === "ImportNamespaceSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return {
      type: "ImportNamespaceSpecifier",
      local: fromNode(local)
    };
  }
  if ($value.$tag === "ImportSpecifier" && $value.$size === 2) {
    const imported = $value[0];
    {
      const local = $value[1];
      return {
        type: "ImportSpecifier",
        imported: fromNode(imported),
        local: fromNode(local)
      };
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    const operator = $value[0];
    {
      const left = $value[1];
      {
        const right = $value[2];
        return ($value => {
          if ($value === ":=") {
            return {
              type: "AssignmentExpression",
              operator: "=",
              left: fromNode(left),
              right: fromNode(right)
            };
          }
          if ($value === "&&") {
            return {
              type: "LogicalExpression",
              operator: "&&",
              left: fromNode(left),
              right: fromNode(right)
            };
          }
          if ($value === "||") {
            return {
              type: "LogicalExpression",
              operator: "||",
              left: fromNode(left),
              right: fromNode(right)
            };
          }
          {
            const operator = $value;
            return {
              type: "BinaryExpression",
              operator,
              left: fromNode(left),
              right: fromNode(right)
            };
          }
        })(operator);
      }
    }
  }
  if ($value.$tag === "Member" && $value.$size === 2) {
    const object = $value[0];
    {
      const property = $value[1];
      return fromMember(object)(property);
    }
  }
  if ($value.$tag === "Module" && $value.$size === 3) {
    const imports = $value[0];
    {
      const exports = $value[1];
      {
        const statements = $value[2];
        return {
          type: "Program",
          sourceType: "module",
          body: map(fromNode)(concat(imports)(concat(statements)(exports)))
        };
      }
    }
  }
  if ($value.$tag === "Number" && $value.$size === 1) {
    const value = $value[0];
    return {
      type: "Literal",
      value
    };
  }
  if ($value.$tag === "Object" && $value.$size === 1) {
    const properties = $value[0];
    return {
      type: "ObjectExpression",
      properties: map(fromNode)(properties)
    };
  }
  if ($value.$tag === "Prefix" && $value.$size === 2) {
    const operator = $value[0];
    {
      const operand = $value[1];
      return {
        type: "UnaryExpression",
        operator,
        argument: fromNode(operand),
        prefix: true
      };
    }
  }
  if ($value.$tag === "Property" && $value.$size === 2) {
    const key = $value[0];
    if ($value[0].$tag === "String" && $value[0].$size === 1) {
      const keyValue = $value[0][0];
      {
        const value = $value[1];
        {
          const computed = not(validEsIdentifierName(keyValue));
          const esKey = computed ? fromNode(key) : fromEscapedIdentifierName(keyValue);
          const esValue = fromNode(value);
          const shorthand = esKey.type === "Identifier" && esValue.type === "Identifier" && equals(esKey.name)(esValue.name);
          return {
            type: "Property",
            key: esKey,
            value: esValue,
            kind: "init",
            method: false,
            shorthand,
            computed
          };
        }
      }
    }
  }
  if ($value.$tag === "Property" && $value.$size === 2) {
    const key = $value[0];
    {
      const value = $value[1];
      {
        const esKey = fromNode(key);
        const esValue = fromNode(value);
        const shorthand = esKey.type === "Identifier" && esValue.type === "Identifier" && equals(esKey.name)(esValue.name);
        return {
          type: "Property",
          key: esKey,
          value: esValue,
          kind: "init",
          method: false,
          shorthand,
          computed: true
        };
      }
    }
  }
  if ($value.$tag === "Return" && $value.$size === 1) {
    const argument = $value[0];
    return {
      type: "ReturnStatement",
      argument: fromNode(argument)
    };
  }
  if ($value.$tag === "Spread" && $value.$size === 1) {
    const argument = $value[0];
    return {
      type: "SpreadElement",
      argument: fromNode(argument)
    };
  }
  if ($value.$tag === "String" && $value.$size === 1) {
    const value = $value[0];
    return {
      type: "Literal",
      value
    };
  }
  if ($value.$tag === "This" && $value.$size === 0) {
    return {
      type: "ThisExpression"
    };
  }
  if ($value.$tag === "Throw" && $value.$size === 1) {
    const argument = $value[0];
    return {
      type: "ThrowStatement",
      argument: fromNode(argument)
    };
  }
  if ($value.$tag === "UpdateExpression" && $value.$size === 3) {
    const prefix$003F = $value[0];
    {
      const operator = $value[1];
      {
        const argument = $value[2];
        return {
          type: "UpdateExpression",
          prefix: prefix$003F,
          operator,
          argument: fromNode(argument)
        };
      }
    }
  }
  if ($value.$tag === "Var" && $value.$size === 3) {
    const kind = $value[0];
    {
      const pattern = $value[1];
      {
        const expression = $value[2];
        return {
          type: "VariableDeclaration",
          kind,
          declarations: [{
            type: "VariableDeclarator",
            id: fromNode(pattern),
            init: fromNode(expression)
          }]
        };
      }
    }
  }
  if ($value.$tag === "VarDeclaration" && $value.$size === 1) {
    const identifier = $value[0];
    return {
      type: "VariableDeclaration",
      kind: "let",
      declarations: [{
        type: "VariableDeclarator",
        id: fromNode(identifier),
        init: null$
      }]
    };
  }
  if ($value.$tag === "While" && $value.$size === 2) {
    const predicate = $value[0];
    {
      const body = $value[1];
      return {
        type: "WhileStatement",
        test: fromNode(predicate),
        body: fromNode(body)
      };
    }
  }
  throw globalThis.Error("Pattern matching failure");
})(node);
export default fromNode;
