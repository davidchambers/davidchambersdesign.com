const escapeIdentifier = name => '_' + name.replace(
  /[^A-Za-z0-9_]/g,
  c => '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
);

const reference = (name, names) => (
  names.has(name) ? {
    type: 'Identifier',
    name: escapeIdentifier(name),
  } : {
    type: 'MemberExpression',
    computed: true,
    optional: false,
    object: {
      type: 'Identifier',
      name: '$',
    },
    property: {
      type: 'Literal',
      value: escapeIdentifier(name),
    },
  }
);

function toJsAst(expr, names) {
  if (expr.type === 'number') {
    if (expr.value < 0) {
      return {
        type: 'UnaryExpression',
        prefix: true,
        operator: '-',
        argument: {
          type: 'Literal',
          value: -expr.value,
        },
      };
    } else {
      return {
        type: 'Literal',
        value: expr.value,
      };
    }
  } else if (expr.type === 'string') {
    return {
      type: 'Literal',
      value: expr.value,
    };
  } else if (expr.type === 'symbol') {
    return {
      type: 'CallExpression',
      optional: false,
      callee: {
        type: 'MemberExpression',
        computed: false,
        optional: false,
        object: {
          type: 'Identifier',
          name: 'Symbol',
        },
        property: {
          type: 'Identifier',
          name: 'for',
        },
      },
      arguments: [{
        type: 'Literal',
        value: expr.name,
      }],
    };
  } else if (expr.type === 'identifier') {
    if (expr.name === 'import.meta') {
      return {
        type: 'MemberExpression',
        computed: false,
        optional: false,
        object: {
          type: 'Identifier',
          name: 'import',
        },
        property: {
          type: 'Identifier',
          name: 'meta',
        },
      };
    }
    if (expr.name === '.' || expr.name === '/') {
      return reference(expr.name, names);
    }
    const [head, ...tail] = expr.name.split(/(?=[./])/);
    return tail.reduce(
      (object, part) => ({
        type: 'MemberExpression',
        computed: true,
        optional: false,
        object,
        property: (
          part.startsWith('.') ? {
            type: 'Literal',
            value: part.slice('.'.length),
          } :
          part.startsWith('/') ? {
            type: 'CallExpression',
            optional: false,
            callee: {
              type: 'MemberExpression',
              computed: false,
              optional: false,
              object: {
                type: 'Identifier',
                name: 'Symbol',
              },
              property: {
                type: 'Identifier',
                name: 'for',
              },
            },
            arguments: [{
              type: 'Literal',
              value: part.slice('/'.length),
            }],
          } :
          never  // eslint-disable-line no-undef
        ),
      }),
      reference(head, names)
    );
  } else if (expr.type === 'array') {
    return {
      type: 'ArrayExpression',
      elements: expr.elements.map(expr => toJsAst(expr, names)),
    };
  } else if (expr.type === 'object') {
    return {
      type: 'ObjectExpression',
      properties: expr.entries.map(([key, value]) => ({
        type: 'Property',
        kind: 'init',
        method: false,
        shorthand: false,
        computed: true,
        key: toJsAst(key, names),
        value: toJsAst(value, names),
      })),
    };
  } else if (expr.type === 'lambda') {
    const names$ = new Set([...names, expr.parameter.name]);
    return ({
      type: 'ArrowFunctionExpression',
      expression: false,
      params: [toJsAst(expr.parameter, names$)],
      body: toJsAst(expr.body, names$),
    });
  } else if (expr.type === 'let') {
    return expr.bindings.reduceRight(
      (body, binding, idx, bindings) => {
        if (binding.parameterNames.length > 0) {
          const [param, ...params] = binding.parameterNames.map(name => ({
            type: 'Identifier',
            name: escapeIdentifier(name),
          }));
          return {
            type: 'CallExpression',
            optional: false,
            callee: {
              type: 'ArrowFunctionExpression',
              expression: true,
              params: [{
                type: 'Identifier',
                name: escapeIdentifier(binding.name),
              }],
              body,
            },
            arguments: [{
              type: 'FunctionExpression',
              id: {
                type: 'Identifier',
                name: escapeIdentifier(binding.name),
              },
              params: [param],
              body: {
                type: 'BlockStatement',
                body: [{
                  type: 'ReturnStatement',
                  argument: params.reduceRight(
                    (body, param) => ({
                      type: 'ArrowFunctionExpression',
                      expression: true,
                      params: [param],
                      body,
                    }),
                    toJsAst(binding.expression, new Set([
                      ...names,
                      ...bindings.slice(0, idx).map(binding => binding.name),
                      ...binding.parameterNames,
                    ]))
                  ),
                }],
              },
            }],
          };
        } else {
          return {
            type: 'CallExpression',
            optional: false,
            callee: {
              type: 'ArrowFunctionExpression',
              expression: true,
              params: [{
                type: 'Identifier',
                name: escapeIdentifier(binding.name),
              }],
              body,
            },
            arguments: [
              toJsAst(binding.expression, new Set([
                ...names,
                ...bindings.slice(0, idx).map(binding => binding.name),
              ])),
            ],
          };
        }
      },
      toJsAst(expr.body, new Set([
        ...names,
        ...expr.bindings.map(binding => binding.name),
      ]))
    );
  } else if (expr.type === 'and') {
    return {
      type: 'LogicalExpression',
      operator: '&&',
      left: toJsAst(expr.left, names),
      right: toJsAst(expr.right, names),
    };
  } else if (expr.type === 'or') {
    return {
      type: 'LogicalExpression',
      operator: '||',
      left: toJsAst(expr.left, names),
      right: toJsAst(expr.right, names),
    };
  } else if (expr.type === 'if') {
    return {
      type: 'ConditionalExpression',
      test: toJsAst(expr.predicate, names),
      consequent: toJsAst(expr.consequent, names),
      alternate: toJsAst(expr.alternative, names),
    };
  } else if (expr.type === 'switch') {
    return {
      type: 'CallExpression',
      optional: false,
      callee: {
        type: 'ArrowFunctionExpression',
        expression: false,
        params: [{
          type: 'Identifier',
          name: '$discriminant',
        }],
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: '$discriminant',
            },
            cases: expr.cases.map(({predicate, consequent}) => ({
              type: 'SwitchCase',
              test: toJsAst(predicate, names),
              consequent: [{
                type: 'ReturnStatement',
                argument: toJsAst(consequent, names),
              }],
            })),
          }],
        },
      },
      arguments: [toJsAst(expr.discriminant, names)],
    };
  } else if (expr.type === 'new' || expr.type === 'invocation') {
    const params = [];
    const args = [];
    let n = 0;
    for (const argument of expr.arguments) {
      n += 1;
      if (argument.type === 'placeholder') {
        const param = {type: 'Identifier', name: `_${n}`};
        params.push(param);
        args.push(param);
      } else {
        args.push(toJsAst(argument, names));
      }
    }
    switch (expr.type) {
      case 'new': {
        const callee = args.shift();
        return params.reduceRight(
          (body, param) => ({
            type: 'ArrowFunctionExpression',
            expression: false,
            params: [param],
            body,
          }), {
            type: 'NewExpression',
            callee,
            arguments: args,
          }
        );
      }
      case 'invocation': {
        const object = args.pop();
        return params.reduceRight((body, param) => ({
          type: 'ArrowFunctionExpression',
          expression: false,
          params: [param],
          body,
        }), {
          type: 'CallExpression',
          optional: false,
          callee: {
            type: 'MemberExpression',
            computed: true,
            optional: false,
            object,
            property: {
              type: 'Literal',
              value: expr.name,
            },
          },
          arguments: args,
        });
      }
    }
  } else if (expr.type === 'application') {
    const callee = (() => {
      switch (expr.callee.type) {
        case 'placeholder': {
          const param = {type: 'Identifier', name: '_0'};
          return {
            type: 'ArrowFunctionExpression',
            expression: false,
            params: [param],
            body: param,
          };
        }
        case 'number':
        case 'string':
        case 'symbol': {
          const param = {type: 'Identifier', name: '_0'};
          return {
            type: 'ArrowFunctionExpression',
            expression: false,
            params: [param],
            body: {
              type: 'MemberExpression',
              computed: true,
              optional: false,
              object: param,
              property: toJsAst(expr.callee, names),
            },
          };
        }
        default: {
          return toJsAst(expr.callee, names);
        }
      }
    })();
    const params = [];
    const args = [];
    let n = 0;
    for (const argument of expr.arguments) {
      n += 1;
      if (argument.type === 'placeholder') {
        const param = {type: 'Identifier', name: `_${n}`};
        params.push(param);
        args.push(param);
      } else {
        args.push(toJsAst(argument, names));
      }
    }
    return params.reduceRight((body, param) => ({
      type: 'ArrowFunctionExpression',
      expression: false,
      params: [param],
      body,
    }), args.reduce((callee, arg) => ({
      type: 'CallExpression',
      optional: false,
      callee,
      arguments: [arg],
    }), callee));
  }
}

export const toModule = statements => {
  //  Exports are allowed to occur anywhere in a Serif module, to allow
  //  exports to follow imports near the top of the module if desired.
  //  This matches the semantics of ECMAScript modules. Exports are
  //  processed last, once all top-level bindings are known.
  const exportTypes = new Set(['named-exports', 'default-export']);
  const statementsExportsLast = [...statements].sort((s1, s2) =>
    (exportTypes.has(s1.type) ? 1 : 0) -
    (exportTypes.has(s2.type) ? 1 : 0)
  );

  const sourceIdentifiers = [];
  const names = new Set([]);
  const imports = [];
  const declarations = [];
  const exports = [];
  for (const statement of statementsExportsLast) {
    switch (statement.type) {
      case 'star-import': {
        const identifier = {
          type: 'Identifier',
          name: escapeIdentifier(statement.source),
        };
        sourceIdentifiers.push(identifier);
        imports.push({
          type: 'ImportDeclaration',
          specifiers: [{
            type: 'ImportNamespaceSpecifier',
            local: identifier,
          }],
          source: {
            type: 'Literal',
            value: statement.source.replace(/[.]serif$/, '.js'),
          },
        });
        break;
      }
      case 'named-imports': {
        for (const name of statement.names) names.add(name);
        imports.push({
          type: 'ImportDeclaration',
          specifiers: (
            statement.names
            .map(name => ({type: 'Identifier', name: escapeIdentifier(name)}))
            .map(identifier => ({
              type: 'ImportSpecifier',
              local: identifier,
              imported: identifier,
            }))
          ),
          source: {
            type: 'Literal',
            value: statement.source.replace(/[.]serif$/, '.js'),
          },
        });
        break;
      }
      case 'default-import': {
        names.add(statement.name);
        imports.push({
          type: 'ImportDeclaration',
          specifiers: [{
            type: 'ImportDefaultSpecifier',
            local: {
              type: 'Identifier',
              name: escapeIdentifier(statement.name),
            },
          }],
          source: {
            type: 'Literal',
            value: statement.source.replace(/[.]serif$/, '.js'),
          },
        });
        break;
      }
      case 'named-exports': {
        exports.push({
          type: 'ExportNamedDeclaration',
          declaration: null,
          specifiers: (
            statement.names
            .map(name => ({type: 'Identifier', name: escapeIdentifier(name)}))
            .map(identifier => ({
              type: 'ExportSpecifier',
              local: identifier,
              exported: identifier,
            }))
          ),
          source: null,
        });
        break;
      }
      case 'default-export': {
        exports.push({
          type: 'ExportDefaultDeclaration',
          declaration: toJsAst(statement.expression, names),
        });
        break;
      }
      case 'declaration': {
        names.add(statement.name);
        const init = (body => {
          if (statement.parameterNames.length === 0) return body;
          const [param, ...params] = statement.parameterNames.map(name => ({
            type: 'Identifier',
            name: escapeIdentifier(name),
          }));
          return {
            type: 'FunctionExpression',
            id: {
              type: 'Identifier',
              name: escapeIdentifier(statement.name),
            },
            params: [param],
            body: {
              type: 'BlockStatement',
              body: [{
                type: 'ReturnStatement',
                argument: params.reduceRight((body, param) => ({
                  type: 'ArrowFunctionExpression',
                  expression: false,
                  params: [param],
                  body,
                }), body),
              }],
            },
          };
        })(toJsAst(statement.expression, new Set([
          ...names,
          statement.name,
          ...statement.parameterNames,
        ])));
        declarations.push({
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: escapeIdentifier(statement.name),
            },
            init,
          }],
        });
        break;
      }
    }
  }

  return {
    type: 'Program',
    sourceType: 'module',
    body: [
      ...imports,
      {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [{
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: '$',
          },
          init: {
            type: 'CallExpression',
            optional: false,
            callee: {
              type: 'MemberExpression',
              computed: false,
              optional: false,
              object: {
                type: 'ArrayExpression',
                elements: sourceIdentifiers,
              },
              property: {
                type: 'Identifier',
                name: 'reduce',
              },
            },
            arguments: [{
               type: 'ArrowFunctionExpression',
               expression: false,
               params: [{
                 type: 'Identifier',
                 name: '$',
               }, {
                 type: 'Identifier',
                 name: 'o',
               }],
               body: {
                 type: 'CallExpression',
                 optional: false,
                 callee: {
                   type: 'MemberExpression',
                   computed: false,
                   optional: false,
                   object: {
                     type: 'Identifier',
                     name: 'Object',
                   },
                   property: {
                     type: 'Identifier',
                     name: 'assign',
                   },
                 },
                 arguments: [{
                   type: 'Identifier',
                   name: '$',
                 }, {
                   type: 'Identifier',
                   name: 'o',
                 }],
               },
            }, {
              type: 'CallExpression',
              optional: false,
              callee: {
                type: 'MemberExpression',
                computed: false,
                optional: false,
                object: {
                  type: 'Identifier',
                  name: 'Object',
                },
                property: {
                  type: 'Identifier',
                  name: 'create',
                },
              },
              arguments: [{
                type: 'Literal',
                value: null,
              }],
            }],
          },
        }],
      },
      ...declarations,
      ...exports,
    ],
  };
};
