'use strict';

module.exports = {
  // https://262.ecma-international.org/6.0/#sec-11.8.1
  [Symbol.for ('null')]:                null,
  // https://262.ecma-international.org/6.0/#sec-11.8.2
  [Symbol.for ('true')]:                true,
  [Symbol.for ('false')]:               false,

  // https://262.ecma-international.org/6.0/#sec-12.3.3

  // https://262.ecma-international.org/6.0/#sec-12.5.5
  [Symbol.for ('void')]:                x => void x,
  // https://262.ecma-international.org/6.0/#sec-12.5.6
  [Symbol.for ('typeof')]:              x => typeof x,
  // https://262.ecma-international.org/6.0/#sec-12.5.11
  [Symbol.for ('~')]:                   x => ~x,
  // https://262.ecma-international.org/6.0/#sec-12.5.12
  [Symbol.for ('!')]:                   x => !x,

  // https://262.ecma-international.org/6.0/#sec-12.6
  [Symbol.for ('*')]:                   y => x => x * y,
  [Symbol.for ('/')]:                   y => x => x / y,
  [Symbol.for ('%')]:                   y => x => x % y,

  // https://262.ecma-international.org/6.0/#sec-12.7
  [Symbol.for ('+')]:                   y => x => x + y,
  [Symbol.for ('-')]:                   y => x => x - y,

  // https://262.ecma-international.org/6.0/#sec-12.8
  [Symbol.for ('<<')]:                  y => x => x << y,
  [Symbol.for ('>>')]:                  y => x => x >> y,
  [Symbol.for ('>>>')]:                 y => x => x >>> y,

  // https://262.ecma-international.org/6.0/#sec-12.9
  [Symbol.for ('<')]:                   y => x => x < y,
  [Symbol.for ('>')]:                   y => x => x > y,
  [Symbol.for ('<=')]:                  y => x => x <= y,
  [Symbol.for ('>=')]:                  y => x => x >= y,
  [Symbol.for ('instanceof')]:          y => x => x instanceof y,
  [Symbol.for ('in')]:                  y => x => x in y,

  // https://262.ecma-international.org/6.0/#sec-12.10
  [Symbol.for ('==')]:                  y => x => x == y,
  [Symbol.for ('!=')]:                  y => x => x != y,
  [Symbol.for ('===')]:                 y => x => x === y,
  [Symbol.for ('!==')]:                 y => x => x !== y,

  // https://262.ecma-international.org/6.0/#sec-12.11
  [Symbol.for ('&')]:                   y => x => x & y,
  [Symbol.for ('^')]:                   y => x => x ^ y,
  [Symbol.for ('|')]:                   y => x => x | y,

  // https://262.ecma-international.org/6.0/#sec-12.12
  [Symbol.for ('&&')]:                  y => x => x && y,
  [Symbol.for ('||')]:                  y => x => x || y,

  // https://262.ecma-international.org/6.0/#sec-18.1.1
  [Symbol.for ('Infinity')]:            Infinity,
  // https://262.ecma-international.org/6.0/#sec-18.1.2
  [Symbol.for ('NaN')]:                 NaN,
  // https://262.ecma-international.org/6.0/#sec-18.1.3
  [Symbol.for ('undefined')]:           undefined,

  // https://262.ecma-international.org/6.0/#sec-18.2.1
  [Symbol.for ('eval')]:                eval,
  // https://262.ecma-international.org/6.0/#sec-18.2.2
  [Symbol.for ('isFinite')]:            isFinite,
  // https://262.ecma-international.org/6.0/#sec-18.2.3
  [Symbol.for ('isNaN')]:               isNaN,
  // https://262.ecma-international.org/6.0/#sec-18.2.4
  [Symbol.for ('parseFloat')]:          parseFloat,
  // https://262.ecma-international.org/6.0/#sec-18.2.5
  [Symbol.for ('parseInt')]:            parseInt,

  // https://262.ecma-international.org/6.0/#sec-18.2.6.2
  [Symbol.for ('decodeURI')]:           decodeURI,
  // https://262.ecma-international.org/6.0/#sec-18.2.6.3
  [Symbol.for ('decodeURIComponent')]:  decodeURIComponent,
  // https://262.ecma-international.org/6.0/#sec-18.2.6.4
  [Symbol.for ('encodeURI')]:           encodeURI,
  // https://262.ecma-international.org/6.0/#sec-18.2.6.5
  [Symbol.for ('encodeURIComponent')]:  encodeURIComponent,

  // https://262.ecma-international.org/6.0/#sec-18.3.1
  [Symbol.for ('Array')]:               Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.2
  [Symbol.for ('ArrayBuffer')]:         ArrayBuffer,
  // https://262.ecma-international.org/6.0/#sec-18.3.3
  [Symbol.for ('Boolean')]:             Boolean,
  // https://262.ecma-international.org/6.0/#sec-18.3.4
  [Symbol.for ('DataView')]:            DataView,
  // https://262.ecma-international.org/6.0/#sec-18.3.5
  [Symbol.for ('Date')]:                Date,
  // https://262.ecma-international.org/6.0/#sec-18.3.6
  [Symbol.for ('Error')]:               Error,
  // https://262.ecma-international.org/6.0/#sec-18.3.7
  [Symbol.for ('EvalError')]:           EvalError,
  // https://262.ecma-international.org/6.0/#sec-18.3.8
  [Symbol.for ('Float32Array')]:        Float32Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.9
  [Symbol.for ('Float64Array')]:        Float64Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.10
  [Symbol.for ('Function')]:            Function,
  // https://262.ecma-international.org/6.0/#sec-18.3.11
  [Symbol.for ('Int8Array')]:           Int8Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.12
  [Symbol.for ('Int16Array')]:          Int16Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.13
  [Symbol.for ('Int32Array')]:          Int32Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.14
  [Symbol.for ('Map')]:                 Map,
  // https://262.ecma-international.org/6.0/#sec-18.3.15
  [Symbol.for ('Number')]:              Number,
  // https://262.ecma-international.org/6.0/#sec-18.3.16
  [Symbol.for ('Object')]:              Object,
  // https://262.ecma-international.org/6.0/#sec-18.3.17
  [Symbol.for ('Proxy')]:               Proxy,
  // https://262.ecma-international.org/6.0/#sec-18.3.18
  [Symbol.for ('Promise')]:             Promise,
  // https://262.ecma-international.org/6.0/#sec-18.3.19
  [Symbol.for ('RangeError')]:          RangeError,
  // https://262.ecma-international.org/6.0/#sec-18.3.20
  [Symbol.for ('ReferenceError')]:      ReferenceError,
  // https://262.ecma-international.org/6.0/#sec-18.3.21
  [Symbol.for ('RegExp')]:              RegExp,
  // https://262.ecma-international.org/6.0/#sec-18.3.22
  [Symbol.for ('Set')]:                 Set,
  // https://262.ecma-international.org/6.0/#sec-18.3.23
  [Symbol.for ('String')]:              String,
  // https://262.ecma-international.org/6.0/#sec-18.3.24
  [Symbol.for ('Symbol')]:              Symbol,
  // https://262.ecma-international.org/6.0/#sec-18.3.25
  [Symbol.for ('SyntaxError')]:         SyntaxError,
  // https://262.ecma-international.org/6.0/#sec-18.3.26
  [Symbol.for ('TypeError')]:           TypeError,
  // https://262.ecma-international.org/6.0/#sec-18.3.27
  [Symbol.for ('Uint8Array')]:          Uint8Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.28
  [Symbol.for ('Uint8ClampedArray')]:   Uint8ClampedArray,
  // https://262.ecma-international.org/6.0/#sec-18.3.29
  [Symbol.for ('Uint16Array')]:         Uint16Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.30
  [Symbol.for ('Uint32Array')]:         Uint32Array,
  // https://262.ecma-international.org/6.0/#sec-18.3.31
  [Symbol.for ('URIError')]:            URIError,
  // https://262.ecma-international.org/6.0/#sec-18.3.32
  [Symbol.for ('WeakMap')]:             WeakMap,
  // https://262.ecma-international.org/6.0/#sec-18.3.33
  [Symbol.for ('WeakSet')]:             WeakSet,

  // https://262.ecma-international.org/6.0/#sec-18.4.1
  [Symbol.for ('JSON')]:                JSON,
  // https://262.ecma-international.org/6.0/#sec-18.4.2
  [Symbol.for ('Math')]:                Math,
  // https://262.ecma-international.org/6.0/#sec-18.4.3
  [Symbol.for ('Reflect')]:             Reflect,
};
