'use strict';

const [, $0, $1, $2, $3, $4, $5, $6, $7, $8, $9] = process.argv;

module.exports = {
  [Symbol.for ('console')]: console,
  [Symbol.for ('process')]: process,
  [Symbol.for ('$0')]: $0,
  [Symbol.for ('$1')]: $1,
  [Symbol.for ('$2')]: $2,
  [Symbol.for ('$3')]: $3,
  [Symbol.for ('$4')]: $4,
  [Symbol.for ('$5')]: $5,
  [Symbol.for ('$6')]: $6,
  [Symbol.for ('$7')]: $7,
  [Symbol.for ('$8')]: $8,
  [Symbol.for ('$9')]: $9,
};
