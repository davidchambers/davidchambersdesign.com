const {Operator, EsOperator} = (() => {
  const $prototype = {};
  const Operator = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Operator",
    $values: [value],
    value
  });
  const EsOperator = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "EsOperator",
    $values: [value],
    value
  });
  return {
    Operator,
    EsOperator
  };
})();
export {Operator, EsOperator};
