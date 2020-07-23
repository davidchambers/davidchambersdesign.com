import fs from 'fs';
import {basename} from 'path';
import {fileURLToPath} from 'url';
import {inspect} from 'util';

import Future from 'fluture';
import fst from 'fluture-sanctuary-types';
import luxon from 'luxon';
import sanctuary from 'sanctuary';

import {$h2, $ol, $li, h2, ol, li, a, time} from './html.js';


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

const reduce_ = B (reduce) (flip);

//    apply2way :: (b -> c -> d) -> (a -> b) -> (a -> c) -> a -> d
const apply2way = f => g => h => x => f (g (x)) (h (x));

const readFile = options => path =>
  node (done => fs.readFile (path, options, done));

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

const render = indent => function recur(level) { return inline => elements =>
  joinWith ('')
           (map (e => {
                   if (typeof e === 'string') return e;
                   const indentation = indent.repeat (level);
                   const open = '<' + e.tagName + map (([k, v]) => ` ${k}="${v}"`) (pairs (e.attrs)) + '>';
                   const close = '</' + e.tagName + '>';
                   return e.inline ?
                          indentation + open + recur (0) (true) (e.children) + close + (inline ? '' : '\n') :
                          indentation + open + '\n' + recur (level + 1) (false) (e.children) + indentation + close + '\n';
                 })
                (elements));
};

const program = pipe ([
  map (join (Pair)),
  traverse (Future) (traverse (Future) (readFile ({encoding: 'utf8'}))),
  map (traverse (Maybe) (pair (parsePost))),
  chain (maybe (reject ('Post parsing failed')) (resolve)),
  map (sortBy (B (Number) (prop ('datetime')))),
  map (groupBy (on (equals) (B (toFormat ('y-MM')) (prop ('datetime'))))),
  map (map (B (mapLeft (([post]) => toFormat ('MMMM y') (post.datetime)))
              (join (Pair)))),
  map (map (([month, posts]) =>
              $li ({})
                  ([h2 ({}) ([month]),
                    $ol ({})
                        (map (post =>
                                li ({})
                                   ([a ({href: `/TK/${post.slug}`}) ([post.title]),
                                     ' ',
                                     time ({datetime: post.datetime.toISO()})
                                          ([toFormat ('d MMMM y | h:mm') (post.datetime) +
                                            toLower (toFormat ('a') (post.datetime))])]))
                             (posts))]))),
  map ($ol ({class: 'archives'})),
  map (of (Array)),
  map (render ('    ') (4) (false)),
]);

if (process.argv[1] === fileURLToPath (import.meta.url)) {
  fork (s => { process.stderr.write (s + '\n'); })
       (s => { process.stdout.write (s); })
       (program (process.argv.slice (2)));
}
