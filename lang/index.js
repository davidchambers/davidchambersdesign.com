import * as codegen from './src/codegen.js';
import * as grammar from './src/grammar.js';

export default {
  parse: grammar.parse,
  trans: codegen.toModule,
};
