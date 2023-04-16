import List, {Nil} from "./List.js";
import {maybe} from "./Maybe.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
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
const empty = typeRep => (() => {
  switch (typeRep.name) {
    case "Array":
      return [];
    case "Object":
      return {};
    case "String":
      return "";
    case "Set":
      return globalThis.Reflect.construct(globalThis.Set, [[]]);
    case "Map":
      return globalThis.Reflect.construct(globalThis.Map, [[]]);
    default:
      return typeRep["fantasy-land/empty"]();
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
const filter = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [filter(f)([...xs])]);
    default:
      return xs["fantasy-land/filter"](f);
  }
})();
const reject = f => filter(x => !f(x));
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const flip = f => y => x => f(x)(y);
const pure = typeRep => (() => {
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
const emptyVariables = {
  declared: Nil,
  referenced: Nil
};
const without = lhs => rhs => reject($lhs => contains($lhs)(rhs))(lhs);
const merge = lhs => rhs => ({
  declared: concat(lhs.declared)(rhs.declared),
  referenced: concat(lhs.referenced)(rhs.referenced)
});
const mergeAll = reduce(merge)(emptyVariables);
const vars = node => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "data",
      tag: "ArrayExpression",
      patterns: [{
        type: "identifier",
        name: "properties"
      }]
    });
    if ($result != null$) {
      return (({properties}) => mergeAll(map(vars)(properties)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayPattern",
      patterns: [{
        type: "identifier",
        name: "properties"
      }]
    });
    if ($result != null$) {
      return (({properties}) => mergeAll(map(vars)(properties)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrowAssignmentStatement",
      patterns: [{
        type: "identifier",
        name: "pattern"
      }, {
        type: "identifier",
        name: "expression"
      }]
    });
    if ($result != null$) {
      return (({pattern, expression}) => merge({
        declared: vars(pattern).referenced,
        referenced: Nil
      })(vars(expression)))($result);
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
      return (({parameters, body}) => ({
        declared: Nil,
        referenced: without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced)
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
      return (({operator, left, right}) => merge(vars(left))(vars(right)))($result);
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
      return (({statements, result}) => (() => {
        const {declared, referenced} = maybe(id)(merge)(map(vars)(result))(mergeAll(map(vars)(statements)));
        return {
          declared: Nil,
          referenced: without(referenced)(declared)
        };
      })())($result);
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
      return (({statements}) => (() => {
        const {declared, referenced} = mergeAll(map(vars)(statements));
        return {
          declared: Nil,
          referenced: without(referenced)(declared)
        };
      })())($result);
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
      return (({callee, arguments: arguments$}) => merge(vars(callee))(mergeAll(map(vars)(arguments$))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "CaseClause",
      patterns: [{
        type: "identifier",
        name: "predicate"
      }, {
        type: "identifier",
        name: "consequent"
      }]
    });
    if ($result != null$) {
      return (({predicate, consequent}) => vars(consequent))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "CaseExpression",
      patterns: [{
        type: "identifier",
        name: "discriminant"
      }, {
        type: "identifier",
        name: "cases"
      }]
    });
    if ($result != null$) {
      return (({discriminant, cases}) => merge(vars(discriminant))(mergeAll(map(vars)(cases))))($result);
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
      return (({predicate, consequent, alternative}) => merge(merge(vars(predicate))(vars(consequent)))(maybe(emptyVariables)(vars)(alternative)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "DataConstructorDefinition",
      patterns: [{
        type: "identifier",
        name: "identifier"
      }, {
        type: "identifier",
        name: "parameters"
      }]
    });
    if ($result != null$) {
      return (({identifier, parameters}) => vars(identifier))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "DataTypeDeclaration",
      patterns: [{
        type: "identifier",
        name: "identifier"
      }, {
        type: "identifier",
        name: "constructors"
      }, {
        type: "identifier",
        name: "implementations"
      }]
    });
    if ($result != null$) {
      return (({identifier, constructors, implementations}) => ({
        declared: mergeAll(map(vars)(constructors)).referenced,
        referenced: Nil
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "DoBlockExpression",
      patterns: [{
        type: "identifier",
        name: "operations"
      }, {
        type: "identifier",
        name: "result"
      }]
    });
    if ($result != null$) {
      return (({operations, result}) => merge(mergeAll(map(vars)(operations)))(vars(result)))($result);
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
      return (({declaration}) => vars(declaration))($result);
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
      return (({specifiers}) => mergeAll(map(vars)(specifiers)))($result);
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
      return (({local, exported}) => vars(local))($result);
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
      return (({expression}) => vars(expression))($result);
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
      return (({init, test, update, body}) => merge(merge(merge(vars(init))(vars(test)))(vars(update)))(vars(body)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "FunctionDeclaration",
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
        declared: vars(identifier).referenced,
        referenced: without(without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced))(vars(identifier).referenced)
      }))($result);
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
        declared: Nil,
        referenced: without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced)
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
        declared: vars(identifier).referenced,
        referenced: without(without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced))(vars(identifier).referenced)
      }))($result);
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
      return (({name}) => ({
        declared: Nil,
        referenced: pure(List)(name)
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
      return (({predicate, consequent, alternative}) => merge(merge(vars(predicate))(vars(consequent)))(vars(alternative)))($result);
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
      return (({predicate, consequent}) => merge(vars(predicate))(vars(consequent)))($result);
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
      return (({source, specifiers}) => mergeAll(map(vars)(specifiers)))($result);
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
        declared: vars(local).referenced,
        referenced: Nil
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
        declared: vars(local).referenced,
        referenced: Nil
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
        declared: vars(local).referenced,
        referenced: Nil
      }))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixCallExpression",
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
      return (({operator, left, right}) => merge(vars(left))(vars(right)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
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
      return (({operator, left, right}) => merge(vars(left))(vars(right)))($result);
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
      return (({label, body}) => vars(body))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "LambdaCaseExpression",
      patterns: [{
        type: "identifier",
        name: "cases"
      }]
    });
    if ($result != null$) {
      return (({cases}) => mergeAll(map(vars)(cases)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "LeftSection",
      patterns: [{
        type: "identifier",
        name: "operator"
      }, {
        type: "identifier",
        name: "operand"
      }]
    });
    if ($result != null$) {
      return (({operator, operand}) => vars(operand))($result);
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
      return (({pattern, expression}) => (() => {
        const declared = vars(pattern).referenced;
        return {
          declared,
          referenced: without(vars(expression).referenced)(declared)
        };
      })())($result);
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
      return (({object, property}) => merge(vars(object))(vars(property)))($result);
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
      return (({imports, exports, statements}) => merge(merge(mergeAll(map(vars)(imports)))(mergeAll(map(vars)(exports))))(mergeAll(map(vars)(statements))))($result);
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
      return (({properties}) => mergeAll(map(vars)(properties)))($result);
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
      return (({properties}) => mergeAll(map(vars)(properties)))($result);
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
      return (({operator, operand}) => vars(operand))($result);
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
      return (({key, value}) => merge(vars(key))(vars(value)))($result);
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
      return (({argument}) => vars(argument))($result);
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
      return (({argument}) => vars(argument))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "RightSection",
      patterns: [{
        type: "identifier",
        name: "operator"
      }, {
        type: "identifier",
        name: "operand"
      }]
    });
    if ($result != null$) {
      return (({operator, operand}) => vars(operand))($result);
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
      return (({argument}) => vars(argument))($result);
    }
  }
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
      return (({predicates, statements}) => merge(mergeAll(map(maybe(emptyVariables)(vars))(predicates)))(mergeAll(map(vars)(statements))))($result);
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
      return (({discriminant, cases}) => merge(vars(discriminant))(mergeAll(map(vars)(cases))))($result);
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
      return (({pattern, expression}) => (() => {
        const declared = vars(pattern).referenced;
        return {
          declared,
          referenced: without(vars(expression).referenced)(declared)
        };
      })())($result);
    }
  }
  {
    const $result = $match({
      type: "any"
    });
    if ($result != null$) {
      return (({}) => emptyVariables)($result);
    }
  }
})(node);
export default function (node) {
  return (() => {
    const {declared, referenced} = vars(node);
    const add$0021 = set => x => set.add(x);
    return {
      declared: reduce(add$0021)(empty(Set))(declared),
      referenced: reduce(add$0021)(empty(Set))(referenced)
    };
  })();
}
