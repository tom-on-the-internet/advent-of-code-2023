import { getInputAsArray } from "../helpers/input";

const arr = await getInputAsArray(import.meta.dir + "/input.txt");

const directions = arr[0].split("");

type Node = {
  left: string;
  right: string;
};

let curr = "";

let m = new Map<string, Node>();
for (let idx = 2; idx < arr.length; idx++) {
  const values = arr[idx].match(/\w+/g)!;
  if (idx === 2) {
    curr = values[0];
  }
  m.set(values[0], { left: values[1], right: values[2] });
}

let steps = 0;
let directionIdx = 0;
while (curr !== "ZZZ") {
  steps++;
  const isLeft = directions[directionIdx] === "L";
  directionIdx++;
  if (directionIdx === directions.length) {
    directionIdx = 0;
  }
  if (isLeft) {
    curr = m.get(curr)?.left;
  } else {
    curr = m.get(curr)?.right;
  }
  console.log(curr);
}

console.log(steps);
