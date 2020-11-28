'use strict';

const fs = require ('fs');
const path = require ('path');

const S = require ('sanctuary');

const read = require ('./read.js');


const {
  chain,
  compose: B,
  encase,
  snd,
} = S;

module.exports = env => filename => (
  path.extname (filename) === '.clj' ?
  chain (B (require ('./eval.js') (path.dirname (filename)) (env)) (snd))
        (chain (read)
               (encase (filename => fs.readFileSync (filename, 'utf8'))
                       (filename))) :
  encase (require) (filename)
);
