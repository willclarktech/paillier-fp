import { generateKeysSync, getKeys } from "./keys";

describe("getKeys", () => {
	const p = 17n;
	const q = 19n;
	const n = 323n;
	const lambda = 144n;
	const g = 848n;
	const mu = 1n;

	describe("with provided p, q, n, and g", () => {
		const keys = getKeys(p, q, n, g);

		test("generates public key", () => {
			expect(keys.pub.n).toStrictEqual(n);
			expect(keys.pub.n2).toStrictEqual(n ** 2n);
			expect(keys.pub.g).toStrictEqual(g);
		});

		test("generates private key", () => {
			expect(keys.priv.lambda).toStrictEqual(lambda);
			expect(keys.priv.mu).toStrictEqual(mu);
		});
	});
});

describe("generateKeysSync", () => {
	test("generates public key", () => {
		const keys = generateKeysSync();
		expect(keys.pub).toHaveProperty("n");
		expect(keys.pub).toHaveProperty("g");
	});

	test("generates private key", () => {
		const keys = generateKeysSync();
		expect(keys.priv).toHaveProperty("lambda");
		expect(keys.priv).toHaveProperty("mu");
		expect(keys.priv.mu).not.toStrictEqual(0n);
	});

	test("generates distinct keys", () => {
		const keys1 = generateKeysSync();
		const keys2 = generateKeysSync();
		expect(keys1.pub.n).not.toStrictEqual(keys2.pub.n);
		expect(keys1.pub.g).not.toStrictEqual(keys2.pub.g);
	});
});
