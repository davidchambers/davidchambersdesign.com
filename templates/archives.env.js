import S from 'sanctuary';

export default {
  html: (attrs, ...children) => ({tagName: 'html', attrs, children: S.Just (children.flat (1)), inline: false}),
  head: (attrs, ...children) => ({tagName: 'head', attrs, children: S.Just (children.flat (1)), inline: false}),
  link: (attrs) => ({tagName: 'link', attrs: Object.fromEntries ((Object.getOwnPropertySymbols (attrs)).map (k => [(String (k)).slice ('Symbol('.length, -')'.length), attrs[k]])), children: S.Nothing, inline: true}),
};
