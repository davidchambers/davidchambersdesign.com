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

  [Symbol.for ('invoke-0')]: name => target => target[name] (),
  [Symbol.for ('invoke-1')]: name => $1 => target => target[name] ($1),
  [Symbol.for ('invoke-2')]: name => $1 => $2 => target => target[name] ($1, $2),
  [Symbol.for ('invoke-3')]: name => $1 => $2 => $3 => target => target[name] ($1, $2, $3),
  [Symbol.for ('invoke-4')]: name => $1 => $2 => $3 => $4 => target => target[name] ($1, $2, $3, $4),
  [Symbol.for ('invoke-5')]: name => $1 => $2 => $3 => $4 => $5 => target => target[name] ($1, $2, $3, $4, $5),
  [Symbol.for ('invoke-6')]: name => $1 => $2 => $3 => $4 => $5 => $6 => target => target[name] ($1, $2, $3, $4, $5, $6),
  [Symbol.for ('invoke-7')]: name => $1 => $2 => $3 => $4 => $5 => $6 => $7 => target => target[name] ($1, $2, $3, $4, $5, $6, $7),
  [Symbol.for ('invoke-8')]: name => $1 => $2 => $3 => $4 => $5 => $6 => $7 => $8 => target => target[name] ($1, $2, $3, $4, $5, $6, $7, $8),
  [Symbol.for ('invoke-9')]: name => $1 => $2 => $3 => $4 => $5 => $6 => $7 => $8 => $9 => target => target[name] ($1, $2, $3, $4, $5, $6, $7, $8, $9),

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
