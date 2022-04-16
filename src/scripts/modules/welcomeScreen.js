function init() {
  let welcomeScreen = document.getElementById("welcome-screen");
  let windowScreen = document.getElementById("container");
  let htmlElement = document.querySelector("html");

  setTimeout(() => {
    welcomeScreen.style.display = "none";
    htmlElement.style.background = "url('src/images/windows-background.jpg') no-repeat center center fixed";
    htmlElement.style.backgroundSize = "cover";
    windowScreen.style.display = "block";
  }, 3800);
}

export default { init };
