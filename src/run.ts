
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

// Import the solve function from a specific challenge
const { solve } = require(scriptPath);

// Run the specified challenge and log the solution
const solution = solve();
readSolution(solution, Number(dayNumber), Number(challengeNumber));
