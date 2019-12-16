import { ComputedValue } from '../d09/algo';
import { drawArea, renderImage } from './algo';

test('draw area', () => {
  expect.assertions(11);
  expect(
    drawArea(
      (function* mockRobot(): Generator<ComputedValue, ComputedValue, number> {
        const moves = [
          [1, 0],
          [4, 1],
          [1, 0],
          [4, 0],
          [2, 2],
          [4, 0],
          [2, 0],
          [3, 1],
          [2, 0],
          [3, 0]
        ];

        for (const [input, output] of moves) {
          expect(yield).toBe(input);
          yield { output, memory: [] };
        }

        return { memory: [] };
      })()
    )
  ).toEqual({
    canvas: {
      '{"x":0,"y":-1}': 0,
      '{"x":1,"y":0}': 1,
      '{"x":1,"y":-1}': 0,
      '{"x":2,"y":0}': 0,
      '{"x":1,"y":1}': 2,
      '{"x":2,"y":1}': 0,
      '{"x":1,"y":2}': 0,
      '{"x":0,"y":1}': 1,
      '{"x":0,"y":2}': 0,
      '{"x":-1,"y":1}': 0,
      '{"x":0,"y":0}': 3
    },
    meta: {
      offsetX: -1,
      offsetY: -1,
      width: 4,
      height: 4
    }
  });
});

test('render image', () => {
  expect(
    renderImage({
      canvas: {
        '{"x":0,"y":-1}': 0,
        '{"x":1,"y":0}': 1,
        '{"x":1,"y":-1}': 0,
        '{"x":2,"y":0}': 0,
        '{"x":1,"y":1}': 2,
        '{"x":2,"y":1}': 0,
        '{"x":1,"y":2}': 0,
        '{"x":0,"y":1}': 1,
        '{"x":0,"y":2}': 0,
        '{"x":-1,"y":1}': 0,
        '{"x":0,"y":0}': 3
      },
      meta: {
        offsetX: -1,
        offsetY: -1,
        width: 4,
        height: 4
      }
    })
  ).toBe(' ## \n S.#\n#.D#\n ## ');
});
