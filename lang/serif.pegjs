Module
  = imports:(_ importDeclaration:ImportDeclaration                                   { return importDeclaration; })*
    exports:(_ exportDeclaration:(ExportNamedDeclaration / ExportDefaultDeclaration) { return exportDeclaration; })*
    statements:(_ statement:Statement _ ';' { return statement; })*
    _
    { return {type: 'Module', imports, exports, statements}; }

ImportSpecifier
  = local:Identifier
    { return {type: 'ImportSpecifier', imported: local, local}; }

ImportNamespaceSpecifier
  = local:Identifier
    { return {type: 'ImportNamespaceSpecifier', local}; }

ImportDefaultSpecifier
  = local:Identifier
    { return {type: 'ImportDefaultSpecifier', local}; }

ImportDeclaration
  = ImportToken _ '{' _ '}' _ 'from' _ source:StringLiteral _ ';'
    { return {type: 'ImportDeclaration', source, specifiers: []}; }
  / ImportToken _ '{' _ specifiers:ImportSpecifier|.., CommaSeparator| _ ','? _ '}' _ 'from' _ source:StringLiteral _ ';'
    { return {type: 'ImportDeclaration', source, specifiers}; }
  / ImportToken _ '*' _ 'as' _ specifier:ImportNamespaceSpecifier _ 'from' _ source:StringLiteral _ ';'
    { return {type: 'ImportDeclaration', source, specifiers: [specifier]}; }
  / ImportToken _ '*' _ 'from' _ source:StringLiteral hiding:(_ 'hiding' _ '{' _ hiding:Identifier|.., CommaSeparator| _ '}' { return hiding; })? _ ';'
    { return {type: 'ImportDeclaration', source, specifiers: '*', hiding: hiding ?? []}; }
  / ImportToken _ specifier:ImportDefaultSpecifier _ 'from' _ source:StringLiteral _ ';'
    { return {type: 'ImportDeclaration', source, specifiers: [specifier]}; }

ExportDefaultDeclaration
  = ExportToken _ 'default' _ declaration:Expression _ ';'
    { return {type: 'ExportDefaultDeclaration', declaration}; }

ExportNamedDeclaration
  = ExportToken _ '{' _ '}' _ ';'
    { return {type: 'ExportNamedDeclaration', specifiers: []}; }
  / ExportToken _ '{' _ specifiers:Identifier|.., CommaSeparator| _ ','? _ '}' _ ';'
    { return {type: 'ExportNamedDeclaration', specifiers}; }

NullLiteral
  = 'null'  { return {type: 'NullLiteral'}; }

BooleanLiteral
  = 'true'  { return {type: 'BooleanLiteral', value: true}; }
  / 'false' { return {type: 'BooleanLiteral', value: false}; }

NumberLiteral
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber
  = '0' 'b' digits:$[0-1]+
    { return {type: 'NumberLiteral', value: parseInt(digits, 2)}; }

OctalNumber
  = '0' 'o' digits:$[0-7]+
    { return {type: 'NumberLiteral', value: parseInt(digits, 8)}; }

HexadecimalNumber
  = '0' 'x' digits:$[0-9A-F]+
    { return {type: 'NumberLiteral', value: parseInt(digits, 16)}; }

DecimalNumber
  = ('0' / ([1-9] [0-9]*))
    ('.' [0-9]+)?
    { return {type: 'NumberLiteral', value: parseFloat(text())}; }

StringLiteral
  = '"' chars:StringCharacter* '"'
    { return {type: 'StringLiteral', value: chars.join('')}; }

StringCharacter
  = !('"' / '\\') character:.
    { return character; }
  / '\\' sequence:('"' / EscapeSequence)
    { return sequence; }

EscapeSequence
  = CharacterEscapeSequence
  / HexEscapeSequence
  / UnicodeEscapeSequence

CharacterEscapeSequence
  = '\\'
  / 'b' { return '\b'; }
  / 'f' { return '\f'; }
  / 'n' { return '\n'; }
  / 'r' { return '\r'; }
  / 't' { return '\t'; }
  / 'v' { return '\v'; }

HexEscapeSequence
  = 'x' digits:$[0-9A-F]|2|
    { return String.fromCharCode(parseInt(digits, 16)); }

UnicodeEscapeSequence
  = 'u' digits:$[0-9A-F]|4|
    { return String.fromCharCode(parseInt(digits, 16)); }

TemplateLiteral
  = '`'
    pairs:(quasi:Quasi '${' _ expression:Expression _ '}' { return {quasi, expression}; })*
    quasi:Quasi
    '`'
    {
      return {
        type: 'TemplateLiteral',
        quasis: [...pairs.map(pair => pair.quasi), quasi],
        expressions: pairs.map(pair => pair.expression),
      };
    }

Quasi
  = $TemplateLiteralCharacter*

TemplateLiteralCharacter
  = !('`' / '${' / '\\') character:.
    { return character; }
  / '\\' sequence:('`' / '$' / EscapeSequence)
    { return sequence; }

AndToken            = @$'and'           !IdentifierPart
ArrowToken          = @$'=>'            !IdentifierPart
ElseToken           = @$'else'          !IdentifierPart
ExportToken         = @$'export'        !IdentifierPart
IfToken             = @$'if'            !IdentifierPart
ImportToken         = @$'import'        !IdentifierPart
InToken             = @$'in'            !IdentifierPart
InstanceofToken     = @$'instanceof'    !IdentifierPart
IsToken             = @$'is'            !IdentifierPart
IsntToken           = @$'isnt'          !IdentifierPart
OrToken             = @$'or'            !IdentifierPart
SwitchToken         = @$'switch'        !IdentifierPart
ThenToken           = @$'then'          !IdentifierPart
TypeofToken         = @$'typeof'        !IdentifierPart
WhenToken           = @$'when'          !IdentifierPart

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
  / SwitchToken
  / WhenToken
  / IsToken
  / IsntToken
  / ImportToken
  / ExportToken

Identifier
  = !ReservedWord name:$(IdentifierStart IdentifierPart*)
    { return {type: 'Identifier', name}; }

IdentifierStart
  = !Whitespace
    ![0-9]
    !'('
    !')'
    !'['
    !']'
    !'{'
    !'}'
    !'.'
    !','
    !':'
    !';'
    !'"'
    !'`'
    !'-'
    !'='
    !'$'
    .

IdentifierPart
  = IdentifierStart
  / [0-9]
  / '-'

ArrayExpression
  = '[' _ ']'
    { return {type: 'ArrayExpression', elements: []}; }
  / '[' _ elements:ArrayElement|1.., CommaSeparator| _ ','? _ ']'
    { return {type: 'ArrayExpression', elements}; }

ArrayElement
  = SpreadElement
  / Expression

ObjectExpression
  = '{' _ '}'
    { return {type: 'ObjectExpression', properties: []}; }
  / '{' _ properties:ObjectElement|1.., CommaSeparator| _ ','? _ '}'
    { return {type: 'ObjectExpression', properties}; }

ObjectElement
  = SpreadElement
  / Property

Property
  = key:PropertyName _ ':' _ value:AssignmentExpression
    { return {type: 'Property', key, value}; }

PropertyName
  = LiteralPropertyName
  / ComputedPropertyName

LiteralPropertyName
  = ident:Identifier
    { return {type: 'StringLiteral', value: ident.name}; }

ComputedPropertyName
  = '[' _ expression:AssignmentExpression _ ']'
    { return expression; }

AssignmentExpression
  = Expression

ImportMeta
  = meta:ImportToken '.' property:'meta'
    { return {type: 'MetaProperty', meta, property}; }

PrimaryExpression
  = NullLiteral
  / BooleanLiteral
  / NumberLiteral
  / StringLiteral
  / TemplateLiteral
  / ArrayExpression
  / ObjectExpression
  / ImportMeta
  / Identifier
  / PropertyAccessor
  / BlockExpression

MemberExpression
  = object:PrimaryExpression
    properties:(
        _ '.' ident:Identifier          { return {type: 'StringLiteral', value: ident.name}; }
      / '[' _ property:Expression _ ']' { return property; }
    )*
    { return properties.reduce((object, property) => ({type: 'MemberExpression', object, property}), object); }

ArrowFunctionExpression
  = parameters:ArrowFunctionParameters _ ArrowToken _ body:Expression
    { return {type: 'ArrowFunctionExpression', parameters, body}; }

LeftHandSideExpression
  = ArrowFunctionExpression
  / MemberExpression
  / ImportExpression

ImportExpression
  = ImportToken _ '(' _ source:Expression _ ')'
    { return {type: 'ImportExpression', source}; }

CallExpression
  = head:LeftHandSideExpression
    tail:(
        __ arg:LeftHandSideExpression   { return callee => ({type: 'CallExpression', callee, arguments: [arg]}); }
      / _ args:Arguments                { return callee => ({type: 'CallExpression', callee, arguments: args}); }
      / _ '.' ident:Identifier          { return object => ({type: 'MemberExpression', object, property: {type: 'StringLiteral', value: ident.name}}); }
      / '[' _ property:Expression _ ']' { return object => ({type: 'MemberExpression', object, property}); }
    )*
    { return tail.reduce((expr, wrap) => wrap(expr), head); }

Arguments
  = '(' _ ')'
    { return []; }
  / '(' _ args:(SpreadElement / Expression)|1.., CommaSeparator| _ ')'
    { return args; }

ArrowFunctionParameters
  = '(' _ ')'
    { return []; }
  / '(' _ parameters:Pattern|1.., CommaSeparator| _ ','? _ ')'
    { return parameters; }
  / parameter:Pattern
    { return [parameter]; }

Pattern
  = ArrayPattern
  / ObjectPattern
  / Identifier

ArrayPattern
  = '[' _ ']'
    { return {type: 'ArrayPattern', elements: []}; }
  / '[' _ elisions:Elision|.., _| _ ']'
    { return {type: 'ArrayPattern', elements: elisions}; }
  / '['
    elements:(
        _ elision:Elision                   { return elision; }
      / _ element:ArrayPatternElement _ ',' { return element; }
    )*
    _ element:ArrayPatternElement?
    _ ']'
    { return {type: 'ArrayPattern', elements: element == null ? elements : [...elements, element]}; }

Elision
  = ','
    { return {type: 'Elision'}; }

ArrayPatternElement
  = ArrayPattern
  / ObjectPattern
  / RestElement
  / Identifier

ObjectPattern
  = '{' _ '}'
    { return {type: 'ObjectPattern', properties: []}; }
  / '{' _ properties:ObjectPatternProperty|1.., CommaSeparator| _ ','? _ '}'
    { return {type: 'ObjectPattern', properties}; }

ObjectPatternProperty
  = ident:Identifier _ ':' _ pattern:Pattern
    { return {type: 'Property', key: {type: 'StringLiteral', value: ident.name}, value: pattern}; }
  / ident:Identifier
    { return {type: 'Property', key: {type: 'StringLiteral', value: ident.name}, value: ident}; }

RestElement
  = '...' argument:Identifier
    { return {type: 'RestElement', argument}; }

UnaryOperator
  = TypeofToken
  / '+'
  / '-'
  / '~'
  / '!'

UnaryExpression
  = operator:UnaryOperator _ argument:CallExpression
    { return {type: 'UnaryExpression', operator, argument}; }
  / CallExpression

CompositionOperator
  = '.'

CompositionExpression
  = exprs:UnaryExpression|1.., _ CompositionOperator _|
    { return exprs.reduceRight((right, left) => ({type: 'CompositionExpression', left, right})); }

ExponentiationOperator
  = '**'

ExponentiationExpression
  = left:CompositionExpression
    tail:(_ operator:ExponentiationOperator _ right:CompositionExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

MultiplicativeOperator
  = '*'
  / '/'
  / '%'

MultiplicativeExpression
  = left:ExponentiationExpression
    tail:(_ operator:MultiplicativeOperator _ right:ExponentiationExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

AdditiveOperator
  = '+'
  / '-'

AdditiveExpression
  = left:MultiplicativeExpression
    tail:(_ operator:AdditiveOperator _ right:MultiplicativeExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

ShiftOperator
  = '<<'
  / '>>>'
  / '>>'

ShiftExpression
  = left:AdditiveExpression
    tail:(_ operator:ShiftOperator _ right:AdditiveExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

RelationalOperator
  = '<='
  / '<'
  / '>='
  / '>'
  / InstanceofToken
  / InToken

RelationalExpression
  = left:ShiftExpression
    tail:(_ operator:RelationalOperator _ right:ShiftExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

EqualityOperator
  = IsToken
  / IsntToken

EqualityExpression
  = left:RelationalExpression
    tail:(_ operator:EqualityOperator _ right:RelationalExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

MapOperator
  = '<$>'

MapExpression
  = exprs:EqualityExpression|1.., _ MapOperator _|
    { return exprs.reduceRight((right, left) => ({type: 'MapExpression', left, right})); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = left:MapExpression
    tail:(_ operator:BitwiseANDOperator _ right:MapExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseXOROperator
  = '^'

BitwiseXORExpression
  = left:BitwiseANDExpression
    tail:(_ operator:BitwiseXOROperator _ right:BitwiseANDExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

BitwiseOROperator
  = '|'

BitwiseORExpression
  = left:BitwiseXORExpression
    tail:(_ operator:BitwiseOROperator _ right:BitwiseXORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'BinaryExpression', operator, left, right}), left); }

LogicalANDOperator
  = AndToken

LogicalANDExpression
  = left:BitwiseORExpression
    tail:(_ operator:LogicalANDOperator _ right:BitwiseORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

LogicalOROperator
  = OrToken

LogicalORExpression
  = left:LogicalANDExpression
    tail:(_ operator:LogicalOROperator _ right:LogicalANDExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

CoalesceOperator
  = '??'

CoalesceExpression
  = left:LogicalORExpression
    tail:(_ operator:CoalesceOperator _ right:LogicalORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => ({type: 'LogicalExpression', operator, left, right}), left); }

BindOperator
  = '>>='

BindExpression
  = exprs:CoalesceExpression|1.., _ BindOperator _|
    { return exprs.reduce((left, right) => ({type: 'BindExpression', left, right})); }

ConditionalExpression
  = IfToken
    _ predicate:ConditionalExpression
    _ ThenToken
    _ consequent:ConditionalExpression
    _ ElseToken
    _ alternative:ConditionalExpression
    { return {type: 'ConditionalExpression', predicate, consequent, alternative}; }
  / BindExpression

SwitchExpression
  = SwitchToken
    _ discriminant:Expression
    _ cases:SwitchCase|.., _|
    default_:(_ ElseToken _ default_:Expression { return default_; })?
    { return {type: 'SwitchExpression', discriminant, cases, default: default_}; }
  / ConditionalExpression

SwitchCase
  = WhenToken
    _ predicates:Expression|1.., CommaSeparator|
    _ ThenToken
    _ consequent:Expression
    { return {type: 'SwitchCase', predicates, consequent}; }

ApplicationOperator
  = '$'

ApplicationExpression
  = callee:SwitchExpression
    args:(_ ApplicationOperator _ arg:ApplicationExpression { return arg; })*
    { return args.reduce((callee, arg) => ({type: 'CallExpression', callee, arguments: [arg]}), callee); }

PipeOperator
  = '|>'

PipeExpression
  = exprs:ApplicationExpression|1.., _ PipeOperator _|
    { return exprs.reduce((head, body) => ({type: 'PipeExpression', head, body})); }

PropertyAccessor
  = '(' '.' identifier:Identifier ')'
    { return {type: 'PropertyAccessor', identifier}; }

BlockExpression
  = '{' _ statements:Statement|1.., SemicolonSeparator| _ '}'
    { return {type: 'BlockExpression', statements}; }

Statement
  = FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

FunctionDeclaration
  = ident:Identifier
    parameters:(__ parameter:Pattern { return parameter; })+
    _ '=' _ body:Expression
    { return {type: 'FunctionDeclaration', name: ident.name, parameters, body}; }

VariableDeclaration
  = pattern:Pattern _ '=' _ expression:Expression
    { return {type: 'VariableDeclaration', pattern, expression}; }

ExpressionStatement
  = expression:Expression
    { return {type: 'ExpressionStatement', expression}; }

SpreadElement
  = '...' argument:Expression
    { return {type: 'SpreadElement', argument}; }

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

_ =
  (Whitespace / Comment)*

__
  = Comment? Whitespace _

CommaSeparator
  = _ ',' _

SemicolonSeparator
  = _ ';' _

Expression
  = PipeExpression
