export function generatePattern(
  sequence: number[],
  position: number,
  length: number
): number[] {
  const pattern = [];

  for (const num of sequence) {
    for (let i = 0; i < position + 1; i++) {
      pattern.push(num);
    }
  }

  let res = pattern;

  while (res.length < length + 1) {
    res = res.concat(pattern);
  }

  return res.slice(1, length + 1);
}

export function calculate(
  input: number[],
  phases: number,
  basePattern: number[] = [0, 1, 0, -1]
): number[] {
  let output = input.slice();

  for (let p = 0; p < phases; p++) {
    const newOutput = [];
    for (let i = 0; i < input.length; i++) {
      const pattern = generatePattern(basePattern, i, input.length);
      const res = output
        .map((num, index) => num * pattern[index])
        .reduce((sum, elem) => sum + elem, 0);
      newOutput.push(Math.abs(res) % 10);
    }
    output = newOutput;
  }

  return output;
}

export function calculateNoPattern(input: number[], phases: number): number[] {
  let output = input.slice();

  for (let p = 0; p < phases; p++) {
    const newOutput = [];
    for (let i = 0; i < input.length; i++) {
      const length = i + 1;
      let pos = i + 1;
      let posMultiplier = 1;
      let base = 1;
      let res = 0;

      while (pos < input.length + 1) {
        res +=
          base *
          output
            .slice(pos - 1, pos + length - 1)
            .reduce((sum, elem) => sum + elem, 0);
        posMultiplier += 2;
        pos = (i + 1) * posMultiplier;
        base = base - 2 * base;
      }

      newOutput.push(Math.abs(res) % 10);
    }
    output = newOutput;
  }

  return output;
}

export function calculateHack(input: number[], phases: number): number[] {
  let output = input.slice();

  for (let p = 0; p < phases; p++) {
    const newOutput = [];
    for (let i = input.length - 1; i >= 0; i--) {
      newOutput.push((output[i] + (newOutput[newOutput.length - 1] || 0)) % 10);
    }
    newOutput.reverse();
    output = newOutput;
  }

  return output;
}

export function decodeSignal(input: number[]): number[] {
  const offset = parseInt(input.slice(0, 7).join(''), 10);

  const signal: number[] = [];

  for (let i = 0; i < 10000; i++) {
    signal.push(...input);
  }

  const res = calculateHack(signal.slice(offset), 100);

  return res.slice(0, 8);
}
