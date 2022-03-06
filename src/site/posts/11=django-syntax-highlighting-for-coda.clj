(import* [:base "../elements" "../components"] {

  :title "Django syntax highlighting for Coda"

  :datetime (datetime "2009-04-16" "22:15:00" :Pacific/Auckland)

  :tags [:coda :django :mac-os-x]

  :body [

    (p
       ["I love " (a "http://www.panic.com/coda/" "Coda") ".
         It's just so... sexy, somehow. I've just discovered "
        (a "http://www.djangoproject.com/" "Django") ", with which
         I'm fast falling in love as well. Naturally, when I came to write
         my first Django template I opened Coda.app and started coding."])

    (p
       ["It soon became apparent, however, that " (strong "Coda does not apply
         syntax highlighting to Django") ". The solution? Juan Pablo Claude's "
        (a "http://weblog.bignerdranch.com/?p=49"
           "Django and Django-template bundles for Coda") "."])

    (captioned-image
       "/images/posts/11/django-syntax-highlighting-in-coda.png"
       "Django syntax highlighting in Coda"
       "Django syntax highlighting in Coda")

    (update (datetime "2010-11-14" "14:00:00" :Australia/Sydney)

       [(p
           ["I've since discovered an alternative mode which
             is actively maintained over on GitHub. I now use "
            (a "https://github.com/jbergantine/Django-Template"
               "jbergantine's Django-Template") "."])])

  ]

})
