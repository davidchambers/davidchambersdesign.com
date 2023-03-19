import {
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
import { code$002Dblock } from '../components.js';
import datetime from '../datetime.js';
const excerpt = [
  p(['WordPress is a great piece of software, although I\'ve never been\n    satisfied with its search functionality. Last night I decided to\n    switch to a very simple solution:']),
  code$002Dblock(Symbol.for('html'))(`<form action="http://www.google.com/search" method="get">
    <div>
        <label for="q">Search davidchambersdesign.com</label>
        <input type="search" name="q" id="q" maxlength="256" placeholder="search..." />
        <input type="hidden" name="ie" value="UTF-8" />
        <input type="hidden" name="hl" value="en" />
        <input type="hidden" name="as_sitesearch" value="davidchambersdesign.com" />
        <input type="submit" value="Search" />
    </div>
</form>
`)
];
const body = [
  ...excerpt,
  p(['Search queries on this site are now submitted to Google with the\n    specification that only results from this domain are to be returned.\n    Here\'s a breakdown of the various query parameters I included:']),
  dl([
    dt$0027({ class: 'textual' })('q'),
    dd('Search query as entered by the user.'),
    dt('ie'),
    dd('Sets the character encoding that is used to interpret the query string.'),
    dt('hl'),
    dd('Specifies the interface language (host language) of your user interface.'),
    dt('as_sitesearch'),
    dd('Limits search results to documents in the specified domain.')
  ]),
  p([
    'If you decide to implement this yourself you may find the documentation on ',
    a('http://www.google.com/cse/docs/resultsxml.html#wsRequestParameters')('Google custom search request parameters'),
    ' useful.'
  ])
];
export default {
  id: 45,
  slug: 'using-google-for-site-search',
  title: 'Using Google for site search',
  datetime: datetime('2010-03-25')('22:06:00')(Symbol.for('Pacific/Auckland')),
  tags: [
    'google',
    'search'
  ],
  body: body
};
