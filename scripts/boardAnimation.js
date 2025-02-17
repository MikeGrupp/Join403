/**
 * Moves a task container forward
 *
 * @param {string} div - The ID of the task container
 */
function taskMoveForward(div) {
  let id = null;
  let container = document.getElementById(div);
  let pos = 0;
  let position = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  if (div === "taskDetail") {
    position = 35;
  }
  if (div === "addTaskBoard") {
    position = 50;
  }
  if (div === "taskDetail" && window.innerWidth < 1025) {
    position = 20;
  }
  if (div === "taskDetail" && window.innerWidth < 767) {
    position = 0;
  }
  if (div === "addTaskBoard" && window.innerWidth < 767) {
    window.open("task.html");
  }
  function frame() {
    if (pos == position) {
      clearInterval(id);
    } else {
      pos++;
      if (div === "taskDetail") {
        container.style.right = pos + "vw";
      }
      if (div === "addTaskBoard") {
        container.style.right = "calc(" + pos + "vw - 384px)";
      }
    }
  }
}

/**
 * Moves a task container backward
 *
 * @param {string} div - The ID of the task container
 * @param {string} bgDiv - The ID of the background div
 */
function taskMoveBack(div, bgDiv) {
  let id = null;
  let container = document.getElementById(div);
  let pos = 0;
  clearInterval(id);
  let position = 0;
  id = setInterval(frame, 1);
  if (div === "taskDetail") {
    position = 35;
  }
  if (div === "addTaskBoard") {
    position = 50;
  }
  if (div === "taskDetail" && window.innerWidth < 1025) {
    position = 20;
  }
  if (div === "taskDetail" && window.innerWidth < 767) {
    position = 0;
  }
  if (div === "addTaskBoard" && window.innerWidth < 767) {
    window.open("task.html");
  }
  function frame() {
    if (pos == position) {
      clearInterval(id);
      dNone(bgDiv);
    } else {
      pos++;
      if (div === "taskDetail") {
        container.style.right = -pos + "vw";
      }
      if (div === "addTaskBoard") {
        container.style.right = "calc( -" + pos + "vw - 384px)";
      }
    }
  }
}
