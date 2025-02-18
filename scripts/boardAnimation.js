/**
 * Moves a task container forward
 *
 * @param {string} div - The ID of the task container
 */
function taskMoveForward(div) {
  let id = null;
  let container = document.getElementById(div);
  let pos = 0;
  let position = calculatePosition(div);
  clearInterval(id);
  id = setInterval(frame, 1);
  if (div === "addTaskBoard" && window.innerWidth < 767) {
    window.open("task.html");
    window.close();
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
 * Calculates the target position for the container based on its ID and screen width.
 * @param {string} div - The ID of the task container
 * @returns {number} - The target position
 */
function calculatePosition(div) {
  if (div === "taskDetail") {
    if (window.innerWidth < 767) return 0;
    if (window.innerWidth < 1025) return 20;
    return 35;
  }
  if (div === "addTaskBoard") {
    return 50;
  }
  return 0; // Default fallback if the div is not recognized
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
  let position = calculatePosition(div);
  clearInterval(id);
  id = setInterval(frame, 1);
  if (div === "addTaskBoard" && window.innerWidth < 767) {
    window.open("task.html");
    window.close();
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