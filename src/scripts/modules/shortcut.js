import windowUI from "./windowUI.js";

let cvShortcut;
let cmdShortcut;

function init() {
  cvShortcut = document.getElementById("cv-shortcut");
  cmdShortcut = document.getElementById("cmd-shortcut");
  addEvents();
}

function addEvents() {
  cvShortcut.addEventListener("dblclick", () => {
    window.open("./src/documents/cv-lucas-velazquez.pdf");
  });

  cmdShortcut.addEventListener("dblclick", () => {
    windowUI.openWindow("cmd-program");
  });
}

export default { init };
