import windowUI from "./modules/windowUI.js";
import cmd from "./modules/cmd.js";
import shortcut from "./modules/shortcut.js";
import welcomeScreen from "./modules/welcomeScreen.js";

function load() {
  welcomeScreen.init();
  windowUI.init();
  cmd.init();
  shortcut.init();
}

window.addEventListener("load", load);
