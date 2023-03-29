import {text, a, article, article$0027, aside, aside$0027, b, blockquote, blockquote$0027, body$0027, code, code$0027, dd, dd$0027, del, del$0027, div, dl, dl$0027, dt, dt$0027, em, em$0027, embed, footer, footer$0027, h1, h1$0027, h2, h2$0027, h3, h3$0027, h4, h4$0027, h5, h5$0027, h6, h6$0027, head, head$0027, header, header$0027, hr, hr$0027, html, html$0027, i, i$0027, img, ins, ins$0027, li, li$0027, linearGradient, link, mask, meta, nav, nav$0027, object, ol, ol$0027, p, p$0027, param, path, pre, pre$0027, rect, script, span, stop, strong, strong$0027, svg, time, title, title$0027, ul, ul$0027, var$, var$0027, video} from "../elements.js";
import {code$002Dblock, $2014} from "../components.js";
import datetime from "../datetime.js";
const Prelude = {
  operators: {
    unary: {
      ["~"]: operand => ~operand
    },
    binary: {
      ["<<"]: rhs => lhs => lhs << rhs,
      [">>"]: rhs => lhs => lhs >> rhs,
      [">>>"]: rhs => lhs => lhs >>> rhs,
      ["&"]: rhs => lhs => lhs & rhs,
      ["^"]: rhs => lhs => lhs ^ rhs,
      ["|"]: rhs => lhs => lhs | rhs
    }
  },
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  construct: constructor => args => Reflect.construct(constructor, args),
  instanceof: constructor => x => x instanceof constructor,
  typeof: x => x === null ? "null" : typeof x,
  match: type => Prelude["match'"](type)(x => CasesNotExhaustive),
  ["match'"]: type => type[Symbol.for("match")],
  id: x => x,
  const: x => y => x,
  not: x => !x,
  equals: this$ => that => Array.isArray(this$) ? Array.isArray(that) && (this$.length === that.length && this$.every((x, idx) => Prelude.equals(x)(that[idx]))) : this$ === that,
  concat: this$ => that => Array.isArray(this$) || typeof this$ === "string" ? this$.concat(that) : this$["fantasy-land/concat"](that),
  reduce: f => y => x => x[Array.isArray(x) ? "reduce" : "fantasy-land/reduce"]((y, x) => f(y)(x), y),
  reduceRight: f => y => x => x.reduceRight((y, x) => f(y)(x), y),
  filter: f => x => Array.isArray(x) ? x.filter(x => f(x)) : x["fantasy-land/filter"](f),
  reject: f => Prelude.filter(x => Prelude.not(f(x))),
  map: f => x => Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f),
  flip: f => y => x => f(x)(y),
  chain: f => x => Array.isArray(x) ? x.flatMap(x => f(x)) : x["fantasy-land/chain"](f)
};
const {operators, _apply, apply, construct, instanceof: instanceof$, typeof: typeof$, match, ["match'"]: match$0027, id, const: const$, not, equals, concat, reduce, reduceRight, filter, reject, map, flip, chain} = Prelude;
const excerpt = [p(["There's no shortage of blog posts which", $2014, "like this one", $2014, "provide an introduction to ", a({
  href: "http://socket.io/"
})(["Socket.IO"]), ". Many, though, were\n    written prior to the release of 0.7, which ushered in ", a({
  href: "https://github.com/LearnBoost/Socket.IO/wiki/Migrating-0.6-to-0.7"
})(["significant API changes"]), ". Here I'll provide examples\n    of server- and client-side code using APIs provided by the ", em(["current"]), " version (0.7.4 at time of writing)."])];
const body = [...excerpt, p(["The code snippets are in ", a({
  href: "http://jashkenas.github.com/coffee-script/"
})(["CoffeeScript"]), "\n    and as such are largely free of the parentheses, squiggly brackets,\n    and semicolons that riddle the equivalent JavaScript code. For those\n    unfamiliar with CoffeeScript's syntax, here's the fifteen second\n    rundown:"]), code$002Dblock("coffeescript")(`qux = foo 'bar', (baz) -> 'Hello, world!'
`), p(["The above is equivalent to:"]), code$002Dblock("javascript")(`var qux = foo('bar', function (baz) {
  return 'Hello, world!';
});
`), p(["CoffeeScript uses ", code(["->"]), " rather than the ", code(["function"]), " keyword, and parentheses are optional\n    for most function invocations. Now, let's get started."]), h3(["Step 1: Create a server"]), p(["This is Node 101 stuff:"]), code$002Dblock("coffeescript")(`fs   = require 'fs'
http = require 'http'

server = http.createServer (req, res) ->
  fs.readFile "#{__dirname}/socket.io.demo.html", (err, data) ->
    res.writeHead 200, 'Content-Type': 'text/html'
    res.end data, 'utf8'

server.listen 1337
`), p([`The server we've created simply responds to any request on
    port 1337 with the contents of "socket.io.demo.html", which
    must reside in the same directory as the script we're creating.`]), h3(["Step 2: Add server-side event handlers"]), code$002Dblock("coffeescript")(`io = require('socket.io').listen server

io.sockets.on 'connection', (socket) ->

  socket.on 'publish', (message) ->
    io.sockets.send message

  socket.on 'broadcast', (message) ->
    socket.broadcast.send message

  socket.on 'whisper', (message) ->
    socket.broadcast.emit 'secret', message
`), p([`Here we've instructed our server to listen for three custom
    events: "publish", "broadcast", and "whisper". Note that
    these particular names are not special in any way.`]), p(["When the server receives one of these events, it invokes the\n    appropriate handler with the event's data as the sole argument.\n    Since we're expecting a string argument in each of these cases,\n    we've named the parameter ", code(["message"]), "."]), p(["The \"publish\" handler passes ", code(["message"]), " to ", code(["io.sockets.send"]), ", which forwards it to all the clients.\n    The \"broadcast\" handler invokes ", code(["socket.broadcast.send"]), ",\n    which forwards ", code(["message"]), " to all the clients ", em([`except the one that emitted the "broadcast" event`]), ".\n    The \"whisper\" handler is very different in that it doesn't send\n    a message at all. Rather, it emits yet another event. Again, the\n    name of this event", $2014, `"secret"`, $2014, "is not special in any way."]), p(["Having completed these two steps our server-side code is done,\n    so we could now run ", code(["coffee -c -b socket.io.demo.coffee"]), "\n    to produce the actual JavaScript file we'll run in Node. We're now\n    ready to tackle the client-side component."]), h3(["Step 3: Create the HTML file"]), code$002Dblock("html")(`<!doctype html>
<html>
  <head>
    <title>Socket.IO demo</title>
  </head>
  <body>
    <h1>Socket.IO demo</h1>
    <input type="text" autofocus="autofocus" />
    <button type="button">publish</button>
    <button type="button">broadcast</button>
    <button type="button">whisper</button>
    <p>Status: <span id="status">Undefined</span></p>
    <ol id="messages"></ol>
    <script src="/socket.io/socket.io.js"></script>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="http://jashkenas.github.com/coffee-script/extras/coffee-script.js"></script>
    <script type="text/coffeescript">

      jQuery ($) ->

        // TODO: add client-side logic

    </script>
  </body>
</html>
`), p([code([`<script src="/socket.io/socket.io.js"></script>`]), " was\n    the line that most confused me in the tutorials I read. I assumed\n    that I'd need to serve this file myself, which turned out not to\n    be the case. Somehow, it just works."]), p([`Note the inclusion of "coffee-script.js", which enables us to
    write our client-side logic in CoffeeScript, too. :)`]), h3(["Step 4: Add client-side Socket.IO event handlers"]), code$002Dblock("coffeescript")(`$status = $ '#status'
socket = io.connect()

socket.on 'connect', ->
  $status.text 'Connected'

socket.on 'disconnect', ->
  $status.text 'Disconnected'

socket.on 'reconnecting', (seconds) ->
  $status.text "Reconnecting in #{seconds} seconds"

socket.on 'reconnect', ->
  $status.text 'Reconnected'

socket.on 'reconnect_failed', ->
  $status.text 'Failed to reconnect'

socket.on 'message', (message) ->
  $('<li>').text(message).appendTo $('#messages')

socket.on 'secret', (message) ->
  console.log message
`), p(["The first five events", $2014, "\"connect\", \"disconnect\",\n    \"reconnecting\", \"reconnect\", and \"reconnect_failed\"", $2014, "are emitted by Socket.IO in response to changes in the\n    connection status. We've registered a handler for each\n    in order to expose this information to users."]), p(["We've also added handlers for \"message\" and \"secret\"\n    events. Our \"message\" handler will be called whenever\n    the server receives a \"publish\" or \"broadcast\" event\n    (", code(["io.sockets.send"]), " and ", code(["socket.broadcast.send"]), "\n    emit \"message\" events). Our \"secret\" handler will be\n    called whenever the server receives a \"whisper\" event."]), p(["All that remains is to have the client emit appropriate\n    custom events in response to input from users."]), h3(["Step 5: Add DOM event handlers which emit custom events"]), code$002Dblock("coffeescript")(`$input = $ 'input'

$('button').click ->
  socket.emit $(this).text(), $input.val()
  $input.val('').focus()
`), p([`Here, we've bound a "click" handler to the three buttons. Whenever one
    of these buttons is clicked the appropriate event is emitted ("publish",
    "broadcast", or "whisper" depending on the button clicked). The current
    value of the text input is used as the event's data.`]), p(["That's it. We can now run ", code(["node socket.io.demo.js"]), "\n    to start our server and confirm that things behave as expected."]), h3(["How it all fits together"]), p([`Let's look at exactly what happens when a user types "the password
    is 1234" into the text field and clicks "whisper".`]), p([`First, our "click" handler captures the DOM event and in turn emits
    our custom "whisper" event with "the password is 1234" as its data.`]), p(["Next, the server", $2014, "which is listening for our custom events", $2014, "captures the \"whisper\" event. It then emits a \"secret\" event\n    to all clients except the one that sent the \"whisper\", passing\n    along the event data."]), p(["Finally, each client", $2014, "bar the originator of this chain of events", $2014, "captures the \"secret\" event and logs \"the password is 1234\" to the\n    console."]), h3(["Code"]), p(["The ", a({
  href: "https://bitbucket.org/davidchambers/socket.io.demo"
})(["code used in this tutorial"]), " is available on Bitbucket."])];
export default {
  id: 90,
  slug: "getting-started-with-socket.io",
  title: ["Getting started with Socket.IO"],
  datetime: datetime("2011-08-07")("00:15:00")("America/Los_Angeles"),
  tags: ["coffeescript", "html5", "node.js", "socket.io", "websockets"],
  body
};
