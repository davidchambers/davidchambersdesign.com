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

const cache = new Map ([]);

module.exports = env => filename => {
  if (path.extname (filename) === '.clj') {
    const abspath = path.resolve (filename);
    if (cache.has (abspath)) {
      return cache.get (abspath);
    } else {
      const x = chain (B (require ('./eval.js') (path.dirname (abspath)) (env)) (snd))
                      (chain (read)
                             (encase (abspath => fs.readFileSync (abspath, 'utf8'))
                                     (abspath)));
      cache.set (abspath, x);
      return x;
    }
  } else {
    return encase (require) (filename);
  }
};
