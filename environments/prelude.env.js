export default {
  [Symbol.for ('string->symbol')]: Symbol.for,
  [Symbol.for ('symbol->string')]: sym => (String (sym)).slice ('Symbol('.length, -')'.length),
};
