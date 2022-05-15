(import ["../elements"]

(let [
  code-block          (require "../components/code-block")
  datetime            (require "../datetime")
] {

  :id 88

  :slug "escaping-html-in-javascript"

  :title "Escaping HTML in JavaScript"

  :datetime (datetime "2011-05-30" "15:00:00" :America/Los_Angeles)

  :tags [:best-practice :javascript :security]

  :body [

    (p
       ["I recently came across an interesting article at "
        (a "http://wonko.com/" "wonko.com") " on "
        (a "http://wonko.com/post/html-escaping" "HTML escaping") ",
         which provoked me to rewrite Bitbucket's escape function
         (invoked from within Underscore templates):"])

    (code-block :javascript

       "
       function makeSafe(text) {
         return text.replace(/[&<>\"'`]/g, function (chr) {
           return '&#' + chr.charCodeAt(0) + ';';
         });
       };
       ")

    (p
       ["This ensures that inserted content cannot escape the confines of a
         quoted attribute value. Unquoted attributes are more problematic:"])

    (blockquote

       [(p
           ["Unquoted attribute values are one of the single biggest XSS
             vectors there is. If you don’t quote your attribute values,
             you’re essentially leaving the door wide open for naughty
             people to inject naughty things into your HTML. Very few
             escaper implementations cover all the edge cases necessary to
             prevent unquoted attribute values from becoming XSS vectors."])])

    (p
       ["To accommodate unquoted attribute values, the following function
         could be used instead:"])

    (code-block :javascript

       "
       function makeSafe(text) {
         return text.replace(/\\W/g, function (chr) {
           return '&#' + chr.charCodeAt(0) + ';';
         });
       };
       ")

    (p
       ["I created a "
        (a "http://jsperf.com/html-escaping-perf" "jsPerf test case") "
         which confirms that there's a performance hit associated with using
         this more liberal regular expression. Keep in mind, though, that if
         “A” takes 1ms to execute and “B” takes ten times as long, “B” still
         only takes 10ms. Quite often a significant " (em "comparative") "
         speed difference is insignificant in absolute terms; I'd argue that
         this is the case here."])

  ]

}))