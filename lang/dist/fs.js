import fs from "node:fs/promises";
import {attemptP} from "fluture";
const apply = f => args => f.apply(null, args);
const mkdir = options => path => attemptP(() => apply(fs.mkdir)([path, options]));
const readFile = filename => attemptP(() => apply(fs.readFile)([filename, "utf8"]));
const writeFile = filename => data => attemptP(() => apply(fs.writeFile)([filename, data]));
export {mkdir, readFile, writeFile};
