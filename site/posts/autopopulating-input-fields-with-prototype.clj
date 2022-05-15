(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  update              (require "../components/update")
  datetime            (require "../datetime")
] {

  :id 33

  :slug "autopopulating-input-fields-with-prototype"

  :title "Auto-populating input fields with Prototype"

  :datetime (datetime "2010-01-07" "22:03:00" :Pacific/Auckland)

  :tags [:html5 :javascript :prototype :ux]

  :body [

    (excerpt

       [(p
           ["Yesterday I wrote a simple class which auto-populates
             input fields, and thought it worth sharing. I was originally
             inspired to write this code by Roger Johansson's post titled "
            (a "http://www.456bereastreet.com/archive/200710/autopopulating_text_input_fields_with_javascript/"
               "Autopopulating text input fields with JavaScript") ".
             While I approached the problem from a slightly different angle,
             I made sure to avoid the pitfalls Roger mentions."])])

    (update (datetime "2010-06-09" "23:31:00" :Pacific/Auckland)

       ["I've written an update to this article for those interested in "
        (a "/autopopulating-input-fields-with-mootools/"
           "auto-populating input fields with MooTools") "."])

    (h3 "Contents")

    (ul
       [(li (a "#behaviour" "Behaviour"))
        (li (a "#html5-placeholder-text" "HTML5 placeholder text"))
        (li (a "#markup" "Markup"))
        (li (a "#styling" "Styling"))
        (li (a "#placeholder-class" "Placeholder class"))
        (li (a "#usage" "Usage"))])

    (h3' {:id "behaviour"} "Behaviour")

    (ul
       [(li
           ["Placeholder text should be inserted into input field
             upon page load."])
        (li
           ["Placeholder text should be targetable via CSS."])
        (li
           ["Clicking or tabbing into input field should remove
             placeholder text."])
        (li
           ["Placeholder text should be reinserted if input field
             is empty when it loses focus."])])

    (h3' {:id "html5-placeholder-text"} "HTML5 placeholder text")

    (p
       ["HTML5 allows placeholder text to be specified in the markup
         through the " (code "placeholder") " attribute. In supporting
         browsers (currently Chrome and Safari) this produces the
         behaviour described above with no reliance on JavaScript."])

    (h3' {:id "markup"} "Markup")

    (code-block :html

       "
       <input type=\"search\" id=\"s\" name=\"s\" placeholder=\"search...\" />
       ")

    (h3' {:id "styling"} "Styling")

    (code-block :css

       "
       input.placeholder { color: #a9a9a9 !important; }
       ")

    (p
       ["I decided to use " (code "#a9a9a9") " as Safari uses this colour
         for placeholder text."])

    (h3' {:id "placeholder-class"} "Placeholder class")

    (code-block :javascript

       "
       var Placeholder = Class.create({
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
       ")

    (p
       ["The Placeholder class requires "
        (a "http://prototypejs.org/" "Prototype") "."])

    (h3' {:id "usage"} "Usage")

    (p
       ["To create a new instance of the Placeholder class, simply pass
         the constructor a Prototype extended element:"])

    (code-block :javascript

       "
       new Placeholder($('s'));
       ")

    (p
       ["Ensure that the DOM is ready by wrapping everything in Prototype's "
        (code "dom:loaded") " event listener. This also avoids polluting the
         global namespace."])

    (code-block :javascript

       "
       document.observe('dom:loaded', function () {
           var Placeholder = Class.create({
               ...
           });
           $$('input[placeholder]').each(function (input) {
               new Placeholder(input);
           });
       });
       ")

    (update (datetime "2010-03-30" "17:17:00" :Pacific/Auckland)

       [(p
           ["I've updated the selector used in the above example. Selecting
             all inputs with placeholder attributes is far more elegant than
             listing each input explicitly. It also means that an input added
             anywhere on the site will automatically receive this special
             treatment (provided that it has a placeholder attribute)."])])

    (p
       [(strong "This site's search field shows the code in action.")])

    (update (datetime "2010-04-16" "00:59:00" :Pacific/Auckland)

       [(p
           ["For those that would like placeholder text in " (em "password") "
             input fields not to appear as dots or asterisks in older browsers,
             I've written an alternative snippet. I drew inspiration from a post on "
            (a "http://blog.decaf.de/2009/07/iphone-like-password-fields-using-jquery/"
               "iPhone-like password fields using jQuery") "."])

        (code-block :javascript

           "
           // provide input hints
           document.observe('dom:loaded', function () {
               var PLACEHOLDER_SUFFIX = '_placeholder'; // used for password inputs

               $$('input[placeholder]').each(function (input) {
                   var label, placeholder,
                       placeholder_text = input.readAttribute('placeholder');

                   if (input.readAttribute('type') == 'password') {
                       placeholder = input.clone();
                       placeholder.type = 'text'; // not \"password\"
                       placeholder.value = placeholder_text;
                       placeholder.addClassName('placeholder');

                       if (input.id) {
                           // update input id and label
                           placeholder.id += PLACEHOLDER_SUFFIX;
                           label = $$('label[for=\"' + input.id + '\"]')
                           label.invoke('writeAttribute', 'for', input.id +
                                   PLACEHOLDER_SUFFIX);
                       }

                       input.writeAttribute({ 'accesskey': '', 'tabindex': '' });
                       input.hide().insert({ 'before': placeholder });

                       // when placeholder input gains focus,
                       // hide it and show \"real\" password input
                       Event.observe(placeholder, 'focus', function () {
                           this.hide();
                           input.show();
                           Form.Element.focus(input);
                       });

                       // when \"real\" password input loses focus,
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
           ")])

  ]

}))