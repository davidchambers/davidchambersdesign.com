const concat = this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that);
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const flip = f => y => x => f(x)(y);
const list = strings => (() => {
  switch (strings.length) {
    case 0:
      return "";
    case 1:
      return strings[0];
    case 2:
      return concat(strings[0])(concat(" and ")(strings[1]));
    default:
      return (() => {
        const concat$0027 = flip(concat);
        return concat$0027(concat(" and ")((args => target => target.at.apply(target, args))([-1])(strings)))((args => target => target.join.apply(target, args))([" "])(map(concat$0027(","))((args => target => target.slice.apply(target, args))([0, -1])(strings))));
      })();
  }
})();
export {list};
