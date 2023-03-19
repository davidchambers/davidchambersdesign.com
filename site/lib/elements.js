import S from 'sanctuary';
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = value => ({
  ['text-node']: true,
  value: value,
  text: [value],
  render: indent => level => inline => escape(value)
});
const canonicalize$002Dchildren = children => (Array.isArray(children) ? children : [children]).map(child => typeof child === 'string' ? text(child.replace(new RegExp('^[ ]+', 'gm'), ' ').replaceAll('\n', '')) : child);
const render$002Dnode = indent => level => inline => node => node['text-node'] ? escape(node.value) : node['self-closing'] ? render$002Dself$002Dclosing$002Delement(node['tag-name'])(node.attributes)(indent)(level)(inline) : inline || node.format === 'inline' ? render$002Dinline$002Delement(node['tag-name'])(node.attributes)(node.children)(indent)(level)(inline) : render$002Dblock$002Delement(node['tag-name'])(node.attributes)(node.children)(indent)(level)(inline);
const render$002Dattribute = ([name, value]) => ` ${ name }="${ escape(`${ value }`.replace(new RegExp('\n[ ]*', 'g'), ' ')) }"`;
const render$002Dattributes = attrs => Object.entries(attrs).map($0024 => render$002Dattribute($0024)).join('');
const render$002Dblock$002Delement = tag$002Dname => attrs => children => indent => level => inline => `${ indent.repeat(level) }<${ tag$002Dname }${ render$002Dattributes(attrs) }>\n${ children.map($0024 => render$002Dnode(indent)(level + 1)(inline)($0024)).join('') }${ indent.repeat(level) }</${ tag$002Dname }>\n`;
const render$002Dinline$002Delement = tag$002Dname => attrs => children => indent => level => inline => `${ indent.repeat(level) }<${ tag$002Dname }${ render$002Dattributes(attrs) }>${ children.map($0024 => render$002Dnode(indent)(0)(true)($0024)).join('') }</${ tag$002Dname }>${ inline ? '' : '\n' }`;
const render$002Dself$002Dclosing$002Delement = tag$002Dname => attrs => indent => level => inline => `${ indent.repeat(level) }<${ tag$002Dname }${ render$002Dattributes(attrs) } />${ inline ? '' : '\n' }`;
const block$002Delement = tag$002Dname => attrs => children => (() => {
  const children$0027 = canonicalize$002Dchildren(children);
  return {
    ['text-node']: false,
    ['self-closing']: false,
    format: 'block',
    ['tag-name']: tag$002Dname,
    attributes: attrs,
    children: canonicalize$002Dchildren(children),
    text: children$0027.flatMap(child => child.text),
    render: render$002Dblock$002Delement(tag$002Dname)(attrs)(children$0027)
  };
})();
const inline$002Delement = tag$002Dname => attrs => children => (() => {
  const children$0027 = canonicalize$002Dchildren(children);
  const format = children$0027.some(node => node.format === 'block') ? 'block' : 'inline';
  return {
    ['text-node']: false,
    ['self-closing']: false,
    format: format,
    ['tag-name']: tag$002Dname,
    attributes: attrs,
    children: canonicalize$002Dchildren(children),
    text: children$0027.flatMap(child => child.text),
    render: indent => level => inline => (() => {
      const render = format === 'inline' ? render$002Dinline$002Delement : render$002Dblock$002Delement;
      return render(tag$002Dname)(attrs)(children$0027)(indent)(level)(inline);
    })()
  };
})();
const self$002Dclosing$002Delement = tag$002Dname => attrs => ({
  ['text-node']: false,
  ['self-closing']: true,
  format: 'inline',
  ['tag-name']: tag$002Dname,
  attributes: attrs,
  children: [],
  text: [],
  render: render$002Dself$002Dclosing$002Delement(tag$002Dname)(attrs)
});
const html$0027 = block$002Delement('html');
const html = html$0027({});
const head$0027 = block$002Delement('head');
const head = head$0027({});
const title$0027 = inline$002Delement('title');
const title = title$0027({});
const base = self$002Dclosing$002Delement('base');
const link = self$002Dclosing$002Delement('link');
const meta = self$002Dclosing$002Delement('meta');
const style$0027 = block$002Delement('style');
const body$0027 = block$002Delement('body');
const body = body$0027({});
const article$0027 = block$002Delement('article');
const article = article$0027({});
const section$0027 = block$002Delement('section');
const nav$0027 = block$002Delement('nav');
const nav = nav$0027({});
const aside$0027 = inline$002Delement('aside');
const aside = aside$0027({});
const h1$0027 = inline$002Delement('h1');
const h1 = h1$0027({});
const h2$0027 = inline$002Delement('h2');
const h2 = h2$0027({});
const h3$0027 = inline$002Delement('h3');
const h3 = h3$0027({});
const h4$0027 = inline$002Delement('h4');
const h4 = h4$0027({});
const h5$0027 = inline$002Delement('h5');
const h5 = h5$0027({});
const h6$0027 = inline$002Delement('h6');
const h6 = h6$0027({});
const hgroup$0027 = block$002Delement('hgroup');
const header$0027 = block$002Delement('header');
const header = header$0027({});
const footer$0027 = block$002Delement('footer');
const footer = footer$0027({});
const address$0027 = block$002Delement('address');
const p$0027 = inline$002Delement('p');
const p = p$0027({});
const hr$0027 = self$002Dclosing$002Delement('hr');
const hr = hr$0027({});
const pre$0027 = inline$002Delement('pre');
const pre = pre$0027({});
const blockquote$0027 = block$002Delement('blockquote');
const blockquote = blockquote$0027({});
const ol$0027 = block$002Delement('ol');
const ol = ol$0027({});
const ul$0027 = block$002Delement('ul');
const ul = ul$0027({});
const menu$0027 = block$002Delement('menu');
const li$0027 = inline$002Delement('li');
const li = li$0027({});
const dl$0027 = block$002Delement('dl');
const dl = dl$0027({});
const dt$0027 = inline$002Delement('dt');
const dt = dt$0027({});
const dd$0027 = inline$002Delement('dd');
const dd = dd$0027({});
const figure$0027 = block$002Delement('figure');
const figcaption$0027 = block$002Delement('figcaption');
const main$0027 = block$002Delement('main');
const div = block$002Delement('div');
const b = inline$002Delement('b')({});
const mask = block$002Delement('mask');
const rect = self$002Dclosing$002Delement('rect');
const linearGradient = block$002Delement('linearGradient');
const object = block$002Delement('object');
const svg = block$002Delement('svg');
const a$0027 = inline$002Delement('a');
const a = href => a$0027({ href: href });
const code$0027 = inline$002Delement('code');
const code = inline$002Delement('code')({});
const del$0027 = inline$002Delement('del');
const del = inline$002Delement('del')({});
const em$0027 = inline$002Delement('em');
const em = inline$002Delement('em')({});
const i$0027 = inline$002Delement('i');
const i = inline$002Delement('i')({});
const ins$0027 = inline$002Delement('ins');
const ins = inline$002Delement('ins')({});
const script = inline$002Delement('script');
const span = inline$002Delement('span');
const strong$0027 = inline$002Delement('strong');
const strong = inline$002Delement('strong')({});
const time = inline$002Delement('time');
const var$0027 = inline$002Delement('var');
const var_ = inline$002Delement('var')({});
const video = inline$002Delement('video');
const embed = self$002Dclosing$002Delement('embed');
const img = self$002Dclosing$002Delement('img');
const param = self$002Dclosing$002Delement('param');
const path = self$002Dclosing$002Delement('path');
const stop = self$002Dclosing$002Delement('stop');
export {
  canonicalize$002Dchildren,
  text,
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
