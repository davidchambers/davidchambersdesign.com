import {Array, ArrowFunctionExpression, Block, Boolean, Call, ConditionalExpression, DataConstructorPattern, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, Expression, FunctionExpression, Identifier, If, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Infix, Member, Module, Number, Object, Prefix, Property, Return, Spread, String, This, Throw, Var, While} from "./InternalNode.js";
import {Nothing} from "./Maybe.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
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
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
const $0023$value = Identifier("$value");
const $0023globalThis = Identifier("globalThis");
const $0027$size = String("$size");
const $0027$tag = String("$tag");
const $0027Array = String("Array");
const $0027Error = String("Error");
const $0027Reflect = String("Reflect");
const $0027at = String("at");
const $0027construct = String("construct");
const $0027isArray = String("isArray");
const $0027length = String("length");
const $0027slice = String("slice");
const If$0027 = predicate => statements => If(predicate)(Block(statements))(Nothing);
const codeForPattern = pattern => $0023value => consequent => ($value => {
  if ($value.$tag === "Any" && $value.$size === 0) {
    return consequent;
  }
  if ($value.$tag === "As" && $value.$size === 2) {
    const name = $value[0];
    {
      const pattern = $value[1];
      return Block([Var("const")(Identifier(name))($0023value), codeForPattern(pattern)($0023value)(consequent)]);
    }
  }
  {
    const bool = $value;
    if ($value.$tag === "Boolean" && $value.$size === 1) {
      return If$0027(Infix("===")($0023value)(bool))([consequent]);
    }
  }
  {
    const number = $value;
    if ($value.$tag === "Number" && $value.$size === 1) {
      return If$0027(Infix("===")($0023value)(number))([consequent]);
    }
  }
  {
    const string = $value;
    if ($value.$tag === "String" && $value.$size === 1) {
      return If$0027(Infix("===")($0023value)(string))([consequent]);
    }
  }
  if ($value.$tag === "Identifier" && $value.$size === 1) {
    const name = $value[0];
    return Block([Var("const")(Identifier(name))($0023value), consequent]);
  }
  if ($value.$tag === "Data" && $value.$size === 2) {
    const name = $value[0];
    {
      const patterns = $value[1];
      return If$0027(Infix("&&")(Infix("===")(Member($0023value)($0027$tag))(String(name)))(Infix("===")(Member($0023value)($0027$size))(Number(patterns.length))))([reduce(take => pattern => take(index => wrap => give => give(index + 1)($ => wrap(codeForPattern(pattern)(Member($0023value)(Number(index)))($)))))(give => give(0)(id))(patterns)(index => wrap => wrap(consequent))]);
    }
  }
  if ($value.$tag === "Array" && $value.$size === 1) {
    const patterns = $value[0];
    {
      const count = reduce(count => $ => ($value => {
        if ($value.$tag === "Slice" && $value.$size === 1) {
          return count + 1;
        }
        return count;
        throw globalThis.Error("Pattern matching failure");
      })($))(0)(patterns);
      return If$0027(Call(Member(Member($0023globalThis)($0027Array))($0027isArray))([$0023value]))([If$0027(count === 1 ? Infix(">=")(Member($0023value)($0027length))(Number(patterns.length - count)) : Infix("===")(Member($0023value)($0027length))(Number(patterns.length)))([reduce(take => pattern => take(index => after => wrap => give => ($value => {
        if ($value.$tag === "Slice" && $value.$size === 1) {
          const identifier = $value[0];
          return give(index + 1)(true)($ => wrap(codeForPattern(identifier)(Call(Member($0023value)($0027slice))(equals(index + 1)(patterns.length) ? [Number(index)] : [Number(index), Number(index + 1 - patterns.length)]))($)));
        }
        {
          const pattern = $value;
          return give(index + 1)(after)($ => wrap(codeForPattern(pattern)(after ? Call(Member($0023value)($0027at))([Number(index - patterns.length)]) : Member($0023value)(Number(index)))($)));
        }
      })(pattern)))(give => give(0)(false)(id))(patterns)(index => after => wrap => wrap(consequent))])]);
    }
  }
  throw globalThis.Error("Pattern matching failure");
})(pattern);
const convert = sourceNode => ($value => {
  if ($value.$tag === "Array" && $value.$size === 1) {
    const elements = $value[0];
    return Array(map(convert)(elements));
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      return ArrowFunctionExpression(parameters)(convert(body));
    }
  }
  if ($value.$tag === "Block" && $value.$size === 1) {
    if (globalThis.Array.isArray($value[0])) {
      if ($value[0].length === 1) {
        const block = $value[0][0];
        if ($value[0][0].$tag === "Block" && $value[0][0].$size === 1) {
          return convert(block);
        }
      }
    }
  }
  if ($value.$tag === "Block" && $value.$size === 1) {
    const statements = $value[0];
    return Block(map(convert)(statements));
  }
  if ($value.$tag === "Boolean" && $value.$size === 1) {
    const value = $value[0];
    return Boolean(value);
  }
  if ($value.$tag === "Call" && $value.$size === 2) {
    if ($value[0].$tag === "Member" && $value[0].$size === 2) {
      const object = $value[0][0];
      if ($value[0][1].$tag === "String" && $value[0][1].$size === 1) {
        if ($value[0][1][0] === "new") {
          const arguments$ = $value[1];
          return convert(Call(Member(Member($0023globalThis)($0027Reflect))($0027construct))([object, Array(arguments$)]));
        }
      }
    }
  }
  if ($value.$tag === "Call" && $value.$size === 2) {
    const callee = $value[0];
    {
      const arguments$ = $value[1];
      return Call(convert(callee))(map(convert)(arguments$));
    }
  }
  if ($value.$tag === "CaseExpression" && $value.$size === 2) {
    const discriminant = $value[0];
    {
      const cases = $value[1];
      return (() => {
        const cases$0027 = map($ => ($value => {
          if ($value.$tag === "CaseClause" && $value.$size === 2) {
            const pattern = $value[0];
            {
              const block = $value[1];
              if ($value[1].$tag === "Block" && $value[1].$size === 1) {
                return codeForPattern(pattern)($0023$value)(block);
              }
            }
          }
          if ($value.$tag === "CaseClause" && $value.$size === 2) {
            const pattern = $value[0];
            {
              const consequent = $value[1];
              return codeForPattern(pattern)($0023$value)(Return(consequent));
            }
          }
          throw globalThis.Error("Pattern matching failure");
        })($))(cases);
        const throw$ = ($value => {
          if (globalThis.Array.isArray($value)) {
            if ($value.length >= 1) {
              if ($value.at(-1).$tag === "CaseClause" && $value.at(-1).$size === 1) {
                if ($value.at(-1)[0].$tag === "Any" && $value.at(-1)[0].$size === 1) {
                  return [];
                }
              }
            }
          }
          if (globalThis.Array.isArray($value)) {
            if ($value.length >= 1) {
              if ($value.at(-1).$tag === "CaseClause" && $value.at(-1).$size === 2) {
                if ($value.at(-1)[0].$tag === "Identifier" && $value.at(-1)[0].$size === 1) {
                  return [];
                }
              }
            }
          }
          return [Throw(Call(Member($0023globalThis)($0027Error))([String("Pattern matching failure")]))];
          throw globalThis.Error("Pattern matching failure");
        })(cases);
        return convert(Call(ArrowFunctionExpression([$0023$value])(Block(concat(cases$0027)(throw$))))([discriminant]));
      })();
    }
  }
  if ($value.$tag === "ConditionalExpression" && $value.$size === 3) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      {
        const alternative = $value[2];
        return ConditionalExpression(convert(predicate))(convert(consequent))(convert(alternative));
      }
    }
  }
  if ($value.$tag === "DataConstructorPattern" && $value.$size === 2) {
    const identifier = $value[0];
    {
      const arguments$ = $value[1];
      return DataConstructorPattern(identifier)(arguments$);
    }
  }
  if ($value.$tag === "ExportDefaultDeclaration" && $value.$size === 1) {
    const declaration = $value[0];
    return ExportDefaultDeclaration(convert(declaration));
  }
  if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
    const specifiers = $value[0];
    return ExportNamedDeclaration(map(convert)(specifiers));
  }
  if ($value.$tag === "ExportSpecifier" && $value.$size === 2) {
    const local = $value[0];
    {
      const exported = $value[1];
      return ExportSpecifier(convert(local))(convert(exported));
    }
  }
  if ($value.$tag === "Expression" && $value.$size === 1) {
    const expression = $value[0];
    return Expression(convert(expression));
  }
  if ($value.$tag === "FunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      return FunctionExpression(parameters)(convert(body));
    }
  }
  if ($value.$tag === "Identifier" && $value.$size === 1) {
    const name = $value[0];
    return Identifier(name);
  }
  if ($value.$tag === "If" && $value.$size === 3) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      {
        const alternative = $value[2];
        return If(convert(predicate))(convert(consequent))(map(convert)(alternative));
      }
    }
  }
  if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
    const source = $value[0];
    {
      const specifiers = $value[1];
      return ImportDeclaration(source)(map(convert)(specifiers));
    }
  }
  if ($value.$tag === "ImportDefaultSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return ImportDefaultSpecifier(convert(local));
  }
  if ($value.$tag === "ImportNamespaceSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return ImportNamespaceSpecifier(convert(local));
  }
  if ($value.$tag === "ImportSpecifier" && $value.$size === 2) {
    const imported = $value[0];
    {
      const local = $value[1];
      return ImportSpecifier(convert(imported))(convert(local));
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "==") {
      const lhs = $value[1];
      if ($value[1].$tag === "Number" && $value[1].$size === 1) {
        const rhs = $value[2];
        return Infix("===")(convert(lhs))(convert(rhs));
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "==") {
      const lhs = $value[1];
      {
        const rhs = $value[2];
        if ($value[2].$tag === "Number" && $value[2].$size === 1) {
          return Infix("===")(convert(lhs))(convert(rhs));
        }
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "/=") {
      const lhs = $value[1];
      if ($value[1].$tag === "Number" && $value[1].$size === 1) {
        const rhs = $value[2];
        return Infix("!==")(convert(lhs))(convert(rhs));
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "/=") {
      const lhs = $value[1];
      {
        const rhs = $value[2];
        if ($value[2].$tag === "Number" && $value[2].$size === 1) {
          return Infix("!==")(convert(lhs))(convert(rhs));
        }
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "==") {
      const lhs = $value[1];
      if ($value[1].$tag === "String" && $value[1].$size === 1) {
        const rhs = $value[2];
        return Infix("===")(convert(lhs))(convert(rhs));
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "==") {
      const lhs = $value[1];
      {
        const rhs = $value[2];
        if ($value[2].$tag === "String" && $value[2].$size === 1) {
          return Infix("===")(convert(lhs))(convert(rhs));
        }
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "/=") {
      const lhs = $value[1];
      if ($value[1].$tag === "String" && $value[1].$size === 1) {
        const rhs = $value[2];
        return Infix("!==")(convert(lhs))(convert(rhs));
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    if ($value[0] === "/=") {
      const lhs = $value[1];
      {
        const rhs = $value[2];
        if ($value[2].$tag === "String" && $value[2].$size === 1) {
          return Infix("!==")(convert(lhs))(convert(rhs));
        }
      }
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    const operator = $value[0];
    {
      const lhs = $value[1];
      {
        const rhs = $value[2];
        return ($value => {
          if ($value === ".") {
            return convert(ArrowFunctionExpression([Identifier("$")])(Call(lhs)([Call(rhs)([Identifier("$")])])));
          }
          if ($value === "<>") {
            return convert(Call(Call(Identifier("concat"))([lhs]))([rhs]));
          }
          if ($value === ",..") {
            return convert(Call(Call(Identifier("prepend"))([lhs]))([rhs]));
          }
          if ($value === "..,") {
            return convert(Call(Call(Identifier("append"))([rhs]))([lhs]));
          }
          if ($value === "has") {
            return convert(Call(Member(lhs)(String("has")))([rhs]));
          }
          if ($value === "in") {
            return convert(Call(Call(Identifier("contains"))([lhs]))([rhs]));
          }
          if ($value === "==") {
            return convert(Call(Call(Identifier("equals"))([lhs]))([rhs]));
          }
          if ($value === "/=") {
            return Prefix("!")(convert(Infix("==")(lhs)(rhs)));
          }
          if ($value === "<$>") {
            return convert(Call(Call(Identifier("map"))([lhs]))([rhs]));
          }
          if ($value === "<&>") {
            return convert(Call(Call(Identifier("map"))([rhs]))([lhs]));
          }
          if ($value === "<*>") {
            return convert(Call(Call(Identifier("ap"))([lhs]))([rhs]));
          }
          if ($value === ">>=") {
            return convert(Call(Call(Identifier("chain"))([rhs]))([lhs]));
          }
          if ($value === "$") {
            return convert(Call(lhs)([rhs]));
          }
          if ($value === "&") {
            return convert(Call(rhs)([lhs]));
          }
          if ($value === "^") {
            return Infix("**")(convert(lhs))(convert(rhs));
          }
          if ($value === ".&.") {
            return Infix("&")(convert(lhs))(convert(rhs));
          }
          if ($value === ".|.") {
            return Infix("|")(convert(lhs))(convert(rhs));
          }
          if ($value === ".^.") {
            return Infix("^")(convert(lhs))(convert(rhs));
          }
          {
            const operator = $value;
            return Infix(operator)(convert(lhs))(convert(rhs));
          }
        })(operator);
      }
    }
  }
  if ($value.$tag === "Member" && $value.$size === 2) {
    const object = $value[0];
    {
      const property = $value[1];
      return Member(convert(object))(convert(property));
    }
  }
  if ($value.$tag === "Module" && $value.$size === 3) {
    const imports = $value[0];
    {
      const exports = $value[1];
      {
        const statements = $value[2];
        return Module(map(convert)(imports))(map(convert)(exports))(map(convert)(statements));
      }
    }
  }
  if ($value.$tag === "Number" && $value.$size === 1) {
    const value = $value[0];
    return Number(value);
  }
  if ($value.$tag === "Object" && $value.$size === 1) {
    const properties = $value[0];
    return Object(map(convert)(properties));
  }
  if ($value.$tag === "Prefix" && $value.$size === 2) {
    const operator = $value[0];
    {
      const operand = $value[1];
      return Prefix(operator)(convert(operand));
    }
  }
  if ($value.$tag === "Property" && $value.$size === 2) {
    const key = $value[0];
    {
      const value = $value[1];
      return Property(convert(key))(convert(value));
    }
  }
  if ($value.$tag === "Return" && $value.$size === 1) {
    const argument = $value[0];
    return Return(convert(argument));
  }
  if ($value.$tag === "Spread" && $value.$size === 1) {
    const argument = $value[0];
    return Spread(convert(argument));
  }
  if ($value.$tag === "String" && $value.$size === 1) {
    const value = $value[0];
    return String(value);
  }
  if ($value.$tag === "This" && $value.$size === 0) {
    return This;
  }
  if ($value.$tag === "Throw" && $value.$size === 1) {
    const argument = $value[0];
    return Throw(convert(argument));
  }
  if ($value.$tag === "Var" && $value.$size === 3) {
    if ($value[0] === "var") {
      const pattern = $value[1];
      {
        const expression = $value[2];
        return Var("let")(pattern)(convert(expression));
      }
    }
  }
  if ($value.$tag === "Var" && $value.$size === 3) {
    if ($value[0] === "const") {
      const pattern = $value[1];
      {
        const expression = $value[2];
        return Var("const")(pattern)(convert(expression));
      }
    }
  }
  if ($value.$tag === "While" && $value.$size === 2) {
    const predicate = $value[0];
    {
      const body = $value[1];
      return While(convert(predicate))(convert(body));
    }
  }
  {
    const sourceNode = $value;
    {
      console.error("(convert)", sourceNode.$tag);
      return sourceNode;
    }
  }
})(sourceNode);
export default convert;
