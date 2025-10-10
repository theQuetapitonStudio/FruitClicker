import { getClicks, setClicks , getMulti} from "./index.js";
import { admMessage } from "./admMSG.js";
import { fruits } from "./fruits.list.js";

let lichiaId = 23;

export function spawnLichia(duracao = 5000) {
    const lichia = {
        id: lichiaId++,
        nome: "Lichia",
        custo: 5000,
        power: getMulti() * 1.1,
        img: "./imgs/lichia.webp"
    };

    fruits.push(lichia);

    // HTML com gradient animado
    const lichiaText = `
        <strong style="
            background: linear-gradient(270deg, #ff005c, #ffae00, #ff00f2);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            animation: moveGradient 3s ease infinite;
        ">LICHIA</strong>
    `;

    admMessage(`🍊 A ${lichiaText} foi adicionada! 🍊`);
}

// Adiciona a animação globalmente (só uma vez)
if (!document.getElementById("lichiaGradientStyle")) {
    const style = document.createElement("style");
    style.id = "lichiaGradientStyle";
    style.textContent = `
        @keyframes moveGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}
