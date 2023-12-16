import { getInputAsArray } from "../helpers/input";

const arr = await getInputAsArray(import.meta.dir + "/input.txt");

const times = arr[0].split(":")[1].match(/\d+/g)!.map(Number);
const distances = arr[1].split(":")[1].match(/\d+/g)!.map(Number);

let waysToWin = [];

for (let idx = 0; idx < times.length; idx++) {
  let waysToWinLocal = 0;
  const maxTime = times[idx];
  const distanceToBeat = distances[idx];
  console.log(maxTime, distanceToBeat);

  for (let time = 0; time <= maxTime; time++) {
    const distance = (maxTime - time) * time;
    if (distance > distanceToBeat) {
      waysToWinLocal++;
    }
  }
  waysToWin.push(waysToWinLocal);
}

console.log(waysToWin);
console.log(waysToWin.reduce((acc, curr) => acc * curr, 1));
