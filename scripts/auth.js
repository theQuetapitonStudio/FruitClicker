const API = "https://fruitclicker-bdd.onrender.com";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const authMsg = document.getElementById("authMsg");

// Função de autenticação (login ou registro)
async function authenticate(endpoint, username, password) {
    try {
        const res = await fetch(`${API}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw new Error(endpoint === "login" ? "Usuário ou senha incorretos" : "Erro ao registrar usuário");
        const data = await res.json();

        // Token e usuário ficam apenas na memória
        window.sessionToken = data.token;
        window.sessionUser = username;

        // Redireciona para index.js pegar o token e carregar dados
        window.location.href = "index.html";
    } catch (err) {
        authMsg.textContent = err.message;
        console.error(err);
    }
}

loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!username || !password) { authMsg.textContent = "Preencha usuário e senha!"; return; }
    authenticate("login", username, password);
});

registerBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    if (!username || !password) { authMsg.textContent = "Preencha usuário e senha!"; return; }
    authenticate("register", username, password);
});
