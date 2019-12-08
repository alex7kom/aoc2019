import { readFileSync } from 'fs';
import { calculateFuel, calculateFullFuel } from './algo';
import { join } from 'path';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(Number)
  .filter(Boolean);

console.log('Part 1');
const result = input.map(calculateFuel).reduce((prev, item) => prev + item, 0);
console.log(result);

console.log('Part 2');
const result2 = input
  .map(calculateFullFuel)
  .reduce((prev, item) => prev + item, 0);
console.log(result2);
