
import * as tsNode from 'ts-node';
import { join } from 'path';
import { readSolution, parseInput } from '../src/utils';

// Ensure ts-node is registered to compile TypeScript on the fly
tsNode.register();

// Find the specified day and part paths
// TODO: add error handling
const dayNumber = process?.argv.find(arg => arg.startsWith('day='))?.split('=')[1];
const partNumber = process?.argv.find(arg => arg.startsWith('part='))?.split('=')[1];

const scriptPath = join(__dirname, `day-${dayNumber}/part-${partNumber}.ts`);

// Import the solve function from a specific part
const { solve } = require(scriptPath);

// Run the specified part and log the solution
const solution = solve();
readSolution(solution, Number(dayNumber), Number(partNumber));
