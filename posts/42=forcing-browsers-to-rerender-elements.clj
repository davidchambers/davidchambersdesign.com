(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "Forcing browsers to rerender elements"

  :datetime (datetime "2010-03-22" "19:40:00" :Pacific/Auckland)

  :tags ["DOM" "IE" "JavaScript"]

  :body [

    (p
       ["Generally speaking browsers rerender elements as required –
         in response to DOM changes effected via JavaScript, for instance.
         There are times, though, when the browser " (em "Internet Explorer,
         I'm looking at you!") " needs a gentle nudge."])

    (p
       [(a "http://ajaxian.com/archives/forcing-a-ui-redraw-from-javascript"
           "Forcing a UI redraw from JavaScript") " highlights the solution
         employed by Thomas Fuchs, creator of the popular JavaScript library "
        (a "http://script.aculo.us/" "script.aculo.us") ":"])

    (code-block
       "Element.addMethods({
            redraw: function (element) {
                element = $(element);
                var n = document.createTextNode(' ');
                element.appendChild(n);
                (function () { n.parentNode.removeChild(n); }).defer();
                return element;
            }
        });")

    (p
       ["The post's first comment includes an alternative approach:"])

    (code-block
       "element.className = element.className;")

    (p
       ["I gather that there are situations in which this simple solution
         fails -- it's no silver bullet -- but it fixed a problem I encountered
         in IE8 earlier this evening so I'm pleased to have discovered it!"])

  ]

})