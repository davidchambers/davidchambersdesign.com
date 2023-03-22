import * as Serif from './types.js';


export const map = Serif.ArrowFunctionExpression(
  [Serif.Identifier('f')],
  Serif.ArrowFunctionExpression(
    [Serif.Identifier('functor')],
    Serif.ConditionalExpression(
      Serif.CallExpression(
        Serif.MemberExpression(Serif.Identifier('Array'), Serif.StringLiteral('isArray')),
        [Serif.Identifier('functor')],
      ),
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
