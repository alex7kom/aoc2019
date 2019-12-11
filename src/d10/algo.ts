export type Coordinates = [number, number];

export function parseMap(input: string): [number[], number] {
  const width = input.indexOf('\n');

  const map = input
    .split('')
    .filter(x => x !== '\n')
    .map(x => Number(x === '#'));

  return [map, width];
}

export function renderMap(input: number[], width: number): string {
  let map = '';

  for (let i = 0; i < input.length; i++) {
    if (i && i % width === 0) {
      map += '\n';
    }
    map += input[i] ? '#' : '.';
  }

  return map;
}

export function getCoordinates(index: number, width: number): Coordinates {
  const x = index % width;
  const y = Math.floor(index / width);

  return [x, y];
}

export function getIndex(coords: Coordinates, width: number): number {
  return width * coords[1] + coords[0];
}

export function isBSeenFromA(
  map: number[],
  width: number,
  a: Coordinates,
  b: Coordinates
): boolean {
  const relX = Math.abs(b[0] - a[0]);
  const relY = Math.abs(b[1] - a[1]);
  const signX = (b[0] - a[0]) / relX;
  const signY = (b[1] - a[1]) / relY;

  if (a[0] === b[0]) {
    for (let i = 1; i < relY; i++) {
      if (map[getIndex([a[0], a[1] + i * signY], width)]) {
        return false;
      }
    }

    return true;
  }

  if (a[1] === b[1]) {
    for (let i = 1; i < relX; i++) {
      if (map[getIndex([a[0] + i * signX, a[1]], width)]) {
        return false;
      }
    }

    return true;
  }

  const multi = relX / relY;

  for (let i = 1; i < relX; i++) {
    if (i / multi !== Math.floor(i / multi)) {
      continue;
    }

    if (map[getIndex([a[0] + signX * i, a[1] + signY * (i / multi)], width)]) {
      return false;
    }
  }

  return true;
}

export function findBestAsteroid(input: string): [Coordinates, number] {
  const [map, width] = parseMap(input);

  const asteroids: [Coordinates, number][] = [];

  for (let i = 0; i < map.length; i++) {
    const point1 = map[i];

    if (point1 === 0) continue;

    let seenFromHere = 0;

    const coords = getCoordinates(i, width);

    for (let z = 0; z < map.length; z++) {
      const point2 = map[z];

      if (point2 === 0 || z === i) continue;

      if (isBSeenFromA(map, width, coords, getCoordinates(z, width))) {
        seenFromHere += 1;
      }
    }

    asteroids.push([coords, seenFromHere]);
  }

  asteroids.sort((a, b) => b[1] - a[1]);

  return asteroids[0];
}

export function findDestroyedAsteroids(
  input: string,
  station: Coordinates
): Coordinates[] {
  const [map, width] = parseMap(input);

  let asteroids: Coordinates[] = [];

  let hasAsteroids = true;

  let currentRotationMap = map.slice();
  const nextRotationMap = map.slice();

  while (hasAsteroids) {
    hasAsteroids = false;

    const thisRotationAsteroids: Coordinates[] = [];

    for (let z = 0; z < currentRotationMap.length; z++) {
      const point2 = currentRotationMap[z];

      if (point2 === 0 || z === getIndex(station, width)) continue;

      if (
        isBSeenFromA(
          currentRotationMap,
          width,
          station,
          getCoordinates(z, width)
        )
      ) {
        thisRotationAsteroids.push(getCoordinates(z, width));
        nextRotationMap[z] = 0;

        continue;
      }
      hasAsteroids = true;
    }

    currentRotationMap = nextRotationMap.slice();

    const angles: [Coordinates, number][] = thisRotationAsteroids.map(i => {
      const [x, y] = i;

      let angle = (Math.atan2(x - station[0], y - station[1]) * 180) / Math.PI;

      if (angle < 0) {
        angle = 360 + angle;
      }

      return [i, (360 - angle + 180) % 360];
    });

    angles.sort((a, b) => {
      return a[1] - b[1];
    });

    asteroids = asteroids.concat(angles.map(x => x[0]));
  }

  return asteroids;
}
