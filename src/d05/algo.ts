export function parseOpCode(
  opCode: number
): { op: number; mode1: number; mode2: number; mode3: number } {
  const op = opCode % 100;
  const mode1 = ((opCode - op) % 1000) / 100;
  const mode2 = ((opCode - mode1 * 100 - op) % 10000) / 1000;
  const mode3 = ((opCode - mode2 * 1000 - mode1 * 100 - op) % 100000) / 10000;

  return { op, mode1, mode2, mode3 };
}

export function compute(
  instructions: number[],
  input = () => 0,
  output = out => console.log(out)
): number[] {
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
        workingSet[argPos1] = input();
        currentPos += 2;
        break;

      case 4:
        output(arg1);
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
        return workingSet;

      default:
        throw new Error(`Unknown opcode ${opCode}`);
    }
  }

  return workingSet;
}
