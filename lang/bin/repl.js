import os           from 'node:os';
import path         from 'node:path';
import repl         from 'node:repl';
import vm           from 'node:vm';

import escodegen    from 'escodegen';
import * as Future  from 'fluture';
import sanctuary    from 'sanctuary';

import * as codegen from '../codegen.js';
import * as grammar from '../grammar.js';


const S = sanctuary.unchecked;

const evaluateModule = async source => {
  const context = vm.createContext (global);
  const module = new vm.SourceTextModule (source, {context});
  await module.link (async (specifier, referencingModule) => {
    const entries = Object.entries (await import (specifier));
    const module = new vm.SyntheticModule (
      entries.map (([name]) => name),
      () => {
        for (const [name, value] of entries) {
          module.setExport (name, value);
        }
      },
      {identifier: specifier, context: referencingModule.context}
    );
    return module;
  });
  await module.evaluate ();
  return module.namespace.default;
};

//    read :: String -> Future Error a
const read = S.pipe ([
  S.concat ('import * from "../es.js"\nexport default '),
  Future.encase (grammar.parse),
  S.map (codegen.toModule),
  S.map (escodegen.generate),
  S.chain (Future.encaseP (evaluateModule)),
]);

const print = value => {
  switch (Object.prototype.toString.call (value)) {
    case '[object Null]':
    case '[object Undefined]':
    case '[object Boolean]':
      return `\u001B[35m${S.show (value)}\u001B[0m`;
    case '[object Number]':
      return `\u001B[33m${S.show (value)}\u001B[0m`;
    case '[object String]':
      return `\u001B[32m${S.show (value)}\u001B[0m`;
    case '[object Symbol]':
      return `\u001B[36m:${Symbol.keyFor (value)}\u001B[0m`;
    case '[object Date]':
      return `(\u001B[1mnew\u001B[0m Date ${print (Number (value))})`;
    case '[object RegExp]':
      return `(\u001B[1mnew\u001B[0m RegExp ${print (value.source)} ${print (value.flags)})`;
    case '[object Set]':
      return `(\u001B[1mnew\u001B[0m Set ${print (Array.from (value))})`;
    case '[object Map]':
      return `(\u001B[1mnew\u001B[0m Map ${print (Array.from (value))})`;
    case '[object Array]':
      return `[${S.unwords (S.map (print) (value))}]`;
    case '[object Object]':
      return `{${S.unwords (S.chain (property => [print (property), print (value[property])])
                                    (S.concat (Object.getOwnPropertySymbols (value))
                                              (Object.getOwnPropertyNames (value))))}}`;
    default:
      return `${S.show (value)}`;
  }
};

const server = repl.start ({
  prompt: '>>> ',
  eval: (code, context, filename, callback) => {
    Future.fork (err => {
                   if (err.name === 'SyntaxError') {
                     callback (new repl.Recoverable (err));
                   } else {
                     if (err.name === 'ReferenceError') {
                       err.message = err.message.replace (
                         /^_([^ ]+)/,
                         (_, encoded) => encoded.replace (
                           /[$]([0-9A-F]{4})/g,
                           (_, code) => String.fromCharCode (parseInt (code, 16))
                         )
                       );
                     }
                     console.error (err);
                     console.log ();
                     server.displayPrompt (false);
                   }
                 })
                (result => callback (null, result))
                (read (code));
  },
  writer: value => `${print (value)}\n`,
});

server.setupHistory (
  path.join (os.homedir (), '.serif-repl-history'),
  err => { if (err != null) throw err; },
);
