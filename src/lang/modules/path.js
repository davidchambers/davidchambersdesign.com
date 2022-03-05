'use strict';

const path = require ('path');


exports[Symbol.for ('dirname')] = filename => (
  path.dirname (filename)
);

exports[Symbol.for ('basename')] = ext => filename => (
  path.basename (filename, ext)
);

exports[Symbol.for ('resolve')] = components => (
  path.resolve (...components)
);
