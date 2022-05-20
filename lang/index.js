'use strict';

const fs            = require ('node:fs');
const path          = require ('node:path');

const escodegen     = require ('escodegen');

const codegen       = require ('../lang/codegen.js');
const grammar       = require ('../lang/grammar.js');


require.extensions['.serif'] = (module, filename) => {
  const source = fs.readFileSync (filename, 'utf8');
  module._compile (
    escodegen.generate (
      codegen.toCommonJsModule (
        codegen.toJs (path.dirname (filename))
                     (codegen.withEcmaScript (grammar.parse (source))),
      ),
    ),
    filename,
  );
};
