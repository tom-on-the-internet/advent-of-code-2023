import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

const WINS_PER_CARD = arr.map((el) => {
  const winning = el.substring(10, 39).split(" ").filter(Boolean).map(Number)
  const has = new Set(el.substring(42).split(" ").filter(Boolean).map(Number))

  return winning.filter((w) => has.has(w)).length
})

let playedCards = 0
const cardCounts = Array(arr.length).fill(1)

for (const [idx, cardCount] of cardCounts.entries()) {
  playedCards += cardCount
  for (let i = 1; i <= WINS_PER_CARD[idx]; i++) {
    cardCounts[idx + i] += cardCounts[idx]
  }
}

console.log(playedCards)
console.log(playedCards === 6874754)
