import {
  remapOrbits,
  countOrbits,
  countOrbitsBetweenObjects,
  mapObjectSequence
} from './algo';

test('remap orbits', () => {
  expect(
    remapOrbits([
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L'
    ])
  ).toEqual({
    L: 'K',
    K: 'J',
    J: 'E',
    F: 'E',
    E: 'D',
    I: 'D',
    D: 'C',
    C: 'B',
    H: 'G',
    G: 'B',
    B: 'COM'
  });
});

test.each([
  ['D', ['D', 'C', 'B', 'COM']],
  ['L', ['L', 'K', 'J', 'E', 'D', 'C', 'B', 'COM']],
  ['COM', ['COM']]
])('map object sequence', (startingObject: string, sequence) => {
  expect(
    mapObjectSequence(
      startingObject,
      remapOrbits([
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L'
      ])
    )
  ).toStrictEqual(sequence);
});

test('count orbits', () => {
  expect(
    countOrbits({
      L: 'K',
      K: 'J',
      J: 'E',
      F: 'E',
      E: 'D',
      I: 'D',
      D: 'C',
      C: 'B',
      H: 'G',
      G: 'B',
      B: 'COM'
    })
  ).toBe(42);
});

test('count orbits between objects', () => {
  expect(
    countOrbitsBetweenObjects(
      remapOrbits([
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN'
      ]),
      'YOU',
      'SAN'
    )
  ).toBe(4);
});
