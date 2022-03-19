(import* [:base "../elements" "../components"] {

  :id 36

  :title "Shockingly simple URL shortening"

  :datetime (datetime "2010-01-26" "03:34:00" :Pacific/Auckland)

  :tags [:.htaccess :twitter]

  :body [

    (excerpt

       [(p
           ["URL shortening is something that's been
             at the back of my mind since listening to "
            (a "http://www.sitepoint.com/blogs/2009/08/22/podcast-24-those-frames-are-ironic/"
               "SitePoint Podcast #24") "
             which discussed the near closure of "
            (a "http://tr.im/" "tr.im") "."])

        (p
           [(strong [(em "Why are short URLs required?") " Twitter."]) "
             Tweets are limited to 140 characters, and URLs often seem
             recklessly long in this context. Of course, Twitter could
             simply allow us to apply short, meaningful labels to our
             links as we've been doing in HTML for years. Instead, each
             time one includes a link in a tweet one must either:"])

        (ul
           [(li
               ["spend a large number of characters on the full URL; or"])
            (li
               ["use a short URL generated by a service such as "
                (a "http://bit.ly/" "bit.ly")])])])

    (p
       ["I'm opposed to short URLs for several reasons. First,
         I believe that every reference to a resource should use that
         resource's Uniform Resource Identifier (if it has one) in its
         normalized form. In other words, we should " (em "not") " use "
        (strong "http://www.wikipedia.org/") " to refer to "
        (strong "http://wikipedia.org/") ", and we should "
        (em "certainly not") " use " (strong "http://bit.ly/8RTk") ".
         Having multiple URLs for a resource is a maintenance nightmare
         (unless one is willing to accept URLs being temporal)."])

    (p
       ["Secondly, I have a simple rule: "
        (strong "meaningful > meaningless") ".
         Meaningful markup is wonderful, and meaningful URLs offer
         similar benefits (to both people and search engines)."])

    (p
       ["Finally -- and this point relates to URL shortening services
         rather than to short URLs themselves -- there's no guarantee
         that sites which " (em "currently") " provide a service will
         continue to do so indefinitely."])

    (h3 "Enter John Gruber")

    (p
       ["I noticed one day that "
        (a "http://daringfireball.net/" "Daring Fireball") " now has its own "
        (a "http://sites.google.com/a/snaplog.com/wiki/short_url" "shorturl") "s,
         using the incredibly cool domain name ✪df.ws. This got me thinking that
         perhaps I should procure a short domain name and do something similar.
         Well, last week I did."])

    (p
       ["With dċd.ws safely registered in my name I began looking for an
         open source URL shortener to run on that domain. I then struck
         upon a " (strong "simple, elegant solution") " which took all
         of ten minutes to implement."])

    (code-block :TK

       "
       RewriteEngine On
       RewriteRule ^(.*)$ http://davidchambersdesign.com/$1 [R=301,L]
       ")

    (p
       ["The code above forms the entirety of the " (strong ".htaccess") "
         file on the dċd.ws server. All it does is redirect every request
         to the corresponding davidchambersdesign.com URL. The key word
         being " (em "every") ". As a result, existing pages on this site
         gained short" (em "er") " (though not necessarily short) URLs
         automatically, and new pages gain a short URL the instant they
         are published. " (strong "No maintenance, no fuss. Nice!")])

    (p
       ["So, for example, " (strong "http://dċd.ws/twitter/") " → "
        (strong "http://davidchambersdesign.com/twitter/") "
         (a 17 character saving)."])

    (p
       ["If you're interested in acquiring your own short domain name,
         I suggest trying .ws as it's one of the few top level domains
         to allow virtually any Unicode character in its domain names.
         As a result, there are plenty of short .ws domain names available.
         I don't suggest this approach for normal use, however, as browsers
         will display something like " (strong "http://xn--dd-7la.ws/") "
         in their address bars."])

  ]

})
