const $prototype = {
  ["fantasy-land/concat"]: function (that) {
    return ($value => {
      if ($value.$tag === "Nil" && $value.$size === 0) {
        return that;
      }
      if ($value.$tag === "Cons" && $value.$size === 2) {
        const head = $value[0];
        {
          const tail = $value[1];
          return Cons(head)(tail["fantasy-land/concat"](that));
        }
      }
      throw globalThis.Error("Pattern matching failure");
    })(this);
  },
  ["fantasy-land/reduce"]: function (f, y) {
    return ($value => {
      if ($value.$tag === "Nil" && $value.$size === 0) {
        return y;
      }
      if ($value.$tag === "Cons" && $value.$size === 2) {
        const head = $value[0];
        {
          const tail = $value[1];
          return tail["fantasy-land/reduce"](f, f(y, head));
        }
      }
      throw globalThis.Error("Pattern matching failure");
    })(this);
  },
  ["fantasy-land/filter"]: function (pred) {
    return ($value => {
      if ($value.$tag === "Nil" && $value.$size === 0) {
        return Nil;
      }
      if ($value.$tag === "Cons" && $value.$size === 2) {
        const head = $value[0];
        {
          const tail = $value[1];
          return pred(head) ? Cons(head)(tail["fantasy-land/filter"](pred)) : tail["fantasy-land/filter"](pred);
        }
      }
      throw globalThis.Error("Pattern matching failure");
    })(this);
  }
};
const Nil = globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Nil",
  $size: 0
});
const Cons = head => tail => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Cons",
  $size: 2,
  [0]: head,
  [1]: tail,
  head,
  tail
});
export default {
  Nil,
  Cons,
  ["fantasy-land/of"]: x => Cons(x)(Nil)
};
export {Nil, Cons};
