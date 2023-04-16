const null$ = globalThis.JSON.parse("null");
const typeof$ = x => x === null$ ? "null" : typeof x;
const equals = this$ => that => (() => {
  switch (globalThis.Object.prototype.toString.call(this$)) {
    case "[object Array]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Array]":
            return this$.length === that.length && this$.every((x, idx) => equals(x)(that[idx]));
          default:
            return false;
        }
      })();
    case "[object Object]":
      return (() => {
        switch (globalThis.Object.prototype.toString.call(that)) {
          case "[object Object]":
            return typeof$(this$["fantasy-land/equals"]) === "function" ? this$["fantasy-land/equals"](that) : this$ === that;
          default:
            return false;
        }
      })();
    default:
      return this$ === that;
  }
})();
const {ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, AssignmentExpression, Block, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, CaseClause, CaseExpression, ConditionalExpression, ContinueStatement, DataConstructorDefinition, DataConstructorPattern, DataTypeDeclaration, DoBlockExpression, EmptySection, ExportAllSpecifier, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, ForStatement, FunctionDeclaration, FunctionExpression, GeneratorFunctionDeclaration, Identifier, IfStatement, IfElseStatement, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixCallExpression, InfixExpression, LabeledStatement, LambdaCaseExpression, LeftSection, LetDeclaration, MemberExpression, MethodCallExpression, Module, NumberLiteral, ObjectExpression, ObjectPattern, PrefixExpression, Property, PropertyAccessor, Quasiquotation, RestElement, ReturnStatement, RightSection, SpreadElement, StringLiteral, SwitchCase, SwitchStatement, ThisExpression, UpdateExpression, VariableDeclaration, WhileStatement} = (() => {
  const $prototype = {
    ["fantasy-land/equals"]: function (that) {
      return equals(this.$tag)(that.$tag) && equals(this.$values)(that.$values);
    }
  };
  const ArrayExpression = elements => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ArrayExpression",
    $values: [elements],
    elements
  });
  const ArrayPattern = elements => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ArrayPattern",
    $values: [elements],
    elements
  });
  const ArrowAssignmentStatement = pattern => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ArrowAssignmentStatement",
    $values: [pattern, expression],
    pattern,
    expression
  });
  const ArrowFunctionExpression = parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ArrowFunctionExpression",
    $values: [parameters, body],
    parameters,
    body
  });
  const AssignmentExpression = operator => left => right => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "AssignmentExpression",
    $values: [operator, left, right],
    operator,
    left,
    right
  });
  const Block = statements => result => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Block",
    $values: [statements, result],
    statements,
    result
  });
  const BlockStatement = statements => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "BlockStatement",
    $values: [statements],
    statements
  });
  const BooleanLiteral = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "BooleanLiteral",
    $values: [value],
    value
  });
  const BreakStatement = globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "BreakStatement",
    $values: []
  });
  const CallExpression = callee => arguments$ => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "CallExpression",
    $values: [callee, arguments$],
    callee,
    arguments: arguments$
  });
  const CaseClause = predicate => consequent => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "CaseClause",
    $values: [predicate, consequent],
    predicate,
    consequent
  });
  const CaseExpression = discriminant => cases => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "CaseExpression",
    $values: [discriminant, cases],
    discriminant,
    cases
  });
  const ConditionalExpression = predicate => consequent => alternative => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ConditionalExpression",
    $values: [predicate, consequent, alternative],
    predicate,
    consequent,
    alternative
  });
  const ContinueStatement = label => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ContinueStatement",
    $values: [label],
    label
  });
  const DataConstructorDefinition = identifier => parameters => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "DataConstructorDefinition",
    $values: [identifier, parameters],
    identifier,
    parameters
  });
  const DataConstructorPattern = identifier => arguments$ => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "DataConstructorPattern",
    $values: [identifier, arguments$],
    identifier,
    arguments: arguments$
  });
  const DataTypeDeclaration = identifier => constructors => implementations => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "DataTypeDeclaration",
    $values: [identifier, constructors, implementations],
    identifier,
    constructors,
    implementations
  });
  const DoBlockExpression = operations => result => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "DoBlockExpression",
    $values: [operations, result],
    operations,
    result
  });
  const EmptySection = operator => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "EmptySection",
    $values: [operator],
    operator
  });
  const ExportAllSpecifier = hiding => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ExportAllSpecifier",
    $values: [hiding],
    hiding
  });
  const ExportDefaultDeclaration = declaration => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ExportDefaultDeclaration",
    $values: [declaration],
    declaration
  });
  const ExportNamedDeclaration = specifiers => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ExportNamedDeclaration",
    $values: [specifiers],
    specifiers
  });
  const ExportSpecifier = local => exported => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ExportSpecifier",
    $values: [local, exported],
    local,
    exported
  });
  const ExpressionStatement = expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ExpressionStatement",
    $values: [expression],
    expression
  });
  const ForStatement = init => test => update => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ForStatement",
    $values: [init, test, update, body],
    init,
    test,
    update,
    body
  });
  const FunctionDeclaration = identifier => parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "FunctionDeclaration",
    $values: [identifier, parameters, body],
    identifier,
    parameters,
    body
  });
  const FunctionExpression = parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "FunctionExpression",
    $values: [parameters, body],
    parameters,
    body
  });
  const GeneratorFunctionDeclaration = identifier => parameters => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "GeneratorFunctionDeclaration",
    $values: [identifier, parameters, body],
    identifier,
    parameters,
    body
  });
  const Identifier = name => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Identifier",
    $values: [name],
    name
  });
  const IfStatement = predicate => consequent => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "IfStatement",
    $values: [predicate, consequent],
    predicate,
    consequent
  });
  const IfElseStatement = predicate => consequent => alternative => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "IfElseStatement",
    $values: [predicate, consequent, alternative],
    predicate,
    consequent,
    alternative
  });
  const ImportAllSpecifier = hiding => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ImportAllSpecifier",
    $values: [hiding],
    hiding
  });
  const ImportDeclaration = source => specifiers => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ImportDeclaration",
    $values: [source, specifiers],
    source,
    specifiers
  });
  const ImportDefaultSpecifier = local => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ImportDefaultSpecifier",
    $values: [local],
    local
  });
  const ImportNamespaceSpecifier = local => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ImportNamespaceSpecifier",
    $values: [local],
    local
  });
  const ImportSpecifier = imported => local => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ImportSpecifier",
    $values: [imported, local],
    imported,
    local
  });
  const InfixCallExpression = operator => left => right => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "InfixCallExpression",
    $values: [operator, left, right],
    operator,
    left,
    right
  });
  const InfixExpression = operator => left => right => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "InfixExpression",
    $values: [operator, left, right],
    operator,
    left,
    right
  });
  const LabeledStatement = label => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "LabeledStatement",
    $values: [label, body],
    label,
    body
  });
  const LambdaCaseExpression = cases => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "LambdaCaseExpression",
    $values: [cases],
    cases
  });
  const LeftSection = operator => operand => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "LeftSection",
    $values: [operator, operand],
    operator,
    operand
  });
  const LetDeclaration = pattern => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "LetDeclaration",
    $values: [pattern, expression],
    pattern,
    expression
  });
  const MemberExpression = object => property => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "MemberExpression",
    $values: [object, property],
    object,
    property
  });
  const MethodCallExpression = name => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "MethodCallExpression",
    $values: [name],
    name
  });
  const Module = imports => exports => statements => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Module",
    $values: [imports, exports, statements],
    imports,
    exports,
    statements
  });
  const NumberLiteral = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "NumberLiteral",
    $values: [value],
    value
  });
  const ObjectExpression = properties => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ObjectExpression",
    $values: [properties],
    properties
  });
  const ObjectPattern = properties => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ObjectPattern",
    $values: [properties],
    properties
  });
  const PrefixExpression = operator => operand => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "PrefixExpression",
    $values: [operator, operand],
    operator,
    operand
  });
  const Property = key => value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Property",
    $values: [key, value],
    key,
    value
  });
  const PropertyAccessor = identifiers => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "PropertyAccessor",
    $values: [identifiers],
    identifiers
  });
  const Quasiquotation = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "Quasiquotation",
    $values: [value],
    value
  });
  const RestElement = argument => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "RestElement",
    $values: [argument],
    argument
  });
  const ReturnStatement = argument => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ReturnStatement",
    $values: [argument],
    argument
  });
  const RightSection = operator => operand => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "RightSection",
    $values: [operator, operand],
    operator,
    operand
  });
  const SpreadElement = argument => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "SpreadElement",
    $values: [argument],
    argument
  });
  const StringLiteral = value => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "StringLiteral",
    $values: [value],
    value
  });
  const SwitchCase = predicates => statements => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "SwitchCase",
    $values: [predicates, statements],
    predicates,
    statements
  });
  const SwitchStatement = discriminant => cases => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "SwitchStatement",
    $values: [discriminant, cases],
    discriminant,
    cases
  });
  const ThisExpression = globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "ThisExpression",
    $values: []
  });
  const UpdateExpression = prefix$003F => operator => argument => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "UpdateExpression",
    $values: [prefix$003F, operator, argument],
    ["prefix?"]: prefix$003F,
    operator,
    argument
  });
  const VariableDeclaration = pattern => expression => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "VariableDeclaration",
    $values: [pattern, expression],
    pattern,
    expression
  });
  const WhileStatement = test => body => globalThis.Object.assign(globalThis.Object.create($prototype), {
    $tag: "WhileStatement",
    $values: [test, body],
    test,
    body
  });
  return {
    ArrayExpression,
    ArrayPattern,
    ArrowAssignmentStatement,
    ArrowFunctionExpression,
    AssignmentExpression,
    Block,
    BlockStatement,
    BooleanLiteral,
    BreakStatement,
    CallExpression,
    CaseClause,
    CaseExpression,
    ConditionalExpression,
    ContinueStatement,
    DataConstructorDefinition,
    DataConstructorPattern,
    DataTypeDeclaration,
    DoBlockExpression,
    EmptySection,
    ExportAllSpecifier,
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    ExportSpecifier,
    ExpressionStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    GeneratorFunctionDeclaration,
    Identifier,
    IfStatement,
    IfElseStatement,
    ImportAllSpecifier,
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportSpecifier,
    InfixCallExpression,
    InfixExpression,
    LabeledStatement,
    LambdaCaseExpression,
    LeftSection,
    LetDeclaration,
    MemberExpression,
    MethodCallExpression,
    Module,
    NumberLiteral,
    ObjectExpression,
    ObjectPattern,
    PrefixExpression,
    Property,
    PropertyAccessor,
    Quasiquotation,
    RestElement,
    ReturnStatement,
    RightSection,
    SpreadElement,
    StringLiteral,
    SwitchCase,
    SwitchStatement,
    ThisExpression,
    UpdateExpression,
    VariableDeclaration,
    WhileStatement
  };
})();
export {ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, AssignmentExpression, Block, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, CaseClause, CaseExpression, ConditionalExpression, ContinueStatement, DataConstructorDefinition, DataConstructorPattern, DataTypeDeclaration, DoBlockExpression, EmptySection, ExportAllSpecifier, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, ForStatement, FunctionDeclaration, FunctionExpression, GeneratorFunctionDeclaration, Identifier, IfStatement, IfElseStatement, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixCallExpression, InfixExpression, LabeledStatement, LambdaCaseExpression, LeftSection, LetDeclaration, MemberExpression, MethodCallExpression, Module, NumberLiteral, ObjectExpression, ObjectPattern, PrefixExpression, Property, PropertyAccessor, Quasiquotation, RestElement, ReturnStatement, RightSection, SpreadElement, StringLiteral, SwitchCase, SwitchStatement, ThisExpression, UpdateExpression, VariableDeclaration, WhileStatement};
