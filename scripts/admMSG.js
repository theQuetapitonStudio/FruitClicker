export function admMessage(message, duration = 10000, color = "white") {
    let msg = document.createElement("div");
    msg.innerHTML = "<strong style='color: blue;'>Quetapiton: </strong> " + message;
    msg.style.position = "fixed";
    msg.style.top = "20px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.color = color;
    msg.style.background = "rgba(0, 0, 0, 1)";
    msg.style.padding = "10px 20px";
    msg.style.borderRadius = "8px";
    msg.style.fontFamily = "sans-serif";
    msg.style.fontSize = "16px";
    msg.style.opacity = "0";
    msg.style.transition = "opacity 0.5s ease";

    document.body.appendChild(msg);

    requestAnimationFrame(() => {
        msg.style.opacity = "1";
    });

    setTimeout(() => {
        msg.style.opacity = "0";
        msg.addEventListener("transitionend", () => {
            msg.remove();
        }, { once: true });
    }, duration);
}
