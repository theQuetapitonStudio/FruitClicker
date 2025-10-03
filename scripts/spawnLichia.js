import { getClicks, setClicks , getMulti} from "./index.js";
import { admMessage } from "./admMSG.js";
import { fruits } from "./fruits.list.js";

let lichiaId = 23;


export function spawnLichia(duracao = 5000) {
    const lichia = {
        id: lichiaId++,
        nome: "Lichia",
        custo: 5000,
        power: getMulti() * 1.01,
        img: "./imgs/lichia.webp"
    };

    fruits.push(lichia);
    admMessage("A <strong style='color: yellow'>LICHIA</strong> foi adicionada!");

    setTimeout(() => {
        const index = fruits.findIndex(f => f.id === lichia.id);
        if (index !== -1) {
            fruits.splice(index, 1);

            if (currentFruit && currentFruit.id === lichia.id) {
                currentFruit = fruits[0]; 
            }

            admMessage("A <strong style='color: yellow'>LICHIA</strong> sumiu!");
        }
    }, duracao);
}
