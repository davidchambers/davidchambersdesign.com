import List, {Nil} from "./List.js";
import {maybe} from "./Maybe.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
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
const reduce = f => y => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.reduce((y, x) => f(y)(x), y);
  }
  return xs["fantasy-land/reduce"]((y, x) => f(y)(x), y);
})(globalThis.Object.prototype.toString.call(xs));
const filter = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.filter(x => f(x));
  }
  if ($discriminant === "[object Set]") {
    return globalThis.Reflect.construct(globalThis.Set, [filter(f)([...xs])]);
  }
  return xs["fantasy-land/filter"](f);
})(globalThis.Object.prototype.toString.call(xs));
const reject = f => filter(x => !f(x));
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
const flip = f => y => x => f(x)(y);
const pure = typeRep => ($discriminant => {
  if ($discriminant === "Array") {
    return globalThis.Array.of;
  }
  if ($discriminant === "Function") {
    return x => y => x;
  }
  if ($discriminant === "Set") {
    return x => globalThis.Reflect.construct(globalThis.Set, [[x]]);
  }
  return typeRep["fantasy-land/of"];
})(typeRep.name);
const contains = this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these);
const $prototype = {};
const Array = elements => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Array",
  $size: 1,
  [0]: elements,
  elements
});
const ArrowAssignmentStatement = pattern => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ArrowAssignmentStatement",
  $size: 2,
  [0]: pattern,
  [1]: expression,
  pattern,
  expression
});
const ArrowFunctionExpression = parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ArrowFunctionExpression",
  $size: 2,
  [0]: parameters,
  [1]: body,
  parameters,
  body
});
const Block = statements => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Block",
  $size: 1,
  [0]: statements,
  statements
});
const Boolean = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Boolean",
  $size: 1,
  [0]: value,
  value
});
const Call = callee => arguments$ => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Call",
  $size: 2,
  [0]: callee,
  [1]: arguments$,
  callee,
  arguments: arguments$
});
const CaseClause = predicate => consequent => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "CaseClause",
  $size: 2,
  [0]: predicate,
  [1]: consequent,
  predicate,
  consequent
});
const CaseExpression = discriminant => cases => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "CaseExpression",
  $size: 2,
  [0]: discriminant,
  [1]: cases,
  discriminant,
  cases
});
const ConditionalExpression = predicate => consequent => alternative => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ConditionalExpression",
  $size: 3,
  [0]: predicate,
  [1]: consequent,
  [2]: alternative,
  predicate,
  consequent,
  alternative
});
const DataConstructorDefinition = identifier => parameters => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "DataConstructorDefinition",
  $size: 2,
  [0]: identifier,
  [1]: parameters,
  identifier,
  parameters
});
const DataConstructorPattern = identifier => arguments$ => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "DataConstructorPattern",
  $size: 2,
  [0]: identifier,
  [1]: arguments$,
  identifier,
  arguments: arguments$
});
const DataTypeDeclaration = identifier => constructors => implementations => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "DataTypeDeclaration",
  $size: 3,
  [0]: identifier,
  [1]: constructors,
  [2]: implementations,
  identifier,
  constructors,
  implementations
});
const DoBlockExpression = operations => result => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "DoBlockExpression",
  $size: 2,
  [0]: operations,
  [1]: result,
  operations,
  result
});
const EmptySection = operator => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "EmptySection",
  $size: 1,
  [0]: operator,
  operator
});
const ExportAllSpecifier = hiding => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ExportAllSpecifier",
  $size: 1,
  [0]: hiding,
  hiding
});
const ExportDefaultDeclaration = declaration => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ExportDefaultDeclaration",
  $size: 1,
  [0]: declaration,
  declaration
});
const ExportNamedDeclaration = specifiers => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ExportNamedDeclaration",
  $size: 1,
  [0]: specifiers,
  specifiers
});
const ExportSpecifier = local => exported => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ExportSpecifier",
  $size: 2,
  [0]: local,
  [1]: exported,
  local,
  exported
});
const Expression = expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Expression",
  $size: 1,
  [0]: expression,
  expression
});
const FunctionDeclaration = identifier => parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "FunctionDeclaration",
  $size: 3,
  [0]: identifier,
  [1]: parameters,
  [2]: body,
  identifier,
  parameters,
  body
});
const FunctionExpression = parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "FunctionExpression",
  $size: 2,
  [0]: parameters,
  [1]: body,
  parameters,
  body
});
const Identifier = name => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Identifier",
  $size: 1,
  [0]: name,
  name
});
const If = predicate => consequent => alternative => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "If",
  $size: 3,
  [0]: predicate,
  [1]: consequent,
  [2]: alternative,
  predicate,
  consequent,
  alternative
});
const ImportAllSpecifier = hiding => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ImportAllSpecifier",
  $size: 1,
  [0]: hiding,
  hiding
});
const ImportDeclaration = source => specifiers => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ImportDeclaration",
  $size: 2,
  [0]: source,
  [1]: specifiers,
  source,
  specifiers
});
const ImportDefaultSpecifier = local => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ImportDefaultSpecifier",
  $size: 1,
  [0]: local,
  local
});
const ImportNamespaceSpecifier = local => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ImportNamespaceSpecifier",
  $size: 1,
  [0]: local,
  local
});
const ImportSpecifier = imported => local => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "ImportSpecifier",
  $size: 2,
  [0]: imported,
  [1]: local,
  imported,
  local
});
const Infix = operator => left => right => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Infix",
  $size: 3,
  [0]: operator,
  [1]: left,
  [2]: right,
  operator,
  left,
  right
});
const InfixCall = operator => left => right => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "InfixCall",
  $size: 3,
  [0]: operator,
  [1]: left,
  [2]: right,
  operator,
  left,
  right
});
const LambdaCase = cases => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "LambdaCase",
  $size: 1,
  [0]: cases,
  cases
});
const LeftSection = operator => operand => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "LeftSection",
  $size: 2,
  [0]: operator,
  [1]: operand,
  operator,
  operand
});
const LetBinding = index => pattern => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "LetBinding",
  $size: 3,
  [0]: index,
  [1]: pattern,
  [2]: expression,
  index,
  pattern,
  expression
});
const LetExpression = bindings => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "LetExpression",
  $size: 2,
  [0]: bindings,
  [1]: expression,
  bindings,
  expression
});
const Member = object => property => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Member",
  $size: 2,
  [0]: object,
  [1]: property,
  object,
  property
});
const MethodCall = name => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "MethodCall",
  $size: 1,
  [0]: name,
  name
});
const Module = imports => exports => statements => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Module",
  $size: 3,
  [0]: imports,
  [1]: exports,
  [2]: statements,
  imports,
  exports,
  statements
});
const Number = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Number",
  $size: 1,
  [0]: value,
  value
});
const Object = properties => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Object",
  $size: 1,
  [0]: properties,
  properties
});
const Prefix = operator => operand => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Prefix",
  $size: 2,
  [0]: operator,
  [1]: operand,
  operator,
  operand
});
const Property = key => value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Property",
  $size: 2,
  [0]: key,
  [1]: value,
  key,
  value
});
const PropertyAccessor = identifiers => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "PropertyAccessor",
  $size: 1,
  [0]: identifiers,
  identifiers
});
const Quasiquotation = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Quasiquotation",
  $size: 1,
  [0]: value,
  value
});
const Return = argument => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Return",
  $size: 1,
  [0]: argument,
  argument
});
const RightSection = operator => operand => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "RightSection",
  $size: 2,
  [0]: operator,
  [1]: operand,
  operator,
  operand
});
const Spread = argument => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Spread",
  $size: 1,
  [0]: argument,
  argument
});
const String = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "String",
  $size: 1,
  [0]: value,
  value
});
const This = globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "This",
  $size: 0
});
const Var = kind => pattern => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Var",
  $size: 3,
  [0]: kind,
  [1]: pattern,
  [2]: expression,
  kind,
  pattern,
  expression
});
const VarDeclaration = identifier => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "VarDeclaration",
  $size: 1,
  [0]: identifier,
  identifier
});
const While = predicate => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "While",
  $size: 2,
  [0]: predicate,
  [1]: body,
  predicate,
  body
});
const vars = (() => {
  const emptyVariables = {
    declared: Nil,
    referenced: Nil
  };
  const without = lhs => rhs => reject(flip(contains)(rhs))(lhs);
  const merge = lhs => rhs => ({
    declared: concat(lhs.declared)(rhs.declared),
    referenced: concat(lhs.referenced)(rhs.referenced)
  });
  const mergeAll = reduce(merge)(emptyVariables);
  const vars = $ => ($value => {
    if ($value.$tag === "Array" && $value.$size === 1) {
      const properties = $value[0];
      return mergeAll(map(vars)(properties));
    }
    if ($value.$tag === "ArrowAssignmentStatement" && $value.$size === 2) {
      const pattern = $value[0];
      {
        const expression = $value[1];
        return merge({
          declared: ($ => $.referenced)(vars(pattern)),
          referenced: Nil
        })(vars(expression));
      }
    }
    if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
      const parameters = $value[0];
      {
        const body = $value[1];
        return {
          declared: Nil,
          referenced: without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced)
        };
      }
    }
    if ($value.$tag === "Block" && $value.$size === 1) {
      const statements = $value[0];
      return (() => {
        const $0 = mergeAll(map(vars)(statements));
        const declared = $0.declared;
        const referenced = $0.referenced;
        return {
          declared: Nil,
          referenced: without(referenced)(declared)
        };
      })();
    }
    if ($value.$tag === "Call" && $value.$size === 2) {
      const callee = $value[0];
      {
        const arguments$ = $value[1];
        return merge(vars(callee))(mergeAll(map(vars)(arguments$)));
      }
    }
    if ($value.$tag === "CaseClause" && $value.$size === 2) {
      const consequent = $value[1];
      return vars(consequent);
    }
    if ($value.$tag === "CaseExpression" && $value.$size === 2) {
      const discriminant = $value[0];
      {
        const cases = $value[1];
        return merge(vars(discriminant))(mergeAll(map(vars)(cases)));
      }
    }
    if ($value.$tag === "ConditionalExpression" && $value.$size === 3) {
      const predicate = $value[0];
      {
        const consequent = $value[1];
        {
          const alternative = $value[2];
          return merge(merge(vars(predicate))(vars(consequent)))(vars(alternative));
        }
      }
    }
    if ($value.$tag === "DataConstructorDefinition" && $value.$size === 2) {
      if ($value[0].$tag === "Identifier" && $value[0].$size === 1) {
        const name = $value[0][0];
        return {
          declared: Nil,
          referenced: pure(List)(name)
        };
      }
    }
    if ($value.$tag === "DataTypeDeclaration" && $value.$size === 3) {
      const identifier = $value[0];
      {
        const constructors = $value[1];
        {
          const implementations = $value[2];
          return {
            declared: ($ => $.referenced)(mergeAll(map(vars)(constructors))),
            referenced: Nil
          };
        }
      }
    }
    if ($value.$tag === "DoBlockExpression" && $value.$size === 2) {
      const operations = $value[0];
      {
        const result = $value[1];
        return merge(mergeAll(map(vars)(operations)))(vars(result));
      }
    }
    if ($value.$tag === "ExportDefaultDeclaration" && $value.$size === 1) {
      const declaration = $value[0];
      return vars(declaration);
    }
    if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
      const specifiers = $value[0];
      return mergeAll(map(vars)(specifiers));
    }
    if ($value.$tag === "ExportSpecifier" && $value.$size === 2) {
      const local = $value[0];
      {
        const exported = $value[1];
        return vars(local);
      }
    }
    if ($value.$tag === "Expression" && $value.$size === 1) {
      const expression = $value[0];
      return vars(expression);
    }
    if ($value.$tag === "FunctionDeclaration" && $value.$size === 3) {
      if ($value[0].$tag === "Identifier" && $value[0].$size === 1) {
        const name = $value[0][0];
        {
          const parameters = $value[1];
          {
            const body = $value[2];
            return {
              declared: pure(List)(name),
              referenced: reject($lhs => equals($lhs)(name))(without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced))
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
          declared: Nil,
          referenced: without(vars(body).referenced)(mergeAll(map(vars)(parameters)).referenced)
        };
      }
    }
    if ($value.$tag === "Identifier" && $value.$size === 1) {
      const name = $value[0];
      return {
        declared: Nil,
        referenced: pure(List)(name)
      };
    }
    if ($value.$tag === "If" && $value.$size === 3) {
      const predicate = $value[0];
      {
        const consequent = $value[1];
        {
          const alternative = $value[2];
          return merge(merge(vars(predicate))(vars(consequent)))(maybe(emptyVariables)(vars)(alternative));
        }
      }
    }
    if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
      const specifiers = $value[1];
      return mergeAll(map(vars)(specifiers));
    }
    if ($value.$tag === "ImportDefaultSpecifier" && $value.$size === 1) {
      const local = $value[0];
      return {
        declared: ($ => $.referenced)(vars(local)),
        referenced: Nil
      };
    }
    if ($value.$tag === "ImportNamespaceSpecifier" && $value.$size === 1) {
      const local = $value[0];
      return {
        declared: ($ => $.referenced)(vars(local)),
        referenced: Nil
      };
    }
    if ($value.$tag === "ImportSpecifier" && $value.$size === 2) {
      const imported = $value[0];
      {
        const local = $value[1];
        return {
          declared: ($ => $.referenced)(vars(local)),
          referenced: Nil
        };
      }
    }
    if ($value.$tag === "Infix" && $value.$size === 3) {
      const left = $value[1];
      {
        const right = $value[2];
        return merge(vars(left))(vars(right));
      }
    }
    if ($value.$tag === "InfixCall" && $value.$size === 3) {
      const left = $value[1];
      {
        const right = $value[2];
        return merge(vars(left))(vars(right));
      }
    }
    if ($value.$tag === "LambdaCase" && $value.$size === 1) {
      const cases = $value[0];
      return mergeAll(map(vars)(cases));
    }
    if ($value.$tag === "LetExpression" && $value.$size === 2) {
      const bindings = $value[0];
      {
        const expression = $value[1];
        return (() => {
          const $0 = merge(vars(expression))(mergeAll(map($ => ($value => {
            if ($value.$tag === "LetBinding" && $value.$size === 3) {
              if ($value[1].$tag === "Identifier" && $value[1].$size === 1) {
                const name = $value[1][0];
                {
                  const expression = $value[2];
                  return merge({
                    declared: pure(List)(name),
                    referenced: Nil
                  })(vars(expression));
                }
              }
            }
            if ($value.$tag === "LetBinding" && $value.$size === 3) {
              if ($value[1].$tag === "Object" && $value[1].$size === 1) {
                const expression = $value[2];
                return vars(expression);
              }
            }
            if ($value.$tag === "LetBinding" && $value.$size === 2) {
              if ($value[0].$tag === "Identifier" && $value[0].$size === 1) {
                const name = $value[0][0];
                {
                  const expression = $value[1];
                  return merge({
                    declared: pure(List)(name),
                    referenced: Nil
                  })(vars(expression));
                }
              }
            }
            if ($value.$tag === "LetBinding" && $value.$size === 2) {
              if ($value[0].$tag === "Object" && $value[0].$size === 1) {
                const properties = $value[0][0];
                {
                  const expression = $value[1];
                  return vars(expression);
                }
              }
            }
            throw globalThis.Error("Pattern matching failure");
          })($))(bindings)));
          const declared = $0.declared;
          const referenced = $0.referenced;
          return {
            declared: Nil,
            referenced: without(referenced)(declared)
          };
        })();
      }
    }
    if ($value.$tag === "Member" && $value.$size === 2) {
      const object = $value[0];
      {
        const property = $value[1];
        return merge(vars(object))(vars(property));
      }
    }
    if ($value.$tag === "Module" && $value.$size === 3) {
      const imports = $value[0];
      {
        const exports = $value[1];
        {
          const statements = $value[2];
          return merge(merge(mergeAll(map(vars)(imports)))(mergeAll(map(vars)(exports))))(mergeAll(map(vars)(statements)));
        }
      }
    }
    if ($value.$tag === "Object" && $value.$size === 1) {
      const properties = $value[0];
      return mergeAll(map(vars)(properties));
    }
    if ($value.$tag === "Prefix" && $value.$size === 2) {
      const operand = $value[1];
      return vars(operand);
    }
    if ($value.$tag === "Property" && $value.$size === 2) {
      const key = $value[0];
      {
        const value = $value[1];
        return merge(vars(key))(vars(value));
      }
    }
    if ($value.$tag === "Return" && $value.$size === 1) {
      const argument = $value[0];
      return vars(argument);
    }
    if ($value.$tag === "Spread" && $value.$size === 1) {
      const argument = $value[0];
      return vars(argument);
    }
    if ($value.$tag === "Var" && $value.$size === 3) {
      const pattern = $value[1];
      {
        const expression = $value[2];
        {
          const declared = ($ => $.referenced)(vars(pattern));
          return {
            declared,
            referenced: without(vars(expression).referenced)(declared)
          };
        }
      }
    }
    if ($value.$tag === "VarDeclaration" && $value.$size === 1) {
      if ($value[0].$tag === "Identifier" && $value[0].$size === 1) {
        const name = $value[0][0];
        return {
          declared: pure(List)(name),
          referenced: Nil
        };
      }
    }
    if ($value.$tag === "While" && $value.$size === 2) {
      const predicate = $value[0];
      {
        const body = $value[1];
        return merge(vars(predicate))(vars(body));
      }
    }
    return emptyVariables;
    throw globalThis.Error("Pattern matching failure");
  })($);
  return node => (() => {
    const $0 = vars(node);
    const declared = $0.declared;
    const referenced = $0.referenced;
    const add$0021 = set => x => set.add(x);
    return {
      declared: reduce(add$0021)(globalThis.Reflect.construct(Set, [[]]))(declared),
      referenced: reduce(add$0021)(globalThis.Reflect.construct(Set, [[]]))(referenced)
    };
  })();
})();
export {Array, ArrowAssignmentStatement, ArrowFunctionExpression, Block, Boolean, Call, CaseClause, CaseExpression, ConditionalExpression, DataConstructorDefinition, DataConstructorPattern, DataTypeDeclaration, DoBlockExpression, EmptySection, ExportAllSpecifier, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, Expression, FunctionDeclaration, FunctionExpression, Identifier, If, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Infix, InfixCall, LambdaCase, LeftSection, LetBinding, LetExpression, Member, MethodCall, Module, Number, Object, Prefix, Property, PropertyAccessor, Quasiquotation, Return, RightSection, Spread, String, This, Var, VarDeclaration, While, vars};
