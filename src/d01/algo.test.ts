import { calculateFuel, calculateFullFuel } from './algo';

test.each([
  [12, 2],
  [14, 2],
  [1969, 654],
  [100756, 33583]
])('calculateFuel(%i)', (a, b) => {
  expect(calculateFuel(a)).toBe(b);
});

test.each([
  [14, 2],
  [1969, 966],
  [100756, 50346]
])('calculateFullFuel(%i)', (a, b) => {
  expect(calculateFullFuel(a)).toBe(b);
});
