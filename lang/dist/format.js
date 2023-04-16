const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const joinWith = separator => xs => xs.join(separator);
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
const list = strings => ($value => {
  const $match = flip(match)($value);
  {
    const $result = $match({
      type: "array",
      patterns: []
    });
    if ($result != null$) {
      return (({}) => "")($result);
    }
  }
  {
    const $result = $match({
      type: "array",
      patterns: [{
        type: "identifier",
        name: "first"
      }]
    });
    if ($result != null$) {
      return (({first}) => first)($result);
    }
  }
  {
    const $result = $match({
      type: "array",
      patterns: [{
        type: "identifier",
        name: "first"
      }, {
        type: "identifier",
        name: "second"
      }]
    });
    if ($result != null$) {
      return (({first, second}) => concat(first)(concat(" and ")(second)))($result);
    }
  }
  {
    const $result = $match({
      type: "array",
      patterns: [{
        type: "slice",
        name: "init"
      }, {
        type: "identifier",
        name: "last"
      }]
    });
    if ($result != null$) {
      return (({init, last}) => ($lhs => concat($lhs)(concat(" and ")(last)))(joinWith(" ")(map($lhs => concat($lhs)(","))(init))))($result);
    }
  }
})(strings);
export {list};
