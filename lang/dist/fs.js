import {attemptP} from "fluture";
const mkdir = options => path => attemptP(function () {
  return Deno.mkdir(path, options);
});
const readFile = filename => attemptP(function () {
  return Deno.readTextFile(filename);
});
const writeFile = filename => data => attemptP(function () {
  return Deno.writeTextFile(filename, data);
});
export {mkdir, readFile, writeFile};
