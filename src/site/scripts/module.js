'use strict';

const fs            = require ('node:fs');
const path          = require ('node:path');

const escodegen     = require ('escodegen');
const sanctuary     = require ('sanctuary');

const codegen       = require ('../../lang/codegen.js');
const grammar       = require ('../../lang/grammar.js');


const {
  chain,
  either,
  encase,
  map,
  pipe,
} = sanctuary.unchecked;

const filename = process.argv[2];
const dirname = path.dirname (path.resolve (filename));

const transpile = pipe ([
  encase (filename => fs.readFileSync (filename, 'utf8')),
  chain (encase (grammar.parse)),
  map (codegen.toJs (dirname)),
  map (codegen.withEnv (codegen.env)),
  map (codegen.toCommonJsModule),
  map (escodegen.generate),
]);

either (err => { console.error (err); process.exit (1); })
       (console.log)
       (transpile (filename));
