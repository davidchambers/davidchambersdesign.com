import {attemptP} from "fluture";
const apply = f => args => f.apply(null, args);
const mkdir = options => path => attemptP(() => apply(Deno.mkdir)([path, options]));
const readFile = filename => attemptP(() => Deno.readTextFile(filename));
const writeFile = filename => data => attemptP(() => apply(Deno.writeTextFile)([filename, data]));
export {mkdir, readFile, writeFile};
