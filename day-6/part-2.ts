import { getInputAsArray } from "../helpers/input";

const arr = await getInputAsArray(import.meta.dir + "/input.txt");

const maxTime = Number(arr[0].split(":")[1].match(/\d+/g)!.join(""));
const distanceToBeat = Number(arr[1].split(":")[1].match(/\d+/g)!.join(""));

let waysToWinLocal = 0;

for (let time = 0; time <= maxTime; time++) {
  const distance = (maxTime - time) * time;
  if (distance > distanceToBeat) {
    waysToWinLocal++;
  }
}

console.log(waysToWinLocal);
