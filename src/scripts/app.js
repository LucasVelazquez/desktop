import windowUI from "./modules/windowUI.js";
import cmd from "./modules/cmd.js";
import shortcut from "./modules/shortcut.js";

function load() {
  windowUI.init();
  cmd.init();
  shortcut.init();
}

window.addEventListener("load", load);
