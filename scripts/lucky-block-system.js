import { getClicks, setClicks, getYourFruit, setYourFruit, yourFruit } from "./index.js"
import { fruits } from "./fruits.list.js"
import { admMessage } from "./admMSG.js"
import { saveData } from "./index.js"

export let lucky_block_fruits = [
    { id: 1, nome: "Açai", chance: 3, power: 3, img: "./imgs/lb-fruits/açai.webp" },
    { id: 2, nome: "Carambola", chance: 2, power: 2, img: "./imgs/lb-fruits/carambola.png" },
    { id: 3, nome: "Maçã roxa", chance: 1, power: 1, img: "./imgs/lb-fruits/purple-apple.png" }
]

export let plbHUD = [document.getElementById("potatoimg"), document.getElementById("potatoluckyblockHUD")]

export function spawnEromadeite(duracao = 2000) {
    plbHUD[1].style.display = "block" 
    plbHUD[0].addEventListener("click", () => {
        fruits.push({
            id: yourFruit.id + 1,
            nome: "Eromadeite",
            custo: getClicks(),
            power:  yourFruit.power * 2,
            img: "./imgs/lb-fruits/eromadeite.png",
            isGold: false
        })
        saveData()
    })

    setTimeout(() => {
        plbHUD[1].style.display = "none"
    }, duracao)
    admMessage("O <strong style='color: red;'>EROMADEITE</strong> foi ativado com sucesso")
}



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
