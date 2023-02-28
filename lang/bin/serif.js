import fs           from 'node:fs/promises';
import path         from 'node:path';

import escodegen    from 'escodegen';

import serif        from 'serif';


async function findDependencies(entryPoint) {
  const tree = new Map([]);
  await recur(entryPoint);
  return tree;

  async function recur(filename) {
    if (tree.has(filename)) return;
    const source = await fs.readFile(filename, 'utf8');
    const ast = serif.parse(source);
    const dependencies = ast.flatMap(statement =>
      (statement.type === 'star-import' ||
       statement.type === 'named-imports' ||
       statement.type === 'default-import') &&
      (statement.source.startsWith('/') ||
       statement.source.startsWith('.'))
      ? [path.join(filename, '..', statement.source)]
      : []
    );
    tree.set(filename, {ast, dependencies});
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
      const serifAst = tree.get(serifFilename).ast;
      const ast = serif.trans(serifAst);
      const source = escodegen.generate(ast);
      const dirname = path.dirname(serifFilename);
      const basename = path.basename(serifFilename, '.serif') + '.js';
      const jsFilename = path.join(lib, path.relative(src, dirname), basename);
      await fs.mkdir(dirname, {recursive: true});
      await fs.writeFile(jsFilename, source, 'utf8');
      return {serifFilename, jsFilename};
    })
  );
  // List files created:
  for (const {serifFilename, jsFilename} of filenames) {
    console.log('• ' + path.relative(cwd, serifFilename));
    console.log('  ➔ ' + path.relative(cwd, jsFilename));
  }
}
