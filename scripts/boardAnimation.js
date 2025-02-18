/**
 * Moves a task container forward
 *
 * @param {string} div - The ID of the task container
 */
function taskMoveForward(div) {
  let container = document.getElementById(div);
  let position = calculatePosition(div);
  if (div === "addTaskBoard" && window.innerWidth < 767) {
    window.open("task.html");
    window.close();
    return;
  }
  frameMoveForward(container, position, div);
}

/**
 * Animates the task container movement
 * @param {HTMLElement} container - The task container element
 * @param {number} position - The target position
 * @param {string} div - The ID of the task container
 */
function frameMoveForward(container, position, div) {
  let pos = 0;
  let id = setInterval(() => {
    if (pos == position) {
      clearInterval(id);
    } else {
      pos++;
      container.style.right = div === "taskDetail" ? pos + "vw" : "calc(" + pos + "vw - 384px)";
    }
  }, 1);
}

/**
 * Calculates the target position for the container based on its ID and screen width
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
  let container = document.getElementById(div);
  let position = calculatePosition(div);
  if (div === "addTaskBoard" && window.innerWidth < 767) {
    window.open("task.html");
    window.close();
    return;
  }
  frameMoveBack(container, position, div, bgDiv);
}

/**
 * Animates the task container movement
 * @param {HTMLElement} container - The task container element
 * @param {number} position - The target position
 * @param {string} div - The ID of the task container
 * @param {string} bgDiv - The ID of the background div
 */
function frameMoveBack(container, position, div, bgDiv) {
  let pos = 0;
  let id = setInterval(() => {
    if (pos == position) {
      clearInterval(id);
      dNone(bgDiv);
    } else {
      pos++;
      container.style.right = div === "taskDetail" ? -pos + "vw" : "calc( -" + pos + "vw - 384px)";
    }
  }, 1);
}