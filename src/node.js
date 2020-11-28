'use strict';

module.exports = {
  [Symbol.for ('console')]: console,
  [Symbol.for ('process')]: process,
  [Symbol.for ('>&1')]: s => process.stdout.write (s),
  [Symbol.for ('>&2')]: s => process.stderr.write (s),
};
