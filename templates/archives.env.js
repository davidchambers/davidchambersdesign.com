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
           ([S.map (tagName =>  attrs            => ({type: 'self-closing',
                                                      tagName,
                                                      attrs: transformAttrs (attrs)}))
                   (S.fromPairs (S.join (S.zip)
                                        (['hr',
                                          'link']))),
             S.map (tagName => (attrs, children) => ({type: 'single-line',
                                                      tagName,
                                                      attrs: transformAttrs (attrs),
                                                      children}))
                   (S.fromPairs (S.join (S.zip)
                                        (['a',
                                          'li',
                                          'p',
                                          'span',
                                          'strong']))),
             S.map (tagName => (attrs, children) => ({type: 'multi-line',
                                                      tagName,
                                                      attrs: transformAttrs (attrs),
                                                      children}))
                   (S.fromPairs (S.join (S.zip)
                                        (['body',
                                          'div',
                                          'head',
                                          'html',
                                          'nav',
                                          'ul'])))])
);
