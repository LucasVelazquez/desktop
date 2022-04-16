import windowUI from "./windowUI.js";

let cvShortcut;
let cmdShortcut;
let projectFolderShortcut;
let pushButtonShortcut;

function init() {
  cvShortcut = document.getElementById("cv-shortcut");
  cmdShortcut = document.getElementById("cmd-shortcut");
  projectFolderShortcut = document.getElementById("projects-shortcut");
  pushButtonShortcut = document.getElementById("push-button-shortcut");
  addEvents();
}

function addEvents() {
  cvShortcut.addEventListener("dblclick", () => {
    window.open("./src/documents/cv-lucas-velazquez.pdf");
  });

  cmdShortcut.addEventListener("dblclick", () => {
    windowUI.openWindow("cmd-program");
  });

  projectFolderShortcut.addEventListener("dblclick", () => {
    windowUI.openWindow("project-folder");
  });

  pushButtonShortcut.addEventListener("dblclick", () => {
    windowUI.openWindow("button-program");
  });
}

export default { init };
