export default {
  [Symbol.for ('true')]: true,
  [Symbol.for ('false')]: false,

  [Symbol.for ('Object')]: Object,

  [Symbol.for ('Math')]: Math,

  [Symbol.for ('apply')]: f => args => f (...args),
  [Symbol.for ('invoke')]: name => args => self => self[name] (...args),
};
