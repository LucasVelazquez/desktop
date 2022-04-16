import windowUI from "./windowUI.js";

const programId = "chat-program";
let chatProgram;
let windowScreen;
let chatStarted = false;

const initialMessages = [
  "Estoy infiltrado en una fábrica de zapatos que tiene encerrada a muchas personas para que trabajen las 24 horas.",
  "Incluido niños",
  "Necesito que me ayudes a liberarlos",
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
    showMessages(initialMessages)
      .then(() => delay(3000))
      .then(() => showMessages(initialMessages))
      .then(() => {
        console.log("ok");
      });
    //}, 9000);
  }, 1000);
}

function showMessages(messages) {
  return new Promise((resolve) => {
    function addMessage(index = 0) {
      if (index == messages.length) {
        resolve();
        return;
      }

      let time = Math.floor(Math.random() * 3) + 2;
      setTimeout(() => {
        let messageElement = document.createElement("p");
        messageElement.className = "message";
        messageElement.appendChild(document.createTextNode(messages[index]));
        windowScreen.appendChild(messageElement);
        addMessage(++index);
      }, time * 1000);
    }

    addMessage();
  });
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
export default { init, startChat };
