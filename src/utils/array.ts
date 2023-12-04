export const sum = (numbers: Array<number>): number =>
	numbers?.length ? numbers?.reduce((sum, currentNumber) => (sum += currentNumber), 0) : null;

export const power = (numbers: Array<number>) => numbers.reduce((power, currentNumber) => (power *= currentNumber), 1);
