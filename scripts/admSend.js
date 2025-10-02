import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
import { spawnLichia } from "./spawnLichia.js";

const socket = io("https://fruitclicker-bdd-1.onrender.com");

const _p1 = "labatataH0SCH8DC9DH9C912723QDB";
const _p2 = "@@@362FD1102Y7E0H720H7E02H7EXH027DHY2H0X72E";
const _SECRET_TOKEN = _p1 + _p2;

window.admin = getAdminCommands;

function _send(cmd, payload){ socket.emit("adminCmd", { token: _SECRET_TOKEN, cmd, payload }); }

export function getAdminCommands(secret){
  const _a = [108,124,122,118,124,113,118,104,118,79,57,55];
  const _k = String.fromCharCode(..._a.map(n=>n-7));
  if(secret !== _k) return null;
  window.lichia = ()=>spawnLichia();
  return {
    msg: text => _send("msg", text),
    event: name => _send("event", name),
    lichia: () => spawnLichia()
  };
}
