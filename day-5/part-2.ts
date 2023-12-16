import { getInputAsArray } from "../helpers/input"

const arr = await getInputAsArray(import.meta.dir + "/input.txt")

/**
 * SeedGroup is the key to all of this.
 * We care about groups of seeds, not individual seeds.
 */
type SeedGroup = { start: number; len: number }

// make seed groups
const seedRanges = arr[0].split(":")[1].match(/\d+/g)?.map(Number) as number[]
const seedGroups: SeedGroup[] = []
for (let idx = 0; idx < seedRanges.length; idx += 2) {
  seedGroups.push({ start: seedRanges[idx], len: seedRanges[idx + 1] })
}

// make mapGroups
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

function convert(baseSeedGroup: SeedGroup, mapGroup: number[][]): SeedGroup[] {
  let oldSeedGroups: SeedGroup[] = [baseSeedGroup]
  let tempSeedGroups: SeedGroup[] = []
  const newSeedGroups: SeedGroup[] = []

  for (const group of mapGroup) {
    const destStart = group[0]
    const sourceStart = group[1]
    const sourceLen = group[2]
    const lastNumberOfSourceGroup = sourceStart + sourceLen - 1

    for (const seedGroup of oldSeedGroups) {
      // all in
      if (
        seedGroup.start >= sourceStart &&
        seedGroup.start + seedGroup.len - 1 <= lastNumberOfSourceGroup
      ) {
        newSeedGroups.push({
          start: seedGroup.start + (destStart - sourceStart),
          len: seedGroup.len,
        })
        continue
      }

      // overflow
      if (
        seedGroup.start < sourceStart &&
        seedGroup.start + seedGroup.len - 1 > lastNumberOfSourceGroup
      ) {
        newSeedGroups.push({
          start: destStart,
          len: sourceLen,
        })

        // left
        if (seedGroup.start < sourceStart) {
          tempSeedGroups.push({
            start: seedGroup.start,
            len: sourceStart - seedGroup.start,
          })
        }

        // right
        // if (seedGroup.start + seedGroup.len > lastNumberOfSourceGroup) {
        // tempSeedGroups.push({
        //   start: lastNumberOfSourceGroup + 1,
        //   len: seedGroup.start + seedGroup.len - lastNumberOfSourceGroup,
        // })
        // }
        continue
      }

      if (
        seedGroup.start < sourceStart &&
        seedGroup.start + seedGroup.len - 1 >= sourceStart
      ) {
        newSeedGroups.push({
          start: destStart,
          len: seedGroup.start + seedGroup.len - 1 - sourceStart,
        })

        // left
        // if (seedGroup.start < sourceStart) {
        // tempSeedGroups.push({
        //   start: seedGroup.start,
        //   len: sourceStart - 1 - seedGroup.start,
        // })
        // }

        continue
      }

      if (
        seedGroup.start <= lastNumberOfSourceGroup &&
        seedGroup.start + seedGroup.len - 1 >= lastNumberOfSourceGroup
      ) {
        newSeedGroups.push({
          start: destStart + (seedGroup.start - sourceStart),
          len: lastNumberOfSourceGroup - (seedGroup.start + seedGroup.len - 1),
        })

        // right
        // if (seedGroup.start + seedGroup.len - 1 >= lastNumberOfSourceGroup) {
        //   tempSeedGroups.push({
        //     start: lastNumberOfSourceGroup + 1,
        //     len: seedGroup.start + seedGroup.len - 1 - lastNumberOfSourceGroup,
        //   })
        // }

        continue
      }

      tempSeedGroups.push(seedGroup)
    }

    oldSeedGroups = tempSeedGroups
    tempSeedGroups = []
  }

  return newSeedGroups.concat(oldSeedGroups)
}

let oldSeedGroups = [...seedGroups]
let newSeedGroups: SeedGroup[] = []

for (const mapGroup of mapGroups) {
  for (const seedGroup of oldSeedGroups) {
    const temp = convert(seedGroup, mapGroup)
    newSeedGroups = newSeedGroups.concat(temp)
  }

  oldSeedGroups = newSeedGroups
  newSeedGroups = []
}

oldSeedGroups.sort((a, b) => a.start - b.start)

const min = oldSeedGroups[0].start
console.log(min, min === 11611182)
