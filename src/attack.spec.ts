import { generateKeysSync, PublicKey } from "./keys";
import { encrypt, decrypt } from "./encryption";
import { add } from "./homomorphic-math";
import { calculateLambda, calculateMu } from "./math";

const bruteForce = (
	publicKey: PublicKey,
	bitLength: number,
	target: bigint,
	deadline: number,
): bigint => {
	const { g, n, n2 } = publicKey;
	let p = 0n;
	let q = 0n;
	let outOfTime = false;
	for (let p_candidate = 2n; p_candidate < 2 ** bitLength; ++p_candidate) {
		for (let q_candidate = 2n; q_candidate < 2 ** bitLength; ++q_candidate) {
			if (p_candidate * q_candidate === n) {
				p = p_candidate;
				q = q_candidate;
				break;
			}
			if (Date.now() > deadline) {
				outOfTime = true;
				break;
			}
		}
		if ((p && q) || outOfTime) {
			break;
		}
	}
	if (outOfTime) {
		throw new Error("Brute force ran out of time");
	}
	const lambda = calculateLambda(p, q);
	const mu = calculateMu(g, lambda, n, n2);
	const privateKey = { lambda, mu };
	const keyPair = { pub: publicKey, priv: privateKey };
	return decrypt(keyPair)(target);
};

describe("brute-force attack", () => {
	const feasibleTime = 20_000;

	test("is feasible for small key sizes", () => {
		const bitLength = 16;
		const keyPair = generateKeysSync(bitLength);
		const encryptN = encrypt(keyPair.pub);

		const n1 = 123n;
		const n2 = 456n;
		const expected = 579n;

		const cipherText1 = encryptN(n1);
		const cipherText2 = encryptN(n2);

		const encryptedResult = add(keyPair.pub)(cipherText1, cipherText2);

		const deadline = Date.now() + feasibleTime;
		const result = bruteForce(
			keyPair.pub,
			bitLength,
			encryptedResult,
			deadline,
		);

		expect(result).toStrictEqual(expected);
	});

	test("is infeasible for large key sizes", () => {
		const bitLength = 1024;
		const keyPair = generateKeysSync(bitLength);
		const encryptN = encrypt(keyPair.pub);

		const n1 = 123n;
		const n2 = 456n;

		const cipherText1 = encryptN(n1);
		const cipherText2 = encryptN(n2);

		const encryptedResult = add(keyPair.pub)(cipherText1, cipherText2);

		const deadline = Date.now() + feasibleTime;
		expect(
			bruteForce.bind(null, keyPair.pub, bitLength, encryptedResult, deadline),
		).toThrowError(/brute force ran out of time/i);
	});
});
