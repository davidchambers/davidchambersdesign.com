'use strict';

exports['I'] = exports[Symbol.for ('I')] = x => x;

exports['K'] = exports[Symbol.for ('K')] = x => y => x;

exports['B'] = exports[Symbol.for ('B')] = f => g => x => f (g (x));

exports['Y'] = exports[Symbol.for ('Y')] = f => (g => g (g)) (g => f (x => g (g) (x)));
