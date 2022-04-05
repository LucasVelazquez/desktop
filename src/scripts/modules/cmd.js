let cmdScreen;
let enterCommandInput;

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

export default { init };
