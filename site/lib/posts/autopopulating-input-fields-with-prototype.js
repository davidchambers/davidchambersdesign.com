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
  update
} from '../components.js';
import datetime from '../datetime.js';
const body = [
  excerpt([p([
      'Yesterday I wrote a simple class which auto-populates\n           input fields, and thought it worth sharing. I was originally\n           inspired to write this code by Roger Johansson\'s post titled ',
      a('http://www.456bereastreet.com/archive/200710/autopopulating_text_input_fields_with_javascript/')('Autopopulating text input fields with JavaScript'),
      '.\n           While I approached the problem from a slightly different angle,\n           I made sure to avoid the pitfalls Roger mentions.'
    ])]),
  update(datetime('2010-06-09')('23:31:00')(Symbol.for('Pacific/Auckland')))([
    'I\'ve written an update to this article for those interested in ',
    a('/autopopulating-input-fields-with-mootools/')('auto-populating input fields with MooTools'),
    '.'
  ]),
  h3('Contents'),
  ul([
    li(a('#behaviour')('Behaviour')),
    li(a('#html5-placeholder-text')('HTML5 placeholder text')),
    li(a('#markup')('Markup')),
    li(a('#styling')('Styling')),
    li(a('#placeholder-class')('Placeholder class')),
    li(a('#usage')('Usage'))
  ]),
  h3$0027({ [Symbol.for('id')]: 'behaviour' })('Behaviour'),
  ul([
    li(['Placeholder text should be inserted into input field\n           upon page load.']),
    li(['Placeholder text should be targetable via CSS.']),
    li(['Clicking or tabbing into input field should remove\n           placeholder text.']),
    li(['Placeholder text should be reinserted if input field\n           is empty when it loses focus.'])
  ]),
  h3$0027({ [Symbol.for('id')]: 'html5-placeholder-text' })('HTML5 placeholder text'),
  p([
    'HTML5 allows placeholder text to be specified in the markup\n       through the ',
    code('placeholder'),
    ' attribute. In supporting\n       browsers (currently Chrome and Safari) this produces the\n       behaviour described above with no reliance on JavaScript.'
  ]),
  h3$0027({ [Symbol.for('id')]: 'markup' })('Markup'),
  code$002Dblock(Symbol.for('html'))('\n     <input type="search" id="s" name="s" placeholder="search..." />\n     '),
  h3$0027({ [Symbol.for('id')]: 'styling' })('Styling'),
  code$002Dblock(Symbol.for('css'))('\n     input.placeholder { color: #a9a9a9 !important; }\n     '),
  p([
    'I decided to use ',
    code('#a9a9a9'),
    ' as Safari uses this colour\n       for placeholder text.'
  ]),
  h3$0027({ [Symbol.for('id')]: 'placeholder-class' })('Placeholder class'),
  code$002Dblock(Symbol.for('javascript'))('\n     var Placeholder = Class.create({\n         initialize: function (element) {\n             this.element = element;\n             this.placeholder = element.readAttribute(\'placeholder\');\n             this.blur();\n             Event.observe(this.element, \'focus\', this.focus.bindAsEventListener(this));\n             Event.observe(this.element, \'blur\', this.blur.bindAsEventListener(this));\n         },\n         focus: function () {\n             if (this.element.hasClassName(\'placeholder\'))\n                 this.element.clear().removeClassName(\'placeholder\');\n         },\n         blur: function () {\n             if (this.element.value === \'\')\n                 this.element.addClassName(\'placeholder\').value = this.placeholder;\n         }\n     });\n     '),
  p([
    'The Placeholder class requires ',
    a('http://prototypejs.org/')('Prototype'),
    '.'
  ]),
  h3$0027({ [Symbol.for('id')]: 'usage' })('Usage'),
  p(['To create a new instance of the Placeholder class, simply pass\n       the constructor a Prototype extended element:']),
  code$002Dblock(Symbol.for('javascript'))('\n     new Placeholder($(\'s\'));\n     '),
  p([
    'Ensure that the DOM is ready by wrapping everything in Prototype\'s ',
    code('dom:loaded'),
    ' event listener. This also avoids polluting the\n       global namespace.'
  ]),
  code$002Dblock(Symbol.for('javascript'))('\n     document.observe(\'dom:loaded\', function () {\n         var Placeholder = Class.create({\n             ...\n         });\n         $$(\'input[placeholder]\').each(function (input) {\n             new Placeholder(input);\n         });\n     });\n     '),
  update(datetime('2010-03-30')('17:17:00')(Symbol.for('Pacific/Auckland')))([p(['I\'ve updated the selector used in the above example. Selecting\n           all inputs with placeholder attributes is far more elegant than\n           listing each input explicitly. It also means that an input added\n           anywhere on the site will automatically receive this special\n           treatment (provided that it has a placeholder attribute).'])]),
  p([strong('This site\'s search field shows the code in action.')]),
  update(datetime('2010-04-16')('00:59:00')(Symbol.for('Pacific/Auckland')))([
    p([
      'For those that would like placeholder text in ',
      em('password'),
      '\n           input fields not to appear as dots or asterisks in older browsers,\n           I\'ve written an alternative snippet. I drew inspiration from a post on ',
      a('http://blog.decaf.de/2009/07/iphone-like-password-fields-using-jquery/')('iPhone-like password fields using jQuery'),
      '.'
    ]),
    code$002Dblock(Symbol.for('javascript'))('\n         // provide input hints\n         document.observe(\'dom:loaded\', function () {\n             var PLACEHOLDER_SUFFIX = \'_placeholder\'; // used for password inputs\n\n             $$(\'input[placeholder]\').each(function (input) {\n                 var label, placeholder,\n                     placeholder_text = input.readAttribute(\'placeholder\');\n\n                 if (input.readAttribute(\'type\') == \'password\') {\n                     placeholder = input.clone();\n                     placeholder.type = \'text\'; // not "password"\n                     placeholder.value = placeholder_text;\n                     placeholder.addClassName(\'placeholder\');\n\n                     if (input.id) {\n                         // update input id and label\n                         placeholder.id += PLACEHOLDER_SUFFIX;\n                         label = $$(\'label[for="\' + input.id + \'"]\')\n                         label.invoke(\'writeAttribute\', \'for\', input.id +\n                                 PLACEHOLDER_SUFFIX);\n                     }\n\n                     input.writeAttribute({ \'accesskey\': \'\', \'tabindex\': \'\' });\n                     input.hide().insert({ \'before\': placeholder });\n\n                     // when placeholder input gains focus,\n                     // hide it and show "real" password input\n                     Event.observe(placeholder, \'focus\', function () {\n                         this.hide();\n                         input.show();\n                         Form.Element.focus(input);\n                     });\n\n                     // when "real" password input loses focus,\n                     // if it\'s empty, hide it and show placeholder input\n                     Event.observe(input, \'blur\', function () {\n                         if (this.value === \'\') {\n                             this.hide();\n                             placeholder.show();\n                         }\n                     });\n                 } else {\n                     // insert placeholder text\n                     input.addClassName(\'placeholder\').value = placeholder_text;\n\n                     Event.observe(input, \'focus\', function () {\n                         if (this.hasClassName(\'placeholder\')) {\n                             this.clear().removeClassName(\'placeholder\');\n                         }\n                     });\n                     Event.observe(input, \'blur\', function () {\n                         if (this.value === \'\') {\n                             this.addClassName(\'placeholder\').value = placeholder_text;\n                         }\n                     });\n                 }\n             });\n         });\n         ')
  ])
];
export default {
  ['id']: 33,
  ['slug']: 'autopopulating-input-fields-with-prototype',
  ['title']: 'Auto-populating input fields with Prototype',
  ['datetime']: datetime('2010-01-07')('22:03:00')(Symbol.for('Pacific/Auckland')),
  ['tags']: [
    'html5',
    'javascript',
    'prototype',
    'ux'
  ],
  ['body']: body
};
