import * as codegen from './codegen.js';
import * as ES from './es.js';
// @ts-ignore
import * as grammar from './grammar.js';
import rewrite from './rewrite.js';
import type {Module} from './types.js';

export default {
  parse: (input: string, filename: string): Module => grammar.parse(input, {grammarSource: filename}),
  trans: (module: Module, exportedNames: (source: string) => ReadonlyArray<string>): Promise<ES.Program> => (
    codegen.toModule(rewrite(module), exportedNames)
  ),
};
