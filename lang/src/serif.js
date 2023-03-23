import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {basename, dirname, join, relative} from 'node:path';

import escodegen from 'escodegen';
import {attempt, attemptP, chain, chainRej, fork, map, parallel, reject, resolve} from 'fluture';

import serif from './index.js';


const parse = filename => source => (
  chainRej(({message, location: {source, start}}) =>
             chain(sourceText => {
                     const lines = (
                       sourceText
                       .split(/^/m)
                       .map((text, idx) => ({number: idx + 1, text: text.trimEnd()}))
                       .filter(line => {
                         const offset = line.number - start.line;
                         return offset > -5 && offset <= 0;
                       })
                     );
                     const renderLineNumber = number => number.toString().padStart(4);
                     return reject(
                       `\n\x1B[1m${
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
                         message
                       }\n`
                     );
                   })
                  (attemptP(() => readFile(source, 'utf8'))))
          (attempt(() => serif.parse(source, filename)))
);

const findDependencies = filename => tree => (
  tree.has(filename) ?
  resolve(tree) :
  chain(ast => {
          const dependencies = ast.imports.flatMap(({source: {value}}) =>
            value.startsWith('/') || value.startsWith('.')
            ? [join(filename, '..', value)]
            : []
          );
          const exportedNames = ast.exports.flatMap(exportDeclaration =>
            exportDeclaration.type === 'ExportNamedDeclaration'
            ? exportDeclaration.specifiers.map(specifier => specifier.name)
            : []
          );
          const newTree = Reflect.construct(Map, [[
            ...tree.entries(),
            [filename, {ast, dependencies, exportedNames}],
          ]]);
          return dependencies.reduce(
            (futureTree, dependency) => chain(findDependencies(dependency))(futureTree),
            resolve(newTree)
          );
        })
       (chain(parse(filename))
             (chainRej(err => reject(err.message))
                      (attemptP(() => readFile(filename, 'utf8')))))
);

function orderDependencies(tree) {
  const sorted = Reflect.construct(Set, [[]]);
  const unsorted = Array.from(tree.keys());
  while (unsorted.length > 0) {
    const filename = unsorted[0];
    unsorted.shift();
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
  const [,, src, lib, ...filenames] = process.argv;
  const program = (
    chain(tree =>
            // Create JavaScript module for each Serif module:
            parallel(16)(
              orderDependencies(tree).map(serifFilename => {
                const serifDirname = dirname(serifFilename);
                const serifAst = tree.get(serifFilename).ast;
                return (
                  chain(jsAst => {
                          const options = {format: {indent: {style: '  '}}};
                          const jsSource = escodegen.generate(jsAst, options) + '\n';
                          const jsDirname = dirname(serifFilename);
                          const jsBasename = basename(serifFilename, '.serif') + '.js';
                          const jsFilename = join(lib, relative(src, jsDirname), jsBasename);
                          return (
                            chain(_ => map(_ => ({serifFilename, jsFilename}))
                                          (attemptP(() => writeFile(jsFilename, jsSource, 'utf8'))))
                                 (attemptP(() => mkdir(jsDirname, {recursive: true})))
                          );
                        })
                       (serif.trans(
                          serifAst,
                          importPath => {
                            const importFilename = join(serifDirname, ...importPath.split('/'));
                            return tree.get(importFilename).exportedNames;
                          }
                        ))
                );
              })))
         (filenames.reduce((futureTree, filename) => chain(findDependencies(filename))(futureTree),
                           resolve(Reflect.construct(Map, [[]]))))
  );

  fork(console.error)
      (filenames => {
         // List files created:
         for (const {serifFilename, jsFilename} of filenames) {
           console.log('• ' + relative(cwd, serifFilename));
           console.log('  ➔ ' + relative(cwd, jsFilename));
         }
       })
      (program);
}
