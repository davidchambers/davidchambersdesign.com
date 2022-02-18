'use strict';

const sanctuary = require ('sanctuary');

const elements = require ('./elements.js');


const {
  chain,
} = sanctuary.unchecked;

module.exports = documentTitle => main => (
  elements[Symbol.for ('html')] ([
    elements[Symbol.for ('head')] ([
      elements[Symbol.for ('meta')] ({[Symbol.for ('charset')]: 'utf-8'}),
      elements[Symbol.for ('title')]
        (chain (function plainText(node) {
           return (
             node[Symbol.for ('type')] === Symbol.for ('text') ?
               [node[Symbol.for ('value')]] :
             node[Symbol.for ('self-closing')] ?
               [] :
             // else
               chain (plainText) (node[Symbol.for ('children')])
           );
         })
        (elements[Symbol.for ('canonicalize-children')] (documentTitle))),
      elements[Symbol.for ('link')] ({
        [Symbol.for ('rel')]: 'alternate',
        [Symbol.for ('type')]: 'application/atom+xml',
        [Symbol.for ('href')]: '/feed/',
      }),
      elements[Symbol.for ('link')] ({
        [Symbol.for ('rel')]: 'stylesheet',
        [Symbol.for ('href')]: '/css/reset.css',
        [Symbol.for ('media')]: 'all',
      }),
      elements[Symbol.for ('link')] ({
        [Symbol.for ('rel')]: 'stylesheet',
        [Symbol.for ('href')]: '/css/print.css',
        [Symbol.for ('media')]: 'print',
      }),
      elements[Symbol.for ('link')] ({
        [Symbol.for ('rel')]: 'stylesheet',
        [Symbol.for ('href')]: '/css/screen.css',
        [Symbol.for ('media')]: 'screen',
      }),
      elements[Symbol.for ('link')] ({
        [Symbol.for ('rel')]: 'shortcut icon',
        [Symbol.for ('type')]: 'image/x-icon',
        [Symbol.for ('href')]: 'http://static.davidchambersdesign.com/favicon.ico',
      }),
      elements[Symbol.for ('script')] ({
        [Symbol.for ('src')]: 'http://use.typekit.com/jhk0ogh.js',
      }) ([]),
      elements[Symbol.for ('script')] ({}) ('try{Typekit.load();}catch(e){}'),
    ]),
    elements[Symbol.for ('body')] ([
      elements[Symbol.for ('div')] ({[Symbol.for ('id')]: 'skip'}) ([
        elements[Symbol.for ("a'")] ({[Symbol.for ('href')]: '#main'}) ('Skip to main content'),
      ]),
      elements[Symbol.for ('div')] ({[Symbol.for ('id')]: 'wrap'}) ([
        elements[Symbol.for ('div')] ({[Symbol.for ('id')]: 'header'}) ([
          elements[Symbol.for ('header')] ([
            elements[Symbol.for ("a'")]
              ({[Symbol.for ('id')]: 'title', [Symbol.for ('href')]: '/'})
              ('David Chambers Design'),
            elements[Symbol.for ('hr')],
            elements[Symbol.for ('p')] ("It's where I share interesting info with other web geeks"),
            elements[Symbol.for ("nav'")] ({[Symbol.for ('id')]: 'nav'}) ([
              elements[Symbol.for ('ul')] ([
                elements[Symbol.for ('li')] (
                  elements[Symbol.for ("a'")]
                    ({[Symbol.for ('href')]: '/about/'})
                    (elements[Symbol.for ('span')] ({}) ([
                       elements[Symbol.for ('strong')] ('About.'),
                       elements[Symbol.for ('text')] (' Who I am and what I do.')
                     ])),
                ),
                elements[Symbol.for ('li')] (
                  elements[Symbol.for ("a'")]
                    ({[Symbol.for ('href')]: '/contact/'})
                    (elements[Symbol.for ('span')] ({}) ([
                       elements[Symbol.for ('strong')] ('Contact.'),
                       elements[Symbol.for ('text')] (' Just in case you want to get in touch.')
                     ])),
                ),
                elements[Symbol.for ('li')] (
                  elements[Symbol.for ("a'")]
                    ({[Symbol.for ('href')]: '/archives/'})
                    (elements[Symbol.for ('span')] ({}) ([
                       elements[Symbol.for ('strong')] ('Archives.'),
                       elements[Symbol.for ('text')] (" Old posts, recent posts, they're all here.")
                     ])),
                ),
                elements[Symbol.for ('li')] (
                  elements[Symbol.for ("a'")]
                    ({[Symbol.for ('href')]: '/tags/'})
                    (elements[Symbol.for ('span')] ({}) ([
                       elements[Symbol.for ('strong')] ('Tags.'),
                       elements[Symbol.for ('text')] (" Helpful if you're after posts on a particular topic.")
                     ])),
                ),
                elements[Symbol.for ('li')] (
                  elements[Symbol.for ("a'")]
                    ({[Symbol.for ('href')]: 'https://bitbucket.org/davidchambers'})
                    (elements[Symbol.for ('span')] ({}) ([
                       elements[Symbol.for ('strong')] ('Bitbucket.'),
                       elements[Symbol.for ('text')] (' Home to most of my open-source projects.')
                     ])),
                ),
                elements[Symbol.for ('li')] (
                  elements[Symbol.for ("a'")]
                    ({[Symbol.for ('href')]: '/twitter/'})
                    (elements[Symbol.for ('span')] ({}) ([
                       elements[Symbol.for ('strong')] ('Twitter.'),
                       elements[Symbol.for ('text')] (" It's where I chirrup… or chirp… or something.")
                     ])),
                ),
              ]),
            ]),
          ]),
        ]),
        elements[Symbol.for ('div')] ({[Symbol.for ('id')]: 'main'}) (main),
      ]),
      elements[Symbol.for ('footer')] ([
        elements[Symbol.for ('p')] ([
          elements[Symbol.for ('text')] ('Powered by '),
          elements[Symbol.for ("a'")] ({[Symbol.for ('href')]: 'http://mango.io/wtf?', [Symbol.for ('data-version')]: '0.9dev'}) ('Mango'),
          elements[Symbol.for ('text')] ('. Hosted on '),
          elements[Symbol.for ("a'")] ({[Symbol.for ('href')]: 'http://www.linode.com/?r=ce523c9eeda64e4bceaf7011dc9e8558b909711d'}) ('Linode'),
          elements[Symbol.for ('text')] ('. Original content '),
          elements[Symbol.for ("a'")] ({[Symbol.for ('href')]: '/copying/'}) ('WTFPL-licensed'),
          elements[Symbol.for ('text')] ('.'),
        ]),
      ]),
    ]),
  ])
);
