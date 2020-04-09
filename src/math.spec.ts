import { calculateMu, createL, gcd, getBitLength, lcm } from "./math";

describe("getBitLength", () => {
	test.each([
		[0n, 1],
		[1n, 1],
		[2n, 2],
		[3n, 2],
		[15n, 4],
		[16n, 5],
		[9007199254740992n, 54],
	])("calculates bit length for %d = %d", (a, expected) => {
		const actual = getBitLength(a);
		expect(actual).toStrictEqual(expected);
	});
});

describe("createL", () => {
	const n = 15n;
	const L = createL(n);

	test("creates a function", () => {
		const L = createL(n);
		expect(typeof L).toBe("function");
	});

	test("created function implements L", () => {
		const x = 136n;
		const expected = 9n;
		const actual = L(x);
		expect(actual).toStrictEqual(expected);
	});
});

describe("gcd", () => {
	test("calculates greatest common denominator", () => {
		const a = 18n;
		const b = 300n;
		const expected = 6n;
		const actual = gcd(a, b);
		expect(actual).toStrictEqual(expected);
	});
});

describe("lcm", () => {
	test("calculates least common multiple", () => {
		const a = 18n;
		const b = 300n;
		const expected = 900n;
		const actual = lcm(a, b);
		expect(actual).toStrictEqual(expected);
	});
});

describe("calculateMu", () => {
	test("calculates mu", () => {
		const g = 848n;
		const lambda = 144n;
		const n = 323n;
		const expected = 1n;
		const actual = calculateMu(g, lambda, n);
		expect(actual).toStrictEqual(expected);
	});
});
