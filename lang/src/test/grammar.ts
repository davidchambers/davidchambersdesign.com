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
  ':foo',
  Serif.SymbolLiteral('foo')
);

valid(
  ':foo-bar',
  Serif.SymbolLiteral('foo-bar')
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
  '#[#[#[:foo :bar :baz]]]',
  Serif.ArrayExpression([
    Serif.ArrayExpression([
      Serif.ArrayExpression([
        Serif.SymbolLiteral('foo'),
        Serif.SymbolLiteral('bar'),
        Serif.SymbolLiteral('baz'),
      ]),
    ]),
  ])
);

valid(
  '#{}',
  Serif.ObjectExpression([])
);

valid(
  '#{:foo 1 :bar 2 :baz 3}',
  Serif.ObjectExpression([
    Serif.Property(Serif.SymbolLiteral('foo'), Serif.NumberLiteral(1)),
    Serif.Property(Serif.SymbolLiteral('bar'), Serif.NumberLiteral(2)),
    Serif.Property(Serif.SymbolLiteral('baz'), Serif.NumberLiteral(3)),
  ])
);

valid(
  '#{:foo #{:bar #{:baz 8}}}',
  Serif.ObjectExpression([
    Serif.Property(
      Serif.SymbolLiteral('foo'),
      Serif.ObjectExpression([
        Serif.Property(
          Serif.SymbolLiteral('bar'),
          Serif.ObjectExpression([
            Serif.Property(
              Serif.SymbolLiteral('baz'),
              Serif.NumberLiteral(8),
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
