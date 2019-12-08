function convertNumToNumArray(num: number): number[] {
  return num
    .toString(10)
    .split('')
    .map(Number);
}

export function checkAdjacentDigits(num: number): boolean {
  const nums = convertNumToNumArray(num);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i - 1] && nums[i - 1] === nums[i]) {
      return true;
    }
  }

  return false;
}

export function checkDoubleDigits(num: number): boolean {
  const nums = convertNumToNumArray(num);

  const groups: number[] = [];

  let currentGroup = 1;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i - 1]) {
      if (nums[i - 1] === nums[i]) {
        currentGroup += 1;
      } else {
        groups.push(currentGroup);
        currentGroup = 1;
      }
    }
  }

  groups.push(currentGroup);

  return groups.includes(2);
}

export function checkNonDecreasingDigits(num: number): boolean {
  const nums = convertNumToNumArray(num);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i - 1] && nums[i - 1] > nums[i]) {
      return false;
    }
  }

  return true;
}
