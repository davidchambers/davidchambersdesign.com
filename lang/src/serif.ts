import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {basename, dirname, join, relative} from 'node:path';

import escodegen from 'escodegen';

import serif from './index.js';
import type {Module} from './types.js';


interface ResolvedModule {
  ast: Module;
  dependencies: ReadonlyArray<string>;
  exportedNames: ReadonlyArray<string>;
}

type Tree = Map<string, ResolvedModule>

async function findDependencies(entryPoint: string): Promise<Tree> {
  const tree = Reflect.construct(Map, [[]]) as Tree;
  await recur(entryPoint);
  return tree;

  async function recur(filename: string): Promise<void> {
    if (tree.has(filename)) return;
    const source = await readFile(filename, 'utf8');
    let ast;
    try {
      ast = serif.parse(source, filename);
    } catch (err: any) {
      const {source, start} = err.location;
      const lines = (
        (await readFile(source, 'utf8'))
        .split(/^/m)
        .map((text, idx) => ({number: idx + 1, text: text.trimEnd()}))
        .filter(line => {
          const offset = line.number - start.line;
          return offset > -5 && offset <= 0;
        })
      );
      const renderLineNumber = (number: number): string => number.toString().padStart(4);
      console.error(`\n\x1B[1m${
        relative(process.cwd(), source)
      }\x1B[0m\n\n${
        lines
        .map((line, idx, lines) =>
          `\x1B[7m${
            renderLineNumber(line.number)
          }\x1B[0m${
            idx === lines.length - 1 ?
            `${
              line.text.slice(0, start.column - 1)
            }\x1B[7m${
              line.text.charAt(start.column - 1)
            }\x1B[0m${
              line.text.slice(start.column)
            }` :
            line.text
          }\n`
        )
        .join('')
      }${
        ' '.repeat(renderLineNumber(lines[lines.length - 1].number).length + start.column - 1)
      }^\n${
        err.message
      }\n`);
      throw err;
    }
    const dependencies = ast.statements.flatMap(statement => {
      if (statement.type === 'ImportDeclaration') {
        const source = statement.source.value;
        if (source.startsWith('/') || source.startsWith('.')) {
          return [join(filename, '..', source)];
        }
      }
      return [];
    });
    const exportedNames = ast.statements.flatMap(exportDeclaration =>
      exportDeclaration.type === 'ExportNamedDeclaration'
      ? exportDeclaration.specifiers.map(specifier => specifier.name)
      : []
    );
    tree.set(filename, {ast, dependencies, exportedNames});
    for (const dependency of dependencies) await recur(dependency);
  }
}

function orderDependencies(tree: Tree): Array<string> {
  const sorted = Reflect.construct(Set, [[]]) as Set<string>;
  const unsorted = Array.from(tree.keys());
  while (unsorted.length > 0) {
    const filename = unsorted[0];
    unsorted.shift();
    const {dependencies} = tree.get(filename) as ResolvedModule;
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
  let tree: Tree;
  try {
    tree = await findDependencies(filename);
  } catch (err) {
    process.exit(1);
  }
  // Create JavaScript module for each Serif module:
  const filenames = await Promise.all(
    orderDependencies(tree).map(async serifFilename => {
      const serifDirname = dirname(serifFilename);
      const serifAst = (tree.get(serifFilename) as ResolvedModule).ast;
      const jsAst = await serif.trans(
        serifAst,
        importPath => {
          const importFilename = join(serifDirname, ...importPath.split('/'));
          return (tree.get(importFilename) as ResolvedModule).exportedNames;
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
