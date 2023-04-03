export const randomInt = (min, max) => {
  const p = Math.random();
  return Math.floor(min * (1 - p) + max * p);
};

let lastPicked;

// export const randomPick = (arr) => {
//     let picked = null
//     do {
//         const index = randomInt(0, arr.length)
//         picked = arr[index]
//     } while (picked === lastPicked)
//     lastPicked = picked
//     return picked
// }

export const createRandomPick = (arrParams) => {
  const arr = [...arrParams];
  const randomPick = () => {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]];
    return picked;
  };
  randomPick(); // 放弃第一次选择结果，为了保证随机
  return randomPick;
};
