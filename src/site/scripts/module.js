'use strict';

const fs = require ('fs');
const path = require ('path');

const escodegen = require ('escodegen');
const sanctuary = require ('sanctuary');

const codegen = require ('../../lang/codegen.js');
const read = require ('../../lang/read.js');
const rewrite = require ('../../lang/rewrite.js');


const {
  Left,
  Right,
  chain,
  either,
  encase,
  map,
  pair,
  pipe,
  trim,
} = sanctuary.unchecked;

const filename = process.argv[2];
const dirname = path.dirname (path.resolve (filename));

const transpile = pipe ([
  encase (filename => fs.readFileSync (filename, 'utf8')),
  chain (read),
  chain (pair (rest => trim (rest) === '' ? Right : _ => Left ('Unread source text'))),
  chain (rewrite (dirname)),
  chain (codegen.toJs (dirname)),
  map (codegen.toCommonJsModule),
  map (escodegen.generate),
]);

either (err => { console.error (err.message); process.exit (1); })
       (console.log)
       (transpile (filename));
