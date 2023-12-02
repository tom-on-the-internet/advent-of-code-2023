import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

let sum = 0
for (const el of arr) {
  const matches = el.match(/\d/g)
  sum += Number(matches.at(0) + matches.at(-1))
}

console.log(sum)
