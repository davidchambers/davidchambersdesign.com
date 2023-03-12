import s from './sanctuary.js';
const escape = s[Symbol.for('pipe')]([
  s => s['replaceAll']('&', '&amp;'),
  s => s['replaceAll']('<', '&lt;'),
  s => s['replaceAll']('>', '&gt;')
]);
const text = function text(value) {
  return {
    [Symbol.for('text')]: [value],
    [Symbol.for('render')]: indent => level => inline => escape(value)
  };
};
const _canonicalize$002Dattrs = function _canonicalize$002Dattrs(attrs) {
  return Object['fromEntries'](s[Symbol.for('map')](name => (() => {
    const value = attrs[name];
    return [
      name,
      typeof value == 'symbol' ? Symbol['keyFor'](value) : String(value)
    ];
  })())(Object['getOwnPropertySymbols'](attrs)));
};
const _canonicalize$002Dchildren = s[Symbol.for('compose')](s[Symbol.for('map')](child => typeof child == 'string' ? s[Symbol.for('pipe')]([
  s => s['replace'](new RegExp('^[ ]+', 'gm'), ' '),
  s => s['replaceAll']('\n', ''),
  s => s['replaceAll'](' -- ', '\u2009\u2014\u2009'),
  text
])(child) : child))(s[Symbol.for('unless')](Array['isArray'])(Array['of']));
const _render$002Dblock$002Delement = function _render$002Dblock$002Delement(_tag$002Dname) {
  return attrs => children => indent => level => _$002Dinline => indent['repeat'](level) + '<' + Symbol['keyFor'](_tag$002Dname) + s[Symbol.for('fold-map')](String)(sym => ' ' + Symbol['keyFor'](sym) + '="' + escape(s[Symbol.for('unwords')](s[Symbol.for('map')](s[Symbol.for('trim')])(s[Symbol.for('lines')](attrs[sym])))) + '"')(Object['getOwnPropertySymbols'](attrs)) + '>\n' + s[Symbol.for('fold-map')](String)(child => child[Symbol.for('render')](indent)(level + 1)(false))(children) + indent['repeat'](level) + '</' + Symbol['keyFor'](_tag$002Dname) + '>\n';
};
const _render$002Dinline$002Delement = function _render$002Dinline$002Delement(_tag$002Dname) {
  return attrs => children => indent => level => inline => indent['repeat'](level) + '<' + Symbol['keyFor'](_tag$002Dname) + s[Symbol.for('fold-map')](String)(sym => ' ' + Symbol['keyFor'](sym) + '="' + escape(s[Symbol.for('unwords')](s[Symbol.for('map')](s[Symbol.for('trim')])(s[Symbol.for('lines')](attrs[sym])))) + '"')(Object['getOwnPropertySymbols'](attrs)) + '>' + s[Symbol.for('fold-map')](String)(child => child[Symbol.for('render')](indent)(0)(true))(children) + '</' + Symbol['keyFor'](_tag$002Dname) + '>' + (inline ? '' : '\n');
};
const _render$002Dself$002Dclosing$002Delement = function _render$002Dself$002Dclosing$002Delement(_tag$002Dname) {
  return attrs => indent => level => inline => indent['repeat'](level) + '<' + Symbol['keyFor'](_tag$002Dname) + s[Symbol.for('fold-map')](String)(sym => ' ' + Symbol['keyFor'](sym) + '="' + escape(s[Symbol.for('unwords')](s[Symbol.for('map')](s[Symbol.for('trim')])(s[Symbol.for('lines')](attrs[sym])))) + '"')(Object['getOwnPropertySymbols'](attrs)) + ' />' + (inline ? '' : '\n');
};
const _block$002Delement = function _block$002Delement(_tag$002Dname) {
  return _$002Dattrs => _$002Dchildren => (() => {
    const attrs = _canonicalize$002Dattrs(_$002Dattrs);
    const children = _canonicalize$002Dchildren(_$002Dchildren);
    return {
      [Symbol.for('format')]: Symbol.for('block'),
      [Symbol.for('text')]: children['flatMap'](child => child[Symbol.for('text')]),
      [Symbol.for('render')]: _render$002Dblock$002Delement(_tag$002Dname)(attrs)(children)
    };
  })();
};
const _inline$002Delement = function _inline$002Delement(_tag$002Dname) {
  return _$002Dattrs => _$002Dchildren => (() => {
    const attrs = _canonicalize$002Dattrs(_$002Dattrs);
    const children = _canonicalize$002Dchildren(_$002Dchildren);
    const format = children['some'](node => node[Symbol.for('format')] === Symbol.for('block')) ? Symbol.for('block') : Symbol.for('inline');
    return {
      [Symbol.for('format')]: format,
      [Symbol.for('text')]: children['flatMap'](child => child[Symbol.for('text')]),
      [Symbol.for('render')]: indent => level => inline => (() => {
        const render = format === Symbol.for('inline') ? _render$002Dinline$002Delement : _render$002Dblock$002Delement;
        return render(_tag$002Dname)(attrs)(children)(indent)(level)(inline);
      })()
    };
  })();
};
const _self$002Dclosing$002Delement = function _self$002Dclosing$002Delement(_tag$002Dname) {
  return _$002Dattrs => (() => {
    const attrs = _canonicalize$002Dattrs(_$002Dattrs);
    return {
      [Symbol.for('format')]: Symbol.for('inline'),
      [Symbol.for('text')]: [],
      [Symbol.for('render')]: _render$002Dself$002Dclosing$002Delement(_tag$002Dname)(attrs)
    };
  })();
};
const excerpt = function excerpt(_$002Dchildren) {
  return (() => {
    const children = _canonicalize$002Dchildren(_$002Dchildren);
    const render = function render(indent) {
      return level => inline => s[Symbol.for('fold-map')](String)(child => child[Symbol.for('render')](indent)(level)(inline))(children);
    };
    return {
      [Symbol.for('text')]: children['flatMap'](child => child[Symbol.for('text')]),
      [Symbol.for('render')]: render
    };
  })();
};
const _html$0027 = _block$002Delement(Symbol.for('html'));
const html = _html$0027({});
const _head$0027 = _block$002Delement(Symbol.for('head'));
const head = _head$0027({});
const _title$0027 = _inline$002Delement(Symbol.for('title'));
const title = _title$0027({});
const base = _self$002Dclosing$002Delement(Symbol.for('base'));
const link = _self$002Dclosing$002Delement(Symbol.for('link'));
const meta = _self$002Dclosing$002Delement(Symbol.for('meta'));
const _style$0027 = _block$002Delement(Symbol.for('style'));
const _body$0027 = _block$002Delement(Symbol.for('body'));
const body = _body$0027({});
const _article$0027 = _block$002Delement(Symbol.for('article'));
const article = _article$0027({});
const _section$0027 = _block$002Delement(Symbol.for('section'));
const _nav$0027 = _block$002Delement(Symbol.for('nav'));
const nav = _nav$0027({});
const _aside$0027 = _inline$002Delement(Symbol.for('aside'));
const aside = _aside$0027({});
const _h1$0027 = _inline$002Delement(Symbol.for('h1'));
const h1 = _h1$0027({});
const _h2$0027 = _inline$002Delement(Symbol.for('h2'));
const h2 = _h2$0027({});
const _h3$0027 = _inline$002Delement(Symbol.for('h3'));
const h3 = _h3$0027({});
const _h4$0027 = _inline$002Delement(Symbol.for('h4'));
const h4 = _h4$0027({});
const _h5$0027 = _inline$002Delement(Symbol.for('h5'));
const h5 = _h5$0027({});
const _h6$0027 = _inline$002Delement(Symbol.for('h6'));
const h6 = _h6$0027({});
const _hgroup$0027 = _block$002Delement(Symbol.for('hgroup'));
const _header$0027 = _block$002Delement(Symbol.for('header'));
const header = _header$0027({});
const _footer$0027 = _block$002Delement(Symbol.for('footer'));
const footer = _footer$0027({});
const _address$0027 = _block$002Delement(Symbol.for('address'));
const _p$0027 = _inline$002Delement(Symbol.for('p'));
const p = _p$0027({});
const _hr$0027 = _self$002Dclosing$002Delement(Symbol.for('hr'));
const hr = _hr$0027({});
const _pre$0027 = _inline$002Delement(Symbol.for('pre'));
const pre = _pre$0027({});
const _blockquote$0027 = _block$002Delement(Symbol.for('blockquote'));
const blockquote = _blockquote$0027({});
const _ol$0027 = _block$002Delement(Symbol.for('ol'));
const ol = _ol$0027({});
const _ul$0027 = _block$002Delement(Symbol.for('ul'));
const ul = _ul$0027({});
const _menu$0027 = _block$002Delement(Symbol.for('menu'));
const _li$0027 = _inline$002Delement(Symbol.for('li'));
const li = _li$0027({});
const _dl$0027 = _block$002Delement(Symbol.for('dl'));
const dl = _dl$0027({});
const _dt$0027 = _inline$002Delement(Symbol.for('dt'));
const dt = _dt$0027({});
const _dd$0027 = _inline$002Delement(Symbol.for('dd'));
const dd = _dd$0027({});
const _figure$0027 = _block$002Delement(Symbol.for('figure'));
const _figcaption$0027 = _block$002Delement(Symbol.for('figcaption'));
const _main$0027 = _block$002Delement(Symbol.for('main'));
const div = _block$002Delement(Symbol.for('div'));
const b = _inline$002Delement(Symbol.for('b'))({});
const mask = _block$002Delement(Symbol.for('mask'));
const rect = _self$002Dclosing$002Delement(Symbol.for('rect'));
const linearGradient = _block$002Delement(Symbol.for('linearGradient'));
const object = _block$002Delement(Symbol.for('object'));
const svg = _block$002Delement(Symbol.for('svg'));
const _a$0027 = _inline$002Delement(Symbol.for('a'));
const a = function a(href) {
  return _a$0027({ [Symbol.for('href')]: href });
};
const _code$0027 = _inline$002Delement(Symbol.for('code'));
const code = _inline$002Delement(Symbol.for('code'))({});
const _del$0027 = _inline$002Delement(Symbol.for('del'));
const del = _inline$002Delement(Symbol.for('del'))({});
const _em$0027 = _inline$002Delement(Symbol.for('em'));
const em = _inline$002Delement(Symbol.for('em'))({});
const _i$0027 = _inline$002Delement(Symbol.for('i'));
const i = _inline$002Delement(Symbol.for('i'))({});
const _ins$0027 = _inline$002Delement(Symbol.for('ins'));
const ins = _inline$002Delement(Symbol.for('ins'))({});
const script = _inline$002Delement(Symbol.for('script'));
const span = _inline$002Delement(Symbol.for('span'));
const _strong$0027 = _inline$002Delement(Symbol.for('strong'));
const strong = _inline$002Delement(Symbol.for('strong'))({});
const time = _inline$002Delement(Symbol.for('time'));
const _var$0027 = _inline$002Delement(Symbol.for('var'));
const _var = _inline$002Delement(Symbol.for('var'))({});
const video = _inline$002Delement(Symbol.for('video'));
const embed = _self$002Dclosing$002Delement(Symbol.for('embed'));
const img = _self$002Dclosing$002Delement(Symbol.for('img'));
const param = _self$002Dclosing$002Delement(Symbol.for('param'));
const path = _self$002Dclosing$002Delement(Symbol.for('path'));
const stop = _self$002Dclosing$002Delement(Symbol.for('stop'));
export {
  _canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  _a$0027,
  article,
  _article$0027,
  aside,
  _aside$0027,
  b,
  blockquote,
  _blockquote$0027,
  body,
  _body$0027,
  code,
  _code$0027,
  dd,
  _dd$0027,
  del,
  _del$0027,
  div,
  dl,
  _dl$0027,
  dt,
  _dt$0027,
  em,
  _em$0027,
  embed,
  footer,
  _footer$0027,
  h1,
  _h1$0027,
  h2,
  _h2$0027,
  h3,
  _h3$0027,
  h4,
  _h4$0027,
  h5,
  _h5$0027,
  h6,
  _h6$0027,
  head,
  _head$0027,
  header,
  _header$0027,
  hr,
  _hr$0027,
  html,
  _html$0027,
  i,
  _i$0027,
  img,
  ins,
  _ins$0027,
  li,
  _li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  _nav$0027,
  object,
  ol,
  _ol$0027,
  p,
  _p$0027,
  param,
  path,
  pre,
  _pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  _strong$0027,
  svg,
  time,
  title,
  _title$0027,
  ul,
  _ul$0027,
  _var,
  _var$0027,
  video
};
