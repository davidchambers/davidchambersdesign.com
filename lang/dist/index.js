import * as codegen from "./codegen.js";
import * as grammar from "./grammar.js";
import rewrite from "./rewrite.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {chain, map, not} = Prelude;
const parse = input => filename => grammar.parse(input, {
  grammarSource: filename
});
const trans = module => exportedNames => codegen.toModule(rewrite(module))(exportedNames);
export default {
  parse,
  trans
};
