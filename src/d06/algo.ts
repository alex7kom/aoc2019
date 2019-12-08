interface OrbitMap {
  [key: string]: string;
}

export function remapOrbits(map: string[]): OrbitMap {
  const newMap = {};

  for (let i = 0; i < map.length; i++) {
    const [a, b] = map[i].split(')');

    newMap[b] = a;
  }

  return newMap;
}

export function mapObjectSequence(
  startingObject: string,
  map: OrbitMap
): string[] {
  const seq = [];

  let currentObject = startingObject;

  while (map[currentObject]) {
    seq.push(currentObject);
    currentObject = map[currentObject];
  }

  seq.push(currentObject);

  return seq;
}

export function countOrbits(map: OrbitMap): number {
  const objects = Object.keys(map);

  let totalCount = 0;
  for (let i = 0; i < objects.length; i++) {
    const currentObject = objects[i];
    totalCount += mapObjectSequence(currentObject, map).length - 1;
  }

  return totalCount;
}

export function countOrbitsBetweenObjects(
  map: OrbitMap,
  objectA: string,
  objectB: string
): number {
  const pathA = mapObjectSequence(objectA, map);
  const pathB = mapObjectSequence(objectB, map);

  for (let i = 0; i < pathA.length; i++) {
    const currentObject = pathA[i];
    if (pathB.includes(currentObject)) {
      return i + pathB.indexOf(currentObject) - 2;
    }
  }

  return -1;
}
