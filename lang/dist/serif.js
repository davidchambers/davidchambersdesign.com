import {generate} from "astring";
import {attempt, fork, mapRej, parallel, resolve} from "fluture";
import * as Map from "./Map.js";
import * as Set from "./Set.js";
import * as fs from "./fs.js";
import * as serif from "./index.js";
import * as path from "./path.js";
const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, flip, map, not} = Prelude;
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
const reducer = (futureTree, filename) => Prelude.chain(findDependencies(filename))(futureTree);
const findDependencies = filename => tree => Prelude._apply("has")([filename])(tree) ? resolve(tree) : Prelude.chain(sourceText => Prelude.chain(ast => Prelude.chain(dependencies => Prelude.chain(exportedNames => Prelude._apply("reduce")([reducer, resolve(Map.from([...tree, [filename, {
  sourceText,
  ast,
  dependencies,
  exportedNames
}]]))])(dependencies))(resolve(Prelude.chain(exportDeclaration => Object.is("ExportNamedDeclaration", exportDeclaration.type) ? Prelude.map(x => x.name)(exportDeclaration.specifiers) : [])(ast.exports))))(resolve(Prelude.chain(({source: {value}}) => Prelude._apply("test")([value])(RegExp("^[./].*[.]serif$")) ? [path.join([filename, "..", value])] : [])(ast.imports))))(parse(filename)(sourceText)))(mapRej(x => x.message)(fs.readFile(filename)));
const orderDependencies = tree => (() => {
  const recur = unsorted$0021 => sorted$0021 => Object.is(0, unsorted$0021.length) ? sorted$0021 : (() => {
    const filename = Prelude._apply("shift")([])(unsorted$0021);
    const {dependencies} = Prelude._apply("get")([filename])(tree);
    Prelude._apply("every")([filename => Prelude._apply("has")([filename])(sorted$0021)])(dependencies) ? Prelude._apply("add")([filename])(sorted$0021) : Prelude._apply("push")([filename])(unsorted$0021);
    return recur(unsorted$0021)(sorted$0021);
  })();
  return Array.from(recur(Array.from(Prelude._apply("keys")([])(tree)))(Set.from([])));
})();
(() => {
  const cwd = apply([])(process.cwd);
  const [, , src, lib, ...filenames] = process.argv;
  const program = Prelude.chain(tree => (filenames => parallel(16)(flip(map)(filenames)(serifFilename => (serifDirname => (serifAst => Prelude.chain(jsAst => (jsSource => (jsDirname => (jsBasename => (jsFilename => Prelude.chain(_ => Prelude.chain(_ => resolve({
    serifFilename,
    jsFilename
  }))(fs.writeFile(jsFilename)(jsSource)))(fs.mkdir({
    recursive: true
  })(jsDirname)))(path.join([lib, path.relative(src)(jsDirname), jsBasename])))(path.basename(serifFilename)(".serif") + ".js"))(path.dirname(serifFilename)))(apply([jsAst, {}])(generate)))(serif.trans(serifAst)(importPath => (filename => (x => x.exportedNames)(Prelude._apply("get")([filename])(tree)))(path.join(concat([serifDirname])(Prelude._apply("split")(["/"])(importPath)))))))((x => x.ast)(Prelude._apply("get")([serifFilename])(tree))))(path.dirname(serifFilename)))))(orderDependencies(tree)))(Prelude._apply("reduce")([reducer, resolve(Map.from([]))])(filenames));
  return fork(console.error)(filenames => Prelude._apply("forEach")([({serifFilename, jsFilename}) => (() => {
    console.log(`• ${path.relative(cwd)(serifFilename)}`);
    return console.log(`  ➔ ${path.relative(cwd)(jsFilename)}`);
  })()])(filenames))(program);
})();
