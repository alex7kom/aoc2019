import { readFileSync } from 'fs';
import { join } from 'path';
import { paintImage, renderImage } from './algo';
import { compute } from '../d09/algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

console.log('Part 1');
console.log(paintImage(compute(input), 0).meta.paintedPanels);

console.log('Part 2');
console.log(renderImage(paintImage(compute(input), 1)));
