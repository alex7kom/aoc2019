import { readFileSync } from 'fs';
import { join } from 'path';
import { countOrbits, remapOrbits, countOrbitsBetweenObjects } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .filter(Boolean);

console.log('Part 1');
console.log(countOrbits(remapOrbits(input)));

console.log('Part 2');
console.log(countOrbitsBetweenObjects(remapOrbits(input), 'YOU', 'SAN'));
