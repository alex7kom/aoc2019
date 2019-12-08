import { readFileSync } from 'fs';
import { join } from 'path';
import { findNearestCrossingDistance, findNearestCrossingSteps } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(wire => wire.split(','));

console.log('Part 1');
console.log(findNearestCrossingDistance(input[0], input[1]));

console.log('Part 2');
console.log(findNearestCrossingSteps(input[0], input[1]));
