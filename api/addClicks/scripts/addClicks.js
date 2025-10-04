let save = localStorage.getItem("fruitClickerData")

let data = JSON.parse(save)
let clicks = data.clicks

function addClicks(a) {
    clicks += a
}

addClicks(clicks/2)

function irparaFC( ) {
    window.location.href="https://thequetapitonstudio.github.io/FruitClicker/"
}


setTimeout(() => {
    irparaFC()
}, 3000)

