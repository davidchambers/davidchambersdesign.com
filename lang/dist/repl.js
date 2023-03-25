import os from "node:os";
import path from "node:path";
import repl from "node:repl";
import vm from "node:vm";
import {generate} from "astring";
import {attemptP, fork, promise} from "fluture";
import serif from "./index.js";
import rewrite from "./rewrite.js";
const Prelude = {
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {chain, concat, map, not} = Prelude;
const evaluateModule = source => (() => {
  const context = vm.createContext(global);
  const module = Reflect.construct(vm.SourceTextModule, [source, {
    context
  }]);
  return chain(_ => map(_ => module.namespace.default)(attemptP(() => module.evaluate())))(attemptP(() => module.link((specifier, referencingModule) => promise(map(entries => (() => {
    const module = Reflect.construct(vm.SyntheticModule, [entries.map(([name]) => name), () => entries.forEach(([name, value]) => module.setExport(name, value)), {
      identifier: specifier,
      context: referencingModule.context
    }]);
    return module;
  })())(Prelude.map(Object.entries)(attemptP(() => import(specifier))))))));
})();
const read = serifSource => (() => {
  const serifAst = serif.parse(`export default ${serifSource};`)("[repl]");
  return Prelude.chain(jsAst => evaluateModule(generate(jsAst, {})))(serif.trans(rewrite(serifAst))(_importPath => []));
})();
const print = x => (() => {
  switch (Object.prototype.toString.call(x)) {
    case "[object Null]":
      return `\x1B[35m${x}\x1B[0m`;
    case "[object Undefined]":
      return `\x1B[35m${x}\x1B[0m`;
    case "[object Boolean]":
      return `\x1B[35m${x}\x1B[0m`;
    case "[object Number]":
      return `\x1B[33m${x}\x1B[0m`;
    case "[object String]":
      return `\x1B[32m${JSON.stringify(x)}\x1B[0m`;
    case "[object Symbol]":
      return `Symbol.for ${print(Symbol.keyFor(x))}`;
    case "[object Date]":
      return `Reflect.construct (Date, [${print(Number(x))}])`;
    case "[object RegExp]":
      return `RegExp (${print(x.source)}, ${print(x.flags)})`;
    case "[object Set]":
      return `Reflect.construct (Set, [${print(Array.from(x))}])`;
    case "[object Map]":
      return `Reflect.construct (Map, [${print(Array.from(x))}])`;
    case "[object Array]":
      return "[" + Prelude.map(print)(x).join(", ") + "]";
    case "[object Object]":
      return "{" + Prelude.map(k => `[${print(k)}]: ${print(x[k])}`)(Reflect.ownKeys(x)).join(", ") + "}";
    default:
      return `${x}`;
  }
})();
const server = repl.start({
  prompt: ">>> ",
  eval: (code, _context, _filename, callback) => fork(err => (() => {
    console.error(err);
    console.log();
    return server.displayPrompt(false);
  })())(result => callback(null, result))(read(code)),
  writer: value => print(value) + "\n"
});
server.setupHistory(path.join(os.homedir(), ".serif-repl-history"), error => undefined);
