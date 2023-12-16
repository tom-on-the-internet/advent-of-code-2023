import { getInputAsArray } from "../helpers/input";

const arr = await getInputAsArray(import.meta.dir + "/input.txt");

type Hand = {
  cards: string[];
  bid: number;
  value: number;
};

const hands: Hand[] = [];

for (const el of arr) {
  const [cardsString, bid] = el.split(" ");
  const cards = cardsString.split("");

  hands.push({
    cards,
    bid: Number(bid),
    value: getValue(cards),
  });
}

function getValue(cards: string[]): number {
  let counts: { [key: string]: number } = {};

  for (const card of cards) {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  }
  const distinctCount = Object.keys(counts).length;
  const maxCount = Object.keys(counts).reduce(
    (prev, curr) => Math.max(counts[curr], prev),
    0,
  );

  // high card
  if (distinctCount === 5) {
    return 1;
  }

  // pair
  if (distinctCount === 4) {
    return 2;
  }

  // two pair (3 distinct)
  if (distinctCount === 3 && maxCount === 2) {
    return 3;
  }

  // three of a kind (3 distinct)
  if (distinctCount === 3) {
    return 4;
  }

  // full house (2 distinct)
  if (distinctCount === 2 && maxCount === 3) {
    return 5;
  }

  // four of a kind (2 distinct)
  if (distinctCount === 2) {
    return 6;
  }

  // five of a kind
  if (distinctCount === 1) {
    return 7;
  }

  throw "whoops";
}

function getCardValue(card: string): number {
  if (card === "T") {
    return 10;
  }
  if (card === "J") {
    return 11;
  }
  if (card === "Q") {
    return 12;
  }
  if (card === "K") {
    return 13;
  }
  if (card === "A") {
    return 14;
  }
  return Number(card);
}

function sortHands(a: Hand, b: Hand): number {
  if (a.value > b.value) {
    return 1;
  }

  if (a.value === b.value) {
    // iterate through each card
    // first difference, get higher
    for (let idx = 0; idx < a.cards.length; idx++) {
      if (a.cards[idx] !== b.cards[idx]) {
        return getCardValue(a.cards[idx]) > getCardValue(b.cards[idx]) ? 1 : -1;
      }
    }
  }

  return -1;
}

hands.sort(sortHands);

let sum = 0;
let multiplier = 1;

for (const hand of hands) {
  sum += multiplier * hand.bid;
  multiplier++;
}

console.log(sum);
