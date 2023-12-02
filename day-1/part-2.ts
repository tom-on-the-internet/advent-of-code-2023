import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

const values = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

let sum = 0
for (const el of arr) {
  let firstIndex = Infinity
  let first
  let lastIndex = -1
  let last
  for (const value of Object.keys(values)) {
    let idx = el.indexOf(value)
    if (idx !== -1 && idx < firstIndex) {
      firstIndex = idx
      first = values[value]
    }

    idx = el.lastIndexOf(value)
    if (idx !== -1 && idx > lastIndex) {
      lastIndex = idx
      last = values[value]
    }
  }
  sum += Number(first + last)
}

console.log(sum)
