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
			expect(keys.pub.n).toEqual(n);
			expect(keys.pub.g).toEqual(g);
		});

		test("generates private key", () => {
			expect(keys.priv.lambda).toEqual(lambda);
			expect(keys.priv.mu).toEqual(mu);
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
	});

	test("generates distinct keys", () => {
		const keys1 = generateKeysSync();
		const keys2 = generateKeysSync();
		expect(keys1.pub.n).not.toStrictEqual(keys2.pub.n);
		expect(keys1.pub.g).not.toStrictEqual(keys2.pub.g);
	});
});
