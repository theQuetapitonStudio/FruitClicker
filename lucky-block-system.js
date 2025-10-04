import { getClicks, setClicks, getYourFruit, setYourFruit } from "./index.js"
import { fruits } from "./fruits.list.js"
import { admMessage } from "./admMSG.js"
import { saveData } from "./index.js"
import { getStock } from "../api/re-estock/api.js" 

export let lucky_block_fruits = [
    { id: 1, nome: "Açai", key: "açai", chance: 3, power: 3, img: "./imgs/lb-fruits/açai.webp" },
    { id: 2, nome: "Carambola", key: "carambola", chance: 2, power: 2, img: "./imgs/lb-fruits/carambola.png" },
    { id: 3, nome: "Maçã roxa", key: "maçã_roxa", chance: 1, power: 1, img: "./imgs/lb-fruits/purple-apple.png" },
    { id: 4, nome: "Pomelo", key: "pomelo", chance: 1, power: 4, img: "./imgs/lb-fruits/pomelo.png" },
]

// Sorteia uma fruta com base nas chances
export function sortearFruta() {
    const totalChance = lucky_block_fruits.reduce((acc, f) => acc + f.chance, 0)
    let nrandom = Math.random() * totalChance

    for (let fruta of lucky_block_fruits) {
        if (nrandom < fruta.chance) return fruta
        nrandom -= fruta.chance
    }
}

// Sistema principal do Lucky Block
export function buyLuckyBlock() {
    const custo = 500

    if (getClicks() < custo) {
        admMessage("Você precisa de 500 clicks para abrir um Lucky Block!")
        return
    }

    let fruta = sortearFruta()
    if (!fruta) {
        admMessage("Nenhuma fruta foi sorteada! Tente novamente.")
        return
    }

    const estoqueAtual = getStock(fruta.key)
    if (estoqueAtual <= 0) {
        admMessage(`O estoque de <strong>${fruta.nome}</strong> acabou!`)
        return
    }

    setClicks(getClicks() - custo)

    const currentFruit = getYourFruit()
    const newFruit = {
        id: fruta.id,
        nome: fruta.nome,
        custo: getClicks() + 1,
        power: fruta.power + currentFruit.power,
        img: fruta.img,
        isGold: false
    }

    fruits.push(newFruit)
    setYourFruit(newFruit)
    saveData()

    admMessage(`Você conseguiu um <strong>${fruta.nome}</strong>! Restam ${estoqueAtual - 1} no estoque.`)
}
