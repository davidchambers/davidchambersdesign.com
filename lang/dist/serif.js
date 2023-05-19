import {generate} from "astring";
import * as Future from "fluture";
import {ExportNamedDeclaration, ExportSpecifier, Identifier, ImportDeclaration, ImportSpecifier, Module, String} from "./InternalNode.js";
import {vars} from "./SourceNode.js";
import codegen from "./codegen.js";
import * as format from "./format.js";
import * as fs from "./fs.js";
import * as grammar from "./grammar.js";
import parallel from "./parallel.js";
import * as path from "./path.js";
import Prelude from "./prelude.js";
import rewrite from "./rewrite.js";
const id = x => x;
const negate = x => -x;
const charAt = index => string => string.charAt(index);
const startsWith = prefix => string => string.startsWith(prefix);
const endsWith = suffix => string => string.endsWith(suffix);
const trimEnd = string => string.trimEnd();
const splitOn = separator => string => string.split(separator);
const joinWith = separator => xs => xs.join(separator);
const sliceFrom = from => xs => xs.slice(from);
const sliceTo = to => xs => xs.slice(0, to);
const concat = this$ => that => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return this$.concat(that);
  }
  if ($discriminant === "[object String]") {
    return this$.concat(that);
  }
  return this$["fantasy-land/concat"](that);
})(globalThis.Object.prototype.toString.call(this$));
const empty = typeRep => ($discriminant => {
  if ($discriminant === "Array") {
    return [];
  }
  if ($discriminant === "Object") {
    return {};
  }
  if ($discriminant === "String") {
    return "";
  }
  if ($discriminant === "Set") {
    return globalThis.Reflect.construct(globalThis.Set, [[]]);
  }
  if ($discriminant === "Map") {
    return globalThis.Reflect.construct(globalThis.Map, [[]]);
  }
  return typeRep["fantasy-land/empty"]();
})(typeRep.name);
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
const chain = f => x => ($discriminant => {
  if ($discriminant === "[object Array]") {
    return x.flatMap(x => f(x));
  }
  if ($discriminant === "[object Function]") {
    return y => x(f(y))(y);
  }
  return x["fantasy-land/chain"](f);
})(globalThis.Object.prototype.toString.call(x));
const join = chain(id);
const preludeNames = globalThis.Reflect.construct(Set, [globalThis.Object.keys(Prelude)]);
const parse = filename => sourceText => Future.mapRej(error => {
  const lines = chain(line => {
    const offset = line.number - error.location.start.line;
    return offset > -5 && offset <= 0 ? [line] : [];
  })((args => target => target.map.apply(target, args))([(text, index) => {
    return {
      number: index + 1,
      text: trimEnd(text)
    };
  }])(splitOn(RegExp("^", "m"))(sourceText)));
  const renderLineNumber = number => (args => target => target.padStart.apply(target, args))([4])((args => target => target.toString.apply(target, args))([])(number));
  return concat("\n\u001b[1m")(concat(path.relative(Deno.cwd())(error.location.source))(concat("\u001b[0m\n\n")(concat(joinWith("")((args => target => target.map.apply(target, args))([(line, idx, lines) => {
    const column = error.location.start.column - 1;
    return concat("\u001b[7m")(concat(renderLineNumber(line.number))(concat("\u001b[0m")(concat(idx < lines.length - 1 ? line.text : concat(sliceTo(column)(line.text))(concat("\u001b[7m")(concat(charAt(column)(line.text))("\u001b[0m" + sliceFrom(column + 1)(line.text)))))("\n"))));
  }])(lines)))(concat((length => (args => target => target.repeat.apply(target, args))([length + error.location.start.column - 1])(" "))(($ => $.length)(renderLineNumber(($ => $.number)((args => target => target.at.apply(target, args))([-1])(lines))))))(concat("^\n")(concat(error.message)("\n")))))));
})(Future.attempt(() => {
  return grammar.parse(sourceText, {
    grammarSource: filename
  });
}));
const createTree = reduce(futureTree => filename => chain(tree => tree.has(filename) ? Future.resolve(tree) : chain(sourceText => chain($0 => {
  const imports = $0.imports;
  const exports = $0.exports;
  const statements = $0.statements;
  return (dependencies => (exports => (module => (initial => createTree(initial)(dependencies))(Future.resolve(globalThis.Reflect.construct(Map, [[...tree, [filename, {
    sourceText,
    ast: module,
    dependencies
  }]]]))))(Module(imports)(exports)(statements)))(map($ => ($value => {
    if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
      const specifiers = $value[0];
      return ExportNamedDeclaration(chain($ => ($value => {
        if ($value.$tag === "ExportAllSpecifier" && $value.$size === 1) {
          const hiding = $value[0];
          {
            const declared$0021 = empty(Set);
            map(statement => (args => target => target.forEach.apply(target, args))([Set.prototype.add, declared$0021])(($ => $.declared)(vars(statement))))(statements);
            return map($ => join(ExportSpecifier)(Identifier($)))(reject($rhs => globalThis.Reflect.construct(Set, [map($ => $.name)(hiding)]).has($rhs))(globalThis.Array.from(declared$0021)));
          }
        }
        {
          const specifier = $value;
          return [specifier];
        }
      })($))(specifiers));
    }
    {
      const declaration = $value;
      return declaration;
    }
  })($))(exports)))(map($ => path.join(($rhs => append($rhs)([filename, ".."]))($)))(filter(s => (startsWith("/")(s) || startsWith(".")(s)) && endsWith(".serif")(s))(map($ => $.value)(map($ => $.source)(imports)))));
})(parse(filename)(sourceText)))(Future.mapRej($ => $.message)(fs.readFile(filename))))(futureTree));
const orderDependencies = tree => {
  const unsorted$0021 = globalThis.Array.from((args => target => target.keys.apply(target, args))([])(tree));
  const sorted$0021 = empty(Set);
  const recur = () => {
    return ($value => {
      if (globalThis.Array.isArray($value)) {
        if ($value.length === 0) {
          return sorted$0021;
        }
      }
      {
        const unsorted$0021 = $value;
        {
          const filename = (args => target => target.shift.apply(target, args))([])(unsorted$0021);
          (args => target => target.every.apply(target, args))([$rhs => sorted$0021.has($rhs)])(($ => $.dependencies)((args => target => target.get.apply(target, args))([filename])(tree))) ? (args => target => target.add.apply(target, args))([filename])(sorted$0021) : (args => target => target.push.apply(target, args))([filename])(unsorted$0021);
          return recur();
        }
      }
    })(unsorted$0021);
  };
  return globalThis.Array.from(recur());
};
{
  const cwd = Deno.cwd();
  const src = Deno.args[0];
  const dst = Deno.args[1];
  const filenames = Deno.args.slice(2);
  const toAbs = abs => rel => path.join(concat([abs])(splitOn("/")(rel)));
  const absSrc = toAbs(cwd)(src);
  const absDst = toAbs(cwd)(dst);
  const absFilenames = map(toAbs(absSrc))(filenames);
  const program = chain(tree => (filenames => parallel(map(serifFilename => (serifDirname => (serifAst => ($0 => {
    const imports = $0.imports;
    const exports = $0.exports;
    const statements = $0.statements;
    return ($0 => {
      const declared = $0.declared;
      const referenced = $0.referenced;
      return (undeclared => chain(imports => (serifAst => (esAst => (esSource => (esBasename => (esFilename => chain(_ => chain(_ => Future.resolve({
        serifFilename,
        esFilename
      }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
        recursive: true
      })(path.dirname(esFilename))))(path.join([absDst, path.relative(absSrc)(serifDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(generate(esAst, {})))(codegen(serifAst)))(($value => {
        if ($value.$tag === "Module" && $value.$size === 3) {
          const imports = $value[0];
          {
            const exports = $value[1];
            {
              const statements = $value[2];
              {
                const imports$0027 = map($ => ($value => {
                  if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
                    if ($value[0].$tag === "String" && $value[0].$size === 1) {
                      const source = $value[0][0];
                      {
                        const specifiers = $value[1];
                        return ImportDeclaration(String(endsWith(".serif")(source) ? concat(sliceTo(negate((".serif").length))(source))(".js") : source))(specifiers);
                      }
                    }
                  }
                  throw globalThis.Error("Pattern matching failure");
                })($))(imports);
                return Module(imports$0027)(exports)(statements);
              }
            }
          }
        }
        throw globalThis.Error("Pattern matching failure");
      })(rewrite(Module(imports)(exports)(statements)))))(parallel(map($ => ($value => {
        if ($value.$tag === "ImportDeclaration" && $value.$size === 2) {
          if ($value[0].$tag === "String" && $value[0].$size === 1) {
            const source = $value[0][0];
            {
              const specifiers = $value[1];
              return map($ => ImportDeclaration(String(source))(join($)))(parallel(map($ => ($value => {
                if ($value.$tag === "ImportAllSpecifier" && $value.$size === 1) {
                  const hiding = $value[0];
                  return chain(namesExported => (namesHidden => (namesHiddenNeedlessly => namesHiddenNeedlessly.size > 0 ? Future.reject(Error(format.list(globalThis.Array.from(namesHiddenNeedlessly)) + " " + (namesHiddenNeedlessly.size === 1 ? "is" : "are") + " not exported from " + source + " so need not be hidden")) : Future.resolve(map(name => ImportSpecifier(Identifier(name))(Identifier(preludeNames.has(name) ? "$" + name : name)))(filter($rhs => undeclared.has($rhs))(globalThis.Array.from(reject($rhs => namesHidden.has($rhs))(namesExported))))))(reject($rhs => namesExported.has($rhs))(namesHidden)))(globalThis.Reflect.construct(Set, [map($ => $.name)(hiding)])))(map(names => globalThis.Reflect.construct(Set, [names]))(endsWith(".serif")(source) ? Future.resolve(chain(node => ($value => {
                    if ($value.$tag === "ExportNamedDeclaration" && $value.$size === 1) {
                      const specifiers = $value[0];
                      return map($ => $.exported.name)(specifiers);
                    }
                    return [];
                    throw globalThis.Error("Pattern matching failure");
                  })(node))((args => target => target.get.apply(target, args))([path.join(concat([serifDirname])(splitOn("/")(source)))])(tree).ast.exports)) : map(globalThis.Object.keys)(Future.attemptP(() => {
                    return import(source);
                  }))));
                }
                {
                  const specifier = $value;
                  return Future.resolve([specifier]);
                }
              })($))(specifiers)));
            }
          }
        }
        throw globalThis.Error("Pattern matching failure");
      })($))(serifAst.imports))))(reject($rhs => declared.has($rhs))(referenced));
    })(vars(serifAst));
  })(serifAst))(($ => $.ast)((args => target => target.get.apply(target, args))([serifFilename])(tree))))(path.dirname(serifFilename)))(filenames)))(orderDependencies(tree)))(createTree(Future.resolve(globalThis.Reflect.construct(Map, [[]])))(absFilenames));
  Future.fork(console.error)(filenames => {
    filenames.forEach($0 => {
      const serifFilename = $0.serifFilename;
      const esFilename = $0.esFilename;
      console.log("• " + path.relative(cwd)(serifFilename));
      console.log("  ➔ " + path.relative(cwd)(esFilename));
    });
  })(program);
}
