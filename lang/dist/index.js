import {attempt} from "fluture";
import {ImportDeclaration, Module, StringLiteral} from "./Node.js";
import esModuleFromSerifModule from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const parse = filename => sourceText => attempt(() => grammar.parse(sourceText, {
  grammarSource: filename
}));
const changeExtensionInImportDeclaration = ({source, specifiers}) => (() => {
  const source$0027 = StringLiteral((args => target => target.replace.apply(target, args))([RegExp("[.]serif$"), ".js"])(source.value));
  return ImportDeclaration(source$0027)(specifiers);
})();
const changeExtensions = ({imports, exports, statements}) => Module(map(changeExtensionInImportDeclaration)(imports))(exports)(statements);
export {parse, rewrite, changeExtensions, esModuleFromSerifModule};
