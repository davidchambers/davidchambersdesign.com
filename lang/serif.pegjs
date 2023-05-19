{{
  class PrecedenceParsingError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PrecedenceParsingError';
    }
  }

  const lassoc = head => tail => tail.reduce(
    (left, [operator, right]) => Node.Infix(operator)(left)(right),
    head
  );
  const rassoc = head => tail => {
    // x (^ y) (^ z)
    // (x ^) (y ^) z
    const [init, last] = tail.reduce(
      ([init, lhs], [operator, rhs]) => [[...init, {lhs, operator}], rhs],
      [[], head]
    );
    return init.reduceRight(
      (rhs, {lhs, operator}) => Node.Infix(operator)(lhs)(rhs),
      last
    );
  };
  const xassoc = head => tail => {
    if (tail.length > 1) {
      const [[op1], [op2]] = tail;
      throw new PrecedenceParsingError(`Cannot mix ‘${op1}’ and ‘${op2}’ in the same infix expression`);
    }
    return tail.reduce(
      (left, [operator, right]) => Node.Infix(operator)(left)(right),
      head
    );
  };
}}

Module
  = _ imports:ImportDeclaration|.., _|
    _ exports:ExportDeclaration|.., _|
    _ statements:Statement|.., _|
    _
    { return Node.Module(imports)(exports)(statements); }

ImportSpecifier
  = imported:Identifier _ AsToken _ local:Identifier                                                { return Node.ImportSpecifier(imported)(local); }
  / local:Identifier                                                                                { return Node.ImportSpecifier(local)(local); }

ImportSpecifiers
  = '{' _ '}'                                                                                       { return []; }
  / '{' _            specifiers:ImportSpecifier|.., CommaSeparator| TrailingComma '}'               { return specifiers; }
  / '*' _ HidingToken _ '{' _ hiding:Identifier|.., CommaSeparator| TrailingComma '}'               { return [Node.ImportAllSpecifier(hiding)]; }
  / '*'                                                                                             { return [Node.ImportAllSpecifier([])]; }

ImportNamespaceSpecifier
  = '*' _ AsToken _ local:Identifier                                                                { return Node.ImportNamespaceSpecifier(local); }

ImportDefaultSpecifier
  = local:Identifier                                                                                { return Node.ImportDefaultSpecifier(local); }

ImportDeclaration
  = ImportToken _ specifiers:(
        defaultSpecifier:ImportDefaultSpecifier _ ',' _ namespaceSpecifier:ImportNamespaceSpecifier { return [defaultSpecifier, namespaceSpecifier]; }
      / defaultSpecifier:ImportDefaultSpecifier _ ',' _ specifiers:ImportSpecifiers                 { return [defaultSpecifier, ...specifiers]; }
      / defaultSpecifier:ImportDefaultSpecifier                                                     { return [defaultSpecifier]; }
      / namespaceSpecifier:ImportNamespaceSpecifier                                                 { return [namespaceSpecifier]; }
      / ImportSpecifiers
    ) _ FromToken _ source:String _ ';'
    { return Node.ImportDeclaration(source)(specifiers); }

ExportSpecifier
  = local:Identifier _ AsToken _ exported:Identifier                                                { return Node.ExportSpecifier(local)(exported); }
  / local:Identifier                                                                                { return Node.ExportSpecifier(local)(local); }

ExportSpecifiers
  = '{' _ '}'                                                                                       { return []; }
  / '{' _            specifiers:ExportSpecifier|.., CommaSeparator| TrailingComma '}'               { return specifiers; }
  / '*' _ HidingToken _ '{' _ hiding:Identifier|.., CommaSeparator| TrailingComma '}'               { return [Node.ExportAllSpecifier(hiding)]; }
  / '*'                                                                                             { return [Node.ExportAllSpecifier([])]; }

ExportDefaultDeclaration
  = ExportToken _ 'default' _ declaration:Expression _ ';'                                          { return Node.ExportDefaultDeclaration(declaration); }

ExportNamedDeclaration
  = ExportToken _ specifiers:ExportSpecifiers _ ';'                                                 { return Node.ExportNamedDeclaration(specifiers); }

ExportDeclaration
  = ExportDefaultDeclaration
  / ExportNamedDeclaration

Boolean
  = TrueToken   { return Node.Boolean(true); }
  / FalseToken  { return Node.Boolean(false); }

Number
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber      = '0' 'b' digits:$[0-1]+                  { return Node.Number(parseInt(digits, 0b10)); }
OctalNumber       = '0' 'o' digits:$[0-7]+                  { return Node.Number(parseInt(digits, 0o10)); }
HexadecimalNumber = '0' 'x' digits:$[0-9A-F]+               { return Node.Number(parseInt(digits, 0x10)); }
DecimalNumber     = ('0' / ([1-9] [0-9]*)) ('.' [0-9]+)?    { return Node.Number(parseFloat(text())); }

String
  = '"' chars:StringCharacter* '"'
    { return Node.String(chars.join('')); }

StringCharacter
  = '\\' '\n' ' '* '\\' { return ''; }
  / '\\' @('"' / '\\' / EscapeSequence)
  / !'"' !'\\' !'\n' @.

EscapeSequence
  = 'n'                           { return '\n'; }
  / 'r'                           { return '\r'; }
  / 't'                           { return '\t'; }
  / 'x' digits:$[0-9A-Fa-f]|1..6| { return String.fromCodePoint(parseInt(digits, 16)); }

Quasiquotation
  = '[|' value:$(!'|]' @.)* '|]'
    { return Node.Quasiquotation(value); }

ArrowToken          = @'->'             !IdentifierPart
AsToken             = @'as'             !IdentifierPart
BackslashCaseToken  = @'\\case'         !IdentifierPart
CaseToken           = @'case'           !IdentifierPart
DoToken             = @'do'             !IdentifierPart
ElseToken           = @'else'           !IdentifierPart
ExportToken         = @'export'         !IdentifierPart
FalseToken          = @'false'          !IdentifierPart
FromToken           = @'from'           !IdentifierPart
HidingToken         = @'hiding'         !IdentifierPart
IfToken             = @'if'             !IdentifierPart
ImplementsToken     = @'implements'     !IdentifierPart
ImportToken         = @'import'         !IdentifierPart
InToken             = @'in'             !IdentifierPart
LetToken            = @'let'            !IdentifierPart
OfToken             = @'of'             !IdentifierPart
ReturnToken         = @'return'         !IdentifierPart
ThenToken           = @'then'           !IdentifierPart
ThisToken           = @'this'           !IdentifierPart
TrueToken           = @'true'           !IdentifierPart
TypeToken           = @'type'           !IdentifierPart
VarToken            = @'var'            !IdentifierPart
WhenToken           = @'when'           !IdentifierPart
WhileToken          = @'while'          !IdentifierPart

// prefix
PrefixOperator
  = '-'

// infix
ReassignmentOperator
  = @':='    !IdentifierPart
CompositionOperator
  = @'.'    !IdentifierPart
ExponentiationOperator
  = @'^'    !IdentifierPart
MultiplicativeOperator
  = @'*'    !IdentifierPart
  / @'/'    !IdentifierPart
AdditiveOperator
  = @'+'    !IdentifierPart
  / @'-'    !IdentifierPart
ShiftOperator
  = @'.<.'  !IdentifierPart
  / @'.>.'  !IdentifierPart
  / @'.0>.' !IdentifierPart
BitwiseANDOperator
  = @'.&.'  !IdentifierPart
BitwiseXOROperator
  = @'.^.'  !IdentifierPart
BitwiseOROperator
  = @'.|.'  !IdentifierPart
ConcatenationOperator
  = @'<>'   !IdentifierPart
PrependOperator
  = @',..'  !IdentifierPart
AppendOperator
  = @'..,'  !IdentifierPart
LeftInfixOperator9
  = @'<$>'  !IdentifierPart
  / @'<*>'  !IdentifierPart
RelationalOperator
  = @'<'    !IdentifierPart
  / @'>'    !IdentifierPart
  / @'<='   !IdentifierPart
  / @'>='   !IdentifierPart
  / @'has'  !IdentifierPart
/// @'in'   !IdentifierPart
EqualityOperator
  = @'=='   !IdentifierPart
  / @'/='   !IdentifierPart
LogicalANDOperator
  = @'&&'   !IdentifierPart
LogicalOROperator
  = @'||'   !IdentifierPart
LeftInfixOperator3
  = @'<&>'  !IdentifierPart
  / @'>>='  !IdentifierPart
PipeOperator
  = @'&'    !IdentifierPart
ApplicationOperator
  = @'$'    !IdentifierPart

InfixOperator
  = PrependOperator         // ,..
  / AppendOperator          // ..,
  / CompositionOperator     // .
  / ExponentiationOperator  // ^
  / MultiplicativeOperator  // * /
  / AdditiveOperator        // + -
  / ShiftOperator           // << >> >>>
  / BitwiseANDOperator      // .&.
  / BitwiseXOROperator      // .^.
  / BitwiseOROperator       // .|.
  / ConcatenationOperator   // <>
  / LeftInfixOperator9      // <$> <*>
  / RelationalOperator      // < > <= >= has in
  / EqualityOperator        // == /=
  / LogicalANDOperator      // &&
  / LogicalOROperator       // ||
  / LeftInfixOperator3      // <&> >>=
  / PipeOperator            // &
  / ApplicationOperator     // $

ReservedWord
  = PrefixOperator
  / InfixOperator
  / IfToken
  / ThenToken
  / ElseToken
  / WhenToken
  / CaseToken
  / OfToken
  / DoToken
  / ExportToken
  / ThisToken
  / ImplementsToken
  / InToken
  / LetToken
  / ReturnToken
  / VarToken
  / WhileToken

IdentifierName
  = !ReservedWord @$(IdentifierStart IdentifierPart*)

Identifier
  = name:IdentifierName
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
    !'|'
    !'%'
    !'@'
    .

IdentifierPart
  = IdentifierStart
  / [0-9]
  / '-'
  / '='
  / '$'
  / '|'
  / '%'

This
  = ThisToken
    { return Node.This; }

Array
  = '[' _ ']'                                                                   { return Node.Array([]); }
  / '[' _ elements:ArrayElement|1.., CommaSeparator| TrailingComma ']'          { return Node.Array(elements); }

ArrayElement
  = Spread
  / Expression

Object
  = '{' _ '}'                                                                   { return Node.Object([]); }
  / '{' _ properties:ObjectElement|1.., CommaSeparator| TrailingComma '}'       { return Node.Object(properties); }

ObjectElement
  = Spread
  / Property

Property
  = '[' _ key:Expression _ ']' _ ':' _ value:Expression                         { return Node.Property(key)(value); }
  / key:PropertyName value:(_ ':' _ @Expression)?                               { return Node.Property(key)(value ?? Node.Identifier(key.value)); }

PropertyName
  = name:$(IdentifierStart IdentifierPart*)                                     { return Node.String(name); }

PropertyAccess
  = _ '.' @PropertyName
  / '[' _ @Expression _ ']'

PrimaryExpression
  = Boolean
  / Number
  / String
  / Quasiquotation
  / DoBlockExpression
  / Object
  / Array
  / Identifier
  / This
  / LeftSection
  / RightSection
  / EmptySection
  / PropertyAccessor

Member
  = object:PrimaryExpression properties:PropertyAccess*
    { return properties.reduce((object, property) => Node.Member(object)(property), object); }

FunctionExpression
  = '\\' parameterss:ArrowFunctionParameters|1.., __| _ ArrowToken _ body:(Expression / Block)
    { return parameterss.reduceRight((body, parameters) => Node.ArrowFunctionExpression(parameters)(body), body); }

MethodCall
  = '.' name:IdentifierName
    { return Node.MethodCall(name); }

LeftHandSideExpression
  = FunctionExpression
  / MethodCall
  / Member
  / '(' _ @Expression _ ')'

Call
  = BackslashCaseToken _ cases:CaseClauses
    { return Node.LambdaCase(cases); }
  / head:LeftHandSideExpression
    tail:(
        __ arg:LeftHandSideExpression   { return callee => Node.Call(callee)([arg]); }
      / _ args:Arguments                { return callee => Node.Call(callee)(args); }
      / property:PropertyAccess         { return object => Node.Member(object)(property); }
    )*
    { return tail.reduce((expr, wrap) => wrap(expr), head); }

Arguments
  = '(' _ ')'                                                                       { return []; }
  / '(' _ @(Spread / Expression)|1.., CommaSeparator| TrailingComma ')'

ArrowFunctionParameters
  = '(' _ ')'                                                                       { return []; }
  / '(' _ @Pattern|1.., CommaSeparator| TrailingComma ')'
  / parameter:Pattern                                                               { return [parameter]; }

Prefix
  = operator:PrefixOperator _ argument:Call                                         { return Node.Prefix(operator)(argument); }
  / Call

CompositionExpression       = head:Prefix                   tail:(_ @CompositionOperator    _ @Prefix)*                     { return rassoc(head)(tail); }
InfixCallExpression         = head:CompositionExpression    tail:(_ '`' @Identifier '`'     _ @CompositionExpression)*      { return tail.reduce((lhs, [operator, rhs]) => Node.InfixCall(operator)(lhs)(rhs), head); }
ExponentiationExpression    = head:InfixCallExpression      tail:(_ @ExponentiationOperator _ @InfixCallExpression)*        { return rassoc(head)(tail); }
MultiplicativeExpression    = head:ExponentiationExpression tail:(_ @MultiplicativeOperator _ @ExponentiationExpression)*   { return lassoc(head)(tail); }
AdditiveExpression          = head:MultiplicativeExpression tail:(_ @AdditiveOperator       _ @MultiplicativeExpression)*   { return lassoc(head)(tail); }
ShiftExpression             = head:AdditiveExpression       tail:(_ @ShiftOperator          _ @AdditiveExpression)*         { return lassoc(head)(tail); }
BitwiseANDExpression        = head:ShiftExpression          tail:(_ @BitwiseANDOperator     _ @ShiftExpression)*            { return lassoc(head)(tail); }
BitwiseXORExpression        = head:BitwiseANDExpression     tail:(_ @BitwiseXOROperator     _ @BitwiseANDExpression)*       { return lassoc(head)(tail); }
BitwiseORExpression         = head:BitwiseXORExpression     tail:(_ @BitwiseOROperator      _ @BitwiseXORExpression)*       { return lassoc(head)(tail); }
ConcatenationExpression     = head:BitwiseORExpression      tail:(_ @ConcatenationOperator  _ @BitwiseORExpression)*        { return rassoc(head)(tail); }
PrependExpression           = head:ConcatenationExpression  tail:(_ @PrependOperator        _ @ConcatenationExpression)*    { return rassoc(head)(tail); }
AppendExpression            = head:PrependExpression        tail:(_ @AppendOperator         _ @PrependExpression)*          { return lassoc(head)(tail); }
LeftInfix9                  = head:AppendExpression         tail:(_ @LeftInfixOperator9     _ @AppendExpression)*           { return lassoc(head)(tail); }
RelationalExpression        = head:LeftInfix9               tail:(_ @RelationalOperator     _ @LeftInfix9)*                 { return xassoc(head)(tail); }
EqualityExpression          = head:RelationalExpression     tail:(_ @EqualityOperator       _ @RelationalExpression)*       { return xassoc(head)(tail); }
LogicalANDExpression        = head:EqualityExpression       tail:(_ @LogicalANDOperator     _ @EqualityExpression)*         { return lassoc(head)(tail); }
LogicalORExpression         = head:LogicalANDExpression     tail:(_ @LogicalOROperator      _ @LogicalANDExpression)*       { return lassoc(head)(tail); }
LeftInfix3                  = head:LogicalORExpression      tail:(_ @LeftInfixOperator3     _ @LogicalORExpression)*        { return lassoc(head)(tail); }
PipeExpression              = head:LeftInfix3               tail:(_ @PipeOperator           _ @LeftInfix3)*                 { return lassoc(head)(tail); }
ApplicationExpression       = head:CaseExpression           tail:(_ @ApplicationOperator    _ @ApplicationExpression)*      { return rassoc(head)(tail); }
ReassignmentExpression      = head:ApplicationExpression    tail:(_ @ReassignmentOperator   _ @ReassignmentExpression)*     { return rassoc(head)(tail); }

ConditionalExpression
  = IfToken _ predicate:Expression _ ThenToken _ consequent:Expression _ ElseToken _ alternative:Expression
    { return Node.ConditionalExpression(predicate)(consequent)(alternative); }
  / PipeExpression

LetExpression
  = LetToken _ bindings:LetBinding|1.., CommaSeparator| _ InToken _ expression:Expression
    { return Node.LetExpression(bindings.map((binding, index) => binding(index)))(expression); }
  / ConditionalExpression

LetBinding
  = pattern:Pattern _ '=' _ expression:Expression
    { return index => Node.LetBinding(index)(pattern)(expression); }

CaseExpression
  = CaseToken _ discriminant:Expression _ OfToken _ cases:CaseClauses
    { return Node.CaseExpression(discriminant)(cases); }
  / LetExpression

CaseClauses
  = '[' _ ']' { return []; }
  / '[' _ @CaseClause|1.., CommaSeparator| TrailingComma ']'

CaseClause
  = predicate:Pattern _ ArrowToken _ consequent:(Expression / Block)
    { return Node.CaseClause(predicate)(consequent); }

Pattern
  = '(' _ @Pattern _ ')'
  / Any
  / bool:Boolean                                                        { return Pattern.Boolean(bool.value); }
  / number:Number                                                       { return Pattern.Number(number.value); }
  / string:String                                                       { return Pattern.String(string.value); }
  / identifier:Identifier _ ':' _ pattern:Pattern                       { return Pattern.As(identifier.name)(pattern); }
  / & [A-Z] identifier:Identifier args:(_ @Pattern)*                    { return Pattern.Data(identifier.name)(args); }
  / identifier:Identifier                                               { return Pattern.Identifier(identifier.name); }
  / '[' _ patterns:(Pattern / Slice)|.., CommaSeparator| _ ']'          { return Pattern.Array(patterns); }
  / '{' _ properties:PropertyPattern|.., CommaSeparator| _ '}'          { return Pattern.Object(properties); }

InlinePattern
  = '(' _ @InlinePattern _ ')'
  / identifier:Identifier _ ':' _ pattern:InlinePattern                 { return Pattern.As(identifier.name)(pattern); }
  / & [A-Z] identifier:Identifier args:(_ @InlinePattern)+              { return Pattern.Data(identifier.name)(args); }
  / identifier:Identifier                                               { return Pattern.Identifier(identifier.name); }
  / '[' _ patterns:InlinePattern|.., CommaSeparator| _ ']'              { return Pattern.Array(patterns); }
  / '[' _ before:(@InlinePattern CommaSeparator)*
          slice:Slice
          after:(CommaSeparator @InlinePattern)* _ ']'                  { return Pattern.Array([...before, slice, ...after]); }
  / '{' _ properties:PropertyPattern|.., CommaSeparator| _ '}'          { return Pattern.Object(properties); }

Any
  = '_'                                                                 { return Pattern.Any; }

Slice
  = '...' pattern:Pattern                                               { return Pattern.Slice(pattern); }
  / '...'                                                               { return Pattern.Slice(Pattern.Any); }

PropertyPattern
  = name:PropertyName pattern:(_ ':' _ @Pattern)?                       { return Pattern.Property(name.value)(pattern ?? Pattern.Identifier(name.value)); }

PropertyAccessor
  = '(' identifiers:('.' @Identifier)+ ')'
    { return Node.PropertyAccessor(identifiers); }

LeftSection   = '(' lhs:Expression __ operator:InfixOperator ')'    { return Node.LeftSection(operator)(lhs); }
RightSection  = '(' operator:InfixOperator __ rhs:Expression ')'    { return Node.RightSection(operator)(rhs); }
EmptySection  = '(' operator:InfixOperator ')'                      { return Node.EmptySection(operator); }

DoBlockExpression
  = DoToken _ '{' _ operations:DoOperation|.., _| _ result:Expression _ '}'
    { return Node.DoBlockExpression(operations)(result); }

DoOperation
  = ArrowAssignmentStatement
  / FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

ArrowAssignmentStatement
  = pattern:InlinePattern _ '<-' _ expression:Expression _ ';'
    { return Node.ArrowAssignmentStatement(pattern)(expression); }

Statement
  = DataTypeDeclaration
  / FunctionDeclaration
  / VariableDeclaration
  / VarToken _ identifier:Identifier _ ';' { return Node.VarDeclaration(identifier); }
  / ExpressionStatement
  / Return
  / While
  / Block
  / If

FunctionDeclaration
  = ident:Identifier parameters:(__ @Identifier)+ _ '=' _ body:(Expression / Block) _ ';'
    { return Node.FunctionDeclaration(ident)(parameters)(body); }

VariableDeclaration
  = pattern:InlinePattern _ '=' _ expression:Expression _ ';'
    { return Node.Var('const')(pattern)(expression); }

Return
  = ReturnToken _ argument:Expression _ ';'
    { return Node.Return(argument); }

While
  = WhileToken _ '(' _ predicate:Expression _ ')' _ body:Statement
    { return Node.While(predicate)(body); }

Block
  = '{' _ statements:Statement|1.., _| _ '}'
    { return Node.Block(statements); }

If
  = IfToken _ predicate:Expression _ ThenToken _ consequent:Statement alternative:(_ ElseToken _ @Statement)?
    { return Node.If(predicate)(consequent)(Maybe.fromNullable(alternative)); }

DataTypeDeclaration
  = TypeToken
    _ identifier:Identifier
    _ '='
    _ '|'?
    _ constructors:DataConstructorDefinition|1.., _ '|' _|
    _ implementations:(ImplementsToken _ @Object)?
    _ ';'
    { return Node.DataTypeDeclaration(identifier)(constructors)(implementations ?? Node.Object([])); }

DataConstructorDefinition
  = identifier:Identifier parameters:(_ @Identifier)*
    { return Node.DataConstructorDefinition(identifier)(parameters); }

ExpressionStatement
  = expression:Expression _ ';'
    { return Node.Expression(expression); }

Spread
  = '...' argument:Expression
    { return Node.Spread(argument); }

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
  = '--' (!LineTerminator .)*

_ =
  (Whitespace / Comment)*

__
  = Comment? Whitespace _

CommaSeparator
  = _ ',' _

TrailingComma
  = _ ','? _

Expression
  = ReassignmentExpression
