const {XOR, OR, subtract, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, quot, rem, div, mod, equals, concat, empty, reduce, reduceRight, filter, reject, map, flip, of, chain, contains} = {
  XOR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => rhs.has(x))]);
      default:
        return lhs ^ rhs;
    }
  })(),
  OR: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs, ...rhs]]);
      default:
        return lhs | rhs;
    }
  })(),
  subtract: rhs => lhs => (() => {
    switch (globalThis.Reflect.apply(globalThis.Object.prototype.toString, rhs, [])) {
      case "[object Set]":
        return globalThis.Reflect.construct(globalThis.Set, [[...lhs].filter(x => !rhs.has(x))]);
      default:
        return lhs - rhs;
    }
  })(),
  apply: f => args => f.apply(null, args),
  construct: constructor => args => globalThis.Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => match$0027(type)(x => CasesNotExhaustive),
  ["match'"]: type => type[globalThis.Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  quot: lhs => rhs => rhs === 0 ? DivisionByZero : lhs / rhs | 0,
  rem: lhs => rhs => rhs === 0 ? DivisionByZero : lhs % rhs,
  div: lhs => rhs => rhs === 0 ? DivisionByZero : globalThis.Math.floor(lhs / rhs),
  mod: lhs => rhs => rhs === 0 ? DivisionByZero : (lhs % rhs + rhs) % rhs,
  equals: this$ => that => globalThis.Array.isArray(this$) ? globalThis.Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => globalThis.Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  empty: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return [];
      case "Object":
        return {};
      case "String":
        return "";
      case "Set":
      case "Map":
        return globalThis.Reflect.construct(typeRep, [[]]);
      default:
        return typeRep["fantasy-land/empty"]();
    }
  })(),
  reduce: f => y => x => x[globalThis.Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => globalThis.Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => filter(x => !f(x)),
  map: f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  of: typeRep => (() => {
    switch (typeRep.name) {
      case "Array":
        return globalThis.Array.of;
      case "Function":
        return x => y => x;
      case "Set":
        return x => globalThis.Reflect.construct(typeRep, [[x]]);
      default:
        return typeRep["fantasy-land/of"];
    }
  })(),
  chain: f => x => globalThis.Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f),
  contains: this$ => these => reduce(x => that => x || equals(this$)(that))(false)(these)
};
export default {
  [".htaccess"]: ".htaccess",
  accessibility: "accessibility",
  adobe: "Adobe",
  applescript: "AppleScript",
  architecture: "architecture",
  art: "art",
  ["best-practice"]: "best practice",
  bookmarklets: "bookmarklets",
  coda: "Coda",
  coffeescript: "CoffeeScript",
  compass: "Compass",
  ["continuation-passing-style"]: "continuation-passing style",
  cs3: "CS3",
  css: "CSS",
  css3: "CSS3",
  ["data-structures"]: "data structures",
  design: "design",
  django: "Django",
  dom: "DOM",
  emacs: "Emacs",
  flash: "Flash",
  gmail: "Gmail",
  google: "Google",
  ["google-calendar"]: "google calendar",
  ["google-chrome"]: "Google Chrome",
  hacks: "hacks",
  hashify: "Hashify",
  hg: "hg",
  html: "HTML",
  html5: "HTML5",
  i18n: "i18n",
  icons: "icons",
  ie: "IE",
  illustrator: "Illustrator",
  iphone: "iPhone",
  itunes: "iTunes",
  javascript: "JavaScript",
  jquery: "jQuery",
  ["keyboard-shortcuts"]: "keyboard shortcuts",
  language: "language",
  localization: "localization",
  ["mac-os-x"]: "Mac OS X",
  mango: "Mango",
  markdown: "Markdown",
  ["meaningful-markup"]: "meaningful markup",
  mercurial: "Mercurial",
  mootools: "MooTools",
  mvc: "MVC",
  mysql: "MySQL",
  ["node.js"]: "Node.js",
  optimization: "optimization",
  performance: "performance",
  photoshop: "Photoshop",
  php: "PHP",
  productivity: "productivity",
  programming: "programming",
  prototype: "Prototype",
  python: "Python",
  regex: "regex",
  ["regular-expressions"]: "regular expressions",
  ruby: "Ruby",
  safari: "Safari",
  sass: "Sass",
  ["script.aculo.us"]: "script.aculo.us",
  search: "search",
  security: "security",
  seo: "SEO",
  showdown: "Showdown",
  sms: "SMS",
  ["snow-leopard"]: "Snow Leopard",
  ["socket.io"]: "Socket.IO",
  solarized: "Solarized",
  sproutcore: "SproutCore",
  sql: "SQL",
  ["syntax-highlighting"]: "syntax highlighting",
  syntaxhighlighter: "SyntaxHighlighter",
  ["terminal.app"]: "Terminal.app",
  textmate: "TextMate",
  twitter: "Twitter",
  typography: "typography",
  ux: "UX",
  video: "video",
  webkit: "WebKit",
  websockets: "WebSockets",
  windows: "Windows",
  wmd: "wmd",
  wordpress: "WordPress"
};
