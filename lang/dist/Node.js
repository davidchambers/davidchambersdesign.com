const map = f => xs => (() => {
  switch (globalThis.Object.prototype.toString.call(xs)) {
    case "[object Array]":
      return xs.map(x => f(x));
    default:
      return xs["fantasy-land/map"](f);
  }
})();
const {Node, ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, Block, BooleanLiteral, CallExpression, ConditionalExpression, DataConstructorDefinition, DataConstructorParameter, DataTypeDeclaration, DoBlockExpression, Elision, EmptySection, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, FunctionDeclaration, Identifier, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixCallExpression, InfixExpression, LeftSection, MemberExpression, MethodCallExpression, Module, NullLiteral, NumberLiteral, ObjectExpression, ObjectPattern, PrefixExpression, Property, PropertyAccessor, RestElement, RightSection, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, TemplateLiteral, VariableDeclaration} = (() => {
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
  const Block = statements => result => ({
    [Symbol.for("tag")]: "Block",
    statements,
    result
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
  const DataConstructorParameter = identifier => recursionDepth => ({
    [Symbol.for("tag")]: "DataConstructorParameter",
    identifier,
    recursionDepth
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
  const EmptySection = operator => ({
    [Symbol.for("tag")]: "EmptySection",
    operator
  });
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
  const InfixExpression = operator => left => right => ({
    [Symbol.for("tag")]: "InfixExpression",
    operator,
    left,
    right
  });
  const LeftSection = operator => operand => ({
    [Symbol.for("tag")]: "LeftSection",
    operator,
    operand
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
  const PrefixExpression = operator => operand => ({
    [Symbol.for("tag")]: "PrefixExpression",
    operator,
    operand
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
  const RightSection = operator => operand => ({
    [Symbol.for("tag")]: "RightSection",
    operator,
    operand
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
  const VariableDeclaration = pattern => expression => ({
    [Symbol.for("tag")]: "VariableDeclaration",
    pattern,
    expression
  });
  const $matchOr = $default => $cases => node => Object.hasOwn($cases, node[Symbol.for("tag")]) ? (() => {
    switch (node[Symbol.for("tag")]) {
      case "ArrayExpression":
        return $cases.ArrayExpression(node.elements);
      case "ArrayPattern":
        return $cases.ArrayPattern(node.elements);
      case "ArrowAssignmentStatement":
        return $cases.ArrowAssignmentStatement(node.pattern)(node.expression);
      case "ArrowFunctionExpression":
        return $cases.ArrowFunctionExpression(node.parameters)(node.body);
      case "Block":
        return $cases.Block(node.statements)(node.result);
      case "BooleanLiteral":
        return $cases.BooleanLiteral(node.value);
      case "CallExpression":
        return $cases.CallExpression(node.callee)(node.arguments);
      case "ConditionalExpression":
        return $cases.ConditionalExpression(node.predicate)(node.consequent)(node.alternative);
      case "DataConstructorDefinition":
        return $cases.DataConstructorDefinition(node.identifier)(node.parameters);
      case "DataConstructorParameter":
        return $cases.DataConstructorParameter(node.identifier)(node.recursionDepth);
      case "DataTypeDeclaration":
        return $cases.DataTypeDeclaration(node.identifier)(node.constructors);
      case "DoBlockExpression":
        return $cases.DoBlockExpression(node.operations)(node.result);
      case "Elision":
        return $cases.Elision;
      case "EmptySection":
        return $cases.EmptySection(node.operator);
      case "ExportDefaultDeclaration":
        return $cases.ExportDefaultDeclaration(node.declaration);
      case "ExportNamedDeclaration":
        return $cases.ExportNamedDeclaration(node.specifiers);
      case "ExportSpecifier":
        return $cases.ExportSpecifier(node.local)(node.exported);
      case "ExpressionStatement":
        return $cases.ExpressionStatement(node.expression);
      case "FunctionDeclaration":
        return $cases.FunctionDeclaration(node.name)(node.parameters)(node.body);
      case "Identifier":
        return $cases.Identifier(node.name);
      case "ImportAllSpecifier":
        return $cases.ImportAllSpecifier(node.hiding);
      case "ImportDeclaration":
        return $cases.ImportDeclaration(node.source)(node.specifiers);
      case "ImportDefaultSpecifier":
        return $cases.ImportDefaultSpecifier(node.local);
      case "ImportNamespaceSpecifier":
        return $cases.ImportNamespaceSpecifier(node.local);
      case "ImportSpecifier":
        return $cases.ImportSpecifier(node.imported)(node.local);
      case "InfixCallExpression":
        return $cases.InfixCallExpression(node.operator)(node.left)(node.right);
      case "InfixExpression":
        return $cases.InfixExpression(node.operator)(node.left)(node.right);
      case "LeftSection":
        return $cases.LeftSection(node.operator)(node.operand);
      case "MemberExpression":
        return $cases.MemberExpression(node.object)(node.property);
      case "MethodCallExpression":
        return $cases.MethodCallExpression(node.name);
      case "Module":
        return $cases.Module(node.imports)(node.exports)(node.statements);
      case "NullLiteral":
        return $cases.NullLiteral;
      case "NumberLiteral":
        return $cases.NumberLiteral(node.value);
      case "ObjectExpression":
        return $cases.ObjectExpression(node.properties);
      case "ObjectPattern":
        return $cases.ObjectPattern(node.properties);
      case "PrefixExpression":
        return $cases.PrefixExpression(node.operator)(node.operand);
      case "Property":
        return $cases.Property(node.key)(node.value);
      case "PropertyAccessor":
        return $cases.PropertyAccessor(node.identifier);
      case "RestElement":
        return $cases.RestElement(node.argument);
      case "RightSection":
        return $cases.RightSection(node.operator)(node.operand);
      case "SpreadElement":
        return $cases.SpreadElement(node.argument);
      case "StringLiteral":
        return $cases.StringLiteral(node.value);
      case "SwitchCase":
        return $cases.SwitchCase(node.predicates)(node.consequent);
      case "SwitchExpression":
        return $cases.SwitchExpression(node.discriminant)(node.cases);
      case "TemplateLiteral":
        return $cases.TemplateLiteral(node.quasis)(node.expressions);
      case "VariableDeclaration":
        return $cases.VariableDeclaration(node.pattern)(node.expression);
    }
  })() : $default(node);
  const $match = $matchOr(node => CasesNotExhaustive);
  const $transform = $cases => (() => {
    const recur = $matchOr(Node)({
      ArrayExpression: elements => ArrayExpression(map(recur)(elements)),
      ArrayPattern: elements => ArrayPattern(map(recur)(elements)),
      ArrowAssignmentStatement: pattern => expression => ArrowAssignmentStatement(recur(pattern))(recur(expression)),
      ArrowFunctionExpression: parameters => body => ArrowFunctionExpression(map(recur)(parameters))(recur(body)),
      Block: statements => result => Block(map(recur)(statements))(map(recur)(result)),
      BooleanLiteral: value => BooleanLiteral(value),
      CallExpression: callee => arguments$ => CallExpression(recur(callee))(map(recur)(arguments$)),
      ConditionalExpression: predicate => consequent => alternative => ConditionalExpression(recur(predicate))(recur(consequent))(map(recur)(alternative)),
      DataConstructorDefinition: identifier => parameters => DataConstructorDefinition(recur(identifier))(map(recur)(parameters)),
      DataConstructorParameter: identifier => recursionDepth => DataConstructorParameter(recur(identifier))(recursionDepth),
      DataTypeDeclaration: identifier => constructors => DataTypeDeclaration(recur(identifier))(map(recur)(constructors)),
      DoBlockExpression: operations => result => DoBlockExpression(map(recur)(operations))(recur(result)),
      Elision,
      EmptySection: operator => EmptySection(operator),
      ExportDefaultDeclaration: declaration => ExportDefaultDeclaration(recur(declaration)),
      ExportNamedDeclaration: specifiers => ExportNamedDeclaration(map(recur)(specifiers)),
      ExportSpecifier: local => exported => ExportSpecifier(recur(local))(recur(exported)),
      ExpressionStatement: expression => ExpressionStatement(recur(expression)),
      FunctionDeclaration: name => parameters => body => FunctionDeclaration(name)(parameters)(recur(body)),
      Identifier: name => Identifier(name),
      ImportAllSpecifier: hiding => ImportAllSpecifier(map(recur)(hiding)),
      ImportDeclaration: source => specifiers => ImportDeclaration(source)(map(recur)(specifiers)),
      ImportDefaultSpecifier: local => ImportDefaultSpecifier(recur(local)),
      ImportNamespaceSpecifier: local => ImportNamespaceSpecifier(recur(local)),
      ImportSpecifier: imported => local => ImportSpecifier(recur(imported))(recur(local)),
      InfixCallExpression: operator => left => right => InfixCallExpression(operator)(recur(left))(recur(right)),
      InfixExpression: operator => left => right => InfixExpression(operator)(recur(left))(recur(right)),
      LeftSection: operator => operand => LeftSection(operator)(recur(operand)),
      MemberExpression: object => property => MemberExpression(recur(object))(recur(property)),
      MethodCallExpression: name => MethodCallExpression(name),
      Module: imports => exports => statements => Module(map(recur)(imports))(map(recur)(exports))(map(recur)(statements)),
      NullLiteral,
      NumberLiteral: value => NumberLiteral(value),
      ObjectExpression: properties => ObjectExpression(map(recur)(properties)),
      ObjectPattern: properties => ObjectPattern(map(recur)(properties)),
      PrefixExpression: operator => operand => PrefixExpression(operator)(recur(operand)),
      Property: key => value => Property(recur(key))(recur(value)),
      PropertyAccessor: identifier => PropertyAccessor(recur(identifier)),
      RestElement: argument => RestElement(recur(argument)),
      RightSection: operator => operand => RightSection(operator)(recur(operand)),
      SpreadElement: argument => SpreadElement(recur(argument)),
      StringLiteral: value => StringLiteral(value),
      SwitchCase: predicates => consequent => SwitchCase(map(map(recur))(predicates))(recur(consequent)),
      SwitchExpression: discriminant => cases => SwitchExpression(recur(discriminant))(map(recur)(cases)),
      TemplateLiteral: quasis => expressions => TemplateLiteral(quasis)(map(recur)(expressions)),
      VariableDeclaration: pattern => expression => VariableDeclaration(recur(pattern))(recur(expression)),
      ...$cases
    });
    return recur;
  })();
  const $foldRec = $cases => (() => {
    const recur = $matchOr(Node)({
      ArrayExpression: elements => $cases.ArrayExpression(map(recur)(elements)),
      ArrayPattern: elements => $cases.ArrayPattern(map(recur)(elements)),
      ArrowAssignmentStatement: pattern => expression => $cases.ArrowAssignmentStatement(recur(pattern))(recur(expression)),
      ArrowFunctionExpression: parameters => body => $cases.ArrowFunctionExpression(map(recur)(parameters))(recur(body)),
      Block: statements => result => $cases.Block(map(recur)(statements))(map(recur)(result)),
      BooleanLiteral: value => $cases.BooleanLiteral(value),
      CallExpression: callee => arguments$ => $cases.CallExpression(recur(callee))(map(recur)(arguments$)),
      ConditionalExpression: predicate => consequent => alternative => $cases.ConditionalExpression(recur(predicate))(recur(consequent))(map(recur)(alternative)),
      DataConstructorDefinition: identifier => parameters => $cases.DataConstructorDefinition(recur(identifier))(map(recur)(parameters)),
      DataConstructorParameter: identifier => recursionDepth => $cases.DataConstructorParameter(recur(identifier))(recursionDepth),
      DataTypeDeclaration: identifier => constructors => $cases.DataTypeDeclaration(recur(identifier))(map(recur)(constructors)),
      DoBlockExpression: operations => result => $cases.DoBlockExpression(map(recur)(operations))(recur(result)),
      Elision: $cases.Elision,
      EmptySection: operator => $cases.EmptySection(operator),
      ExportDefaultDeclaration: declaration => $cases.ExportDefaultDeclaration(recur(declaration)),
      ExportNamedDeclaration: specifiers => $cases.ExportNamedDeclaration(map(recur)(specifiers)),
      ExportSpecifier: local => exported => $cases.ExportSpecifier(recur(local))(recur(exported)),
      ExpressionStatement: expression => $cases.ExpressionStatement(recur(expression)),
      FunctionDeclaration: name => parameters => body => $cases.FunctionDeclaration(name)(parameters)(recur(body)),
      Identifier: name => $cases.Identifier(name),
      ImportAllSpecifier: hiding => $cases.ImportAllSpecifier(map(recur)(hiding)),
      ImportDeclaration: source => specifiers => $cases.ImportDeclaration(source)(map(recur)(specifiers)),
      ImportDefaultSpecifier: local => $cases.ImportDefaultSpecifier(recur(local)),
      ImportNamespaceSpecifier: local => $cases.ImportNamespaceSpecifier(recur(local)),
      ImportSpecifier: imported => local => $cases.ImportSpecifier(recur(imported))(recur(local)),
      InfixCallExpression: operator => left => right => $cases.InfixCallExpression(operator)(recur(left))(recur(right)),
      InfixExpression: operator => left => right => $cases.InfixExpression(operator)(recur(left))(recur(right)),
      LeftSection: operator => operand => $cases.LeftSection(operator)(recur(operand)),
      MemberExpression: object => property => $cases.MemberExpression(recur(object))(recur(property)),
      MethodCallExpression: name => $cases.MethodCallExpression(name),
      Module: imports => exports => statements => $cases.Module(map(recur)(imports))(map(recur)(exports))(map(recur)(statements)),
      NullLiteral: $cases.NullLiteral,
      NumberLiteral: value => $cases.NumberLiteral(value),
      ObjectExpression: properties => $cases.ObjectExpression(map(recur)(properties)),
      ObjectPattern: properties => $cases.ObjectPattern(map(recur)(properties)),
      PrefixExpression: operator => operand => $cases.PrefixExpression(operator)(recur(operand)),
      Property: key => value => $cases.Property(recur(key))(recur(value)),
      PropertyAccessor: identifier => $cases.PropertyAccessor(recur(identifier)),
      RestElement: argument => $cases.RestElement(recur(argument)),
      RightSection: operator => operand => $cases.RightSection(operator)(recur(operand)),
      SpreadElement: argument => $cases.SpreadElement(recur(argument)),
      StringLiteral: value => $cases.StringLiteral(value),
      SwitchCase: predicates => consequent => $cases.SwitchCase(map(map(recur))(predicates))(recur(consequent)),
      SwitchExpression: discriminant => cases => $cases.SwitchExpression(recur(discriminant))(map(recur)(cases)),
      TemplateLiteral: quasis => expressions => $cases.TemplateLiteral(quasis)(map(recur)(expressions)),
      VariableDeclaration: pattern => expression => $cases.VariableDeclaration(recur(pattern))(recur(expression))
    });
    return recur;
  })();
  return {
    ArrayExpression,
    ArrayPattern,
    ArrowAssignmentStatement,
    ArrowFunctionExpression,
    Block,
    BooleanLiteral,
    CallExpression,
    ConditionalExpression,
    DataConstructorDefinition,
    DataConstructorParameter,
    DataTypeDeclaration,
    DoBlockExpression,
    Elision,
    EmptySection,
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
    InfixExpression,
    LeftSection,
    MemberExpression,
    MethodCallExpression,
    Module,
    NullLiteral,
    NumberLiteral,
    ObjectExpression,
    ObjectPattern,
    PrefixExpression,
    Property,
    PropertyAccessor,
    RestElement,
    RightSection,
    SpreadElement,
    StringLiteral,
    SwitchCase,
    SwitchExpression,
    TemplateLiteral,
    VariableDeclaration,
    Node: {
      matchOr: $matchOr,
      match: $match,
      transform: $transform,
      foldRec: $foldRec
    }
  };
})();
export default Node;
export {ArrayExpression, ArrayPattern, ArrowAssignmentStatement, ArrowFunctionExpression, Block, BooleanLiteral, CallExpression, ConditionalExpression, DataConstructorDefinition, DataConstructorParameter, DataTypeDeclaration, DoBlockExpression, Elision, EmptySection, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ExpressionStatement, FunctionDeclaration, Identifier, ImportAllSpecifier, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, InfixCallExpression, InfixExpression, LeftSection, MemberExpression, MethodCallExpression, Module, NullLiteral, NumberLiteral, ObjectExpression, ObjectPattern, PrefixExpression, Property, PropertyAccessor, RestElement, RightSection, SpreadElement, StringLiteral, SwitchCase, SwitchExpression, TemplateLiteral, VariableDeclaration};
