(import ["../elements"]

(let [
  luxon               (require "../luxon")
  code-block          (require "../components/code-block")
] {

  :id 52

  :slug "autopopulating-input-fields-with-mootools"

  :title "Auto-populating input fields with MooTools"

  :datetime (luxon/datetime "2010-06-09" "23:23:00" :Pacific/Auckland)

  :tags [:html5 :javascript :mootools :ux]

  :body [

    (p
       ["Early this year I wrote a post titled "
        (a "/autopopulating-input-fields-with-prototype/"
           "Auto-populating input fields with Prototype") ".
         Looking at the code now, I realize that it's not very pretty.
         I'm rewriting this site's JavaScript in MooTools, and the new
         code is quite a bit more elegant."])

    (code-block :javascript

       "
       // provide input hints
       window.addEvent('domready', function () {
           $$('input[placeholder]').addEvents({
               focus: function () {
                   if (this.hasClass('placeholder')) {
                       this.removeClass('placeholder').set('value', '');
                   }
               },
               blur: function () {
                   if (this.get('value') === '') {
                       this.addClass('placeholder').set('value', this.get('placeholder'));
                   }
               }
           }).fireEvent('blur');
       });
       ")

    (p
       ["I really appreciate the fact that MooTools provides "
        (code "addEvents") " in addition to " (code "addEvent") ".
         As a result, the code above is clearer than a well-written
         Prototype equivalent."])

  ]

}))
