function escapeIdentifier(name) {
  return '_' + name.replace(
    /[^A-Za-z0-9_]/g,
    c => '$' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
  );
}

function Identifier(name) {
  return {
    type: 'Identifier',
    name: escapeIdentifier(name),
  };
}

function toJsAst(expr) {
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
      return Identifier(expr.name);
    }
    const [head, ...tail] = expr.name.split(/(?=[./])/);
    return tail.reduce((object, part) => ({
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
    }), Identifier(head));
  } else if (expr.type === 'array') {
    return {
      type: 'ArrayExpression',
      elements: expr.elements.map(expr => toJsAst(expr)),
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
        key: toJsAst(key),
        value: toJsAst(value),
      })),
    };
  } else if (expr.type === 'lambda') {
    return ({
      type: 'ArrowFunctionExpression',
      expression: false,
      params: [toJsAst(expr.parameter)],
      body: toJsAst(expr.body),
    });
  } else if (expr.type === 'let') {
    return expr.bindings.reduceRight((body, binding) => {
      if (binding.parameterNames.length > 0) {
        const [param, ...params] = binding.parameterNames.map(Identifier);
        return {
          type: 'CallExpression',
          optional: false,
          callee: {
            type: 'ArrowFunctionExpression',
            expression: true,
            params: [Identifier(binding.name)],
            body,
          },
          arguments: [{
            type: 'FunctionExpression',
            id: Identifier(binding.name),
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
                  toJsAst(binding.expression)
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
            params: [Identifier(binding.name)],
            body,
          },
          arguments: [toJsAst(binding.expression)],
        };
      }
    }, toJsAst(expr.body));
  } else if (expr.type === 'and') {
    return {
      type: 'LogicalExpression',
      operator: '&&',
      left: toJsAst(expr.left),
      right: toJsAst(expr.right),
    };
  } else if (expr.type === 'or') {
    return {
      type: 'LogicalExpression',
      operator: '||',
      left: toJsAst(expr.left),
      right: toJsAst(expr.right),
    };
  } else if (expr.type === 'if') {
    return {
      type: 'ConditionalExpression',
      test: toJsAst(expr.predicate),
      consequent: toJsAst(expr.consequent),
      alternate: toJsAst(expr.alternative),
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
              test: toJsAst(predicate),
              consequent: [{
                type: 'ReturnStatement',
                argument: toJsAst(consequent),
              }],
            })),
          }],
        },
      },
      arguments: [toJsAst(expr.discriminant)],
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
        args.push(toJsAst(argument));
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
              property: toJsAst(expr.callee),
            },
          };
        }
        default: {
          return toJsAst(expr.callee);
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
        args.push(toJsAst(argument));
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

function exportsLast(statements) {
  const exportTypes = new Set(['named-exports', 'default-export']);
  return [...statements].sort((s1, s2) =>
    (exportTypes.has(s1.type) ? 1 : 0) -
    (exportTypes.has(s2.type) ? 1 : 0)
  );
}

export async function toModule(statements, exportedNames) {
  return {
    type: 'Program',
    sourceType: 'module',
    body: await Promise.all(exportsLast(statements).map(async statement =>
      statement.type === 'star-import' ? {
        type: 'ImportDeclaration',
        specifiers: (
          (statement.source.endsWith('.serif')
           ? (hiding =>
               exportedNames(statement.source)
               .filter(name => !hiding.has(name))
               .map(escapeIdentifier)
             )(new Set(statement.hiding))
           : Object.keys(await import(statement.source)))
          .map(name => ({
            type: 'ImportSpecifier',
            local: {
              type: 'Identifier',
              name,
            },
            imported: {
              type: 'Identifier',
              name,
            },
          }))
        ),
        source: {
          type: 'Literal',
          value: statement.source.replace(/[.]serif$/, '.js'),
        },
      } :
      statement.type === 'named-imports' ? {
        type: 'ImportDeclaration',
        specifiers: statement.names.map(name => ({
          type: 'ImportSpecifier',
          local: Identifier(name),
          imported: Identifier(name),
        })),
        source: {
          type: 'Literal',
          value: statement.source.replace(/[.]serif$/, '.js'),
        },
      } :
      statement.type === 'default-import' ? {
        type: 'ImportDeclaration',
        specifiers: [{
          type: 'ImportDefaultSpecifier',
          local: Identifier(statement.name),
        }],
        source: {
          type: 'Literal',
          value: statement.source.replace(/[.]serif$/, '.js'),
        },
      } :
      statement.type === 'named-exports' ? {
        type: 'ExportNamedDeclaration',
        declaration: null,
        specifiers: statement.names.map(name => ({
          type: 'ExportSpecifier',
          local: Identifier(name),
          exported: Identifier(name),
        })),
        source: null,
      } :
      statement.type === 'default-export' ? {
        type: 'ExportDefaultDeclaration',
        declaration: toJsAst(statement.expression),
      } :
      statement.parameterNames.length === 0 ? {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [{
          type: 'VariableDeclarator',
          id: Identifier(statement.name),
          init: toJsAst(statement.expression),
        }],
      } : {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations: [{
          type: 'VariableDeclarator',
          id: Identifier(statement.name),
          init: {
            type: 'FunctionExpression',
            id: Identifier(statement.name),
            params: statement.parameterNames.slice(0, 1).map(Identifier),
            body: {
              type: 'BlockStatement',
              body: [{
                type: 'ReturnStatement',
                argument: statement.parameterNames.slice(1).reduceRight(
                  (body, name) => ({
                    type: 'ArrowFunctionExpression',
                    expression: false,
                    params: [Identifier(name)],
                    body,
                  }),
                  toJsAst(statement.expression)
                ),
              }],
            },
          },
        }],
      }
    )),
  };
}
