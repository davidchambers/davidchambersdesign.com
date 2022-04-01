(import* ["../elements"]

(let [
  luxon               (require "../luxon")
  code-block          (require "../components/code-block")
] {

  :id 51

  :slug "optimization-via-stringification"

  :title "Optimization via stringification"

  :datetime (luxon/datetime "2010-06-03" "14:28:00" :Pacific/Auckland)

  :tags [:css :optimization :python]

  :body [

    (excerpt

       [(p
           ["One way to reduce the number of HTTP requests a page requires
             is to group (non-content) images into sprites. An even better
             way is to remove these images from the server altogether;
             instead include them as encoded strings in your style sheet."])])

    (p
       ["Instead of..."])

    (code-block :css

       "
       a[href=\"/contact/\"] {
           background: url(/images/sprite.png) no-repeat 0 -30px;
       }
       ")

    (p
       ["use something like..."])

    (code-block :css

       "
       a[href=\"/contact/\"] {
           background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNrs1eEJgzAQBWATHKkjZAZHiCtkhKxgRnAGR+gMWSVypflRQfOeSgvlDgTxjvuSC0RTSul+EUZhhRX+bziNj0ur8tPT7OV6qEGMFJhCaNZYBA3DAKNSiyzUIs3iPEO41EgtEhbdSQtnUAo+wlmUhiWccx+4vMs3NnqmeEmpc96/norXndbc7fC28Xa0kmNwewbdPYY3fgvMjhDFm6POOUM3kf6dFFZY4a/FKsAADsZ+Lb8VFH4AAAAASUVORK5CYII=) no-repeat;
       }
       ")

    (p
       ["I threw together a Python script which converts images to encoded
         strings."])

    (code-block :python

       "
       #stringify.py
       import base64
       import sys

       f = open(sys.argv[1], 'rb')
       s = f.read()
       f.close()

       try:
           altchars = sys.argv[2]
       except IndexError:
           altchars = None

       print base64.b64encode(s, altchars)
       ")

    (h4 "Usage")

    (code-block :console

       "
       $ python stringify.py /path/to/image.png
       ")

  ]

}))
