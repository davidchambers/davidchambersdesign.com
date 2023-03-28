Module
  = imports:(_ importDeclaration:ImportDeclaration                                   { return importDeclaration; })*
    exports:(_ exportDeclaration:(ExportNamedDeclaration / ExportDefaultDeclaration) { return exportDeclaration; })*
    statements:(_ statement:Statement _ ';' { return statement; })*
    _
    { return Node.Module(imports)(exports)(statements); }

ImportSpecifier
  = local:Identifier
    { return Node.ImportSpecifier(local)(local); }

ImportNamespaceSpecifier
  = local:Identifier
    { return Node.ImportNamespaceSpecifier(local); }

ImportDefaultSpecifier
  = local:Identifier
    { return Node.ImportDefaultSpecifier(local); }

ImportDeclaration
  = ImportToken _ '{' _ '}' _ 'from' _ source:StringLiteral _ ';'
    { return Node.ImportDeclaration(source)([]); }
  / ImportToken _ '{' _ specifiers:ImportSpecifier|.., CommaSeparator| _ ','? _ '}' _ 'from' _ source:StringLiteral _ ';'
    { return Node.ImportDeclaration(source)(specifiers); }
  / ImportToken _ '*' _ 'as' _ specifier:ImportNamespaceSpecifier _ 'from' _ source:StringLiteral _ ';'
    { return Node.ImportDeclaration(source)([specifier]); }
  / ImportToken _ '*' _ 'from' _ source:StringLiteral hiding:(_ 'hiding' _ '{' _ hiding:Identifier|.., CommaSeparator| _ '}' { return hiding; })? _ ';'
    { return Node.ImportAllDeclaration(source)(hiding ?? []); }
  / ImportToken _ specifier:ImportDefaultSpecifier _ 'from' _ source:StringLiteral _ ';'
    { return Node.ImportDeclaration(source)([specifier]); }

ExportSpecifier
  = local:Identifier
    { return Node.ExportSpecifier(local)(local); }

ExportDefaultDeclaration
  = ExportToken _ 'default' _ declaration:Expression _ ';'
    { return Node.ExportDefaultDeclaration(declaration); }

ExportNamedDeclaration
  = ExportToken _ '{' _ '}' _ ';'
    { return Node.ExportNamedDeclaration([]); }
  / ExportToken _ '{' _ specifiers:ExportSpecifier|.., CommaSeparator| _ ','? _ '}' _ ';'
    { return Node.ExportNamedDeclaration(specifiers); }

NullLiteral
  = 'null'  { return Node.NullLiteral; }

BooleanLiteral
  = 'true'  { return Node.BooleanLiteral(true); }
  / 'false' { return Node.BooleanLiteral(false); }

NumberLiteral
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber
  = '0' 'b' digits:$[0-1]+
    { return Node.NumberLiteral(parseInt(digits, 2)); }

OctalNumber
  = '0' 'o' digits:$[0-7]+
    { return Node.NumberLiteral(parseInt(digits, 8)); }

HexadecimalNumber
  = '0' 'x' digits:$[0-9A-F]+
    { return Node.NumberLiteral(parseInt(digits, 16)); }

DecimalNumber
  = ('0' / ([1-9] [0-9]*))
    ('.' [0-9]+)?
    { return Node.NumberLiteral(parseFloat(text())); }

StringLiteral
  = '"' chars:StringCharacter* '"'
    { return Node.StringLiteral(chars.join('')); }

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
    { return Node.TemplateLiteral([...pairs.map(pair => pair.quasi), quasi])(pairs.map(pair => pair.expression)); }

Quasi
  = $TemplateLiteralCharacter*

TemplateLiteralCharacter
  = !('`' / '${' / '\\') character:.
    { return character; }
  / '\\' sequence:('`' / '$' / EscapeSequence)
    { return sequence; }

AndToken            = @$'and'           !IdentifierPart
ArrowToken          = @$'=>'            !IdentifierPart
DoToken             = @$'do'            !IdentifierPart
ElseToken           = @$'else'          !IdentifierPart
ExportToken         = @$'export'        !IdentifierPart
IfToken             = @$'if'            !IdentifierPart
ImportToken         = @$'import'        !IdentifierPart
InToken             = @$'in'            !IdentifierPart
InstanceofToken     = @$'instanceof'    !IdentifierPart
IsToken             = @$'is'            !IdentifierPart
OrToken             = @$'or'            !IdentifierPart
SwitchToken         = @$'switch'        !IdentifierPart
ThenToken           = @$'then'          !IdentifierPart
TypeToken           = @$'type'          !IdentifierPart
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
  / DoToken
  / ExportToken

Identifier
  = !ReservedWord name:$(IdentifierStart IdentifierPart*)
    { return Node.Identifier(name); }

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
    { return Node.ArrayExpression([]); }
  / '[' _ elements:ArrayElement|1.., CommaSeparator| _ ','? _ ']'
    { return Node.ArrayExpression(elements); }

ArrayElement
  = SpreadElement
  / Expression

ObjectExpression
  = '{' _ '}'
    { return Node.ObjectExpression([]); }
  / '{' _ properties:ObjectElement|1.., CommaSeparator| _ ','? _ '}'
    { return Node.ObjectExpression(properties); }

ObjectElement
  = SpreadElement
  / Property

Property
  = '[' _ key:Expression _ ']' _ ':' _ value:Expression
    { return Node.Property(key)(value); }
  / ident:Identifier _ ':' _ value:Expression
    { return Node.Property(Node.StringLiteral(ident.name))(value); }
  / ident:Identifier
    { return Node.Property(Node.StringLiteral(ident.name))(ident); }

PrimaryExpression
  = NullLiteral
  / BooleanLiteral
  / NumberLiteral
  / StringLiteral
  / TemplateLiteral
  / BlockExpression
  / DoBlockExpression
  / ObjectExpression
  / ArrayExpression
  / Identifier
  / PropertyAccessor

MemberExpression
  = object:PrimaryExpression
    properties:(
        _ '.' ident:Identifier          { return Node.StringLiteral(ident.name); }
      / '[' _ property:Expression _ ']' { return property; }
    )*
    { return properties.reduce((object, property) => Node.MemberExpression(object)(property), object); }

ArrowFunctionExpression
  = parameters:ArrowFunctionParameters _ ArrowToken _ body:Expression
    { return Node.ArrowFunctionExpression(parameters)(body); }

MethodCallExpression
  = '.' ident:Identifier
    { return Node.MethodCallExpression(ident.name); }

LeftHandSideExpression
  = ArrowFunctionExpression
  / MethodCallExpression
  / MemberExpression
  / '(' _ expression:Expression _ ')' { return expression; }

CallExpression
  = head:LeftHandSideExpression
    tail:(
        __ arg:LeftHandSideExpression   { return callee => Node.CallExpression(callee)([arg]); }
      / _ '.' ident:Identifier          { return object => Node.MemberExpression(object)(Node.StringLiteral(ident.name)); }
      / '[' _ property:Expression _ ']' { return object => Node.MemberExpression(object)(property); }
    )*
    { return tail.reduce((expr, wrap) => wrap(expr), head); }

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
    { return Node.ArrayPattern([]); }
  / '[' _ elisions:Elision|.., _| _ ']'
    { return Node.ArrayPattern(elisions); }
  / '['
    elements:(
        _ elision:Elision                   { return elision; }
      / _ element:ArrayPatternElement _ ',' { return element; }
    )*
    _ element:ArrayPatternElement?
    _ ']'
    { return Node.ArrayPattern(element == null ? elements : [...elements, element]); }

Elision
  = ','
    { return Node.Elision; }

ArrayPatternElement
  = ArrayPattern
  / ObjectPattern
  / RestElement
  / Identifier

ObjectPattern
  = '{' _ '}'
    { return Node.ObjectPattern([]); }
  / '{' _ properties:ObjectPatternProperty|1.., CommaSeparator| _ ','? _ '}'
    { return Node.ObjectPattern(properties); }

ObjectPatternProperty
  = ident:Identifier _ ':' _ pattern:Pattern
    { return Node.Property(Node.StringLiteral(ident.name))(pattern); }
  / ident:Identifier
    { return Node.Property(Node.StringLiteral(ident.name))(ident); }

RestElement
  = '...' argument:Identifier
    { return Node.RestElement(argument); }

UnaryOperator
  = TypeofToken
  / '+'
  / '-'
  / '~'

UnaryExpression
  = operator:UnaryOperator _ argument:CallExpression
    { return Node.UnaryExpression(operator)(argument); }
  / CallExpression

CompositionOperator
  = '.'

CompositionExpression
  = exprs:UnaryExpression|1.., _ CompositionOperator _|
    { return exprs.reduceRight((right, left) => Node.CompositionExpression(left)(right)); }

ExponentiationOperator
  = '**'

ExponentiationExpression
  = left:CompositionExpression
    tail:(_ operator:ExponentiationOperator _ right:CompositionExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

MultiplicativeOperator
  = '*'
  / '/'
  / '%'

MultiplicativeExpression
  = left:ExponentiationExpression
    tail:(_ operator:MultiplicativeOperator _ right:ExponentiationExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

AdditiveOperator
  = '+'
  / '-'

AdditiveExpression
  = left:MultiplicativeExpression
    tail:(_ operator:AdditiveOperator _ right:MultiplicativeExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

ConcatenationOperator
  = '<>'

ConcatenationExpression
  = exprs:AdditiveExpression|1.., _ ConcatenationOperator _|
    { return exprs.reduceRight((right, left) => Node.ConcatenationExpression(left)(right)); }

ShiftOperator
  = '<<'
  / '>>>'
  / '>>'

ShiftExpression
  = left:ConcatenationExpression
    tail:(_ operator:ShiftOperator _ right:ConcatenationExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

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
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

EqualityOperator
  = IsToken

EqualityExpression
  = left:RelationalExpression
    tail:(_ operator:EqualityOperator _ right:RelationalExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

MapOperator
  = '<$>'

MapExpression
  = exprs:EqualityExpression|1.., _ MapOperator _|
    { return exprs.reduceRight((right, left) => Node.MapExpression(left)(right)); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = left:MapExpression
    tail:(_ operator:BitwiseANDOperator _ right:MapExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

BitwiseXOROperator
  = '^'

BitwiseXORExpression
  = left:BitwiseANDExpression
    tail:(_ operator:BitwiseXOROperator _ right:BitwiseANDExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

BitwiseOROperator
  = '|'

BitwiseORExpression
  = left:BitwiseXORExpression
    tail:(_ operator:BitwiseOROperator _ right:BitwiseXORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.BinaryExpression(operator)(left)(right), left); }

LogicalANDOperator
  = AndToken

LogicalANDExpression
  = left:BitwiseORExpression
    tail:(_ operator:LogicalANDOperator _ right:BitwiseORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.LogicalExpression(operator)(left)(right), left); }

LogicalOROperator
  = OrToken

LogicalORExpression
  = left:LogicalANDExpression
    tail:(_ operator:LogicalOROperator _ right:LogicalANDExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.LogicalExpression(operator)(left)(right), left); }

CoalesceOperator
  = '??'

CoalesceExpression
  = left:LogicalORExpression
    tail:(_ operator:CoalesceOperator _ right:LogicalORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Node.LogicalExpression(operator)(left)(right), left); }

BindOperator
  = '>>='

BindExpression
  = exprs:CoalesceExpression|1.., _ BindOperator _|
    { return exprs.reduce((left, right) => Node.BindExpression(left)(right)); }

ConditionalExpression
  = IfToken
    _ predicate:ConditionalExpression
    _ ThenToken
    _ consequent:ConditionalExpression
    _ ElseToken
    _ alternative:ConditionalExpression
    { return Node.ConditionalExpression(predicate)(consequent)(alternative); }
  / BindExpression

SwitchExpression
  = SwitchToken
    _ discriminant:Expression
    _ cases:SwitchCase|.., _|
    default_:(_ ElseToken _ default_:Expression { return default_; })?
    { return Node.SwitchExpression(discriminant)(cases)(default_); }
  / ConditionalExpression

SwitchCase
  = WhenToken
    _ predicates:Expression|1.., CommaSeparator|
    _ ThenToken
    _ consequent:Expression
    { return Node.SwitchCase(predicates)(consequent); }

ApplicationOperator
  = '$'

ApplicationExpression
  = callee:SwitchExpression
    args:(_ ApplicationOperator _ arg:ApplicationExpression { return arg; })*
    { return args.reduce((callee, arg) => Node.CallExpression(callee)([arg]), callee); }

PipeOperator
  = '|>'

PipeExpression
  = exprs:ApplicationExpression|1.., _ PipeOperator _|
    { return exprs.reduce((head, body) => Node.PipeExpression(head)(body)); }

PropertyAccessor
  = '(' '.' identifier:Identifier ')'
    { return Node.PropertyAccessor(identifier); }

BlockExpression
  = '{' _ statements:Statement|1.., SemicolonSeparator| _ '}'
    { return Node.BlockExpression(statements); }

DoBlockExpression
  = DoToken
    _ '{'
    operations:(_ operation:DoOperation _ ';' { return operation; })*
    _ result:Expression
    _ '}'
    { return Node.DoBlockExpression(operations)(result); }

DoOperation
  = ArrowAssignmentStatement
  / FunctionDeclaration
  / VariableDeclaration

ArrowAssignmentStatement
  = pattern:Pattern _ '<-' _ expression:Expression
    { return Node.ArrowAssignmentStatement(pattern)(expression); }

Statement
  = DataTypeDeclaration
  / FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

FunctionDeclaration
  = ident:Identifier
    parameters:(__ parameter:Pattern { return parameter; })+
    _ '=' _ body:Expression
    { return Node.FunctionDeclaration(ident.name)(parameters)(body); }

VariableDeclaration
  = pattern:Pattern _ '=' _ expression:Expression
    { return Node.VariableDeclaration(pattern)(expression); }

DataTypeDeclaration
  = TypeToken
    _ name:(ident:Identifier { return ident.name; })
    _ '='
    _ constructors:DataConstructorDefinition|1.., _ '|' _|
    { return Node.DataTypeDeclaration(name)(constructors); }

DataConstructorDefinition
  = name:(ident:Identifier { return ident.name; })
    parameters:(_ ident:Identifier { return ident.name; })*
    { return {name, parameters}; }

ExpressionStatement
  = expression:Expression
    { return Node.ExpressionStatement(expression); }

SpreadElement
  = '...' argument:Expression
    { return Node.SpreadElement(argument); }

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
