import { fruits } from "./fruits.list.js";
import { buyLuckyBlock } from "./lucky-block-system.js";
import { spawnLichia } from "./spawnLichia.js";
import { admMessage } from "./admMSG.js";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { admSend } from "./admSend.js"

document.body.style.overflow = "hidden";

export let clicks = 0;
export let yourFruit = fruits[0];

let fruitimg = document.getElementById("fruitimg");
let lbbtn = document.getElementById("lbbtn");

const saved = localStorage.getItem("fruitClickerData");
if (saved) {
    const data = JSON.parse(saved);
    clicks = data.clicks;
    yourFruit = data.fruit ? data.fruit : fruits[0];
    if (!fruits.find(f => f.nome === yourFruit.nome)) {
        fruits.push(yourFruit);
    }
}

export function saveData() {
    localStorage.setItem("fruitClickerData", JSON.stringify({
        clicks,
        fruit: yourFruit
    }));
}

export function getClicks() { return clicks; }
export function setClicks(a) { clicks = a; saveData(); }
export function getYourFruit() { return yourFruit; }
export function setYourFruit(f) { yourFruit = f; saveData(); }
export function getMulti() { return yourFruit.power; }
export function addClicks(a) { clicks += a; saveData(); }

fruitimg.addEventListener("click", () => addClicks(getMulti()));
lbbtn.addEventListener("click", () => buyLuckyBlock());

function checkUpgrade() {
    let nextFruit = yourFruit;
    for (let f of fruits) {
        if (clicks >= f.custo) nextFruit = f;
        else break;
    }
    if (nextFruit !== yourFruit) setYourFruit(nextFruit);
}

function formatNumber(num) {
    if (num < 1000) return num.toString();
    const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    function generateSuffix(n) {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        let s = "";
        n--;
        do {
            s = letters[n % 26] + s;
            n = Math.floor(n / 26) - 1;
        } while (n >= 0);
        return s;
    }
    let tier = 0;
    let scaled = num;
    while (scaled >= 1000) {
        scaled /= 1000;
        tier++;
    }
    const suffix = tier < suffixes.length ? suffixes[tier] : generateSuffix(tier - suffixes.length + 1);
    return scaled.toFixed(2).replace(/\.00$/, '') + suffix;
}

for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.startsWith('app_')) {
        localStorage.removeItem(key);
    }
}

const socket = io("https://fruitclicker-bdd-1.onrender.com");

socket.on("globalMsg", (msg) => {
    admMessage(msg, 10000, "white");
});

socket.on("globalEvent", (event) => {
    if (event === "rainPotato") spawnLichia();
});

const _part1 = "labatataH0SCH8DC9DH9C912723QDB";
const _part2 = "@@@362FD1102Y7E0H720H7E02H7EXH027DHY2H0X72E";
const ADMIN_TOKEN = _part1 + _part2;

export function adminSend(cmd, payload) {
    socket.emit("adminCmd", {
        token: ADMIN_TOKEN,
        cmd,
        payload
    });
}

function update() {
    requestAnimationFrame(update);
    checkUpgrade();
    document.getElementById("clickmsg").textContent = `Clicks: ${formatNumber(clicks)}`;
    document.getElementById("multimsg").textContent = `Multiplicador: ${formatNumber(getMulti())}X`;
    document.getElementById("fruitmsg").textContent = `Fruta: ${yourFruit.nome}`;
    document.getElementById("tutorialmsg").innerHTML = `Clique na <span style="color:red;">${yourFruit.nome}</span>`;
    fruitimg.src = yourFruit.img;
}

update();

