(import ["../elements"]

(let [
  luxon               (require "../luxon")
  captioned-image     (require "../components/captioned-image")
  code-block          (require "../components/code-block")
] {

  :id 43

  :slug "css-image-switcher-done-the-right-way"

  :title "CSS image switcher (done the right way)"

  :datetime (luxon/datetime "2010-03-24" "12:47:00" :Pacific/Auckland)

  :tags [:accessibility :best-practice :css :meaningful-markup :seo :ux]

  :body [

    (excerpt

       [(p
           [(strong "Chris Coyier has done it again.") "
             Compelled me to stay up all night, that is
             (it's 7am as I type this). In Chris's latest screencast, "
            (a "http://css-tricks.com/video-screencasts/82-css-image-switcher/"
               "CSS Image Switcher") ", he demonstrates how to create an
             \"image switcher\" using CSS. The problem, though, is that "
            (strong "his process is wrong") "."])

        (h4 "Incorrect process")

        (ol
           [(li
               ["What effect or experience do I want to create?"])
            (li
               ["How can I achieve this using CSS
                 (and JavaScript if necessary)?"])
            (li
               ["What can my markup do to help me?"])])

        (h4 "Correct process")

        (ol
           [(li
               ["What effect or experience do I want to create?"])
            (li
               ["What is the most correct and meaningful way to describe
                 the content?"])
            (li
               ["How can I achieve the desired effect or experience
                 (or something close to it) " (em "without") " altering
                 my markup?"])])])

    (p
       ["Chris simply isn't in the right mindset. He's thinking
         about " (em "how") " he's going to present the content
         on the page, but he's forgetting to consider the content
         itself. This is a crucial error. If one views Chris's "
        (a "http://css-tricks.com/examples/CSSImageSwitcher/"
           "CSS image switcher demo") " with styles disabled,
         one sees something most unhelpful:"])

    (captioned-image
       "/images/posts/43/css-tricks-image-switcher-demo-sans-styles.png"
       "Chris Coyier's CSS image switcher demo displays nothing
        but four unhelpful links when styles are disabled"
       "CSS image switcher demo as seen at CSS-Tricks
        (with styles disabled; note the lack of images)")

    (p
       ["Well, at least one could click on these links to view the images,
         right? Wrong! The hrefs contain nothing but the hash sign. Chris
         does mention in the screencast that these links " (em "could") "
         go somewhere, but it's as if to say " (strong "hey, here're some
         links if you need 'em") " rather than " (strong "yikes! this
         page'll be worthless when styles are disabled, you'd sure as
         hell better link to the images as backup") "."])

    (p
       ["I assume that Chris opted to use anchor elements to allow him
         to employ the " (strong ":hover") " pseudo-class and have it work
         in IE6. It's well and truly time, however, to stop bending over
         backwards to accommodate IE6's shortcomings, and Google agrees: "
        (a "http://www.sitepoint.com/blogs/2009/07/20/youtube-drop-ie6/"
           "YouTube to drop support for IE6") "."])

    (h3 "Why meaningful markup matters")

    (p
       ["Meaningful HTML is not just important to markup geeks who like
         to use the word \"semantic\". " (strong "It's vitally important
         to search engines.") " While in most cases discussion of the
         relationship between structured content and search engines
         centres on whether Google favours sites with clean, descriptive
         markup, in the case of Chris's CSS image switcher it's a matter of
         whether the content is indexable at all! Consider the consequences
         of a site such as " (a "http://www.flickr.com/" "Flickr") "
         adopting this approach: any new photo uploaded to the site would
         be invisible to web crawlers."])

    (p
       ["One should not rely on either CSS or JavaScript to deliver "
        (em "content") " – HTML exists to contain and describe content.
         This is a pragmatic consideration as well as an idealogical one:
         HTML is the one component of the HTML+CSS+JavaScript stack to
         which all users have access (certain devices, for example,
         eschew CSS support in favour of faster page loads)."])

    (h3 "Meaningful markup for image–caption pairs")

    (p
       ["As I state in " (a "/captions-over-images/" "Captions over images") ",
         my response to an earlier CSS-Tricks screencast, the "
        (strong "definition list") " is the most appropriate tool
         in our toolbox."])

    (captioned-image
       "/images/posts/43/definition-list-markup.png"
       "Definition list markup"
       ["The screenshot above is marked up within a " (strong "dt") "
         and this caption is a " (strong "dd") " (how meta!)"])

    (p
       ["Each term in a definition list should have " (em "at least") " one
         definition. This enables more than one description -- a title and a
         caption, for instance -- to be tied to an image:"])

    (code-block :html

       "
       <dl>
           <dt><img src=\"images/ds81.jpg\" alt=\"Vancouver architecture\" /></dt>
           <dd>This is not like that</dd>
           <dd>Contrasting ideas engage the mind. Make a photo today that tells
           a story with contrasting elements. — <i>Daily Shoot 81</i></dd>
           ...
       </dl>
       ")

    (p
       ["Beautiful, isn't it? No pointless (literally) anchors, no meaningless
         ids, no class names, just content wrapped in descriptive HyperText
         Markup Language. This ensures that the page's content is accessible
         to all: those viewing the page on mobile phones; those using screen
         readers or feed readers; and, of course, web crawlers."])

    (captioned-image
       "/images/posts/43/meaningful-markup-degrades-gracefully.jpg"
       "Meaningful markup degrades gracefully"
       "The page's content is accessible even with styles disabled")

    (h3 "Demo")

    (p
       ["Check out the "
        (a "/examples/css-image-switcher/" "CSS image switcher demo") "
         to see what's possible with straightforward, structured markup
         (and some rather less straightforward CSS). The demo works in
         the latest versions of Firefox, Internet Explorer, Opera, and
         Camino. Unfortunately the core feature does " (em "not") " work
         in Safari or Google Chrome, as these WebKit-based browsers fail
         to handle the " (code "dt+dd:hover~dt") " selector."])

  ]

}))
