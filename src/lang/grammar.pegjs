Start
  = Separator*
    expr:Expression
    Separator*
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

Separator "separator"
  = Whitespace
  / Comment

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
  / Property
  / Identifiers
  / Identifier
  / ImportStar
  / Function
  / Lambda
  / Let
  / If
  / Array
  / Object
  / Application

// ----- Numbers -----

Number "number"
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber "binary number"
  = Zero 'b' digits:$(bin+)
  { return {type: 'number', value: parseInt(digits, 2)}; }

OctalNumber "octal number"
  = Zero 'o' digits:$(oct+)
  { return {type: 'number', value: parseInt(digits, 8)}; }

HexadecimalNumber "hexadecimal number"
  = Zero 'x' digits:$(hex+)
  { return {type: 'number', value: parseInt(digits, 16)}; }

DecimalNumber "decimal number"
  = Minus? Int Frac?
  { return {type: 'number', value: parseFloat(text())}; }

Int
  = Zero
  / (Nonzero dec*)

Frac
  = DecimalPoint dec+

Minus
  = '-'

DecimalPoint
  = '.'

Zero
  = '0'

Nonzero
  = [1-9]

// ----- Strings -----

String "string"
  = '"' chars:(Char*) '"'
  { return {type: 'string', value: chars.join('')}; }

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
  { return {type: 'symbol', name}; }

// ----- Identifier -----

Property "property"
  = '#' name:$(IdentChar+)
  { return {type: 'property', name}; }

Identifiers "identifiers"
  = head:(    name:$(!'/' char:IdentChar)+ { return name; })
    tail:('/' name:$(!'/' char:IdentChar)+ { return name; })+
  { return {type: 'identifiers', head, tail}; }

Identifier "identifier"
  = head:$(IdentChar+)
  { return {type: 'identifiers', head, tail: []}; }

ImportStar "import*"
  = Separator* '('
    Separator* 'import*'
    Separator* '['
    names:(
      head:(Separator* name:Expression { return name; })
      tail:(Separator+ name:Expression { return name; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    Separator* body:Expression
    Separator* ')'
    { return {type: 'import*', names, body}; }

Function "function"
  = Separator* '('
    Separator* 'function'
    Separator* name:Identifier
    Separator* '['
    parameter:(Separator* ident:Identifier { return ident; })
    parameters:(Separator+ ident:Identifier { return ident; })*
    Separator* ']'
    Separator* body:Expression
    Separator* ')'
    { return {type: 'function', name, parameter, body: parameters.reduceRight((body, parameter) => ({type: 'lambda', parameter, body}), body)}; }

Lambda "lambda"
  = Separator* '('
    Separator* 'lambda'
    Separator* '['
    parameters:(
      head:(Separator* ident:Identifier { return ident; })
      tail:(Separator+ ident:Identifier { return ident; })*
      { return [head, ...tail]; }
    )
    Separator* ']'
    Separator* body:Expression
    Separator* ')'
    { return parameters.reduceRight((body, parameter) => ({type: 'lambda', parameter, body}), body); }

Let "let"
  = Separator* '('
    Separator* 'let'
    Separator* '['
    bindings:(
      head:(Separator* binding:Binding { return binding; })
      tail:(Separator+ binding:Binding { return binding; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    Separator* body:Expression
    Separator* ')'
    { return (bindings ?? []).reduceRight((body, [parameter, expr]) => ({type: 'application', function: {type: 'lambda', parameter, body}, argument: expr}), body); }

Binding "binding"
  = Separator* ident:Identifier
    Separator+ expr:Expression
    { return [ident, expr]; }

If "if"
  = Separator* '('
    Separator* 'if'
    Separator+ predicate:Expression
    Separator+ consequent:Expression
    Separator+ alternative:Expression
    Separator* ')'
    { return {type: 'if', predicate, consequent, alternative}; }

Array
  = Separator* '['
    elements:(
      head:(Separator* expr:Expression { return expr; })
      tail:(Separator+ expr:Expression { return expr; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    { return {type: 'array', elements: elements ?? []}; }

Object
  = Separator* '{'
    entries:(
      head:(Separator* key:Expression Separator+ value:Expression { return [key, value]; })
      tail:(Separator+ key:Expression Separator+ value:Expression { return [key, value]; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    { return {type: 'object', entries: entries ?? []}; }

Application
  = Separator* '('
    Separator* func:Expression
    args:(Separator+ arg:Expression { return arg; })+
    Separator* ')'
    { return args.reduce((func, arg) => ({type: 'application', function: func, argument: arg}), func); }
