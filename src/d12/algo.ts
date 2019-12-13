import { combination } from 'js-combinatorics';
import { leastCommonMultiple } from '../util';

interface Value {
  x: number;
  y: number;
  z: number;
}

export function parseInput(input: string): Value[] {
  return input
    .split('\n')
    .filter(Boolean)
    .map(row => {
      const [x, y, z] = row
        .match(/<x=(.+?), y=(.+?), z=(.+?)>/)
        .slice(1, 4)
        .map(Number);

      return { x, y, z };
    });
}

export function applyGravity(
  positions: Value[],
  velocities: Value[],
  coordinates = ['x', 'y', 'z']
): Value[] {
  const gen = combination(Object.keys(positions), 2);
  const vel = JSON.parse(JSON.stringify(velocities));

  let pair;
  while ((pair = gen.next())) {
    const [a, b] = pair;

    coordinates.forEach(i => {
      if (positions[a][i] > positions[b][i]) {
        vel[a][i] -= 1;
        vel[b][i] += 1;
      } else if (positions[a][i] < positions[b][i]) {
        vel[a][i] += 1;
        vel[b][i] -= 1;
      }
    });
  }

  return vel;
}

export function applyVelocity(
  positions: Value[],
  velocities: Value[],
  coordinates = ['x', 'y', 'z']
): Value[] {
  return positions.map((obj, objIndex) => {
    const pos: Value = JSON.parse(JSON.stringify(obj));
    coordinates.forEach(i => {
      pos[i] = obj[i] + velocities[objIndex][i];
    });

    return pos;
  });
}

export function runSimulation(
  positions: Value[],
  velocities: Value[],
  steps: number
): [Value[], Value[]] {
  let pos = JSON.parse(JSON.stringify(positions));
  let vel = JSON.parse(JSON.stringify(velocities));

  for (let i = 0; i < steps; i++) {
    vel = applyGravity(pos, vel);
    pos = applyVelocity(pos, vel);
  }

  return [pos, vel];
}

export function getEnergy(positions: Value[], velocities: Value[]): number {
  const energy = (i: Value): number =>
    Math.abs(i.x) + Math.abs(i.y) + Math.abs(i.z);
  const sum = (prev: number, curr: number): number => prev + curr;

  const potential = positions.map(energy);
  const kinetic = velocities.map(energy);

  return kinetic.map((item, i) => item * potential[i]).reduce(sum, 0);
}

export function getFullCycleCount(
  positions: Value[],
  velocities: Value[]
): number {
  const pos0 = JSON.stringify(positions);
  const vel0 = JSON.stringify(velocities);

  const values = [];

  for (const coordinate of ['x', 'y', 'z']) {
    let i = 0;

    let pos = JSON.parse(pos0);
    let vel = JSON.parse(vel0);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      i += 1;
      vel = applyGravity(pos, vel, [coordinate]);
      pos = applyVelocity(pos, vel, [coordinate]);

      if (JSON.stringify(pos) === pos0 && JSON.stringify(vel) === vel0) {
        values.push(i);
        break;
      }
    }
  }

  return leastCommonMultiple(values);
}
