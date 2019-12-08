import { compute, parseOpCode } from './algo';

test.each([
  [
    [1, 0, 0, 0, 99],
    [2, 0, 0, 0, 99]
  ],
  [
    [2, 3, 0, 3, 99],
    [2, 3, 0, 6, 99]
  ],
  [
    [2, 4, 4, 5, 99, 0],
    [2, 4, 4, 5, 99, 9801]
  ],
  [
    [1, 1, 1, 4, 99, 5, 6, 0, 99],
    [30, 1, 1, 4, 2, 5, 6, 0, 99]
  ],
  [
    [1002, 4, 3, 4, 33],
    [1002, 4, 3, 4, 99]
  ],
  [
    [1101, 100, -1, 4, 0],
    [1101, 100, -1, 4, 99]
  ]
])('Intcode computer is working', (instructions, result) => {
  expect(compute(instructions)).toStrictEqual(result);
});

test.each([[[3, 0, 4, 0, 99]]])(
  'Intcode computer outputs the input',
  instructions => {
    expect.assertions(1);
    compute(
      instructions,
      () => 22,
      out => {
        expect(out).toBe(22);
      }
    );
  }
);

test.each([
  [1, { op: 1, mode1: 0, mode2: 0, mode3: 0 }],
  [1002, { op: 2, mode1: 0, mode2: 1, mode3: 0 }],
  [1102, { op: 2, mode1: 1, mode2: 1, mode3: 0 }],
  [11002, { op: 2, mode1: 0, mode2: 1, mode3: 1 }]
])('Parse opcode %s', (code: number, res) => {
  expect(parseOpCode(code)).toStrictEqual(res);
});

test.each([
  [
    'the input is equal to 8 output 1 else 0',
    [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    8,
    1
  ],
  [
    'the input is less than 8 output 1 else 0',
    [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    8,
    0
  ],
  [
    'the input is equal to 8 output 1 else 0',
    [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    8,
    1
  ],
  [
    'the input is less than 8 output 1 else 0',
    [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    8,
    0
  ],
  [
    'the input was non-zero output 1 else 0',
    [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    0,
    0
  ],
  [
    'the input was non-zero output 1 else 0',
    [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
    999,
    1
  ],
  [
    'output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8',
    [
      3,
      21,
      1008,
      21,
      8,
      20,
      1005,
      20,
      22,
      107,
      8,
      21,
      20,
      1006,
      20,
      31,
      1106,
      0,
      36,
      98,
      0,
      0,
      1002,
      21,
      125,
      20,
      4,
      20,
      1105,
      1,
      46,
      104,
      999,
      1105,
      1,
      46,
      1101,
      1000,
      1,
      20,
      4,
      20,
      1105,
      1,
      46,
      98,
      99
    ],
    8,
    1000
  ]
])('%s', (label, instructions: number[], input: number, res) => {
  expect.assertions(1);
  compute(
    instructions,
    () => input,
    out => {
      expect(out).toBe(res);
    }
  );
});
