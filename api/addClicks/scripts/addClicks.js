let save = localStorage.getItem("fruitClickerData")

let data = JSON.parse(save)
let clicks = data.clicks

function addClicks(a) {
    clicks += a
}

addClicks(100)

function irparaFC( ) {
    window.location.href="https://thequetapitonstudio.github.io/FruitClicker/index.html"
}


setTimeout(() => {
    irparaFC()
}, 3000)

