import { paintImage, renderImage } from './algo';
import { ComputedValue } from '../d09/algo';

test('paint', () => {
  expect.assertions(8);
  expect(
    paintImage(
      (function* mockPainter(): Generator<
        ComputedValue,
        ComputedValue,
        number
      > {
        expect(yield).toBe(0);
        yield { output: 1, memory: [] }; // white
        yield { output: 0, memory: [] }; // left
        expect(yield).toBe(0);
        yield { output: 0, memory: [] }; // black
        yield { output: 0, memory: [] };
        expect(yield).toBe(0);
        yield { output: 1, memory: [] };
        yield { output: 0, memory: [] };
        expect(yield).toBe(0);
        yield { output: 1, memory: [] };
        yield { output: 0, memory: [] };
        expect(yield).toBe(1);
        yield { output: 0, memory: [] };
        yield { output: 1, memory: [] }; // right
        expect(yield).toBe(0);
        yield { output: 1, memory: [] };
        yield { output: 0, memory: [] };
        expect(yield).toBe(0);
        yield { output: 1, memory: [] };
        yield { output: 0, memory: [] };

        return { memory: [] };
      })(),
      0
    )
  ).toStrictEqual({
    canvas: {
      '{"x":0,"y":0}': 0,
      '{"x":-1,"y":0}': 0,
      '{"x":-1,"y":1}': 1,
      '{"x":0,"y":1}': 1,
      '{"x":1,"y":0}': 1,
      '{"x":1,"y":-1}': 1
    },
    meta: {
      paintedPanels: 6,
      offsetX: -1,
      offsetY: -1,
      width: 3,
      height: 3
    }
  });
});

test('render image', () => {
  expect(
    renderImage({
      canvas: {
        '{"x":0,"y":0}': 0,
        '{"x":-1,"y":0}': 0,
        '{"x":-1,"y":1}': 1,
        '{"x":0,"y":1}': 1,
        '{"x":1,"y":0}': 1,
        '{"x":1,"y":-1}': 1
      },
      meta: {
        paintedPanels: 6,
        offsetX: -1,
        offsetY: -1,
        width: 3,
        height: 3
      }
    })
  ).toBe('..#\n..#\n##.');
});
