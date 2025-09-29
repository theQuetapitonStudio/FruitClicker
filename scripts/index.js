import { fruits } from "./fruits.list.js"

export let clicks = parseInt(localStorage.getItem("clicks")) || 0
let multi = 1
let yourFruit = fruits[0]

let savedFruitName = localStorage.getItem("yourFruit")
if (savedFruitName) {
    let savedFruit = fruits.find(f => f.nome === savedFruitName)
    if (savedFruit) {
        yourFruit = savedFruit
        multi = yourFruit.power
    }
}

export function getClicks() {
    return clicks
}

window.addEventListener("DOMContentLoaded", () => {
    let fruitimg = document.getElementById("fruitimg")
    let clickmsg = document.getElementById("clickmsg")
    let multimsg = document.getElementById("multimsg")
    let fruitmsg = document.getElementById("fruitmsg")
    let tutorialmsg = document.getElementById("tutorialmsg")

    function addClicks(quantidade) {
        clicks += quantidade
        localStorage.setItem("clicks", clicks)
    }

    fruitimg.addEventListener("click", () => {
        addClicks(multi)
    })

    function checkUpgrade() {
        for (let i = fruits.length - 1; i >= 0; i--) {
            if (clicks >= fruits[i].custo) {
                if (yourFruit.nome !== fruits[i].nome) {
                    yourFruit = fruits[i]
                    multi = yourFruit.power
                    localStorage.setItem("yourFruit", yourFruit.nome)
                }
                break
            }
        }
    }

    function update() {
        requestAnimationFrame(update)
        checkUpgrade()

        fruitimg.src = yourFruit.img
        clickmsg.textContent = `Clicks: ${clicks}`
        multimsg.textContent = `Multiplicador: ${multi}X`
        fruitmsg.textContent = `Fruta: ${yourFruit.nome}`
        tutorialmsg.innerHTML = `Clique na <span style="color: red;">${yourFruit.nome}</span>`
    }

    update()
})
