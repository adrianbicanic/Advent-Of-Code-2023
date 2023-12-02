
import * as tsNode from 'ts-node';
import { join } from 'path';
import { readSolution, parseInput } from '../src/utils';

// Ensure ts-node is registered to compile TypeScript on the fly
tsNode.register();

// Find the specified day and challenge paths
// TODO: add error handling
const dayNumber = process?.argv.find(arg => arg.startsWith('day='))?.split('=')[1];
const challengeNumber = process?.argv.find(arg => arg.startsWith('challenge='))?.split('=')[1];

const scriptPath = join(__dirname, `day-${dayNumber}/challenge-${challengeNumber}/index.ts`);
const inputPath =  join(__dirname, `day-${dayNumber}/challenge-${challengeNumber}/input.txt`);

// Import the solve function from a specific challenge
const { solve } = require(scriptPath);

// Parse the input based on the task's requirements
const inputData = parseInput(inputPath);

// Run the specified challenge and log the solution
const solution = solve(inputData);
readSolution(solution, Number(dayNumber), Number(challengeNumber));
