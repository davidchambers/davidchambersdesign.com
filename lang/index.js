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
        codegen.withEnv (codegen.env)
                        (codegen.toJs (path.dirname (filename))
                                      (grammar.parse (source))),
      ),
    ),
    filename,
  );
};
