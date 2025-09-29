import { fruits } from "./fruits.list.js";

// --- Config ---
const API = "https://fruitclicker-bdd.onrender.com";

// --- Pegando usuário logado ---
const username = localStorage.getItem("username"); // salvo no login
const token = localStorage.getItem(`token_${username}`); // token por usuário

const clicksKey = username ? `clicks_${username}` : null;
const fruitKey = username ? `fruit_${username}` : null;

// --- Variáveis do jogo ---
export let clicks = clicksKey ? parseInt(localStorage.getItem(clicksKey)) || 0 : 0;
let multi = 1;
let yourFruit = fruits[0];

let savedFruitName = fruitKey ? localStorage.getItem(fruitKey) : null;
if (savedFruitName) {
    const savedFruit = fruits.find(f => f.nome === savedFruitName);
    if (savedFruit) {
        yourFruit = savedFruit;
        multi = yourFruit.power;
    }
}

// --- Funções exportadas ---
export function getClicks() {
    return clicks;
}

export function addClicks(qtd) {
    clicks += qtd;
    if (clicksKey) localStorage.setItem(clicksKey, clicks);
    saveClicksToBackend();
}

// --- Backend opcional ---
async function loadClicksFromBackend() {
    if (!token) return;
    try {
        const res = await fetch(`${API}/load`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Falha ao carregar clicks do backend");
        const data = await res.json();
        clicks = data.clicks || clicks;
    } catch (err) {
        console.error("Erro backend:", err);
    }
}

async function saveClicksToBackend() {
    if (!token) return;
    try {
        await fetch(`${API}/save`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ clicks })
        });
    } catch (err) {
        console.error("Erro backend:", err);
    }
}

// --- Código que só roda se os elementos existirem ---
window.addEventListener("DOMContentLoaded", async () => {
    const fruitimg = document.getElementById("fruitimg");
    const clickmsg = document.getElementById("clickmsg");
    const multimsg = document.getElementById("multimsg");
    const fruitmsg = document.getElementById("fruitmsg");
    const tutorialmsg = document.getElementById("tutorialmsg");
    const authDiv = document.getElementById("auth");
    const gameDiv = document.getElementById("game");
    const logoutBtn = document.getElementById("logoutBtn");

    // Se os elementos não existirem (ex: minigame), sai do bloco
    if (!fruitimg || !clickmsg || !multimsg || !fruitmsg || !tutorialmsg) return;

    if (!username || !token) {
        if (authDiv) authDiv.style.display = "block";
        if (gameDiv) gameDiv.style.display = "none";
        return;
    } else {
        if (authDiv) authDiv.style.display = "none";
        if (gameDiv) gameDiv.style.display = "block";
    }

    await loadClicksFromBackend();

    // Clique na fruta
    fruitimg.addEventListener("click", () => {
        addClicks(multi);
    });

    function checkUpgrade() {
        for (let i = fruits.length - 1; i >= 0; i--) {
            if (clicks >= fruits[i].custo) {
                if (yourFruit.nome !== fruits[i].nome) {
                    yourFruit = fruits[i];
                    multi = yourFruit.power;
                    if (fruitKey) localStorage.setItem(fruitKey, yourFruit.nome);
                }
                break;
            }
        }
    }

    function update() {
        requestAnimationFrame(update);
        checkUpgrade();

        fruitimg.src = yourFruit.img;
        clickmsg.textContent = `Clicks: ${clicks}`;
        multimsg.textContent = `Multiplicador: ${multi}X`;
        fruitmsg.textContent = `Fruta: ${yourFruit.nome}`;
        tutorialmsg.innerHTML = `Clique na <span style="color: red;">${yourFruit.nome}</span>`;
    }

    update();

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (username) {
                localStorage.removeItem(`token_${username}`);
                localStorage.removeItem("username");
            }
            location.reload();
        });
    }
});
