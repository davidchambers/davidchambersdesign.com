'use strict';

const sanctuary = require ('sanctuary');


const {
  lines,
  map,
  trim,
  unwords,
} = sanctuary.unchecked;

const escape = s => (
  s
  .replace (/&/g, '&amp;')
  .replace (/</g, '&lt;')
  .replace (/>/g, '&gt;')
);

const symbolToString = sym => (
  String (sym)
  .slice ('Symbol('.length, -')'.length)
);

const $attrs = Symbol.for ('attrs');
const $children = Symbol.for ('children');
const $excerpt = Symbol.for ('excerpt');
const $format = Symbol.for ('format');
const $inline = Symbol.for ('inline');
const $selfClosing = Symbol.for ('self-closing');
const $tagName = Symbol.for ('tag-name');
const $text = Symbol.for ('text');
const $type = Symbol.for ('type');
const $value = Symbol.for ('value');

const renderFragment = module.exports = indent => level => inline => nodes => (
  nodes.reduce (
    (html, node) => {
      if (node[$type] === $text) {
        return html + escape (node[$value]);
      } else if (node[$type] === $excerpt) {
        return html +
               renderFragment (indent) (level) (inline) (node[$children]);
      } else {
        const indentation = indent.repeat (level);
        const tagName = symbolToString (node[$tagName]);
        const attrs = (
          Object.getOwnPropertySymbols (node[$attrs])
          .reduce (
            (s, sym) => (
              s +
              ' ' +
              symbolToString (sym) +
              '=' +
              '"' +
              escape (unwords (map (trim) (lines (node[$attrs][sym])))) +
              '"'
            ),
            '',
          )
        );
        if (node[$selfClosing]) {
          return html +
                 indentation + '<' + tagName + attrs + ' />' + (inline ? '' : '\n');
        } else if (node[$format] === $inline) {
          return html +
                 indentation + '<' + tagName + attrs + '>' +
                 renderFragment (indent) (0) (true) (node[$children]) +
                 '</' + tagName + '>' + (inline ? '' : '\n');
        } else {
          return html +
                 indentation + '<' + tagName + attrs + '>\n' +
                 renderFragment (indent) (level + 1) (false) (node[$children]) +
                 indentation + '</' + tagName + '>\n';
        }
      }
    },
    '',
  )
);
