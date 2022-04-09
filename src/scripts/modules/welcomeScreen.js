let welcomeScreen;
let windowScreen;

function init() {
  welcomeScreen = document.getElementById("welcome-screen");
  windowScreen = document.getElementById("container");

  setTimeout(() => {
    welcomeScreen.style.display = "none";
    windowScreen.style.display = "block";
  }, 3800);
}

export default { init };
