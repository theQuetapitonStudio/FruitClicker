import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { spawnLichia } from "./spawnLichia.js";
import { spawnEromadeite } from "./lucky-block-system.js";
import { setClicks, getClicks, getYourFruit , setYourFruit} from "./index.js";
import { spawnPT } from "./Potato-Truck.js";
import { admMessage } from "./admMSG.js"

const socket = io("https://fruitclicker-bdd-1.onrender.com");

const _p1 = "labatataH0SCH8DC9DH9C912723QDB";
const _p2 = "@@@362FD1102Y7E0H720H7E02H7EXH027DHY2H0X72E";
const _SECRET_TOKEN = _p1 + _p2;

window.admin = getAdminCommands;

// --- AUXILIARES ---

let currentMsg = null;

function _send(cmd, payload){ 
    socket.emit("adminCmd", { token: _SECRET_TOKEN, cmd, payload }); 
}

function localMsg(text, duration = 5000, color = "yellow") {
    // remove msg anterior, se ainda existir
    if (currentMsg) currentMsg.remove();

    const msg = document.createElement("div");
    currentMsg = msg;
    msg.textContent = text;

    Object.assign(msg.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 20px",
        background: "rgba(0,0,0,0.7)",
        color,
        fontWeight: "bold",
        borderRadius: "8px",
        zIndex: 9999,
        transition: "opacity 0.5s",
        opacity: 1
    });

    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.opacity = 0;
        setTimeout(() => {
            msg.remove();
            if (currentMsg === msg) currentMsg = null;
        }, 500);
    }, duration);
}

function onlineEvent(name, payload = {}) {
    socket.emit("adminCmd", { token: _SECRET_TOKEN, cmd: "event", payload: { name, ...payload } });
}

// --- RECEBE DO SERVIDOR ---

socket.on("globalEvent", ({ name, ...payload }) => {
    console.log("[Evento online]", name, payload);

    if(name === "spawnLichia") spawnLichia(payload?.duracao);
    if(name === "spawnEromadeite") spawnEromadeite(payload);
    if(name === "Potato-Truck") spawnPT(); 
    if(name === "setClicks") setClicks(payload.value);
    if(name === "setYourFruit") setYourFruit(payload.value);
});

// mensagens globais (agora não duplica mais)
socket.on("globalMsg", (text) => {
    admMessage(text, 5000, "white");
});

// --- ADMIN COMMANDS ---

export function getAdminCommands(secret){
    const _a = [108,124,122,118,124,113,118,104,118,79,57,55];
    const _k = String.fromCharCode(..._a.map(n => n - 7));
    if(secret !== _k) return null;
    window.getClicks = getClicks

    const cmds = {
        // mensagens globais
        msg: text => _send("msg", text), // só envia, servidor ecoa

        // eventos online
        lichia: () => onlineEvent("spawnLichia"),
        eromadeite: () => onlineEvent("spawnEromadeite"),
        potato_truck: () => onlineEvent("Potato-Truck"),

        // setters online
        setClicks: value => onlineEvent("setClicks", { value }),
        setYourFruit: value => onlineEvent("setYourFruit", { value }),

        // getters locais
        getClicks: () => getClicks(),
        getYourFruit: () => getYourFruit(),

        // só local
        localMsg: text => localMsg(text),
    };

    return new Proxy(cmds, {
        get(target, prop) {
            if(prop in target) return target[prop];
            console.warn(`Comando "${prop}" não encontrado.`);
            return () => {};
        },
        apply(target, thisArg, args) {
            return target[args[0]]?.(...args.slice(1));
        }
    });
}




