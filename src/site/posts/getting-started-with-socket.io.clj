(import* [:base "../elements" "../components"] {

  :id 90

  :title "Getting started with Socket.IO"

  :datetime (datetime "2011-08-07" "00:15:00" :America/Los_Angeles)

  :tags [:coffeescript :html5 :node.js :socket.io :websockets]

  :body [

    (excerpt
       [(p
           ["There's no shortage of blog posts which -- like this one --
             provide an introduction to "
            (a "http://socket.io/" "Socket.IO") ". Many, though, were
             written prior to the release of 0.7, which ushered in "
            (a "https://github.com/LearnBoost/Socket.IO/wiki/Migrating-0.6-to-0.7"
               "significant API changes") ". Here I'll provide examples
             of server- and client-side code using APIs provided by the "
            (em "current") " version (0.7.4 at time of writing)."])])

    (p
       ["The code snippets are in "
        (a "http://jashkenas.github.com/coffee-script/" "CoffeeScript") "
         and as such are largely free of the parentheses, squiggly brackets,
         and semicolons that riddle the equivalent JavaScript code. For those
         unfamiliar with CoffeeScript's syntax, here's the fifteen second
         rundown:"])

    (code-block :coffeescript

       "
       qux = foo 'bar', (baz) -> 'Hello, world!'
       ")

    (p
       ["The above is equivalent to:"])

    (code-block :javascript

       "
       var qux = foo('bar', function (baz) {
         return 'Hello, world!';
       });
       ")

    (p
       ["CoffeeScript uses " (code "->") " rather than the "
        (code "function") " keyword, and parentheses are optional
         for most function invocations. Now, let's get started."])

    (h3 "Step 1: Create a server")

    (p
       ["This is Node 101 stuff:"])

    (code-block :coffeescript

       "
       fs   = require 'fs'
       http = require 'http'

       server = http.createServer (req, res) ->
         fs.readFile \"#{__dirname}/socket.io.demo.html\", (err, data) ->
           res.writeHead 200, 'Content-Type': 'text/html'
           res.end data, 'utf8'

       server.listen 1337
       ")

    (p
       ["The server we've created simply responds to any request on
         port 1337 with the contents of \"socket.io.demo.html\", which
         must reside in the same directory as the script we're creating."])

    (h3 "Step 2: Add server-side event handlers")

    (code-block :coffeescript

       "
       io = require('socket.io').listen server

       io.sockets.on 'connection', (socket) ->

         socket.on 'publish', (message) ->
           io.sockets.send message

         socket.on 'broadcast', (message) ->
           socket.broadcast.send message

         socket.on 'whisper', (message) ->
           socket.broadcast.emit 'secret', message
       ")

    (p
       ["Here we've instructed our server to listen for three custom
         events: \"publish\", \"broadcast\", and \"whisper\". Note that
         these particular names are not special in any way."])

    (p
       ["When the server receives one of these events, it invokes the
         appropriate handler with the event's data as the sole argument.
         Since we're expecting a string argument in each of these cases,
         we've named the parameter " (code "message") "."])

    (p
       ["The \"publish\" handler passes " (code "message") " to "
        (code "io.sockets.send") ", which forwards it to all the clients.
         The \"broadcast\" handler invokes " (code "socket.broadcast.send") ",
         which forwards " (code "message") " to all the clients "
        (em "except the one that emitted the \"broadcast\" event") ".
         The \"whisper\" handler is very different in that it doesn't send
         a message at all. Rather, it emits yet another event. Again, the
         name of this event -- \"secret\" -- is not special in any way."])

    (p
       ["Having completed these two steps our server-side code is done,
         so we could now run " (code "coffee -c -b socket.io.demo.coffee") "
         to produce the actual JavaScript file we'll run in Node. We're now
         ready to tackle the client-side component."])

    (h3 "Step 3: Create the HTML file")

    (code-block :html

       "
       <!doctype html>
       <html>
         <head>
           <title>Socket.IO demo</title>
         </head>
         <body>
           <h1>Socket.IO demo</h1>
           <input type=\"text\" autofocus=\"autofocus\" />
           <button type=\"button\">publish</button>
           <button type=\"button\">broadcast</button>
           <button type=\"button\">whisper</button>
           <p>Status: <span id=\"status\">Undefined</span></p>
           <ol id=\"messages\"></ol>
           <script src=\"/socket.io/socket.io.js\"></script>
           <script src=\"http://code.jquery.com/jquery-latest.js\"></script>
           <script src=\"http://jashkenas.github.com/coffee-script/extras/coffee-script.js\"></script>
           <script type=\"text/coffeescript\">

             jQuery ($) ->

               // TODO: add client-side logic

           </script>
         </body>
       </html>
       ")

    (p
       [(code "<script src=\"/socket.io/socket.io.js\"></script>") " was
         the line that most confused me in the tutorials I read. I assumed
         that I'd need to serve this file myself, which turned out not to
         be the case. Somehow, it just works."])

    (p
       ["Note the inclusion of \"coffee-script.js\", which enables us to
         write our client-side logic in CoffeeScript, too. :)"])

    (h3 "Step 4: Add client-side Socket.IO event handlers")

    (code-block :coffeescript

       "
       $status = $ '#status'
       socket = io.connect()

       socket.on 'connect', ->
         $status.text 'Connected'

       socket.on 'disconnect', ->
         $status.text 'Disconnected'

       socket.on 'reconnecting', (seconds) ->
         $status.text \"Reconnecting in #{seconds} seconds\"

       socket.on 'reconnect', ->
         $status.text 'Reconnected'

       socket.on 'reconnect_failed', ->
         $status.text 'Failed to reconnect'

       socket.on 'message', (message) ->
         $('<li>').text(message).appendTo $('#messages')

       socket.on 'secret', (message) ->
         console.log message
       ")

    (p
       ["The first five events -- \"connect\", \"disconnect\",
         \"reconnecting\", \"reconnect\", and \"reconnect_failed\" --
         are emitted by Socket.IO in response to changes in the
         connection status. We've registered a handler for each
         in order to expose this information to users."])

    (p
       ["We've also added handlers for \"message\" and \"secret\"
         events. Our \"message\" handler will be called whenever
         the server receives a \"publish\" or \"broadcast\" event
         (" (code "io.sockets.send") " and " (code "socket.broadcast.send") "
         emit \"message\" events). Our \"secret\" handler will be
         called whenever the server receives a \"whisper\" event."])

    (p
       ["All that remains is to have the client emit appropriate
         custom events in response to input from users."])

    (h3 "Step 5: Add DOM event handlers which emit custom events")

    (code-block :coffeescript

       "
       $input = $ 'input'

       $('button').click ->
         socket.emit $(this).text(), $input.val()
         $input.val('').focus()
       ")

    (p
       ["Here, we've bound a \"click\" handler to the three buttons.
         Whenever one of these buttons is clicked the appropriate event
         is emitted (\"publish\", \"broadcast\", or \"whisper\" depending
         on the button clicked). The current value of the text input is
         used as the event's data."])

    (p
       ["That's it. We can now run " (code "node socket.io.demo.js") "
         to start our server and confirm that things behave as expected."])

    (h3 "How it all fits together")

    (p
       ["Let's look at exactly what happens when a user types \"the password
         is 1234\" into the text field and clicks \"whisper\"."])

    (p
       ["First, our \"click\" handler captures the DOM event and in turn
         emits our custom \"whisper\" event with \"the password is 1234\"
         as its data."])

    (p
       ["Next, the server -- which is listening for our custom events --
         captures the \"whisper\" event. It then emits a \"secret\" event
         to all clients except the one that sent the \"whisper\", passing
         along the event data."])

    (p
       ["Finally, each client -- bar the originator of this chain of events --
         captures the \"secret\" event and logs \"the password is 1234\" to the
         console."])

    (h3 "Code")

    (p
       ["The "
        (a "https://bitbucket.org/davidchambers/socket.io.demo"
           "code used in this tutorial") " is available on Bitbucket."])

  ]

})