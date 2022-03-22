(import* [:base "../elements" "../components"] {

  :id 83

  :title "Changing the colour of list bullets using CSS"

  :datetime (datetime "2011-04-13" "17:30:00" :America/Los_Angeles)

  :tags [:css :meaningful-markup]

  :body [

    (p
       ["So, you're about to style an unordered list of some sort..."])

    (code-block :html

       "
       <h1>TXJS 2011 Speakers</h1>
       <ul>
         <li>Brendan Eich</li>
         <li>Alex Russell</li>
         <li>Douglas Crockford</li>
         <li>Paul Irish</li>
       </ul>
       ")

    (p
       ["You've decided upon hanging square bullets in a light grey –
         nothing too distracting..."])

    (code-block :css

       "
       ul {
         list-style: square outside;
         color: #ccc;
       }
       li {
         color: #000;
       }
       ")

    (p
       ["This should do the trick, but doesn't for some reason! How the heck
         does one target the bullets and only the bullets? As far as I know
         it's not possible."])

    (h3' {:id "conventional-hack"} "Conventional hack")

    (code-block :html

       "
       <h1>TXJS 2011 Speakers</h1>
       <ul>
         <li><span>Brendan Eich</span></li>
         <li><span>Alex Russell</span></li>
         <li><span>Douglas Crockford</span></li>
         <li><span>Paul Irish</span></li>
       </ul>

       <style>
         ul {
           list-style: square outside;
           color: #ccc;
         }
         li > span {
           color: #000;
         }
       </style>
       ")

    (p
       ["This gets the job done, but those " (code "span") "s are ugly –
         there are ways to achieve the desired visual effect without
         hacking the markup."])

    (h3' {:id "background-image-technique"} "Background image technique")

    (code-block :css

       "
       ul {
         list-style: none;
       }
       li {
         margin-left: -12px;
         background: url(bullet.png) no-repeat 0;
         text-indent: 12px;
       }
       ")

    (p
       ["This requires very little CSS. To avoid incurring the overhead
         of an extra HTTP request, one could Base64-encode the image in a "
        (a "http://en.wikipedia.org/wiki/Data_URI_scheme#CSS" "data URI") "."])

    (h3' {:id "pseudo-element-technique"} "Pseudo-element technique")

    (code-block :css

       "
       ul {
         list-style: none;
       }
       li {
         position: relative;
       }
       li:before {
         position: absolute;
         top: 8px;
         margin: 8px 0 0 -12px;
           /* accommodate Camino */
           vertical-align: middle;
           display: inline-block;
         width: 4px;
         height: 4px;
         background: #ccc;
         content: \"\";
       }
       ")

    (p
       ["So it's possible to fashion square bullets of any colour
         with just a handful of straightforward declarations. Nice!"])

    (p
       ["Prefer round bullets? No problem. :)"])

    (code-block :css

       "
       ...
       -webkit-border-radius: 2px;
       -moz-border-radius: 2px;
       border-radius: 2px;
       ...
       ")

  ]

})