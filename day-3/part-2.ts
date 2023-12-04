import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

const star = /\*/g
const numberRegex = /\d+/g

let sum = 0
for (const [rowIdx, line] of arr.entries()) {
  const matches = line.matchAll(star)
  for (const starMatch of matches) {
    if (starMatch.index === undefined) {
      continue
    }

    const adjacentNumbersForStar = []

    // top
    const topMatches = arr[rowIdx - 1].matchAll(numberRegex)
    for (const numberMatch of topMatches) {
      if (numberMatch.index === undefined) {
        continue
      }

      if (
        (numberMatch.index >= starMatch.index - 1 &&
          numberMatch.index <= starMatch.index + 1) ||
        (numberMatch.index + numberMatch[0].length - 1 >= starMatch.index - 1 &&
          numberMatch.index + numberMatch[0].length - 1 <= starMatch.index + 1)
      ) {
        adjacentNumbersForStar.push(Number(numberMatch))
      }
    }

    // bottom
    const bottomMatches = arr[rowIdx + 1].matchAll(numberRegex)
    for (const numberMatch of bottomMatches) {
      if (numberMatch.index === undefined) {
        continue
      }

      if (
        (numberMatch.index >= starMatch.index - 1 &&
          numberMatch.index <= starMatch.index + 1) ||
        (numberMatch.index + numberMatch[0].length - 1 >= starMatch.index - 1 &&
          numberMatch.index + numberMatch[0].length - 1 <= starMatch.index + 1)
      ) {
        adjacentNumbersForStar.push(Number(numberMatch))
      }
    }

    // left and right
    const matches = arr[rowIdx].matchAll(numberRegex)
    for (const numberMatch of matches) {
      if (numberMatch.index === undefined) {
        continue
      }

      if (
        numberMatch.index == starMatch.index + 1 ||
        numberMatch.index + numberMatch[0].length - 1 == starMatch.index - 1
      ) {
        adjacentNumbersForStar.push(Number(numberMatch))
      }
    }

    if (adjacentNumbersForStar.length == 2) {
      sum += adjacentNumbersForStar[0] * adjacentNumbersForStar[1]
    }
  }
}

console.log(sum)
