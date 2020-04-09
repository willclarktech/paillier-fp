import { PublicKey } from "./keys";
import { modPow } from "bigint-crypto-utils";

export const add = ({ n2 }: PublicKey) => (a: bigint, b: bigint): bigint =>
	(a * b) % n2;

export const multiply = ({ n2 }: PublicKey) => (
	cipherText: bigint,
	plainText: bigint,
): bigint => modPow(cipherText, plainText, n2);
