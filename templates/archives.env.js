import S from 'sanctuary';

import {datetime} from '../lib/index.js';

const transformAttrs = attrs => (
  Object.fromEntries (
    Object.getOwnPropertySymbols (attrs)
    .map (k => [(String (k)).slice ('Symbol('.length, -')'.length), attrs[k]])
  )
);

export default (
  S.reduce (S.concat)
           ({'datetime': zone => time => date => datetime ([date, time, zone]),
             'format-datetime': format => datetime => datetime.toFormat (format),
             'iso': datetime => datetime.toISO ()})
           ([S.map (tagName => attrs             => ({'tag-name': tagName,
                                                      'format': 'inline',
                                                      'self-closing': true,
                                                      'attrs': transformAttrs (attrs)}))
                   (S.fromPairs (S.join (S.zip)
                                        (['hr',
                                          'link']))),
             S.map (tagName => attrs => children => ({'tag-name': tagName,
                                                      'format': S.any (node => node['format'] === 'block') (children) ? 'block' : 'inline',
                                                      'self-closing': false,
                                                      'attrs': transformAttrs (attrs),
                                                      'children': children}))
                   (S.fromPairs (S.join (S.zip)
                                        (['a',
                                          'h1',
                                          'h2',
                                          'h3',
                                          'h4',
                                          'h5',
                                          'h6',
                                          'li',
                                          'p',
                                          'span',
                                          'strong',
                                          'time']))),
             S.map (tagName => attrs => children => ({'tag-name': tagName,
                                                      'format': 'block',
                                                      'self-closing': false,
                                                      'attrs': transformAttrs (attrs),
                                                      'children': children}))
                   (S.fromPairs (S.join (S.zip)
                                        (['body',
                                          'div',
                                          'head',
                                          'html',
                                          'nav',
                                          'ol',
                                          'ul'])))])
);
