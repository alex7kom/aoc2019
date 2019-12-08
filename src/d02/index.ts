import { readFileSync } from 'fs';
import { join } from 'path';
import { compute } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(Boolean)
  .map(Number);

function runProgram(inputSet: number[], noun: number, verb: number): number {
  const newSet = inputSet.slice();

  newSet[1] = noun;
  newSet[2] = verb;

  return compute(newSet)[0];
}

console.log('Part 1');
console.log(runProgram(input, 12, 2));

(function() {
  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      if (runProgram(input, x, y) === 19690720) {
        console.log('Part 2');
        console.log(x, y, 100 * x + y);

        return;
      }
    }
  }
})();
