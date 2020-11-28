'use strict';

module.exports = {
  [Symbol.for ('===')]: y => x => x === y,
  [Symbol.for ('-')]: y => x => x - y,
  [Symbol.for ('new')]: Constructor => args => new Constructor (...args),
  [Symbol.for ('typeof')]: x => typeof x,

  [Symbol.for ('null')]: null,
  [Symbol.for ('undefined')]: undefined,
  [Symbol.for ('true')]: true,
  [Symbol.for ('false')]: false,
  [Symbol.for ('Infinity')]: Infinity,
  [Symbol.for ('-Infinity')]: -Infinity,

  [Symbol.for ('Array')]: Array,
  [Symbol.for ('Number')]: Number,
  [Symbol.for ('Object')]: Object,
  [Symbol.for ('RegExp')]: RegExp,
  [Symbol.for ('String')]: String,
  [Symbol.for ('Symbol')]: Symbol,

  [Symbol.for ('JSON')]: JSON,
  [Symbol.for ('Math')]: Math,

  [Symbol.for ('apply')]: f => args => f (...args),
  [Symbol.for ('invoke')]: name => args => self => self[name] (...args),
};
