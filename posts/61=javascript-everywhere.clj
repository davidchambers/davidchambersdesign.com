(import* ["../src/elements.clj" "../src/components.clj"] {

  :title "JavaScript, JavaScript, everywhere"

  :datetime (datetime "2010-07-20" "19:05:00" :Pacific/Auckland)

  :tags [:javascript :node.js :sproutcore]

  :body [

    (excerpt

       [(p
           ["Over the past few months I've reached a startling realization: "
            (strong "JavaScript is a tremendously capable language.")])

        (p
           ["The reason that it took me so long to discover this is that
             the playing field has never been fair. On the one hand I've been
             writing application code for the server, a stable, predictable
             environment. On the other hand I've been adding interactivity
             on the client's side, dealing with inconsistencies on multiple
             fronts, not least of which is the DOM API."])

        (p
           ["Comparing Python and JavaScript, for example, by using the
             former to quickly put together a website using the excellent
             Django framework while using the latter to add drag and drop
             functionality is to compare apples and oranges. " (strong
            "Actually, it's more like comparing apples to root canals.")])])

    (p
       ["Had I been writing application code in JavaScript (without
         touching the DOM), I'd have been in a much better position
         to weigh each on its merits. Thanks to some terrifically
         exciting developments in the JS world, it is now possible to
         write application code " (em "entirely") " in JavaScript."])

    (p
       ["When I was first exposed to the idea of having JavaScript on
         the server, the thing that appealed to me was the potential to
         share code between server and client. This seemed preferable
         to the situation that is currently prevalent, whereby objects
         are created on the server (probably using an ORM such as that
         provided by Rails or Django) and are then sent down the wire
         as JSON (or XML for the masochists) at which point they are
         parsed to create JS objects."])

    (p
       [(a "http://www.sproutcore.com/" "SproutCore") " rewrites the
         client–server relationship by moving " (em "all") " programming
         logic to the client. This new approach was motivated by a desire
         to improve performance, but has two consequential benefits. No
         longer do objects need to be represented on both sides of the
         wire (in violation of the DRY principle). This brings another
         benefit, which is the separation of concerns: the server is
         freed to focus on serving, and the decoupling of service and
         application code allow the service to be used (simultaneously)
         by other applications."])

    (p
       ["SproutCore is server-agnostic, which allows it to connect to
         existing services, and allows new services to be created using
         the most appropriate server-side technologies."])

    (dl
       [(dt
           (embed {:type "application/x-shockwave-flash"
                   :src "http://blip.tv/play/g_MngZaxYQI"
                   :width 480
                   :height 300
                   :allowscriptaccess :always
                   :allowfullscreen true}))
        (dd
           ["Mike Subelsky introducing SproutCore at JSConf Washington,
             April 2009"])])

    (p
       ["Exciting JavaScript-related developments are not limited to the
         client-side, however. There are several options available if you're
         interested in running JavaScript on the server, but the one that's
         caught my attention is " (a "http://nodejs.org/" "Node.js") "."])

    (dl
       [(dt
           (embed {:type "application/x-shockwave-flash"
                   :src "http://blip.tv/play/AYGylE4C"
                   :width 480
                   :height 300
                   :allowscriptaccess :always
                   :allowfullscreen true}))
        (dd
           ["Ryan Dahl introducing Node.js at JSConf Berlin, November 2009"])])

    (p
       ["The idea of using an event loop on the " (em "server") "-side
         is surprising at first, but obvious in hindsight. JavaScript
         is extremely well suited to event-driven programming, and the
         performance gains that can be made with non-blocking request
         handling are significant."])

    (p
       ["JavaScript is at last recieving the attention and respect it
         has long deserved. I'm greatly looking forward to building an
         application using non-blocking, event-driven JavaScript on both
         sides of the wire."])

  ]

})
