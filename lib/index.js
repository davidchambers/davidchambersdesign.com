import fs from 'fs';
import {basename} from 'path';
import {fileURLToPath} from 'url';
import {inspect} from 'util';

import Future from 'fluture';
import fst from 'fluture-sanctuary-types';
import luxon from 'luxon';
import sanctuary from 'sanctuary';


const S = sanctuary.create ({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: sanctuary.env.concat (fst.env),
});

const {
  I,
  Just,
  K,
  Left,
  Maybe,
  Nothing,
  Pair,
  Right,
  append,
  chain,
  compose: B,
  concat,
  either,
  equals,
  flip,
  foldMap,
  fromPairs,
  groupBy,
  head,
  insert,
  join,
  joinWith,
  justs,
  lift2,
  lines,
  map,
  mapLeft,
  match,
  maybe,
  maybe_,
  of,
  on,
  pair,
  pairs,
  pipe,
  prepend,
  prop,
  reduce,
  sequence,
  show,
  size,
  sortBy,
  splitOn,
  stripPrefix,
  toLower,
  traverse,
  unlines,
  value,
  unchecked: {
    insert: _insert,
    value: _value,
  },
} = S;

const {
  fork,
  node,
  reject,
  resolve,
} = Future;

const {
  DateTime: {
    fromFormat,
  },
} = luxon;

//    $ :: String -> StrMap String -> Array Node -> Node
const $ = tagName => attrs => children => ({
  [Symbol.for ('tag-name')]: tagName,
  [Symbol.for ('attrs')]: attrs,
  [Symbol.for ('format')]: 'block',
  [Symbol.for ('self-closing')]: false,
  [Symbol.for ('children')]: children,
});

//    _ :: String -> StrMap String -> Array Node -> Node
const _ = tagName => attrs => children => ({
  [Symbol.for ('tag-name')]: tagName,
  [Symbol.for ('attrs')]: attrs,
  [Symbol.for ('format')]: children.some (node => node[Symbol.for ('format')] === 'block') ? 'block' : 'inline',
  [Symbol.for ('self-closing')]: false,
  [Symbol.for ('children')]: children,
});

//    x :: String -> StrMap String -> Node
const x = tagName => attrs => ({
  [Symbol.for ('tag-name')]: tagName,
  [Symbol.for ('attrs')]: attrs,
  [Symbol.for ('format')]: 'inline',
  [Symbol.for ('self-closing')]: true,
});

//    reduce_ :: Foldable f => (b -> a -> a) -> a -> f b -> a
const reduce_ = B (reduce) (flip);

//    escape :: String -> String
const escape = text => (
  text
  .replace (/&/g, '&amp;')
  .replace (/</g, '&lt;')
  .replace (/>/g, '&gt;')
);

//    readFile :: String -> Future Error String
const readFile = path => (
  node (done => fs.readFile (path, {encoding: 'utf8'}, done))
);

//           datetime :: Array3 String String String -> DateTime
export const datetime = ([date, time, zone]) =>
  fromFormat (
    `${date}, ${time.replace (/(?=[ap]m)/, ' ')} (${zone})`,
    'd MMMM y, t (z)',
    {setZone: true}
  );

//    toFormat :: String -> DateTime -> String
const toFormat = format => dt => dt.toFormat (format);

//    title :: String -> Maybe String
const title = pipe ([
  lines,
  map (stripPrefix ('# ')),
  justs,
  head,
]);

//    metadata :: String -> Maybe ???
const metadata = pipe ([
  lines,
  reduce_ (pipe ([match (/^([^:]*): (.*)$/),
                  maybe (Left)
                        (pipe ([prop ('groups'),
                                justs,
                                ([k, v]) => B (Right)
                                              (append (Pair (k) (v)))])),
                  chain]))
          (Right ([])),
  either (Just) (K (Nothing)),
  map (fromPairs),
  map (join (B (maybe (I) (B (_insert ('tags')) (splitOn (', '))))
               (_value ('tags')))),
  map (join (B (maybe (I) (B (_insert ('datetime')) (datetime)))
               (B (sequence (Maybe))
                  (B (flip (map) (['date', 'time', 'zone']))
                     (flip (_value)))))),
]);

//    parsePost :: String -> Maybe { slug :: String, title :: String, date :: String, time :: String, zone :: String, datetime :: DateTime }
const parsePost = filename => text =>
  map (_insert ('slug') ((basename (filename, '.text')).replace (/^[^=]+=/, '')))
      (lift2 (_insert ('title'))
             (title (text))
             (metadata (text)));

//    fromSymbol :: Symbol -> String
const fromSymbol = sym => (String (sym)).slice ('Symbol('.length, -')'.length);

//           render :: String -> Integer -> Boolean -> Array Node -> String
export const render = indent => level => inline => (
  foldMap (String)
          (node => {
             if (typeof node === 'string') return escape (node);

             const indentation = indent.repeat (level);

             const rawAttrs = node[Symbol.for ('attrs')];
             const attrs = pipe ([
               Object.getOwnPropertySymbols,
               map (k => [fromSymbol (k), rawAttrs[k]]),
               Object.fromEntries,
               pairs,
               foldMap (String) (([k, v]) => ` ${k}="${v}"`),
             ]) (rawAttrs);

             if (node[Symbol.for ('self-closing')]) {
               return indentation + '<' + fromSymbol (node[Symbol.for ('tag-name')]) + attrs + ' />\n';
             } else if (node[Symbol.for ('format')] === 'inline') {
               return indentation + '<' + fromSymbol (node[Symbol.for ('tag-name')]) + attrs + '>' +
                      render (indent) (0) (true) (node[Symbol.for ('children')]) +
                      '</' + fromSymbol (node[Symbol.for ('tag-name')]) + '>' + (inline ? '' : '\n');
             } else if (node[Symbol.for ('format')] === 'block') {
               return indentation + '<' + fromSymbol (node[Symbol.for ('tag-name')]) + attrs + '>\n' +
                      render (indent) (level + 1) (false) (node[Symbol.for ('children')]) +
                      indentation + '</' + fromSymbol (node[Symbol.for ('tag-name')]) + '>\n';
             }
           })
);

const program = pipe ([
  map (join (Pair)),
  traverse (Future) (traverse (Future) (readFile)),
  map (traverse (Maybe) (pair (parsePost))),
  chain (maybe (reject ('Post parsing failed')) (resolve)),
  map (sortBy (B (Number) (prop ('datetime')))),
  map (groupBy (on (equals) (B (toFormat ('y-MM')) (prop ('datetime'))))),
  map (map (B (mapLeft (([post]) => toFormat ('MMMM y') (post.datetime)))
              (join (Pair)))),
  map (map (([month, posts]) =>
              $ ('li')
                ({})
                ([_ ('h2') ({}) ([month]),
                  $ ('ol')
                    ({})
                    (map (post =>
                            _ ('li')
                              ({})
                              ([_ ('a') ({href: `/TK/${post.slug}`}) ([post.title]),
                                ' ',
                                _ ('time')
                                  ({datetime: post.datetime.toISO ()})
                                  ([toFormat ('d MMMM y | h:mm') (post.datetime) +
                                    toLower (toFormat ('a') (post.datetime))])]))
                         (posts))]))),
  map (groups =>
         render ('    ')
                (0)
                (false)
                ([$ ('html')
                    ({})
                    ([$ ('head')
                        ({})
                        ([x ('link') ({rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/reset.css', media: 'all'}),
                          x ('link') ({rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/print.css', media: 'print'}),
                          x ('link') ({rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/screen.css', media: 'screen'})]),
                      $ ('body')
                        ({})
                        ([$ ('div')
                            ({id: 'wrap'})
                            ([$ ('div')
                                ({id: 'header'})
                                ([_ ('a') ({id: 'title', href: '/TK'}) (['David Chambers Design']),
                                  x ('hr') ({}),
                                  _ ('p') ({}) (["It's where I share interesting info with other web geeks"]),
                                  $ ('nav')
                                    ({id: 'nav'})
                                    ([$ ('ul')
                                        ({})
                                        ([_ ('li')
                                            ({})
                                            ([_ ('a')
                                                ({href: '/TK/about/'})
                                                ([_ ('span')
                                                    ({})
                                                    ([_ ('strong') ({}) (['About.']),
                                                      ' Who I am and what I do.'])])]),
                                          _ ('li')
                                            ({})
                                            ([_ ('a')
                                                ({href: '/TK/contact/'})
                                                ([_ ('span')
                                                    ({})
                                                    ([_ ('strong') ({}) (['Contact.']),
                                                      ' Just in case you want to get in touch.'])])]),
                                          _ ('li')
                                            ({})
                                            ([_ ('a')
                                                ({href: '/TK/archives/'})
                                                ([_ ('span')
                                                    ({})
                                                    ([_ ('strong') ({}) (['Archives.']),
                                                      " Old posts, recent posts, they're all here."])])]),
                                          _ ('li')
                                            ({})
                                            ([_ ('a')
                                                ({href: '/TK/tags/'})
                                                ([_ ('span')
                                                    ({})
                                                    ([_ ('strong') ({}) (['Tags.']),
                                                      " Helpful if you're after posts on a particular topic."])])]),
                                          _ ('li')
                                            ({})
                                            ([_ ('a')
                                                ({href: '/TK/bitbucket/'})
                                                ([_ ('span')
                                                    ({})
                                                    ([_ ('strong') ({}) (['Bitbucket.']),
                                                      ' Who I am and what I do.'])])])])])]),
                              $ ('div')
                                ({id: 'main'})
                                ([_ ('h1') ({}) (['Archives']),
                                  $ ('ol') ({class: 'archives'}) (groups)])])])])])),
]);

if (process.argv[1] === fileURLToPath (import.meta.url)) {
  fork (s => { process.stderr.write (s + '\n'); })
       (s => { process.stdout.write (s); })
       (program (process.argv.slice (2)));
}
