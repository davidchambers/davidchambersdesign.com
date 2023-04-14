import {generate} from "astring";
import {fork, mapRej, resolve} from "fluture";
import Node from "./Node.js";
import * as fs from "./fs.js";
import * as serif from "./index.js";
import parallel from "./parallel.js";
import * as path from "./path.js";
const subtract = rhs => lhs => (() => {
  switch (globalThis.Object.prototype.toString.call(rhs)) {
    case "[object Set]":
      return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
    default:
      return lhs - rhs;
  }
})();
const construct = constructor => args => globalThis.Reflect.construct(constructor, args);
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
const filter = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.filter(x => f(x));
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
const of = typeRep => (() => {
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
const prepend = x => xs => concat(of(xs.constructor)(x))(xs);
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
const parse = filename => sourceText => mapRej(error => (() => {
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
const reducer = futureTree => filename => chain(findDependencies(filename))(futureTree);
const findDependencies = filename => tree => tree.has(filename) ? resolve(tree) : chain(sourceText => chain(ast => (dependencies => (namesInPattern => (declaredNames => (exportedNames => reduce(reducer)(resolve(construct(Map)([[...tree, [filename, {
  sourceText,
  ast,
  dependencies,
  exportedNames
}]]])))(dependencies))(chain(Node.matchOr(const$([]))({
  ExportNamedDeclaration: specifiers => chain(Node.match({
    ExportSpecifier: local => exported => [exported.name],
    ExportAllSpecifier: hiding => (() => {
      const hidden = construct(Set)([map($ => $.name)(hiding)]);
      return reject(name => hidden.has(name))(declaredNames);
    })()
  }))(specifiers)
}))(ast.exports)))(chain(Node.matchOr(const$([]))({
  VariableDeclaration: pattern => expression => namesInPattern(pattern),
  FunctionDeclaration: name => parameters => body => [name],
  DataTypeDeclaration: identifier => compose($rhs => concat(namesInPattern(identifier))($rhs))($lhs => chain(Node.match({
    DataConstructorDefinition: compose(const$)(namesInPattern)
  }))($lhs))
}))(ast.statements)))(Node.match({
  ArrayPattern: elements => chain(namesInPattern)(elements),
  ObjectPattern: properties => chain(namesInPattern)(properties),
  Property: key => value => namesInPattern(key),
  RestElement: argument => namesInPattern(argument),
  Identifier: name => [name]
})))(chain(({source: {value}}) => (args => target => target.test.apply(target, args))([value])(RegExp("^[./].*[.]serif$")) ? [path.join([filename, "..", value])] : [])(ast.imports)))(parse(filename)(sourceText)))(mapRej($ => $.message)(fs.readFile(filename)));
const orderDependencies = tree => (() => {
  const recur = unsorted$0021 => sorted$0021 => equals([])(unsorted$0021) ? sorted$0021 : (() => {
    const filename = (args => target => target.shift.apply(target, args))([])(unsorted$0021);
    const {dependencies} = (args => target => target.get.apply(target, args))([filename])(tree);
    (args => target => target.every.apply(target, args))([filename => sorted$0021.has(filename)])(dependencies) ? (args => target => target.add.apply(target, args))([filename])(sorted$0021) : (args => target => target.push.apply(target, args))([filename])(unsorted$0021);
    return recur(unsorted$0021)(sorted$0021);
  })();
  return Array.from(recur(Array.from((args => target => target.keys.apply(target, args))([])(tree)))(empty(Set)));
})();
(() => {
  const cwd = Deno.cwd();
  const [src, dst, ...filenames] = Deno.args;
  const toAbs = abs => rel => path.join(concat([abs])((args => target => target.split.apply(target, args))(["/"])(rel)));
  const absSrc = toAbs(cwd)(src);
  const absDst = toAbs(cwd)(dst);
  const absFilenames = map(toAbs(absSrc))(filenames);
  const program = chain(tree => (filenames => parallel(flip(map)(filenames)(serifFilename => (serifDirname => (serifAst => chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSource => (esBasename => (esFilename => chain(_ => chain(_ => resolve({
    serifFilename,
    esFilename
  }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
    recursive: true
  })(path.dirname(esFilename))))(path.join([absDst, path.relative(absSrc)(serifDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(generate(esAst, {})))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(importPath => (filename => (args => target => target.get.apply(target, args))([filename])(tree).exportedNames)(path.join(prepend(serifDirname)((args => target => target.split.apply(target, args))(["/"])(importPath)))))))((args => target => target.get.apply(target, args))([serifFilename])(tree).ast))(path.dirname(serifFilename)))))(orderDependencies(tree)))(reduce(reducer)(resolve(construct(Map)([[]])))(absFilenames));
  return fork(console.error)(filenames => (args => target => target.forEach.apply(target, args))([({serifFilename, esFilename}) => (() => {
    console.log("• " + path.relative(cwd)(serifFilename));
    return console.log("  ➔ " + path.relative(cwd)(esFilename));
  })()])(filenames))(program);
})();
