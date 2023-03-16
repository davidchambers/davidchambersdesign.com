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
  pros$002Dand$002Dcons$002Dlist
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p(['I began this post three months ago, got stuck, and put it in\n      the too hard basket. I wanted to devise a workable solution\n      to my stumbling block before publishing this information.\n      I\'m getting ahead of myself, though. First, the background.']),
    p([
      'As I began writing this post, I had just completed a redesign\n      of this site. The new design removed unnecessary distractions\n      to allow readers to focus on the clearly presented content.\n      I moved site navigation from the sidebar (which I axed\n      altogether) to the header. I decided to fix the header in\n      place so that the navigation and search form would always be\n      visible. This required very little effort, but overcoming the ',
      a('http://css-tricks.com/forums/viewtopic.php?t=3496')('problem posed by fixed-position headers'),
      ' took a great\n      deal of trial and error. To save others from going through\n      this tortuous process I\'ll describe my various approaches,\n      and list the benefits and drawbacks of each.'
    ])
  ]),
  h3('Requirements'),
  ul([
    li(['An additional vertical scrollbar must not be introduced.']),
    li([
      'Appending ',
      strong('#example'),
      ' to a URL should result in\n      the element whose id is "example" being displayed at the\n      top of the content area (not hidden behind the header).'
    ]),
    li(['Additional markup may be used only if the requirements above\n      cannot be met without extra markup.'])
  ]),
  p(['The CSS for the header initially looked like this:']),
  code$002Dblock(Symbol.for('css'))(`#header
{
    position: fixed;
    top: 0;
    left: 0;
    height: 160px;
}
`),
  h3('Approach 1: positive top padding + negative bottom margins'),
  p(['Here\'s the CSS:']),
  code$002Dblock(Symbol.for('css'))(`h1, h2, h3, h4, h5, h6, p
{
    padding-top: 160px;
    margin-bottom: -160px;
}
`),
  p(['This approach adds top padding (equal to the height of the header)\n    to each of the block-level elements in the content area. This ensures\n    that elements are in the correct position when jumped to using #id.\n    An equal and opposite bottom margin is also applied to prevent the\n    padding from adding unwanted white space between elements.']),
  pros$002Dand$002Dcons$002Dlist(pro => con => [
    pro(['No additional markup is required.']),
    pro(['Straightforward CSS.']),
    con(['The CSS selector needs to contain all block-level elements\n      that may have ids in some instances. This is likely to include\n      elements such as divs and forms. Since it is hard to foresee\n      all the situations in which a link may direct a user to a\n      uniquely identified element, it is difficult to ensure that\n      this approach will work in all cases.']),
    con([strong('The negative bottom margin causes each block-level\n      element to overlap the preceding element, making "overlapped"\n      links unclickable!')])
  ]),
  h3('Approach 2: preceding divs'),
  p(['Again, the CSS:']),
  code$002Dblock(Symbol.for('css'))(`div.id
{
    position: relative;
    top: -160px;
}
`),
  p(['This approach introduces meaningless markup. Where previously we may\n    have had something like this:']),
  code$002Dblock(Symbol.for('html'))(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat risus nec mollis. Integer dapibus dictum ultrices. Aenean vel lectus odio. Nam a mi ligula. Nam in dolor quis metus pretium imperdiet sit amet sed elit.</p>
<h3 id="example">Example</h3>
<p>Suspendisse potenti. Proin convallis lacinia nibh, nec auctor ligula mattis consectetur. Mauris vel elit sit amet nibh volutpat varius id vel sem. Pellentesque id purus ligula. Vivamus vel nulla vel justo tempor ultricies.</p>
`),
  p(['We now have the following:']),
  code$002Dblock(Symbol.for('html'))(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus volutpat risus nec mollis. Integer dapibus dictum ultrices. Aenean vel lectus odio. Nam a mi ligula. Nam in dolor quis metus pretium imperdiet sit amet sed elit.</p>
<div id="example" class="id"></div>
<h3>Example</h3>
<p>Suspendisse potenti. Proin convallis lacinia nibh, nec auctor ligula mattis consectetur. Mauris vel elit sit amet nibh volutpat varius id vel sem. Pellentesque id purus ligula. Vivamus vel nulla vel justo tempor ultricies.</p>
`),
  p(['With this approach, each uniquely identified block-level\n    element within the content area gives its id to a div which\n    appears immediately before it in the HTML. Each of these divs\n    is offset by the height of the header, ensuring that the\n    element of interest is not obscured by the header.']),
  pros$002Dand$002Dcons$002Dlist(pro => con => [
    pro(['Straightforward CSS.']),
    pro(['Links are always clickable!']),
    con(['Additional markup is required, necessitating that\n      existing content be updated (or JavaScript used to\n      insert the additional elements dynamically).']),
    con([
      'Not only is this extra markup meaningless,\n      but it actually removes ids from the elements\n      to which they were additionally assigned. Any\n      existing CSS selectors that refer to one of these\n      elements will need to be updated. (For example, ',
      code('h3#comments'),
      ' would need to change to ',
      code('div#comments + h3'),
      '.'
    ])
  ]),
  p([
    'This approach does not have any fatal flaws, but it may require\n    template files, static HTML files, style sheets, and database\n    records to be updated. Additionally, it is inelegant. In other\n    words, it ',
    em('is'),
    ' as option, but not a good one.'
  ]),
  h3('Approach 3: JavaScript trickery'),
  p(['The previous approach got the job done, but introduced meaningless\n    elements. This task is best performed with JavaScript.']),
  code$002Dblock(Symbol.for('javascript'))(`// accommodate fixed-position header
document.observe('dom:loaded', function () {
    $$('h2[id]', 'h3[id]', 'h4[id]', 'h5[id]', 'h6[id]').each(function (e) {
        var div = new Element('div', { id: e.id });
        e.writeAttribute({ id: null });
        e.addClassName('unidentified');
        e.insert({ 'top': div });
    })
});
`),
  p(['The above snippet locates all the h2, h3, h4, h5, and h6 elements\n    on the page that have an id attribute. It then loops through this\n    collection of elements and inserts an empty div element into each\n    one. This div "steals" its parent\'s id.']),
  p(['CSS can be used to position these empty divs in such a way that\n    headings are visible when jumped to:']),
  code$002Dblock(Symbol.for('css'))(`h2.unidentified div, h3.unidentified div
{
    float: left;
    margin: -160px 0 0 0;
}
`),
  pros$002Dand$002Dcons$002Dlist(pro => con => [
    pro(['No additional markup is required.']),
    pro(['Straightforward CSS.']),
    pro(['Links are always clickable.']),
    con([
      'JavaScript (and in this case ',
      a('http://prototypejs.org/')('Prototype'),
      ') required.'
    ]),
    con(['Association between an id and the element it identifies\n      is broken.'])
  ]),
  h3('Summary'),
  p(['I have implemented the JavaScript approach, and it works nicely.\n    I am still hopeful that there exists a simpler and/or more universal\n    solution to the problem posed by fixed-position headers. Please let\n    me know if you have any ideas or suggestions.'])
];
export default {
  ['id']: 30,
  ['slug']: 'css-fixed-position-headers',
  ['title']: 'CSS fixed-position headers',
  ['datetime']: datetime('2009-10-30')('18:25:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'css',
    'html',
    'javascript',
    'prototype'
  ],
  ['body']: body
};
