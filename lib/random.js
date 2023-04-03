export const randomInt = (min, max) => {
    const p = Math.random()
    return Math.floor(min * (1 - p) + max * p)
}

let lastPicked

export const randomPick = (arr) => {
    let picked = null
    do {
        const index = randomInt(0, arr.length)
        picked = arr[index]
    } while (picked === lastPicked)
    lastPicked = picked
    return picked
}