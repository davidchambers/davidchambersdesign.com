Module
  = statements:(
      head:(Separator* statement:Statement { return statement; })
      tail:(Separator+ statement:Statement { return statement; })*
      { return [head, ...tail]; }
    )?
    Separator*
  { return statements; }

Statement
  = StarImport
  / NamedImports
  / DefaultImport
  / DefaultExport
  / NamedExports
  / Declaration
  / Expression

StarImport 'star import'
  = Separator* 'import'
    Separator+ '*'
    Separator+ 'from'
    Separator+ source:(string:String { return string.value; })
    hiding:(
      Separator+ 'hiding'
      Separator+ '{'
      names:(
        head:(Separator* ident:Identifier { return ident.name; })
        tail:(Separator+ ident:Identifier { return ident.name; })*
        { return [head, ...tail]; }
      )?
      Separator* '}'
      { return names ?? []; }
    )?
  { return {type: 'star-import', source, hiding: hiding ?? []}; }

NamedImports 'named imports'
  = Separator* 'import'
    Separator+ '{'
    names:(
      head:(Separator* ident:Identifier { return ident.name; })
      tail:(Separator+ ident:Identifier { return ident.name; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    Separator+ 'from'
    Separator+ source:(string:String { return string.value; })
  { return {type: 'named-imports', names: names ?? [], source}; }

DefaultImport 'default import'
  = Separator* 'import'
    Separator+ 'default'
    Separator+ 'as'
    Separator+ name:(ident:Identifier { return ident.name; })
    Separator+ 'from'
    Separator+ source:(string:String { return string.value; })
  { return {type: 'default-import', name, source}; }

DefaultExport 'default export'
  = Separator* 'export'
    Separator+ 'default'
    Separator+ expression:Expression
  { return {type: 'default-export', expression}; }

NamedExports 'named exports'
  = Separator* 'export'
    Separator+ '{'
    names:(
      head:(Separator* ident:Identifier { return ident.name; })
      tail:(Separator+ ident:Identifier { return ident.name; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
  { return {type: 'named-exports', names: names ?? []}; }

Declaration 'declaration'
  = Separator* name:(ident:Identifier { return ident.name; })
    parameterNames:(Separator+ !'=' ident:Identifier { return ident.name; })*
    Separator+ '='
    Separator+ expression:Expression
  { return {type: 'declaration', name, parameterNames, expression}; }

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

IdentChar 'identifier character'
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

Expression 'expression'
  = Number
  / String
  / Symbol
  / Identifier
  / Import
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
  = ':' name:$(IdentChar)+
  { return {type: 'symbol', name}; }

Identifier 'identifier'
  = !'->' name:$(IdentChar)+
  { return {type: 'identifier', name}; }

Import 'import'
  = Separator* '('
    Separator* 'import'
    Separator* '['
    names:(
      head:(Separator* string:String { return string.value; })
      tail:(Separator+ string:String { return string.value; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    Separator* body:Expression
    Separator* ')'
    { return {type: 'import', names, body}; }

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
    { return {type: 'let', bindings, body}; }

Binding 'binding'
  = Separator* name:(ident:Identifier { return ident.name; })
    parameterNames:(Separator+ !'=' ident:Identifier { return ident.name; })*
    Separator+ '='
    Separator+ expression:Expression
    { return {name, parameterNames, expression}; }

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

Case 'case'
  = Separator* predicate:Expression
    Separator+ consequent:Expression
    { return {predicate, consequent}; }

Switch 'switch'
  = Separator* '('
    Separator* 'switch'
    Separator+ discriminant:Expression
    Separator+ '['
    cases:Case*
    Separator* ']'
    Separator* ')'
    { return {type: 'switch', discriminant, cases}; }

SpreadElement 'spread element'
  = '...' argument:Expression
    { return {type: 'spread-element', argument}; }

Array 'array'
  = Separator* '['
    elements:(
      head:(Separator* element:(SpreadElement / Expression) { return element; })
      tail:(Separator+ element:(SpreadElement / Expression) { return element; })*
      { return [head, ...tail]; }
    )?
    Separator* ']'
    { return {type: 'array', elements: elements ?? []}; }

Property 'property'
  = key:Expression Separator+ value:Expression
    { return {type: 'property', key, value}; }

Object 'object'
  = Separator* '{'
    properties:(
      head:(Separator* property:(SpreadElement / Property) { return property; })
      tail:(Separator+ property:(SpreadElement / Property) { return property; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    { return {type: 'object', properties: properties ?? []}; }

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
    Separator* '.' name:(ident:Identifier { return ident.name; })
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'invocation', name, arguments: args}; }

Application 'application'
  = Separator* '('
    Separator* callee:(Placeholder / Expression)
    args:(Separator+ arg:(Placeholder / SpreadElement / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'application', callee, arguments: args}; }
