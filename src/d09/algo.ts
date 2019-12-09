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
  let currentRelativeBase = 0;

  function getValue(position: number, mode: number): number {
    if (mode === 1) {
      return position;
    }

    let address = position;

    if (mode === 2) {
      address += currentRelativeBase;
    }

    if (workingSet[address] != null) {
      return workingSet[address];
    }

    return 0;
  }

  function getAddress(position: number, mode: number): number {
    if (mode === 2) {
      return position + currentRelativeBase;
    }

    return position;
  }

  while (workingSet[currentPos] != null) {
    const { op: opCode, mode1, mode2, mode3 } = parseOpCode(
      workingSet[currentPos]
    );

    const argPos1 = workingSet[currentPos + 1];
    const argPos2 = workingSet[currentPos + 2];
    const argPos3 = workingSet[currentPos + 3];

    const arg1 = getValue(argPos1, mode1);
    const arg2 = getValue(argPos2, mode2);

    const adr1 = getAddress(argPos1, mode1);
    // const adr2 = getAddress(argPos2, mode2);
    const adr3 = getAddress(argPos3, mode3);

    switch (opCode) {
      case 1:
        workingSet[adr3] = arg1 + arg2;
        currentPos += 4;
        break;

      case 2:
        workingSet[adr3] = arg1 * arg2;
        currentPos += 4;
        break;

      case 3:
        // eslint-disable-next-line require-atomic-updates
        workingSet[adr1] = yield {
          memory: workingSet
        };
        currentPos += 2;
        break;

      case 4:
        yield {
          output: arg1,
          memory: workingSet
        };
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
        workingSet[adr3] = arg1 < arg2 ? 1 : 0;
        currentPos += 4;
        break;

      case 8:
        workingSet[adr3] = arg1 === arg2 ? 1 : 0;
        currentPos += 4;
        break;

      case 9:
        currentRelativeBase += arg1;
        currentPos += 2;
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
