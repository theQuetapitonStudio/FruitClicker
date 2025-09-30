
import { fruits } from "./fruits.list.js"
import { buyLuckyBlock } from "./lucky-block-system.js"

export let clicks = 0
export let yourFruit = fruits[0]

let fruitimg = document.getElementById("fruitimg")
let lbbtn = document.getElementById("lbbtn")

const saved = localStorage.getItem("fruitClickerData")
if (saved) {
    const data = JSON.parse(saved)
    clicks = data.clicks
    yourFruit = data.fruit ? data.fruit : fruits[0]
    if (!fruits.find(f => f.nome === yourFruit.nome)) {
        fruits.push(yourFruit)
    }
}

export function saveData() {
    localStorage.setItem("fruitClickerData", JSON.stringify({
        clicks,
        fruit: yourFruit
    }))
}

export function getClicks() { return clicks }
export function setClicks(a) { clicks = a; saveData() }

export function getYourFruit() { return yourFruit }
export function setYourFruit(f) { yourFruit = f; saveData() }

export function getMulti() { return yourFruit.power }
export function addClicks(a) { clicks += a; saveData() }

fruitimg.addEventListener("click", () => addClicks(getMulti()))
lbbtn.addEventListener("click", () => buyLuckyBlock())

function checkUpgrade() {
    let nextFruit = yourFruit
    for (let f of fruits) {
        if (clicks >= f.custo) nextFruit = f
        else break
    }
    if (nextFruit !== yourFruit) setYourFruit(nextFruit)
}

function update() {
    requestAnimationFrame(update)
    checkUpgrade()
    document.getElementById("clickmsg").textContent = `Clicks: ${clicks}`
    document.getElementById("multimsg").textContent = `Multiplicador: ${getMulti()}X`
    document.getElementById("fruitmsg").textContent = `Fruta: ${yourFruit.nome}`
    document.getElementById("tutorialmsg").innerHTML = `Clique na <span style="color:red;">${yourFruit.nome}</span>`
    fruitimg.src = yourFruit.img
}

update()
