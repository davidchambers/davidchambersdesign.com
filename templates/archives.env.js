import S from 'sanctuary';

const transformAttrs = attrs => (
  Object.fromEntries (
    Object.getOwnPropertySymbols (attrs)
    .map (k => [(String (k)).slice ('Symbol('.length, -')'.length), attrs[k]])
  )
);

export default (
  S.reduce (S.concat)
           ({})
           ([S.map (tagName =>  attrs            => ({tagName,
                                                      attrs: transformAttrs (attrs),
                                                      inline: true,
                                                      children: S.Nothing}))
                   (S.fromPairs (S.join (S.zip)
                                        (['hr',
                                          'link']))),
             S.map (tagName => (attrs, children) => ({tagName,
                                                      attrs: transformAttrs (attrs),
                                                      inline: true,
                                                      children: S.Just (children)}))
                   (S.fromPairs (S.join (S.zip)
                                        (['a',
                                          'li',
                                          'p',
                                          'span',
                                          'strong']))),
             S.map (tagName => (attrs, children) => ({tagName,
                                                      attrs: transformAttrs (attrs),
                                                      inline: false,
                                                      children: S.Just (children)}))
                   (S.fromPairs (S.join (S.zip)
                                        (['body',
                                          'div',
                                          'head',
                                          'html',
                                          'nav',
                                          'ul'])))])
);
