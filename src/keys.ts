import { modPow, primeSync, randBetween } from "bigint-crypto-utils";
import { calculateLambda, calculateMu, getBitLength } from "./math";

export type PublicKey = {
	readonly n: bigint;
	readonly g: bigint;
};

export type PrivateKey = {
	readonly lambda: bigint;
	readonly mu: bigint;
};

export type KeyPair = {
	readonly pub: PublicKey;
	readonly priv: PrivateKey;
};

export const getKeys = (
	p: bigint,
	q: bigint,
	n: bigint,
	g: bigint,
): KeyPair => {
	const lambda = calculateLambda(p, q);
	const mu = calculateMu(g, lambda, n);
	const pub = { n, g };
	const priv = { lambda, mu };
	return { pub, priv };
};

// Adapted from https://github.com/juanelas/paillier-bigint/blob/904164e/src/js/index.js#L98-L102
const generateGenerator = (n: bigint, n2 = n ** 2n) => {
	const alpha = randBetween(n);
	const beta = randBetween(n);
	return ((alpha * n + 1n) * modPow(beta, n, n2)) % n2;
};

export const generateKeysSync = (bitLength = 3072): KeyPair => {
	const halfBitLength = Math.floor(bitLength / 2);
	const p = primeSync(halfBitLength + 1);
	const q = primeSync(halfBitLength);
	const n = p * q;

	if (p === q || getBitLength(n) !== bitLength) {
		return generateKeysSync(bitLength);
	}

	const g = generateGenerator(n);
	return getKeys(p, q, n, g);
};
