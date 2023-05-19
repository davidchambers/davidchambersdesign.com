import {attemptP} from "fluture";
const mkdir = options => path => attemptP(() => {
  return Deno.mkdir(path, options);
});
const readFile = filename => attemptP(() => {
  return Deno.readTextFile(filename);
});
const writeFile = filename => data => attemptP(() => {
  return Deno.writeTextFile(filename, data);
});
export {mkdir, readFile, writeFile};
