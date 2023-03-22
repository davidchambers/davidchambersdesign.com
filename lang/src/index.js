import * as codegen from './codegen.js';
import * as grammar from './grammar.js';
import rewrite from './rewrite.js';

export default {
  parse: (input, filename) => grammar.parse(input, {grammarSource: filename}),
  trans: (module, exportedNames) => codegen.toModule(rewrite(module), exportedNames),
};
