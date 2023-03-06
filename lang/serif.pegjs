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
  / ExpressionStatement

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

ExpressionStatement 'expression statement'
  = Separator* expression:Expression
  { return {type: 'ExpressionStatement', expression}; }

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
    !'\u002E' // FULL STOP
    !'\u003A' // COLON
    !'\u003B' // SEMICOLON
    !'\u005B' // LEFT SQUARE BRACKET
    !'\u005D' // RIGHT SQUARE BRACKET
    !'\u007B' // LEFT CURLY BRACKET
    !'\u007D' // RIGHT CURLY BRACKET
    .

SymbolChar 'symbol character'
  = !Whitespace
    !'\u0022' // QUOTATION MARK
    !'\u0028' // LEFT PARENTHESIS
    !'\u0029' // RIGHT PARENTHESIS
    !'\u002E' // FULL STOP
    !'\u003A' // COLON
    !'\u003B' // SEMICOLON
    !'\u005B' // LEFT SQUARE BRACKET
    !'\u005D' // RIGHT SQUARE BRACKET
    !'\u007B' // LEFT CURLY BRACKET
    !'\u007D' // RIGHT CURLY BRACKET
    .

Expression 'expression'
  = ConditionalExpression
  / Identifier
  / Lambda
  / New
  / Invocation
  / Application

Boolean 'Boolean'
  = 'true'  { return {type: 'BooleanLiteral', value: true}; }
  / 'false' { return {type: 'BooleanLiteral', value: false}; }

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

ImportMeta 'import.meta'
  = meta:'import' '.' property:'meta'
  { return {type: 'MetaProperty', meta, property}; }

MemberExpression 'member expression'
  = ImportMeta
  / object:PrimaryExpression
    properties:('.' property:Identifier { return property; } / property:Symbol { return property; })*
    { return properties.reduce((object, property) => ({type: 'MemberExpression', object, property}), object); }

Identifier 'identifier'
  = !'->' name:$(IdentChar)+
  { return {type: 'identifier', name}; }

Lambda 'lambda'
  = Separator* '('
    Separator* parameters:(ident:Identifier Separator+ { return ident; })+ '->'
    Separator+ body:Expression
    Separator* ')'
    { return parameters.reduceRight((body, parameter) => ({type: 'lambda', parameter, body}), body); }

BlockExpression 'block expression'
  = Separator* '{' statements:Statement* Separator* '}'
    { return {type: 'BlockExpression', statements}; }
  / Separator* '[' statements:Statement* Separator* ']'
    { return {type: 'BlockExpression', statements}; }

PrimaryExpression
  = Boolean
  / Number
  / String
  / Symbol
  / Array
  / Object
  / Identifier
  / BlockExpression

CallExpression
  = MemberExpression
  / Lambda
  / New
  / Invocation
  / Application
  / PrimaryExpression

UnaryOperator
  = 'typeof'
  / '+'
  / '-'
  / '~'
  / '!'

UnaryExpression
  = Separator* operator:UnaryOperator
    Separator+ argument:PrimaryExpression
    { return {type: 'UnaryExpression', operator, argument}; }
  / CallExpression

ExponentiationOperator
  = '**'

ExponentiationExpression
  = Separator*
    left:UnaryExpression
    tail:(
      Separator+ operator:ExponentiationOperator
      Separator+ right:UnaryExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

MultiplicativeOperator
  = '*'
  / '/'
  / '%'

MultiplicativeExpression
  = Separator*
    left:ExponentiationExpression
    tail:(
      Separator+ operator:MultiplicativeOperator
      Separator+ right:ExponentiationExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

AdditiveOperator
  = '+'
  / '-'

AdditiveExpression
  = Separator*
    left:MultiplicativeExpression
    tail:(
      Separator+ operator:AdditiveOperator
      Separator+ right:MultiplicativeExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

ShiftOperator
  = '<<'
  / '>>>'
  / '>>'

ShiftExpression
  = Separator*
    left:AdditiveExpression
    tail:(
      Separator+ operator:ShiftOperator
      Separator+ right:AdditiveExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

RelationalOperator
  = '<='
  / '<'
  / '>='
  / '>'
  / 'instanceof'
  / 'in'

RelationalExpression
  = Separator*
    left:ShiftExpression
    tail:(
      Separator+ operator:RelationalOperator
      Separator+ right:ShiftExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

EqualityOperator
  = '==='
  / '=='
  / '!=='
  / '!='

EqualityExpression
  = Separator*
    left:RelationalExpression
    tail:(
      Separator+ operator:EqualityOperator
      Separator+ right:RelationalExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = Separator*
    left:EqualityExpression
    tail:(
      Separator+ operator:BitwiseANDOperator
      Separator+ right:EqualityExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseXOROperator
  = '^'

BitwiseXORExpression
  = Separator*
    left:BitwiseANDExpression
    tail:(
      Separator+ oeprator:BitwiseXOROperator
      Separator+ right:BitwiseANDExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseOROperator
  = '|'

BitwiseORExpression
  = Separator*
    left:BitwiseXORExpression
    tail:(
      Separator+ operator:BitwiseOROperator
      Separator+ right:BitwiseXORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

LogicalANDOperator
  = '&&'

LogicalANDExpression
  = Separator*
    left:BitwiseORExpression
    tail:(
      Separator+ operator:LogicalANDOperator
      Separator+ right:BitwiseORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

LogicalOROperator
  = '||'

LogicalORExpression
  = Separator*
    left:LogicalANDExpression
    tail:(
      Separator+ operator:LogicalOROperator
      Separator+ right:LogicalANDExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

CoalesceOperator
  = '??'

CoalesceExpression
  = Separator*
    left:LogicalORExpression
    tail:(
      Separator+ operator:CoalesceOperator
      Separator+ right:LogicalORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

ConditionalExpression
  = Separator* 'if'
    Separator+ predicate:ConditionalExpression
    Separator+ consequent:ConditionalExpression
    Separator+ 'else'
    Separator+ alternative:ConditionalExpression
    { return {type: 'ConditionalExpression', predicate, consequent, alternative}; }
  / CoalesceExpression

SpreadElement 'spread element'
  = '...' argument:Expression
    { return {type: 'spread-element', argument}; }

Array 'array'
  = Separator* '#['
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
  = Separator* '#{'
    properties:(
      head:(Separator* property:(SpreadElement / Property) { return property; })
      tail:(Separator+ property:(SpreadElement / Property) { return property; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    { return {type: 'object', properties: properties ?? []}; }

Placeholder 'placeholder'
  = '_' !IdentChar
  { return {type: 'placeholder'}; }

New 'new'
  = Separator* '('
    Separator* 'new'
    Separator+ callee:(Placeholder / Expression)
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })*
    Separator* ')'
    { return {type: 'new', callee, arguments: args}; }

Invocation 'invocation'
  = Separator* '('
    Separator* '.' name:(ident:Identifier { return ident.name; })
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'invocation', name, object: args.pop(), arguments: args}; }

Application 'application'
  = Separator* '('
    Separator* callee:(Placeholder / Expression)
    args:(Separator+ arg:(Placeholder / SpreadElement / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'application', callee, arguments: args}; }
