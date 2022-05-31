export const _I = x => x;

export const _K = x => y => x;

export const _B = f => g => x => f (g (x));

export const _Y = f => (g => g (g)) (g => f (x => g (g) (x)));
