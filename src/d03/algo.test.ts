import {
  findNearestCrossingDistance,
  convertVector,
  constructWirePath,
  findNearestCrossingSteps
} from './algo';

test.each([
  [
    [
      ['R8', 'U5', 'L5', 'D3'],
      ['U7', 'R6', 'D4', 'L4']
    ],
    6
  ],
  [
    [
      ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
    ],
    159
  ],
  [
    [
      [
        'R98',
        'U47',
        'R26',
        'D63',
        'R33',
        'U87',
        'L62',
        'D20',
        'R33',
        'U53',
        'R51'
      ],
      ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7']
    ],
    135
  ]
])('Compute correct distance to nearest crossing', (wires, result) => {
  expect(findNearestCrossingDistance(wires[0], wires[1])).toBe(result);
});

test.each([
  [
    [
      ['R8', 'U5', 'L5', 'D3'],
      ['U7', 'R6', 'D4', 'L4']
    ],
    30
  ],
  [
    [
      ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
    ],
    610
  ],
  [
    [
      [
        'R98',
        'U47',
        'R26',
        'D63',
        'R33',
        'U87',
        'L62',
        'D20',
        'R33',
        'U53',
        'R51'
      ],
      ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7']
    ],
    410
  ]
])('Compute correct distance to nearest crossing', (wires, result) => {
  expect(findNearestCrossingSteps(wires[0], wires[1])).toBe(result);
});

test.each([
  ['U62', ['U', 62]],
  ['R66', ['R', 66]],
  ['U55', ['U', 55]],
  ['R34', ['R', 34]],
  ['D71', ['D', 71]],
  ['R55', ['R', 55]],
  ['D58', ['D', 58]],
  ['R83', ['R', 83]]
])(
  'Convert string vectors to tuple',
  (vector: string, tuple: [string, number]) => {
    expect(convertVector(vector)).toStrictEqual(tuple);
  }
);

test.each([
  [
    ['R8', 'U5', 'L5', 'D3'],
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [8, 1],
      [8, 2],
      [8, 3],
      [8, 4],
      [8, 5],
      [7, 5],
      [6, 5],
      [5, 5],
      [4, 5],
      [3, 5],
      [3, 4],
      [3, 3],
      [3, 2]
    ]
  ],
  [
    ['U7', 'R6', 'D4', 'L4'],
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [6, 6],
      [6, 5],
      [6, 4],
      [6, 3],
      [5, 3],
      [4, 3],
      [3, 3],
      [2, 3]
    ]
  ]
])('Construct wire path', (wire: string[], path: [number, number][]) => {
  expect(constructWirePath(wire)).toStrictEqual(path);
});
