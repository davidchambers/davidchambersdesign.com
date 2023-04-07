import {attemptP} from "fluture";
const mkdir = options => path => attemptP(() => Deno.mkdir(path, options));
const readFile = filename => attemptP(() => Deno.readTextFile(filename));
const writeFile = filename => data => attemptP(() => Deno.writeTextFile(filename, data));
export {mkdir, readFile, writeFile};
