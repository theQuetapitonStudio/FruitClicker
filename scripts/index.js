let clicks = 0
let yourfruit = null
let multi = 1

let clickmsg = document.getElementById("clickmsg")
let multimsg = document.getElementById("multimsg")
let clickbtn = document.getElementById("clickbtn")
let fruitimg = document.getElementById("fruitimg")
let fruitmsg = document.getElementById("fruitmsg")
let comunsmsg = document.getElementById("comunsmsg")
let incomummsg = document.getElementById("incomummsg")
let raromsg = document.getElementById("raromsg")
let divinemsg = document.getElementById("divinosmsg")

let fruits = [
    { id: 1, nome: "Banana", custo: 0, power: 1, msg: "🍌", raridade: "comum" },
    { id: 2, nome: "Maçã", custo: 50, power: 2, msg: "🍎", raridade: "comum" },
    { id: 3, nome: "Melancia", custo: 100, power: 5, msg: "🍉", raridade: "comum" },
    { id: 4, nome: "Abacaxi", custo: 800, power: 12, msg: "🍍", raridade: "comum" },
    { id: 5, nome: "Morango", custo: 1000, power: 15, msg: "🍓", raridade: "comum" },
    { id: 6, nome: "Laranja", custo: 2000, power: 20, msg: "🍊", raridade: "incomum" },
    { id: 7, nome: "Kiwi", custo: 3400, power: 25, msg: "🥝", raridade: "incomum" },
    { id: 8, nome: "Uva", custo: 3800, power: 30, msg: "🍇", raridade: "incomum" },
    { id: 9, nome: "Manga", custo: 5000, power: 36, msg: "🥭", raridade: "incomum" },
    { id: 10, nome: "Maçã Verde", custo: 7000, power: 45, msg: "🍏", raridade: "incomum" },
    { id: 11, nome: "Cereja", custo: 8000, power: 55, msg: "🍒", raridade: "raro" },
    { id: 12, nome: "Pera", custo: 9800, power: 70, msg: "🍐", raridade: "raro" },
    { id: 13, nome: "Coco", custo: 10000, power: 90, msg: "🥥", raridade: "raro" },
    { id: 14, nome: "Abacate", custo: 17000, power: 100, msg: "🥑", raridade: "raro" },
    { id: 15, nome: "Milho", custo: 22000, power: 120, msg: "🌽", raridade: "raro" },
    { id: 16, nome: "Tomate", custo: 29000, power: 150, msg: "🍅", raridade: "divino" },
    { id: 17, nome: "LA BATATA", custo: 60000, power: 200, msg: "🥔", raridade: "divino" },
]

function removeFruta(id) {
    fruits = fruits.filter(f => f.id !== id)
}

fruits.push({
    id: 18,
    nome: "TACO",
    custo: 100000,
    power: 250,
    msg: "🌮",
    raridade: "divino"
})

let save = JSON.parse(localStorage.getItem("save"))
if (save) {
    clicks = save.clicks || 0
    let fruitFound = fruits.find(f => f.id === save.yourfruitId)
    yourfruit = fruitFound || fruits[0]
    multi = yourfruit.power
} else {
    yourfruit = fruits[0]
    multi = yourfruit.power
}

let nextFruitIndex = yourfruit.id

clickbtn.addEventListener("click", () => {
    clicks += yourfruit.power
    fruitimg.style.transform = "scale(1.1)"
    setTimeout(() => { fruitimg.style.transform = "scale(1)" }, 100)
    if (nextFruitIndex < fruits.length && clicks >= fruits[nextFruitIndex].custo) {
        yourfruit = fruits[nextFruitIndex]
        multi = yourfruit.power
        nextFruitIndex++
    }
})

setInterval(() => {
    let saveData = { clicks: clicks, yourfruitId: yourfruit.id }
    localStorage.setItem("save", JSON.stringify(saveData))
}, 1000)



function update() {
    requestAnimationFrame(update)
    clickmsg.textContent = "Clicks: " + clicks
    fruitimg.textContent = yourfruit.msg
    fruitmsg.textContent = "Fruta: " + yourfruit.nome
    multimsg.textContent = "Multiplicador: " + multi + "X"
    comunsmsg.textContent = fruits.filter(f => f.raridade === "comum" && f.id <= yourfruit.id).length === 5 ? "Comuns: Banana, Maçã, Melancia, Abacaxi, Morango ✅" : ""
    incomummsg.textContent = fruits.filter(f => f.raridade === "incomum" && f.id <= yourfruit.id).length === 5 ? "Incomuns: Laranja, Kiwi, Uva, Manga, Maçã Verde ✅" : ""
    raromsg.textContent = fruits.filter(f => f.raridade === "raro" && f.id <= yourfruit.id).length === 5 ? "Raros: Cereja, Pera, Coco, Abacate, Milho ✅" : ""
    divinemsg.textContent = fruits.filter(f => f.raridade === "divino" && f.id <= yourfruit.id).length === 2 ? "Divinos: Tomate, LA BATATA ✅" : ""
}

function resetGame() {
    clicks = 0
    yourfruit = fruits[0]
    multi = 1
}

update()
