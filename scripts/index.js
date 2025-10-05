import { fruits } from "./fruits.list.js";
import { buyLuckyBlock } from "./lucky-block-system.js";
import { spawnLichia } from "./spawnLichia.js";
import { admMessage } from "./admMSG.js";
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

document.body.style.overflow = "hidden";

// === SOCKET.IO ===
const socket = io("https://fruitclicker-bdd-1.onrender.com");

// === LOCAL PLAYER ===
export let clicks = 0;
export let yourFruit = fruits[0];
const LOCAL_PLAYER_ID = socket.id || Math.random().toString(36).slice(2);
const playerClicks = new Map();

// === LOAD LOCAL DATA ===
const saved = localStorage.getItem("fruitClickerData");
if (saved) {
    const data = JSON.parse(saved);
    clicks = data.clicks || 0;

    if (data.fruits) {
        data.fruits.forEach(savedFruit => {
            const f = fruits.find(fruit => fruit.nome === savedFruit.nome);
            if (f) Object.assign(f, savedFruit);
            else fruits.push(savedFruit);
        });
    }

    if (data.fruit) {
        const f = fruits.find(fruit => fruit.nome === data.fruit.nome);
        yourFruit = f || { ...data.fruit };
    }
}

// === SAVE LOCAL DATA ===
export function saveData() {
    const fruitData = fruits.map(f => ({
        nome: f.nome,
        power: f.power,
        custo: f.custo,
        img: f.img
    }));

    localStorage.setItem("fruitClickerData", JSON.stringify({
        clicks,
        fruit: {
            nome: yourFruit.nome,
            power: yourFruit.power,
            custo: yourFruit.custo,
            img: yourFruit.img
        },
        fruits: fruitData
    }));
}

// === CLICK FUNCTIONS ===
export function getClicks() {
    return clicks
}

export function setClicks(valor) {
    clicks = valor;
    saveData();
}

export function addClicks(playerId = LOCAL_PLAYER_ID, a) {
    if (playerId === LOCAL_PLAYER_ID) {
        clicks += a;
        socket.emit("setClicks", { playerId: LOCAL_PLAYER_ID, clicks });
        saveData();
    } else {
        const current = playerClicks.get(playerId) || 0;
        playerClicks.set(playerId, current + a);
    }
}

// === FRUIT FUNCTIONS ===
export function getYourFruit() { return yourFruit; }
export function setYourFruit(f) { yourFruit = f; saveData(); }

export function getMulti() { return yourFruit.power; }
export function setMulti(a) { yourFruit.power = a; saveData(); }

// === DOM ELEMENTS ===
let fruitimg = document.getElementById("fruitimg");
let lbbtn = document.getElementById("lbbtn");

fruitimg.addEventListener("click", () => addClicks(LOCAL_PLAYER_ID, getMulti()));
lbbtn.addEventListener("click", () => buyLuckyBlock());

// === CHECK UPGRADE ===
function checkUpgrade() {
    let nextFruit = yourFruit;
    for (let f of fruits) {
        if (clicks >= f.custo) nextFruit = f;
        else break;
    }
    if (nextFruit !== yourFruit) setYourFruit(nextFruit);
}

// === FORMAT NUMBERS ===
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

// === CLEAR OLD APP STORAGE ===
for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key.startsWith('app_')) localStorage.removeItem(key);
}

// === SOCKET EVENTS ===
socket.on("connect", () => {
    playerClicks.set(LOCAL_PLAYER_ID, clicks);
    socket.emit("setClicks", { playerId: LOCAL_PLAYER_ID, clicks });
});

socket.on("updateClicks", ({ playerId, clicks: newClicks }) => {
    playerClicks.set(playerId, newClicks);
    if (playerId === LOCAL_PLAYER_ID) clicks = newClicks;
});

socket.on("globalMsg", (msg) => admMessage(msg, 10000, "white"));
socket.on("globalEvent", (event) => { if (event === "rainPotato") spawnLichia(); });

// === ADMIN ===
const ADMIN_TOKEN = "labatataH0SCH8DC9DH9C912723QDB@@@362FD1102Y7E0H720H7E02H7EXH027DHY2H0X72E";
export function adminSend(cmd, payload) { socket.emit("adminCmd", { token: ADMIN_TOKEN, cmd, payload }); }

// === BONUSES ===
setInterval(() => { addClicks(LOCAL_PLAYER_ID, getMulti()) }, 300000);

// === MAIN UPDATE LOOP ===
function update() {
    requestAnimationFrame(update);
    checkUpgrade();

    document.getElementById("clickmsg").textContent = `Clicks: ${formatNumber(Math.round(clicks))}`;
    document.getElementById("multimsg").textContent = `Multiplicador: ${formatNumber(Math.round(getMulti()))}X`;
    document.getElementById("fruitmsg").textContent = `Fruta: ${yourFruit.nome}`;
    document.getElementById("tutorialmsg").innerHTML = `Clique na <span style="color:red;">${yourFruit.nome}</span>`;
    fruitimg.src = yourFruit.img;
}

update();
