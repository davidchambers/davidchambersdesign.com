const match = type => match$0027(type)(x => CasesNotExhaustive);
const match$0027 = type => type[globalThis.Symbol.for("match")];
const map = f => x => globalThis.Array.isArray(x) ? x.map(x => f(x)) : x["fantasy-land/map"](f);
const {Node, ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, BinaryExpression, BindExpression, BlockExpression, BlockStatement, BooleanLiteral, CallExpression, CompositionExpression, ConcatenationExpression, ConditionalExpression, DataConstructorDefinition, DataTypeDeclaration, DoBlockExpression, Elision, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, FunctionDeclaration, Identifier, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixCallExpression, LogicalExpression, MapExpression, MemberExpression, MethodCallExpression, Module, NullLiteral, NumberLiteral, ObjectExpression, ObjectPattern, PipeExpression, Property, PropertyAccessor, RestElement, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, TemplateLiteral, UnaryExpression, VariableDeclaration} = (() => {
  const ArrayExpression = elements => ({
    [Symbol.for("tag")]: "ArrayExpression",
    elements
  });
  const ArrayPattern = elements => ({
    [Symbol.for("tag")]: "ArrayPattern",
    elements
  });
  const ArrowAssignmentStatement = pattern => expression => ({
    [Symbol.for("tag")]: "ArrowAssignmentStatement",
    pattern,
    expression
  });
  const ArrowFunctionExpression = parameters => body => ({
    [Symbol.for("tag")]: "ArrowFunctionExpression",
    parameters,
    body
  });
  const BinaryExpression = operator => left => right => ({
    [Symbol.for("tag")]: "BinaryExpression",
    operator,
    left,
    right
  });
  const BindExpression = left => right => ({
    [Symbol.for("tag")]: "BindExpression",
    left,
    right
  });
  const BlockExpression = statements => result => ({
    [Symbol.for("tag")]: "BlockExpression",
    statements,
    result
  });
  const BlockStatement = statements => ({
    [Symbol.for("tag")]: "BlockStatement",
    statements
  });
  const BooleanLiteral = value => ({
    [Symbol.for("tag")]: "BooleanLiteral",
    value
  });
  const CallExpression = callee => arguments$ => ({
    [Symbol.for("tag")]: "CallExpression",
    callee,
    arguments: arguments$
  });
  const CompositionExpression = left => right => ({
    [Symbol.for("tag")]: "CompositionExpression",
    left,
    right
  });
  const ConcatenationExpression = left => right => ({
    [Symbol.for("tag")]: "ConcatenationExpression",
    left,
    right
  });
  const ConditionalExpression = predicate => consequent => alternative => ({
    [Symbol.for("tag")]: "ConditionalExpression",
    predicate,
    consequent,
    alternative
  });
  const DataConstructorDefinition = identifier => parameters => ({
    [Symbol.for("tag")]: "DataConstructorDefinition",
    identifier,
    parameters
  });
  const DataTypeDeclaration = identifier => constructors => ({
    [Symbol.for("tag")]: "DataTypeDeclaration",
    identifier,
    constructors
  });
  const DoBlockExpression = operations => result => ({
    [Symbol.for("tag")]: "DoBlockExpression",
    operations,
    result
  });
  const Elision = {
    [Symbol.for("tag")]: "Elision"
  };
  const ExportDefaultDeclaration = declaration => ({
    [Symbol.for("tag")]: "ExportDefaultDeclaration",
    declaration
  });
  const ExportNamedDeclaration = specifiers => ({
    [Symbol.for("tag")]: "ExportNamedDeclaration",
    specifiers
  });
  const ExportSpecifier = local => exported => ({
    [Symbol.for("tag")]: "ExportSpecifier",
    local,
    exported
  });
  const ExpressionStatement = expression => ({
    [Symbol.for("tag")]: "ExpressionStatement",
    expression
  });
  const FunctionDeclaration = name => parameters => body => ({
    [Symbol.for("tag")]: "FunctionDeclaration",
    name,
    parameters,
    body
  });
  const Identifier = name => ({
    [Symbol.for("tag")]: "Identifier",
    name
  });
  const ImportAllSpecifier = hiding => ({
    [Symbol.for("tag")]: "ImportAllSpecifier",
    hiding
  });
  const ImportDeclaration = source => specifiers => ({
    [Symbol.for("tag")]: "ImportDeclaration",
    source,
    specifiers
  });
  const ImportDefaultSpecifier = local => ({
    [Symbol.for("tag")]: "ImportDefaultSpecifier",
    local
  });
  const ImportNamespaceSpecifier = local => ({
    [Symbol.for("tag")]: "ImportNamespaceSpecifier",
    local
  });
  const ImportSpecifier = imported => local => ({
    [Symbol.for("tag")]: "ImportSpecifier",
    imported,
    local
  });
  const InfixCallExpression = operator => left => right => ({
    [Symbol.for("tag")]: "InfixCallExpression",
    operator,
    left,
    right
  });
  const LogicalExpression = operator => left => right => ({
    [Symbol.for("tag")]: "LogicalExpression",
    operator,
    left,
    right
  });
  const MapExpression = left => right => ({
    [Symbol.for("tag")]: "MapExpression",
    left,
    right
  });
  const MemberExpression = object => property => ({
    [Symbol.for("tag")]: "MemberExpression",
    object,
    property
  });
  const MethodCallExpression = name => ({
    [Symbol.for("tag")]: "MethodCallExpression",
    name
  });
  const Module = imports => exports => statements => ({
    [Symbol.for("tag")]: "Module",
    imports,
    exports,
    statements
  });
  const NullLiteral = {
    [Symbol.for("tag")]: "NullLiteral"
  };
  const NumberLiteral = value => ({
    [Symbol.for("tag")]: "NumberLiteral",
    value
  });
  const ObjectExpression = properties => ({
    [Symbol.for("tag")]: "ObjectExpression",
    properties
  });
  const ObjectPattern = properties => ({
    [Symbol.for("tag")]: "ObjectPattern",
    properties
  });
  const PipeExpression = head => body => ({
    [Symbol.for("tag")]: "PipeExpression",
    head,
    body
  });
  const Property = key => value => ({
    [Symbol.for("tag")]: "Property",
    key,
    value
  });
  const PropertyAccessor = identifier => ({
    [Symbol.for("tag")]: "PropertyAccessor",
    identifier
  });
  const RestElement = argument => ({
    [Symbol.for("tag")]: "RestElement",
    argument
  });
  const SpreadElement = argument => ({
    [Symbol.for("tag")]: "SpreadElement",
    argument
  });
  const StringLiteral = value => ({
    [Symbol.for("tag")]: "StringLiteral",
    value
  });
  const SwitchCase = predicates => consequent => ({
    [Symbol.for("tag")]: "SwitchCase",
    predicates,
    consequent
  });
  const SwitchExpression = discriminant => cases => ({
    [Symbol.for("tag")]: "SwitchExpression",
    discriminant,
    cases
  });
  const TemplateLiteral = quasis => expressions => ({
    [Symbol.for("tag")]: "TemplateLiteral",
    quasis,
    expressions
  });
  const UnaryExpression = operator => argument => ({
    [Symbol.for("tag")]: "UnaryExpression",
    operator,
    argument
  });
  const VariableDeclaration = pattern => expression => ({
    [Symbol.for("tag")]: "VariableDeclaration",
    pattern,
    expression
  });
  return {
    Node: {
      ArrayExpression,
      ArrayPattern,
      ArrowAssignmentStatement,
      ArrowFunctionExpression,
      BinaryExpression,
      BindExpression,
      BlockExpression,
      BlockStatement,
      BooleanLiteral,
      CallExpression,
      CompositionExpression,
      ConcatenationExpression,
      ConditionalExpression,
      DataConstructorDefinition,
      DataTypeDeclaration,
      DoBlockExpression,
      Elision,
      ExportDefaultDeclaration,
      ExportNamedDeclaration,
      ExportSpecifier,
      ExpressionStatement,
      FunctionDeclaration,
      Identifier,
      ImportAllSpecifier,
      ImportDeclaration,
      ImportDefaultSpecifier,
      ImportNamespaceSpecifier,
      ImportSpecifier,
      InfixCallExpression,
      LogicalExpression,
      MapExpression,
      MemberExpression,
      MethodCallExpression,
      Module,
      NullLiteral,
      NumberLiteral,
      ObjectExpression,
      ObjectPattern,
      PipeExpression,
      Property,
      PropertyAccessor,
      RestElement,
      SpreadElement,
      StringLiteral,
      SwitchCase,
      SwitchExpression,
      TemplateLiteral,
      UnaryExpression,
      VariableDeclaration,
      [Symbol.for("match")]: default$ => cases => node => Object.hasOwn(cases, node[Symbol.for("tag")]) ? (() => {
        switch (node[Symbol.for("tag")]) {
          case "ArrayExpression":
            return cases.ArrayExpression(node.elements);
          case "ArrayPattern":
            return cases.ArrayPattern(node.elements);
          case "ArrowAssignmentStatement":
            return cases.ArrowAssignmentStatement(node.pattern)(node.expression);
          case "ArrowFunctionExpression":
            return cases.ArrowFunctionExpression(node.parameters)(node.body);
          case "BinaryExpression":
            return cases.BinaryExpression(node.operator)(node.left)(node.right);
          case "BindExpression":
            return cases.BindExpression(node.left)(node.right);
          case "BlockExpression":
            return cases.BlockExpression(node.statements)(node.result);
          case "BlockStatement":
            return cases.BlockStatement(node.statements);
          case "BooleanLiteral":
            return cases.BooleanLiteral(node.value);
          case "CallExpression":
            return cases.CallExpression(node.callee)(node.arguments);
          case "CompositionExpression":
            return cases.CompositionExpression(node.left)(node.right);
          case "ConcatenationExpression":
            return cases.ConcatenationExpression(node.left)(node.right);
          case "ConditionalExpression":
            return cases.ConditionalExpression(node.predicate)(node.consequent)(node.alternative);
          case "DataConstructorDefinition":
            return cases.DataConstructorDefinition(node.identifier)(node.parameters);
          case "DataTypeDeclaration":
            return cases.DataTypeDeclaration(node.identifier)(node.constructors);
          case "DoBlockExpression":
            return cases.DoBlockExpression(node.operations)(node.result);
          case "Elision":
            return cases.Elision;
          case "ExportDefaultDeclaration":
            return cases.ExportDefaultDeclaration(node.declaration);
          case "ExportNamedDeclaration":
            return cases.ExportNamedDeclaration(node.specifiers);
          case "ExportSpecifier":
            return cases.ExportSpecifier(node.local)(node.exported);
          case "ExpressionStatement":
            return cases.ExpressionStatement(node.expression);
          case "FunctionDeclaration":
            return cases.FunctionDeclaration(node.name)(node.parameters)(node.body);
          case "Identifier":
            return cases.Identifier(node.name);
          case "ImportAllSpecifier":
            return cases.ImportAllSpecifier(node.hiding);
          case "ImportDeclaration":
            return cases.ImportDeclaration(node.source)(node.specifiers);
          case "ImportDefaultSpecifier":
            return cases.ImportDefaultSpecifier(node.local);
          case "ImportNamespaceSpecifier":
            return cases.ImportNamespaceSpecifier(node.local);
          case "ImportSpecifier":
            return cases.ImportSpecifier(node.imported)(node.local);
          case "InfixCallExpression":
            return cases.InfixCallExpression(node.operator)(node.left)(node.right);
          case "LogicalExpression":
            return cases.LogicalExpression(node.operator)(node.left)(node.right);
          case "MapExpression":
            return cases.MapExpression(node.left)(node.right);
          case "MemberExpression":
            return cases.MemberExpression(node.object)(node.property);
          case "MethodCallExpression":
            return cases.MethodCallExpression(node.name);
          case "Module":
            return cases.Module(node.imports)(node.exports)(node.statements);
          case "NullLiteral":
            return cases.NullLiteral;
          case "NumberLiteral":
            return cases.NumberLiteral(node.value);
          case "ObjectExpression":
            return cases.ObjectExpression(node.properties);
          case "ObjectPattern":
            return cases.ObjectPattern(node.properties);
          case "PipeExpression":
            return cases.PipeExpression(node.head)(node.body);
          case "Property":
            return cases.Property(node.key)(node.value);
          case "PropertyAccessor":
            return cases.PropertyAccessor(node.identifier);
          case "RestElement":
            return cases.RestElement(node.argument);
          case "SpreadElement":
            return cases.SpreadElement(node.argument);
          case "StringLiteral":
            return cases.StringLiteral(node.value);
          case "SwitchCase":
            return cases.SwitchCase(node.predicates)(node.consequent);
          case "SwitchExpression":
            return cases.SwitchExpression(node.discriminant)(node.cases);
          case "TemplateLiteral":
            return cases.TemplateLiteral(node.quasis)(node.expressions);
          case "UnaryExpression":
            return cases.UnaryExpression(node.operator)(node.argument);
          case "VariableDeclaration":
            return cases.VariableDeclaration(node.pattern)(node.expression);
        }
      })() : default$(node)
    },
    ArrayExpression,
    ArrayPattern,
    ArrowAssignmentStatement,
    ArrowFunctionExpression,
    BinaryExpression,
    BindExpression,
    BlockExpression,
    BlockStatement,
    BooleanLiteral,
    CallExpression,
    CompositionExpression,
    ConcatenationExpression,
    ConditionalExpression,
    DataConstructorDefinition,
    DataTypeDeclaration,
    DoBlockExpression,
    Elision,
    ExportDefaultDeclaration,
    ExportNamedDeclaration,
    ExportSpecifier,
    ExpressionStatement,
    FunctionDeclaration,
    Identifier,
    ImportAllSpecifier,
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportNamespaceSpecifier,
    ImportSpecifier,
    InfixCallExpression,
    LogicalExpression,
    MapExpression,
    MemberExpression,
    MethodCallExpression,
    Module,
    NullLiteral,
    NumberLiteral,
    ObjectExpression,
    ObjectPattern,
    PipeExpression,
    Property,
    PropertyAccessor,
    RestElement,
    SpreadElement,
    StringLiteral,
    SwitchCase,
    SwitchExpression,
    TemplateLiteral,
    UnaryExpression,
    VariableDeclaration
  };
})();
const transform = cases => (() => {
  const recur = node => match(Node)({
    ArrayExpression: $ => ArrayExpression(map(recur)($)),
    ArrayPattern: $ => ArrayPattern(map(recur)($)),
    ArrowAssignmentStatement: pattern => expression => ArrowAssignmentStatement(recur(pattern))(recur(expression)),
    ArrowFunctionExpression: parameters => body => ArrowFunctionExpression(map(recur)(parameters))(recur(body)),
    BinaryExpression: operator => left => right => BinaryExpression(operator)(recur(left))(recur(right)),
    BlockExpression: statements => result => BlockExpression(map(recur)(statements))(recur(result)),
    BlockStatement: $ => BlockStatement(map(recur)($)),
    BooleanLiteral,
    BindExpression: left => right => BindExpression(recur(left))(recur(right)),
    CallExpression: callee => arguments$ => CallExpression(recur(callee))(map(recur)(arguments$)),
    CompositionExpression: left => right => CompositionExpression(recur(left))(recur(right)),
    ConcatenationExpression: left => right => ConcatenationExpression(recur(left))(recur(right)),
    ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(recur(predicate))(recur(consequent))(map(recur)(alternative)),
    DataConstructorDefinition: identifier => parameters => DataConstructorDefinition(recur(identifier))(map(recur)(parameters)),
    DataTypeDeclaration: identifier => constructors => DataTypeDeclaration(recur(identifier))(map(recur)(constructors)),
    DoBlockExpression: operations => result => DoBlockExpression(map(recur)(operations))(recur(result)),
    Elision,
    ExportDefaultDeclaration: $ => ExportDefaultDeclaration(recur($)),
    ExportNamedDeclaration: $ => ExportNamedDeclaration(map(recur)($)),
    ExportSpecifier: local => exported => ExportSpecifier(recur(local))(recur(exported)),
    ExpressionStatement: $ => ExpressionStatement(recur($)),
    FunctionDeclaration: name => parameters => body => FunctionDeclaration(name)(parameters)(recur(body)),
    Identifier,
    ImportAllSpecifier: $ => ImportAllSpecifier(map(recur)($)),
    ImportDeclaration: source => specifiers => ImportDeclaration(source)(map(recur)(specifiers)),
    ImportDefaultSpecifier: $ => ImportDefaultSpecifier(recur($)),
    ImportNamespaceSpecifier: $ => ImportNamespaceSpecifier(recur($)),
    ImportSpecifier: imported => local => ImportSpecifier(recur(imported))(recur(local)),
    InfixCallExpression: operator => left => right => InfixCallExpression(operator)(recur(left))(recur(right)),
    LogicalExpression: operator => left => right => LogicalExpression(operator)(recur(left))(recur(right)),
    MapExpression: left => right => MapExpression(recur(left))(recur(right)),
    MemberExpression: object => property => MemberExpression(recur(object))(recur(property)),
    MethodCallExpression,
    Module: imports => exports => statements => Module(map(recur)(imports))(map(recur)(exports))(map(recur)(statements)),
    NullLiteral,
    NumberLiteral,
    ObjectExpression: $ => ObjectExpression(map(recur)($)),
    ObjectPattern: $ => ObjectPattern(map(recur)($)),
    PipeExpression: head => body => PipeExpression(recur(head))(recur(body)),
    Property: key => value => Property(recur(key))(recur(value)),
    PropertyAccessor: $ => PropertyAccessor(recur($)),
    RestElement: $ => RestElement(recur($)),
    SpreadElement: $ => SpreadElement(recur($)),
    StringLiteral,
    SwitchCase: predicates => consequent => SwitchCase(map(map(recur))(predicates))(recur(consequent)),
    SwitchExpression: discriminant => cases => SwitchExpression(recur(discriminant))(map(recur)(cases)),
    TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(map(recur)(expressions)),
    UnaryExpression: operator => argument => UnaryExpression(operator)(recur(argument)),
    VariableDeclaration: pattern => expression => VariableDeclaration(recur(pattern))(recur(expression)),
    ...cases
  })(node);
  return recur;
})();
export default Node;
export {ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, BinaryExpression, BindExpression, BlockExpression, BlockStatement, BooleanLiteral, CallExpression, CompositionExpression, ConcatenationExpression, ConditionalExpression, DataConstructorDefinition, DataTypeDeclaration, DoBlockExpression, Elision, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, FunctionDeclaration, Identifier, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixCallExpression, LogicalExpression, MapExpression, MemberExpression, MethodCallExpression, Module, NullLiteral, NumberLiteral, ObjectExpression, ObjectPattern, PipeExpression, Property, PropertyAccessor, RestElement, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, TemplateLiteral, UnaryExpression, VariableDeclaration, transform};
