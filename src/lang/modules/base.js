'use strict';

const {DateTime} = require ('luxon');


module.exports = {
  [Symbol.for ('===')]: y => x => x === y,
  [Symbol.for ('!==')]: y => x => x !== y,
  [Symbol.for ('<=')]: y => x => x <= y,
  [Symbol.for ('>=')]: y => x => x >= y,
  [Symbol.for ('*')]: y => x => x * y,
  [Symbol.for ('/')]: y => x => x / y,
  [Symbol.for ('+')]: y => x => x + y,
  [Symbol.for ('-')]: y => x => x - y,
  [Symbol.for ('**')]: y => x => x ** y,
  [Symbol.for ('new')]: Constructor => args => new Constructor (...args),
  [Symbol.for ('type-of')]: x => typeof x,
  [Symbol.for ('instance-of')]: Constructor => x => x instanceof Constructor,

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
  [Symbol.for ('Set')]: Set,
  [Symbol.for ('String')]: String,
  [Symbol.for ('Symbol')]: Symbol,
  [Symbol.for ('Error')]: Error,
  [Symbol.for ('SyntaxError')]: SyntaxError,

  [Symbol.for ('JSON')]: JSON,
  [Symbol.for ('Math')]: Math,

  [Symbol.for ('throw')]: x => { throw x; },
  [Symbol.for ('apply')]: f => args => f (...args),

  [Symbol.for ('datetime')]: date => time => zone => {
    const datetime = DateTime.fromFormat (
      `${date} ${time} (${Symbol.keyFor (zone)})`,
      'yyyy-MM-dd HH:mm:ss (z)',
      {setZone: true},
    );
    if (!datetime.isValid) throw new Error (datetime.invalidExplanation);
    return datetime;
  },
};
