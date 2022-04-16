let counter = 0;
let counterText;
let button;
function init() {
  counterText = document.getElementById("button-program-counter");
  button = document.getElementById("button-program-button");
  addEvents();
}

function addEvents() {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    counterText.textContent = ++counter;
  });
}

function getCounter() {
  return counter;
}

export default { init, getCounter };
