export const _console               = console;
// https://262.ecma-international.org/6.0/#sec-11.8.1
export const _null                  = null;
// https://262.ecma-international.org/6.0/#sec-11.8.2
export const _true                  = true;
export const _false                 = false;

// https://262.ecma-international.org/6.0/#sec-12.3.3

// https://262.ecma-international.org/6.0/#sec-12.5.5
export const _void                  = x => void x;
// https://262.ecma-international.org/6.0/#sec-12.5.6
export const _typeof                = x => typeof x;
// https://262.ecma-international.org/6.0/#sec-12.5.11
export const _$007E                 = x => ~x;
// https://262.ecma-international.org/6.0/#sec-12.5.12
export const _$0021                 = x => !x;

// https://262.ecma-international.org/6.0/#sec-12.6
export const _$002A                 = y => x => x * y;
export const _$002F                 = y => x => x / y;
export const _$0025                 = y => x => x % y;

// https://262.ecma-international.org/6.0/#sec-12.7
export const _$002B                 = y => x => x + y;
export const _$002D                 = y => x => x - y;

// https://262.ecma-international.org/6.0/#sec-12.8
export const _$003C$003C            = y => x => x << y;
export const _$003E$003E            = y => x => x >> y;
export const _$003E$003E$003E       = y => x => x >>> y;

// https://262.ecma-international.org/6.0/#sec-12.9
export const _$003C                 = y => x => x < y;
export const _$003E                 = y => x => x > y;
export const _$003C$003D            = y => x => x <= y;
export const _$003E$003D            = y => x => x >= y;
export const _instanceof            = y => x => x instanceof y;
export const _in                    = y => x => x in y;

// https://262.ecma-international.org/6.0/#sec-12.10
export const _$003D$003D            = y => x => x == y;
export const _$0021$003D            = y => x => x != y;
export const _$003D$003D$003D       = y => x => x === y;
export const _$0021$003D$003D       = y => x => x !== y;

// https://262.ecma-international.org/6.0/#sec-12.11
export const _$0026                 = y => x => x & y;
export const _$005E                 = y => x => x ^ y;
export const _$007C                 = y => x => x | y;

// https://262.ecma-international.org/6.0/#sec-12.12
export const _$0026$0026            = y => x => x && y;
export const _$007C$007C            = y => x => x || y;

// https://262.ecma-international.org/6.0/#sec-18.1.1
export const _Infinity              = Infinity;
// https://262.ecma-international.org/6.0/#sec-18.1.2
export const _NaN                   = NaN;
// https://262.ecma-international.org/6.0/#sec-18.1.3
export const _undefined             = undefined;

// https://262.ecma-international.org/6.0/#sec-18.2.1
export const _eval                  = eval;
// https://262.ecma-international.org/6.0/#sec-18.2.2
export const _isFinite              = isFinite;
// https://262.ecma-international.org/6.0/#sec-18.2.3
export const _isNaN                 = isNaN;
// https://262.ecma-international.org/6.0/#sec-18.2.4
export const _parseFloat            = parseFloat;
// https://262.ecma-international.org/6.0/#sec-18.2.5
export const _parseInt              = parseInt;

// https://262.ecma-international.org/6.0/#sec-18.2.6.2
export const _decodeURI             = decodeURI;
// https://262.ecma-international.org/6.0/#sec-18.2.6.3
export const _decodeURIComponent    = decodeURIComponent;
// https://262.ecma-international.org/6.0/#sec-18.2.6.4
export const _encodeURI             = encodeURI;
// https://262.ecma-international.org/6.0/#sec-18.2.6.5
export const _encodeURIComponent    = encodeURIComponent;

// https://262.ecma-international.org/6.0/#sec-18.3.1
export const _Array                 = Array;
// https://262.ecma-international.org/6.0/#sec-18.3.2
export const _ArrayBuffer           = ArrayBuffer;
// https://262.ecma-international.org/6.0/#sec-18.3.3
export const _Boolean               = Boolean;
// https://262.ecma-international.org/6.0/#sec-18.3.4
export const _DataView              = DataView;
// https://262.ecma-international.org/6.0/#sec-18.3.5
export const _Date                  = Date;
// https://262.ecma-international.org/6.0/#sec-18.3.6
export const _Error                 = Error;
// https://262.ecma-international.org/6.0/#sec-18.3.7
export const _EvalError             = EvalError;
// https://262.ecma-international.org/6.0/#sec-18.3.8
export const _Float32Array          = Float32Array;
// https://262.ecma-international.org/6.0/#sec-18.3.9
export const _Float64Array          = Float64Array;
// https://262.ecma-international.org/6.0/#sec-18.3.10
export const _Function              = Function;
// https://262.ecma-international.org/6.0/#sec-18.3.11
export const _Int8Array             = Int8Array;
// https://262.ecma-international.org/6.0/#sec-18.3.12
export const _Int16Array            = Int16Array;
// https://262.ecma-international.org/6.0/#sec-18.3.13
export const _Int32Array            = Int32Array;
// https://262.ecma-international.org/6.0/#sec-18.3.14
export const _Map                   = Map;
// https://262.ecma-international.org/6.0/#sec-18.3.15
export const _Number                = Number;
// https://262.ecma-international.org/6.0/#sec-18.3.16
export const _Object                = Object;
// https://262.ecma-international.org/6.0/#sec-18.3.17
export const _Proxy                 = Proxy;
// https://262.ecma-international.org/6.0/#sec-18.3.18
export const _Promise               = Promise;
// https://262.ecma-international.org/6.0/#sec-18.3.19
export const _RangeError            = RangeError;
// https://262.ecma-international.org/6.0/#sec-18.3.20
export const _ReferenceError        = ReferenceError;
// https://262.ecma-international.org/6.0/#sec-18.3.21
export const _RegExp                = RegExp;
// https://262.ecma-international.org/6.0/#sec-18.3.22
export const _Set                   = Set;
// https://262.ecma-international.org/6.0/#sec-18.3.23
export const _String                = String;
// https://262.ecma-international.org/6.0/#sec-18.3.24
export const _Symbol                = Symbol;
// https://262.ecma-international.org/6.0/#sec-18.3.25
export const _SyntaxError           = SyntaxError;
// https://262.ecma-international.org/6.0/#sec-18.3.26
export const _TypeError             = TypeError;
// https://262.ecma-international.org/6.0/#sec-18.3.27
export const _Uint8Array            = Uint8Array;
// https://262.ecma-international.org/6.0/#sec-18.3.28
export const _Uint8ClampedArray     = Uint8ClampedArray;
// https://262.ecma-international.org/6.0/#sec-18.3.29
export const _Uint16Array           = Uint16Array;
// https://262.ecma-international.org/6.0/#sec-18.3.30
export const _Uint32Array           = Uint32Array;
// https://262.ecma-international.org/6.0/#sec-18.3.31
export const _URIError              = URIError;
// https://262.ecma-international.org/6.0/#sec-18.3.32
export const _WeakMap               = WeakMap;
// https://262.ecma-international.org/6.0/#sec-18.3.33
export const _WeakSet               = WeakSet;

// https://262.ecma-international.org/6.0/#sec-18.4.1
export const _JSON                  = JSON;
// https://262.ecma-international.org/6.0/#sec-18.4.2
export const _Math                  = Math;
// https://262.ecma-international.org/6.0/#sec-18.4.3
export const _Reflect               = Reflect;
