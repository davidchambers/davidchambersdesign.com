import S from 'sanctuary';
const escape = S.pipe([
  s => s.replaceAll('&', '&amp;'),
  s => s.replaceAll('<', '&lt;'),
  s => s.replaceAll('>', '&gt;')
]);
const text = value => {
  return {
    ['text']: [value],
    ['render']: indent => level => inline => escape(value)
  };
};
const canonicalize$002Dattrs = S.map(String);
const canonicalize$002Dchildren = S.compose(S.map(child => typeof child == 'string' ? S.pipe([
  s => s.replace(new RegExp('^[ ]+', 'gm'), ' '),
  s => s.replaceAll('\n', ''),
  text
])(child) : child))(S.unless(Array.isArray)(Array.of));
const render$002Dblock$002Delement = tag$002Dname => {
  return attrs => children => indent => level => inline => indent.repeat(level) + '<' + Symbol.keyFor(tag$002Dname) + S.foldMap(String)(entry => ' ' + entry[0] + `="` + escape(String(entry[1]).replace(new RegExp('\n[ ]*', 'g'), ' ')) + `"`)(Object.entries(attrs)) + '>\n' + S.foldMap(String)(child => child.render(indent)(level + 1)(false))(children) + indent.repeat(level) + '</' + Symbol.keyFor(tag$002Dname) + '>\n';
};
const render$002Dinline$002Delement = tag$002Dname => {
  return attrs => children => indent => level => inline => indent.repeat(level) + '<' + Symbol.keyFor(tag$002Dname) + S.foldMap(String)(entry => ' ' + entry[0] + `="` + escape(String(entry[1]).replace(new RegExp('\n[ ]*', 'g'), ' ')) + `"`)(Object.entries(attrs)) + '>' + S.foldMap(String)(child => child.render(indent)(0)(true))(children) + '</' + Symbol.keyFor(tag$002Dname) + '>' + (inline ? '' : '\n');
};
const render$002Dself$002Dclosing$002Delement = tag$002Dname => {
  return attrs => indent => level => inline => indent.repeat(level) + '<' + Symbol.keyFor(tag$002Dname) + S.foldMap(String)(entry => ' ' + entry[0] + `="` + escape(String(entry[1]).replace(new RegExp('\n[ ]*', 'g'), ' ')) + `"`)(Object.entries(attrs)) + ' />' + (inline ? '' : '\n');
};
const block$002Delement = tag$002Dname => {
  return attrs => children => (() => {
    const children$0027 = canonicalize$002Dchildren(children);
    return {
      ['format']: Symbol.for('block'),
      ['text']: children$0027.flatMap(child => child.text),
      ['render']: render$002Dblock$002Delement(tag$002Dname)(attrs)(children$0027)
    };
  })();
};
const inline$002Delement = tag$002Dname => {
  return attrs => children => (() => {
    const children$0027 = canonicalize$002Dchildren(children);
    const format = children$0027.some(node => node.format === Symbol.for('block')) ? Symbol.for('block') : Symbol.for('inline');
    return {
      ['format']: format,
      ['text']: children$0027.flatMap(child => child.text),
      ['render']: indent => level => inline => (() => {
        const render = format === Symbol.for('inline') ? render$002Dinline$002Delement : render$002Dblock$002Delement;
        return render(tag$002Dname)(attrs)(children$0027)(indent)(level)(inline);
      })()
    };
  })();
};
const self$002Dclosing$002Delement = tag$002Dname => {
  return attrs => ({
    ['format']: Symbol.for('inline'),
    ['text']: [],
    ['render']: render$002Dself$002Dclosing$002Delement(tag$002Dname)(attrs)
  });
};
const excerpt = children => {
  return (() => {
    const children$0027 = canonicalize$002Dchildren(children);
    const render = indent => {
      return level => inline => S.foldMap(String)(child => child.render(indent)(level)(inline))(children$0027);
    };
    return {
      ['text']: children.flatMap(child => child.text),
      ['render']: render
    };
  })();
};
const html$0027 = block$002Delement(Symbol.for('html'));
const html = html$0027({});
const head$0027 = block$002Delement(Symbol.for('head'));
const head = head$0027({});
const title$0027 = inline$002Delement(Symbol.for('title'));
const title = title$0027({});
const base = self$002Dclosing$002Delement(Symbol.for('base'));
const link = self$002Dclosing$002Delement(Symbol.for('link'));
const meta = self$002Dclosing$002Delement(Symbol.for('meta'));
const style$0027 = block$002Delement(Symbol.for('style'));
const body$0027 = block$002Delement(Symbol.for('body'));
const body = body$0027({});
const article$0027 = block$002Delement(Symbol.for('article'));
const article = article$0027({});
const section$0027 = block$002Delement(Symbol.for('section'));
const nav$0027 = block$002Delement(Symbol.for('nav'));
const nav = nav$0027({});
const aside$0027 = inline$002Delement(Symbol.for('aside'));
const aside = aside$0027({});
const h1$0027 = inline$002Delement(Symbol.for('h1'));
const h1 = h1$0027({});
const h2$0027 = inline$002Delement(Symbol.for('h2'));
const h2 = h2$0027({});
const h3$0027 = inline$002Delement(Symbol.for('h3'));
const h3 = h3$0027({});
const h4$0027 = inline$002Delement(Symbol.for('h4'));
const h4 = h4$0027({});
const h5$0027 = inline$002Delement(Symbol.for('h5'));
const h5 = h5$0027({});
const h6$0027 = inline$002Delement(Symbol.for('h6'));
const h6 = h6$0027({});
const hgroup$0027 = block$002Delement(Symbol.for('hgroup'));
const header$0027 = block$002Delement(Symbol.for('header'));
const header = header$0027({});
const footer$0027 = block$002Delement(Symbol.for('footer'));
const footer = footer$0027({});
const address$0027 = block$002Delement(Symbol.for('address'));
const p$0027 = inline$002Delement(Symbol.for('p'));
const p = p$0027({});
const hr$0027 = self$002Dclosing$002Delement(Symbol.for('hr'));
const hr = hr$0027({});
const pre$0027 = inline$002Delement(Symbol.for('pre'));
const pre = pre$0027({});
const blockquote$0027 = block$002Delement(Symbol.for('blockquote'));
const blockquote = blockquote$0027({});
const ol$0027 = block$002Delement(Symbol.for('ol'));
const ol = ol$0027({});
const ul$0027 = block$002Delement(Symbol.for('ul'));
const ul = ul$0027({});
const menu$0027 = block$002Delement(Symbol.for('menu'));
const li$0027 = inline$002Delement(Symbol.for('li'));
const li = li$0027({});
const dl$0027 = block$002Delement(Symbol.for('dl'));
const dl = dl$0027({});
const dt$0027 = inline$002Delement(Symbol.for('dt'));
const dt = dt$0027({});
const dd$0027 = inline$002Delement(Symbol.for('dd'));
const dd = dd$0027({});
const figure$0027 = block$002Delement(Symbol.for('figure'));
const figcaption$0027 = block$002Delement(Symbol.for('figcaption'));
const main$0027 = block$002Delement(Symbol.for('main'));
const div = block$002Delement(Symbol.for('div'));
const b = inline$002Delement(Symbol.for('b'))({});
const mask = block$002Delement(Symbol.for('mask'));
const rect = self$002Dclosing$002Delement(Symbol.for('rect'));
const linearGradient = block$002Delement(Symbol.for('linearGradient'));
const object = block$002Delement(Symbol.for('object'));
const svg = block$002Delement(Symbol.for('svg'));
const a$0027 = inline$002Delement(Symbol.for('a'));
const a = href => {
  return a$0027({ ['href']: href });
};
const code$0027 = inline$002Delement(Symbol.for('code'));
const code = inline$002Delement(Symbol.for('code'))({});
const del$0027 = inline$002Delement(Symbol.for('del'));
const del = inline$002Delement(Symbol.for('del'))({});
const em$0027 = inline$002Delement(Symbol.for('em'));
const em = inline$002Delement(Symbol.for('em'))({});
const i$0027 = inline$002Delement(Symbol.for('i'));
const i = inline$002Delement(Symbol.for('i'))({});
const ins$0027 = inline$002Delement(Symbol.for('ins'));
const ins = inline$002Delement(Symbol.for('ins'))({});
const script = inline$002Delement(Symbol.for('script'));
const span = inline$002Delement(Symbol.for('span'));
const strong$0027 = inline$002Delement(Symbol.for('strong'));
const strong = inline$002Delement(Symbol.for('strong'))({});
const time = inline$002Delement(Symbol.for('time'));
const var$0027 = inline$002Delement(Symbol.for('var'));
const var_ = inline$002Delement(Symbol.for('var'))({});
const video = inline$002Delement(Symbol.for('video'));
const embed = self$002Dclosing$002Delement(Symbol.for('embed'));
const img = self$002Dclosing$002Delement(Symbol.for('img'));
const param = self$002Dclosing$002Delement(Symbol.for('param'));
const path = self$002Dclosing$002Delement(Symbol.for('path'));
const stop = self$002Dclosing$002Delement(Symbol.for('stop'));
export {
  canonicalize$002Dchildren,
  text,
  excerpt,
  a,
  a$0027,
  article,
  article$0027,
  aside,
  aside$0027,
  b,
  blockquote,
  blockquote$0027,
  body,
  body$0027,
  code,
  code$0027,
  dd,
  dd$0027,
  del,
  del$0027,
  div,
  dl,
  dl$0027,
  dt,
  dt$0027,
  em,
  em$0027,
  embed,
  footer,
  footer$0027,
  h1,
  h1$0027,
  h2,
  h2$0027,
  h3,
  h3$0027,
  h4,
  h4$0027,
  h5,
  h5$0027,
  h6,
  h6$0027,
  head,
  head$0027,
  header,
  header$0027,
  hr,
  hr$0027,
  html,
  html$0027,
  i,
  i$0027,
  img,
  ins,
  ins$0027,
  li,
  li$0027,
  linearGradient,
  link,
  mask,
  meta,
  nav,
  nav$0027,
  object,
  ol,
  ol$0027,
  p,
  p$0027,
  param,
  path,
  pre,
  pre$0027,
  rect,
  script,
  span,
  stop,
  strong,
  strong$0027,
  svg,
  time,
  title,
  title$0027,
  ul,
  ul$0027,
  var_,
  var$0027,
  video
};
