import { fruits } from "./fruits.list.js";

let HUD = document.getElementById("fruits-list");

function update() {
    requestAnimationFrame(update);
    
    // Limpa antes de redesenhar
    HUD.innerHTML = "";

    fruits.forEach(fruit => {
        let div = document.createElement("div");
        div.style.display = "inline-block";
        div.style.margin = "5px";
        div.style.textAlign = "center";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "8px";
        div.style.padding = "5px";
        div.style.width = "80px";

        let img = document.createElement("img");
        img.src = fruit.img;
        img.alt = fruit.nome;
        img.style.width = "50px";
        img.style.height = "50px";

        let name = document.createElement("div");
        name.textContent = fruit.nome;
        name.style.fontSize = "14px";
        name.style.color = fruit.isGold ? "gold" : "black";

        let cost = document.createElement("div");
        cost.textContent = `Custo: ${fruit.custo}`;
        cost.style.fontSize = "12px";
        cost.style.color = "#555";

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(cost);
        HUD.appendChild(div);
    });
}

update();
