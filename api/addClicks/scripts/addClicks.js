let save = localStorage.getItem("fruitClickerData")

let data = JSON.parse(save)
let clicks = data.clicks

function addClicks(a) {
    clicks += a
}

addClicks(clicks/2)

function irparaFC( ) {
    window.location.href="/index.html"
}


setTimeout(() => {
    irparaFC()
}, 3000)
