import {
  checkAdjacentDigits,
  checkNonDecreasingDigits,
  checkDoubleDigits
} from './algo';

test.each([
  [111111, true],
  [123456, false]
])('checkAdjacentDigits(%s)', (num: number, res) => {
  expect(checkAdjacentDigits(num)).toBe(res);
});

test.each([
  [112233, true],
  [111122, true],
  [123444, false]
])('checkDoubleDigits(%s)', (num: number, res) => {
  expect(checkDoubleDigits(num)).toBe(res);
});

test.each([
  [111111, true],
  [123456, true],
  [123450, false]
])('checkNonDecreasingDigits(%s)', (num: number, res) => {
  expect(checkNonDecreasingDigits(num)).toBe(res);
});
