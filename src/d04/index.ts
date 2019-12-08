import {
  checkNonDecreasingDigits,
  checkAdjacentDigits,
  checkDoubleDigits
} from './algo';

const START = 254032;
const END = 789860;

let res1 = 0;

for (let i = START; i <= END; i++) {
  if (!checkNonDecreasingDigits(i)) continue;
  if (!checkAdjacentDigits(i)) continue;

  res1 += 1;
}

console.log('Part 1');
console.log(res1);

let res2 = 0;

for (let i = START; i <= END; i++) {
  if (!checkNonDecreasingDigits(i)) continue;
  if (!checkDoubleDigits(i)) continue;

  res2 += 1;
}

console.log('Part 2');
console.log(res2);
