const $prototype = {};
const Any = globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Any",
  $size: 0
});
const Boolean = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Boolean",
  $size: 1,
  [0]: value,
  value
});
const Number = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Number",
  $size: 1,
  [0]: value,
  value
});
const String = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "String",
  $size: 1,
  [0]: value,
  value
});
const Identifier = name => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Identifier",
  $size: 1,
  [0]: name,
  name
});
const Data = name => pattern => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Data",
  $size: 2,
  [0]: name,
  [1]: pattern,
  name,
  pattern
});
const Object = properties => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Object",
  $size: 1,
  [0]: properties,
  properties
});
const Property = name => pattern => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Property",
  $size: 2,
  [0]: name,
  [1]: pattern,
  name,
  pattern
});
const Array = patterns => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Array",
  $size: 1,
  [0]: patterns,
  patterns
});
const Slice = pattern => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "Slice",
  $size: 1,
  [0]: pattern,
  pattern
});
const As = name => pattern => globalThis.Object.assign(globalThis.Object.create($prototype), {
  $tag: "As",
  $size: 2,
  [0]: name,
  [1]: pattern,
  name,
  pattern
});
export {Any, Boolean, Number, String, Identifier, Data, Object, Property, Array, Slice, As};
