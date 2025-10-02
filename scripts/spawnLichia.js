import { setClicks } from "./index.js";
import { admMessage } from "./admMSG.js";
import { fruits } from "./fruits.list.js";

export function spawnLichia() {
    fruits.push({
        id: 23,
        nome: "Lichia",
        custo: 5000,
        power: 30,
        img: "./imgs/lichia.webp"
    })


    admMessage("A <strong style='color: yellow'>LICHIA</strong> foi adicionada!")
}

