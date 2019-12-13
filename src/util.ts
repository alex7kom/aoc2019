export function leastCommonMultiple(values: number[]): number {
  const n = values.length;
  let a = Math.abs(values[0]);
  for (let i = 1; i < n; i++) {
    let b = Math.abs(values[i]);
    const c = a;
    while (a && b) {
      if (a > b) {
        a %= b;
      } else {
        b %= a;
      }
    }
    a = Math.abs(c * values[i]) / (a + b);
  }

  return a;
}

export function wait(ms: number): void {
  const finish = Date.now() + ms;
  while (finish > Date.now()) {
    Function.prototype();
  }
}
