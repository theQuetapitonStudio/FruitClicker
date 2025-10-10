import { setClicks, getClicks } from "./index.js";
import { admMessage } from "./admMSG.js";

export function DobroClicks(tempo = 10000) {
    console.log("[DobroClicks] Ativado por", tempo, "ms");

    admMessage("🤑 DDEV ATIVOU <strong style='color: #00ff00;'>2X CLICKS</strong> COM SUCESSO!🤑")

    // Bloqueia updates do servidor enquanto o efeito está ativo
    window.ignoreServerUpdates = true;

    // Intervalo que dobra os clicks a cada 0.5s
    const interval = setInterval(() => {
        const atual = getClicks();
        const novo = atual * 1.1;
        setClicks(novo);
        console.log(`[DobroClicks] ${atual} → ${novo}`);
    }, 500);

    // Desativa após o tempo definido
    setTimeout(() => {
        clearInterval(interval);
        window.ignoreServerUpdates = false;
        console.log("[DobroClicks] Finalizado");
    }, tempo);
}
