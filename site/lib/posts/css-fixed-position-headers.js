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
  _code$002Dblock,
  _pros$002Dand$002Dcons$002Dlist
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p(['I began this post three months ago, got stuck, and put it in\n             the too hard basket. I wanted to devise a workable solution\n             to my stumbling block before publishing this information.\n             I\'m getting ahead of myself, though. First, the background.']),
    p([
      'As I began writing this post, I had just completed a redesign\n             of this site. The new design removed unnecessary distractions\n             to allow readers to focus on the clearly presented content.\n             I moved site navigation from the sidebar (which I axed\n             altogether) to the header. I decided to fix the header in\n             place so that the navigation and search form would always be\n             visible. This required very little effort, but overcoming the ',
      a('http://css-tricks.com/forums/viewtopic.php?t=3496')('problem posed by fixed-position headers'),
      ' took a great\n             deal of trial and error. To save others from going through\n             this tortuous process I\'ll describe my various approaches,\n             and list the benefits and drawbacks of each.'
    ])
  ]),
  h3('Requirements'),
  ul([
    li(['An additional vertical scrollbar must not be introduced.']),
    li([
      'Appending ',
      strong('#example'),
      ' to a URL should result in\n             the element whose id is "example" being displayed at the\n             top of the content area (not hidden behind the header).'
    ]),
    li(['Additional markup may be used only if the requirements above\n             cannot be met without extra markup.'])
  ]),
  p(['The CSS for the header initially looked like this:']),
  _code$002Dblock(Symbol.for('css'))('\n     #header\n     {\n         position: fixed;\n         top: 0;\n         left: 0;\n         height: 160px;\n     }\n     '),
  h3('Approach 1: positive top padding + negative bottom margins'),
  p(['Here\'s the CSS:']),
  _code$002Dblock(Symbol.for('css'))('\n     h1, h2, h3, h4, h5, h6, p\n     {\n         padding-top: 160px;\n         margin-bottom: -160px;\n     }\n     '),
  p(['This approach adds top padding (equal to the height of the header)\n        to each of the block-level elements in the content area. This ensures\n        that elements are in the correct position when jumped to using #id.\n        An equal and opposite bottom margin is also applied to prevent the\n        padding from adding unwanted white space between elements.']),
  _pros$002Dand$002Dcons$002Dlist(pro => con => [
    pro(['No additional markup is required.']),
    pro(['Straightforward CSS.']),
    con(['The CSS selector needs to contain all block-level elements\n                  that may have ids in some instances. This is likely to include\n                  elements such as divs and forms. Since it is hard to foresee\n                  all the situations in which a link may direct a user to a\n                  uniquely identified element, it is difficult to ensure that\n                  this approach will work in all cases.']),
    con([strong('The negative bottom margin causes each block-level\n                  element to overlap the preceding element, making "overlapped"\n                  links unclickable!')])
  ]),
  h3('Approach 2: preceding divs'),
  p(['Again, the CSS:']),
  _code$002Dblock(Symbol.for('css'))('\n     div.id\n     {\n         position: relative;\n         top: -160px;\n     }\n     '),
  p(['This approach introduces meaningless markup. Where previously we may\n        have had something like this:']),
  _code$002Dblock(Symbol.for('html'))('\n     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat risus nec mollis. Integer dapibus dictum ultrices. Aenean vel lectus odio. Nam a mi ligula. Nam in dolor quis metus pretium imperdiet sit amet sed elit.</p>\n     <h3 id="example">Example</h3>\n     <p>Suspendisse potenti. Proin convallis lacinia nibh, nec auctor ligula mattis consectetur. Mauris vel elit sit amet nibh volutpat varius id vel sem. Pellentesque id purus ligula. Vivamus vel nulla vel justo tempor ultricies.</p>\n     '),
  p(['We now have the following:']),
  _code$002Dblock(Symbol.for('html'))('\n     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat risus nec mollis. Integer dapibus dictum ultrices. Aenean vel lectus odio. Nam a mi ligula. Nam in dolor quis metus pretium imperdiet sit amet sed elit.</p>\n     <div id="example" class="id"></div>\n     <h3>Example</h3>\n     <p>Suspendisse potenti. Proin convallis lacinia nibh, nec auctor ligula mattis consectetur. Mauris vel elit sit amet nibh volutpat varius id vel sem. Pellentesque id purus ligula. Vivamus vel nulla vel justo tempor ultricies.</p>\n     '),
  p(['With this approach, each uniquely identified block-level\n        element within the content area gives its id to a div which\n        appears immediately before it in the HTML. Each of these divs\n        is offset by the height of the header, ensuring that the\n        element of interest is not obscured by the header.']),
  _pros$002Dand$002Dcons$002Dlist(pro => con => [
    pro(['Straightforward CSS.']),
    pro(['Links are always clickable!']),
    con(['Additional markup is required, necessitating that\n                  existing content be updated (or JavaScript used to\n                  insert the additional elements dynamically).']),
    con([
      'Not only is this extra markup meaningless,\n                  but it actually removes ids from the elements\n                  to which they were additionally assigned. Any\n                  existing CSS selectors that refer to one of these\n                  elements will need to be updated. (For example, ',
      code('h3#comments'),
      ' would need to change to ',
      code('div#comments + h3'),
      '.'
    ])
  ]),
  p([
    'This approach does not have any fatal flaws, but it may require\n        template files, static HTML files, style sheets, and database\n        records to be updated. Additionally, it is inelegant. In other\n        words, it ',
    em('is'),
    ' as option, but not a good one.'
  ]),
  h3('Approach 3: JavaScript trickery'),
  p(['The previous approach got the job done, but introduced meaningless\n        elements. This task is best performed with JavaScript.']),
  _code$002Dblock(Symbol.for('javascript'))('\n     // accommodate fixed-position header\n     document.observe(\'dom:loaded\', function () {\n         $$(\'h2[id]\', \'h3[id]\', \'h4[id]\', \'h5[id]\', \'h6[id]\').each(function (e) {\n             var div = new Element(\'div\', { id: e.id });\n             e.writeAttribute({ id: null });\n             e.addClassName(\'unidentified\');\n             e.insert({ \'top\': div });\n         })\n     });\n     '),
  p(['The above snippet locates all the h2, h3, h4, h5, and h6 elements\n        on the page that have an id attribute. It then loops through this\n        collection of elements and inserts an empty div element into each\n        one. This div "steals" its parent\'s id.']),
  p(['CSS can be used to position these empty divs in such a way that\n        headings are visible when jumped to:']),
  _code$002Dblock(Symbol.for('css'))('\n     h2.unidentified div, h3.unidentified div\n     {\n         float: left;\n         margin: -160px 0 0 0;\n     }\n     '),
  _pros$002Dand$002Dcons$002Dlist(pro => con => [
    pro(['No additional markup is required.']),
    pro(['Straightforward CSS.']),
    pro(['Links are always clickable.']),
    con([
      'JavaScript (and in this case ',
      a('http://prototypejs.org/')('Prototype'),
      ') required.'
    ]),
    con(['Association between an id and the element it identifies\n                  is broken.'])
  ]),
  h3('Summary'),
  p(['I have implemented the JavaScript approach, and it works nicely.\n        I am still hopeful that there exists a simpler and/or more universal\n        solution to the problem posed by fixed-position headers. Please let\n        me know if you have any ideas or suggestions.'])
];
export default {
  [Symbol.for('id')]: 30,
  [Symbol.for('slug')]: 'css-fixed-position-headers',
  [Symbol.for('title')]: 'CSS fixed-position headers',
  [Symbol.for('datetime')]: datetime('2009-10-30')('18:25:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'css',
    'html',
    'javascript',
    'prototype'
  ],
  [Symbol.for('body')]: body
};
