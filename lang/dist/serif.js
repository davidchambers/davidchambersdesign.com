import {generate} from "astring";
import {attempt, fork, mapRej, parallel, resolve} from "fluture";
import Node from "./Node.js";
import * as fs from "./fs.js";
import * as serif from "./index.js";
import * as path from "./path.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  match: type => Prelude["match'"](type)(_ => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: b => !b,
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => foldable => foldable[Array.isArray(foldable) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => foldable => foldable.reduceRight((y, x) => f(y)(x), y),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  reject: predicate => Prelude.filter(x => !predicate(x)),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f)
};
const {_apply, apply, construct, match, ["match'"]: match$0027, id, const: const$, not, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
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
  const recur = unsorted$0021 => sorted$0021 => Object.is(0, unsorted$0021.length) ? sorted$0021 : (() => {
    const filename = Prelude._apply("shift")([])(unsorted$0021);
    const {dependencies} = Prelude._apply("get")([filename])(tree);
    Prelude._apply("every")([filename => Prelude._apply("has")([filename])(sorted$0021)])(dependencies) ? Prelude._apply("add")([filename])(sorted$0021) : Prelude._apply("push")([filename])(unsorted$0021);
    return recur(unsorted$0021)(sorted$0021);
  })();
  return Array.from(recur(Array.from(Prelude._apply("keys")([])(tree)))(construct(Set)([[]])));
})();
(() => {
  const cwd = apply([])(process.cwd);
  const [, , src, lib, ...filenames] = process.argv;
  const program = Prelude.chain(tree => (filenames => parallel(16)(flip(map)(filenames)(serifFilename => (serifDirname => (serifAst => Prelude.chain(serifAst$0027 => (serifAst$0027$0027 => (esAst => (esSource => (esDirname => (esBasename => (esFilename => Prelude.chain(_ => Prelude.chain(_ => resolve({
    serifFilename,
    esFilename
  }))(fs.writeFile(esFilename)(esSource)))(fs.mkdir({
    recursive: true
  })(esDirname)))(path.join([lib, path.relative(src)(esDirname), esBasename])))(path.basename(serifFilename)(".serif") + ".js"))(path.dirname(serifFilename)))(apply([esAst, {}])(generate)))(serif.esModuleFromSerifModule(serifAst$0027$0027)))(serif.changeExtensions(serifAst$0027)))(serif.rewrite(serifAst)(importPath => (filename => (x => x.exportedNames)(Prelude._apply("get")([filename])(tree)))(path.join(concat([serifDirname])(Prelude._apply("split")(["/"])(importPath)))))))((x => x.ast)(Prelude._apply("get")([serifFilename])(tree))))(path.dirname(serifFilename)))))(orderDependencies(tree)))(reduce(reducer)(resolve(construct(Map)([[]])))(filenames));
  return fork(console.error)(filenames => Prelude._apply("forEach")([({serifFilename, esFilename}) => (() => {
    console.log(`• ${path.relative(cwd)(serifFilename)}`);
    return console.log(`  ➔ ${path.relative(cwd)(esFilename)}`);
  })()])(filenames))(program);
})();
