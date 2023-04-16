import {Just} from "./Maybe.js";
import {ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, Block, BlockStatement, CallExpression, CaseClause, CaseExpression, ConditionalExpression, DataConstructorDefinition, DataTypeDeclaration, DoBlockExpression, ExportAllSpecifier, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, FunctionDeclaration, FunctionExpression, Identifier, IfStatement, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixExpression, MemberExpression, Module, NumberLiteral, ObjectExpression, ObjectPattern, PrefixExpression, Property, PropertyAccessor, RestElement, ReturnStatement, SpreadElement, StringLiteral, VariableDeclaration} from "./Node.js";
import {Operator, EsOperator} from "./Operator.js";
import * as Pattern from "./Pattern.js";
import globals from "./globals.js";
import Prelude from "./prelude.js";
import vars from "./vars.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const charAt = index => string => string.charAt(index);
const toLower = string => string.toLowerCase();
const repeat = count => string => string.repeat(count);
const replaceAll = pattern => replacement => string => string.replaceAll(pattern, replacement);
const splitOn = separator => string => string.split(separator);
const joinWith = separator => xs => xs.join(separator);
const sliceFrom = from => xs => xs.slice(from);
const sliceTo = to => xs => xs.slice(0, to);
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
const min = x => y => x <= y ? x : y;
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
const reduce = f => y => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.reduce((y, x) => f(y)(x), y);
    default:
      return xs["fantasy-land/reduce"]((y, x) => f(y)(x), y);
  }
})();
const reduceRight = f => y => x => x.reduceRight((y, x) => f(y)(x), y);
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
const prepend = x => xs => concat(pure(xs.constructor)(x))(xs);
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
const preludeNames = globalThis.Reflect.construct(Set, [Object.keys(Prelude)]);
const removeUnreferencedPreludeFunctions = module => (() => {
  const {declared, referenced} = vars(module);
  const unreferenced = reject($rhs => referenced.has($rhs))(declared);
  const statements = reject($ => ($value => {
    const $match = flip(match)($value);
    {
      const $result = $match({
        type: "data",
        tag: "VariableDeclaration",
        patterns: [{
          type: "data",
          tag: "Identifier",
          patterns: [{
            type: "identifier",
            name: "name"
          }]
        }, {
          type: "any"
        }]
      });
      if ($result != null$) {
        return (({name}) => unreferenced.has(name) && preludeNames.has(name))($result);
      }
    }
    {
      const $result = $match({
        type: "any"
      });
      if ($result != null$) {
        return (({}) => false)($result);
      }
    }
  })($))(module.statements);
  return equals(statements.length)(module.statements.length) ? module : removeUnreferencedPreludeFunctions(Module(module.imports)(module.exports)(statements));
})();
const rewriteModule = module => (() => {
  const module$0027 = rewriteNode(module);
  const rename = reduce(function (rename) {
    return $ => ($value => {
      const $match = flip(match)($value);
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
          return (({pattern, expression}) => updateRenamerFromPattern(rename)(pattern))($result);
        }
      }
      {
        const $result = $match({
          type: "any"
        });
        if ($result != null$) {
          return (({}) => rename)($result);
        }
      }
    })($);
  })(id)(module$0027.statements);
  const rename$0027 = reduce(function (rename) {
    return $ => ($value => {
      const $match = flip(match)($value);
      {
        const $result = $match({
          type: "data",
          tag: "ImportSpecifier",
          patterns: [{
            type: "data",
            tag: "Identifier",
            patterns: [{
              type: "identifier",
              name: "imported"
            }]
          }, {
            type: "data",
            tag: "Identifier",
            patterns: [{
              type: "identifier",
              name: "local"
            }]
          }]
        });
        if ($result != null$) {
          return (({imported, local}) => function (name) {
            return equals(name)(imported) ? local : rename(name);
          })($result);
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
          return (({local}) => updateRenamerFromPattern(rename)(local))($result);
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
          return (({local}) => updateRenamerFromPattern(rename)(local))($result);
        }
      }
    })($);
  })(rename)(chain($ => $.specifiers)(module$0027.imports));
  const module$0027$0027 = renameIdentifiers(rename$0027)(module$0027);
  const prelude = map(function ([name, value]) {
    return VariableDeclaration(Identifier(name))(value);
  })(Object.entries(Prelude));
  const module$0027$0027$0027 = Module(module$0027$0027.imports)(module$0027$0027.exports)(concat(prelude)(module$0027$0027.statements));
  const module$0027$0027$0027$0027 = removeUnreferencedPreludeFunctions(module$0027$0027$0027);
  const {declared, referenced} = vars(module$0027$0027$0027$0027);
  const unreferenced = reject($rhs => referenced.has($rhs))(declared);
  const undeclared = reject($rhs => declared.has($rhs))(referenced);
  const ignored = globalThis.Reflect.construct(Set, [["Deno", "DivisionByZero", "import", "console", "fetch", "window"]]);
  const undeclared$0027 = reject($rhs => ignored.has($rhs))(reject($rhs => globals.has($rhs))(undeclared));
  unreferenced.size > 0 ? console.error(concat("unreferenced: ")(joinWith(", ")(Array.from(unreferenced)))) : undefined;
  undeclared$0027.size > 0 ? console.error(concat("undeclared: ")(joinWith(", ")(Array.from(undeclared$0027)))) : undefined;
  return module$0027$0027$0027$0027;
})();
const $0023$ = Identifier("$");
const $0023$lhs = Identifier("$lhs");
const $0023$match = Identifier("$match");
const $0023$prototype = Identifier("$prototype");
const $0023$result = Identifier("$result");
const $0023$rhs = Identifier("$rhs");
const $0023$value = Identifier("$value");
const $0023args = Identifier("args");
const $0023flip = Identifier("flip");
const $0023globalThis = Identifier("globalThis");
const $0023match = Identifier("match");
const $0023null = Identifier("null");
const $0023target = Identifier("target");
const $0027$tag = StringLiteral("$tag");
const $0027$values = StringLiteral("$values");
const $0027Object = StringLiteral("Object");
const $0027Reflect = StringLiteral("Reflect");
const $0027apply = StringLiteral("apply");
const $0027assign = StringLiteral("assign");
const $0027construct = StringLiteral("construct");
const $0027create = StringLiteral("create");
const $0027has = StringLiteral("has");
const apply = reduce($ => ($lhs => $ => $lhs(Array.of($)))(CallExpression($)));
const construct = object => arguments$ => CallExpression(MemberExpression(MemberExpression($0023globalThis)($0027Reflect))($0027construct))([object, arguments$]);
const countSpaces = string => index => equals(charAt(index)(string))(" ") ? 1 + countSpaces(string)(index + 1) : 0;
const rewriteNode = node => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "data",
      tag: "Quasiquotation",
      patterns: [{
        type: "identifier",
        name: "value"
      }]
    });
    if ($result != null$) {
      return (({value}) => ($ => rewriteNode(StringLiteral($)))(($value => {
        const $match = flip(match)($value);
        {
          const $result = $match({
            type: "literal",
            value: "\n"
          });
          if ($result != null$) {
            return (({}) => (() => {
              const counts = chain(function (line) {
                return (() => {
                  const count = countSpaces(line)(0);
                  return equals(count)(line.length) ? [] : [count];
                })();
              })(splitOn("\n")(value));
              const dedent = ($value => {
                const $match = flip(match)($value);
                {
                  const $result = $match({
                    type: "array",
                    patterns: []
                  });
                  if ($result != null$) {
                    return (({}) => id)($result);
                  }
                }
                {
                  const $result = $match({
                    type: "array",
                    patterns: [{
                      type: "identifier",
                      name: "n"
                    }, {
                      type: "slice",
                      name: "ns"
                    }]
                  });
                  if ($result != null$) {
                    return (({n, ns}) => replaceAll(concat("\n")(repeat(reduce(min)(n)(ns))(" ")))("\n"))($result);
                  }
                }
              })(counts);
              return sliceFrom(("\n").length)(dedent(value));
            })())($result);
          }
        }
        {
          const $result = $match({
            type: "any"
          });
          if ($result != null$) {
            return (({}) => value)($result);
          }
        }
      })(charAt(0)(value))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "PropertyAccessor",
      patterns: [{
        type: "identifier",
        name: "identifiers"
      }]
    });
    if ($result != null$) {
      return (({identifiers}) => rewriteNode(ArrowFunctionExpression([$0023$])(reduce(MemberExpression)($0023$)(map($ => ($value => {
        const $match = flip(match)($value);
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
            return (({name}) => StringLiteral(name))($result);
          }
        }
      })($))(identifiers)))))($result);
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
        name: "lhs"
      }]
    });
    if ($result != null$) {
      return (({operator, lhs}) => rewriteNode(ArrowFunctionExpression([$0023$rhs])(InfixExpression(operator)(lhs)($0023$rhs))))($result);
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
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({operator, rhs}) => rewriteNode(ArrowFunctionExpression([$0023$lhs])(InfixExpression(operator)($0023$lhs)(rhs))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "EmptySection",
      patterns: [{
        type: "identifier",
        name: "operator"
      }]
    });
    if ($result != null$) {
      return (({operator}) => rewriteNode(ArrowFunctionExpression([$0023$lhs])(ArrowFunctionExpression([$0023$rhs])(InfixExpression(operator)($0023$lhs)($0023$rhs)))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "Block",
      patterns: [{
        type: "array",
        patterns: []
      }, {
        type: "data",
        tag: "Just",
        patterns: [{
          type: "identifier",
          name: "result"
        }]
      }]
    });
    if ($result != null$) {
      return (({result}) => rewriteNode(result))($result);
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
      return (({statements, result}) => Block(map(rewriteNode)(statements))(map(rewriteNode)(result)))($result);
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
      return (({operations, result}) => rewriteNode(reduceRight(function (result) {
        return $ => ($value => {
          const $match = flip(match)($value);
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
              return (({pattern, expression}) => InfixExpression(Operator(">>="))(expression)(ArrowFunctionExpression([pattern])(result)))($result);
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
              return (({pattern, expression}) => apply(ArrowFunctionExpression([pattern])(result))([expression]))($result);
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
              return (({identifier, parameters, body}) => apply(ArrowFunctionExpression([identifier])(result))([reduceRight(function (body) {
                return function (param) {
                  return ArrowFunctionExpression([param])(body);
                };
              })(body)(parameters)]))($result);
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
              return (({expression}) => Block([ExpressionStatement(expression)])(Just(result)))($result);
            }
          }
        })($);
      })(result)(operations)))($result);
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
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({operator, lhs, rhs}) => rewriteNode(apply(operator)([lhs, rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "."
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(ArrowFunctionExpression([$0023$])(apply(lhs)([apply(rhs)([$0023$])]))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "<>"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("concat"))([lhs, rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "has"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(MemberExpression(lhs)($0027has))([rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "in"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("contains"))([lhs, rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "=="
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("equals"))([lhs, rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "/="
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(PrefixExpression("!")(InfixExpression(Operator("=="))(lhs)(rhs))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "<$>"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("map"))([lhs, rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "<&>"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("map"))([rhs, lhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "<*>"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("ap"))([lhs, rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: ">>="
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(Identifier("chain"))([rhs, lhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "$"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(lhs)([rhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "&"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(apply(rhs)([lhs])))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: "^"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(InfixExpression(EsOperator("**"))(lhs)(rhs)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: ".&."
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(InfixExpression(EsOperator("&"))(lhs)(rhs)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: ".|."
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(InfixExpression(EsOperator("|"))(lhs)(rhs)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "literal",
          value: ".^."
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({lhs, rhs}) => rewriteNode(InfixExpression(EsOperator("^"))(lhs)(rhs)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "Operator",
        patterns: [{
          type: "identifier",
          name: "operator"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({operator, lhs, rhs}) => rewriteNode(InfixExpression(EsOperator(operator))(lhs)(rhs)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "InfixExpression",
      patterns: [{
        type: "data",
        tag: "EsOperator",
        patterns: [{
          type: "identifier",
          name: "operator"
        }]
      }, {
        type: "identifier",
        name: "lhs"
      }, {
        type: "identifier",
        name: "rhs"
      }]
    });
    if ($result != null$) {
      return (({operator, lhs, rhs}) => InfixExpression(EsOperator(operator))(rewriteNode(lhs))(rewriteNode(rhs)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "MethodCallExpression",
      patterns: [{
        type: "identifier",
        name: "name"
      }]
    });
    if ($result != null$) {
      return (({name}) => rewriteNode(ArrowFunctionExpression([$0023args])(ArrowFunctionExpression([$0023target])(CallExpression(MemberExpression(MemberExpression($0023target)(StringLiteral(name)))($0027apply))([$0023target, $0023args])))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "CallExpression",
      patterns: [{
        type: "data",
        tag: "PropertyAccessor",
        patterns: [{
          type: "identifier",
          name: "identifiers"
        }]
      }, {
        type: "array",
        patterns: [{
          type: "identifier",
          name: "argument"
        }]
      }]
    });
    if ($result != null$) {
      return (({identifiers, argument}) => rewriteNode(reduce(MemberExpression)(argument)(map($ => ($value => {
        const $match = flip(match)($value);
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
            return (({name}) => StringLiteral(name))($result);
          }
        }
      })($))(identifiers))))($result);
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
        type: "data",
        tag: "StringLiteral",
        patterns: [{
          type: "literal",
          value: "new"
        }]
      }]
    });
    if ($result != null$) {
      return (({object}) => rewriteNode(ArrowFunctionExpression([RestElement($0023args)])(construct(object)($0023args))))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "CallExpression",
      patterns: [{
        type: "data",
        tag: "MemberExpression",
        patterns: [{
          type: "identifier",
          name: "object"
        }, {
          type: "data",
          tag: "StringLiteral",
          patterns: [{
            type: "literal",
            value: "new"
          }]
        }]
      }, {
        type: "identifier",
        name: "arguments"
      }]
    });
    if ($result != null$) {
      return (({object, arguments: arguments$}) => rewriteNode(construct(object)(ArrayExpression(arguments$))))($result);
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
      return (({callee, arguments: arguments$}) => CallExpression(rewriteNode(callee))(map(rewriteNode)(arguments$)))($result);
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
      return (({cases}) => rewriteNode(ArrowFunctionExpression([$0023$])(CaseExpression($0023$)(cases))))($result);
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
      return (({discriminant, cases}) => rewriteNode(apply(ArrowFunctionExpression([$0023$value])(BlockStatement(prepend(VariableDeclaration($0023$match)(apply($0023flip)([$0023match, $0023$value])))(map($ => ($value => {
        const $match = flip(match)($value);
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
            return (({predicate, consequent}) => BlockStatement([VariableDeclaration($0023$result)(apply($0023$match)([Pattern.serialize(predicate)])), IfStatement(InfixExpression(EsOperator("!="))($0023$result)($0023null))(BlockStatement([ReturnStatement(apply(ArrowFunctionExpression([ObjectPattern(map(function (name) {
              return Property(StringLiteral(name))(Identifier(name));
            })(Pattern.names(predicate)))])(consequent))([$0023$result]))]))]))($result);
          }
        }
      })($))(cases)))))([discriminant])))($result);
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
      return (({identifier, parameters, body}) => rewriteNode(VariableDeclaration(identifier)(reduceRight(flip($ => ArrowFunctionExpression(Array.of($))))(body)(parameters))))($result);
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
      return (({identifier, constructors, implementations}) => rewriteNode((() => {
        const $0023member = Identifier(concat(toLower(sliceTo(1)(identifier.name)))(sliceFrom(1)(identifier.name)));
        const pattern = ObjectPattern(map($ => ($value => {
          const $match = flip(match)($value);
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
              return (({identifier, parameters}) => Property(identifier)(identifier))($result);
            }
          }
        })($))(constructors));
        return VariableDeclaration(pattern)((() => {
          const variableDeclarationFromConstructor = constructor => ($value => {
            const $match = flip(match)($value);
            {
              const $result = $match({
                type: "data",
                tag: "DataConstructorDefinition",
                patterns: [{
                  type: "data",
                  tag: "Identifier",
                  patterns: [{
                    type: "identifier",
                    name: "tag"
                  }]
                }, {
                  type: "identifier",
                  name: "parameters"
                }]
              });
              if ($result != null$) {
                return (({tag, parameters}) => VariableDeclaration(Identifier(tag))(reduceRight(function (body) {
                  return function (parameter) {
                    return ArrowFunctionExpression([parameter])(body);
                  };
                })(CallExpression(MemberExpression(MemberExpression($0023globalThis)($0027Object))($0027assign))([CallExpression(MemberExpression(MemberExpression($0023globalThis)($0027Object))($0027create))([$0023$prototype]), ObjectExpression((() => {
                  const fields = map($ => ($value => {
                    const $match = flip(match)($value);
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
                        return (({name}) => Property(StringLiteral(name))(Identifier(name)))($result);
                      }
                    }
                  })($))(parameters);
                  const elements = parameters.map(function (parameter, index) {
                    return ($value => {
                      const $match = flip(match)($value);
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
                          return (({name}) => Property(NumberLiteral(index))(Identifier(name)))($result);
                        }
                      }
                    })(parameter);
                  });
                  return [Property($0027$tag)(StringLiteral(tag)), Property($0027$values)(ArrayExpression(parameters)), ...fields];
                })())]))(parameters)))($result);
              }
            }
          })(constructor);
          return Block(concat([VariableDeclaration($0023$prototype)(implementations)])(map(variableDeclarationFromConstructor)(constructors)))(Just(ObjectExpression(map($ => ($value => {
            const $match = flip(match)($value);
            {
              const $result = $match({
                type: "data",
                tag: "DataConstructorDefinition",
                patterns: [{
                  type: "data",
                  tag: "Identifier",
                  patterns: [{
                    type: "identifier",
                    name: "name"
                  }]
                }, {
                  type: "identifier",
                  name: "parameters"
                }]
              });
              if ($result != null$) {
                return (({name, parameters}) => Property(StringLiteral(name))(Identifier(name)))($result);
              }
            }
          })($))(constructors))));
        })());
      })()))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayExpression",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => ArrayExpression(map(rewriteNode)(elements)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayPattern",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => ArrayPattern(map(rewriteNode)(elements)))($result);
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
      return (({pattern, expression}) => ArrowAssignmentStatement(rewriteNode(pattern))(rewriteNode(expression)))($result);
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
      return (({parameters, body}) => ArrowFunctionExpression(map(rewriteNode)(parameters))(rewriteNode(body)))($result);
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
      return (({statements}) => BlockStatement(map(rewriteNode)(statements)))($result);
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
      return (({callee, arguments: arguments$}) => CallExpression(rewriteNode(callee))(map(rewriteNode)(arguments$)))($result);
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
      return (({predicate, consequent}) => CaseClause(predicate)(rewriteNode(consequent)))($result);
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
      return (({predicate, consequent, alternative}) => ConditionalExpression(rewriteNode(predicate))(rewriteNode(consequent))(map(rewriteNode)(alternative)))($result);
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
      return (({identifier, parameters}) => DataConstructorDefinition(rewriteNode(identifier))(map(rewriteNode)(parameters)))($result);
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
      return (({identifier, constructors, implementations}) => DataTypeDeclaration(rewriteNode(identifier))(map(rewriteNode)(constructors))(rewriteNode(implementations)))($result);
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
      return (({operations, result}) => DoBlockExpression(map(rewriteNode)(operations))(rewriteNode(result)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ExportAllSpecifier",
      patterns: [{
        type: "identifier",
        name: "hiding"
      }]
    });
    if ($result != null$) {
      return (({hiding}) => ExportAllSpecifier(map(rewriteNode)(hiding)))($result);
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
      return (({declaration}) => ExportDefaultDeclaration(rewriteNode(declaration)))($result);
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
      return (({specifiers}) => ExportNamedDeclaration(map(rewriteNode)(specifiers)))($result);
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
      return (({local, exported}) => ExportSpecifier(rewriteNode(local))(rewriteNode(exported)))($result);
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
      return (({expression}) => ExpressionStatement(rewriteNode(expression)))($result);
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
      return (({identifier, parameters, body}) => FunctionDeclaration(rewriteNode(identifier))(map(rewriteNode)(parameters))(rewriteNode(body)))($result);
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
      return (({parameters, body}) => FunctionExpression(map(rewriteNode)(parameters))(rewriteNode(body)))($result);
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
      return (({predicate, consequent}) => IfStatement(rewriteNode(predicate))(rewriteNode(consequent)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ImportAllSpecifier",
      patterns: [{
        type: "identifier",
        name: "hiding"
      }]
    });
    if ($result != null$) {
      return (({hiding}) => ImportAllSpecifier(map(rewriteNode)(hiding)))($result);
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
      return (({source, specifiers}) => ImportDeclaration(source)(map(rewriteNode)(specifiers)))($result);
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
      return (({local}) => ImportDefaultSpecifier(rewriteNode(local)))($result);
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
      return (({local}) => ImportNamespaceSpecifier(rewriteNode(local)))($result);
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
      return (({imported, local}) => ImportSpecifier(rewriteNode(imported))(rewriteNode(local)))($result);
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
      return (({object, property}) => MemberExpression(rewriteNode(object))(rewriteNode(property)))($result);
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
      return (({imports, exports, statements}) => Module(map(rewriteNode)(imports))(map(rewriteNode)(exports))(map(rewriteNode)(statements)))($result);
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
      return (({properties}) => ObjectExpression(map(rewriteNode)(properties)))($result);
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
      return (({properties}) => ObjectPattern(map(rewriteNode)(properties)))($result);
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
      return (({operator, operand}) => PrefixExpression(operator)(rewriteNode(operand)))($result);
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
      return (({key, value}) => Property(rewriteNode(key))(rewriteNode(value)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "PropertyAccessor",
      patterns: [{
        type: "identifier",
        name: "identifiers"
      }]
    });
    if ($result != null$) {
      return (({identifiers}) => PropertyAccessor(map(rewriteNode)(identifiers)))($result);
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
      return (({argument}) => RestElement(rewriteNode(argument)))($result);
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
      return (({argument}) => ReturnStatement(rewriteNode(argument)))($result);
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
      return (({argument}) => SpreadElement(rewriteNode(argument)))($result);
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
      return (({pattern, expression}) => VariableDeclaration(rewriteNode(pattern))(rewriteNode(expression)))($result);
    }
  }
  {
    const $result = $match({
      type: "identifier",
      name: "node"
    });
    if ($result != null$) {
      return (({node}) => node)($result);
    }
  }
})(node);
const updateRenamerFromPattern = rename => pattern => ($value => {
  const $match = flip(match)($value);
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
      return (({name}) => preludeNames.has(name) ? function (s) {
        return equals(s)(name) ? "$" + s : rename(s);
      } : rename)($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayPattern",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => reduce(updateRenamerFromPattern)(rename)(elements))($result);
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
      return (({properties}) => reduce(updateRenamerFromPattern)(rename)(properties))($result);
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
      return (({key, value}) => updateRenamerFromPattern(rename)(value))($result);
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
      return (({argument}) => updateRenamerFromPattern(rename)(argument))($result);
    }
  }
})(pattern);
const renameIdentifiers = rename => node => ($value => {
  const $match = flip(match)($value);
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
      return (({name}) => Identifier(rename(name)))($result);
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
      return (({imported, local}) => ImportSpecifier(imported)(renameIdentifiers(rename)(local)))($result);
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
      return (({local, exported}) => ExportSpecifier(renameIdentifiers(rename)(local))(exported))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayExpression",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => ArrayExpression(map(renameIdentifiers(rename))(elements)))($result);
    }
  }
  {
    const $result = $match({
      type: "data",
      tag: "ArrayPattern",
      patterns: [{
        type: "identifier",
        name: "elements"
      }]
    });
    if ($result != null$) {
      return (({elements}) => ArrayPattern(map(renameIdentifiers(rename))(elements)))($result);
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
      return (({parameters, body}) => ArrowFunctionExpression(map(renameIdentifiers(rename))(parameters))(renameIdentifiers(rename)(body)))($result);
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
      return (({statements, result}) => Block(map(renameIdentifiers(rename))(statements))(map(renameIdentifiers(rename))(result)))($result);
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
      return (({callee, arguments: arguments$}) => CallExpression(renameIdentifiers(rename)(callee))(map(renameIdentifiers(rename))(arguments$)))($result);
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
      return (({predicate, consequent, alternative}) => ConditionalExpression(renameIdentifiers(rename)(predicate))(renameIdentifiers(rename)(consequent))(map(renameIdentifiers(rename))(alternative)))($result);
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
      return (({declaration}) => ExportDefaultDeclaration(renameIdentifiers(rename)(declaration)))($result);
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
      return (({specifiers}) => ExportNamedDeclaration(map(renameIdentifiers(rename))(specifiers)))($result);
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
      return (({expression}) => ExpressionStatement(renameIdentifiers(rename)(expression)))($result);
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
      return (({source, specifiers}) => ImportDeclaration(source)(map(renameIdentifiers(rename))(specifiers)))($result);
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
      return (({local}) => ImportDefaultSpecifier(renameIdentifiers(rename)(local)))($result);
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
      return (({local}) => ImportNamespaceSpecifier(renameIdentifiers(rename)(local)))($result);
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
      return (({operator, left, right}) => InfixExpression(operator)(renameIdentifiers(rename)(left))(renameIdentifiers(rename)(right)))($result);
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
      return (({object, property}) => MemberExpression(renameIdentifiers(rename)(object))(renameIdentifiers(rename)(property)))($result);
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
      return (({imports, exports, statements}) => Module(map(renameIdentifiers(rename))(imports))(map(renameIdentifiers(rename))(exports))(map(renameIdentifiers(rename))(statements)))($result);
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
      return (({properties}) => ObjectExpression(map(renameIdentifiers(rename))(properties)))($result);
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
      return (({properties}) => ObjectPattern(map(renameIdentifiers(rename))(properties)))($result);
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
      return (({operator, operand}) => PrefixExpression(operator)(renameIdentifiers(rename)(operand)))($result);
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
      return (({key, value}) => Property(renameIdentifiers(rename)(key))(renameIdentifiers(rename)(value)))($result);
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
      return (({argument}) => RestElement(renameIdentifiers(rename)(argument)))($result);
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
      return (({argument}) => SpreadElement(renameIdentifiers(rename)(argument)))($result);
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
      return (({pattern, expression}) => VariableDeclaration(renameIdentifiers(rename)(pattern))(renameIdentifiers(rename)(expression)))($result);
    }
  }
  {
    const $result = $match({
      type: "identifier",
      name: "node"
    });
    if ($result != null$) {
      return (({node}) => node)($result);
    }
  }
})(node);
export default rewriteModule;
