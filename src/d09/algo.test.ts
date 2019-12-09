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
  expect(compute(instructions).next().value.memory).toStrictEqual(result);
});

test.each([[[3, 0, 4, 0, 99]]])(
  'Intcode computer outputs the input',
  instructions => {
    const gen = compute(instructions);
    gen.next();
    expect(gen.next(22).value.output).toBe(22);
  }
);

test.each([
  [1, { op: 1, mode1: 0, mode2: 0, mode3: 0 }],
  [1002, { op: 2, mode1: 0, mode2: 1, mode3: 0 }],
  [1102, { op: 2, mode1: 1, mode2: 1, mode3: 0 }],
  [11002, { op: 2, mode1: 0, mode2: 1, mode3: 1 }],
  [2202, { op: 2, mode1: 2, mode2: 2, mode3: 0 }]
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
  const gen = compute(instructions);
  gen.next();
  expect(gen.next(input).value.output).toBe(res);
});

test.each([
  ['relative mode: addition', [9, 1, 22201, -1, -1, -1, 4, 0, 99], 18],
  ['relative mode: multiplication', [9, 1, 22202, -1, -1, -1, 4, 0, 99], 81],
  ['relative mode: comparison', [9, 1, 22207, -1, -2, -1, 4, 0, 99], 0],
  ['relative mode: equality check', [9, 1, 22208, -1, -2, -1, 4, 0, 99], 0],
  ['relative mode: output', [9, 1, 204, -1, 99], 9],
  ['read value from larger address', [4, 999, 99], 0],
  [
    'output the large number in the middle',
    [104, 1125899906842624, 99],
    1125899906842624
  ]
])('%s', (_, instructions: number[], res: number) => {
  const gen = compute(instructions);
  expect(gen.next().value.output).toBe(res);
});

test.each([['relative mode: input', [9, 1, 203, -1, 4, 0, 99], 555, 555]])(
  '%s',
  (_, instructions: number[], input: number, res: number) => {
    const gen = compute(instructions);
    gen.next();
    expect(gen.next(input).value.output).toBe(res);
  }
);

test('output a 16-digit number', () => {
  const gen = compute([1102, 34915192, 34915192, 7, 4, 7, 99, 0]);
  expect(gen.next().value.output.toString().length).toBe(16);
});

test('produce a copy of itself', () => {
  const program = [
    109,
    1,
    204,
    -1,
    1001,
    100,
    1,
    100,
    1008,
    100,
    16,
    101,
    1006,
    101,
    0,
    99
  ];
  const gen = compute(program);

  const output = [];

  for (const out of gen) {
    output.push(out.output);
  }

  expect(output).toStrictEqual(program);
});
