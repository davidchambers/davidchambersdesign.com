import {attempt} from "fluture";
import {ImportDeclaration, Module, StringLiteral} from "./Node.js";
import esModuleFromSerifModule from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
const negate = x => -x;
const endsWith = suffix => string => string.endsWith(suffix);
const sliceTo = to => xs => xs.slice(0, to);
const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return this$.concat(that);
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const parse = filename => sourceText => attempt(function () {
  return grammar.parse(sourceText, {
    grammarSource: filename
  });
});
const changeExtensionInImportDeclaration = ({source, specifiers}) => (() => {
  const s = source.value;
  const suffix = ".serif";
  return ImportDeclaration(StringLiteral(endsWith(suffix)(s) ? concat(sliceTo(negate(suffix.length))(s))(".js") : s))(specifiers);
})();
const changeExtensions = ({imports, exports, statements}) => Module(map(changeExtensionInImportDeclaration)(imports))(exports)(statements);
export {parse, rewrite, changeExtensions, esModuleFromSerifModule};
