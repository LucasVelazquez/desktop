import mysteriousChat from "./mysteriousChat.js";

const EXECUTED_COMMAND_CLASS = "executed-command";
let cmdScreen;
let enterCommandInput;
let passwordLabel;

const predefinedMessages = [
  "Microsoft Windows [Version 10.0.448502.6584]",
  "(c) Microsoft Corporation. Reservados todos los derechos.",
  '"Escriba help para ver un listado de los comandos disponibles"',
];

const notes = `Esta empresa es muy rara.
 Tienen muchos protocolos de seguridad y hay zonas en las que no puedo entrar...aun no se cual es mi trabajo realmente.
 A todo esto, no puedo recordar la contraseña para abrir la puerta principal. Recuerdo algo asi como que la contraseña era una palabra
 que estaba en un juego de vaqueros dentro de la carpeta "Programs and Stuffs".
 Debería echar un vistazo para ver si hay alguna palabra que resalte o algo asi.
 No entiendo por qué ocultan las contraseñas pero si no la encuentro pronto me meteré en problemas`;

let commandsEnabled = [
  { command: "clear", enabled: true },
  { command: "notes1", enabled: true },
  { command: "unlock-door", enabled: true, isOpened: false },
  { command: "open-security-room", enabled: false, isOpened: false },
];

let passwordMode = {
  command: "",
  active: false,
};

let lastCommandInserted = "";

function init() {
  cmdScreen = document.getElementById("cmd-screen");
  enterCommandInput = document.getElementById("enter-command-input");
  passwordLabel = document.getElementById("password-label");
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
  if (e.key !== "Enter") {
    if (e.key === "ArrowUp" && lastCommandInserted.length > 0 && lastCommandInserted !== enterCommandInput.value) {
      enterCommandInput.value = lastCommandInserted;
    }
    return;
  }

  let command = enterCommandInput.value.toLowerCase();
  if (passwordMode.active) {
    managePassword(command);
  } else {
    lastCommandInserted = command;
    callFunction(command);
  }
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
    case "help":
      addLine(command, createCommandsList());
      break;
    case "notes1":
      addLine(command, createParagraph(notes));
      break;
    case "unlock-door":
      let isOpened = commandsEnabled.find((el) => el.command === command).isOpened;
      if (isOpened) {
        addLine(command, createParagraph("La puerta ya se encuentra abierta."));
        return;
      }
      startPasswordMode(command);
      addLine(command);
      break;
    case "open-security-room":
      let securityRoomCommand = commandsEnabled.find((el) => el.command === command);
      if (!securityRoomCommand.enabled) {
        addLine(command, createParagraph("Usted no ha cumplido con los requisitos para acceder a este comando."));
        return;
      }

      if (securityRoomCommand.isOpened) {
        addLine(command, createParagraph("La puerta ya se encuentra abierta."));
        return;
      }

      startPasswordMode(command);
      addLine(command);
      break;
    default:
      addLine(command, createParagraph(`'${command}' no es un comando válido.`));
  }
}

function managePassword(password) {
  switch (passwordMode.command) {
    case "unlock-door":
      if (password.toLowerCase() !== "saloon") {
        addLine("Ingrese contraseña:", createParagraph("Contraseña incorrecta"));
      } else {
        addLine("Ingrese contraseña:", createParagraph("Puerta pincipal abierta.", "#20C20E"));
        let index = commandsEnabled.findIndex((el) => el.command === passwordMode.command);
        commandsEnabled[index].isOpened = true;
        mysteriousChat.startFirstChallenge().then(() => {
          let index = commandsEnabled.findIndex((el) => el.command === "open-security-room");
          commandsEnabled[index].enabled = true;
        });
      }
      break;
    case "open-security-room":
      if (password.toLowerCase() !== "solidity") {
        addLine("Ingrese contraseña:", createParagraph("Contraseña incorrecta"));
      } else {
        addLine("Ingrese contraseña:", createParagraph("Puerta de habitación desbloqueada.", "#20C20E"));
        let index = commandsEnabled.findIndex((el) => el.command === passwordMode.command);
        commandsEnabled[index].isOpened = true;
        mysteriousChat.startEnding();
      }
      break;
  }

  stopPasswordMode();
}

function startPasswordMode(command) {
  passwordMode.active = true;
  passwordMode.command = command;
  passwordLabel.style.display = "inline";
}

function stopPasswordMode() {
  passwordMode.active = false;
  passwordMode.command = "";
  passwordLabel.style.display = "none";
}

function addLine(command = "", resultElement = "") {
  let enterTextContainer = document.getElementById("enter-text");
  let commandExecuted = document.createElement("p");
  commandExecuted.textContent = enterTextContainer.firstElementChild.textContent + command;
  commandExecuted.style.marginTop = "10px";
  commandExecuted.className = EXECUTED_COMMAND_CLASS;
  cmdScreen.insertBefore(commandExecuted, enterTextContainer);

  if (resultElement != "") {
    cmdScreen.insertBefore(resultElement, enterTextContainer);
  }
  cmdScreen.scrollTop = cmdScreen.scrollHeight;

}

function clearScreen() {
  while (cmdScreen.getElementsByClassName(EXECUTED_COMMAND_CLASS).length > 0) {
    cmdScreen.removeChild(cmdScreen.firstChild);
  }
}

function clearCommandInput() {
  enterCommandInput.value = "";
}

function setInitialMessage() {
  stopPasswordMode();
  clearScreen();
  clearCommandInput();
  lastCommandInserted = "";
  let enterTextContainer = document.getElementById("enter-text");

  const messagesLength = predefinedMessages.length - 1;
  for (let i = 0; i < messagesLength; i++) {
    cmdScreen.insertBefore(createParagraph(predefinedMessages[i]), enterTextContainer);
  }

  cmdScreen.insertBefore(document.createElement("br"), enterTextContainer);
  cmdScreen.insertBefore(createParagraph(predefinedMessages[messagesLength]), enterTextContainer);
}

function createParagraph(text, color = "") {
  let paragraph = document.createElement("p");
  paragraph.className = EXECUTED_COMMAND_CLASS;

  if (color.length > 0) {
    paragraph.style.color = color;
  }

  paragraph.appendChild(document.createTextNode(text));
  return paragraph;
}

function createCommandsList() {
  let table = document.createElement("table");
  table.className = EXECUTED_COMMAND_CLASS + " command-list";

  let counter = 0;
  let actualRow = document.createElement("tr");

  for (let i = 0; i < commandsEnabled.length; i++) {
    if (commandsEnabled[i].enabled) {
      let textData = document.createElement("td");
      textData.appendChild(document.createTextNode(commandsEnabled[i].command));
      actualRow.appendChild(textData);

      if (++counter == 3) {
        counter = 0;
        table.appendChild(actualRow);
        actualRow = document.createElement("tr");
      }
    }
  }

  table.appendChild(actualRow);

  return table;
}

export default { init, setInitialMessage };
