import { readFileSync } from 'fs';
import { join } from 'path';
import { compute } from '../d09/algo';
import {
  drawArea,
  renderImage,
  searchShortestPath,
  searchRemotestPoint
} from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

const map = drawArea(compute(input));
console.log(renderImage(map));

console.log('Part 1');
console.log(searchShortestPath(map));

console.log('Part 2');
console.log(searchRemotestPoint(map));
