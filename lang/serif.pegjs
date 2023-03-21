Module
  = imports:(_ importDeclaration:ImportDeclaration                                   { return importDeclaration; })*
    exports:(_ exportDeclaration:(ExportNamedDeclaration / ExportDefaultDeclaration) { return exportDeclaration; })*
    statements:(_ statement:Statement _ ';' { return statement; })*
    _
    { return Serif.Module([...imports, ...statements, ...exports]); }

ImportSpecifier
  = local:Identifier
    { return Serif.ImportSpecifier(local, local); }

ImportNamespaceSpecifier
  = local:Identifier
    { return Serif.ImportNamespaceSpecifier(local); }

ImportDefaultSpecifier
  = local:Identifier
    { return Serif.ImportDefaultSpecifier(local); }

ImportDeclaration
  = ImportToken _ '{' _ specifiers:ImportSpecifier|.., CommaSeparator| _ '}' _ 'from' _ source:StringLiteral _ ';'
    { return Serif.ImportDeclaration(source, specifiers); }
  / ImportToken _ '*' _ 'as' _ specifier:ImportNamespaceSpecifier _ 'from' _ source:StringLiteral _ ';'
    { return Serif.ImportDeclaration(source, [specifier]); }
  / ImportToken _ '*' _ 'from' _ source:StringLiteral hiding:(_ 'hiding' _ '{' _ hiding:Identifier|.., CommaSeparator| _ '}' { return hiding; })? _ ';'
    { return Serif.ImportEverythingDeclaration(source, hiding ?? []); }
  / ImportToken _ specifier:ImportDefaultSpecifier _ 'from' _ source:StringLiteral _ ';'
    { return Serif.ImportDefaultDeclaration(source, specifier); }

ExportDefaultDeclaration
  = ExportToken _ 'default' _ declaration:Expression _ ';'
    { return Serif.ExportDefaultDeclaration(declaration); }

ExportNamedDeclaration
  = ExportToken _ '{' _ '}' _ ';'
    { return Serif.ExportNamedDeclaration([]); }
  / ExportToken _ '{' _ specifiers:Identifier|.., CommaSeparator| _ ','? _ '}' _ ';'
    { return Serif.ExportNamedDeclaration(specifiers); }

BooleanLiteral
  = 'true'  { return Serif.BooleanLiteral(true); }
  / 'false' { return Serif.BooleanLiteral(false); }

NumberLiteral
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber
  = '0' 'b' digits:$[0-1]+
    { return Serif.NumberLiteral(parseInt(digits, 2)); }

OctalNumber
  = '0' 'o' digits:$[0-7]+
    { return Serif.NumberLiteral(parseInt(digits, 8)); }

HexadecimalNumber
  = '0' 'x' digits:$[0-9A-F]+
    { return Serif.NumberLiteral(parseInt(digits, 16)); }

DecimalNumber
  = ('0' / ([1-9] [0-9]*))
    ('.' [0-9]+)?
    { return Serif.NumberLiteral(parseFloat(text())); }

StringLiteral
  = '"' chars:StringCharacter* '"'
    { return Serif.StringLiteral(chars.join('')); }

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
      const quasis = [];
      const expressions = [];
      for (const {quasi, expression} of pairs) {
        quasis.push(Serif.TemplateElement(false, quasi));
        expressions.push(expression);
      }
      quasis.push(Serif.TemplateElement(true, quasi));
      return Serif.TemplateLiteral(quasis, expressions);
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
OrToken             = @$'or'            !IdentifierPart
ThenToken           = @$'then'          !IdentifierPart
TypeofToken         = @$'typeof'        !IdentifierPart

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
  / ImportToken
  / ExportToken

TopicReference
  = '?'
    { return Serif.Identifier('?'); }

Identifier
  = TopicReference
  / !ReservedWord name:$(IdentifierStart IdentifierPart*)
    { return Serif.Identifier(name); }

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
    { return Serif.ArrayExpression([]); }
  / '[' _ elements:ArrayElement|1.., CommaSeparator| _ ','? _ ']'
    { return Serif.ArrayExpression(elements); }

ArrayElement
  = SpreadElement
  / Expression

ObjectExpression
  = '{' _ '}'
    { return Serif.ObjectExpression([]); }
  / '{' _ properties:ObjectElement|1.., CommaSeparator| _ ','? _ '}'
    { return Serif.ObjectExpression(properties); }

ObjectElement
  = SpreadElement
  / Property

Property
  = key:PropertyName _ ':' _ value:AssignmentExpression
    { return Serif.Property(key, value); }

PropertyName
  = LiteralPropertyName
  / ComputedPropertyName

LiteralPropertyName
  = ident:Identifier
    { return Serif.StringLiteral(ident.name); }

ComputedPropertyName
  = '[' _ expression:AssignmentExpression _ ']'
    { return expression; }

AssignmentExpression
  = Expression

ImportMeta
  = meta:ImportToken '.' property:'meta'
    { return Serif.MetaProperty(meta, property); }

PrimaryExpression
  = BooleanLiteral
  / NumberLiteral
  / StringLiteral
  / TemplateLiteral
  / ArrayExpression
  / ObjectExpression
  / ImportMeta
  / Identifier
  / BlockExpression

MemberExpression
  = object:PrimaryExpression
    properties:(
        _ '.' ident:Identifier          { return Serif.StringLiteral(ident.name); }
      / '[' _ property:Expression _ ']' { return property; }
    )*
    { return properties.reduce(Serif.MemberExpression, object); }

ArrowFunctionExpression
  = parameters:ArrowFunctionParameters _ ArrowToken _ body:Expression
    { return Serif.ArrowFunctionExpression(parameters, body); }

LeftHandSideExpression
  = ArrowFunctionExpression
  / MemberExpression

CallExpression
  = head:LeftHandSideExpression
    tail:(
        __ arg:LeftHandSideExpression   { return expr => Serif.CallExpression(expr, [arg]); }
      / _ args:Arguments                { return expr => Serif.CallExpression(expr, args); }
      / _ '.' ident:Identifier          { return expr => Serif.MemberExpression(expr, Serif.StringLiteral(ident.name)); }
      / '[' _ property:Expression _ ']' { return expr => Serif.MemberExpression(expr, property); }
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
  / '(' _ parameters:Pattern|1.., CommaSeparator| _ ')'
    { return parameters; }
  / parameter:Pattern
    { return [parameter]; }

Pattern
  = ArrayPattern
  / ObjectPattern
  / RestElement
  / Identifier

ArrayPattern
  = '[' _ ']'
    { return Serif.ArrayPattern([]); }
  / '[' _ elisions:Elision|.., _| _ ']'
    { return Serif.ArrayPattern(elisions); }
  / '['
    elements:(
        _ elision:Elision                   { return elision; }
      / _ element:ArrayPatternElement _ ',' { return element; }
    )*
    _ element:ArrayPatternElement?
    _ ']'
    { return Serif.ArrayPattern(element == null ? elements : [...elements, element]); }

Elision
  = ','
    { return null; }

ArrayPatternElement
  = Pattern

ObjectPattern
  = '{' _ '}'
    { return Serif.ObjectPattern([]); }
  / '{' _ properties:ObjectPatternProperty|1.., CommaSeparator| _ '}'
    { return Serif.ObjectPattern(properties); }

ObjectPatternProperty
  = ident:Identifier _ ':' _ element:LeftHandSideExpression
    { return Serif.Property(Serif.StringLiteral(ident.name), element); }
  / ident:Identifier
    { return Serif.Property(Serif.StringLiteral(ident.name), ident); }

RestElement
  = '...' argument:Identifier
    { return Serif.RestElement(argument); }

UnaryOperator
  = TypeofToken
  / '+'
  / '-'
  / '~'
  / '!'

UnaryExpression
  = operator:UnaryOperator _ argument:CallExpression
    { return Serif.UnaryExpression(operator, argument); }
  / CallExpression

ExponentiationOperator
  = '**'

ExponentiationExpression
  = left:UnaryExpression
    tail:(_ operator:ExponentiationOperator _ right:UnaryExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

MultiplicativeOperator
  = '*'
  / '/'
  / '%'

MultiplicativeExpression
  = left:ExponentiationExpression
    tail:(_ operator:MultiplicativeOperator _ right:ExponentiationExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

AdditiveOperator
  = '+'
  / '-'

AdditiveExpression
  = left:MultiplicativeExpression
    tail:(_ operator:AdditiveOperator _ right:MultiplicativeExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

ShiftOperator
  = '<<'
  / '>>>'
  / '>>'

ShiftExpression
  = left:AdditiveExpression
    tail:(_ operator:ShiftOperator _ right:AdditiveExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

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
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

EqualityOperator
  = '=='
  / '!='

EqualityExpression
  = left:RelationalExpression
    tail:(_ operator:EqualityOperator _ right:RelationalExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

MapOperator
  = '<$>'

MapExpression
  = exprs:EqualityExpression|1.., _ MapOperator _|
    { return exprs.reduceRight((right, left) => Serif.MapExpression(left, right)); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = left:MapExpression
    tail:(_ operator:BitwiseANDOperator _ right:MapExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

BitwiseXOROperator
  = '^'

BitwiseXORExpression
  = left:BitwiseANDExpression
    tail:(_ operator:BitwiseXOROperator _ right:BitwiseANDExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

BitwiseOROperator
  = '|'

BitwiseORExpression
  = left:BitwiseXORExpression
    tail:(_ operator:BitwiseOROperator _ right:BitwiseXORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

LogicalANDOperator
  = AndToken

LogicalANDExpression
  = left:BitwiseORExpression
    tail:(_ operator:LogicalANDOperator _ right:BitwiseORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.LogicalExpression(operator, left, right), left); }

LogicalOROperator
  = OrToken

LogicalORExpression
  = left:LogicalANDExpression
    tail:(_ operator:LogicalOROperator _ right:LogicalANDExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.LogicalExpression(operator, left, right), left); }

CoalesceOperator
  = '??'

CoalesceExpression
  = left:LogicalORExpression
    tail:(_ operator:CoalesceOperator _ right:LogicalORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.LogicalExpression(operator, left, right), left); }

ConditionalExpression
  = IfToken
    _ predicate:ConditionalExpression
    _ ThenToken
    _ consequent:ConditionalExpression
    _ ElseToken
    _ alternative:ConditionalExpression
    { return Serif.ConditionalExpression(predicate, consequent, alternative); }
  / CoalesceExpression

ApplicationOperator
  = '$'

ApplicationExpression
  = callee:ConditionalExpression
    args:(_ ApplicationOperator _ arg:ApplicationExpression { return arg; })*
    { return args.reduce((callee, arg) => Serif.CallExpression(callee, [arg]), callee); }

PipeOperator
  = '|>'

PipeExpression
  = head:ApplicationExpression
    tail:(_ PipeOperator _ body:ApplicationExpression { return body; })*
    { return tail.reduce(Serif.PipeExpression, head); }

BlockExpression
  = '{' _ statements:Statement|1.., SemicolonSeparator| _ '}'
    { return Serif.BlockExpression(statements); }

Statement
  = FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

FunctionDeclaration
  = ident:Identifier
    parameters:(__ parameter:Pattern { return parameter; })+
    _ '=' _ body:Expression
    { return Serif.FunctionDeclaration(ident.name, parameters, body); }

VariableDeclaration
  = pattern:Pattern _ '=' _ expression:Expression
    { return Serif.VariableDeclaration(pattern, expression); }

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
