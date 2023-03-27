const Prelude = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b,
  reject: predicate => Prelude.filter(x => !predicate(x))
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not, reject} = Prelude;
const list = strings => (() => {
  switch (strings.length) {
    case 0:
      return "";
    case 1:
      return strings[0];
    case 2:
      return Prelude.concat(strings[0])(Prelude.concat(" and ")(strings[1]));
    default:
      return (() => {
        const concat$0027 = flip(concat);
        return concat$0027(Prelude.concat(" and ")(Prelude._apply("at")([-1])(strings)))(Prelude._apply("join")([" "])(map(concat$0027(","))(Prelude._apply("slice")([0, -1])(strings))));
      })();
  }
})();
export {list};
