Start
  = Separator*
    expr:Expression
    Separator*
    { return expr; }

LineTerminator 'line terminator'
  = '\u000A' // LINE FEED (LF)
  / '\u000D' // CARRIAGE RETURN (CR)
  / '\u2028' // LINE SEPARATOR
  / '\u2029' // PARAGRAPH SEPARATOR

Whitespace 'whitespace'
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

Comment 'comment'
  = ';' (!LineTerminator .)*

Separator 'separator'
  = Whitespace
  / Comment

SymbolChar 'symbol character'
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

IdentChar 'identifier character'
  = !Whitespace
    !'\u0022' // QUOTATION MARK
    !'\u0028' // LEFT PARENTHESIS
    !'\u0029' // RIGHT PARENTHESIS
    !'\u002E' // FULL STOP
    !'\u002F' // SOLIDUS
    !'\u003B' // SEMICOLON
    !'\u005B' // LEFT SQUARE BRACKET
    !'\u005D' // RIGHT SQUARE BRACKET
    !'\u007B' // LEFT CURLY BRACKET
    !'\u007D' // RIGHT CURLY BRACKET
    .

Expression 'expression'
  = Number
  / String
  / Symbol
  / Identifiers
  / Identifier
  / Import
  / Function
  / Lambda
  / Let
  / And
  / Or
  / If
  / Switch
  / Array
  / Object
  / New
  / Invocation
  / Application

Number 'number'
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber 'binary number'
  = '0' 'b' digits:$([0-1])+
  { return {type: 'number', value: parseInt(digits, 2)}; }

OctalNumber 'octal number'
  = '0' 'o' digits:$([0-7])+
  { return {type: 'number', value: parseInt(digits, 8)}; }

HexadecimalNumber 'hexadecimal number'
  = '0' 'x' digits:$([0-9A-F])+
  { return {type: 'number', value: parseInt(digits, 16)}; }

DecimalNumber 'decimal number'
  = ('-' / '+')?
    ('0' / ([1-9] [0-9]*))
    ('.' [0-9]+)?
  { return {type: 'number', value: parseFloat(text())}; }

String 'string'
  = '"' chars:Char* '"'
  { return {type: 'string', value: chars.join('')}; }

Char 'char'
  = '\\' '"'  { return '"'; }
  / '\\' '\\' { return '\\'; }
  / '\\' 'b'  { return '\b'; }
  / '\\' 'f'  { return '\f'; }
  / '\\' 'n'  { return '\n'; }
  / '\\' 'r'  { return '\r'; }
  / '\\' 't'  { return '\t'; }
  / '\\' 'u' digits:$([0-9A-F] [0-9A-F] [0-9A-F] [0-9A-F])
              { return String.fromCharCode(parseInt(digits, 16)); }
  / '\\'      { expected('valid escape sequence'); }
  / [^"]

Symbol 'symbol'
  = ':' name:$(SymbolChar)+
  { return {type: 'symbol', name}; }

Identifiers 'identifiers'
  = name:$(IdentChar)+
    path:(
      '.' ident:$(IdentChar)+ { return {type: 'string', value: ident}; }
    / '/' ident:$(IdentChar)+ { return {type: 'symbol', name: ident}; }
    )+
  { return {type: 'identifiers', name, path}; }

Identifier 'identifier'
  = !'->' name:$('.' / '/' / IdentChar)+
  { return {type: 'identifiers', name, path: []}; }

Import 'import'
  = Separator* '('
    Separator* 'import'
    Separator* '['
    names:(
      head:(Separator* name:Expression { return name; })
      tail:(Separator+ name:Expression { return name; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    Separator* body:Expression
    Separator* ')'
    { return {type: 'import', names, body}; }

Function 'function'
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

Lambda 'lambda'
  = Separator* '('
    Separator* parameters:(ident:Identifier Separator+ { return ident; })+ '->'
    Separator+ body:Expression
    Separator* ')'
    { return parameters.reduceRight((body, parameter) => ({type: 'lambda', parameter, body}), body); }

Let 'let'
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
    { return (bindings ?? []).reduceRight((body, [parameter, expr]) => ({type: 'application', callee: {type: 'lambda', parameter, body}, arguments: [expr]}), body); }

Binding 'binding'
  = Separator* ident:Identifier
    Separator+ expr:Expression
    { return [ident, expr]; }

And 'and'
  = Separator* '('
    Separator* 'and'
    Separator+ left:Expression
    Separator+ right:Expression
    Separator* ')'
    { return {type: 'and', left, right}; }

Or 'or'
  = Separator* '('
    Separator* 'or'
    Separator+ left:Expression
    Separator+ right:Expression
    Separator* ')'
    { return {type: 'or', left, right}; }

If 'if'
  = Separator* '('
    Separator* 'if'
    Separator+ predicate:Expression
    Separator+ consequent:Expression
    Separator+ alternative:Expression
    Separator* ')'
    { return {type: 'if', predicate, consequent, alternative}; }

Switch 'switch'
  = Separator* '('
    Separator* 'switch'
    Separator+ discriminant:Expression
    Separator+ '['
    cases:Case*
    Separator* ']'
    Separator* ')'
    { return {type: 'switch', discriminant, cases}; }

Case 'case'
  = Separator* predicate:Expression
    Separator+ consequent:Expression
    { return {predicate, consequent}; }

Array 'array'
  = Separator* '['
    elements:(
      head:(Separator* expr:Expression { return expr; })
      tail:(Separator+ expr:Expression { return expr; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    { return {type: 'array', elements: elements ?? []}; }

Object 'object'
  = Separator* '{'
    entries:(
      head:(Separator* key:Expression Separator+ value:Expression { return [key, value]; })
      tail:(Separator+ key:Expression Separator+ value:Expression { return [key, value]; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    { return {type: 'object', entries: entries ?? []}; }

Placeholder 'placeholder'
  = '_'
  { return {type: 'placeholder'}; }

New 'new'
  = Separator* '('
    Separator* 'new'
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'new', arguments: args}; }

Invocation 'invocation'
  = Separator* '('
    Separator* '.' name:Identifier
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'invocation', name, arguments: args}; }

Application 'application'
  = Separator* '('
    Separator* callee:(Placeholder / Expression)
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'application', callee, arguments: args}; }
