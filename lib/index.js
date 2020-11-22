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
const $ = tagName => attrs => children => ({tagName, attrs, children, inline: false});

//    _ :: String -> StrMap String -> Array Node -> Node
const _ = tagName => attrs => children => ({tagName, attrs, children, inline: true});

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

//    datetime :: Array3 String String String -> DateTime
const datetime = ([date, time, zone]) =>
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

//    render :: String -> Integer -> Boolean -> Array Node -> String
const render = indent => level => inline => (
  foldMap (String)
          (node =>
             typeof node === 'string'
             ? escape (node)
             : maybe (indentation => attrs =>
                        node.inline
                        ? indentation + '<' + node.tagName + attrs + ' />' + (inline ? '' : '\n')
                        : indentation + '<' + node.tagName + attrs + '\n' + indentation + '/>' + '\n')
                     (children => indentation => attrs =>
                        node.inline
                        ? indentation + '<' + node.tagName + attrs + '>' + render (indent) (0) (true) (children) + '</' + node.tagName + '>' + (inline ? '' : '\n')
                        : indentation + '<' + node.tagName + attrs + '>' + '\n' + render (indent) (level + 1) (false) (children) + indentation + '</' + node.tagName + '>\n')
                     (node.children)
                     (indent.repeat (level))
                     (foldMap (String) (([k, v]) => ` ${k}="${v}"`) (pairs (node.attrs))))
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
                (Just ([_ ('h2') ({}) (Just ([month])),
                        $ ('ol')
                          ({})
                          (Just (map (post =>
                                        _ ('li')
                                          ({})
                                          (Just ([_ ('a') ({href: `/TK/${post.slug}`}) (Just ([post.title])),
                                                  ' ',
                                                  _ ('time')
                                                    ({datetime: post.datetime.toISO ()})
                                                    (Just ([toFormat ('d MMMM y | h:mm') (post.datetime) +
                                                            toLower (toFormat ('a') (post.datetime))]))])))
                                     (posts)))])))),
  map (groups =>
         render ('    ')
                (0)
                (false)
                ([$ ('html')
                    ({})
                    (Just ([$ ('head')
                              ({})
                              (Just ([_ ('link') ({rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/reset.css', media: 'all'}) (Nothing),
                                      _ ('link') ({rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/print.css', media: 'print'}) (Nothing),
                                      _ ('link') ({rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/davidchambers/davidchambersdesign.com@e76370b258761898ea0b63d1e14aa4caa4e7c359/src/css/screen.css', media: 'screen'}) (Nothing)])),
                            $ ('body')
                              ({})
                              (Just ([$ ('div')
                                        ({id: 'wrap'})
                                        (Just ([$ ('div')
                                                  ({id: 'header'})
                                                  (Just ([_ ('a') ({id: 'title', href: '/TK'}) (Just (['David Chambers Design'])),
                                                          _ ('hr') ({}) (Nothing),
                                                          _ ('p') ({}) (Just (["It's where I share interesting info with other web geeks"])),
                                                          $ ('nav')
                                                            ({id: 'nav'})
                                                            (Just ([$ ('ul')
                                                                      ({})
                                                                      (Just ([_ ('li')
                                                                                ({})
                                                                                (Just ([_ ('a')
                                                                                          ({href: '/TK/about/'})
                                                                                          (Just ([_ ('span')
                                                                                                    ({})
                                                                                                    (Just ([_ ('strong') ({}) (Just (['About.'])),
                                                                                                            ' Who I am and what I do.']))]))])),
                                                                              _ ('li')
                                                                                ({})
                                                                                (Just ([_ ('a')
                                                                                          ({href: '/TK/contact/'})
                                                                                          (Just ([_ ('span')
                                                                                                    ({})
                                                                                                    (Just ([_ ('strong') ({}) (Just (['Contact.'])),
                                                                                                            ' Just in case you want to get in touch.']))]))])),
                                                                              _ ('li')
                                                                                ({})
                                                                                (Just ([_ ('a')
                                                                                          ({href: '/TK/archives/'})
                                                                                          (Just ([_ ('span')
                                                                                                    ({})
                                                                                                    (Just ([_ ('strong') ({}) (Just (['Archives.'])),
                                                                                                            " Old posts, recent posts, they're all here."]))]))])),
                                                                              _ ('li')
                                                                                ({})
                                                                                (Just ([_ ('a')
                                                                                          ({href: '/TK/tags/'})
                                                                                          (Just ([_ ('span')
                                                                                                    ({})
                                                                                                    (Just ([_ ('strong') ({}) (Just (['Tags.'])),
                                                                                                            " Helpful if you're after posts on a particular topic."]))]))])),
                                                                              _ ('li')
                                                                                ({})
                                                                                (Just ([_ ('a')
                                                                                          ({href: '/TK/bitbucket'})
                                                                                          (Just ([_ ('span')
                                                                                                    ({})
                                                                                                    (Just ([_ ('strong') ({}) (Just (['Bitbucket.'])),
                                                                                                            ' Who I am and what I do.']))]))]))]))]))])),
                                                $ ('div')
                                                  ({id: 'main'})
                                                  (Just ([$ ('h1') ({}) (Just (['Archives'])),
                                                          $ ('ol') ({class: 'archives'}) (Just (groups))]))]))]))]))])),
]);

if (process.argv[1] === fileURLToPath (import.meta.url)) {
  fork (s => { process.stderr.write (s + '\n'); })
       (s => { process.stdout.write (s); })
       (program (process.argv.slice (2)));
}
