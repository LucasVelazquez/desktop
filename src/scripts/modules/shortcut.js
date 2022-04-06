import windowUI from "./windowUI.js";

let cvShortcut;
let cmdShortcut;
let projectFolder;

function init() {
  cvShortcut = document.getElementById("cv-shortcut");
  cmdShortcut = document.getElementById("cmd-shortcut");
  projectFolder = document.getElementById("projects-shortcut");
  addEvents();
}

function addEvents() {
  cvShortcut.addEventListener("dblclick", () => {
    window.open("./src/documents/cv-lucas-velazquez.pdf");
  });

  cmdShortcut.addEventListener("dblclick", () => {
    windowUI.openWindow("cmd-program");
  });

  projectFolder.addEventListener("dblclick", () => {
    windowUI.openWindow("project-folder");
  });
}

export default { init };
