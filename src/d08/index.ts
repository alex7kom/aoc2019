import { readFileSync } from 'fs';
import { join } from 'path';
import {
  splitLayers,
  calculateChecksum,
  decodePixels,
  renderImage
} from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .trim()
  .split('')
  .map(Number);

const WIDTH = 25;
const HEIGHT = 6;

const layers = splitLayers(input, WIDTH, HEIGHT);

console.log('Part 1');
console.log(calculateChecksum(layers));

console.log('Part 2');
console.log(renderImage(decodePixels(layers), WIDTH));
