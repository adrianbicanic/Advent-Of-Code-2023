import { join } from 'path';
import { power, sum } from '../utils/array';
import { parseInput } from '../utils/file';

/*
In each game you played, what is the fewest number of cubes of each color
that could have been in the bag to make the game possible?

Again consider the example games from earlier:
---
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
---

 * In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes.
   If any color had even one fewer cube, the game would have been impossible.
 * Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
 * Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
 * Game 4 required at least 14 red, 3 green, and 15 blue cubes.
 * Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.

The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively.
Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
 */

const inputPath = join(__dirname, 'input.txt');
const inputData = parseInput(inputPath) as Array<string>;

export type CubeRevealTuple = [count: number, color: 'red' | 'green' | 'blue'];
export type GameData = [id: number, reveals: Array<CubeRevealTuple>];

export const getGameData = (input: string): GameData => {
	const id = Number(input.split(':')[0].split(' ')[1]);

	const sets = input
		.split(':')[1]
		.trim()
		.split(';')
		.map((set) => set.trim());

	const reveals = sets
		.map((set) => set.split(', '))
		.flat()
		.map((revealRaw) => revealRaw.split(' '))
		.map(([count, color]) => [Number(count), color] as CubeRevealTuple);

	return [id, reveals];
};

const getHighestRevealsByColor = (reveals: Array<CubeRevealTuple>) => {
	return reveals.reduce((highestReveals, currentReveal) => {
		const [currentRevealCount, currentRevealColor] = currentReveal;

		const highestRevealForColor = highestReveals.find(([, color]) => color === currentRevealColor);

		if (!highestRevealForColor) {
			highestReveals.push(currentReveal);
			return highestReveals;
		}

		const highestRevealForColorCount = highestRevealForColor[0];
		const isCurrentCountHighest = currentRevealCount >= highestRevealForColorCount;

		if (isCurrentCountHighest) {
			highestReveals = [...highestReveals].filter(([, color]) => color !== currentRevealColor);
			highestReveals.push(currentReveal);
		}

		return highestReveals;
	}, [] as Array<CubeRevealTuple>);
};

export function solve(): number {
	const highestRevealsByGame = inputData
		.map(getGameData)
		.map(([id, reveals]) => [id, getHighestRevealsByColor(reveals)] as GameData);

	const highestReveals = highestRevealsByGame.map(([_, reveals]) => reveals.flat().filter(Number) as Array<number>);
	const highestRevealsPowers = highestReveals.map(power);

	return sum(highestRevealsPowers);
}
