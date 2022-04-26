import windowUI from "./windowUI.js";
import redButton from "./redButton.js";

const programId = "chat-program";
let chatProgram;
let windowScreen;
let chatStarted = false;

const initialMessages = [
  "Estoy infiltrado en un laboratorio que tiene encerrada a muchas personas para usarlas de conejillos de indias en pruebas biológicas.",
  "Necesito que me ayudes a liberarlos",
  "Estoy parado en frente de una puerta cerrada. Busca pistas en el escritorio para poder abrirla. Te avisaré cuando lo logres.",
];

const firstChallenge = [
  "Genial lo has conseguido, he podido entrar. Veo una habitación cerrada, al parecer hay muchas personas atrapadas",
  'Uno de mis compañeros ha podido dejar un curriculum en el escritorio con la contraseña. Me dijo que es la última tecnología de la columna "Backend"',
  "Creo que puedo hackear el sistema para habilitarte el comando de la puerta de la habitación.",
  "Listo, revisa la consola. Ya deberías tener acceso.",
];

const finalMessage = ["Ok, la puerta se abrió. Voy a liberar a los prisioneros"];

const goodEnding = [
  "Estan todos bien por suerte, todo esto no hubiera sido posible gracias a ti, usuario misterioso. Haz salvado miles de vidas hoy. Espero podamos conocernos algún día. Adiós",
  "--- CONNECTION LOST ---",
];

const badEnding = [
  "Oh por Dios, esto es un desatre. Hay sangre por todos lados.",
  "Los prisioneros tienen un dispositivo conectado a sus cuellos",
  "Espera...",
  "Por favor dime que no presionaste el botón rojo del escritorio. Al parecer era el detonador de estas bombas.",
  "Dios mio. Esto es un desastre, todos están muertos gracias a ti.",
  "Cuando vengan a buscarme seré ejecutado en mi país por haber fracasado en la misión de rescate.",
  "Espero puedas superarlo, yo no podría. Adiós",
  "--- CONNECTION LOST ---",
];

function init() {
  chatProgram = document.getElementById(programId);
  windowScreen = chatProgram.lastElementChild;
}

function startChat() {
  if (chatStarted) return;
  chatStarted = true;
  setTimeout(() => {
    windowUI.openWindow(programId);
    showMessages(initialMessages);
  }, 9000);
}

function startFirstChallenge() {
  return showMessages(firstChallenge, "#368bc7");
}

function startEnding() {
  let counter = redButton.getCounter();
  showMessages(finalMessage)
    .then(() => delay(4))
    .then(() => {
      let endingMessage = counter > 0 ? badEnding : goodEnding;
      return showMessages(endingMessage);
    });
}

function showMessages(messages, messageBackgroundColor = "") {
  return new Promise((resolve) => {
    function addMessage(index = 0) {
      if (index == messages.length) {
        resolve();
        return;
      }

      let time = Math.floor(Math.random() * 3) + 1;
      setTimeout(() => {
        let messageElement = document.createElement("p");
        messageElement.className = "message";

        if (messageBackgroundColor.length > 0) {
          messageElement.style.backgroundColor = messageBackgroundColor;
        }

        messageElement.appendChild(document.createTextNode(messages[index]));
        windowScreen.appendChild(messageElement);
        windowScreen.scrollTop = windowScreen.scrollHeight;
        addMessage(++index);
      }, time * 1000);
    }

    addMessage();
  });
}

function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 * seconds);
  });
}
export default { init, startChat, startFirstChallenge, startEnding };
