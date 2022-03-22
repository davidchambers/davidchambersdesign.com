(import* [:base "../elements" "../components"] {

  :id 73

  :title "Ridding markup of textual decoration"

  :datetime (datetime "2010-11-15" "01:00:00" :Australia/Sydney)

  :tags [:css :html :meaningful-markup]

  :body [

    (excerpt

       [(p
           ["On the Web it's not uncommon to see characters with
             no inherent meaning used for stylistic reasons. A good
             example is the " (a "#" "Read more »") " link. Perhaps the
             directionality of the \"»\" is suggestive of travelling to
             another page, or perhaps the letterform is included solely
             for its aesthetic appeal. Whatever the case, one thing is
             certain: links do not require right-pointing double angle
             quotation marks in order to function."])

        (p
           [(strong "The inclusion of such a character is therefore
             a design decision.") " It is decoration, not content.
             It belongs in a style sheet, not in a page's markup."])])

    (h2 "Adding decorative textual content via CSS")

    (let [url "http://reference.sitepoint.com"
          sitepoint (lambda [path text] (a (+ path url) (code text)))]
       (p
          ["The " (sitepoint "/css/content" "content") " property
            is extremely powerful. It's used in conjunction with
            the " (sitepoint "/css/pseudoelement-before" ":before") "
            and " (sitepoint "/css/pseudoelement-after" ":after") "
            pseudo-elements."]))

    (code-block :plain-text

       "
       <a class=\"more\" href=\"/meaningful-markup/\">Read more</a>

       .more:after {
           content: \" »\";
       }
       ")

    (p
       ["There are many other situations in which " (code ":before") "/"
        (code ":after") " and " (code "content") " can team up to great
         effect. Often sites have footer links separated by \"pipes\".
         These pipes commonly appear in the site's markup. "
        (strong "This is wrong!") " Last week I was horrified to
         discover that " (a "http://bitbucket.org/" "Bitbucket") "
         is guilty of this. I've since rectified the situation
         (although the change is yet to go live)."])

    (code-block :css

       "
       .footer-nav li {
           display: inline;
           list-type: none;
       }
       .footer-nav li+li:before {
           content: \" | \";
       }
       ")

    (p
       ["The second selector above may look strange unless you're
         familiar with this approach. By using " (code "li+li") " we
         target every " (code "li") " inside " (code ".footer-nav") " "
        (em "except the first") "."])

    (p
       ["Another case in which there's a temptation to mark up content in
         a certain way in order to achieve a certain visual appearance is
         the comma-separated list."])

    (code-block :html

       "
       <p><strong>Tags:</strong> Apple, iOS, iPad</p>
       ")

    (p
       ["This approach is inflexible. Displaying the tags as Twitter-style
         hashtags, for example, would require fiddling with the markup.
         Adding a tag icon beside each tag would require rewriting the
         markup completely."])

    (p
       ["A better approach would be to let the " (em "content") " dictate
         the markup used. Since we have a " (em "list") " of tags, we should
         use a list of some sort. Since the list is in non-arbitrary order
         (alphabetical), an ordered list is probably appropriate. \"Tags\"
         is a heading that relates to the list of tags."])

    (code-block :html

       "
       <h4>Tags</h4>
       <ol>
           <li>Apple</li>
           <li>iOS</li>
           <li>iPad</li>
       </ol>
       ")

    (p
       ["It takes a bit of work to display this markup as a simple
         comma-separated list, but it gives us the freedom to dramatically
         alter the list's appearance without touching the markup."])

    (code-block :css

       "
       h4, ol, li {
           display: inline;
       }
       h4:after {
           content: \":\";
       }
       li:after {
           content: \",\";
       }
       li:last-child:after {
           content: \"\";
       }
       ")

    (h2 "Summary")

    (p
       ["When marking up content, one should use the elements which best "
        (em "describe") " that content. " (em "Styling") " content is a
         separate (though not unrelated) issue. With " (code ":before") ", "
        (code ":after") ", and " (code "content") " at our disposal, let us bid
         farewell to " (code "<span class=\"pipe\">|</span>") " and friends."])

  ]

})