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
  //welcomeScreen.init();
  
  /*Solo para desarrollo*/
  document.getElementById("welcome-screen").style.display = "none";
  document.querySelector("html").style.background =
    "url('src/images/windows-background.jpg') no-repeat center center fixed";
  document.querySelector("html").style.backgroundSize = "cover";
  document.getElementById("container").style.display = "block";
  /**/

  windowUI.init();
  cmd.init();
  shortcut.init();
  redButton.init();
  mysteriousChat.init();
}

window.addEventListener("load", load);
