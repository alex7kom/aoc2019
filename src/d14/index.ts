import { readFileSync } from 'fs';
import { join } from 'path';
import { calculateOre } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

console.log('Part 1');
console.log(calculateOre(input));

console.log('Part 2');

let min = 0;
let max = 1000000000000;
while (min <= max) {
  const mid = Math.floor((max + min) / 2);
  const res = calculateOre(input, mid);

  if (res >= 1000000000000) {
    max = mid - 1;
  } else {
    min = mid + 1;
  }
}

console.log(max);
