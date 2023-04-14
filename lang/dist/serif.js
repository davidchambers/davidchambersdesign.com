import {generate} from "astring";
import * as Future from "fluture";
import Node, {ExportNamedDeclaration, ExportSpecifier, Identifier, ImportDeclaration, ImportSpecifier, Module} from "./Node.js";
import * as fs from "./fs.js";
import * as serif from "./index.js";
import parallel from "./parallel.js";
import * as path from "./path.js";
import Prelude from "./prelude.js";
import vars, {declared, mergeAll} from "./vars.js";
const AND = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
    default:
      return lhs & rhs;
  }
})();
const subtract = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
    default:
      return lhs - rhs;
  }
})();
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
const id = x => x;
const const$ = x => y => x;
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
    default:
      return this$ === that;
  }
})();
const compose = f => g => (() => {
  switch (globalThis.Object.prototype.toString.call(g)) {
    case "[object Function]":
      return x => f(g(x));
    default:
      return g["fantasy-land/compose"](f);
  }
})();
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
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
      return xs["fantasy-land/reduce"](f, y);
  }
})();
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const flip = f => y => x => f(x)(y);
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
const preludeNames = construct(Set)([Object.keys(Prelude)]);
const parse = filename => sourceText => Future.mapRej(error => (() => {
  const lines = chain(line => (() => {
    const offset = subtract(error.location.start.line)(line.number);
    return offset > -5 && offset <= 0 ? [line] : [];
  })())((args => target => target.map.apply(target, args))([(text, index) => ({
    number: index + 1,
    text: (args => target => target.trimEnd.apply(target, args))([])(text)
  })])((args => target => target.split.apply(target, args))([RegExp("^", "m")])(sourceText)));
  const renderLineNumber = compose((args => target => target.padStart.apply(target, args))([4]))(String);
  return `\n\x1B[1m${path.relative(Deno.cwd())(error.location.source)}\x1B[0m\n\n${(args => target => target.join.apply(target, args))([""])((args => target => target.map.apply(target, args))([(line, idx, lines) => `\x1B[7m${renderLineNumber(line.number)}\x1B[0m${idx < subtract(1)(lines.length) ? line.text : `${(args => target => target.slice.apply(target, args))([0, subtract(1)(error.location.start.column)])(line.text)}\x1B[7m${(args => target => target.charAt.apply(target, args))([subtract(1)(error.location.start.column)])(line.text)}\x1B[0m${(args => target => target.slice.apply(target, args))([error.location.start.column])(line.text)}`}\n`])(lines))}${(length => (args => target => target.repeat.apply(target, args))([subtract(1)(length + error.location.start.column)])(" "))(renderLineNumber((args => target => target.at.apply(target, args))([-1])(lines).number).length)}^\n${error.message}\n`;
})())(serif.parse(filename)(sourceText));
const createTree = reduce(futureTree => filename => chain(tree => tree.has(filename) ? Future.resolve(tree) : chain(sourceText => chain(({imports, exports, statements}) => (dependencies => (exports => (module => (initial => createTree(initial)(dependencies))(Future.resolve(construct(Map)([[...tree, [filename, {
  sourceText,
  ast: module,
  dependencies
}]]]))))(Module(imports)(exports)(statements)))(($lhs => map($lhs)(exports))(Node.matchOr(id)({
  ExportNamedDeclaration: compose(ExportNamedDeclaration)(chain(Node.matchOr(Array.of)({
    ExportAllSpecifier: hiding => map(compose(join(ExportSpecifier))(Identifier))(Array.from(subtract(construct(Set)([map($ => $.name)(hiding)]))(declared(mergeAll(map(vars)(statements))))))
  })))
}))))(chain(({source}) => (args => target => target.test.apply(target, args))([source.value])(RegExp("^[./].*[.]serif$")) ? [path.join([filename, "..", source.value])] : [])(imports)))(parse(filename)(sourceText)))(Future.mapRej($ => $.message)(fs.readFile(filename))))(futureTree));
const orderDependencies = tree => (() => {
  const unsorted$0021 = Array.from((args => target => target.keys.apply(target, args))([])(tree));
  const sorted$0021 = empty(Set);
  const recur = () => equals([])(unsorted$0021) ? sorted$0021 : (() => {
    const filename = (args => target => target.shift.apply(target, args))([])(unsorted$0021);
    (args => target => target.every.apply(target, args))([filename => sorted$0021.has(filename)])((args => target => target.get.apply(target, args))([filename])(tree).dependencies) ? (args => target => target.add.apply(target, args))([filename])(sorted$0021) : (args => target => target.push.apply(target, args))([filename])(unsorted$0021);
    return recur();
  })();
  return Array.from(recur());
})();
(() => {
  const cwd = Deno.cwd();
  const [src, dst, ...filenames] = Deno.args;
  const toAbs = abs => rel => path.join(concat([abs])((args => target => target.split.apply(target, args))(["/"])(rel)));
  const absSrc = toAbs(cwd)(src);
  const absDst = toAbs(cwd)(dst);
  const absFilenames = map(toAbs(absSrc))(filenames);
  const program = chain(tree => (filenames => parallel(flip(map)(filenames)(serifFilename => (serifDirname => (serifAst => (({imports, exports, statements}) => (({declared, referenced}) => (undeclared => chain(imports => (serifAst => (esAst => (esSource => (esBasename => (esFilename => chain(_ => chain(_ => Future.resolve({
    serifFilename,
    esFilename
  }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
    recursive: true
  })(path.dirname(esFilename))))(path.join([absDst, path.relative(absSrc)(serifDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(generate(esAst, {})))(serif.esModuleFromSerifModule(serifAst)))(serif.changeExtensions(serif.rewrite(Module(imports)(exports)(statements)))))(parallel(($lhs => map($lhs)(serifAst.imports))(Node.match({
    ImportDeclaration: source => compose(map(compose(ImportDeclaration(source))(join)))(compose(parallel)(map(Node.matchOr(compose(Future.resolve)(Array.of))({
      ImportAllSpecifier: hiding => chain(namesExported => (namesHidden => (namesHiddenNeedlessly => namesHiddenNeedlessly.size > 0 ? Future.reject(Error(format.list(Array.from(namesHiddenNeedlessly)) + " " + (equals(1)(namesHiddenNeedlessly.size) ? "is" : "are") + " not exported from " + source.value + " so need not be hidden")) : Future.resolve(map(name => ImportSpecifier(Identifier(name))(Identifier(preludeNames.has(name) ? "$" + name : name)))(Array.from(AND(undeclared)(subtract(namesHidden)(namesExported))))))(subtract(namesExported)(namesHidden)))(construct(Set)([map($ => $.name)(hiding)])))(map(compose(construct(Set))(Array.of))((args => target => target.endsWith.apply(target, args))([".serif"])(source.value) ? (filename => Future.resolve(chain(Node.matchOr(const$([]))({
        ExportNamedDeclaration: map(compose($ => $.name)($ => $.exported))
      }))((args => target => target.get.apply(target, args))([filename])(tree).ast.exports)))(path.join(concat([serifDirname])((args => target => target.split.apply(target, args))(["/"])(source.value)))) : map(Object.keys)(Future.attemptP(() => import(source.value)))))
    }))))
  })))))(subtract(declared)(referenced)))(vars(serifAst)))(serifAst))((args => target => target.get.apply(target, args))([serifFilename])(tree).ast))(path.dirname(serifFilename)))))(orderDependencies(tree)))(createTree(Future.resolve(construct(Map)([[]])))(absFilenames));
  return Future.fork(console.error)(filenames => (args => target => target.forEach.apply(target, args))([({serifFilename, esFilename}) => (() => {
    console.log("• " + path.relative(cwd)(serifFilename));
    return console.log("  ➔ " + path.relative(cwd)(esFilename));
  })()])(filenames))(program);
})();
