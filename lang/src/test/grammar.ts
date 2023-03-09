import test from 'oletus';

import serif from '../index.js';
import * as Serif from '../types.js';


const valid = (input: string, expected: Serif.Expression) => (
  test(`parse(${JSON.stringify(input)})`, t => {
    t.deepEqual(
      serif.parse(input, '[test]'),
      Serif.Module([], [], [Serif.ExpressionStatement(expected)])
    );
  })
);

valid(
  'true',
  Serif.Boolean(true)
);

valid(
  'false',
  Serif.Boolean(false)
);

valid(
  '0',
  Serif.Number(0)
);

valid(
  '12.34',
  Serif.Number(12.34)
);

valid(
  '-56.78',
  Serif.Number(-56.78)
);

valid(
  '0b1010',
  Serif.Number(0b1010)
);

valid(
  '0o777',
  Serif.Number(0o777)
);

valid(
  '0xFF',
  Serif.Number(0xFF)
);

valid(
  '""',
  Serif.String('')
);

valid(
  '"foo"',
  Serif.String('foo')
);

valid(
  '"\\n"',
  Serif.String('\n')
);

valid(
  ':foo',
  Serif.Symbol('foo')
);

valid(
  ':foo-bar',
  Serif.Symbol('foo-bar')
);

valid(
  '#[]',
  Serif.Array([])
);

valid(
  '#[1 2 3]',
  Serif.Array([
    Serif.Number(1),
    Serif.Number(2),
    Serif.Number(3),
  ])
);

valid(
  '#[#[#[:foo :bar :baz]]]',
  Serif.Array([
    Serif.Array([
      Serif.Array([
        Serif.Symbol('foo'),
        Serif.Symbol('bar'),
        Serif.Symbol('baz'),
      ]),
    ]),
  ])
);

valid(
  '#{}',
  Serif.Object([])
);

valid(
  '#{:foo 1 :bar 2 :baz 3}',
  Serif.Object([
    Serif.Property(Serif.Symbol('foo'), Serif.Number(1)),
    Serif.Property(Serif.Symbol('bar'), Serif.Number(2)),
    Serif.Property(Serif.Symbol('baz'), Serif.Number(3)),
  ])
);

valid(
  '#{:foo #{:bar #{:baz 8}}}',
  Serif.Object([
    Serif.Property(
      Serif.Symbol('foo'),
      Serif.Object([
        Serif.Property(
          Serif.Symbol('bar'),
          Serif.Object([
            Serif.Property(
              Serif.Symbol('baz'),
              Serif.Number(8),
            ),
          ])
        ),
      ])
    ),
  ])
);

valid(
  'if foo then bar else baz',
  Serif.ConditionalExpression(
    Serif.Identifier('foo'),
    Serif.Identifier('bar'),
    Serif.Identifier('baz'),
  )
);
