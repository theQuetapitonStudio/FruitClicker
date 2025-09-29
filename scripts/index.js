import { fruits } from "./fruits.list.js";

const API = "https://fruitclicker-bdd.onrender.com";

let token = null;   // Token atual do usuário
let username = null; 
let clicks = 0;
let multi = 1;
let yourFruit = fruits[0];

// --- Carrega dados do usuário do backend ---
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
        if (savedFruit) {
            yourFruit = savedFruit;
            multi = yourFruit.power;
        }
    } catch (err) {
        console.error("Erro carregando dados:", err);
    }
}

// --- Salva dados no backend ---
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
    } catch (err) {
        console.error("Erro salvando dados:", err);
    }
}

// --- Função de clique ---
function handleClick() {
    clicks += multi;
    saveUserData(); // salva sempre que clicar
}

// --- Verifica se deve fazer upgrade da fruta ---
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

// --- Atualiza o DOM ---
function updateDOM() {
    document.getElementById("clickmsg").textContent = `Clicks: ${clicks}`;
    document.getElementById("multimsg").textContent = `Multiplicador: ${multi}X`;
    document.getElementById("fruitmsg").textContent = `Fruta: ${yourFruit.nome}`;
    document.getElementById("tutorialmsg").innerHTML = `Clique na <span style="color:red;">${yourFruit.nome}</span>`;
    document.getElementById("fruitimg").src = yourFruit.img;
}

// --- Loop de atualização ---
function loop() {
    checkUpgrade();
    updateDOM();
    requestAnimationFrame(loop);
}

// --- Função de login ---
async function login(user, pass) {
    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: user, password: pass })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erro no login");
        token = data.token;
        username = user;
        // Esconde login, mostra jogo
        document.getElementById("auth").style.display = "none";
        document.getElementById("game").style.display = "block";
        await loadUserData();
        loop();
    } catch (err) {
        document.getElementById("authMsg").textContent = err.message;
        console.error(err);
    }
}

// --- Função de logout ---
function logout() {
    token = null;
    username = null;
    document.getElementById("auth").style.display = "block";
    document.getElementById("game").style.display = "none";
}

// --- DOMContentLoaded ---
window.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const fruitimg = document.getElementById("fruitimg");

    // Click na fruta
    fruitimg.addEventListener("click", handleClick);

    // Botão de login
    loginBtn.addEventListener("click", () => {
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        login(user, pass);
    });

    // Botão de logout
    logoutBtn.addEventListener("click", logout);

    // Botão de registro
    registerBtn.addEventListener("click", async () => {
        const user = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        try {
            const res = await fetch(`${API}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao registrar");
            document.getElementById("authMsg").textContent = "Registrado! Faça login.";
        } catch (err) {
            document.getElementById("authMsg").textContent = err.message;
            console.error(err);
        }
    });
});
