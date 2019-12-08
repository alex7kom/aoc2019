import { readFileSync } from 'fs';
import { join } from 'path';
import { runAmplifierSequence } from './algo';

const input = readFileSync(join(__dirname, 'input.txt'), 'utf-8')
  .split(',')
  .filter(x => x !== '')
  .map(Number);

// Ported to TS from https://stackoverflow.com/a/37580979
function* permute(sequence: number[]): Generator<number[]> {
  const permutation = sequence.slice();

  const c = Array(permutation.length).fill(0);
  let i = 1;
  let k: number;
  let p: number;

  yield permutation.slice();
  while (i < permutation.length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      c[i] += 1;
      i = 1;
      yield permutation.slice();
    } else {
      c[i] = 0;
      i += 1;
    }
  }
}

console.log('Part 1');

let maxOutput1 = 0;

for (const phases of permute([0, 1, 2, 3, 4])) {
  maxOutput1 = Math.max(maxOutput1, runAmplifierSequence(input, phases));
}

console.log(maxOutput1);

console.log('Part 2');

let maxOutput2 = 0;

for (const phases of permute([5, 6, 7, 8, 9])) {
  maxOutput2 = Math.max(maxOutput2, runAmplifierSequence(input, phases));
}

console.log(maxOutput2);
