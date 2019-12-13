import { ComputedValue } from '../d09/algo';
import { wait } from '../util';

interface ScreenData {
  [key: string]: number;
}

export function drawScreen(
  drawer: Generator<ComputedValue, ComputedValue, number>
): ScreenData {
  const screenData: ScreenData = {};

  let buf = [];

  for (const value of drawer) {
    if (buf.length === 2) {
      const [x, y] = buf;
      screenData[JSON.stringify({ x, y })] = value.output;
      buf = [];
    } else {
      buf.push(value.output);
    }
  }

  return screenData;
}

export function countBlocks(screen: ScreenData): number {
  return Object.values(screen).filter(x => x === 2).length;
}

export function renderImage(
  screen: ScreenData,
  maxX: number,
  maxY: number
): string {
  const objects = [' ', '|', '#', 'T', '@'];

  const canvas: string[][] = [];

  for (let i = 0; i < maxY + 1; i++) {
    const row = [];

    for (let z = 0; z < maxX; z++) {
      row.push(' ');
    }

    canvas.push(row);
  }

  Object.keys(screen).forEach(panel => {
    if (!screen[panel]) return;

    const { x, y } = JSON.parse(panel);

    if (x === -1) {
      screen[panel]
        .toString()
        .split('')
        .forEach((v, i) => {
          canvas[maxY][i] = v;
        });

      return;
    }

    canvas[y][x] = objects[screen[panel]];
  });

  return canvas.map(x => x.join('')).join('\n');
}

// eslint-disable-next-line max-statements
export function play(
  game: Generator<ComputedValue, ComputedValue, number>,
  withImage = false
): void {
  const screenData: ScreenData = {};
  let maxX = 0;
  let maxY = 0;

  let buf = [];

  let nextInput = 0;
  let ballPosition = 0;
  let paddlePosition = 0;
  let score = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = game.next(nextInput);

    if (res.done) break;

    const value = res.value;

    if (value.output == null) {
      if (withImage) {
        console.clear();
        console.log(renderImage(screenData, maxX, maxY));
        wait(40);
      }
      if (ballPosition - paddlePosition > 0) {
        nextInput = 1;
      } else if (ballPosition - paddlePosition < 0) {
        nextInput = -1;
      } else {
        nextInput = 0;
      }
      continue;
    }

    if (buf.length === 2) {
      const [x, y] = buf;
      const coords = JSON.stringify({ x, y });
      screenData[coords] = value.output;
      if (value.output === 4) {
        ballPosition = x;
      } else if (value.output === 3) {
        paddlePosition = x;
      }
      if (x === -1) {
        score = value.output;
      }
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      buf = [];
    } else {
      buf.push(value.output);
    }
  }

  if (withImage) {
    console.clear();
    console.log(renderImage(screenData, maxX, maxY));
    console.log('GAME OVER');
  } else {
    console.log(score);
  }
}
