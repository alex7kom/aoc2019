import { readFileSync } from 'fs';
import { join } from 'path';
import { compute } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

console.log('Part 1');

const gen1 = compute(input);
gen1.next();

console.log(gen1.next(1).value.output);
for (const value of gen1) {
  console.log(value.output);
}

console.log('Part 2');

const gen2 = compute(input);
gen2.next();

console.log(gen2.next(2).value.output);
