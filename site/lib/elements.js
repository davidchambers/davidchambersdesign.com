const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const id = x => x;
const joinWith = separator => xs => xs.join(separator);
const equals = this$ => that => (function () {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (function () {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const concat = this$ => that => (function () {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
    case "[object String]":
      return this$.concat(that);
    default:
      return this$["fantasy-land/concat"](that);
  }
})();
const map = f => xs => (function () {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const escape = s => (args => target => target.replaceAll.apply(target, args))([">", "&gt;"])((args => target => target.replaceAll.apply(target, args))(["<", "&lt;"])((args => target => target.replaceAll.apply(target, args))(["&", "&amp;"])(s)));
const text = value => ({
  type: "text",
  toString: function () {
    return value;
  },
  render: function (context) {
    return escape(value);
  }
});
const render$002Dattribute = ([name, value]) => (function (value) {
  return " " + name + "=\"" + value + "\"";
})(escape((args => target => target.replaceAll.apply(target, args))(["\n", " "])((args => target => target.trim.apply(target, args))([])(String(value)))));
const render$002Dattributes = attrs => joinWith("")(map(render$002Dattribute)(Object.entries(attrs)));
const string$002Dto$002Dtext$002Dnode = node => equals("string")(typeof$(node)) ? text(node) : node;
const block$002Delement = name => attributes => children$0021 => (() => {
  const children = map(string$002Dto$002Dtext$002Dnode)(children$0021);
  return {
    type: "element",
    format: "block",
    name,
    attributes,
    children,
    toString: function () {
      return joinWith("")(map(String)(children));
    },
    render: function ({indent, level, inline}) {
      return (() => {
        const $2192 = level => (args => target => target.repeat.apply(target, args))([level])(indent);
        return "<" + name + render$002Dattributes(attributes) + ">" + joinWith("")(map(function (child) {
          return concat("\n")(concat($2192(level + 1))(child.render({
            indent,
            level: level + 1,
            inline
          })));
        })(children)) + "\n" + $2192(level) + "</" + name + ">";
      })();
    }
  };
})();
const inline$002Delement = name => attributes => children$0021 => (() => {
  const children = map(string$002Dto$002Dtext$002Dnode)(children$0021);
  const format = (args => target => target.some.apply(target, args))([function (node) {
    return equals("block")(node.format);
  }])(children) ? "inline-block" : "inline";
  return {
    type: "element",
    format,
    name,
    attributes,
    children,
    toString: function () {
      return joinWith("")(map(String)(children));
    },
    render: function ({indent, level, inline}) {
      return ($discriminant => equals("inline")($discriminant) ? "<" + name + render$002Dattributes(attributes) + ">" + joinWith("")(map((args => target => target.render.apply(target, args))([{
        indent,
        level,
        inline
      }]))(children)) + "</" + name + ">" : equals("inline-block")($discriminant) ? (() => {
        const $2192 = level => (args => target => target.repeat.apply(target, args))([level])(indent);
        const render$002Dchild = indent$003F => child => (indent$003F ? $rhs => concat(concat("\n")($2192(level + 1)))($rhs) : id)(child.render({
          indent,
          level: level + 1,
          inline
        }));
        return "<" + name + render$002Dattributes(attributes) + ">" + joinWith("")(equals([])(children) ? [] : (() => {
          const [head, ...tail] = children;
          return concat([render$002Dchild(true)(head)])(map(function (child) {
            return render$002Dchild(equals("block")(child.format))(child);
          })(tail));
        })()) + "\n" + $2192(level) + "</" + name + ">";
      })() : CasesNotExhaustive)(format);
    }
  };
})();
const self$002Dclosing$002Delement = name => attributes => ({
  type: "element",
  format: "inline",
  name,
  attributes,
  toString: function () {
    return "";
  },
  render: function (_) {
    return "<" + name + render$002Dattributes(attributes) + " />";
  }
});
const html$0027 = block$002Delement("html");
const html = html$0027({});
const head$0027 = block$002Delement("head");
const head = head$0027({});
const title$0027 = inline$002Delement("title");
const title = title$0027({});
const base = self$002Dclosing$002Delement("base");
const link = self$002Dclosing$002Delement("link");
const meta = self$002Dclosing$002Delement("meta");
const style$0027 = block$002Delement("style");
const body$0027 = block$002Delement("body");
const body = body$0027({});
const article$0027 = block$002Delement("article");
const article = article$0027({});
const section$0027 = block$002Delement("section");
const nav$0027 = block$002Delement("nav");
const nav = nav$0027({});
const aside$0027 = inline$002Delement("aside");
const aside = aside$0027({});
const h1$0027 = inline$002Delement("h1");
const h1 = h1$0027({});
const h2$0027 = inline$002Delement("h2");
const h2 = h2$0027({});
const h3$0027 = inline$002Delement("h3");
const h3 = h3$0027({});
const h4$0027 = inline$002Delement("h4");
const h4 = h4$0027({});
const h5$0027 = inline$002Delement("h5");
const h5 = h5$0027({});
const h6$0027 = inline$002Delement("h6");
const h6 = h6$0027({});
const hgroup$0027 = block$002Delement("hgroup");
const header$0027 = block$002Delement("header");
const header = header$0027({});
const footer$0027 = block$002Delement("footer");
const footer = footer$0027({});
const address$0027 = block$002Delement("address");
const p$0027 = inline$002Delement("p");
const p = p$0027({});
const hr$0027 = self$002Dclosing$002Delement("hr");
const hr = hr$0027({});
const pre$0027 = inline$002Delement("pre");
const pre = pre$0027({});
const blockquote$0027 = block$002Delement("blockquote");
const blockquote = blockquote$0027({});
const ol$0027 = block$002Delement("ol");
const ol = ol$0027({});
const ul$0027 = block$002Delement("ul");
const ul = ul$0027({});
const menu$0027 = block$002Delement("menu");
const li$0027 = inline$002Delement("li");
const li = li$0027({});
const dl$0027 = block$002Delement("dl");
const dl = dl$0027({});
const dt$0027 = inline$002Delement("dt");
const dt = dt$0027({});
const dd$0027 = inline$002Delement("dd");
const dd = dd$0027({});
const figure$0027 = block$002Delement("figure");
const figcaption$0027 = block$002Delement("figcaption");
const main$0027 = block$002Delement("main");
const main = main$0027({});
const $div = block$002Delement("div");
const table$0027 = block$002Delement("table");
const table = table$0027({});
const thead$0027 = block$002Delement("thead");
const thead = thead$0027({});
const tbody$0027 = block$002Delement("tbody");
const tbody = tbody$0027({});
const tr$0027 = block$002Delement("tr");
const tr = tr$0027({});
const th$0027 = inline$002Delement("th");
const th = th$0027({});
const td$0027 = inline$002Delement("td");
const td = td$0027({});
const b = inline$002Delement("b")({});
const mask = block$002Delement("mask");
const rect = self$002Dclosing$002Delement("rect");
const linearGradient = block$002Delement("linearGradient");
const object = block$002Delement("object");
const svg = block$002Delement("svg");
const a = inline$002Delement("a");
const code$0027 = inline$002Delement("code");
const code = inline$002Delement("code")({});
const del$0027 = inline$002Delement("del");
const del = inline$002Delement("del")({});
const em$0027 = inline$002Delement("em");
const em = inline$002Delement("em")({});
const i$0027 = inline$002Delement("i");
const i = inline$002Delement("i")({});
const ins$0027 = inline$002Delement("ins");
const ins = inline$002Delement("ins")({});
const script = inline$002Delement("script");
const span = inline$002Delement("span");
const strong$0027 = inline$002Delement("strong");
const strong = inline$002Delement("strong")({});
const time = inline$002Delement("time");
const var$0027 = inline$002Delement("var");
const var$ = inline$002Delement("var")({});
const video = inline$002Delement("video");
const embed = self$002Dclosing$002Delement("embed");
const img = self$002Dclosing$002Delement("img");
const param = self$002Dclosing$002Delement("param");
const path = self$002Dclosing$002Delement("path");
const stop = self$002Dclosing$002Delement("stop");
export {text, html$0027, html, head$0027, head, title$0027, title, base, link, meta, style$0027, body$0027, body, article$0027, article, section$0027, nav$0027, nav, aside$0027, aside, h1$0027, h1, h2$0027, h2, h3$0027, h3, h4$0027, h4, h5$0027, h5, h6$0027, h6, hgroup$0027, header$0027, header, footer$0027, footer, address$0027, p$0027, p, hr$0027, hr, pre$0027, pre, blockquote$0027, blockquote, ol$0027, ol, ul$0027, ul, menu$0027, li$0027, li, dl$0027, dl, dt$0027, dt, dd$0027, dd, figure$0027, figcaption$0027, main$0027, main, $div as div, table$0027, table, thead$0027, thead, tbody$0027, tbody, tr$0027, tr, th$0027, th, td$0027, td, b, mask, rect, linearGradient, object, svg, a, code$0027, code, del$0027, del, em$0027, em, i$0027, i, ins$0027, ins, script, span, strong$0027, strong, time, var$0027, var$, video, embed, img, param, path, stop};
