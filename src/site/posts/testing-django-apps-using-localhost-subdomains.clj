(import* [:base "../elements" "../components"] {

  :id 56

  :title "Testing Django apps using localhost subdomains"

  :datetime (datetime "2010-07-04" "08:23:00" :Pacific/Auckland)

  :tags [:django :mac-os-x]

  :body [

    (p
       ["This turned out to be quite a bit easier than I'd imagined.
         Here are the things I did:"])

    (ol
       [(li
           [(p
               ["I saved "
                (a "http://thingsilearned.com/2009/01/05/using-subdomains-in-django/"
                   "Dave Fowler's subdomain middleware") "
                 as " (code "middleware.py") " in my project directory:"])

            (code-block :python

               "
               class SubdomainMiddleware:
                   def process_request(self, request):
                       '''Parse out the subdomain from the request'''
                       request.subdomain = None
                       host = request.META.get('HTTP_HOST', '')
                       host_s = host.replace('www.', '').split('.')
                       if len(host_s) > 2:
                           request.subdomain = ''.join(host_s[:-2])
               ")])

        (li
           [(p
               ["I added this to my project's "
                (code "MIDDLEWARE_CLASSES") ":"])

            (code-block :python

               "
               MIDDLEWARE_CLASSES = (
                   ...,
                   'middleware.SubdomainMiddleware',
               )
               ")])

        (li
           [(p
               ["I edited my " (code "/etc/hosts") "
                 file as per Dave's suggestion:"])

            (code-block :plain-text

               "
               127.0.0.1 test.com
               127.0.0.1 blog.test.com
               127.0.0.1 search.test.com
               ")

            (p
               ["Initially I replaced " (code "test.com") " with the
                 site's domain name, but I decided that it's useful to
                 be able to access both the live site and the test site
                 without editing the " (code "/etc/hosts") " file."])

            (p
               ["At this point I expected everything to work as advertised.
                 Instead, I got this:"])

            (uncaptioned-image
               "/images/posts/windows/it-works!.png"
               "It works!")

            (p
               ["That would depend on one's definition of \"works\".
                 I wanted my Django site to appear, which required a
                 very simple tweak..."])])

        (li
           [(p
               ["I added the port number to the address:"])

            (code-block :plain-text

               "
               http://test.com:8000/
               ")

            (p
               ["This " (em "actually") " worked. :)"])])])

  ]

})
