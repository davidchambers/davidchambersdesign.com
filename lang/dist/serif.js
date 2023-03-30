import {generate} from "astring";
import {attempt, fork, mapRej, parallel, resolve} from "fluture";
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
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
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
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const parse = filename => sourceText => mapRej(error => (() => {
  const lines = chain(line => (() => {
    const offset = line.number - error.location.start.line;
    return offset > -5 && offset <= 0 ? [line] : [];
  })())(Prelude._apply("map")([(text, index) => ({
    number: index + 1,
    text: Prelude._apply("trimEnd")([])(text)
  })])(Prelude._apply("split")([apply(["^", "m"])(RegExp)])(sourceText)));
  const renderLineNumber = x => Prelude._apply("padStart")([4])(String(x));
  return `\n\x1B[1m${path.relative(apply([])(process.cwd))(error.location.source)}\x1B[0m\n\n${Prelude._apply("join")([""])(Prelude._apply("map")([(line, idx, lines) => `\x1B[7m${renderLineNumber(line.number)}\x1B[0m${idx < lines.length - 1 ? line.text : `${Prelude._apply("slice")([0, error.location.start.column - 1])(line.text)}\x1B[7m${Prelude._apply("charAt")([error.location.start.column - 1])(line.text)}\x1B[0m${Prelude._apply("slice")([error.location.start.column])(line.text)}`}\n`])(lines))}${(length => Prelude._apply("repeat")([length + error.location.start.column - 1])(" "))((x => x.length)(renderLineNumber((x => x.number)(Prelude._apply("at")([-1])(lines)))))}^\n${error.message}\n`;
})())(serif.parse(filename)(sourceText));
const reducer = futureTree => filename => Prelude.chain(findDependencies(filename))(futureTree);
const findDependencies = filename => tree => Prelude._apply("has")([filename])(tree) ? resolve(tree) : Prelude.chain(sourceText => Prelude.chain(ast => (dependencies => (exportedNames => reduce(reducer)(resolve(construct(Map)([[...tree, [filename, {
  sourceText,
  ast,
  dependencies,
  exportedNames
}]]])))(dependencies))(Prelude.chain(match$0027(Node)(const$([]))({
  ExportNamedDeclaration: map(x => (x => x.name)((x => x.exported)(x)))
}))(ast.exports)))(Prelude.chain(({source: {value}}) => Prelude._apply("test")([value])(RegExp("^[./].*[.]serif$")) ? [path.join([filename, "..", value])] : [])(ast.imports)))(parse(filename)(sourceText)))(mapRej(x => x.message)(fs.readFile(filename)));
const orderDependencies = tree => (() => {
  const recur = unsorted$0021 => sorted$0021 => Prelude.equals([])(unsorted$0021) ? sorted$0021 : (() => {
    const filename = Prelude._apply("shift")([])(unsorted$0021);
    const {dependencies} = Prelude._apply("get")([filename])(tree);
    Prelude._apply("every")([filename => Prelude._apply("has")([filename])(sorted$0021)])(dependencies) ? Prelude._apply("add")([filename])(sorted$0021) : Prelude._apply("push")([filename])(unsorted$0021);
    return recur(unsorted$0021)(sorted$0021);
  })();
  return Array.from(recur(Array.from(Prelude._apply("keys")([])(tree)))(construct(Set)([[]])));
})();
(() => {
  const cwd = apply([])(process.cwd);
  const [, , src, dst, ...filenames] = process.argv;
  const toAbs = abs => rel => path.join(Prelude.concat([abs])(Prelude._apply("split")(["/"])(rel)));
  const absSrc = toAbs(cwd)(src);
  const absDst = toAbs(cwd)(dst);
  const absFilenames = Prelude.map(toAbs(absSrc))(filenames);
  const program = Prelude.chain(tree => (filenames => parallel(16)(flip(map)(filenames)(serifFilename => (serifDirname => (serifAst => Prelude.chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSource => (esBasename => (esFilename => Prelude.chain(_ => Prelude.chain(_ => resolve({
    serifFilename,
    esFilename
  }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
    recursive: true
  })(path.dirname(esFilename))))(path.join([absDst, path.relative(absSrc)(serifDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(apply([esAst, {}])(generate)))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(importPath => (filename => (x => x.exportedNames)(Prelude._apply("get")([filename])(tree)))(path.join(concat([serifDirname])(Prelude._apply("split")(["/"])(importPath)))))))((x => x.ast)(Prelude._apply("get")([serifFilename])(tree))))(path.dirname(serifFilename)))))(orderDependencies(tree)))(reduce(reducer)(resolve(construct(Map)([[]])))(absFilenames));
  return fork(console.error)(filenames => Prelude._apply("forEach")([({serifFilename, esFilename}) => (() => {
    console.log("• " + path.relative(cwd)(serifFilename));
    return console.log("  ➔ " + path.relative(cwd)(esFilename));
  })()])(filenames))(program);
})();
