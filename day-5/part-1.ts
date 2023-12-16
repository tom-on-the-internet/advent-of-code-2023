import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

const seeds = arr[0].split(":")[1].match(/\d+/g)?.map(Number) as number[]

const mapGroups = []
const group = []
let idx = 2
while (idx < arr.length) {
  if (arr[idx] === "") {
    mapGroups.push([...group])
    group.length = 0
    idx += 2
  }
  const numbers = arr[idx].split(" ").map(Number)
  group.push(numbers)
  idx++
}

// last one
mapGroups.push([...group])

function convert(value: number, mapGroup: number[][]): number {
  for (const group of mapGroup) {
    const difference = value - group[1]
    if (difference > 0 && difference < group[2]) {
      return group[0] + difference
    }
  }

  return value
}

const values = []
for (const seed of seeds) {
  let value = seed
  for (const mapGroup of mapGroups) {
    value = convert(value, mapGroup)
  }
  values.push(value)
}

values.sort((a, b) => a - b)
console.log(values[0])
