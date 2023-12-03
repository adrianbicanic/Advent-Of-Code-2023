import { join } from 'path';
import { parseInput } from '../utils';

const inputPath = join(__dirname, 'input.txt');
const inputData = parseInput(inputPath) as Array<string>;

/**
 * Trebuchet?!
 *
 * --- Part One ---
 *
 * On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * For example:
 *
 * ```
 * 1abc2
 * pqr3stu8vwx
 * a1b2c3d4e5f
 * treb7uchet
 * ```
 *
 * In this example, the calibration values of these four lines are `12`, `38`, `15`, and `77`. Adding these together produces `142`.
 * Consider your entire calibration document. What is the sum of all of the calibration values?
 */

export function solve(): number {
	const addends = inputData.map((input) => {
		const firstDigit = input.split('').find(Number);
		const lastDigit = input.split('').reverse().find(Number);

		return Number(`${firstDigit}${lastDigit}`);
	});

	const sum = addends.reduce((sum, addend) => (sum += addend), 0);

	return sum;
}
