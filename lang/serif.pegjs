Module
  = imports:(Separator* importDeclaration:ImportDeclaration                                   { return importDeclaration; })*
    exports:(Separator* exportDeclaration:(ExportNamedDeclaration / ExportDefaultDeclaration) { return exportDeclaration; })*
    statements:(
      head:(Separator* statement:Statement { return statement; })
      tail:(Separator+ statement:Statement { return statement; })*
      { return [head, ...tail]; }
    )?
    Separator*
  { return {type: 'Module', imports, exports, statements: statements ?? []}; }

ImportSpecifier 'import specifier'
  = local:Identifier
    { return {type: 'ImportSpecifier', local, imported: local}; }

ImportDefaultSpecifier 'import default specifier'
  = local:Identifier
    { return {type: 'ImportDefaultSpecifier', local}; }

ImportDeclaration 'import declaration'
  = 'import'
    Separator+ '{'
    specifiers:(
      head:(Separator* specifier:ImportSpecifier { return specifier; })
      tail:(Separator+ specifier:ImportSpecifier { return specifier; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    Separator+ 'from'
    Separator+ source:String
    Separator* ';'
    { return {type: 'ImportDeclaration', source, specifiers: specifiers ?? []}; }
  / 'import'
    Separator+ '*'
    Separator+ 'from'
    Separator+ source:String
    hiding:(
      Separator+ 'hiding'
      Separator+ '{'
      hiding:(
        head:(Separator* ident:Identifier { return ident; })
        tail:(Separator+ ident:Identifier { return ident; })*
        { return [head, ...tail]; }
      )?
      Separator* '}'
      { return hiding ?? []; }
    )?
    Separator* ';'
    { return {type: 'ImportDeclaration', source, specifiers: '*', hiding: hiding ?? []}; }
  / 'import'
    Separator+ specifier:ImportDefaultSpecifier
    Separator+ 'from'
    Separator+ source:String
    Separator* ';'
    { return {type: 'ImportDeclaration', source, specifiers: [specifier]}; }

ExportDefaultDeclaration 'export default declaration'
  = 'export'
    Separator+ 'default'
    Separator+ declaration:Expression
    Separator* ';'
    { return {type: 'ExportDefaultDeclaration', declaration}; }

ExportNamedDeclaration 'export named declaration'
  = 'export'
    Separator+ '{'
    specifiers:(
      head:(Separator* ident:Identifier { return ident; })
      tail:(Separator+ ident:Identifier { return ident; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    Separator* ';'
    { return {type: 'ExportNamedDeclaration', specifiers: specifiers ?? []}; }

Statement
  = Declaration
  / ExpressionStatement

Declaration 'declaration'
  = name:(ident:Identifier { return ident.name; })
    parameterNames:(Separator+ !'=' ident:Identifier { return ident.name; })*
    Separator+ '='
    Separator+ expression:Expression
  { return {type: 'declaration', name, parameterNames, expression}; }

ExpressionStatement 'expression statement'
  = expression:Expression
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
  = ';;' (!LineTerminator .)*

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
  = object:PrimaryExpression
    properties:(
        Symbol
      / '.' ident:Identifier                              { return {type: 'string', value: ident.name}; }
      / '[' Separator* property:Expression Separator* ']' { return property; }
    )*
    { return properties.reduce((object, property) => ({type: 'MemberExpression', object, property}), object); }

Identifier 'identifier'
  = !'->' name:$(IdentChar)+
  { return {type: 'identifier', name}; }

Lambda 'lambda'
  = '('
    Separator* parameters:(ident:Identifier Separator+ { return ident; })+ '->'
    Separator+ body:Expression
    Separator* ')'
    { return parameters.reduceRight((body, parameter) => ({type: 'lambda', parameter, body}), body); }

BlockExpression 'block expression'
  = '{' Separator* statements:BlockExpressionStatements Separator* '}' { return {type: 'BlockExpression', statements}; }
  / '[' Separator* statements:BlockExpressionStatements Separator* ']' { return {type: 'BlockExpression', statements}; }

BlockExpressionStatements
  = head:Statement
    tail:(Separator* ';' Separator* statement:Statement { return statement; })*
    { return [head, ...tail]; }

PrimaryExpression
  = Placeholder
  / Boolean
  / Number
  / String
  / Symbol
  / Array
  / Object
  / ImportMeta
  / Identifier
  / BlockExpression
  / New
  / Invocation
  / Application

CallExpression
  = MemberExpression
  / Lambda
  / PrimaryExpression

UnaryOperator
  = 'typeof'
  / '+'
  / '-'
  / '~'
  / '!'

UnaryExpression
  = operator:UnaryOperator
    Separator+ argument:PrimaryExpression
    { return {type: 'UnaryExpression', operator, argument}; }
  / CallExpression

ExponentiationOperator
  = '**'

ExponentiationExpression
  = left:UnaryExpression
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
  = left:ExponentiationExpression
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
  = left:MultiplicativeExpression
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
  = left:AdditiveExpression
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
  = left:ShiftExpression
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
  = left:RelationalExpression
    tail:(
      Separator+ operator:EqualityOperator
      Separator+ right:RelationalExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = left:EqualityExpression
    tail:(
      Separator+ operator:BitwiseANDOperator
      Separator+ right:EqualityExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseXOROperator
  = '^'

BitwiseXORExpression
  = left:BitwiseANDExpression
    tail:(
      Separator+ oeprator:BitwiseXOROperator
      Separator+ right:BitwiseANDExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseOROperator
  = '|'

BitwiseORExpression
  = left:BitwiseXORExpression
    tail:(
      Separator+ operator:BitwiseOROperator
      Separator+ right:BitwiseXORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

LogicalANDOperator
  = '&&'

LogicalANDExpression
  = left:BitwiseORExpression
    tail:(
      Separator+ operator:LogicalANDOperator
      Separator+ right:BitwiseORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

LogicalOROperator
  = '||'

LogicalORExpression
  = left:LogicalANDExpression
    tail:(
      Separator+ operator:LogicalOROperator
      Separator+ right:LogicalANDExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

CoalesceOperator
  = '??'

CoalesceExpression
  = left:LogicalORExpression
    tail:(
      Separator+ operator:CoalesceOperator
      Separator+ right:LogicalORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

ConditionalExpression
  = 'if'
    Separator+ predicate:ConditionalExpression
    Separator+ 'then'
    Separator+ consequent:ConditionalExpression
    Separator+ 'else'
    Separator+ alternative:ConditionalExpression
    { return {type: 'ConditionalExpression', predicate, consequent, alternative}; }
  / CoalesceExpression

SpreadElement 'spread element'
  = '...' argument:Expression
    { return {type: 'spread-element', argument}; }

Array 'array'
  = '#['
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
  = '#{'
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
  = '('
    Separator* 'new'
    Separator+ callee:(Placeholder / Expression)
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })*
    Separator* ')'
    { return {type: 'new', callee, arguments: args}; }

Invocation 'invocation'
  = '('
    Separator* '.' name:(ident:Identifier { return ident.name; })
    args:(Separator+ arg:(Placeholder / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'invocation', name, object: args.pop(), arguments: args}; }

Application 'application'
  = '('
    Separator* callee:(Placeholder / Expression)
    args:(Separator+ arg:(Placeholder / SpreadElement / Expression) { return arg; })+
    Separator* ')'
    { return {type: 'application', callee, arguments: args}; }
