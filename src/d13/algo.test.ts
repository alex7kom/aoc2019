import { drawScreen, countBlocks } from './algo';
import { ComputedValue } from '../d09/algo';

test('draw screen', () => {
  expect(
    drawScreen(
      (function* mockDrawer(): Generator<ComputedValue, ComputedValue, number> {
        for (const output of [1, 2, 3, 6, 5, 2]) {
          yield { output, memory: [] };
        }

        return { memory: [] };
      })()
    )
  ).toStrictEqual({
    '{"x":1,"y":2}': 3,
    '{"x":6,"y":5}': 2
  });
});

test('count blocks', () => {
  expect(
    countBlocks({
      '{"x":1,"y":2}': 3,
      '{"x":6,"y":5}': 2
    })
  ).toBe(1);
});
