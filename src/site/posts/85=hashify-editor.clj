(import* [:base "../elements" "../components"] {

  :title "Hashify Editor"

  :datetime (datetime "2011-04-24" "06:15:00" :America/Los_Angeles)

  :tags [:hashify :markdown :showdown :ux]

  :body [

    (p
       ["On 19 April 2011, at around noon Pacific time, I published
         a short tweet."])

    (blockquote

       [(p
           ["Hashify is officially live as of now! "
            (a "http://bit.ly/dXYxGU" "bit.ly/dXYxGU")])])

    (p
       ["Quite to my surprise word of the release spread
         incredibly quickly, thanks in large part to the "
        (a "http://news.ycombinator.com/item?id=2464213"
           "Hacker News thread") " that sprang up and
         received a great deal of attention."])

    (p
       ["The vast majority of the ensuing discussion focused on the
         implications of stuffing documents into URLs, and of using bit.ly
         as a document store. While there was much debate as to whether this
         \"cool hack\" will turn out to have practical application, the one
         undoubtedly useful component was overlooked."])

    (h3 "Markdown editing for the masses")

    (p
       ["Before dropping off the face of the earth, John Fraser created "
        (a "https://bitbucket.org/davidchambers/showdown.js" "Showdown") "
         and " (a "http://code.google.com/p/wmd/" "wmd") ".
         The latter is a WYSIWYM Markdown editor, popularized by "
        (a "http://stackoverflow.com/" "Stack Overflow") ". I've long been
         supportive of wmd's goals, but I've never liked its implementation."])

    (p
       ["Several drawbacks of wmd encouraged me to write my own Markdown
         editor:"])

    (ul
       [(li "Its use of inline styles makes it difficult to customize the
             toolbar's appearance.")
        (li "Many HTTP requests are required to retrieve the toolbar icons.")
        (li "Lack of modularity: Showdown is a dependency.")
        (li "Unnatural keyboard shortcuts.")])

    (p
       [(a "https://bitbucket.org/davidchambers/hashify-editor"
           "Hashify Editor") " addresses these concerns. Styles are applied
         via a style sheet, and selector specificity has been kept low to
         make overriding default styling simple. Selectors are prefixed
         with " (code "hashify-editor") " to prevent erroneous matches.
         Additionally, the images have been sprited, optimized, Base64
         encoded, and included in the style sheet as a data URI."])

    (p
       ["Hashify Editor does not require Showdown, as its focus is on
         turning the humble " (code "textarea") " into a useful Markdown
         editor. TextMate-style keyboard shortcuts make it a joy to work
         with metacharacters and text selections."])

    (p
       ["Best of all is the preview option: one is able to view -- and of
         course, edit -- the text at " (a "http://hashify.me/" "hashify.me") "
         with a single click."])

    (captioned-images

       [(captioned-image
           "/images/posts/85/hashify-editor-at-david-chambers-design.png"
           "Hashify Editor at David Chambers Design"
           "Hashify Editor at David Chambers Design")

        (captioned-image
           "/images/posts/85/comment-preview-at-hashify.me.png"
           "Comment preview at hashify.me"
           "Comment preview at hashify.me")])

    (h3 "Adoption")

    (p
       ["I love sites which support Markdown commenting. Unfortunately many of
         those that do -- even " (a "http://forrst.com/" "Forrst") " -- don't
         provide previews. As a result, each time I'm about to submit a lengthy
         comment I select all, copy, open a new tab, go to hashify.me, tab into
         the editor, and paste in my comment. Were Forrst to integrate Hashify
         Editor, six of these steps could be replaced by a single mouse click.
         :D"])

  ]

})
