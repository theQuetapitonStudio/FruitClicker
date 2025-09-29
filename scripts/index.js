import { fruits } from "./fruits.list.js";

// --- Config ---
const API = "https://fruitclicker-bdd.onrender.com";

// --- Pegando usuário logado ---
const username = localStorage.getItem("username");
const token = localStorage.getItem(`token_${username}`);

// --- Chaves locais ---
const clicksKey = username ? `clicks_${username}` : null;
const fruitKey = username ? `fruit_${username}` : null;

// --- Variáveis do jogo ---
export let clicks = clicksKey ? parseInt(localStorage.getItem(clicksKey)) || 0 : 0;
let multi = 1;
let yourFruit = fruits[0];

// --- Carrega fruta do localStorage inicialmente ---
let savedFruitName = fruitKey ? localStorage.getItem(fruitKey) : null;
if (savedFruitName) {
    const savedFruit = fruits.find(f => f.nome === savedFruitName);
    if (savedFruit) {
        yourFruit = savedFruit;
        multi = yourFruit.power;
    }
}

// --- Backend ---
async function loadUserDataFromBackend() {
    if (!token) return;
    try {
        const res = await fetch(`${API}/loadUserData`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Falha ao carregar dados do usuário");
        const data = await res.json();

        // Atualiza clicks
        clicks = data.clicks ?? clicks;

        // Atualiza fruta
        const savedFruit = fruits.find(f => f.nome === data.fruit);
        if (savedFruit) {
            yourFruit = savedFruit;
            multi = yourFruit.power;
        }

        // Salva localmente
        if (clicksKey) localStorage.setItem(clicksKey, clicks);
        if (fruitKey && yourFruit) localStorage.setItem(fruitKey, yourFruit.nome);
    } catch (err) {
        console.error("Erro backend:", err);
    }
}

async function saveUserDataToBackend() {
    if (!token) return;
    try {
        await fetch(`${API}/saveUserData`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ clicks, fruit: yourFruit.nome })
        });
    } catch (err) {
        console.error("Erro salvando dados:", err);
    }
}

// --- Funções exportadas ---
export function getClicks() {
    return clicks;
}

export function addClicks(qtd) {
    clicks += qtd;
    if (clicksKey) localStorage.setItem(clicksKey, clicks);
    saveUserDataToBackend();
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

    if (!fruitimg || !clickmsg || !multimsg || !fruitmsg || !tutorialmsg) return;

    if (!username || !token) {
        if (authDiv) authDiv.style.display = "block";
        if (gameDiv) gameDiv.style.display = "none";
        return;
    } else {
        if (authDiv) authDiv.style.display = "none";
        if (gameDiv) gameDiv.style.display = "block";
    }

    await loadUserDataFromBackend();

    // Clique na fruta
    fruitimg.addEventListener("click", () => addClicks(multi));

    function checkUpgrade() {
        for (let i = fruits.length - 1; i >= 0; i--) {
            if (clicks >= fruits[i].custo) {
                if (yourFruit.nome !== fruits[i].nome) {
                    yourFruit = fruits[i];
                    multi = yourFruit.power;
                    if (fruitKey) localStorage.setItem(fruitKey, yourFruit.nome);
                    saveUserDataToBackend();
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
                localStorage.removeItem(clicksKey);
                localStorage.removeItem(fruitKey);
            }
            location.reload();
        });
    }
});
