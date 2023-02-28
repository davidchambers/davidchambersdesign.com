import fs from 'node:fs/promises';
import {dirname, join, relative} from 'node:path';

import escodegen from 'escodegen';

import serif from 'serif';


async function findDependencies(entryPoint) {
  const $map = new Map([]);
  await recur(entryPoint);
  return $map;

  async function recur(filename) {
    if ($map.has(filename)) return;
    const serifSource = await fs.readFile(filename, 'utf8');
    const serifAst = serif.parse(serifSource);
    const filenames = serifAst.flatMap(statement =>
      (statement.type === 'star-import' ||
       statement.type === 'named-imports' ||
       statement.type === 'default-import') &&
      (statement.source.startsWith('/') ||
       statement.source.startsWith('.'))
      ? [join(filename, '..', statement.source)]
      : []
    );
    $map.set(filename, filenames);
    for (const filename of filenames) await recur(filename);
  }
}

function orderDependencies(map) {
  const sorted = new Set([]);
  const unsorted = Array.from(map.keys());
  while (unsorted.length > 0) {
    const filename = unsorted.shift();
    if (map.get(filename).every(filename => sorted.has(filename))) {
      sorted.add(filename);
    } else {
      unsorted.push(filename);
    }
  }
  return Array.from(sorted);
}

async function compile(filenames) {
  const serifSource = await fs.readFile(filenames.serif, 'utf8');
  const serifAst = serif.parse(serifSource);
  const jsAst = serif.trans(serifAst);
  const jsSource = escodegen.generate(jsAst);
  await fs.mkdir(dirname(filenames.js), {recursive: true});
  await fs.writeFile(filenames.js, jsSource, 'utf8');
}

{
  const cwd = process.cwd();
  const [,, src, lib, filename] = process.argv;
  const dependencies = await findDependencies(filename);
  const filenames = orderDependencies(dependencies).map(serif => ({
    serif,
    js: join(lib, relative(src, serif)).replace(/[.]serif$/, '.js'),
  }));
  await Promise.all(filenames.map(compile));
  for (const {serif, js} of filenames) {
    console.log(`• ${relative(cwd, serif)}`);
    console.log(`  ➔ ${relative(cwd, js)}`);
  }
}
