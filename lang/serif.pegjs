Module
  = imports:(Separator* importDeclaration:ImportDeclaration                                   { return importDeclaration; })*
    exports:(Separator* exportDeclaration:(ExportNamedDeclaration / ExportDefaultDeclaration) { return exportDeclaration; })*
    statements:(Separator* statement:Statement Separator* ';' { return statement; })*
    Separator*
    { return Serif.Module([...imports, ...statements, ...exports]); }

ImportSpecifier
  = local:Identifier
    { return Serif.ImportSpecifier(local, local); }

ImportDefaultSpecifier
  = local:Identifier
    { return Serif.ImportDefaultSpecifier(local); }

ImportDeclaration
  = 'import'
    Separator+ '{'
    specifiers:(
      head:(Separator* specifier:ImportSpecifier { return specifier; })
      tail:(Separator+ specifier:ImportSpecifier { return specifier; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    Separator+ 'from'
    Separator+ source:StringLiteral
    Separator* ';'
    { return Serif.ImportDeclaration(source, specifiers ?? []); }
  / 'import'
    Separator+ '*'
    Separator+ 'from'
    Separator+ source:StringLiteral
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
    { return Serif.ImportEverythingDeclaration(source, hiding ?? []); }
  / 'import'
    Separator+ specifier:ImportDefaultSpecifier
    Separator+ 'from'
    Separator+ source:StringLiteral
    Separator* ';'
    { return Serif.ImportDefaultDeclaration(source, specifier); }

ExportDefaultDeclaration
  = 'export'
    Separator+ 'default'
    Separator+ declaration:Expression
    Separator* ';'
    { return Serif.ExportDefaultDeclaration(declaration); }

ExportNamedDeclaration
  = 'export'
    Separator+ '{'
    specifiers:(
      head:(Separator* ident:Identifier { return ident; })
      tail:(Separator+ ident:Identifier { return ident; })*
      { return [head, ...tail]; }
    )?
    Separator* '}'
    Separator* ';'
    { return Serif.ExportNamedDeclaration(specifiers ?? []); }

BooleanLiteral
  = 'true'  { return Serif.BooleanLiteral(true); }
  / 'false' { return Serif.BooleanLiteral(false); }

NumberLiteral
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber
  = '0' 'b' digits:$([0-1])+
    { return Serif.NumberLiteral(parseInt(digits, 2)); }

OctalNumber
  = '0' 'o' digits:$([0-7])+
    { return Serif.NumberLiteral(parseInt(digits, 8)); }

HexadecimalNumber
  = '0' 'x' digits:$([0-9A-F])+
    { return Serif.NumberLiteral(parseInt(digits, 16)); }

DecimalNumber
  = ('-' / '+')?
    ('0' / ([1-9] [0-9]*))
    ('.' [0-9]+)?
    { return Serif.NumberLiteral(parseFloat(text())); }

StringLiteral
  = '"' chars:StringChar* '"'
    { return Serif.StringLiteral(chars.join('')); }

StringChar
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
  / !'"' c:.  { return c; }

TemplateLiteral
  = '`' chars:TemplateLiteralChar* '`'
    { return Serif.TemplateLiteral(chars.join('')); }

TemplateLiteralChar
  = '\\' '`'  { return '\\`'; }
  / '\\' '\\' { return '\\\\'; }
  / '\\' 'b'  { return '\\b'; }
  / '\\' 'f'  { return '\\f'; }
  / '\\' 'n'  { return '\\n'; }
  / '\\' 'r'  { return '\\r'; }
  / '\\' 't'  { return '\\t'; }
  / '\\' 'u' digits:$([0-9A-F] [0-9A-F] [0-9A-F] [0-9A-F])
              { return '\\u' + digits; }
  / '\\'      { expected('valid escape sequence'); }
  / !'`' c:.  { return c; }

SymbolLiteral
  = ':' name:$(SymbolChar)+
    { return Serif.SymbolLiteral(name); }

SymbolChar
  = !Whitespace
    !'\u0022' // QUOTATION MARK
    !'\u0028' // LEFT PARENTHESIS
    !'\u0029' // RIGHT PARENTHESIS
    !'\u002C' // COMMA
    !'\u002E' // FULL STOP
    !'\u003A' // COLON
    !'\u003B' // SEMICOLON
    !'\u005B' // LEFT SQUARE BRACKET
    !'\u005D' // RIGHT SQUARE BRACKET
    !'\u007B' // LEFT CURLY BRACKET
    !'\u007D' // RIGHT CURLY BRACKET
    .

ElseToken           = 'else'            !IdentifierPart     { return text(); }
IfToken             = 'if'              !IdentifierPart     { return text(); }
InToken             = 'in'              !IdentifierPart     { return text(); }
InstanceofToken     = 'instanceof'      !IdentifierPart     { return text(); }
NewToken            = 'new'             !IdentifierPart     { return text(); }
ThenToken           = 'then'            !IdentifierPart     { return text(); }
TypeofToken         = 'typeof'          !IdentifierPart     { return text(); }

ReservedWord
  = UnaryOperator
  / ExponentiationOperator
  / MultiplicativeOperator
  / AdditiveOperator
  / ShiftOperator
  / RelationalOperator
  / EqualityOperator
  / BitwiseANDOperator
  / BitwiseXOROperator
  / BitwiseOROperator
  / LogicalANDOperator
  / LogicalOROperator
  / CoalesceOperator
  / IfToken
  / ThenToken
  / ElseToken

Identifier
  = !ReservedWord name:$(IdentifierStart IdentifierPart*)
    { return Serif.Identifier(name); }

IdentifierStart
  = 'A' / 'B' / 'C' / 'D' / 'E' / 'F' / 'G' / 'H' / 'I' / 'J' / 'K' / 'L' / 'M' / 'N' / 'O' / 'P' / 'Q' / 'R' / 'S' / 'T' / 'U' / 'V' / 'W' / 'X' / 'Y' / 'Z'
  / 'a' / 'b' / 'c' / 'd' / 'e' / 'f' / 'g' / 'h' / 'i' / 'j' / 'k' / 'l' / 'm' / 'n' / 'o' / 'p' / 'q' / 'r' / 's' / 't' / 'u' / 'v' / 'w' / 'x' / 'y' / 'z'
  / "'"
  / '%'
  / '!'
  / '~'
  / '<'
  / '>'
  / '↑'
  / '↓'
  / '←'
  / '→'
  / '⇧'
  / '⇩'
  / '⇦'
  / '⇨'
  / '—'

IdentifierPart
  = IdentifierStart
  / '0' / '1' / '2' / '3' / '4' / '5' / '6' / '7' / '8' / '9'
  / '-'
  / '/'

ArrayExpression
  = '[' Separator* ']'
    { return Serif.ArrayExpression([]); }
  / '[' Separator*
    head:ArrayElement
    tail:(Separator* ',' Separator* element:ArrayElement { return element; })*
    Separator* ','?
    Separator* ']'
    { return Serif.ArrayExpression([head, ...tail]); }

ArrayElement
  = SpreadElement
  / Expression

ObjectExpression
  = '{' Separator* '}'
    { return Serif.ObjectExpression([]); }
  / '{' Separator*
    head:ObjectElement
    tail:(Separator* ',' Separator* element:ObjectElement { return element; })*
    Separator* ','?
    Separator* '}'
    { return Serif.ObjectExpression([head, ...tail]); }

ObjectElement
  = SpreadElement
  / Property

Property
  = key:(
        ident:Identifier { return Serif.StringLiteral(ident.name); }
      / '[' Separator* expression:Expression Separator* ']' { return expression; }
    )
    Separator* ':'
    Separator* value:Expression
    { return Serif.Property(key, value); }

ImportMeta
  = meta:'import' '.' property:'meta'
    { return Serif.MetaProperty(meta, property); }

MemberExpression
  = object:(
        BooleanLiteral
      / NumberLiteral
      / StringLiteral
      / TemplateLiteral
      / SymbolLiteral
      / ArrayExpression
      / ObjectExpression
      / ImportMeta
      / NewExpression
      / Identifier
      / BlockExpression
    )
    properties:(
        SymbolLiteral
      / '.' ident:Identifier                              { return Serif.StringLiteral(ident.name); }
      / '[' Separator* property:Expression Separator* ']' { return property; }
    )*
    { return properties.reduce(Serif.MemberExpression, object); }

NewExpression
  = NewToken Separator+ callee:MemberExpression Separator* args:Arguments
    { return Serif.NewExpression(callee, args); }

CallExpression
  = head:MemberExpression
    tail:(
        Separator* args:Arguments                         { return expr => Serif.CallExpression(expr, args); }
      / symbol:SymbolLiteral                              { return expr => Serif.MemberExpression(expr, symbol); }
      / '.' ident:Identifier                              { return expr => Serif.MemberExpression(expr, Serif.StringLiteral(ident.name)); }
      / '[' Separator* property:Expression Separator* ']' { return expr => Serif.MemberExpression(expr, property); }
    )*
    { return tail.reduce((expr, wrap) => wrap(expr), head); }

Arguments
  = '(' Separator* ')'
    { return []; }
  / '(' Separator*
    head:Expression
    tail:(Separator* ',' Separator* argument:(SpreadElement / Expression) { return argument; })*
    Separator* ')'
    { return [head, ...tail]; }

ArrowFunctionExpression
  = parameter:Identifier Separator+ '=>' Separator+ body:Expression
    { return Serif.ArrowFunctionExpression(parameter, body); }
  / CallExpression

Application
  = callee:ArrowFunctionExpression
    args:(Separator+ arg:ArrowFunctionExpression { return arg; })*
    { return Serif.Application(callee, args); }

UnaryOperator
  = TypeofToken
  / '+'
  / '-'
  / '~'
  / '!'

UnaryExpression
  = operator:UnaryOperator Separator+ argument:Application
    { return Serif.UnaryExpression(operator, argument); }
  / Application

ExponentiationOperator
  = '**'

ExponentiationExpression
  = left:UnaryExpression
    tail:(
      Separator+ operator:ExponentiationOperator
      Separator+ right:UnaryExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.ExponentiationExpression(operator, left, right), left); }

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
    { return tail.reduce((left, {operator, right}) => Serif.MultiplicativeExpression(operator, left, right), left); }

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
    { return tail.reduce((left, {operator, right}) => Serif.AdditiveExpression(operator, left, right), left); }

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
    { return tail.reduce((left, {operator, right}) => Serif.ShiftExpression(operator, left, right), left); }

RelationalOperator
  = '<='
  / '<'
  / '>='
  / '>'
  / InstanceofToken
  / InToken

RelationalExpression
  = left:ShiftExpression
    tail:(
      Separator+ operator:RelationalOperator
      Separator+ right:ShiftExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.RelationalExpression(operator, left, right), left); }

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
    { return tail.reduce((left, {operator, right}) => Serif.EqualityExpression(operator, left, right), left); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = left:EqualityExpression
    tail:(
      Separator+ operator:BitwiseANDOperator
      Separator+ right:EqualityExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.EqualityExpression(operator, left, right), left); }

BitwiseXOROperator
  = '^'

BitwiseXORExpression
  = left:BitwiseANDExpression
    tail:(
      Separator+ oeprator:BitwiseXOROperator
      Separator+ right:BitwiseANDExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.BitwiseXORExpression(operator, left, right), left); }

BitwiseOROperator
  = '|'

BitwiseORExpression
  = left:BitwiseXORExpression
    tail:(
      Separator+ operator:BitwiseOROperator
      Separator+ right:BitwiseXORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.BitwiseORExpression(operator, left, right), left); }

LogicalANDOperator
  = '&&'

LogicalANDExpression
  = left:BitwiseORExpression
    tail:(
      Separator+ operator:LogicalANDOperator
      Separator+ right:BitwiseORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.LogicalANDExpression(operator, left, right), left); }

LogicalOROperator
  = '||'

LogicalORExpression
  = left:LogicalANDExpression
    tail:(
      Separator+ operator:LogicalOROperator
      Separator+ right:LogicalANDExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.LogicalORExpression(operator, left, right), left); }

CoalesceOperator
  = '??'

CoalesceExpression
  = left:LogicalORExpression
    tail:(
      Separator+ operator:CoalesceOperator
      Separator+ right:LogicalORExpression
      { return {operator, right}; }
    )*
    { return tail.reduce((left, {operator, right}) => Serif.CoalesceExpression(operator, left, right), left); }

ConditionalExpression
  = IfToken
    Separator+ predicate:ConditionalExpression
    Separator+ ThenToken
    Separator+ consequent:ConditionalExpression
    Separator+ ElseToken
    Separator+ alternative:ConditionalExpression
    { return Serif.ConditionalExpression(predicate, consequent, alternative); }
  / CoalesceExpression

BlockExpression
  = '{' Separator*
    head:Statement
    tail:(Separator* ';' Separator* statement:Statement { return statement; })*
    Separator* '}'
    { return Serif.BlockExpression([head, ...tail]); }

Statement
  = FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

FunctionDeclaration
  = name:(ident:Identifier { return ident.name; })
    parameterNames:(Separator+ ident:Identifier { return ident.name; })+
    Separator+ '='
    Separator+ body:Expression
    { return Serif.FunctionDeclaration(name, parameterNames, body); }

VariableDeclaration
  = name:(ident:Identifier { return ident.name; })
    Separator+ '='
    Separator+ expression:Expression
    { return Serif.VariableDeclaration(name, expression); }

ExpressionStatement
  = expression:Expression
    { return Serif.ExpressionStatement(expression); }

SpreadElement
  = '...' argument:Expression
    { return Serif.SpreadElement(argument); }

LineTerminator
  = '\u000A' // LINE FEED (LF)
  / '\u000D' // CARRIAGE RETURN (CR)
  / '\u2028' // LINE SEPARATOR
  / '\u2029' // PARAGRAPH SEPARATOR

Whitespace
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

Comment
  = ';;' (!LineTerminator .)*

Separator
  = Whitespace
  / Comment

Expression
  = ConditionalExpression
