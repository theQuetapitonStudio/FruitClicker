import { getClicks, setClicks, getYourFruit, setYourFruit } from "./index.js";
import { fruits } from "./fruits.list.js";
import { admMessage } from "./admMSG.js";
import { saveData } from "./index.js";

export let lucky_block_fruits = [
    { id: 1, nome: "Açai", chance: 3, power: 2, img: "./imgs/lb-fruits/acai.webp" },
    { id: 2, nome: "Carambola", chance: 2, power: 3, img: "./imgs/lb-fruits/carambola.png" },
    { id: 3, nome: "Maçã roxa", chance: 0.5, power: 10, img: "./imgs/lb-fruits/purple-apple.png" }
];

export function sortearfruita() {
    let totalChance = lucky_block_fruits.reduce((acc, f) => acc + f.chance, 0);
    let nrandom = Math.random() * totalChance;
    for (let fruta of lucky_block_fruits) {
        if (nrandom < fruta.chance) return fruta;
        nrandom -= fruta.chance;
    }
}

export function buyLuckyBlock() {
    if (getClicks() < 500) return admMessage("Você precisa de 500 clicks!", 3000, "red");

    setClicks(getClicks() - 500);

    const fruta = sortearfruita();
    const atual = getYourFruit();

    const goldBonus = window.goldBonus || 1;

    const newFruit = {
        id: atual.id + 1,
        nome: fruta.nome,
        custo: getClicks() + 1,
        power: (fruta.power + atual.power) * goldBonus, // mantém o bônus
        img: fruta.img,
        isGold: false,
    };

    setYourFruit(newFruit);
    saveData();
    admMessage(`🍀 Você ganhou ${fruta.nome}!`, 4000, "yellow");
}
