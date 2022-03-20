{
  const expression = require('./expression.js');
}

Start
  = _ expr:Expression _
  { return expr; }

_Expression
  = _ expr:Expression
  { return expr; }

LineTerminator "line terminator"
  = '\u000A' // LINE FEED (LF)
  / '\u000D' // CARRIAGE RETURN (CR)
  / '\u2028' // LINE SEPARATOR
  / '\u2029' // PARAGRAPH SEPARATOR

Whitespace "whitespace"
  = LineTerminator
  / '\u0009' // CHARACTER TABULATION
  / '\u000B' // LINE TABULATION
  / '\u000C' // FORM FEED (FF)
  / '\u0020' // SPACE
  / '\u00A0' // NO-BREAK SPACE
  / '\u1680' // OGHAM SPACE MARK
  / '\u2000' // EN QUAD
  / '\u2001' // EM QUAD
  / '\u2002' // EN SPACE
  / '\u2003' // EM SPACE
  / '\u2004' // THREE-PER-EM SPACE
  / '\u2005' // FOUR-PER-EM SPACE
  / '\u2006' // SIX-PER-EM SPACE
  / '\u2007' // FIGURE SPACE
  / '\u2008' // PUNCTUATION SPACE
  / '\u2009' // THIN SPACE
  / '\u200A' // HAIR SPACE
  / '\u202F' // NARROW NO-BREAK SPACE
  / '\u205F' // MEDIUM MATHEMATICAL SPACE
  / '\u3000' // IDEOGRAPHIC SPACE
  / '\uFEFF' // BYTE ORDER MARK

Comment "comment"
  = ';' (!LineTerminator .)*

_
  = (Comment / Whitespace)*

IdentChar "identifier character"
  = !Whitespace
    !'\u0022' // QUOTATION MARK
    !'\u0028' // LEFT PARENTHESIS
    !'\u0029' // RIGHT PARENTHESIS
    !'\u003B' // SEMICOLON
    !'\u005B' // LEFT SQUARE BRACKET
    !'\u005D' // RIGHT SQUARE BRACKET
    !'\u007B' // LEFT CURLY BRACKET
    !'\u007D' // RIGHT CURLY BRACKET
    .

dec = [0-9]
bin = [0-1]
oct = [0-7]
hex = [0-9A-F]

Expression
  = Number
  / String
  / Symbol
  / Identifier
  / Parenthesized
  / Bracketed
  / Braced

// ----- Numbers -----

Number "number"
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber "binary number"
  = Zero 'b' digits:$(bin+)
  { return expression.number(parseInt(digits, 2)); }

OctalNumber "octal number"
  = Zero 'o' digits:$(oct+)
  { return expression.number(parseInt(digits, 8)); }

HexadecimalNumber "hexadecimal number"
  = Zero 'x' digits:$(hex+)
  { return expression.number(parseInt(digits, 16)); }

DecimalNumber "decimal number"
  = Minus? Int Frac? Exp?
  { return expression.number(parseFloat(text())); }

Int
  = Zero
  / (Nonzero dec*)

Frac
  = DecimalPoint dec+

Exp
  = E (Minus / Plus)? dec+

Minus
  = '-'

Plus
  = '+'

E
  = 'e'

DecimalPoint
  = '.'

Zero
  = '0'

Nonzero
  = [1-9]

// ----- Strings -----

String "string"
  = '"' chars:(Char*) '"'
  { return expression.string(chars.join('')); }

Char
  = '\\' '"'  { return '"'; }
  / '\\' '\\' { return '\\'; }
  / '\\' 'b'  { return '\b'; }
  / '\\' 'f'  { return '\f'; }
  / '\\' 'n'  { return '\n'; }
  / '\\' 'r'  { return '\r'; }
  / '\\' 't'  { return '\t'; }
  / '\\' 'u' digits:$(hex hex hex hex)
              { return String.fromCharCode(parseInt(digits, 16)); }
  / '\\'      { expected('valid escape sequence'); }
  / [^"]

// ----- Symbols -----

Symbol "symbol"
  = ':' name:$(IdentChar+)
  { return expression.symbol(name); }

// ----- Identifier -----

Identifier "identifier"
  = name:$(IdentChar+)
  { return expression.identifier(name); }

Parenthesized
  = _ '('
    elements:(
      head:_Expression
      tail:(Whitespace+ expr:_Expression { return expr; })*
      { return [head, ...tail]; }
    )?
    _ ')'
    { return expression.parenthesized(elements ?? []); }

Bracketed
  = _ '['
    elements:(
      head:_Expression
      tail:(Whitespace+ expr:_Expression { return expr; })*
      { return [head, ...tail]; }
    )?
    _ ']'
    { return expression.bracketed(elements ?? []); }

Braced
  = _ '{'
    elements:(
      head:_Expression
      tail:(Whitespace+ expr:_Expression { return expr; })*
      { return [head, ...tail]; }
    )?
    _ '}'
    { return expression.braced(elements ?? []); }
