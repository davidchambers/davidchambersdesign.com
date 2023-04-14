const typeof$ = x => x === null ? "null" : typeof x;
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
    default:
      return this$ === that;
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
const escape = s => (args => target => target.replaceAll.apply(target, args))([">", "&gt;"])((args => target => target.replaceAll.apply(target, args))(["<", "&lt;"])((args => target => target.replaceAll.apply(target, args))(["&", "&amp;"])(s)));
const text = value => ({
  type: "text",
  toString: () => value,
  render: context => escape(value)
});
const render$002Dattribute = ([name, value]) => (value => " " + name + "=\"" + value + "\"")(escape((args => target => target.replaceAll.apply(target, args))(["\n", " "])((args => target => target.trim.apply(target, args))([])(String(value)))));
const render$002Dattributes = attrs => (args => target => target.join.apply(target, args))([""])(map(render$002Dattribute)(Object.entries(attrs)));
const render$002Dblock$002Delement = context => element => (args => target => target.repeat.apply(target, args))([context.level])(context.indent) + "<" + element.name + render$002Dattributes(element.attributes) + ">\n" + (args => target => target.join.apply(target, args))([""])(map((args => target => target.render.apply(target, args))([{
  indent: context.indent,
  level: context.level + 1,
  inline: context.inline
}]))(element.children)) + (args => target => target.repeat.apply(target, args))([context.level])(context.indent) + "</" + element.name + ">\n";
const render$002Dinline$002Delement = context => element => (args => target => target.repeat.apply(target, args))([context.level])(context.indent) + "<" + element.name + render$002Dattributes(element.attributes) + ">" + (args => target => target.join.apply(target, args))([""])(map((args => target => target.render.apply(target, args))([{
  indent: context.indent,
  level: 0,
  inline: true
}]))(element.children)) + "</" + element.name + ">" + (context.inline ? "" : "\n");
const string$002Dto$002Dtext$002Dnode = string$002Dor$002Dnode => equals("object")(typeof$(string$002Dor$002Dnode)) ? string$002Dor$002Dnode : text((args => target => target.replaceAll.apply(target, args))(["\n", ""])((args => target => target.replaceAll.apply(target, args))([RegExp("^[ ]+", "gm"), " "])(string$002Dor$002Dnode)));
const block$002Delement = name => attributes => children$0021 => (() => {
  const children = map(string$002Dto$002Dtext$002Dnode)(children$0021);
  const element = {
    type: "element",
    format: "block",
    name,
    attributes,
    children,
    toString: () => (args => target => target.join.apply(target, args))([""])(map(String)(children)),
    render: context => render$002Dblock$002Delement(context)(element)
  };
  return element;
})();
const inline$002Delement = name => attributes => children$0021 => (() => {
  const children = map(string$002Dto$002Dtext$002Dnode)(children$0021);
  const format = (args => target => target.some.apply(target, args))([node => equals("block")(node.format)])(children) ? "block" : "inline";
  const element = {
    type: "element",
    format,
    name,
    attributes,
    children,
    toString: () => (args => target => target.join.apply(target, args))([""])(map(String)(children)),
    render: context => (() => {
      switch (format) {
        case "inline":
          return render$002Dinline$002Delement(context)(element);
        case "block":
          return render$002Dblock$002Delement(context)(element);
      }
    })()
  };
  return element;
})();
const self$002Dclosing$002Delement = name => attributes => (() => {
  const element = {
    type: "element",
    format: "inline",
    name,
    attributes,
    toString: () => "",
    render: ({indent, level, inline}) => (args => target => target.repeat.apply(target, args))([level])(indent) + "<" + name + render$002Dattributes(attributes) + " />" + (inline ? "" : "\n")
  };
  return element;
})();
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
const $div = block$002Delement("div");
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
export {text, html$0027, html, head$0027, head, title$0027, title, base, link, meta, style$0027, body$0027, body, article$0027, article, section$0027, nav$0027, nav, aside$0027, aside, h1$0027, h1, h2$0027, h2, h3$0027, h3, h4$0027, h4, h5$0027, h5, h6$0027, h6, hgroup$0027, header$0027, header, footer$0027, footer, address$0027, p$0027, p, hr$0027, hr, pre$0027, pre, blockquote$0027, blockquote, ol$0027, ol, ul$0027, ul, menu$0027, li$0027, li, dl$0027, dl, dt$0027, dt, dd$0027, dd, figure$0027, figcaption$0027, main$0027, $div as div, b, mask, rect, linearGradient, object, svg, a, code$0027, code, del$0027, del, em$0027, em, i$0027, i, ins$0027, ins, script, span, strong$0027, strong, time, var$0027, var$, video, embed, img, param, path, stop};
