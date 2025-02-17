/**
 * The ID of the currently dragged element
 *
 * @type {string}
 */
let currentDraggedElement;

/**
 * Moves a task to a different category
 *
 * @async
 * @param {string} category - The category to move the task to
 */
async function moveTo(category) {
  removeHighlight("boardTodo");
  removeHighlight("boardInProgress");
  removeHighlight("boardAwaitFeedback");
  removeHighlight("boardDone");
  removeHighlightBorder();
  tasks[currentDraggedElement]["step"] = category;
  await patchStep(currentDraggedElement);
  reRenderBoard();
}

/**
 * Updates the step of a task on the database
 *
 * @async
 * @param {string} taskId - The ID of the task to update
 */
async function patchStep(taskId) {
  let task = tasks[taskId];
  contentStep = task.step;
  await patchData("/tasks/" + taskId, {
    step: contentStep,
  });
}

/**
 * Sets the ID of the currently dragged element
 *
 * @param {string} id - The ID of the dragged element
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Allows drop of an element
 *
 * @param {DragEvent} ev - The drag event
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Highlights a drag area
 *
 * @param {string} id - The ID of the element to highlight
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Removes the highlight from a drag area
 *
 * @param {string} id - The ID of the element to remove the highlight from
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * Removes the highlight border from all drag areas
 */
function removeHighlightBorder() {
  document
    .getElementById("boardTodo")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById("boardInProgress")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById("boardAwaitFeedback")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById("boardDone")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById(currentDraggedElement)
    .classList.remove("animation_task_drag_and_drop");
}

/**
 * Highlights the border of all drag areas
 */
function highlightBorder() {
  document
    .getElementById("boardTodo")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById("boardInProgress")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById("boardAwaitFeedback")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById("boardDone")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById(currentDraggedElement)
    .classList.add("animation_task_drag_and_drop");
}
