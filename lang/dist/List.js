const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    case "[object Object]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Object]":
            return typeof$(this$["fantasy-land/equals"]) === "function" ? this$["fantasy-land/equals"](that) : this$ === that;
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const flip = f => y => x => f(x)(y);
const match = pattern => value => {
  switch (pattern.type) {
    case "any":
      return {};
    case "identifier":
      return {
        [pattern.name]: value
      };
    case "literal":
      if (equals(pattern.value)(value)) return {};
      return null$;
    case "data":
      if (typeof$(value) === "object" && value.$tag === pattern.tag && value.$values.length === pattern.patterns.length) {
        const context = {};
        for (let index = 0; index < pattern.patterns.length; index += 1) {
          const fragment = match(pattern.patterns[index])(value.$values[index]);
          if (fragment === null$) return null$;
          globalThis.Object.assign(context, fragment);
        }
        return context;
      }
      return null$;
    case "array":
      if (globalThis.Array.isArray(value)) {
        const patterns = pattern.patterns;
        const lengths = [];
        let slices = 0;
        for (let index = 0; index < patterns.length; index += 1) {
          if (patterns[index].type === "slice") {
            lengths[patterns[index].index = slices] = 0;
            slices += 1;
          }
        }
        if (slices === 0) {
          if (value.length !== patterns.length) return null$;
          const context = {};
          for (let index = 0; index < value.length; index += 1) {
            const fragment = match(patterns[index])(value[index]);
            if (fragment === null$) return null$;
            globalThis.Object.assign(context, fragment);
          }
          return context;
        }
        const min = patterns.length - slices;
        if (value.length < min) return null$;
        const lastIndex = slices - 1;
        lengths[lastIndex] = value.length - min;
        const fragments = globalThis.Array(patterns.length);
        while (true) {
          let index = 0;
          let valid = true;
          for (let patternIndex = 0; patternIndex < fragments.length; patternIndex += 1) {
            const pattern = patterns[patternIndex];
            const fragment = pattern.type === "slice" ? match({
              type: "identifier",
              name: pattern.name
            })(value.slice(index, index += lengths[pattern.index])) : match(pattern)(value[index++]);
            if (fragment === null$) {
              valid = false;
              break;
            }
            fragments[patternIndex] = fragment;
          }
          if (valid) return globalThis.Object.assign({}, ...fragments);
          index = lastIndex;
          while (lengths[index] === 0) index -= 1;
          if (index === 0) return null$;
          lengths[index - 1] += 1;
          while (index < lastIndex) lengths[index++] = 0;
          lengths[lastIndex] = value.length - min;
          index = 0;
          while (index < lastIndex) lengths[lastIndex] -= lengths[index++];
        }
      }
      return null$;
  }
};
const {Nil, Cons} = (() => {
  const $prototype = {
    ["fantasy-land/concat"]: function (that) {
      return ($value => {
        const $match = flip(match)($value);
        {
          const $result = $match({
            type: "data",
            tag: "Nil",
            patterns: []
          });
          if ($result != null$) {
            return (({}) => that)($result);
          }
        }
        {
          const $result = $match({
            type: "data",
            tag: "Cons",
            patterns: [{
              type: "identifier",
              name: "head"
            }, {
              type: "identifier",
              name: "tail"
            }]
          });
          if ($result != null$) {
            return (({head, tail}) => Cons(head)(tail["fantasy-land/concat"](that)))($result);
          }
        }
      })(this);
    },
    ["fantasy-land/reduce"]: function (f, y) {
      return ($value => {
        const $match = flip(match)($value);
        {
          const $result = $match({
            type: "data",
            tag: "Nil",
            patterns: []
          });
          if ($result != null$) {
            return (({}) => y)($result);
          }
        }
        {
          const $result = $match({
            type: "data",
            tag: "Cons",
            patterns: [{
              type: "identifier",
              name: "head"
            }, {
              type: "identifier",
              name: "tail"
            }]
          });
          if ($result != null$) {
            return (({head, tail}) => tail["fantasy-land/reduce"](f, f(y, head)))($result);
          }
        }
      })(this);
    },
    ["fantasy-land/filter"]: function (pred) {
      return ($value => {
        const $match = flip(match)($value);
        {
          const $result = $match({
            type: "data",
            tag: "Nil",
            patterns: []
          });
          if ($result != null$) {
            return (({}) => Nil)($result);
          }
        }
        {
          const $result = $match({
            type: "data",
            tag: "Cons",
            patterns: [{
              type: "identifier",
              name: "head"
            }, {
              type: "identifier",
              name: "tail"
            }]
          });
          if ($result != null$) {
            return (({head, tail}) => pred(head) ? Cons(head)(tail["fantasy-land/filter"](pred)) : tail["fantasy-land/filter"](pred))($result);
          }
        }
      })(this);
    }
  };
  const Nil = globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Nil",
    $values: []
  });
  const Cons = head => tail => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Cons",
    $values: [head, tail],
    head,
    tail
  });
  return {
    Nil,
    Cons
  };
})();
export default {
  Nil,
  Cons,
  ["fantasy-land/of"]: function (x) {
    return Cons(x)(Nil);
  }
};
export {Nil, Cons};
