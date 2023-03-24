import fs from "node:fs/promises";
import path from "node:path";
import {generate} from "astring";
import {attempt, attemptP, fork, mapRej, parallel, resolve} from "fluture";
import serif from "./index.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f)
};
const {chain, map} = Prelude;
const parse = filename => sourceText => mapRej(error => (() => {
  const lines = Prelude.chain(line => (() => {
    const offset = line.number - error.location.start.line;
    return offset > -5 && offset <= 0 ? [line] : [];
  })())(sourceText.split(RegExp("^", "m")).map((text, index) => ({
    number: index + 1,
    text: text.trimEnd()
  })));
  const renderLineNumber = number => number.toString().padStart(4);
  return `\n\x1B[1m${path.relative(process.cwd(), error.location.source)}\x1B[0m\n\n${lines.map((line, idx, lines) => `\x1B[7m${renderLineNumber(line.number)}\x1B[0m${idx < lines.length - 1 ? line.text : `${line.text.slice(0, error.location.start.column - 1)}\x1B[7m${line.text.charAt(error.location.start.column - 1)}\x1B[0m${line.text.slice(error.location.start.column)}`}\n${""}`).join("")}${(" ").repeat(renderLineNumber(lines.at(-1).number).length + error.location.start.column - 1)}^\n${error.message}\n`;
})())(attempt(() => serif.parse(sourceText)(filename)));
const reducer = (futureTree, filename) => Prelude.chain(findDependencies(filename))(futureTree);
const findDependencies = filename => tree => tree.has(filename) ? resolve(tree) : Prelude.chain(sourceText => Prelude.chain(ast => (() => {
  const dependencies = Prelude.chain(({source: {value}}) => (value.startsWith("/") || value.startsWith(".")) && value.endsWith(".serif") ? [path.join(filename, "..", value)] : [])(ast.imports);
  const exportedNames = Prelude.chain(exportDeclaration => exportDeclaration.type === "ExportNamedDeclaration" ? Prelude.map(x => x.name)(exportDeclaration.specifiers) : [])(ast.exports);
  return dependencies.reduce(reducer, resolve(Reflect.construct(Map, [[...tree, [filename, {
    sourceText,
    ast,
    dependencies,
    exportedNames
  }]]])));
})())(parse(filename)(sourceText)))(mapRej(x => x.message)(attemptP(() => fs.readFile(filename, "utf8"))));
const orderDependencies = tree => (() => {
  const recur = unsorted$0021 => sorted$0021 => unsorted$0021.length === 0 ? sorted$0021 : (() => {
    const filename = unsorted$0021.shift();
    const {dependencies} = tree.get(filename);
    dependencies.every(filename => sorted$0021.has(filename)) ? sorted$0021.add(filename) : unsorted$0021.push(filename);
    return recur(unsorted$0021)(sorted$0021);
  })();
  return Array.from(recur(Array.from(tree.keys()))(Reflect.construct(Set, [[]])));
})();
(() => {
  const cwd = process.cwd();
  const [, , src, lib, ...filenames] = process.argv;
  const program = Prelude.chain(tree => parallel(16)(map(serifFilename => (() => {
    const serifDirname = path.dirname(serifFilename);
    const serifAst = tree.get(serifFilename).ast;
    return Prelude.chain(jsAst => (() => {
      const jsSource = generate(jsAst, {});
      const jsDirname = path.dirname(serifFilename);
      const jsBasename = path.basename(serifFilename, ".serif") + ".js";
      const jsFilename = path.join(lib, path.relative(src, jsDirname), jsBasename);
      return map(_ => ({
        serifFilename,
        jsFilename
      }))(chain(_ => attemptP(() => fs.writeFile(jsFilename, jsSource, "utf8")))(attemptP(() => fs.mkdir(jsDirname, {
        recursive: true
      }))));
    })())(serif.trans(serifAst)(importPath => tree.get(path.join(serifDirname, ...importPath.split("/"))).exportedNames));
  })())(orderDependencies(tree))))(filenames.reduce(reducer, resolve(Reflect.construct(Map, [[]]))));
  return fork(console.error)(filenames => filenames.forEach(({serifFilename, jsFilename}) => (() => {
    console.log("• " + path.relative(cwd, serifFilename));
    return console.log("  ➔ " + path.relative(cwd, jsFilename));
  })()))(program);
})();
