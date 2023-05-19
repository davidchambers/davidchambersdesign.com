import {Array, ArrowFunctionExpression, Call, ConditionalExpression, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, Expression, Identifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Infix, Member, Module, Object, Prefix, Property, Spread, Var, vars} from "./InternalNode.js";
import convert from "./convert.js";
import desugar from "./desugar.js";
import globals from "./globals.js";
import Prelude from "./prelude.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const joinWith = separator => xs => xs.join(separator);
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
const chain = f => x => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return x.flatMap(x => f(x));
  }
  if ($discriminant === "[object Function]") {
    return y => x(f(y))(y);
  }
  return x["fantasy-land/chain"](f);
})(globalThis.Object.prototype.toString.call(x));
const preludeNames = globalThis.Reflect.construct(Set, [globalThis.Object.keys(Prelude)]);
const removeUnreferencedPreludeFunctions = module => (() => {
  const $0 = vars(module);
  const declared = $0.declared;
  const referenced = $0.referenced;
  const unreferenced = reject($rhs => referenced.has($rhs))(declared);
  const statements = reject($ => ($value => {
    if ($value.$tag === "Var" && $value.$size === 3) {
      if ($value[1].$tag === "Identifier" && $value[1].$size === 1) {
        const name = $value[1][0];
        return unreferenced.has(name) && preludeNames.has(name);
      }
    }
    return false;
    throw globalThis.Error("Pattern matching failure");
  })($))(module.statements);
  return equals(statements.length)(module.statements.length) ? module : removeUnreferencedPreludeFunctions(Module(module.imports)(module.exports)(statements));
})();
const rewriteModule = module => {
  const module$0027 = convert(desugar(module));
  const rename = reduce(rename => $ => ($value => {
    if ($value.$tag === "Var" && $value.$size === 3) {
      const pattern = $value[1];
      return updateRenamerFromPattern(rename)(pattern);
    }
    return rename;
    throw globalThis.Error("Pattern matching failure");
  })($))(id)(module$0027.statements);
  const rename$0027 = reduce(rename => $ => ($value => {
    if ($value.$tag === "ImportSpecifier" && $value.$size === 2) {
      if ($value[0].$tag === "Identifier" && $value[0].$size === 1) {
        const imported = $value[0][0];
        if ($value[1].$tag === "Identifier" && $value[1].$size === 1) {
          const local = $value[1][0];
          return name => equals(name)(imported) ? local : rename(name);
        }
      }
    }
    if ($value.$tag === "ImportNamespaceSpecifier" && $value.$size === 1) {
      const local = $value[0];
      return updateRenamerFromPattern(rename)(local);
    }
    if ($value.$tag === "ImportDefaultSpecifier" && $value.$size === 1) {
      const local = $value[0];
      return updateRenamerFromPattern(rename)(local);
    }
    throw globalThis.Error("Pattern matching failure");
  })($))(rename)(chain($ => $.specifiers)(module$0027.imports));
  const module$0027$0027 = renameIdentifiers(rename$0027)(module$0027);
  const prelude = map($ => ($value => {
    if (globalThis.Array.isArray($value)) {
      if ($value.length === 2) {
        const name = $value[0];
        {
          const value = $value[1];
          return Var("const")(Identifier(name))(value);
        }
      }
    }
    throw globalThis.Error("Pattern matching failure");
  })($))(globalThis.Object.entries(Prelude));
  const module$0027$0027$0027 = Module(module$0027$0027.imports)(module$0027$0027.exports)(concat(prelude)(module$0027$0027.statements));
  const module$0027$0027$0027$0027 = removeUnreferencedPreludeFunctions(module$0027$0027$0027);
  const declared = vars(module$0027$0027$0027$0027).declared;
  const referenced = vars(module$0027$0027$0027$0027).referenced;
  const unreferenced = reject($rhs => referenced.has($rhs))(declared);
  const undeclared = reject($rhs => declared.has($rhs))(referenced);
  const ignored = globalThis.Reflect.construct(Set, [["Deno", "DivisionByZero", "import", "console", "fetch", "window"]]);
  const undeclared$0027 = reject($rhs => ignored.has($rhs))(reject($rhs => globals.has($rhs))(undeclared));
  unreferenced.size > 0 ? console.error(concat("unreferenced: ")(joinWith(", ")(globalThis.Array.from(unreferenced)))) : undefined;
  undeclared$0027.size > 0 ? console.error(concat("undeclared: ")(joinWith(", ")(globalThis.Array.from(undeclared$0027)))) : undefined;
  return module$0027$0027$0027$0027;
};
const updateRenamerFromPattern = rename => pattern => ($value => {
  if ($value.$tag === "Identifier" && $value.$size === 1) {
    const name = $value[0];
    return preludeNames.has(name) ? s => equals(s)(name) ? "$" + s : rename(s) : rename;
  }
  if ($value.$tag === "Property" && $value.$size === 2) {
    const key = $value[0];
    {
      const value = $value[1];
      return updateRenamerFromPattern(rename)(value);
    }
  }
  throw globalThis.Error("Pattern matching failure");
})(pattern);
const renameIdentifiers = rename => node => ($value => {
  if ($value.$tag === "Identifier" && $value.$size === 1) {
    const name = $value[0];
    return Identifier(rename(name));
  }
  if ($value.$tag === "ImportSpecifier" && $value.$size === 2) {
    const imported = $value[0];
    {
      const local = $value[1];
      return ImportSpecifier(imported)(renameIdentifiers(rename)(local));
    }
  }
  if ($value.$tag === "ExportSpecifier" && $value.$size === 2) {
    const local = $value[0];
    {
      const exported = $value[1];
      return ExportSpecifier(renameIdentifiers(rename)(local))(exported);
    }
  }
  if ($value.$tag === "Array" && $value.$size === 1) {
    const elements = $value[0];
    return Array(map(renameIdentifiers(rename))(elements));
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      return ArrowFunctionExpression(map(renameIdentifiers(rename))(parameters))(renameIdentifiers(rename)(body));
    }
  }
  if ($value.$tag === "Call" && $value.$size === 2) {
    const callee = $value[0];
    {
      const arguments$ = $value[1];
      return Call(renameIdentifiers(rename)(callee))(map(renameIdentifiers(rename))(arguments$));
    }
  }
  if ($value.$tag === "ConditionalExpression" && $value.$size === 3) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      {
        const alternative = $value[2];
        return ConditionalExpression(renameIdentifiers(rename)(predicate))(renameIdentifiers(rename)(consequent))(renameIdentifiers(rename)(alternative));
      }
    }
  }
  if ($value.$tag === "ExportDefaultDeclaration" && $value.$size === 1) {
    const declaration = $value[0];
    return ExportDefaultDeclaration(renameIdentifiers(rename)(declaration));
  }
  if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
    const specifiers = $value[0];
    return ExportNamedDeclaration(map(renameIdentifiers(rename))(specifiers));
  }
  if ($value.$tag === "Expression" && $value.$size === 1) {
    const expression = $value[0];
    return Expression(renameIdentifiers(rename)(expression));
  }
  if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
    const source = $value[0];
    {
      const specifiers = $value[1];
      return ImportDeclaration(source)(map(renameIdentifiers(rename))(specifiers));
    }
  }
  if ($value.$tag === "ImportDefaultSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return ImportDefaultSpecifier(renameIdentifiers(rename)(local));
  }
  if ($value.$tag === "ImportNamespaceSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return ImportNamespaceSpecifier(renameIdentifiers(rename)(local));
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    const operator = $value[0];
    {
      const left = $value[1];
      {
        const right = $value[2];
        return Infix(operator)(renameIdentifiers(rename)(left))(renameIdentifiers(rename)(right));
      }
    }
  }
  if ($value.$tag === "Member" && $value.$size === 2) {
    const object = $value[0];
    {
      const property = $value[1];
      return Member(renameIdentifiers(rename)(object))(renameIdentifiers(rename)(property));
    }
  }
  if ($value.$tag === "Module" && $value.$size === 3) {
    const imports = $value[0];
    {
      const exports = $value[1];
      {
        const statements = $value[2];
        return Module(map(renameIdentifiers(rename))(imports))(map(renameIdentifiers(rename))(exports))(map(renameIdentifiers(rename))(statements));
      }
    }
  }
  if ($value.$tag === "Object" && $value.$size === 1) {
    const properties = $value[0];
    return Object(map(renameIdentifiers(rename))(properties));
  }
  if ($value.$tag === "Prefix" && $value.$size === 2) {
    const operator = $value[0];
    {
      const operand = $value[1];
      return Prefix(operator)(renameIdentifiers(rename)(operand));
    }
  }
  if ($value.$tag === "Property" && $value.$size === 2) {
    const key = $value[0];
    {
      const value = $value[1];
      return Property(renameIdentifiers(rename)(key))(renameIdentifiers(rename)(value));
    }
  }
  if ($value.$tag === "Spread" && $value.$size === 1) {
    const argument = $value[0];
    return Spread(renameIdentifiers(rename)(argument));
  }
  if ($value.$tag === "Var" && $value.$size === 3) {
    const kind = $value[0];
    {
      const pattern = $value[1];
      {
        const expression = $value[2];
        return Var(kind)(renameIdentifiers(rename)(pattern))(renameIdentifiers(rename)(expression));
      }
    }
  }
  {
    const node = $value;
    return node;
  }
})(node);
export default rewriteModule;
