import S from 'sanctuary';

const transformAttrs = attrs => Object.fromEntries ((Object.getOwnPropertySymbols (attrs)).map (k => [(String (k)).slice ('Symbol('.length, -')'.length), attrs[k]]));

export default {
  a: (attrs, children) => ({tagName: 'a', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: true}),
  body: (attrs, children) => ({tagName: 'body', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: false}),
  div: (attrs, children) => ({tagName: 'div', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: false}),
  head: (attrs, children) => ({tagName: 'head', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: false}),
  hr: (attrs, children) => ({tagName: 'hr', attrs: transformAttrs (attrs), children: S.Nothing, inline: true}),
  html: (attrs, children) => ({tagName: 'html', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: false}),
  li: (attrs, children) => ({tagName: 'li', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: true}),
  link: (attrs) => ({tagName: 'link', attrs: transformAttrs (attrs), children: S.Nothing, inline: true}),
  nav: (attrs, children) => ({tagName: 'nav', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: false}),
  p: (attrs, children) => ({tagName: 'p', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: true}),
  span: (attrs, children) => ({tagName: 'span', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: true}),
  strong: (attrs, children) => ({tagName: 'strong', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: true}),
  ul: (attrs, children) => ({tagName: 'ul', attrs: transformAttrs (attrs), children: S.Just (children.flat (1)), inline: false}),
};
