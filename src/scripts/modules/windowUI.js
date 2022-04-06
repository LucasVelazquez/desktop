let windowElements = [];

function init() {
  windowElements = document.getElementsByClassName("window");
  addEvents();
}

function addEvents() {
  for (let i = 0; i < windowElements.length; i++) {
    windowElements[i].style.zIndex = 5;
    windowElements[i].addEventListener("click", putWindowToTop);
    makeWindowDraggable(windowElements[i], windowElements[i].firstElementChild);
    addCloseWindowEvent(windowElements[i].firstElementChild.lastElementChild);
  }
}

function makeWindowDraggable(element, header) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let programSection;

  header.addEventListener("mousedown", dragMouseDown);

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.className === "close-window-button") return;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    programSection = document.getElementById("programs-section");

    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("mouseup", closeDragElement);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.left =
      Math.max(
        -programSection.offsetLeft,
        Math.min(window.innerWidth - (element.offsetWidth + programSection.offsetLeft), element.offsetLeft - pos1)
      ) + "px";
    element.style.top =
      Math.max(
        -programSection.offsetTop,
        Math.min(window.innerHeight - (element.offsetHeight + programSection.offsetTop), element.offsetTop - pos2)
      ) + "px";
  }

  function closeDragElement() {
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("mouseup", closeDragElement);
  }
}

function addCloseWindowEvent(closeButton) {
  closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    let element = e.currentTarget.parentElement.parentElement;
    element.style.zIndex = 5;
    element.style.display = "none";
  });
}

function openWindow(programId) {
  let windowToOpen = document.getElementById(programId);
  if (windowToOpen.style.display == "block") return;

  let windowsOpenedZIndexValues = [];
  for (let i = 0; i < windowElements.length; i++) {
    if (windowElements[i].style.display == "block") {
      windowsOpenedZIndexValues.push(parseInt(windowElements[i].style.zIndex));
    }
  }

  if (windowsOpenedZIndexValues.length > 0) {
    windowToOpen.style.zIndex = Math.max(...windowsOpenedZIndexValues) + 1;
  }

  windowToOpen.style.display = "block";
}

function putWindowToTop(e) {
  let windowSelected = e.currentTarget;
  let windowsOpened = [];
  for (let i = 0; i < windowElements.length; i++) {
    if (windowElements[i].style.display == "block") {
      windowsOpened.push({ index: i, zIndex: parseInt(windowElements[i].style.zIndex) });
    }
  }

  if (windowsOpened.length == 1) return;
  let topWindow = windowsOpened.sort((a, b) => {
    return b.zIndex - a.zIndex;
  })[0];

  if (parseInt(windowSelected.style.zIndex) === topWindow.zIndex) return;

  let windowSelectedZindex = windowSelected.style.zIndex;
  windowSelected.style.zIndex = windowElements[topWindow.index].style.zIndex;
  windowElements[topWindow.index].style.zIndex = windowSelectedZindex;
}

export default { init, openWindow };
