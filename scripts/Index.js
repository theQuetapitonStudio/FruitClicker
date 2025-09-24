let clicks = 0
let yourfruit = null
let multi = 1

let clickmsg = document.getElementById("clickmsg")
let multimsg = document.getElementById("multimsg")
let clickbtn = document.getElementById("clickbtn")
let fruitimg = document.getElementById("fruitimg")
let fruitmsg = document.getElementById("fruitmsg")

let fruits = [
    { id: 1, nome: "Banana", custo: 0, power: 1, msg: "🍌" },
    { id: 2, nome: "Maçã", custo: 10, power: 2, msg: "🍎" },
    { id: 3, nome: "Melancia", custo: 30, power: 5, msg: "🍉" },
    { id: 4, nome: "Abacaxi", custo: 100, power: 12, msg: "🍍" },
    { id: 5, nome: "Morango", custo: 200, power: 15, msg: "🍓" },
    { id: 6, nome: "Laranja", custo: 300, power: 20, msg: "🍊" },
    { id: 7, nome: "Kiwi", custo: 400, power: 25, msg: "🥝" },
    { id: 8, nome: "Uva", custo: 500, power: 30, msg: "🍇" },
    { id: 9, nome: "Manga", custo: 650, power: 36, msg: "🥭" },
    { id: 10, nome: "Maçã Verde", custo: 800, power: 45, msg: "🍏" },
    { id: 11, nome: "Cereja", custo: 1000, power: 55, msg: "🍒" },
    { id: 12, nome: "Pera", custo: 1200, power: 70, msg: "🍐" },
    { id: 13, nome: "Coco", custo: 1500, power: 90, msg: "🥥" }
]

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

clickbtn.addEventListener("click", () => {
    clicks += yourfruit.power
    fruitimg.style.transform = "scale(1.1)"
    setTimeout(() => {
        fruitimg.style.transform = "scale(1)"
    }, 100)
    for (let f of fruits) {
        if (clicks >= f.custo && f.id > yourfruit.id) {
            yourfruit = f
            multi = yourfruit.power
        }
    }
})

setInterval(() => {
    localStorage.setItem("save", JSON.stringify({
        clicks: clicks,
        yourfruitId: yourfruit.id
    }))
}, 1000)

function update() {
    requestAnimationFrame(update)
    clickmsg.textContent = "Clicks: " + clicks
    fruitimg.textContent = yourfruit.msg
    fruitmsg.textContent = "Fruta: " + yourfruit.nome
    multimsg.textContent = "Multiplicador: " + multi + "X"
}

update()
