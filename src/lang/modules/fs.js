'use strict';
module.exports = (([_$003D$003D$003D, _$0021$003D$003D, _$003E$003D, _$002A, _$002F, _$002B, _$002D, _$002A$002A, _new, _type$002Dof, _instance$002Dof, _null, _undefined, _true, _false, _Infinity, _$002DInfinity, _Array, _Number, _Object, _RegExp, _Set, _String, _Symbol, _Error, _SyntaxError, _JSON, _Math, _throw, _apply, _uncurry$002D2, _uncurry$002D3, _uncurry$002D4, _uncurry$002D5, _datetime, _string$002D$003Esymbol, _symbol$002D$003Estring, _curry$002D2, _curry$002D3, _curry$002D4, _curry$002D5, _array$003F, _string$003F, _symbol$003F, _$002B$002B, _reduce$002Dobject, _concat, _insert]) => (_fs => (_fs$002Dread$002Ddir => (_fs$002Dread$002Dfile => (_fs$002Dwrite$002Dfile => (_node => ({
    [Symbol.for('read-dir')]: _path => _node(_fs$002Dread$002Ddir(_path)),
    [Symbol.for('read-file')]: _filename => _node(_fs$002Dread$002Dfile(_filename)('utf8')),
    [Symbol.for('write-file')]: _filename => _data => _node(_fs$002Dwrite$002Dfile(_filename)(_data)('utf8'))
}))((obj => obj['node'])(require('fluture'))))(_curry$002D4((obj => obj['writeFile'])(_fs))))(_curry$002D3((obj => obj['readFile'])(_fs))))(_curry$002D2((obj => obj['readdir'])(_fs))))(require('fs')))((env => Object.getOwnPropertySymbols(env).map(sym => env[sym]))([
    './base.js',
    './prelude.js'
].reduce((env, path) => Object.assign(env, require(path)), Object.create(null))));