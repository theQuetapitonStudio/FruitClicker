export let stock = {
    açai: 3,
    carambola: 4,
    maçã_roxa: 1,
    pomelo: 0,
}


const RS1 = { açai: 3, carambola: 4, maçã_roxa: 1, pomelo: 0 }
const RS2 = { açai: 4, carambola: 2, maçã_roxa: 0, pomelo: 0 }
const RS3 = { açai: 5, carambola: 1, maçã_roxa: 0, pomelo: 0 }
const RS4 = { açai: 5, carambola: 1, maçã_roxa: 0, pomelo: 0 }
const RS5 = { açai: 5, carambola: 1, maçã_roxa: 0, pomelo: 1 }

setTimeout(() => Object.assign(stock, RS2), 6000)
setTimeout(() => Object.assign(stock, RS3), 12000)
setTimeout(() => Object.assign(stock, RS4), 18000)
setTimeout(() => Object.assign(stock, RS5), 24000)

export function getStock(fruitKey) {
    return stock[fruitKey] ?? 0
}