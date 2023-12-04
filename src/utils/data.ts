import { readFileSync } from 'fs';

export type InputType = string | Array<string>;

interface IParseOptions {
	split?: boolean;
}

// TODO: expand parseInput and make it generic with different options
export function parseInput(filePath: string, options: IParseOptions = {}): InputType {
	const { split = true } = options;

	const rawInput = readFileSync(filePath, 'utf-8')?.trim();

	return split ? rawInput.split('\n') : rawInput;
}

export const readSolution = (solution: number | string, day: number, part: number) =>
	console.log(`Solution for day ${day}, part ${part}: ${solution}`);
