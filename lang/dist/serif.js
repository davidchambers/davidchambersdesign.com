import process from "node:process";
import {generate} from "astring";
import {fork, mapRej, parallel, resolve} from "fluture";
import Node from "./Node.js";
import * as fs from "./fs.js";
import * as serif from "./index.js";
import * as path from "./path.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  apply: f => args => f.apply(null, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const parse = filename => sourceText => mapRej(error => (() => {
  const lines = chain(line => (() => {
    const offset = line.number - error.location.start.line;
    return offset > -5 && offset <= 0 ? [line] : [];
  })())((args => target => target.map.apply(target, args))([(text, index) => ({
    number: index + 1,
    text: (args => target => target.trimEnd.apply(target, args))([])(text)
  })])((args => target => target.split.apply(target, args))([apply(RegExp)(["^", "m"])])(sourceText)));
  const renderLineNumber = x => (args => target => target.padStart.apply(target, args))([4])(String(x));
  return `\n\x1B[1m${path.relative(apply(process.cwd)([]))(error.location.source)}\x1B[0m\n\n${(args => target => target.join.apply(target, args))([""])((args => target => target.map.apply(target, args))([(line, idx, lines) => `\x1B[7m${renderLineNumber(line.number)}\x1B[0m${idx < lines.length - 1 ? line.text : `${(args => target => target.slice.apply(target, args))([0, error.location.start.column - 1])(line.text)}\x1B[7m${(args => target => target.charAt.apply(target, args))([error.location.start.column - 1])(line.text)}\x1B[0m${(args => target => target.slice.apply(target, args))([error.location.start.column])(line.text)}`}\n`])(lines))}${(length => (args => target => target.repeat.apply(target, args))([length + error.location.start.column - 1])(" "))((x => x.length)(renderLineNumber((x => x.number)((args => target => target.at.apply(target, args))([-1])(lines)))))}^\n${error.message}\n`;
})())(serif.parse(filename)(sourceText));
const reducer = futureTree => filename => Prelude.chain(findDependencies(filename))(futureTree);
const findDependencies = filename => tree => (args => target => target.has.apply(target, args))([filename])(tree) ? resolve(tree) : Prelude.chain(sourceText => Prelude.chain(ast => (dependencies => (exportedNames => reduce(reducer)(resolve(construct(Map)([[...tree, [filename, {
  sourceText,
  ast,
  dependencies,
  exportedNames
}]]])))(dependencies))(Prelude.chain(match$0027(Node)(const$([]))({
  ExportNamedDeclaration: map(x => (x => x.name)((x => x.exported)(x)))
}))(ast.exports)))(Prelude.chain(({source: {value}}) => (args => target => target.test.apply(target, args))([value])(RegExp("^[./].*[.]serif$")) ? [path.join([filename, "..", value])] : [])(ast.imports)))(parse(filename)(sourceText)))(mapRej(x => x.message)(fs.readFile(filename)));
const orderDependencies = tree => (() => {
  const recur = unsorted$0021 => sorted$0021 => Prelude.equals([])(unsorted$0021) ? sorted$0021 : (() => {
    const filename = (args => target => target.shift.apply(target, args))([])(unsorted$0021);
    const {dependencies} = (args => target => target.get.apply(target, args))([filename])(tree);
    (args => target => target.every.apply(target, args))([filename => (args => target => target.has.apply(target, args))([filename])(sorted$0021)])(dependencies) ? (args => target => target.add.apply(target, args))([filename])(sorted$0021) : (args => target => target.push.apply(target, args))([filename])(unsorted$0021);
    return recur(unsorted$0021)(sorted$0021);
  })();
  return Array.from(recur(Array.from((args => target => target.keys.apply(target, args))([])(tree)))(construct(Set)([[]])));
})();
(() => {
  const cwd = apply(process.cwd)([]);
  const [, , src, dst, ...filenames] = process.argv;
  const toAbs = abs => rel => path.join(Prelude.concat([abs])((args => target => target.split.apply(target, args))(["/"])(rel)));
  const absSrc = toAbs(cwd)(src);
  const absDst = toAbs(cwd)(dst);
  const absFilenames = Prelude.map(toAbs(absSrc))(filenames);
  const program = Prelude.chain(tree => (filenames => parallel(16)(flip(map)(filenames)(serifFilename => (serifDirname => (serifAst => Prelude.chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSource => (esBasename => (esFilename => Prelude.chain(_ => Prelude.chain(_ => resolve({
    serifFilename,
    esFilename
  }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
    recursive: true
  })(path.dirname(esFilename))))(path.join([absDst, path.relative(absSrc)(serifDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(apply(generate)([esAst, {}])))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(importPath => (filename => (x => x.exportedNames)((args => target => target.get.apply(target, args))([filename])(tree)))(path.join(concat([serifDirname])((args => target => target.split.apply(target, args))(["/"])(importPath)))))))((x => x.ast)((args => target => target.get.apply(target, args))([serifFilename])(tree))))(path.dirname(serifFilename)))))(orderDependencies(tree)))(reduce(reducer)(resolve(construct(Map)([[]])))(absFilenames));
  return fork(console.error)(filenames => (args => target => target.forEach.apply(target, args))([({serifFilename, esFilename}) => (() => {
    console.log("• " + path.relative(cwd)(serifFilename));
    return console.log("  ➔ " + path.relative(cwd)(esFilename));
  })()])(filenames))(program);
})();
