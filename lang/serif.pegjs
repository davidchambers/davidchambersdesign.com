Module
  = imports:(_ importDeclaration:ImportDeclaration                                   { return importDeclaration; })*
    exports:(_ exportDeclaration:(ExportNamedDeclaration / ExportDefaultDeclaration) { return exportDeclaration; })*
    statements:(_ statement:Statement _ ';' { return statement; })*
    _
    { return Serif.Module([...imports, ...statements, ...exports]); }

ImportSpecifier
  = local:Identifier
    { return Serif.ImportSpecifier(local, local); }

ImportDefaultSpecifier
  = local:Identifier
    { return Serif.ImportDefaultSpecifier(local); }

ImportDeclaration
  = ImportToken _ '{' _ specifiers:ImportSpecifier|.., CommaSeparator| _ '}' _ 'from' _ source:StringLiteral _ ';'
    { return Serif.ImportDeclaration(source, specifiers); }
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
  = '0' 'b' digits:$([0-1])+
    { return Serif.NumberLiteral(parseInt(digits, 2)); }

OctalNumber
  = '0' 'o' digits:$([0-7])+
    { return Serif.NumberLiteral(parseInt(digits, 8)); }

HexadecimalNumber
  = '0' 'x' digits:$([0-9A-F])+
    { return Serif.NumberLiteral(parseInt(digits, 16)); }

DecimalNumber
  = ('0' / ([1-9] [0-9]*))
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
  / '\\' 'u' digits:$[0-9A-F]|4|
              { return String.fromCharCode(parseInt(digits, 16)); }
  / '\\'      { expected('valid escape sequence'); }
  / !'"' c:.  { return c; }

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
  = $(TemplateLiteralChar*)

TemplateLiteralChar
  = '\\' '`'  { return '\\`'; }
  / '\\' '$'  { return '\\$'; }
  / '\\' '\\' { return '\\\\'; }
  / '\\' 'b'  { return '\\b'; }
  / '\\' 'f'  { return '\\f'; }
  / '\\' 'n'  { return '\\n'; }
  / '\\' 'r'  { return '\\r'; }
  / '\\' 't'  { return '\\t'; }
  / '\\' 'u' digits:$[0-9A-F]|4|
              { return '\\u' + digits; }
  / '\\'      { expected('valid escape sequence'); }
  / '$' !'{'  { return '$'; }
  / !'`' !'$' c:.  { return c; }

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
ExportToken         = 'export'          !IdentifierPart     { return text(); }
IfToken             = 'if'              !IdentifierPart     { return text(); }
ImportToken         = 'import'          !IdentifierPart     { return text(); }
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
      / _ '.' ident:Identifier          { return Serif.StringLiteral(ident.name); }
      / '[' _ property:Expression _ ']' { return property; }
    )*
    { return properties.reduce(Serif.MemberExpression, object); }

NewExpression
  = NewToken _ callee:MemberExpression _ args:Arguments
    { return Serif.NewExpression(callee, args); }

CallExpression
  = head:MemberExpression
    tail:(
        _ args:Arguments                { return expr => Serif.CallExpression(expr, args); }
      / symbol:SymbolLiteral            { return expr => Serif.MemberExpression(expr, symbol); }
      / _ '.' ident:Identifier          { return expr => Serif.MemberExpression(expr, Serif.StringLiteral(ident.name)); }
      / '[' _ property:Expression _ ']' { return expr => Serif.MemberExpression(expr, property); }
    )*
    { return tail.reduce((expr, wrap) => wrap(expr), head); }

Arguments
  = '(' _ ')'
    { return []; }
  / '(' _ args:(SpreadElement / Expression)|1.., CommaSeparator| _ ')'
    { return args; }

ArrowFunctionExpression
  = parameters:ArrowFunctionParameters _ '=>' _ body:Expression
    { return Serif.ArrowFunctionExpression(parameters, body); }
  / CallExpression

ArrowFunctionParameters
  = '(' _ ')'
    { return []; }
  / '(' _ parameters:Pattern|1.., CommaSeparator| _ ')'
    { return parameters; }
  / parameter:Pattern
    { return [parameter]; }

// AssignmentPattern
//   = ObjectAssignmentPattern
//   / ArrayAssignmentPattern
//
// ObjectAssignmentPattern
//   = '{' _ '}'
//   / '{' _ AssignmentRestProperty _ '}'
//   / '{' _ AssignmentPropertyList _ '}'
//   / '{' _ AssignmentPropertyList _ ',' _ AssignmentRestProperty _ '}'
//
// ArrayAssignmentPattern
//   = '[' _ Elision? _ AssignmentRestElement? _ ']'
//   / '[' _ AssignmentElementList _ ']'
//   / '[' _ AssignmentElementList _ ',' _ Elision|.., _| _ AssignmentRestElement _ ']'
//
// AssignmentRestProperty
//   = '...' DestructuringAssignmentTarget
//
// AssignmentPropertyList
//   = AssignmentElisionElement
//   / AssignmentElementList _ ',' _ AssignmentElisionElement
//
// AssignmentElementList
//   = AssignmentElisionElement
//   / AssignmentElementList _ ',' _ AssignmentElisionElement
//
// AssignmentElisionElement
//   = Elision|.., _| _ AssignmentElement
//
// AssignmentProperty
//   = IdentifierReference // _ Initializer?
//   / PropertyName _ ':' _ AssignmentElement
//
// AssignmentElement
//   = DestructuringAssignmentTarget // _ Initializer?
//
// AssignmentRestElement
//   = '...' DestructuringAssignmentTarget
//
// DestructuringAssignmentTarget
//   = LeftHandSideExpression
//
// Elision
//   = ','

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
    { return Serif.AssignmentProperty(ident, element); }
  / ident:Identifier
    { return Serif.AssignmentProperty(ident, ident); }

RestElement
  = '...' argument:Identifier
    { return Serif.RestElement(argument); }

Application
  = callee:ArrowFunctionExpression
    args:(__ arg:ArrowFunctionExpression { return arg; })+
    { return Serif.Application(callee, args); }
  / ArrowFunctionExpression

LeftHandSideExpression
  = ArrowFunctionExpression

UnaryOperator
  = TypeofToken
  / '+'
  / '-'
  / '~'
  / '!'

UnaryExpression
  = operator:UnaryOperator _ argument:Application
    { return Serif.UnaryExpression(operator, argument); }
  / Application

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
  = '==='
  / '=='
  / '!=='
  / '!='

EqualityExpression
  = left:RelationalExpression
    tail:(_ operator:EqualityOperator _ right:RelationalExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.BinaryExpression(operator, left, right), left); }

BitwiseANDOperator
  = '&'

BitwiseANDExpression
  = left:EqualityExpression
    tail:(_ operator:BitwiseANDOperator _ right:EqualityExpression { return {operator, right}; })*
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
  = '&&'

LogicalANDExpression
  = left:BitwiseORExpression
    tail:(_ operator:LogicalANDOperator _ right:BitwiseORExpression { return {operator, right}; })*
    { return tail.reduce((left, {operator, right}) => Serif.LogicalExpression(operator, left, right), left); }

LogicalOROperator
  = '||'

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
    { return args.reduce((callee, arg) => Serif.Application(callee, [arg]), callee); }

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
