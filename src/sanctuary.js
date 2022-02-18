'use strict';

const sanctuary = require ('sanctuary');


module.exports = (
  Object.fromEntries (
    Object.entries (sanctuary.unchecked)
    .filter (([k]) => k !== 'unchecked')
    .map (([k, v]) => [
      Symbol.for (
        k.replace (/(?!\b)[A-Z0-9]/g, c => '-' + c.toLowerCase ())
         .replace (/_/g, "'")
      ),
      v,
    ])
  )
);
