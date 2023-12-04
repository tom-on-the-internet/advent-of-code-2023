import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")
const symbolRegex = /[^\d\.]/g
const numberRegex = /\d+/g

let sum = 0
for (const [rowIdx, line] of arr.entries()) {
  const matches = line.matchAll(numberRegex)
  for (const match of matches) {
    if (match.index === undefined) {
      continue
    }

    if (match.index > 0 && arr[rowIdx][match.index - 1].match(symbolRegex)) {
      sum += Number(match[0])
      continue
    }

    if (
      match.index < line.length - 1 &&
      arr[rowIdx][match.index + match[0].length]?.match(symbolRegex)
    ) {
      sum += Number(match[0])
      continue
    }

    if (rowIdx > 0) {
      let found = false
      for (let i = match.index - 1; i <= match.index + match[0].length; i++) {
        if (arr[rowIdx - 1][i]?.match(symbolRegex)) {
          sum += Number(match[0])
          found = true
          break
        }
      }

      if (found) {
        continue
      }
    }

    if (rowIdx < arr.length - 1) {
      for (let i = match.index - 1; i <= match.index + match[0].length; i++) {
        if (arr[rowIdx + 1][i]?.match(symbolRegex)) {
          sum += Number(match[0])
          break
        }
      }
    }
  }
}

console.log(sum)
console.log(sum === 512794)
