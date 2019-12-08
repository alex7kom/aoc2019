import {
  splitLayers,
  calculateZeros,
  getLayerWithFewestZeros,
  calculateLayerChecksum,
  decodePixels,
  renderImage,
  calculateChecksum
} from './algo';

test('split layers', () => {
  expect(splitLayers([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2], 3, 2)).toStrictEqual(
    [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ]
  );
});

test.each([
  [[1, 2, 3, 4, 5, 6], 0],
  [[7, 8, 9, 0, 1, 2], 1],
  [[0, 0, 0, 0, 0, 0], 6]
])('calculate zeros', (input: number[], res: number) => {
  expect(calculateZeros(input)).toBe(res);
});

test.each([
  [
    [
      [0, 4],
      [1, 2],
      [0, 0]
    ],
    [1, 2]
  ],
  [
    [
      [7, 8],
      [9, 0],
      [1, 2]
    ],
    [7, 8]
  ],
  [
    [
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [0, 0]
  ]
])('get layer with fewest zeros', (input: number[][], res: number[]) => {
  expect(getLayerWithFewestZeros(input)).toStrictEqual(res);
});

test.each([
  [[1, 2, 3, 4, 5, 6, 2], 2],
  [[1, 2, 3, 1, 5, 6, 2], 4],
  [[7, 8, 9, 0, 1, 2, 3], 1],
  [[0, 0, 0, 0, 0, 0, 1], 0]
])('calculate layer checksum', (input: number[], res: number) => {
  expect(calculateLayerChecksum(input)).toBe(res);
});

test('calculate checksum', () => {
  expect(
    calculateChecksum([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 0, 1, 2]
    ])
  ).toBe(1);
});

test('decode pixels', () => {
  expect(
    decodePixels([
      [0, 2, 2, 2],
      [1, 1, 2, 2],
      [2, 2, 1, 2],
      [0, 0, 0, 0]
    ])
  ).toStrictEqual([0, 1, 1, 0]);
});

test('render image', () => {
  expect(renderImage([0, 1, 1, 0], 2)).toStrictEqual(' 1\n1 ');
});
