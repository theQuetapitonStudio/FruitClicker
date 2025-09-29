import { fruits } from "./fruits.list.js";

export let clicks = 0;
export let multi = 1;
let yourFruit = fruits[0];

const fruitimg = document.getElementById("fruitimg");

const saved = localStorage.getItem("fruitClickerData");
if (saved) {
    const data = JSON.parse(saved);
    clicks = data.clicks;
    multi = data.multi;
    yourFruit = fruits.find(f => f.nome === data.fruit) || fruits[0];
}

function saveData() {
    localStorage.setItem("fruitClickerData", JSON.stringify({
        clicks,
        multi,
        fruit: yourFruit.nome
    }));
}

function checkUpgrade() {
    let nextFruit = yourFruit;
    for (let i = 0; i < fruits.length; i++) {
        if (clicks >= fruits[i].custo) nextFruit = fruits[i];
        else break;
    }
    if (nextFruit.nome !== yourFruit.nome) {
        yourFruit = nextFruit;
        multi = yourFruit.power;
    }
}

export function addClicks(a) {
    clicks += a;
    saveData();
}

export function setClicks(a) {
    clicks = a;
    saveData();
}

fruitimg.addEventListener("click", () => addClicks(multi));

function update() {
    requestAnimationFrame(update);
    checkUpgrade();
    document.getElementById("clickmsg").textContent = `Clicks: ${clicks}`;
    document.getElementById("multimsg").textContent = `Multiplicador: ${multi}X`;
    document.getElementById("fruitmsg").textContent = `Fruta: ${yourFruit.nome}`;
    document.getElementById("tutorialmsg").innerHTML = `Clique na <span style="color:red;">${yourFruit.nome}</span>`;
    fruitimg.src = yourFruit.img;
}

update();
