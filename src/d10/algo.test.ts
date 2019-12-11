import {
  parseMap,
  getCoordinates,
  findBestAsteroid,
  Coordinates,
  isBSeenFromA,
  getIndex,
  renderMap,
  findDestroyedAsteroids
} from './algo';

const testMap = '.#..#\n.....\n#####\n....#\n...##';

test('parse map', () => {
  expect(parseMap(testMap)).toStrictEqual([
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    5
  ]);
});

test('render map', () => {
  const [map, width] = parseMap(testMap);
  expect(renderMap(map, width)).toBe(testMap);
});

test.each([
  [1, 5, [1, 0]],
  [4, 5, [4, 0]],
  [10, 5, [0, 2]]
])(
  'get coordinates and vice versa',
  (index: number, width: number, coords: Coordinates) => {
    expect(getCoordinates(index, width)).toStrictEqual(coords);
    expect(getIndex(coords, width)).toBe(index);
  }
);

test.each([
  [[1, 0], [4, 3], false],
  [[1, 0], [3, 2], true],
  [[3, 4], [1, 0], false],
  [[3, 4], [2, 2], true],
  [[3, 4], [0, 2], true],
  [[0, 2], [4, 2], false],
  [[0, 2], [1, 2], true],
  [[4, 0], [4, 4], false],
  [[4, 3], [4, 4], true]
])('check if %s is seen from %s', (x: Coordinates, y: Coordinates, res) => {
  const [map, width] = parseMap(testMap);
  expect(isBSeenFromA(map, width, x, y)).toBe(res);
});

test.each([
  [testMap, 8],
  [
    '......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####',
    33
  ],
  [
    '#.#...#.#.\n.###....#.\n.#....#...\n##.#.#.#.#\n....#.#.#.\n.##..###.#\n..#...##..\n..##....##\n......#...\n.####.###.',
    35
  ],
  [
    '.#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##',
    210
  ]
])('find best asteroid', (map: string, res: number) => {
  expect(findBestAsteroid(map)[1]).toBe(res);
});

test.each([
  [
    '.#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##',
    [11, 13],
    [8, 2]
  ]
])(
  'find destroyed asteroids',
  (map: string, station: Coordinates, res: Coordinates) => {
    expect(findDestroyedAsteroids(map, station)[199]).toStrictEqual(res);
  }
);
