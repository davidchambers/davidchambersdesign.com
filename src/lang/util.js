'use strict';

const sanctuary = require ('sanctuary');


const {
  Either,
  K,
  Left,
  Pair,
  Right,
  array,
  traverse,
} = sanctuary.unchecked;

//    B :: (b -> c) -> (a -> b) -> a -> c
const B = f => g => x => f (g (x));

//    C :: (a -> b -> c) -> b -> a -> c
const C = f => y => x => f (x) (y);

//    traverseE :: Traversable t => (a -> Either b c) -> t a -> Either b (t c)
const traverseE = traverse (Either);

//    pairs :: Array a -> Either String (Pair (Array a) (Array a))
const pairs = kvs => {
  const [ks, vs] = kvs.reduce (
    (acc, x, idx) => ((acc[idx % 2].push (x), acc)),
    [[], []],
  );
  return (
    ks.length === vs.length ?
    Right (Pair (ks) (vs)) :
    Left ('Unmatched term')
  );
};

const onArray1 = x => f => (
  array (x)
        (a => array (f (a))
                    (x))
);

const onArray2 = x => f => (
  array (x)
        (a => array (x)
                    (b => array (f (a) (b))
                                (K (K (x)))))
);

const onArray3 = x => f => (
  array (x)
        (a => array (x)
                    (b => array (x)
                                (c => array (f (a) (b) (c))
                                            (K (K (x))))))
);

module.exports = {
  B,
  C,
  onArray1,
  onArray2,
  onArray3,
  pairs,
  traverseE,
};
