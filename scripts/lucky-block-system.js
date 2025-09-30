import { getClicks, setClicks, getYourFruit, setYourFruit } from "./index.js"
import { fruits } from "./fruits.list.js"

export let lucky_block_fruits = [
    { id: 1, nome: "Açai", chance: 3, power: 3, img: "./imgs/lb-fruits/açai.png" },
    { id: 2, nome: "Carambola", chance: 2, power: 2, img: "./imgs/lb-fruits/carambola.png" },
    { id: 3, nome: "Maçã roxa", chance: 1, power: 1, img: "./imgs/lb-fruits/purple-apple.png" }
]

export function sortearfruita() {
    let totalChance = lucky_block_fruits.reduce((acc, f) => acc + f.chance, 0)
    let nrandom = Math.random() * totalChance
    for (let fruta of lucky_block_fruits) {
        if (nrandom < fruta.chance) return fruta
        nrandom -= fruta.chance
    }
}

export function buyLuckyBlock() {
    if (getClicks() >= 500) {
        setClicks(getClicks() - 500)
        let fruta = sortearfruita()
        let currentFruit = getYourFruit()
        let newFruit = {
            id: fruta.id,
            nome: fruta.nome,
            custo: getClicks() + 1,
            power: fruta.power + currentFruit.power,
            img: fruta.img,
            isGold: false
        }
        fruits.push(newFruit)
        setYourFruit(newFruit)
    }
}
