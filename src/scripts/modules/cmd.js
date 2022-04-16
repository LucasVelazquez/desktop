let cmdScreen;
let enterCommandInput;

const predefinedMessages = [
  "Microsoft Windows [Version 10.0.448502.6584]",
  "(c) Microsoft Corporation. Reservados todos los derechos.",
  '"Escriba help para ver un listado de los comandos disponibles"',
];

function init() {
  cmdScreen = document.getElementById("cmd-screen");
  enterCommandInput = document.getElementById("enter-command-input");
  addEvents();
}

function addEvents() {
  cmdScreen.addEventListener("click", putFocusInCmdInput);
  cmdScreen.addEventListener("keyup", enterCommand);
}

function putFocusInCmdInput() {
  enterCommandInput.focus();
}

function enterCommand(e) {
  if (e.keyCode !== 13) return;

  let command = enterCommandInput.value;
  callFunction(command);
  clearCommandInput();
}

function callFunction(command) {
  switch (command) {
    case "":
      addLine();
      break;
    case "cls":
    case "clear":
      clearScreen();
      break;
    default:
      addLine(command, `'${command}' is not recognized as an internal or external command.`);
  }
}

function addLine(command = "", result = "") {
  let enterTextContainer = document.getElementById("enter-text");
  let commandExecuted = document.createElement("p");
  commandExecuted.textContent = enterTextContainer.firstElementChild.textContent + command;
  cmdScreen.insertBefore(commandExecuted, enterTextContainer);

  if (command.length > 0) {
    commandExecuted.style.marginTop = "10px";
    let commandResult = document.createElement("p");
    commandResult.textContent = result;
    cmdScreen.insertBefore(commandResult, enterTextContainer);
  }
}

function clearScreen() {
  while (cmdScreen.getElementsByTagName("p").length > 0) {
    cmdScreen.removeChild(cmdScreen.firstChild);
  }
}

function clearCommandInput() {
  enterCommandInput.value = "";
}

function setInitialMessage() {
  clearScreen();
  let enterTextContainer = document.getElementById("enter-text");

  const messagesLength = predefinedMessages.length - 1;
  for (let i = 0; i < messagesLength - 1; i++) {
    cmdScreen.insertBefore(createParagraph(predefinedMessages[i]), enterTextContainer);
  }

  cmdScreen.insertBefore(document.createElement("br"), enterTextContainer);
  cmdScreen.insertBefore(createParagraph(predefinedMessages[messagesLength]), enterTextContainer);
}

function createParagraph(text) {
  let paragraph = document.createElement("p");
  paragraph.appendChild(document.createTextNode(text));
  return paragraph;
}

export default { init, setInitialMessage };
