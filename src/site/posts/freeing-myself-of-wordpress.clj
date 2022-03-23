(import* ["../elements"]

(let [
  code-block          (require "../components/code-block")
  uncaptioned-image   (require "../components/uncaptioned-image")
  datetime            (require "../datetime")
] {

  :id 50

  :title "Freeing myself of WordPress"

  :datetime (datetime "2010-06-03" "02:56:00" :Pacific/Auckland)

  :tags [:django :mango :wordpress]

  :body [

    (h3 "WordPress")

    (p
       [(a "http://wordpress.org/" "WordPress") " is powerful software,
         which I've recommended frequently since I came across it two
         years ago. I've used it on several sites (including this one),
         and it has served me well."])

    (p
       ["Over time, though, a few things started to get me down. More and
         more, I found myself fighting WordPress rather than working with it.
         In one case I was forced to hack core WordPress files to prevent
         session data from being cleared between requests. WordPress is
         great blogging software, but I've been guilty of trying to do
         too much with it."])

    (p
       ["Having decided to use WordPress for my blogs and better suited
         tools for more complex projects, my frustrations abated, but did
         not disappear. I was still writing posts in HTML -- I'm a control
         freak and can't live without definition lists -- and generating
         50 or more database records for each post by frequently previewing
         while writing."])

    (excerpt

       [(p
           [(strong "I wanted to simplify everything.") "
             I wanted to write posts in "
            (a "http://daringfireball.net/projects/markdown/syntax"
               "Markdown") ", not HTML. I wanted to save posts as files,
             not database entries. I wanted to free myself of my dependence
             on WordPress, PHP, and MySQL in one fell swoop."])

        (p
           ["So, " (a "http://bitbucket.org/davidchambers/mango" "Mango") "
             was born. Mango is file-based blogging software built on "
            (a "http://www.djangoproject.com/" "Django") ", the excellent
             Python web framework. I conceived Mango to scratch an itch,
             and I'll bet that others out there are itchy, too."])])

    (h3 "Going without")

    (p
       ["I kept my dependence on WordPress plug-ins to a minimum, but there
         were a few which I found very useful."])

    (ul
       [(li
           [(p
               [(a "http://akismet.com/" "Akismet") ".
                 Commenting is handled by " (a "http://disqus.com/" "Disqus") ",
                 which offers Akismet in addition to its own spam filtering."])])
        (li
           [(p
               [(a "http://wordpress.org/extend/plugins/wp-super-cache/"
                   "WP Super Cache") ".
                 Mango supports caching \"out of the box\", courtesy of Django.
                 Caching currently occurs at the post level, which means that
                 extra content such as comments are still generated dynamically.
                 In the future Mango will include a second layer of caching,
                 at the page level."])])
        (li
           [(p
               [(a "http://wordpress.org/extend/plugins/subscribe-to-comments/"
                   "Subscribe to Comments") ".
                 Mango does not currently support this feature, but soon will.
                 Hang tight."])])
        (li
           [(p
               [(a "http://wordpress.org/extend/plugins/wp-db-backup/"
                   "WP-DB-Backup") ".
                 With Mango there's no database to back up. My posts are safe
                 because I write and save them locally, and my hard drive is
                 automatically backed up via Time Machine. (This is a recurring
                 theme: Mango takes advantage of existing solutions to common
                 problems.)"])])])

    (p
       ["The plug-ins that I am thrilled to be without are those that
         prevent WordPress from carrying out an action, or attempt to undo
         an action after the fact. The existance of plug-ins such as "
        (a "http://wordpress.org/extend/plugins/no-curly-quotes/"
           "No Curly Quotes") " is evidence of the fact that I am not
         the only one who refuses to let WordPress dictate terms."])

    (h3 "Customization")

    (p
       ["WordPress has themes. The problem with the WordPress approach
         to themes is that a theme's template files and style sheet are
         tightly coupled. Themes should control the " (em "presentation") "
         of content – theme authors should not determine " (em "what") "
         appears on an \"archives\" page, for example, yet with WordPress
         this is exactly what they are expected to do."])

    (p
       ["As a result, WordPress themes often require customization,
         where by \"customization\" I mean hacking to pieces."])

    (p
       ["Django -- and by extension Mango -- has a different approach,
         which is incredibly simple. One provides Django with an ordered
         list of places to look for templates."])

    (code-block :python

       "
       TEMPLATE_DIRS = (
           '/webapps/dcd/blog/templates',
           '/webapps/dcd/blog/mango/templates',
       )
       ")

    (p
       ["If Mango needs " (code "archives.dhtml") " it'll first look in
         the custom templates directory. If it finds that file there,
         it'll use it. If not, it'll use Mango's \"archives\" template.
         Whereas with WordPress it's all or nothing, with Mango you can
         create one or more of your own templates and have Mango fall
         back to the defaults for the rest."])

    (p
       ["Not that writing templates is an unpleasant task – "
        (a "http://docs.djangoproject.com/en/dev/topics/templates/"
           "Django's template language") " is extremely elegant."])

    (h3 "Extensibility")

    (p
       ["There are no plug-ins for Mango. I like that. Many options are
         configurable, but Mango has no ambitions of being anything more
         than great blogging software. Mango is a Django app, and Django
         apps play nicely together. New components can be added to a site
         in the form of additional Django applications. In my opinion
         Python+Django is a more elegant, more feature-rich, more secure
         platform than PHP+WordPress."])

    (h3 "Final thoughts")

    (p
       ["Undoubtedly, Mango is not for everyone. In fact, I would recommend
         Mango to only a tiny portion of bloggers. For most, the fact that
         WordPress serves content " (em "and") " provides a web interface
         for inputting and managing that content is a great thing, and
         I'll continute to recommend it on this basis. The success of "
        (a "http://www.red-sweater.com/marsedit/" "MarsEdit") ", however,
         indicates that I'm not the only one who prefers to write posts
         in a desktop application than in a glorified web form."])

    (p
       ["Mango does not provide an all-in-one solution. This frees
         me to use the tools I know and love. I can compose a post in "
        (a "http://www.hogbaysoftware.com/products/writeroom" "WriteRoom") "
         and publish it with " (a "http://panic.com/transmit/" "Transmit") "
         (DockSend is fantastic!) or I can write in "
        (a "http://panic.com/coda/" "Coda") " as I'm doing now,
         preview locally, and hit the upload arrow when I'm ready
         to share my thoughts with the world."])

    (uncaptioned-image
       "/images/posts/50/publish.png"
       "Publish a post from Coda")

  ]

}))
