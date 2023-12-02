export function chunk<T>(arr: T[], size: number): T[][] {
    let count = 0
    let res = []
    let curr = []

    for (const item of arr) {
        curr.push(item)
        count++
        if (count === size) {
            count = 0
            res.push(curr)
            curr = []
        }
    }

    return res
}
