import { ComputedValue } from '../d09/algo';

interface Canvas {
  [key: string]: number;
}

interface Image {
  canvas: Canvas;
  meta: {
    paintedPanels: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
  };
}

// eslint-disable-next-line max-statements
export function paintImage(
  painter: Generator<ComputedValue, ComputedValue, number>,
  startColor: number
): Image {
  const canvas: Canvas = {};
  const currentCoords = { x: 0, y: 0 };
  let currentDirection: 'up' | 'down' | 'left' | 'right' = 'up';

  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  function write(value: number): void {
    canvas[JSON.stringify(currentCoords)] = value;
  }

  function read(): number {
    return canvas[JSON.stringify(currentCoords)] || 0;
  }

  write(startColor);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const status = painter.next();
    if (status.done) {
      break;
    }

    const color = painter.next(read());
    write(color.value.output);

    const command = painter.next().value.output;

    switch (currentDirection) {
      case 'up':
        if (command) {
          currentCoords.x += 1;
          currentDirection = 'right';
        } else {
          currentCoords.x -= 1;
          currentDirection = 'left';
        }
        break;

      case 'left':
        if (command) {
          currentCoords.y -= 1;
          currentDirection = 'up';
        } else {
          currentCoords.y += 1;
          currentDirection = 'down';
        }
        break;

      case 'right':
        if (command) {
          currentCoords.y += 1;
          currentDirection = 'down';
        } else {
          currentCoords.y -= 1;
          currentDirection = 'up';
        }
        break;

      case 'down':
        if (command) {
          currentCoords.x -= 1;
          currentDirection = 'left';
        } else {
          currentCoords.x += 1;
          currentDirection = 'right';
        }
        break;

      default:
        break;
    }

    minX = Math.min(minX, currentCoords.x);
    minY = Math.min(minY, currentCoords.y);
    maxX = Math.max(maxX, currentCoords.x);
    maxY = Math.max(maxY, currentCoords.y);
  }

  return {
    canvas,
    meta: {
      paintedPanels: Object.keys(canvas).length,
      offsetX: minX,
      offsetY: minY,
      width: maxX + Math.abs(minX) + 1,
      height: maxY + Math.abs(minY) + 1
    }
  };
}

export function renderImage(image: Image): string {
  const canvas: string[][] = [];

  for (let i = 0; i < image.meta.height; i++) {
    const row = [];

    for (let z = 0; z < image.meta.width; z++) {
      row.push('.');
    }

    canvas.push(row);
  }

  Object.keys(image.canvas).forEach(panel => {
    if (!image.canvas[panel]) return;

    const { x, y } = JSON.parse(panel);

    canvas[y - image.meta.offsetY][x - image.meta.offsetX] = '#';
  });

  return canvas.map(x => x.join('')).join('\n');
}
