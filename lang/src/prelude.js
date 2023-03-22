import * as Serif from './types.js';


const isArray = name => (
  Serif.CallExpression(
    Serif.MemberExpression(Serif.Identifier('Array'), Serif.StringLiteral('isArray')),
    [Serif.Identifier(name)],
  )
);

export const map = Serif.ArrowFunctionExpression(
  [Serif.Identifier('f')],
  Serif.ArrowFunctionExpression(
    [Serif.Identifier('functor')],
    Serif.ConditionalExpression(
      isArray('functor'),
      Serif.CallExpression(
        Serif.MemberExpression(Serif.Identifier('functor'), Serif.StringLiteral('map')),
        [Serif.ArrowFunctionExpression(
          [Serif.Identifier('x')],
          Serif.CallExpression(
            Serif.Identifier('f'),
            [Serif.Identifier('x')],
          ),
        )],
      ),
      Serif.CallExpression(
        Serif.MemberExpression(Serif.Identifier('functor'), Serif.StringLiteral('fantasy-land/map')),
        [Serif.Identifier('f')],
      ),
    ),
  ),
);

export const chain = Serif.ArrowFunctionExpression(
  [Serif.Identifier('f')],
  Serif.ArrowFunctionExpression(
    [Serif.Identifier('chain')],
    Serif.ConditionalExpression(
      isArray('chain'),
      Serif.CallExpression(
        Serif.MemberExpression(Serif.Identifier('chain'), Serif.StringLiteral('flatMap')),
        [Serif.ArrowFunctionExpression(
          [Serif.Identifier('x')],
          Serif.CallExpression(
            Serif.Identifier('f'),
            [Serif.Identifier('x')],
          ),
        )],
      ),
      Serif.CallExpression(
        Serif.MemberExpression(Serif.Identifier('chain'), Serif.StringLiteral('fantasy-land/chain')),
        [Serif.Identifier('f')],
      ),
    ),
  ),
);
