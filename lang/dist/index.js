import {attempt} from "fluture";
import {ImportDeclaration, Module, StringLiteral} from "./Node.js";
import esModuleFromSerifModule from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
const apply = f => args => f.apply(null, args);
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const parse = filename => sourceText => attempt(() => apply(grammar.parse)([sourceText, {
  grammarSource: filename
}]));
const changeExtensionInImportDeclaration = ({source, specifiers}) => (() => {
  const source$0027 = StringLiteral((args => target => target.replace.apply(target, args))([RegExp("[.]serif$"), ".js"])(source.value));
  return ImportDeclaration(source$0027)(specifiers);
})();
const changeExtensions = ({imports, exports, statements}) => Module(map(changeExtensionInImportDeclaration)(imports))(exports)(statements);
export {parse, rewrite, changeExtensions, esModuleFromSerifModule};
