import { readFileSync } from 'fs';
import { join } from 'path';
import {
  getEnergy,
  runSimulation,
  parseInput,
  getFullCycleCount
} from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8');

console.log('Part 1');
console.log(
  getEnergy(
    ...runSimulation(
      parseInput(input),
      [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ],
      1000
    )
  )
);

console.log('Part 2');
console.log(
  getFullCycleCount(parseInput(input), [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 }
  ])
);
