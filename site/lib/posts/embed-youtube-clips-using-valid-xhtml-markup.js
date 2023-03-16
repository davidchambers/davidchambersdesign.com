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
} from '../elements.js';
import {
  code$002Dblock,
  $2014
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  p(['There are blog posts all over the Web explaining how to\n    write valid XHTML markup to embed YouTube videos. There\n    are also a number of online converters that generate this\n    markup automatically.']),
  p([
    'I\'ve always found it easier to write the markup myself,\n    as there\'s really nothing to it. Simply replace both\n    instances of ',
    code('video_id'),
    ' in the following\n    code with',
    $2014,
    'you guessed it',
    $2014,
    'the video\'s ID.'
  ]),
  code$002Dblock(Symbol.for('html'))(`<object class="youtube"
        type="application/x-shockwave-flash"
        data="http://www.youtube.com/v/video_id&hl=en&fs=1&rel=0">
    <param name="movie" value="http://www.youtube.com/v/video_id&hl=en&fs=1&rel=0" />
    <param name="allowFullScreen" value="true" />
</object>
`),
  p([
    code('rel=0'),
    ' is often useful to include (as I\'ve done\n    in the example above) as it prevents thumbnails for related\n    videos from being displayed at the end of the clip.'
  ]),
  p([
    'One important point to remember when you\'re "rolling your own"\n    markup is that the character entity ',
    code('&amp;'),
    ' must be\n    used for all ampersands.'
  ]),
  p([
    'Finally, be aware of the fact that it\'s possible to change the size\n    of the YouTube object using CSS. There\'s no need to include the ',
    code('width'),
    ' and ',
    code('height'),
    ' attributes in the markup.'
  ]),
  code$002Dblock(Symbol.for('css'))(`object.youtube
{
    width: 100%;
    height: 385px;
}
`)
];
export default {
  id: 25,
  slug: 'embed-youtube-clips-using-valid-xhtml-markup',
  title: 'Embed YouTube clips using valid XHTML markup',
  datetime: datetime('2009-09-14')('14:17:00')(Symbol.for('Pacific/Auckland')),
  tags: [
    'css',
    'html',
    'video'
  ],
  body: body
};
