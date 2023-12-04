import { readFileSync } from 'fs';

interface IParseOptions {
	split?: boolean;
}

// TODO: expand parseInput and make it generic with different options
export function parseInput(filePath: string): Array<string> {
	const rawInput = readFileSync(filePath, 'utf-8')?.trim();

	return rawInput.split('\n');
}
