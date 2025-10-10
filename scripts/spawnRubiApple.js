import { getYourFruit, setYourFruit, getMulti, setMulti, saveData } from "./index.js";

export function RubiApple() {
    const atual = getYourFruit();

    // Pega os dados salvos
    const savedData = JSON.parse(localStorage.getItem("goldAppleData")) || {
        isGold: false,
        applied: false
    };

    // Se já é dourada, não reaplica o boost
    if (savedData.applied) return;

    // Aplica o multiplicador só uma vez
    setMulti(getMulti() * 1.3);

    // Define aparência dourada
    const goldVisual = {
        ...atual,
        nome: "Rubi Apple",
        img: "./imgs/rubi-apple.webp",
        isGold: true
    };

    // Atualiza e salva os dados do jogador
    setYourFruit(goldVisual);
    saveData();

    // Marca no localStorage que o bônus já foi aplicado
    localStorage.setItem("RubiAppleData", JSON.stringify({
        isGold: true,
        applied: true
    }));
}
