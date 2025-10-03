import { setClicks, getClicks, getMulti, setMulti, saveData } from "./index.js"
import { fruits } from "./fruits.list.js"


let HUD = [document.getElementById("potato-truckHUD"), document.getElementById("potatotruckIMG")]

export function spawnPT(duracao = 5000) {
    HUD[0].style.display = "block"  
    setTimeout(() => {
        HUD[0].style.display = "none"
    }, duracao) 
}

function GiveClicks() {
    if (getClicks() < 1000) return
    setClicks(getClicks() - 1000)
    fruits.forEach(fruit => {
        fruit.power *= 1.1
    })

    saveData()
}

HUD[1].addEventListener("click", () => {
    GiveClicks()
})

spawnPT()