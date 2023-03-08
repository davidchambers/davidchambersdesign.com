import * as codegen from './codegen.js';
// @ts-ignore
import * as grammar from './grammar.js';
import type {Module} from './types.js';

export default {
  parse: (input: string, filename: string): Module => grammar.parse(input, {grammarSource: filename}),
  trans: codegen.toModule,
};
