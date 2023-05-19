import * as Pattern from "./Pattern.js";
import {Array, ArrowFunctionExpression, Block, Boolean, Call, CaseClause, CaseExpression, ConditionalExpression, DataConstructorPattern, ExportAllSpecifier, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, Expression, FunctionExpression, Identifier, If, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Infix, Member, Module, Number, Object, Prefix, Property, Return, Spread, String, This, Var, While} from "./SourceNode.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const charAt = index => string => string.charAt(index);
const repeat = count => string => string.repeat(count);
const replaceAll = pattern => replacement => string => string.replaceAll(pattern, replacement);
const splitOn = separator => string => string.split(separator);
const sliceFrom = from => xs => xs.slice(from);
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
const min = x => y => x <= y ? x : y;
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
const reduceRight = f => y => x => x.reduceRight((y, x) => f(y)(x), y);
const map = f => xs => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return xs.map(x => f(x));
  }
  return xs["fantasy-land/map"](f);
})(globalThis.Object.prototype.toString.call(xs));
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
const append = x => xs => concat(xs)(pure(xs.constructor)(x));
const prepend = x => xs => concat(pure(xs.constructor)(x))(xs);
const chain = f => x => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return x.flatMap(x => f(x));
  }
  if ($discriminant === "[object Function]") {
    return y => x(f(y))(y);
  }
  return x["fantasy-land/chain"](f);
})(globalThis.Object.prototype.toString.call(x));
const Function = ArrowFunctionExpression;
const $0023$ = Identifier("$");
const $0023$lhs = Identifier("$lhs");
const $0023$prototype = Identifier("$prototype");
const $0023$rhs = Identifier("$rhs");
const $0023args = Identifier("args");
const $0023globalThis = Identifier("globalThis");
const $0023target = Identifier("target");
const $0027$size = String("$size");
const $0027$tag = String("$tag");
const $0027Object = String("Object");
const $0027apply = String("apply");
const $0027assign = String("assign");
const $0027at = String("at");
const $0027create = String("create");
const $0027slice = String("slice");
const countSpaces = string => index => charAt(index)(string) === " " ? 1 + countSpaces(string)(index + 1) : 0;
const variableDeclarationFromConstructor = $0 => {
  const tag = $0[0][0];
  const params = $0[1];
  return Var("const")(Identifier(tag))(reduceRight(body => param => Function([param])(body))(Call(Member(Member($0023globalThis)($0027Object))($0027assign))([Call(Member(Member($0023globalThis)($0027Object))($0027create))([$0023$prototype]), reduceRight(give => param => index => props => give(index + 1)(append(Property(Number(index))(param))(props)))(_ => props => Object(prepend(Property($0027$tag)(String(tag)))(prepend(Property($0027$size)(Number(params.length)))(concat(props)(map($ => ($value => {
    {
      const param = $value;
      if ($value.$tag === "Identifier" && $value.$size === 1) {
        const name = $value[0];
        return Property(String(name))(param);
      }
    }
    throw globalThis.Error("Pattern matching failure");
  })($))(params))))))(params)(0)([])]))(params));
};
const codeForInlinePattern = pattern => $0023value => ($value => {
  if ($value.$tag === "Any" && $value.$size === 0) {
    return [];
  }
  if ($value.$tag === "As" && $value.$size === 2) {
    const name = $value[0];
    {
      const pattern = $value[1];
      return concat([Var("const")(Identifier(name))($0023value)])(codeForInlinePattern(pattern)($0023value));
    }
  }
  if ($value.$tag === "Identifier" && $value.$size === 1) {
    const name = $value[0];
    return [Var("const")(Identifier(name))($0023value)];
  }
  if ($value.$tag === "Data" && $value.$size === 2) {
    const patterns = $value[1];
    return patterns.flatMap((pattern, index) => {
      return codeForInlinePattern(pattern)(Member($0023value)(Number(index)));
    });
  }
  if ($value.$tag === "Object" && $value.$size === 1) {
    const properties = $value[0];
    return chain($ => ($value => {
      if ($value.$tag === "Property" && $value.$size === 2) {
        const name = $value[0];
        {
          const pattern = $value[1];
          return codeForInlinePattern(pattern)(Member($0023value)(String(name)));
        }
      }
      throw globalThis.Error("Pattern matching failure");
    })($))(properties);
  }
  if ($value.$tag === "Array" && $value.$size === 1) {
    const patterns = $value[0];
    return reduceRight(give => pattern => index => after => statements => ($value => {
      if ($value.$tag === "Slice" && $value.$size === 1) {
        const pattern = $value[0];
        return give(index + 1)(true)(concat(statements)(codeForInlinePattern(pattern)(Call(Member($0023value)($0027slice))(equals(index + 1)(patterns.length) ? [Number(index)] : [Number(index), Number(index + 1 - patterns.length)]))));
      }
      {
        const pattern = $value;
        return give(index + 1)(after)(concat(statements)(codeForInlinePattern(pattern)(after ? Call(Member($0023value)($0027at))([Number(index - patterns.length)]) : Member($0023value)(Number(index)))));
      }
    })(pattern))(index => after => statements => statements)(patterns)(0)(false)([]);
  }
  throw globalThis.Error("Pattern matching failure");
})(pattern);
const desugar = sourceNode => ($value => {
  if ($value.$tag === "Quasiquotation" && $value.$size === 1) {
    const value = $value[0];
    return desugar(String(($value => {
      if ($value === "\n") {
        const counts = chain(line => (() => {
          const count = countSpaces(line)(0);
          return equals(count)(line.length) ? [] : [count];
        })())(splitOn("\n")(value));
        const dedent = ($value => {
          if (globalThis.Array.isArray($value)) {
            if ($value.length === 0) {
              return id;
            }
          }
          if (globalThis.Array.isArray($value)) {
            if ($value.length >= 1) {
              const n = $value[0];
              {
                const ns = $value.slice(1);
                return replaceAll(concat("\n")(repeat(reduce(min)(n)(ns))(" ")))("\n");
              }
            }
          }
          throw globalThis.Error("Pattern matching failure");
        })(counts);
        return sliceFrom(("\n").length)(dedent(value));
      }
      return value;
      throw globalThis.Error("Pattern matching failure");
    })(charAt(0)(value))));
  }
  if ($value.$tag === "Call" && $value.$size === 2) {
    if ($value[0].$tag === "PropertyAccessor" && $value[0].$size === 1) {
      const identifiers = $value[0][0];
      if (globalThis.Array.isArray($value[1])) {
        if ($value[1].length === 1) {
          const argument = $value[1][0];
          return desugar(reduce(Member)(argument)(map($ => ($value => {
            if ($value.$tag === "Identifier" && $value.$size === 1) {
              const name = $value[0];
              return String(name);
            }
            throw globalThis.Error("Pattern matching failure");
          })($))(identifiers)));
        }
      }
    }
  }
  if ($value.$tag === "PropertyAccessor" && $value.$size === 1) {
    const identifiers = $value[0];
    return desugar(Function([$0023$])(reduce(Member)($0023$)(map($ => ($value => {
      if ($value.$tag === "Identifier" && $value.$size === 1) {
        const name = $value[0];
        return String(name);
      }
      throw globalThis.Error("Pattern matching failure");
    })($))(identifiers))));
  }
  if ($value.$tag === "LeftSection" && $value.$size === 2) {
    const operator = $value[0];
    {
      const lhs = $value[1];
      return desugar(Function([$0023$rhs])(Infix(operator)(lhs)($0023$rhs)));
    }
  }
  if ($value.$tag === "RightSection" && $value.$size === 2) {
    const operator = $value[0];
    {
      const rhs = $value[1];
      return desugar(Function([$0023$lhs])(Infix(operator)($0023$lhs)(rhs)));
    }
  }
  if ($value.$tag === "EmptySection" && $value.$size === 1) {
    const operator = $value[0];
    return desugar(Function([$0023$lhs])(Function([$0023$rhs])(Infix(operator)($0023$lhs)($0023$rhs))));
  }
  if ($value.$tag === "DoBlockExpression" && $value.$size === 2) {
    const operations = $value[0];
    {
      const result = $value[1];
      return desugar(reduceRight(result => $ => ($value => {
        if ($value.$tag === "ArrowAssignmentStatement" && $value.$size === 2) {
          const pattern = $value[0];
          {
            const expression = $value[1];
            return Infix(">>=")(expression)(Function([pattern])(result));
          }
        }
        if ($value.$tag === "Var" && $value.$size === 3) {
          if ($value[0] === "const") {
            const pattern = $value[1];
            {
              const expression = $value[2];
              return Call(Function([pattern])(result))([expression]);
            }
          }
        }
        if ($value.$tag === "FunctionDeclaration" && $value.$size === 3) {
          const identifier = $value[0];
          {
            const parameters = $value[1];
            {
              const body = $value[2];
              return Call(Function([identifier])(result))([reduceRight(body => param => Function([param])(body))(body)(parameters)]);
            }
          }
        }
        if ($value.$tag === "Expression" && $value.$size === 1) {
          const expression = $value[0];
          return Block([Expression(expression), Return(result)]);
        }
        throw globalThis.Error("Pattern matching failure");
      })($))(result)(operations));
    }
  }
  if ($value.$tag === "InfixCall" && $value.$size === 3) {
    const operator = $value[0];
    {
      const lhs = $value[1];
      {
        const rhs = $value[2];
        return desugar(Call(Call(operator)([lhs]))([rhs]));
      }
    }
  }
  if ($value.$tag === "LambdaCase" && $value.$size === 1) {
    const cases = $value[0];
    return desugar(Function([$0023$])(CaseExpression($0023$)(cases)));
  }
  if ($value.$tag === "MethodCall" && $value.$size === 1) {
    const name = $value[0];
    return desugar(Function([$0023args])(Function([$0023target])(Call(Member(Member($0023target)(String(name)))($0027apply))([$0023target, $0023args]))));
  }
  if ($value.$tag === "FunctionDeclaration" && $value.$size === 3) {
    const identifier = $value[0];
    {
      const parameters = $value[1];
      {
        const body = $value[2];
        return desugar(Var("const")(identifier)(reduceRight(body => parameter => Function([parameter])(body))(body)(parameters)));
      }
    }
  }
  if ($value.$tag === "Module" && $value.$size === 3) {
    const imports = $value[0];
    {
      const exports = $value[1];
      {
        const statements = $value[2];
        return Module(map(desugar)(imports))(map(desugar)(exports))(chain($ => ($value => {
          if ($value.$tag === "DataTypeDeclaration" && $value.$size === 3) {
            if ($value[0].$tag === "Identifier" && $value[0].$size === 1) {
              const name = $value[0][0];
              {
                const constructors = $value[1];
                {
                  const implementations = $value[2];
                  return ($value => {
                    if ($value.$tag === "Object" && $value.$size === 1) {
                      const properties = $value[0];
                      return (() => {
                        const prototype = Var("const")($0023$prototype)(Object(map($ => ($value => {
                          if ($value.$tag === "Property" && $value.$size === 2) {
                            const key = $value[0];
                            if ($value[1].$tag === "ArrowFunctionExpression" && $value[1].$size === 2) {
                              const parameters = $value[1][0];
                              {
                                const body = $value[1][1];
                                if ($value[1][1].$tag === "Block" && $value[1][1].$size === 1) {
                                  return Property(key)(FunctionExpression(parameters)(body));
                                }
                              }
                            }
                          }
                          if ($value.$tag === "Property" && $value.$size === 2) {
                            const key = $value[0];
                            if ($value[1].$tag === "ArrowFunctionExpression" && $value[1].$size === 2) {
                              const parameters = $value[1][0];
                              {
                                const expression = $value[1][1];
                                return Property(key)(FunctionExpression(parameters)(Block([Return(expression)])));
                              }
                            }
                          }
                          {
                            const property = $value;
                            return property;
                          }
                        })($))(properties)));
                        return prepend(prototype)(map($ => desugar(variableDeclarationFromConstructor($)))(constructors));
                      })();
                    }
                    throw globalThis.Error("Pattern matching failure");
                  })(desugar(implementations));
                }
              }
            }
          }
          if ($value.$tag === "Var" && $value.$size === 3) {
            const kind = $value[0];
            {
              const pattern = $value[1];
              {
                const expression = $value[2];
                return codeForInlinePattern(pattern)(desugar(expression));
              }
            }
          }
          {
            const statement = $value;
            return [desugar(statement)];
          }
        })($))(statements));
      }
    }
  }
  if ($value.$tag === "LetExpression" && $value.$size === 2) {
    const bindings = $value[0];
    {
      const consequent = $value[1];
      return desugar(Call(ArrowFunctionExpression([])(Block(($lhs => append(Return(consequent))($lhs))(chain($0 => {
        const index = $0[0];
        const pattern = $0[1];
        const discriminant = $0[2];
        return ($value => {
          {
            const identifier = $value;
            if ($value.$tag === "Identifier" && $value.$size === 1) {
              return codeForInlinePattern(identifier)(discriminant);
            }
          }
          {
            const pattern = $value;
            return (() => {
              const identifier = Identifier(concat("$")((args => target => target.toString.apply(target, args))([])(index)));
              return prepend(Var("const")(identifier)(discriminant))(codeForInlinePattern(pattern)(identifier));
            })();
          }
        })(pattern);
      })(bindings)))))([]));
    }
  }
  if ($value.$tag === "Block" && $value.$size === 1) {
    const statements = $value[0];
    return Block(chain($ => ($value => {
      if ($value.$tag === "Var" && $value.$size === 3) {
        const kind = $value[0];
        {
          const pattern = $value[1];
          {
            const expression = $value[2];
            return codeForInlinePattern(pattern)(desugar(expression));
          }
        }
      }
      {
        const statement = $value;
        return [desugar(statement)];
      }
    })($))(statements));
  }
  if ($value.$tag === "Array" && $value.$size === 1) {
    const elements = $value[0];
    return Array(map(desugar)(elements));
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    if (globalThis.Array.isArray($value[0])) {
      if ($value[0].length === 1) {
        const parameter = $value[0][0];
        if ($value[0][0].$tag === "Any" && $value[0][0].$size === 0) {
          const body = $value[1];
          return desugar(ArrowFunctionExpression([Pattern.Identifier("_")])(body));
        }
      }
    }
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    if (globalThis.Array.isArray($value[0])) {
      if ($value[0].length === 1) {
        const parameter = $value[0][0];
        if ($value[0][0].$tag === "Identifier" && $value[0][0].$size === 1) {
          const body = $value[1];
          return ArrowFunctionExpression([parameter])(desugar(body));
        }
      }
    }
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    if ($value[1].$tag === "Block" && $value[1].$size === 1) {
      const statements = $value[1][0];
      return reduce(take => parameter => take(index => parameters => declarations => give => ($value => {
        if ($value.$tag === "Identifier" && $value.$size === 1) {
          const name = $value[0];
          return give(index + 1)(append(Pattern.Identifier(name))(parameters))(declarations);
        }
        return give(index + 1)(append(Pattern.Identifier(concat("$")((args => target => target.toString.apply(target, args))([])(index))))(parameters))(concat(declarations)(codeForInlinePattern(parameter)(Pattern.Identifier(concat("$")((args => target => target.toString.apply(target, args))([])(index))))));
        throw globalThis.Error("Pattern matching failure");
      })(parameter)))(give => give(0)([])([]))(parameters)(index => parameters => declarations => ArrowFunctionExpression(parameters)(desugar(Block(concat(declarations)(statements)))));
    }
  }
  if ($value.$tag === "ArrowFunctionExpression" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const expression = $value[1];
      return desugar(Function(parameters)(Block([Return(expression)])));
    }
  }
  if ($value.$tag === "Boolean" && $value.$size === 1) {
    const value = $value[0];
    return Boolean(value);
  }
  if ($value.$tag === "Call" && $value.$size === 2) {
    const callee = $value[0];
    {
      const arguments$ = $value[1];
      return Call(desugar(callee))(map(desugar)(arguments$));
    }
  }
  if ($value.$tag === "CaseClause" && $value.$size === 2) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      return CaseClause(predicate)(desugar(consequent));
    }
  }
  if ($value.$tag === "CaseExpression" && $value.$size === 2) {
    const discriminant = $value[0];
    {
      const cases = $value[1];
      return CaseExpression(desugar(discriminant))(map(desugar)(cases));
    }
  }
  if ($value.$tag === "ConditionalExpression" && $value.$size === 3) {
    const predicate = $value[0];
    {
      const consequent = $value[1];
      {
        const alternative = $value[2];
        return ConditionalExpression(desugar(predicate))(desugar(consequent))(desugar(alternative));
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
  if ($value.$tag === "ExportAllSpecifier" && $value.$size === 1) {
    const hiding = $value[0];
    return ExportAllSpecifier(map(desugar)(hiding));
  }
  if ($value.$tag === "ExportDefaultDeclaration" && $value.$size === 1) {
    const declaration = $value[0];
    return ExportDefaultDeclaration(desugar(declaration));
  }
  if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
    const specifiers = $value[0];
    return ExportNamedDeclaration(map(desugar)(specifiers));
  }
  if ($value.$tag === "ExportSpecifier" && $value.$size === 2) {
    const local = $value[0];
    {
      const exported = $value[1];
      return ExportSpecifier(desugar(local))(desugar(exported));
    }
  }
  if ($value.$tag === "Expression" && $value.$size === 1) {
    const expression = $value[0];
    return Expression(desugar(expression));
  }
  if ($value.$tag === "Function" && $value.$size === 2) {
    const parameters = $value[0];
    {
      const body = $value[1];
      return Function(map(desugar)(parameters))(desugar(body));
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
        return If(desugar(predicate))(desugar(consequent))(map(desugar)(alternative));
      }
    }
  }
  if ($value.$tag === "ImportAllSpecifier" && $value.$size === 1) {
    const hiding = $value[0];
    return ImportAllSpecifier(map(desugar)(hiding));
  }
  if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
    const source = $value[0];
    {
      const specifiers = $value[1];
      return ImportDeclaration(source)(map(desugar)(specifiers));
    }
  }
  if ($value.$tag === "ImportDefaultSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return ImportDefaultSpecifier(desugar(local));
  }
  if ($value.$tag === "ImportNamespaceSpecifier" && $value.$size === 1) {
    const local = $value[0];
    return ImportNamespaceSpecifier(desugar(local));
  }
  if ($value.$tag === "ImportSpecifier" && $value.$size === 2) {
    const imported = $value[0];
    {
      const local = $value[1];
      return ImportSpecifier(desugar(imported))(desugar(local));
    }
  }
  if ($value.$tag === "Infix" && $value.$size === 3) {
    const operator = $value[0];
    {
      const left = $value[1];
      {
        const right = $value[2];
        return Infix(operator)(desugar(left))(desugar(right));
      }
    }
  }
  if ($value.$tag === "Member" && $value.$size === 2) {
    const object = $value[0];
    {
      const property = $value[1];
      return Member(desugar(object))(desugar(property));
    }
  }
  if ($value.$tag === "Number" && $value.$size === 1) {
    const value = $value[0];
    return Number(value);
  }
  if ($value.$tag === "Object" && $value.$size === 1) {
    const properties = $value[0];
    return Object(map(desugar)(properties));
  }
  if ($value.$tag === "Prefix" && $value.$size === 2) {
    const operator = $value[0];
    {
      const operand = $value[1];
      return Prefix(operator)(desugar(operand));
    }
  }
  if ($value.$tag === "Property" && $value.$size === 2) {
    const key = $value[0];
    {
      const value = $value[1];
      return Property(desugar(key))(desugar(value));
    }
  }
  if ($value.$tag === "Return" && $value.$size === 1) {
    const argument = $value[0];
    return Return(desugar(argument));
  }
  if ($value.$tag === "Spread" && $value.$size === 1) {
    const argument = $value[0];
    return Spread(desugar(argument));
  }
  if ($value.$tag === "String" && $value.$size === 1) {
    const value = $value[0];
    return String(value);
  }
  if ($value.$tag === "This" && $value.$size === 0) {
    return This;
  }
  if ($value.$tag === "Var" && $value.$size === 3) {
    const kind = $value[0];
    {
      const pattern = $value[1];
      {
        const expression = $value[2];
        return Var(kind)(pattern)(desugar(expression));
      }
    }
  }
  if ($value.$tag === "While" && $value.$size === 2) {
    const predicate = $value[0];
    {
      const body = $value[1];
      return While(desugar(predicate))(desugar(body));
    }
  }
  {
    const sourceNode = $value;
    {
      console.error(sourceNode, typeof$(sourceNode));
      console.error("(desugar)", sourceNode.$tag);
      return sourceNode;
    }
  }
})(sourceNode);
export default desugar;
