import windowUI from "./modules/windowUI.js";
import cmd from "./modules/cmd.js";
import shortcut from "./modules/shortcut.js";
import welcomeScreen from "./modules/welcomeScreen.js";
import redButton from "./modules/redButton.js";
import mysteriousChat from "./modules/mysteriousChat.js";

function load() {
  console.log("%cHola, ¿Que estás haciendo aquí?", "font-size: 20px");
  console.log("%cEspero que no estes tratando de hacer trampa.", "font-size: 20px");
  console.log("%cNo arruines la diversión... cierra la consola.", "font-size: 20px");
  
  welcomeScreen.init();
  windowUI.init();
  cmd.init();
  shortcut.init();
  redButton.init();
  mysteriousChat.init();
}

window.addEventListener("load", load);
