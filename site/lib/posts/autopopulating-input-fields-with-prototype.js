import {
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
import {
  code$002Dblock,
  update
} from '../components.js';
import datetime from '../datetime.js';
const excerpt = [p([
    'Yesterday I wrote a simple class which auto-populates\n    input fields, and thought it worth sharing. I was originally\n    inspired to write this code by Roger Johansson\'s post titled ',
    a('http://www.456bereastreet.com/archive/200710/autopopulating_text_input_fields_with_javascript/')(['Autopopulating text input fields with JavaScript']),
    '.\n    While I approached the problem from a slightly different angle,\n    I made sure to avoid the pitfalls Roger mentions.'
  ])];
const body = [
  ...excerpt,
  update(datetime('2010-06-09')('23:31:00')('Pacific/Auckland'))([
    'I\'ve written an update to this article for those interested in ',
    a('/autopopulating-input-fields-with-mootools/')(['auto-populating input fields with MooTools']),
    '.'
  ]),
  h3(['Contents']),
  ul([
    li([a('#behaviour')(['Behaviour'])]),
    li([a('#html5-placeholder-text')(['HTML5 placeholder text'])]),
    li([a('#markup')(['Markup'])]),
    li([a('#styling')(['Styling'])]),
    li([a('#placeholder-class')(['Placeholder class'])]),
    li([a('#usage')(['Usage'])])
  ]),
  h3$0027({ id: 'behaviour' })(['Behaviour']),
  ul([
    li(['Placeholder text should be inserted into input field\n      upon page load.']),
    li(['Placeholder text should be targetable via CSS.']),
    li(['Clicking or tabbing into input field should remove\n      placeholder text.']),
    li(['Placeholder text should be reinserted if input field\n      is empty when it loses focus.'])
  ]),
  h3$0027({ id: 'html5-placeholder-text' })(['HTML5 placeholder text']),
  p([
    'HTML5 allows placeholder text to be specified in the markup\n    through the ',
    code(['placeholder']),
    ' attribute. In supporting\n    browsers (currently Chrome and Safari) this produces the\n    behaviour described above with no reliance on JavaScript.'
  ]),
  h3$0027({ id: 'markup' })(['Markup']),
  code$002Dblock('html')(`<input type="search" id="s" name="s" placeholder="search..." />
`),
  h3$0027({ id: 'styling' })(['Styling']),
  code$002Dblock('css')(`input.placeholder { color: #a9a9a9 !important; }
`),
  p([
    'I decided to use ',
    code(['#a9a9a9']),
    ' as Safari uses this colour\n    for placeholder text.'
  ]),
  h3$0027({ id: 'placeholder-class' })(['Placeholder class']),
  code$002Dblock('javascript')(`var Placeholder = Class.create({
    initialize: function (element) {
        this.element = element;
        this.placeholder = element.readAttribute('placeholder');
        this.blur();
        Event.observe(this.element, 'focus', this.focus.bindAsEventListener(this));
        Event.observe(this.element, 'blur', this.blur.bindAsEventListener(this));
    },
    focus: function () {
        if (this.element.hasClassName('placeholder'))
            this.element.clear().removeClassName('placeholder');
    },
    blur: function () {
        if (this.element.value === '')
            this.element.addClassName('placeholder').value = this.placeholder;
    }
});
`),
  p([
    'The Placeholder class requires ',
    a('http://prototypejs.org/')(['Prototype']),
    '.'
  ]),
  h3$0027({ id: 'usage' })(['Usage']),
  p(['To create a new instance of the Placeholder class, simply pass\n    the constructor a Prototype extended element:']),
  code$002Dblock('javascript')(`new Placeholder($('s'));
`),
  p([
    'Ensure that the DOM is ready by wrapping everything in Prototype\'s ',
    code(['dom:loaded']),
    ' event listener. This also avoids polluting the\n    global namespace.'
  ]),
  code$002Dblock('javascript')(`document.observe('dom:loaded', function () {
    var Placeholder = Class.create({
        ...
    });
    $$('input[placeholder]').each(function (input) {
        new Placeholder(input);
    });
});
`),
  update(datetime('2010-03-30')('17:17:00')('Pacific/Auckland'))([p(['I\'ve updated the selector used in the above example. Selecting\n      all inputs with placeholder attributes is far more elegant than\n      listing each input explicitly. It also means that an input added\n      anywhere on the site will automatically receive this special\n      treatment (provided that it has a placeholder attribute).'])]),
  p([strong(['This site\'s search field shows the code in action.'])]),
  update(datetime('2010-04-16')('00:59:00')('Pacific/Auckland'))([
    p([
      'For those that would like placeholder text in ',
      em(['password']),
      '\n      input fields not to appear as dots or asterisks in older browsers,\n      I\'ve written an alternative snippet. I drew inspiration from a post on ',
      a('http://blog.decaf.de/2009/07/iphone-like-password-fields-using-jquery/')(['iPhone-like password fields using jQuery']),
      '.'
    ]),
    code$002Dblock('javascript')(`// provide input hints
document.observe('dom:loaded', function () {
    var PLACEHOLDER_SUFFIX = '_placeholder'; // used for password inputs

    $$('input[placeholder]').each(function (input) {
        var label, placeholder,
            placeholder_text = input.readAttribute('placeholder');

        if (input.readAttribute('type') == 'password') {
            placeholder = input.clone();
            placeholder.type = 'text'; // not "password"
            placeholder.value = placeholder_text;
            placeholder.addClassName('placeholder');

            if (input.id) {
                // update input id and label
                placeholder.id += PLACEHOLDER_SUFFIX;
                label = $$('label[for="' + input.id + '"]')
                label.invoke('writeAttribute', 'for', input.id +
                        PLACEHOLDER_SUFFIX);
            }

            input.writeAttribute({ 'accesskey': '', 'tabindex': '' });
            input.hide().insert({ 'before': placeholder });

            // when placeholder input gains focus,
            // hide it and show "real" password input
            Event.observe(placeholder, 'focus', function () {
                this.hide();
                input.show();
                Form.Element.focus(input);
            });

            // when "real" password input loses focus,
            // if it's empty, hide it and show placeholder input
            Event.observe(input, 'blur', function () {
                if (this.value === '') {
                    this.hide();
                    placeholder.show();
                }
            });
        } else {
            // insert placeholder text
            input.addClassName('placeholder').value = placeholder_text;

            Event.observe(input, 'focus', function () {
                if (this.hasClassName('placeholder')) {
                    this.clear().removeClassName('placeholder');
                }
            });
            Event.observe(input, 'blur', function () {
                if (this.value === '') {
                    this.addClassName('placeholder').value = placeholder_text;
                }
            });
        }
    });
});
`)
  ])
];
export default {
  id: 33,
  slug: 'autopopulating-input-fields-with-prototype',
  title: ['Auto-populating input fields with Prototype'],
  datetime: datetime('2010-01-07')('22:03:00')('Pacific/Auckland'),
  tags: [
    'html5',
    'javascript',
    'prototype',
    'ux'
  ],
  body: body
};
