import {parallel, reject, resolve} from "fluture";
import * as format from "./format.js";
import * as Prelude from "./prelude.js";
import {NullLiteral, BooleanLiteral, NumberLiteral, StringLiteral, TemplateLiteral, MemberExpression, IdentifierPlaceholder, Identifier, SpreadElement, ArrayExpression, Property, ObjectExpression, ArrayPattern, Elision, ObjectPattern, RestElement, ArrowFunctionExpression, PropertyAccessor, BlockExpression, UnaryExpression, CompositionExpression, BinaryExpression, MapExpression, BindExpression, LogicalExpression, ConditionalExpression, SwitchExpression, SwitchCase, PipeExpression, MethodCallExpression, CallExpression, ImportDeclaration, ImportAllDeclaration, ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Module} from "./types.js";
const Prelude$1 = {
  _apply: name => args => target => target[name].apply(target, args),
  apply: args => target => target.apply(target, args),
  chain: f => chain => Array.isArray(chain) ? chain.flatMap(x => f(x)) : chain["fantasy-land/chain"](f),
  concat: this$ => that => Array.isArray(this$) || Object.is("string", typeof this$) ? this$.concat(that) : this$["fantasy-land/concat"](that),
  const_: x => y => x,
  construct: constructor => args => Reflect.construct(constructor, args),
  filter: predicate => filterable => Array.isArray(filterable) ? filterable.filter(x => predicate(x)) : filterable["fantasy-land/filter"](predicate),
  flip: f => y => x => f(x)(y),
  map: f => functor => Array.isArray(functor) ? functor.map(x => f(x)) : functor["fantasy-land/map"](f),
  not: b => !b
};
const {_apply, apply, chain, concat, const_, construct, filter, flip, map, not} = Prelude$1;
const has = element => set => Prelude$1._apply("has")([element])(set);
const add = element => set => construct(Set)([[...set, element]]);
const union = this$ => that => construct(Set)([[...this$, ...that]]);
const nextUnusedIdent = names => desiredName => (() => {
  const recur = counter => (() => {
    const candidate = Object.is(0, counter) ? desiredName : `${desiredName}$${counter}`;
    return has(candidate)(names) ? recur(counter + 1) : Identifier(candidate);
  })();
  return recur(0);
})();
const namesInPattern = pattern => (() => {
  switch (pattern.type) {
    case "Identifier":
      return [pattern.name];
    case "ArrayPattern":
      return Prelude$1.chain(namesInPattern)(pattern.elements);
    case "ObjectPattern":
      return Prelude$1.chain(namesInPattern)(pattern.properties);
    case "Property":
      return namesInPattern(pattern.value);
    case "RestElement":
      return namesInPattern(pattern.argument);
  }
})();
const namesInStatement = node => (() => {
  switch (node.type) {
    case "ImportDeclaration":
      return Prelude$1.map(x => (x => x.name)((x => x.local)(x)))(node.specifiers);
    case "VariableDeclaration":
      return namesInPattern(node.pattern);
    case "FunctionDeclaration":
      return [node.name];
    case "ExpressionStatement":
      return [];
  }
})();
const rewriteModule = ({imports, exports, statements}) => namesExportedFrom => Prelude$1.chain(imports$0027 => (names => (preludeIdent => (names$0027 => (rewrite => (preludeDefinition => (preludeDestructuring => resolve(Module({
  imports: imports$0027,
  exports: Prelude$1.map(rewrite)(exports),
  statements: Prelude$1.map(rewrite)([preludeDefinition, preludeDestructuring, ...statements])
})))(VariableDeclaration(ObjectPattern(map(name => Property(StringLiteral(name))(Identifier(name)))(filter(x => not(flip(has)(names$0027)(x)))(Object.keys(Prelude)))))(preludeIdent)))(VariableDeclaration(preludeIdent)(ObjectExpression(map(([name, expr]) => Property(StringLiteral(name))(expr))(Object.entries(Prelude))))))(rewriteNode(preludeIdent)(names$0027)))(add(preludeIdent.name)(names)))(nextUnusedIdent(names)("Prelude")))(construct(Set)([Prelude$1.chain(namesInStatement)(Prelude$1.concat(imports$0027)(statements))])))(parallel(16)(Prelude$1.map(rewriteImportDeclaration(namesExportedFrom))(imports)));
const rewriteImportAllDeclaration = namesExportedFrom => ({source, hiding}) => (() => {
  const namesExported = Prelude$1._apply("endsWith")([".serif"])(source.value) ? namesExportedFrom(source.value) : Prelude$1.map(Object.keys)(attemptP(() => import(source.value)));
  const namesHidden = Prelude$1.map(x => x.name)(hiding);
  const namesHiddenNeedlessly = filter(name => not(Prelude$1._apply("includes")([name])(namesExported)))(namesHidden);
  return namesHiddenNeedlessly.length > 0 ? reject(Error(`import * from "${source.value}" hiding {${Prelude$1._apply("join")([", "])(namesHidden)}};\n\n${format.list(namesHiddenNeedlessly)} ${Object.is(1, namesHiddenNeedlessly.length) ? "is" : "are"} not exported so need not be hidden.\n`)) : resolve(ImportDeclaration(source)(map(name => ImportSpecifier(Identifier(name))(Identifier(name)))(filter(name => not(Prelude$1._apply("includes")([name])(namesHidden)))(namesExported))));
})();
const rewriteImportDeclaration = namesExportedFrom => importDeclaration => (() => {
  switch (importDeclaration.type) {
    case "ImportDeclaration":
      return resolve(importDeclaration);
    case "ImportAllDeclaration":
      return rewriteImportAllDeclaration(namesExportedFrom)(importDeclaration);
  }
})();
const rewriteNode = preludeIdent => (() => {
  const recur = names => node => (() => {
    switch (node.type) {
      case "TemplateLiteral":
        return TemplateLiteral(node.quasis)(Prelude$1.map(recur(names))(node.expressions));
      case "MemberExpression":
        return MemberExpression(recur(names)(node.object))(recur(names)(node.property));
      case "ArrayExpression":
        return ArrayExpression(Prelude$1.map(recur(names))(node.elements));
      case "ObjectExpression":
        return ObjectExpression(Prelude$1.map(recur(names))(node.properties));
      case "ArrowFunctionExpression":
        return (() => {
          const params = Prelude$1.map(recur(names))(node.parameters);
          const names$0027 = union(names)(Prelude$1.map(x => x.name)(params));
          return ArrowFunctionExpression(params)(recur(names$0027)(node.body));
        })();
      case "PropertyAccessor":
        return (() => {
          const param = Identifier("x");
          const names$0027 = add(param.name)(names);
          return recur(names$0027)(ArrowFunctionExpression([param])(MemberExpression(param)(StringLiteral(node.identifier.name))));
        })();
      case "BlockExpression":
        return Object.is(1, node.statements.length) && Object.is("ExpressionStatement", node.statements[0].type) ? recur(names)(node.statements[0].expression) : (() => {
          const names$0027 = union(names)(Prelude$1.chain(statement => (() => {
            switch (statement.type) {
              case "VariableDeclaration":
                return namesInPattern(statement.pattern);
              case "FunctionDeclaration":
                return [statement.name];
              case "ExpressionStatement":
                return [];
            }
          })())(node.statements));
          return BlockExpression(Prelude$1.map(recur(names$0027))(node.statements));
        })();
      case "DoBlockExpression":
        return recur(names)(Prelude$1._apply("reduceRight")([(result, operation) => (() => {
          switch (operation.type) {
            case "ArrowAssignmentStatement":
              return CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("chain")))([ArrowFunctionExpression([operation.pattern])(result)]))([operation.expression]);
            case "VariableDeclaration":
              return CallExpression(ArrowFunctionExpression([operation.pattern])(result))([operation.expression]);
            case "FunctionDeclaration":
              return CallExpression(ArrowFunctionExpression([Identifier(operation.name)])(result))([Prelude$1._apply("reduceRight")([(body, param) => ArrowFunctionExpression([param])(body), operation.body])(operation.parameters)]);
          }
        })(), node.result])(node.operations));
      case "UnaryExpression":
        return UnaryExpression(node.operator)(recur(names)(node.argument));
      case "CompositionExpression":
        return (() => {
          const param = nextUnusedIdent(names)("x");
          const names$0027 = add(param.name)(names);
          const toCallExpression = expr => Object.is("CompositionExpression", expr.type) ? CallExpression(expr.left)([toCallExpression(expr.right)]) : CallExpression(expr)([param]);
          return recur(names$0027)(ArrowFunctionExpression([param])(toCallExpression(node)));
        })();
      case "BinaryExpression":
        return Object.is("is", node.operator) ? recur(names)(CallExpression(MemberExpression(Identifier("Object"))(StringLiteral("is")))([node.right, node.left])) : BinaryExpression(node.operator)(recur(names)(node.left))(recur(names)(node.right));
      case "ConcatenationExpression":
        return CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("concat")))([recur(names)(node.left)]))([recur(names)(node.right)]);
      case "MapExpression":
        return CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("map")))([recur(names)(node.left)]))([recur(names)(node.right)]);
      case "BindExpression":
        return CallExpression(CallExpression(MemberExpression(preludeIdent)(StringLiteral("chain")))([recur(names)(node.right)]))([recur(names)(node.left)]);
      case "LogicalExpression":
        return LogicalExpression(node.operator)(recur(names)(node.left))(recur(names)(node.right));
      case "ConditionalExpression":
        return ConditionalExpression(recur(names)(node.predicate))(recur(names)(node.consequent))(recur(names)(node.alternative));
      case "SwitchExpression":
        return SwitchExpression(recur(names)(node.discriminant))(Prelude$1.map(recur(names))(node.cases))(Object.is(null, node.default) ? null : recur(names)(node.default));
      case "SwitchCase":
        return SwitchCase(Prelude$1.map(recur(names))(node.predicates))(recur(names)(node.consequent));
      case "PipeExpression":
        return recur(names)(CallExpression(node.body)([node.head]));
      case "MethodCallExpression":
        return recur(names)(CallExpression(MemberExpression(preludeIdent)(StringLiteral("_apply")))([StringLiteral(node.name)]));
      case "CallExpression":
        return CallExpression(recur(names)(node.callee))(Prelude$1.map(recur(names))(node.arguments));
      case "VariableDeclaration":
        return VariableDeclaration(recur(names)(node.pattern))(recur(names)(node.expression));
      case "FunctionDeclaration":
        return FunctionDeclaration(node.name)(Prelude$1.map(recur(names))(node.parameters))(recur(names)(node.body));
      case "ExpressionStatement":
        return ExpressionStatement(recur(names)(node.expression));
      case "ArrayPattern":
        return ArrayPattern(Prelude$1.map(recur(names))(node.elements));
      case "ObjectPattern":
        return ObjectPattern(Prelude$1.map(recur(names))(node.properties));
      case "SpreadElement":
        return SpreadElement(recur(names)(node.argument));
      case "RestElement":
        return RestElement(recur(names)(node.argument));
      case "Property":
        return Property(recur(names)(node.key))(recur(names)(node.value));
      case "ExportDefaultDeclaration":
        return ExportDefaultDeclaration(recur(names)(node.declaration));
      default:
        return node;
    }
  })();
  return recur;
})();
export default rewriteModule;
