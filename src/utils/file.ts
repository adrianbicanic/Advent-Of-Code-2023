import { readFileSync } from 'fs';

export type InputType = string | Array<string>;

interface IParseOptions {
	split?: boolean;
}

// TODO: expand parseInput and make it generic with different options
export function parseInput(filePath: string): InputType {
	const rawInput = readFileSync(filePath, 'utf-8')?.trim();

	return rawInput.split('\n');
}
