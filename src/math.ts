export const gcd = (a: bigint, b: bigint): bigint =>
	b === 0n ? a : gcd(b, a % b);

export const lcm = (a: bigint, b: bigint): bigint => (a * b) / gcd(a, b);

export const calculateLambda = (p: bigint, q: bigint): bigint =>
	lcm(p - 1n, q - 1n);

export const calculateN = (p: bigint, q: bigint): bigint => p * q;

export const createL = (n: bigint) => (x: bigint): bigint => (x - 1n) / n;

export const calculateMu = (g: bigint, lambda: bigint, n: bigint): bigint => {
	const L = createL(n);
	return (1n / L(g ** lambda % n ** 2n)) % n;
};
