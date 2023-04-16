{{
  class PrecedenceParsingError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PrecedenceParsingError';
    }
  }

  const lassoc = head => tail => tail.reduce(
    (left, [operator, right]) => Node.InfixExpression(operator)(left)(right),
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
      (rhs, {lhs, operator}) => Node.InfixExpression(operator)(lhs)(rhs),
      last
    );
  };
  const xassoc = head => tail => {
    if (tail.length > 1) {
      const [[op1], [op2]] = tail;
      throw new PrecedenceParsingError(`Cannot mix ‘${op1}’ and ‘${op2}’ in the same infix expression`);
    }
    return tail.reduce(
      (left, [operator, right]) => Node.InfixExpression(operator)(left)(right),
      head
    );
  };

  const infixOperators = {
    '.'    : Operator('.'),
    '^'    : Operator('^'),
    '*'    : Operator('*'),
    '/'    : Operator('/'),
    '+'    : Operator('+'),
    '-'    : Operator('-'),
    '.<.'  : Operator('.<.'),
    '.>.'  : Operator('.>.'),
    '.0>.' : Operator('.0>.'),
    '.&.'  : Operator('.&.'),
    '.^.'  : Operator('.^.'),
    '.|.'  : Operator('.|.'),
    '<>'   : Operator('<>'),
    '<$>'  : Operator('<$>'),
    '<*>'  : Operator('<*>'),
    '<'    : Operator('<'),
    '>'    : Operator('>'),
    '<='   : Operator('<='),
    '>='   : Operator('>='),
    'has'  : Operator('has'),
    'in'   : Operator('in'),
    '=='   : Operator('=='),
    '/='   : Operator('/='),
    '&&'   : Operator('&&'),
    '||'   : Operator('||'),
    '<&>'  : Operator('<&>'),
    '>>='  : Operator('>>='),
    '&'    : Operator('&'),
    '$'    : Operator('$'),
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
    ) _ FromToken _ source:StringLiteral _ ';'
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

BooleanLiteral
  = TrueToken   { return Node.BooleanLiteral(true); }
  / FalseToken  { return Node.BooleanLiteral(false); }

NumberLiteral
  = BinaryNumber
  / OctalNumber
  / HexadecimalNumber
  / DecimalNumber

BinaryNumber      = '0' 'b' digits:$[0-1]+                  { return Node.NumberLiteral(parseInt(digits, 0b10)); }
OctalNumber       = '0' 'o' digits:$[0-7]+                  { return Node.NumberLiteral(parseInt(digits, 0o10)); }
HexadecimalNumber = '0' 'x' digits:$[0-9A-F]+               { return Node.NumberLiteral(parseInt(digits, 0x10)); }
DecimalNumber     = ('0' / ([1-9] [0-9]*)) ('.' [0-9]+)?    { return Node.NumberLiteral(parseFloat(text())); }

StringLiteral
  = '"' chars:StringCharacter* '"'
    { return Node.StringLiteral(chars.join('')); }

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
OfToken             = @'of'             !IdentifierPart
ThenToken           = @'then'           !IdentifierPart
ThisToken           = @'this'           !IdentifierPart
TrueToken           = @'true'           !IdentifierPart
TypeToken           = @'type'           !IdentifierPart
WhenToken           = @'when'           !IdentifierPart

// prefix
PrefixOperator
  = '-'

// infix
CompositionOperator
  = '.'       !IdentifierPart { return infixOperators['.']; }
ExponentiationOperator
  = '^'       !IdentifierPart { return infixOperators['^']; }
MultiplicativeOperator
  = '*'       !IdentifierPart { return infixOperators['*']; }
  / '/'       !IdentifierPart { return infixOperators['/']; }
AdditiveOperator
  = '+'       !IdentifierPart { return infixOperators['+']; }
  / '-'       !IdentifierPart { return infixOperators['-']; }
ShiftOperator
  = '.<.'     !IdentifierPart { return infixOperators['.<.']; }
  / '.>.'     !IdentifierPart { return infixOperators['.>.']; }
  / '.0>.'    !IdentifierPart { return infixOperators['.0>.']; }
BitwiseANDOperator
  = '.&.'     !IdentifierPart { return infixOperators['.&.']; }
BitwiseXOROperator
  = '.^.'     !IdentifierPart { return infixOperators['.^.']; }
BitwiseOROperator
  = '.|.'     !IdentifierPart { return infixOperators['.|.']; }
ConcatenationOperator
  = '<>'      !IdentifierPart { return infixOperators['<>']; }
LeftInfixOperator9
  = '<$>'     !IdentifierPart { return infixOperators['<$>']; }
  / '<*>'     !IdentifierPart { return infixOperators['<*>']; }
RelationalOperator
  = '<'       !IdentifierPart { return infixOperators['<']; }
  / '>'       !IdentifierPart { return infixOperators['>']; }
  / '<='      !IdentifierPart { return infixOperators['<=']; }
  / '>='      !IdentifierPart { return infixOperators['>=']; }
  / 'has'     !IdentifierPart { return infixOperators['has']; }
  / 'in'      !IdentifierPart { return infixOperators['in']; }
EqualityOperator
  = '=='      !IdentifierPart { return infixOperators['==']; }
  / '/='      !IdentifierPart { return infixOperators['/=']; }
LogicalANDOperator
  = '&&'      !IdentifierPart { return infixOperators['&&']; }
LogicalOROperator
  = '||'      !IdentifierPart { return infixOperators['||']; }
LeftInfixOperator3
  = '<&>'     !IdentifierPart { return infixOperators['<&>']; }
  / '>>='     !IdentifierPart { return infixOperators['>>=']; }
PipeOperator
  = '&'       !IdentifierPart { return infixOperators['&']; }
ApplicationOperator
  = '$'       !IdentifierPart { return infixOperators['$']; }

InfixOperator
  = CompositionOperator     // .
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
    .

IdentifierPart
  = IdentifierStart
  / [0-9]
  / '-'
  / '='
  / '$'
  / '|'
  / '%'

ThisExpression
  = ThisToken
    { return Node.ThisExpression; }

ArrayExpression
  = '[' _ ']'                                                                   { return Node.ArrayExpression([]); }
  / '[' _ elements:ArrayElement|1.., CommaSeparator| TrailingComma ']'          { return Node.ArrayExpression(elements); }

ArrayElement
  = SpreadElement
  / Expression

ObjectExpression
  = '{' _ '}'                                                                   { return Node.ObjectExpression([]); }
  / '{' _ properties:ObjectElement|1.., CommaSeparator| TrailingComma '}'       { return Node.ObjectExpression(properties); }

ObjectElement
  = SpreadElement
  / Property

Property
  = '[' _ key:Expression _ ']' _ ':' _ value:Expression                         { return Node.Property(key)(value); }
  / key:PropertyName value:(_ ':' _ @Expression)?                               { return Node.Property(key)(value ?? Node.Identifier(key.value)); }

PropertyName
  = name:$(IdentifierStart IdentifierPart*)                                     { return Node.StringLiteral(name); }

PropertyAccess
  = _ '.' @PropertyName
  / '[' _ @Expression _ ']'

PrimaryExpression
  = BooleanLiteral
  / NumberLiteral
  / StringLiteral
  / Quasiquotation
  / BlockExpression
  / BlockStatement
  / DoBlockExpression
  / ObjectExpression
  / ArrayExpression
  / Identifier
  / ThisExpression
  / PropertyAccessor
  / LeftSection
  / RightSection
  / EmptySection

MemberExpression
  = object:PrimaryExpression properties:PropertyAccess*
    { return properties.reduce((object, property) => Node.MemberExpression(object)(property), object); }

FunctionExpression
  = '\\' parameterss:ArrowFunctionParameters|1.., __| _ ArrowToken _ body:Expression
    { return parameterss.reduceRight((body, parameters) => Node.FunctionExpression(parameters)(body), body); }

MethodCallExpression
  = '.' name:IdentifierName
    { return Node.MethodCallExpression(name); }

LeftHandSideExpression
  = FunctionExpression
  / MethodCallExpression
  / MemberExpression
  / '(' _ @Expression _ ')'

CallExpression
  = BackslashCaseToken _ cases:CaseClauses
    { return Node.LambdaCaseExpression(cases); }
  / head:LeftHandSideExpression
    tail:(
        __ arg:LeftHandSideExpression   { return callee => Node.CallExpression(callee)([arg]); }
      / _ args:Arguments                { return callee => Node.CallExpression(callee)(args); }
      / property:PropertyAccess         { return object => Node.MemberExpression(object)(property); }
    )*
    { return tail.reduce((expr, wrap) => wrap(expr), head); }

Arguments
  = '(' _ ')'                                                                       { return []; }
  / '(' _ @(SpreadElement / Expression)|1.., CommaSeparator| TrailingComma ')'

ArrowFunctionParameters
  = '(' _ ')'                                                                       { return []; }
  / '(' _ @Pattern|1.., CommaSeparator| TrailingComma ')'
  / parameter:Pattern                                                               { return [parameter]; }

Pattern
  = ArrayPattern
  / ObjectPattern
  / RestElement
  / Identifier

ArrayPattern
  = '[' _ ']'                                                                       { return Node.ArrayPattern([]); }
  / '[' _ elements:Pattern|1.., CommaSeparator| TrailingComma ']'                   { return Node.ArrayPattern(elements); }

ObjectPattern
  = '{' _ '}'                                                                       { return Node.ObjectPattern([]); }
  / '{' _ properties:ObjectPatternProperty|1.., CommaSeparator| TrailingComma '}'   { return Node.ObjectPattern(properties); }

ObjectPatternProperty
  = key:PropertyName pattern:(_ ':' _ @Pattern)?                                    { return Node.Property(key)(pattern ?? Node.Identifier(key.value)); }

RestElement
  = '...' argument:Identifier                                                       { return Node.RestElement(argument); }

PrefixExpression
  = operator:PrefixOperator _ argument:CallExpression                               { return Node.PrefixExpression(operator)(argument); }
  / CallExpression

CompositionExpression       = head:PrefixExpression         tail:(_ @CompositionOperator    _ @PrefixExpression)*           { return rassoc(head)(tail); }
InfixCallExpression         = head:CompositionExpression    tail:(_ '`' @Identifier '`'     _ @CompositionExpression)*      { return tail.reduce((lhs, [operator, rhs]) => Node.InfixCallExpression(operator)(lhs)(rhs), head); }
ExponentiationExpression    = head:InfixCallExpression      tail:(_ @ExponentiationOperator _ @InfixCallExpression)*        { return rassoc(head)(tail); }
MultiplicativeExpression    = head:ExponentiationExpression tail:(_ @MultiplicativeOperator _ @ExponentiationExpression)*   { return lassoc(head)(tail); }
AdditiveExpression          = head:MultiplicativeExpression tail:(_ @AdditiveOperator       _ @MultiplicativeExpression)*   { return lassoc(head)(tail); }
ShiftExpression             = head:AdditiveExpression       tail:(_ @ShiftOperator          _ @AdditiveExpression)*         { return lassoc(head)(tail); }
BitwiseANDExpression        = head:ShiftExpression          tail:(_ @BitwiseANDOperator     _ @ShiftExpression)*            { return lassoc(head)(tail); }
BitwiseXORExpression        = head:BitwiseANDExpression     tail:(_ @BitwiseXOROperator     _ @BitwiseANDExpression)*       { return lassoc(head)(tail); }
BitwiseORExpression         = head:BitwiseXORExpression     tail:(_ @BitwiseOROperator      _ @BitwiseXORExpression)*       { return lassoc(head)(tail); }
ConcatenationExpression     = head:BitwiseORExpression      tail:(_ @ConcatenationOperator  _ @BitwiseORExpression)*        { return rassoc(head)(tail); }
LeftInfixExpression9        = head:ConcatenationExpression  tail:(_ @LeftInfixOperator9     _ @ConcatenationExpression)*    { return lassoc(head)(tail); }
RelationalExpression        = head:LeftInfixExpression9     tail:(_ @RelationalOperator     _ @LeftInfixExpression9)*       { return xassoc(head)(tail); }
EqualityExpression          = head:RelationalExpression     tail:(_ @EqualityOperator       _ @RelationalExpression)*       { return xassoc(head)(tail); }
LogicalANDExpression        = head:EqualityExpression       tail:(_ @LogicalANDOperator     _ @EqualityExpression)*         { return lassoc(head)(tail); }
LogicalORExpression         = head:LogicalANDExpression     tail:(_ @LogicalOROperator      _ @LogicalANDExpression)*       { return lassoc(head)(tail); }
LeftInfixExpression3        = head:LogicalORExpression      tail:(_ @LeftInfixOperator3     _ @LogicalORExpression)*        { return lassoc(head)(tail); }
PipeExpression              = head:LeftInfixExpression3     tail:(_ @PipeOperator           _ @LeftInfixExpression3)*       { return lassoc(head)(tail); }
ApplicationExpression       = head:CaseExpression           tail:(_ @ApplicationOperator    _ @ApplicationExpression)*      { return rassoc(head)(tail); }

ConditionalExpression
  = IfToken _ predicate:Expression _ ThenToken _ consequent:Expression alternative:(_ ElseToken _ @Expression)?
    { return Node.ConditionalExpression(predicate)(consequent)(Maybe.fromNullable(alternative)); }
  / PipeExpression

CaseExpression
  = CaseToken _ discriminant:Expression _ OfToken _ cases:CaseClauses
    { return Node.CaseExpression(discriminant)(cases); }
  / ConditionalExpression

CaseClauses
  = '[' _ ']' { return []; }
  / '[' _ @CaseClause|1.., CommaSeparator| TrailingComma ']'

CaseClause
  = predicate:CaseClausePredicate _ ArrowToken _ consequent:Expression
    { return Node.CaseClause(predicate)(consequent); }

CaseClausePredicate
  = CaseClauseArrayPredicate
  / NumberLiteral
  / StringLiteral
  / DataConstructorPattern
  / Identifier

DataConstructorPattern
  = & [A-Z] identifier:Identifier args:(_ @CaseClausePredicate)*
    { return Node.DataConstructorPattern(identifier)(args); }
  / '(' _ @DataConstructorPattern _ ')'

CaseClauseArrayPredicate
  = '[' _ ']'                                                                                   { return Node.ArrayExpression([]); }
  / '[' _ elements:(CaseClausePredicate / RestElement)|1.., CommaSeparator| TrailingComma ']'  { return Node.ArrayExpression(elements); }

PropertyAccessor
  = '(' identifiers:('.' @Identifier)+ ')'
    { return Node.PropertyAccessor(identifiers); }

LeftSection   = '(' lhs:Expression __ operator:InfixOperator ')'    { return Node.LeftSection(operator)(lhs); }
RightSection  = '(' operator:InfixOperator __ rhs:Expression ')'    { return Node.RightSection(operator)(rhs); }
EmptySection  = '(' operator:InfixOperator ')'                      { return Node.EmptySection(operator); }

BlockExpression
  = '{' _ result:Expression _ '}' ! { return result.$tag === 'Identifier'; }  // treat {foo} as an object expression
    { return Node.Block([])(Maybe.Just(result)); }
  / '{' _ statements:Statement|1.., _| _ result:Expression _ '}'
    { return Node.Block(statements)(Maybe.Just(result)); }

BlockStatement
  = '{' _ statements:Statement|1.., _| _ '}'
    { return Node.Block(statements)(Maybe.Nothing); }

DoBlockExpression
  = DoToken _ '{' _ operations:DoOperation|.., _| _ result:Expression _ '}'
    { return Node.DoBlockExpression(operations)(result); }

DoOperation
  = ArrowAssignmentStatement
  / FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

ArrowAssignmentStatement
  = pattern:Pattern _ '<-' _ expression:Expression _ ';'
    { return Node.ArrowAssignmentStatement(pattern)(expression); }

Statement
  = DataTypeDeclaration
  / FunctionDeclaration
  / VariableDeclaration
  / ExpressionStatement

FunctionDeclaration
  = ident:Identifier parameters:(__ @Pattern)+ _ '=' _ body:Expression _ ';'
    { return Node.FunctionDeclaration(ident)(parameters)(body); }

VariableDeclaration
  = pattern:Pattern _ '=' _ expression:Expression _ ';'
    { return Node.VariableDeclaration(pattern)(expression); }

DataTypeDeclaration
  = TypeToken
    _ identifier:Identifier
    _ '='
    _ '|'?
    _ constructors:DataConstructorDefinition|1.., _ '|' _|
    _ implementations:(ImplementsToken _ @ObjectExpression)?
    _ ';'
    { return Node.DataTypeDeclaration(identifier)(constructors)(implementations ?? Node.ObjectExpression([])); }

DataConstructorDefinition
  = identifier:Identifier parameters:(_ @Identifier)*
    { return Node.DataConstructorDefinition(identifier)(parameters); }

ExpressionStatement
  = expression:Expression _ ';'
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
  = ApplicationExpression
