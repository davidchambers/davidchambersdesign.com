import test from 'oletus';

import serif from '../index.js';
import * as Serif from '../types.js';


const valid = (input: string, expected: Serif.Node) => (
  test(`parse(${JSON.stringify(input)})`, t => {
    t.deepEqual(
      serif.parse(input, '[test]'),
      Serif.Module([Serif.ExpressionStatement(expected)])
    );
  })
);

valid(
  'true',
  Serif.BooleanLiteral(true)
);

valid(
  'false',
  Serif.BooleanLiteral(false)
);

valid(
  '0',
  Serif.NumberLiteral(0)
);

valid(
  '12.34',
  Serif.NumberLiteral(12.34)
);

valid(
  '-56.78',
  Serif.NumberLiteral(-56.78)
);

valid(
  '0b1010',
  Serif.NumberLiteral(0b1010)
);

valid(
  '0o777',
  Serif.NumberLiteral(0o777)
);

valid(
  '0xFF',
  Serif.NumberLiteral(0xFF)
);

valid(
  '""',
  Serif.StringLiteral('')
);

valid(
  '"foo"',
  Serif.StringLiteral('foo')
);

valid(
  '"\\n"',
  Serif.StringLiteral('\n')
);

valid(
  '#[]',
  Serif.ArrayExpression([])
);

valid(
  '#[1 2 3]',
  Serif.ArrayExpression([
    Serif.NumberLiteral(1),
    Serif.NumberLiteral(2),
    Serif.NumberLiteral(3),
  ])
);

valid(
  '#{}',
  Serif.ObjectExpression([])
);

valid(
  'if foo then bar else baz',
  Serif.ConditionalExpression(
    Serif.Identifier('foo'),
    Serif.Identifier('bar'),
    Serif.Identifier('baz'),
  )
);
