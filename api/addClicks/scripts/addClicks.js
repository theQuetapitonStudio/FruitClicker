let save = localStorage.getItem("fruitClickerData");

let data = save ? JSON.parse(save) : { clicks: 0 };

let clicks = data.clicks;

function addClicks(a) {
    clicks += a;
    data.clicks = clicks;
    localStorage.setItem("fruitClickerData", JSON.stringify(data));
}

addClicks(10);

function irparaFC() {
    window.location.href = "https://thequetapitonstudio.github.io/FruitClicker/";
}

setTimeout(() => {
    irparaFC();
}, 3000);
