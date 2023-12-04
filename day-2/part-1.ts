import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

function lineToGame(str: string) {
  const gameNumber = Number(str.match(/(\d+):/)[1])
  const greenMatches = str.matchAll(/(\d+) green/g)
  const redMatches = str.matchAll(/(\d+) red/g)
  const blueMatches = str.matchAll(/(\d+) blue/g)
  const greens = []
  const reds = []
  const blues = []

  for (const g of greenMatches) {
    greens.push(Number(g[1]))
  }

  for (const b of blueMatches) {
    blues.push(Number(b[1]))
  }
  for (const r of redMatches) {
    reds.push(Number(r[1]))
  }

  return { gameNumber, reds, blues, greens }
}

function gameValid(game) {
  for (const g of game.greens) {
    if (g > 13) {
      return false
    }
  }
  for (const r of game.reds) {
    if (r > 12) {
      return false
    }
  }
  for (const b of game.blues) {
    if (b > 14) {
      return false
    }
  }
  return true
}

let sum = 0
for (const el of arr) {
  const game = lineToGame(el)

  if (gameValid(game)) {
    sum += game.gameNumber
  }
}

console.log(sum)
