import { readFileSync } from 'fs';
import { join } from 'path';
import { compute } from '../d09/algo';
import { countBlocks, drawScreen, play } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

console.log('Part 1');
console.log(countBlocks(drawScreen(compute(input))));

console.log('Part 2');
const game = input.slice(0);
game[0] = 2;
play(compute(game), true);
