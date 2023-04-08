const concat = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
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
const list = strings => (() => {
  switch (strings.length) {
    case 0:
      return "";
    case 1:
      return strings[0];
    case 2:
      return concat(strings[0])(concat(" and ")(strings[1]));
    default:
      return ($lhs => concat($lhs)(concat(" and ")((args => target => target.at.apply(target, args))([-1])(strings))))((args => target => target.join.apply(target, args))([" "])(map($lhs => concat($lhs)(","))((args => target => target.slice.apply(target, args))([0, -1])(strings))));
  }
})();
export {list};
