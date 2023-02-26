#!/usr/bin/env node

import fs           from 'node:fs';
import path         from 'node:path';

import escodegen    from 'escodegen';
import * as Future  from 'fluture';
import S            from 'sanctuary';

import * as codegen from '../codegen.js';
import * as grammar from '../grammar.js';


const K = x => y => x;
const B = f => g => x => f (g (x));
const Y = f => (g => g (g)) (g => f (x => g (g) (x)));

//    readFile :: String -> Future Error String
const readFile = filename => (
  Future.node (done => fs.readFile (filename, {encoding: 'utf8'}, done))
);

//    writeFile :: String -> String -> Future Error String
const writeFile = filename => data => (
  S.map (K (filename))
        (Future.node (done => fs.writeFile (filename, data, {encoding: 'utf8'}, done)))
);

//    mkdir :: String -> Future Error String
const mkdir = dirname => (
  S.map (K (dirname))
        (Future.node (done => fs.mkdir (dirname, {recursive: true}, done)))
);

//    parse :: String -> Future Error SerifExpr
const parse = Future.encase (grammar.parse);

//    dependencies :: StrMap (Array String) -> String -> Future Error (StrMap (Array String))
const dependencies = Y (recur => deps => filename =>
  S.maybe (S.pipe ([readFile,
                    S.chain (parse),
                    S.map (S.mapMaybe (statement => statement.type === 'star-import'    ? S.Just (statement.source) :
                                                    statement.type === 'named-imports'  ? S.Just (statement.source) :
                                                    statement.type === 'default-import' ? S.Just (statement.source) :
                                                    /** * ** * ** otherwise ** * ** * **/ S.Nothing)),
                    S.map (S.filter (source => source.startsWith ('/') || source.startsWith ('.'))),
                    S.map (S.map (source => path.join (filename, '..', source))),
                    S.chain (filenames => S.reduce (S.flip (filename => S.chain (deps => recur (deps) (filename))))
                                                   (Future.resolve (S.insert (filename) (filenames) (deps)))
                                                   (filenames))])
                  (filename))
          (K (Future.resolve (deps)))
          (S.value (filename) (deps))
);

//    sort :: Array (Pair String (Array String)) -> Array String
const sort = pairs => {
  return Array.from (
    (function recur(sorted) {
       return S.array (sorted)
                      (pair => pair.snd.every (s => sorted.has (s))
                               ? recur (sorted.add (pair.fst))
                               : B (recur (sorted)) (S.append (pair)));
     })
    (new Set ([]))
    (pairs)
  );
};

//    compile :: String -> String -> Future Error String
const compile = filename => S.pipe ([
  readFile,
  S.chain (parse),
  S.map (codegen.toEsModule),
  S.map (escodegen.generate),
  S.apSecond (mkdir (path.dirname (filename))),
  S.chain (writeFile (filename)),
]);

//    updatePath :: String -> String -> String -> String
const updatePath = from => to => filename => (
  path.join (to, path.relative (from, filename))
);

//    updateExtension :: String -> String -> String -> String
const updateExtension = from => to => filename => (
  path.join (path.dirname (filename),
             path.basename (filename, from) + to)
);

//    program :: String -> String -> String -> Future Error String
const program = src => lib => S.pipe ([
  dependencies ({}),
  S.map (S.pairs),
  S.map (sort),
  S.map (S.filter (s => s.endsWith ('.serif'))),
  S.chain (S.traverse (Future.Future)
                      (filename => compile (updateExtension ('.serif')
                                                            ('.js')
                                                            (updatePath (src)
                                                                        (lib)
                                                                        (filename)))
                                           (filename))),
  S.map (S.map (S.concat ('- '))),
  S.map (S.concat (['', 'Files generated:', ''])),
  S.map (S.unlines),
]);

Future.fork (console.error)
            (console.log)
            (program (process.argv[2])
                     (process.argv[3])
                     (process.argv[4]));
