export function convertVector(vector: string): [string, number] {
  return [vector[0], parseInt(vector.slice(1), 10)];
}

export function constructWirePath(wire: string[]): [number, number][] {
  const convWire = wire.map(convertVector);

  const wirePoints: [number, number][] = [];

  let currentX = 0;
  let currentY = 0;

  for (let i = 0; i < convWire.length; i++) {
    const [direction, value] = convWire[i];

    for (let steps = 1; steps <= value; steps++) {
      switch (direction) {
        case 'R':
          currentX += 1;
          break;

        case 'L':
          currentX -= 1;
          break;

        case 'U':
          currentY += 1;
          break;

        case 'D':
          currentY -= 1;
          break;

        default:
          break;
      }

      wirePoints.push([currentX, currentY]);
    }
  }

  return wirePoints;
}

export function findNearestCrossingDistance(
  wireA: string[],
  wireB: string[]
): number {
  const wireAPath = constructWirePath(wireA);
  const wireBPath = constructWirePath(wireB);

  const crossings = [];

  for (let a = 0; a < wireAPath.length; a++) {
    const pointA = wireAPath[a];

    for (let b = 0; b < wireBPath.length; b++) {
      const pointB = wireBPath[b];

      if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) {
        crossings.push(pointA);
        break;
      }
    }
  }

  const sortedDistances = crossings
    .map(point => Math.abs(point[0]) + Math.abs(point[1]))
    .sort((a, b) => a - b);

  return sortedDistances[0];
}

export function findNearestCrossingSteps(
  wireA: string[],
  wireB: string[]
): number {
  const wireAPath = constructWirePath(wireA);
  const wireBPath = constructWirePath(wireB);

  const stepsSums = [];

  for (let a = 0; a < wireAPath.length; a++) {
    const pointA = wireAPath[a];

    for (let b = 0; b < wireBPath.length; b++) {
      const pointB = wireBPath[b];

      if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) {
        stepsSums.push(a + b + 2);
        break;
      }
    }
  }

  const sortedSteps = stepsSums.sort((a, b) => a - b);

  return sortedSteps[0];
}
