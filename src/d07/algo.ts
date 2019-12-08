export function parseOpCode(
  opCode: number
): { op: number; mode1: number; mode2: number; mode3: number } {
  const op = opCode % 100;
  const mode1 = ((opCode - op) % 1000) / 100;
  const mode2 = ((opCode - mode1 * 100 - op) % 10000) / 1000;
  const mode3 = ((opCode - mode2 * 1000 - mode1 * 100 - op) % 100000) / 10000;

  return { op, mode1, mode2, mode3 };
}

interface ComputedValue {
  output?: number;
  memory: number[];
}

export function* compute(
  instructions: number[]
): Generator<ComputedValue, ComputedValue, number> {
  const workingSet = instructions.slice();

  let currentPos = 0;

  while (workingSet[currentPos] != null) {
    const { op: opCode, mode1, mode2 /** , mode3 */ } = parseOpCode(
      workingSet[currentPos]
    );

    const argPos1 = workingSet[currentPos + 1];
    const argPos2 = workingSet[currentPos + 2];
    const argPos3 = workingSet[currentPos + 3];

    const arg1 = mode1 ? argPos1 : workingSet[argPos1];
    const arg2 = mode2 ? argPos2 : workingSet[argPos2];
    // const arg3 = mode3 ? argPos3 : workingSet[argPos3];

    switch (opCode) {
      case 1:
        workingSet[argPos3] = arg1 + arg2;
        currentPos += 4;
        break;

      case 2:
        workingSet[argPos3] = arg1 * arg2;
        currentPos += 4;
        break;

      case 3:
        workingSet[argPos1] = yield {
          memory: workingSet
        };
        currentPos += 2;
        break;

      case 4:
        yield {
          output: arg1,
          memory: workingSet
        };
        // output(arg1);
        currentPos += 2;
        break;

      case 5:
        // eslint-disable-next-line no-negated-condition
        if (arg1 !== 0) {
          currentPos = arg2;
        } else {
          currentPos += 3;
        }
        break;

      case 6:
        if (arg1 === 0) {
          currentPos = arg2;
        } else {
          currentPos += 3;
        }
        break;

      case 7:
        workingSet[argPos3] = arg1 < arg2 ? 1 : 0;
        currentPos += 4;
        break;

      case 8:
        workingSet[argPos3] = arg1 === arg2 ? 1 : 0;
        currentPos += 4;
        break;

      case 99:
        return {
          memory: workingSet
        };

      default:
        throw new Error(`Unknown opcode ${opCode}`);
    }
  }

  return {
    memory: workingSet
  };
}

export function* runAmplifier(
  program: number[],
  phase: number
): Generator<number, number, number> {
  const gen = compute(program);
  gen.next();
  gen.next(phase);

  let nextInput = yield;

  while (true) {
    const currentValue = gen.next(nextInput);
    const currentStatus = gen.next();

    if (currentStatus.done) {
      return currentValue.value.output;
    }

    nextInput = yield currentValue.value.output;
  }
}

export function runAmplifierSequence(
  program: number[],
  phases: number[]
): number {
  const ampA = runAmplifier(program, phases[0]);
  const ampB = runAmplifier(program, phases[1]);
  const ampC = runAmplifier(program, phases[2]);
  const ampD = runAmplifier(program, phases[3]);
  const ampE = runAmplifier(program, phases[4]);

  ampA.next();
  ampB.next();
  ampC.next();
  ampD.next();
  ampE.next();

  let startValue = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const resA = ampA.next(startValue);
    const resB = ampB.next(resA.value);
    const resC = ampC.next(resB.value);
    const resD = ampD.next(resC.value);
    const resE = ampE.next(resD.value);

    if (resE.done) {
      return resE.value;
    }

    startValue = resE.value;
  }
}
