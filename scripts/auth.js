const API = "https://fruitclicker-bdd.onrender.com";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("authMsg");

// --- Função para carregar dados do usuário após login/registro ---
async function loadUserData(username, token) {
    try {
        const res = await fetch(`${API}/loadUserData`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Falha ao carregar dados do usuário");
        const data = await res.json();

        // Salva clicks e fruta no localStorage por usuário
        localStorage.setItem(`clicks_${username}`, data.clicks ?? 0);
        localStorage.setItem(`fruit_${username}`, data.fruit ?? "Banana");
    } catch (err) {
        console.error("Erro carregando dados:", err);
    }
}

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

        // Salva token e username no localStorage
        localStorage.setItem("username", username);
        localStorage.setItem(`token_${username}`, data.token);

        // Carrega clicks e fruta do backend
        await loadUserData(username, data.token);

        // Recarrega página para aplicar estado
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

        // Salva token e username no localStorage
        localStorage.setItem("username", username);
        localStorage.setItem(`token_${username}`, data.token);

        // Inicializa dados do usuário no backend
        await loadUserData(username, data.token);

        // Recarrega página para aplicar estado
        window.location.reload();
    } catch (err) {
        authMsg.textContent = err.message;
        console.error(err);
    }
});
