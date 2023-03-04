import * as codegen from './lib/codegen.js';
import * as grammar from './src/grammar.js';

export default {
  parse: (input, filename) => grammar.parse(input, {grammarSource: filename}),
  trans: codegen.toModule,
};
