export default {
  [Symbol.for ('typeof')]: x => typeof x,

  [Symbol.for ('true')]: true,
  [Symbol.for ('false')]: false,

  [Symbol.for ('Object')]: Object,
  [Symbol.for ('String')]: String,

  [Symbol.for ('Math')]: Math,

  [Symbol.for ('apply')]: f => args => f (...args),
  [Symbol.for ('invoke')]: name => args => self => self[name] (...args),
};
