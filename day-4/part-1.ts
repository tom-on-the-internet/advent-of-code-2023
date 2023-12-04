import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

let sum = 0

for (const el of arr) {
  const winning = new Set(
    el.substring(10, 39).split(" ").filter(Boolean).map(Number)
  )
  const has = new Set(el.substring(42).split(" ").filter(Boolean).map(Number))

  let points = 0
  for (const num of winning) {
    if (has.has(num)) {
      points = points === 0 ? 1 : points * 2
    }
  }

  sum += points
}

console.log(sum)
