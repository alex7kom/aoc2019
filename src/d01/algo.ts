export function calculateFuel(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function calculateFullFuel(mass: number): number {
  const fuel = calculateFuel(mass);

  if (fuel > 0) {
    return fuel + calculateFullFuel(fuel);
  }

  return 0;
}
