export function compute(instructions: number[]): number[] {
  const workingSet = instructions.slice();

  let currentPos = 0;

  while (workingSet[currentPos] != null) {
    const opCode = workingSet[currentPos];
    const argPos1 = workingSet[currentPos + 1];
    const argPos2 = workingSet[currentPos + 2];
    const resPos = workingSet[currentPos + 3];

    switch (opCode) {
      case 1:
        workingSet[resPos] = workingSet[argPos1] + workingSet[argPos2];
        break;

      case 2:
        workingSet[resPos] = workingSet[argPos1] * workingSet[argPos2];
        break;

      case 99:
        return workingSet;

      default:
        break;
    }

    currentPos += 4;
  }

  return workingSet;
}
