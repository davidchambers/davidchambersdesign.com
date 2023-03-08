import {
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
} from '../elements.js';
import {
  _captioned$002Dimage,
  _code$002Dblock
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      strong('Chris Coyier has done it again.'),
      '\n             Compelled me to stay up all night, that is\n             (it\'s 7am as I type this). In Chris\'s latest screencast, ',
      a('http://css-tricks.com/video-screencasts/82-css-image-switcher/')('CSS Image Switcher'),
      ', he demonstrates how to create an\n             "image switcher" using CSS. The problem, though, is that ',
      strong('his process is wrong'),
      '.'
    ]),
    h4('Incorrect process'),
    ol([
      li(['What effect or experience do I want to create?']),
      li(['How can I achieve this using CSS\n                  (and JavaScript if necessary)?']),
      li(['What can my markup do to help me?'])
    ]),
    h4('Correct process'),
    ol([
      li(['What effect or experience do I want to create?']),
      li(['What is the most correct and meaningful way to describe\n                  the content?']),
      li([
        'How can I achieve the desired effect or experience\n                  (or something close to it) ',
        em('without'),
        ' altering\n                  my markup?'
      ])
    ])
  ]),
  p([
    'Chris simply isn\'t in the right mindset. He\'s thinking\n        about ',
    em('how'),
    ' he\'s going to present the content\n        on the page, but he\'s forgetting to consider the content\n        itself. This is a crucial error. If one views Chris\'s ',
    a('http://css-tricks.com/examples/CSSImageSwitcher/')('CSS image switcher demo'),
    ' with styles disabled,\n        one sees something most unhelpful:'
  ]),
  _captioned$002Dimage('/images/posts/43/css-tricks-image-switcher-demo-sans-styles.png')('Chris Coyier\'s CSS image switcher demo displays nothing\n      but four unhelpful links when styles are disabled')('CSS image switcher demo as seen at CSS-Tricks\n      (with styles disabled; note the lack of images)'),
  p([
    'Well, at least one could click on these links to view the images,\n        right? Wrong! The hrefs contain nothing but the hash sign. Chris\n        does mention in the screencast that these links ',
    em('could'),
    '\n        go somewhere, but it\'s as if to say ',
    strong('hey, here\'re some\n        links if you need \'em'),
    ' rather than ',
    strong('yikes! this\n        page\'ll be worthless when styles are disabled, you\'d sure as\n        hell better link to the images as backup'),
    '.'
  ]),
  p([
    'I assume that Chris opted to use anchor elements to allow him\n        to employ the ',
    strong(':hover'),
    ' pseudo-class and have it work\n        in IE6. It\'s well and truly time, however, to stop bending over\n        backwards to accommodate IE6\'s shortcomings, and Google agrees: ',
    a('http://www.sitepoint.com/blogs/2009/07/20/youtube-drop-ie6/')('YouTube to drop support for IE6'),
    '.'
  ]),
  h3('Why meaningful markup matters'),
  p([
    'Meaningful HTML is not just important to markup geeks who like\n        to use the word "semantic". ',
    strong('It\'s vitally important\n        to search engines.'),
    ' While in most cases discussion of the\n        relationship between structured content and search engines\n        centres on whether Google favours sites with clean, descriptive\n        markup, in the case of Chris\'s CSS image switcher it\'s a matter of\n        whether the content is indexable at all! Consider the consequences\n        of a site such as ',
    a('http://www.flickr.com/')('Flickr'),
    '\n        adopting this approach: any new photo uploaded to the site would\n        be invisible to web crawlers.'
  ]),
  p([
    'One should not rely on either CSS or JavaScript to deliver ',
    em('content'),
    ' \u2013 HTML exists to contain and describe content.\n        This is a pragmatic consideration as well as an idealogical one:\n        HTML is the one component of the HTML+CSS+JavaScript stack to\n        which all users have access (certain devices, for example,\n        eschew CSS support in favour of faster page loads).'
  ]),
  h3('Meaningful markup for image\u2013caption pairs'),
  p([
    'As I state in ',
    a('/captions-over-images/')('Captions over images'),
    ',\n        my response to an earlier CSS-Tricks screencast, the ',
    strong('definition list'),
    ' is the most appropriate tool\n        in our toolbox.'
  ]),
  _captioned$002Dimage('/images/posts/43/definition-list-markup.png')('Definition list markup')([
    'The screenshot above is marked up within a ',
    strong('dt'),
    '\n        and this caption is a ',
    strong('dd'),
    ' (how meta!)'
  ]),
  p([
    'Each term in a definition list should have ',
    em('at least'),
    ' one\n        definition. This enables more than one description -- a title and a\n        caption, for instance -- to be tied to an image:'
  ]),
  _code$002Dblock(Symbol.for('html'))('\n     <dl>\n         <dt><img src="images/ds81.jpg" alt="Vancouver architecture" /></dt>\n         <dd>This is not like that</dd>\n         <dd>Contrasting ideas engage the mind. Make a photo today that tells\n         a story with contrasting elements. \u2014 <i>Daily Shoot 81</i></dd>\n         ...\n     </dl>\n     '),
  p(['Beautiful, isn\'t it? No pointless (literally) anchors, no meaningless\n        ids, no class names, just content wrapped in descriptive HyperText\n        Markup Language. This ensures that the page\'s content is accessible\n        to all: those viewing the page on mobile phones; those using screen\n        readers or feed readers; and, of course, web crawlers.']),
  _captioned$002Dimage('/images/posts/43/meaningful-markup-degrades-gracefully.jpg')('Meaningful markup degrades gracefully')('The page\'s content is accessible even with styles disabled'),
  h3('Demo'),
  p([
    'Check out the ',
    a('/examples/css-image-switcher/')('CSS image switcher demo'),
    '\n        to see what\'s possible with straightforward, structured markup\n        (and some rather less straightforward CSS). The demo works in\n        the latest versions of Firefox, Internet Explorer, Opera, and\n        Camino. Unfortunately the core feature does ',
    em('not'),
    ' work\n        in Safari or Google Chrome, as these WebKit-based browsers fail\n        to handle the ',
    code('dt+dd:hover~dt'),
    ' selector.'
  ])
];
export default {
  [Symbol.for('id')]: 43,
  [Symbol.for('slug')]: 'css-image-switcher-done-the-right-way',
  [Symbol.for('title')]: 'CSS image switcher (done the right way)',
  [Symbol.for('datetime')]: datetime('2010-03-24')('12:47:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'accessibility',
    'best-practice',
    'css',
    'meaningful-markup',
    'seo',
    'ux'
  ],
  [Symbol.for('body')]: body
};
