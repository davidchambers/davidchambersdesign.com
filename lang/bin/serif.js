import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {basename, dirname, join, relative} from 'node:path';

import escodegen from 'escodegen';

import serif from 'serif';


async function findDependencies(entryPoint) {
  const tree = new Map([]);
  await recur(entryPoint);
  return tree;

  async function recur(filename) {
    if (tree.has(filename)) return;
    const source = await readFile(filename, 'utf8');
    let ast;
    try {
      ast = serif.parse(source, filename);
    } catch (err) {
      const lines = (
        (await readFile(err.location.source, 'utf8'))
        .split(/^/m)
        .map((text, idx) => ({number: idx + 1, text: text.trimEnd()}))
        .filter(line => {
          const offset = line.number - err.location.start.line;
          return offset > -5 && offset <= 0;
        })
      );
      console.error(`\n${
        err.location.source
      }\n\n${
        lines.map(line => line.text + '\n').join('')
      }${
        ' '.repeat(err.location.start.column - 1)
      }^\n${
        err.message
      }\n`);
      throw err;
    }
    const dependencies = (
      ast.imports
      .map(importDeclaration => importDeclaration.source.value)
      .filter(source => source.startsWith('/') || source.startsWith('.'))
      .map(source => join(filename, '..', source))
    );
    const exportedNames = ast.exports.flatMap(exportDeclaration =>
      exportDeclaration.type === 'ExportNamedDeclaration'
      ? exportDeclaration.specifiers.map(specifier => specifier.name)
      : []
    );
    tree.set(filename, {ast, dependencies, exportedNames});
    for (const dependency of dependencies) await recur(dependency);
  }
}

function orderDependencies(tree) {
  const sorted = new Set([]);
  const unsorted = Array.from(tree.keys());
  while (unsorted.length > 0) {
    const filename = unsorted.shift();
    const {dependencies} = tree.get(filename);
    if (dependencies.every(filename => sorted.has(filename))) {
      sorted.add(filename);
    } else {
      unsorted.push(filename);
    }
  }
  return Array.from(sorted);
}

{
  const cwd = process.cwd();
  const [,, src, lib, filename] = process.argv;
  let tree;
  try {
    tree = await findDependencies(filename);
  } catch (err) {
    process.exit(1);
  }
  // Create JavaScript module for each Serif module:
  const filenames = await Promise.all(
    orderDependencies(tree).map(async serifFilename => {
      const serifDirname = dirname(serifFilename);
      const serifAst = tree.get(serifFilename).ast;
      const jsAst = await serif.trans(
        serifAst,
        importPath => {
          const importFilename = join(serifDirname, ...importPath.split('/'));
          return tree.get(importFilename).exportedNames;
        }
      );
      const options = {format: {indent: {style: '  '}}};
      const jsSource = escodegen.generate(jsAst, options) + '\n';
      const jsDirname = dirname(serifFilename);
      const jsBasename = basename(serifFilename, '.serif') + '.js';
      const jsFilename = join(lib, relative(src, jsDirname), jsBasename);
      await mkdir(jsDirname, {recursive: true});
      await writeFile(jsFilename, jsSource, 'utf8');
      return {serifFilename, jsFilename};
    })
  );
  // List files created:
  for (const {serifFilename, jsFilename} of filenames) {
    console.log('• ' + relative(cwd, serifFilename));
    console.log('  ➔ ' + relative(cwd, jsFilename));
  }
}
