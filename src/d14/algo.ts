interface Reaction {
  result: number;
  components: [string, number][];
}

export interface ReactionList {
  [key: string]: Reaction;
}

export function parseInput(input: string): ReactionList {
  const reactions = input.split('\n').filter(Boolean);

  const reactionList = {};

  reactions.forEach(item => {
    const [compsStr, res] = item.split(' => ');
    const comps = compsStr.split(',').map(x => x.trim());
    const resChem = res.split(' ');
    const reaction: Reaction = {
      result: Number(resChem[0]),
      components: comps.map(x => {
        const comp = x.split(' ');

        return [comp[1], Number(comp[0])];
      })
    };
    reactionList[resChem[1]] = reaction;
  });

  return reactionList;
}

// eslint-disable-next-line max-statements
export function calculateOre(input: string, fuel = 1): number {
  const reactions = parseInput(input);

  let components: { [key: string]: number } = { FUEL: fuel };
  let next: { [key: string]: number } = {};

  const wasted = {};

  let wasOnlyOre = false;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const isConvertingOre = wasOnlyOre;
    wasOnlyOre = true;

    for (const name of Object.keys(components)) {
      if (name === 'ORE') {
        next[name] = (next[name] || 0) + components[name];

        continue;
      }

      if (!isConvertingOre) {
        if (reactions[name].components.some(x => x[0] === 'ORE')) {
          next[name] = (next[name] || 0) + components[name];

          continue;
        }
      }
      wasOnlyOre = false;

      if (wasted[name] > 0) {
        const newAmount = Math.max(components[name] - wasted[name], 0);
        wasted[name] = wasted[name] - (components[name] - newAmount);
        components[name] = newAmount;
      }

      if (components[name] === 0) {
        continue;
      }

      const amount = Math.ceil(components[name] / reactions[name].result);
      wasted[name] =
        (wasted[name] || 0) +
        amount * reactions[name].result -
        components[name];
      for (const comp of reactions[name].components) {
        next[comp[0]] = (next[comp[0]] || 0) + comp[1] * amount;
      }
    }

    if (Object.keys(next).length === 1 && next.ORE) {
      break;
    }

    components = next;
    next = {};
  }

  return next.ORE;
}
