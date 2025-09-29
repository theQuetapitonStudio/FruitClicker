import { fruits } from "./fruits.list.js";

const API = "https://fruitclicker-bdd.onrender.com";

let token = window.sessionToken;
let username = window.sessionUser;

let clicks = 0;
let multi = 1;
let yourFruit = fruits[0];

// Carrega dados do backend
async function loadUserData() {
    if (!token) return;
    try {
        const res = await fetch(`${API}/loadUserData`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Falha ao carregar dados do usuário");
        const data = await res.json();
        clicks = data.clicks ?? 0;
        const savedFruit = fruits.find(f => f.nome === data.fruit);
        if (savedFruit) { yourFruit = savedFruit; multi = yourFruit.power; }
    } catch (err) { console.error("Erro carregando dados:", err); }
}

// Salva dados no backend
async function saveUserData() {
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
    } catch (err) { console.error("Erro salvando dados:", err); }
}

export function getClicks() { return clicks; }
export function addClicks(qtd) { clicks += qtd; saveUserData(); }

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

    if (!token) {
        if (authDiv) authDiv.style.display = "block";
        if (gameDiv) gameDiv.style.display = "none";
        return;
    } else {
        if (authDiv) authDiv.style.display = "none";
        if (gameDiv) gameDiv.style.display = "block";
    }

    await loadUserData();

    fruitimg.addEventListener("click", () => addClicks(multi));

    function checkUpgrade() {
        for (let i = fruits.length - 1; i >= 0; i--) {
            if (clicks >= fruits[i].custo && yourFruit.nome !== fruits[i].nome) {
                yourFruit = fruits[i];
                multi = yourFruit.power;
                saveUserData();
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

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            token = null;
            username = null;
            window.sessionToken = null;
            window.sessionUser = null;
            window.location.href = "auth.html";
        });
    }
});
