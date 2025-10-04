let save = localStorage.getItem("fruitClickerData")

let data = JSON.parse(save)
let clicks = save.clicks

function addClicks(a) {
    clicks += a
}

addClicks(10)

function irparaFC( ) {
    window.location.href="https://thequetapitonstudio.github.io/FruitClicker/"
}


setTimeout(() => {
    irparaFC()
}, 3000)

