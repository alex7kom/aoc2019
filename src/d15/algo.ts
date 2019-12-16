import { ComputedValue } from '../d09/algo';

interface Canvas {
  [key: string]: number;
}

interface Image {
  canvas: Canvas;
  meta: {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
  };
}

export function renderImage(image: Image): string {
  const canvas: string[][] = [];

  for (let i = 0; i < image.meta.height; i++) {
    const row = [];

    for (let z = 0; z < image.meta.width; z++) {
      row.push(' ');
    }

    canvas.push(row);
  }

  Object.keys(image.canvas).forEach(panel => {
    const chars = ['#', '.', 'D', 'S'];

    const { x, y } = JSON.parse(panel);

    canvas[y - image.meta.offsetY][x - image.meta.offsetX] =
      chars[image.canvas[panel]];
  });

  return canvas.map(x => x.join('')).join('\n');
}

// eslint-disable-next-line max-statements
export function drawArea(
  robot: Generator<ComputedValue, ComputedValue, number>
): Image {
  const canvas: Canvas = {};
  const checkingCoords = { x: 0, y: 0 };
  const droidCoords = { x: 0, y: 0 };
  const directionCommand = [1, 4, 2, 3];
  const directionCoords = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];
  let nextDirection = 0;

  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  function write(coords: { x: number; y: number }, value: number): void {
    canvas[JSON.stringify(coords)] = value;
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const status = robot.next();
    if (status.done) {
      break;
    }

    checkingCoords.x = droidCoords.x + directionCoords[nextDirection][0];
    checkingCoords.y = droidCoords.y + directionCoords[nextDirection][1];

    if (checkingCoords.x === 0 && checkingCoords.y === 0) {
      break;
    }

    minX = Math.min(minX, checkingCoords.x);
    minY = Math.min(minY, checkingCoords.y);
    maxX = Math.max(maxX, checkingCoords.x);
    maxY = Math.max(maxY, checkingCoords.y);

    const res = robot.next(directionCommand[nextDirection]).value.output;

    if (res === 1 || res === 2) {
      write(checkingCoords, res);
      droidCoords.x = checkingCoords.x;
      droidCoords.y = checkingCoords.y;
      nextDirection = (nextDirection + 3) % 4;
    } else if (res === 0) {
      write(checkingCoords, 0);
      nextDirection = (nextDirection + 1) % 4;
    }
  }

  write({ x: 0, y: 0 }, 3);

  return {
    canvas,
    meta: {
      width: maxX + Math.abs(minX) + 1,
      height: maxY + Math.abs(minY) + 1,
      offsetX: minX,
      offsetY: minY
    }
  };
}

export function searchShortestPath(
  map: Image,
  startingPoint = '{"x":0,"y":0}'
): number {
  const canvas = map.canvas;

  let i = 1;

  const visited = {};

  let visitQueue: string[] = [startingPoint];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const newQueue: string[] = [];
    let item;
    while ((item = visitQueue.pop())) {
      const { x, y } = JSON.parse(item);

      for (const [a, b] of [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0]
      ]) {
        const checkingCoords = JSON.stringify({ x: x + a, y: y + b });

        if (visited[checkingCoords]) {
          continue;
        }

        if (canvas[checkingCoords] === 2) {
          return i;
        }

        if (canvas[checkingCoords] === 1) {
          newQueue.push(checkingCoords);
        }
      }

      visited[item] = true;
    }

    visitQueue = newQueue;
    i += 1;
  }
}

export function searchRemotestPoint(map: Image): number {
  let res = 0;

  const points = Object.keys(map.canvas);

  for (const point of points) {
    if (map.canvas[point] === 1) {
      res = Math.max(res, searchShortestPath(map, point));
    }
  }

  return res;
}
