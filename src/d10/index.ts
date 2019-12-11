import { readFileSync } from 'fs';
import { join } from 'path';
import { findBestAsteroid, findDestroyedAsteroids } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim();

console.log('Part 1');
const [coords, num] = findBestAsteroid(input);
console.log(coords, num);

console.log('Part 2');
const [x, y] = findDestroyedAsteroids(input, coords)[199];
console.log(x, y, x * 100 + y);
