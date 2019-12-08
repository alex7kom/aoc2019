import { readFileSync } from 'fs';
import { join } from 'path';
import { compute } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

console.log('Part 1');
compute(input, () => 1);

console.log('Part 2');
compute(input, () => 5);
