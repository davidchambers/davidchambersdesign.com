'use strict';

const [, , filename, ...filenames] = process.argv;

process.stdout.write (require ('../pages/post.js') (filenames) (filename));
