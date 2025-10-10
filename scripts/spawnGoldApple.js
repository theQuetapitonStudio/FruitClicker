import { getYourFruit, setYourFruit, getMulti, setMulti, saveData } from "./index.js";

export function goldApple() {
    const atual = getYourFruit();

    // Pega os dados salvos
    const savedData = JSON.parse(localStorage.getItem("goldAppleData")) || {
        isGold: false,
        applied: false
    };

    // Se já é dourada, não reaplica o boost
    if (savedData.applied) return;

    // Aplica o multiplicador só uma vez
    setMulti(getMulti() * 1.5);

    // Define aparência dourada
    const goldVisual = {
        ...atual,
        nome: "Gold Apple",
        img: "./imgs/apple-gold.png",
        isGold: true
    };

    // Atualiza e salva os dados do jogador
    setYourFruit(goldVisual);
    saveData();

    // Marca no localStorage que o bônus já foi aplicado
    localStorage.setItem("goldAppleData", JSON.stringify({
        isGold: true,
        applied: true
    }));
}
