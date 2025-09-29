import { getClicks, addClicks } from "./index.js";

let coconutClicks = 0;

const coconut = document.createElement("img");
coconut.src = "./imgs/coconut.png";
coconut.style.position = "absolute";
coconut.style.width = "100px";
coconut.style.height = "100px";
document.body.appendChild(coconut);

const clickDisplay = document.createElement("div");
clickDisplay.style.position = "fixed";
clickDisplay.style.top = "10px";
clickDisplay.style.left = "10px";
clickDisplay.style.fontSize = "20px";
clickDisplay.style.color = "black";
clickDisplay.textContent = `Clicks: ${getClicks()}`;
document.body.appendChild(clickDisplay);

function moveCoconut() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    coconut.style.left = `${x}px`;
    coconut.style.top = `${y}px`;
}

coconut.addEventListener("click", () => {
    coconutClicks++;
    if (coconutClicks >= 5) {
        const bonus = Math.floor(getClicks() / 2);
        addClicks(bonus);
        coconutClicks = 0;
        clickDisplay.textContent = `Clicks: ${getClicks()}`;
    }
    moveCoconut();
});

moveCoconut();
