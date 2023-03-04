import * as codegen from './lib/codegen.js';
import * as grammar from './src/grammar.js';

export default {
  parse: grammar.parse,
  trans: codegen.toModule,
};
