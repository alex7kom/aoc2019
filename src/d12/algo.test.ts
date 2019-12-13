import {
  parseInput,
  applyGravity,
  applyVelocity,
  runSimulation,
  getEnergy
} from './algo';

test('parse input', () => {
  expect(
    parseInput(
      '<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>'
    )
  ).toStrictEqual([
    { x: -1, y: 0, z: 2 },
    { x: 2, y: -10, z: -7 },
    { x: 4, y: -8, z: 8 },
    { x: 3, y: 5, z: -1 }
  ]);
});

test('apply gravity', () => {
  expect(
    applyGravity(
      [
        { x: -1, y: 0, z: 2 },
        { x: 2, y: -10, z: -7 },
        { x: 4, y: -8, z: 8 },
        { x: 3, y: 5, z: -1 }
      ],
      [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ]
    )
  ).toStrictEqual([
    { x: 3, y: -1, z: -1 },
    { x: 1, y: 3, z: 3 },
    { x: -3, y: 1, z: -3 },
    { x: -1, y: -3, z: 1 }
  ]);
});

test('apply velocity', () => {
  expect(
    applyVelocity(
      [
        { x: -1, y: 0, z: 2 },
        { x: 2, y: -10, z: -7 },
        { x: 4, y: -8, z: 8 },
        { x: 3, y: 5, z: -1 }
      ],
      [
        { x: 3, y: -1, z: -1 },
        { x: 1, y: 3, z: 3 },
        { x: -3, y: 1, z: -3 },
        { x: -1, y: -3, z: 1 }
      ]
    )
  ).toStrictEqual([
    { x: 2, y: -1, z: 1 },
    { x: 3, y: -7, z: -4 },
    { x: 1, y: -7, z: 5 },
    { x: 2, y: 2, z: 0 }
  ]);
});

test('run simulation', () => {
  expect(
    runSimulation(
      [
        { x: -1, y: 0, z: 2 },
        { x: 2, y: -10, z: -7 },
        { x: 4, y: -8, z: 8 },
        { x: 3, y: 5, z: -1 }
      ],
      [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ],
      10
    )
  ).toStrictEqual([
    [
      { x: 2, y: 1, z: -3 },
      { x: 1, y: -8, z: 0 },
      { x: 3, y: -6, z: 1 },
      { x: 2, y: 0, z: 4 }
    ],
    [
      { x: -3, y: -2, z: 1 },
      { x: -1, y: 1, z: 3 },
      { x: 3, y: 2, z: -3 },
      { x: 1, y: -1, z: -1 }
    ]
  ]);
});

test('get energy', () => {
  expect(
    getEnergy(
      [
        { x: 2, y: 1, z: -3 },
        { x: 1, y: -8, z: 0 },
        { x: 3, y: -6, z: 1 },
        { x: 2, y: 0, z: 4 }
      ],
      [
        { x: -3, y: -2, z: 1 },
        { x: -1, y: 1, z: 3 },
        { x: 3, y: 2, z: -3 },
        { x: 1, y: -1, z: -1 }
      ]
    )
  ).toBe(179);
});
