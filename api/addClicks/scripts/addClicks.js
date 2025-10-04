let save = localStorage.getItem("fruitClickerData")

// se não existe, cria o objeto inicial
if (!save) {
    let defaultData = { clicks: 0, multi: 1 }
    localStorage.setItem("fruitClickerData", JSON.stringify(defaultData))
    save = JSON.stringify(defaultData) // agora garante que save existe
}

let data = JSON.parse(save)
let clicks = data.clicks

function addClicks(a) {
    clicks += a
    data.clicks = clicks
    localStorage.setItem("fruitClickerData", JSON.stringify(data))
}

addClicks(100)

function irparaFC() {
    window.location.href = "https://thequetapitonstudio.github.io/FruitClicker/index.html"
}

setTimeout(() => {
    irparaFC()
}, 3000)
