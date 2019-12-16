import { readFileSync } from 'fs';
import { join } from 'path';
import { calculate, decodeSignal } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .trim()
  .split('')
  .map(Number);

console.log('Part 1');
console.log(
  calculate(input, 100)
    .slice(0, 8)
    .join('')
);

console.log('Part 2');
console.log(decodeSignal(input).join(''));
