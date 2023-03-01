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
    const ast = serif.parse(source);
    const dependencies = ast.flatMap(statement =>
      (statement.type === 'star-import' ||
       statement.type === 'named-imports' ||
       statement.type === 'default-import') &&
      (statement.source.startsWith('/') ||
       statement.source.startsWith('.'))
      ? [join(filename, '..', statement.source)]
      : []
    );
    const exportedNames = ast.flatMap(statement =>
      statement.type === 'named-exports' ? statement.names : []
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
  const tree = await findDependencies(filename);
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
      const jsSource = escodegen.generate(jsAst);
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
