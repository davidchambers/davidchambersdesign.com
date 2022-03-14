'use strict';

const sanctuary = require ('sanctuary');


// Symbol#fantasy-land/equals :: Symbol ~> Symbol -> Boolean
Symbol.prototype['fantasy-land/equals'] = function(other) {
  return this[Symbol.toPrimitive] () === other[Symbol.toPrimitive] ();
};

// This module exposes the full Sanctuary API.
//
// Type checking is disabled, primarily to permit the use of symbols as keys.
//
// The names of the exported values differ from their Sanctuary counterparts
// in the following ways:
//
//   - they use kebab case rather than camel case (e.g. `from-maybe`); and
//   - they use ' as the suffix for variants rather than _ (e.g. `maybe'`).
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
