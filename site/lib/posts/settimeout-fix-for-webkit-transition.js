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
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([
    p([
      'Here\'s a simple animation which utilizes ',
      code('webkitTransition'),
      ':'
    ]),
    _p$0027({
      [Symbol.for('id')]: 'transition-example-1',
      [Symbol.for('style')]: 'position:relative;left:0;top:0;width:200px;line-height:5.25em;background-color:#ccc;text-align:center;'
    })(['Click to animate']),
    script({})('(function () {\n               var element = document.getElementById(\'transition-example-1\');\n               element.style.webkitTransitionProperty = \'left\';\n               element.style.webkitTransitionDuration = \'2s\';\n               element.addEventListener(\'click\', function () {\n                   this.style.left = \'100px\';\n                   this.addEventListener(\'webkitTransitionEnd\', function () {\n                       this.style.left = 0;\n                   });\n               });\n           })();'),
    p(['The code behind this example is not complicated:']),
    _code$002Dblock(Symbol.for('javascript'))('\n          element.style.webkitTransitionProperty = \'left\';\n          element.style.webkitTransitionDuration = \'2s\';\n          element.addEventListener(\'click\', function () {\n              this.style.left = \'100px\';\n              this.addEventListener(\'webkitTransitionEnd\', function () {\n                  this.style.left = 0;\n              });\n          });\n          ')
  ]),
  p(['The following example, though, does not act as one might expect!']),
  _p$0027({
    [Symbol.for('id')]: 'transition-example-2',
    [Symbol.for('style')]: 'position:relative;left:0;top:0;width:200px;line-height:5.25em;background-color:#ccc;text-align:center;'
  })(['Click to reposition']),
  script({})('(function () {\n          var element = document.getElementById(\'transition-example-2\');\n          element.addEventListener(\'click\', function () {\n              this.style.left = \'100px\';\n              this.style.webkitTransitionProperty = \'left\';\n              this.style.webkitTransitionDuration = \'2s\';\n              this.addEventListener(\'webkitTransitionEnd\', function () {\n                  this.innerHTML = "D\'oh!";\n                  this.style.left = 0;\n              });\n          });\n      })();'),
  p(['The code:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     element.style.left = \'100px\';\n     element.style.webkitTransitionProperty = \'left\';\n     element.style.webkitTransitionDuration = \'2s\';\n     '),
  p(['Here are the instructions this code attempts to provide:']),
  ol([
    li([
      'Set the element\'s ',
      code('left'),
      ' value to \'100px\'\n             (the page should immediately be redrawn).'
    ]),
    li([
      'Set ',
      code('webkitTransitionProperty'),
      ' and ',
      code('webkitTransitionDuration'),
      ', to apply a transition to ',
      em('future'),
      ' changes in the value of ',
      code('left'),
      '.'
    ])
  ]),
  p(['What actually happens -- as you\'ll have seen if you\'re viewing\n        this page in a recent version of Safari or Chrome -- is that the\n        transition is applied to the preceding update. This behaviour\n        strikes me as strange, but I have very little understanding of\n        how these transitions are meant to be effected by the browser.']),
  p(['I did manage to get the element to behave as I had intended:']),
  _p$0027({
    [Symbol.for('id')]: 'transition-example-3',
    [Symbol.for('style')]: 'position:relative;left:0;top:0;width:200px;line-height:5.25em;background-color:#ccc;text-align:center;'
  })(['Click to reposition']),
  script({})('(function () {\n          var element = document.getElementById(\'transition-example-3\');\n          element.addEventListener(\'click\', function () {\n              this.style.left = \'100px\';\n              setTimeout(function () {\n                  element.style.webkitTransitionProperty = \'left\';\n                  element.style.webkitTransitionDuration = \'2s\';\n              }, 0);\n              setTimeout(function () {\n                  element.style.webkitTransitionProperty = \'none\';\n                  element.style.left = 0;\n              }, 2000);\n          });\n      })();'),
  p(['The working code:']),
  _code$002Dblock(Symbol.for('javascript'))('\n     element.style.left = \'100px\';\n     setTimeout(function () {\n         element.style.webkitTransitionProperty = \'left\';\n         element.style.webkitTransitionDuration = \'2s\';\n     }, 0);\n     '),
  p([
    'For some reason wrapping the ',
    code('webkitTransition*'),
    '\n        declarations in an anonymous function passed to ',
    code('setTimeout'),
    ' with no delay prevents the transition\n        from being applied retroactively. I wondered whether closure\n        would be sufficient, but no, ',
    code('setTimeout'),
    ' seems\n        to be the remedy for this "quirk".'
  ]),
  p(['I\'d love to know whether the behaviour described here\n        is correct behaviour. If I manage to find the answer to\n        this I\'ll post an update. If you are able to enlighten me,\n        please do so by leaving a comment!']),
  update(datetime('2010-06-02')('00:15:00')(Symbol.for('Pacific/Auckland')))([
    p([
      'I\'ve just been watching one of the ',
      a('http://developer.apple.com/videos/wwdc/2010/')('WWDC 2010 session videos'),
      ', and it turns out the fix\n             I stumbled upon is actually the "correct" solution.'
    ]),
    p([
      'From ',
      i('Session 504 \u2013 CSS Effects,\n             Part 2: Galleries and 3D Effects'),
      ':'
    ]),
    h3('Aside: How Browsers Apply CSS Styles'),
    ul([
      li('Browsers optimize away redundant style changes'),
      li('This matters with transitions, because they are temporal')
    ]),
    _code$002Dblock(Symbol.for('javascript'))('\n          var box = document.getElementById(\'box\');\n          box.style.backgroundColor = \'red\';\n          box.style.webkitTransition = \'background-color 2s\';\n          window.setTimeout(function() {\n            box.style.backgroundColor = \'blue\';\n          }, 0);\n          ')
  ])
];
export default {
  [Symbol.for('id')]: 55,
  [Symbol.for('slug')]: 'settimeout-fix-for-webkit-transition',
  [Symbol.for('title')]: 'setTimeout fix for -webkit-transition',
  [Symbol.for('datetime')]: datetime('2010-06-18')('03:12:00')(Symbol.for('Pacific/Auckland')),
  [Symbol.for('tags')]: [
    'css3',
    'javascript'
  ],
  [Symbol.for('body')]: body
};
