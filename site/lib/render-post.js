import S from 'sanctuary';
import {
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
} from './elements.js';
import tags from './tags.js';
const render$002Dpost = function render$002Dpost(post) {
  return related$002Dposts => [article$0027(S.maybe({})(S.singleton(Symbol.for('id')))(S.value(Symbol.for('article-id'))(post)))([
      header([
        h1(post[Symbol.for('title')]),
        time({
          [Symbol.for('datetime')]: post[Symbol.for('datetime')].toFormat('yyyy-MM-dd\'T\'HH:mm:ssZZ'),
          [Symbol.for('pubdate')]: 'pubdate'
        })(post[Symbol.for('datetime')].toFormat('d MMMM y'))
      ]),
      ...post[Symbol.for('body')],
      footer$0027({ [Symbol.for('class')]: 'metadata' })(S.join([
        [ul(li$0027({ [Symbol.for('class')]: 'shorturl' })(a('http://dċd.ws/' + post[Symbol.for('id')] + '/')('Short URL')))],
        S.array([])(head => tail => [
          h4('This post has the following tags:'),
          ol(S.map(tag => li(a('/tag/' + tag + '/')(tags[tag])))([
            head,
            ...tail
          ]))
        ])(post[Symbol.for('tags')])
      ])),
      ...related$002Dposts.length === 0 ? [] : [
        h3$0027({ [Symbol.for('id')]: 'related' })('Possibly related posts'),
        ul(S.map(related$002Dpost => li(a('/' + related$002Dpost[Symbol.for('slug')] + '/')(related$002Dpost[Symbol.for('title')])))(related$002Dposts))
      ]
    ])];
};
export default render$002Dpost;
