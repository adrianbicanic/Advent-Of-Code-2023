import { join } from 'path';
import { sum } from '../utils/array';
import { parseInput } from '../utils/data';

/*
 * Trebuchet?!
 *
 * --- Part Two ---
 *
 * Your calculation isn't quite right.
 * It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
 * Equipped with this new information, you now need to find the real first and last digit on each line. For example:
 *
 * ```
 * two1nine
 * eightwothree
 * abcone2threexyz
 * xtwone3four
 * 4nineeightseven2
 * zoneight234
 * 7pqrstsixteen
 * ```
 * In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
 */

const inputPath = join(__dirname, 'input.txt');
const inputData = parseInput(inputPath) as Array<string>;

const digitNumeralsDictionary: Record<string, string> = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

const digitNumerals = Object.keys(digitNumeralsDictionary);
const digits = Object.values(digitNumeralsDictionary);

function findFirstDigitRecursive(input: string, index: number, direction: 'forwards' | 'reverse' = 'forwards'): string {
	const currentCharacter = input[index];

	if (digits.includes(currentCharacter)) {
		// If it's a digit, return as result
		return currentCharacter;
	}

	const inputSubstring = input.substring(index, input.length);
	const numeral = digitNumerals.find((numeral) => inputSubstring.indexOf(numeral) === 0);

	if (numeral) {
		// If a numeral is starting at the index, transform to digit and return as result
		return digitNumeralsDictionary[numeral];
	}

	const nextIndex = direction === 'forwards' ? index + 1 : index - 1;

	// We continue searching reccursively; We always check each character, because numerals can sometimes share a character
	return findFirstDigitRecursive(input, nextIndex, direction);
}

export function solve(): number {
	const addends = inputData.map((input) => {
		const firstDigit = findFirstDigitRecursive(input, 0);
		const lastDigit = findFirstDigitRecursive(input, input.length - 1, 'reverse');

		return Number(`${firstDigit}${lastDigit}`);
	});

	return sum(addends);
}
