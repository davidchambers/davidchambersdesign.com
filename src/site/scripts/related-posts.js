'use strict';

const [, , filename, ...filenames] = process.argv;

process.stdout.write (require ('../related-posts.js') (filenames) (filename));
