const API = "https://fruitclicker-bdd.onrender.com";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("authMsg");

// --- Função para login ---
loginBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!username || !password) {
        authMsg.textContent = "Preencha usuário e senha!";
        return;
    }

    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw new Error("Usuário ou senha incorretos");
        const data = await res.json();

        // Salva token e username no localStorage, separados por usuário
        localStorage.setItem("username", username);
        localStorage.setItem(`token_${username}`, data.token);

        // Redireciona ou recarrega para index.js
        window.location.reload();
    } catch (err) {
        authMsg.textContent = err.message;
        console.error(err);
    }
});

// --- Função para registro ---
registerBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!username || !password) {
        authMsg.textContent = "Preencha usuário e senha!";
        return;
    }

    try {
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw new Error("Erro ao registrar usuário");
        const data = await res.json();

        // Salva token e username no localStorage, separados por usuário
        localStorage.setItem("username", username);
        localStorage.setItem(`token_${username}`, data.token);

        // Redireciona ou recarrega para index.js
        window.location.reload();
    } catch (err) {
        authMsg.textContent = err.message;
        console.error(err);
    }
});
