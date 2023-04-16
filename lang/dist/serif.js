import {generate} from "astring";
import * as Future from "fluture";
import {ExportNamedDeclaration, ExportSpecifier, Identifier, ImportDeclaration, ImportSpecifier, Module} from "./Node.js";
import * as format from "./format.js";
import * as fs from "./fs.js";
import * as serif from "./index.js";
import parallel from "./parallel.js";
import * as path from "./path.js";
import Prelude from "./prelude.js";
import vars from "./vars.js";
const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const charAt = index => string => string.charAt(index);
const startsWith = prefix => string => string.startsWith(prefix);
const endsWith = suffix => string => string.endsWith(suffix);
const trimEnd = string => string.trimEnd();
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
const append = x => xs => concat(xs)(pure(xs.constructor)(x));
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
const join = chain(id);
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
const parse = filename => sourceText => Future.mapRej(function (error) {
  return (() => {
    const lines = chain(function (line) {
      return (() => {
        const offset = line.number - error.location.start.line;
        return offset > -5 && offset <= 0 ? [line] : [];
      })();
    })((args => target => target.map.apply(target, args))([function (text, index) {
      return {
        number: index + 1,
        text: trimEnd(text)
      };
    }])(splitOn(RegExp("^", "m"))(sourceText)));
    const renderLineNumber = $ => (args => target => target.padStart.apply(target, args))([4])(String($));
    return concat("\n\u001b[1m")(concat(path.relative(Deno.cwd())(error.location.source))(concat("\u001b[0m\n\n")(concat(joinWith("")((args => target => target.map.apply(target, args))([function (line, idx, lines) {
      return (() => {
        const column = error.location.start.column - 1;
        return concat("\u001b[7m")(concat(renderLineNumber(line.number))(concat("\u001b[0m")(concat(idx < lines.length - 1 ? line.text : concat(sliceTo(column)(line.text))(concat("\u001b[7m")(concat(charAt(column)(line.text))("\u001b[0m" + sliceFrom(column + 1)(line.text)))))("\n"))));
      })();
    }])(lines)))(concat((function (length) {
      return (args => target => target.repeat.apply(target, args))([length + error.location.start.column - 1])(" ");
    })(renderLineNumber((args => target => target.at.apply(target, args))([-1])(lines).number).length))(concat("^\n")(concat(error.message)("\n")))))));
  })();
})(serif.parse(filename)(sourceText));
const createTree = reduce(function (futureTree) {
  return function (filename) {
    return chain(function (tree) {
      return tree.has(filename) ? Future.resolve(tree) : chain(sourceText => chain(({imports, exports, statements}) => (dependencies => (exports => (module => (initial => createTree(initial)(dependencies))(Future.resolve(globalThis.Reflect.construct(Map, [[...tree, [filename, {
        sourceText,
        ast: module,
        dependencies
      }]]]))))(Module(imports)(exports)(statements)))(map($ => ($value => {
        const $match = flip(match)($value);
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
            return (({specifiers}) => ExportNamedDeclaration(chain($ => ($value => {
              const $match = flip(match)($value);
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
                  return (({hiding}) => (() => {
                    const declared$0021 = empty(Set);
                    map(function (statement) {
                      return (args => target => target.forEach.apply(target, args))([Set.prototype.add, declared$0021])(vars(statement).declared);
                    })(statements);
                    return map($ => join(ExportSpecifier)(Identifier($)))(reject($rhs => globalThis.Reflect.construct(Set, [map($ => $.name)(hiding)]).has($rhs))(Array.from(declared$0021)));
                  })())($result);
                }
              }
              {
                const $result = $match({
                  type: "identifier",
                  name: "specifier"
                });
                if ($result != null$) {
                  return (({specifier}) => [specifier])($result);
                }
              }
            })($))(specifiers)))($result);
          }
        }
        {
          const $result = $match({
            type: "identifier",
            name: "declaration"
          });
          if ($result != null$) {
            return (({declaration}) => declaration)($result);
          }
        }
      })($))(exports)))(map($ => path.join(flip(append)([filename, ".."])($)))(filter(function (s) {
        return (startsWith("/")(s) || startsWith(".")(s)) && endsWith(".serif")(s);
      })(map($ => $.value)(map($ => $.source)(imports))))))(parse(filename)(sourceText)))(Future.mapRej($ => $.message)(fs.readFile(filename)));
    })(futureTree);
  };
});
const orderDependencies = tree => (() => {
  const unsorted$0021 = Array.from((args => target => target.keys.apply(target, args))([])(tree));
  const sorted$0021 = empty(Set);
  const recur = function () {
    return ($value => {
      const $match = flip(match)($value);
      {
        const $result = $match({
          type: "array",
          patterns: []
        });
        if ($result != null$) {
          return (({}) => sorted$0021)($result);
        }
      }
      {
        const $result = $match({
          type: "identifier",
          name: "unsorted!"
        });
        if ($result != null$) {
          return (({["unsorted!"]: unsorted$0021}) => (() => {
            const filename = (args => target => target.shift.apply(target, args))([])(unsorted$0021);
            (args => target => target.every.apply(target, args))([$rhs => sorted$0021.has($rhs)])((args => target => target.get.apply(target, args))([filename])(tree).dependencies) ? (args => target => target.add.apply(target, args))([filename])(sorted$0021) : (args => target => target.push.apply(target, args))([filename])(unsorted$0021);
            return recur();
          })())($result);
        }
      }
    })(unsorted$0021);
  };
  return Array.from(recur());
})();
(() => {
  const cwd = Deno.cwd();
  const [src, dst, ...filenames] = Deno.args;
  const toAbs = abs => rel => path.join(concat([abs])(splitOn("/")(rel)));
  const absSrc = toAbs(cwd)(src);
  const absDst = toAbs(cwd)(dst);
  const absFilenames = map(toAbs(absSrc))(filenames);
  const program = chain(tree => (filenames => parallel(map(function (serifFilename) {
    return (serifDirname => (serifAst => (({imports, exports, statements}) => (({declared, referenced}) => (undeclared => chain(imports => (serifAst => (esAst => (esSource => (esBasename => (esFilename => chain(_ => chain(_ => Future.resolve({
      serifFilename,
      esFilename
    }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
      recursive: true
    })(path.dirname(esFilename))))(path.join([absDst, path.relative(absSrc)(serifDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(generate(esAst, {})))(serif.esModuleFromSerifModule(serifAst)))(serif.changeExtensions(serif.rewrite(Module(imports)(exports)(statements)))))(parallel(map($ => ($value => {
      const $match = flip(match)($value);
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
          return (({source, specifiers}) => map($ => ImportDeclaration(source)(join($)))(parallel(map($ => ($value => {
            const $match = flip(match)($value);
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
                return (({hiding}) => chain(namesExported => (namesHidden => (namesHiddenNeedlessly => namesHiddenNeedlessly.size > 0 ? Future.reject(Error(format.list(Array.from(namesHiddenNeedlessly)) + " " + (equals(namesHiddenNeedlessly.size)(1) ? "is" : "are") + " not exported from " + source.value + " so need not be hidden")) : Future.resolve(map(function (name) {
                  return ImportSpecifier(Identifier(name))(Identifier(preludeNames.has(name) ? "$" + name : name));
                })(filter($rhs => undeclared.has($rhs))(Array.from(reject($rhs => namesHidden.has($rhs))(namesExported))))))(reject($rhs => namesExported.has($rhs))(namesHidden)))(globalThis.Reflect.construct(Set, [map($ => $.name)(hiding)])))(map((...args) => globalThis.Reflect.construct(Set, args))(endsWith(".serif")(source.value) ? Future.resolve(chain(function (node) {
                  return ($value => {
                    const $match = flip(match)($value);
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
                        return (({specifiers}) => map($ => $.exported.name)(specifiers))($result);
                      }
                    }
                    {
                      const $result = $match({
                        type: "any"
                      });
                      if ($result != null$) {
                        return (({}) => [])($result);
                      }
                    }
                  })(node);
                })((args => target => target.get.apply(target, args))([path.join(concat([serifDirname])(splitOn("/")(source.value)))])(tree).ast.exports)) : map(Object.keys)(Future.attemptP(function () {
                  return import(source.value);
                })))))($result);
              }
            }
            {
              const $result = $match({
                type: "identifier",
                name: "specifier"
              });
              if ($result != null$) {
                return (({specifier}) => Future.resolve([specifier]))($result);
              }
            }
          })($))(specifiers))))($result);
        }
      }
    })($))(serifAst.imports))))(reject($rhs => declared.has($rhs))(referenced)))(vars(serifAst)))(serifAst))((args => target => target.get.apply(target, args))([serifFilename])(tree).ast))(path.dirname(serifFilename));
  })(filenames)))(orderDependencies(tree)))(createTree(Future.resolve(globalThis.Reflect.construct(Map, [[]])))(absFilenames));
  return Future.fork(console.error)(function (filenames) {
    return (args => target => target.forEach.apply(target, args))([function ({serifFilename, esFilename}) {
      return (() => {
        console.log("• " + path.relative(cwd)(serifFilename));
        return console.log("  ➔ " + path.relative(cwd)(esFilename));
      })();
    }])(filenames);
  })(program);
})();
