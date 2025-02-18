/**
 * An array of task IDs that match the search criteria
 *
 * @type {Array<string>}
 */
let searchTasks = [];

/**
 * Searches for tasks based on the search term
 */
function search() {
  let filterword = document.getElementById("taskSearch").value.toLowerCase();
  let length = filterword.length;
  searchTasks = [];
  fetchTaskIds();
  length === 0 ? document.getElementById("BoardRequiredSearch").classList.add("d-none") : searchFilter(filterword);
  reRenderBoard();
}

/**
 * filter for tasks based on the search term
 */
function searchFilter(filterword) {
  searchTasks = tasksIds.filter(taskId => 
    tasks[taskId].titel.toLowerCase().includes(filterword) || 
    tasks[taskId].description.toLowerCase().includes(filterword)
  );
  document.getElementById("BoardRequiredSearch").classList.add("d-none");
  tasksIds = searchTasks;
  searchTasks.length === 0 ? dNone("BoardRequiredSearch") : "";
}

document.addEventListener("keydown", function (event) {
  try {
    if (event.key === "Enter") {
      search();
    }
  } catch (error) {}
});

/**
 * Re-renders the board
 *
 * @async
 */
async function reRenderBoard() {
  document.getElementById("boardTodo").innerHTML = ``;
  document.getElementById("boardInProgress").innerHTML = ``;
  document.getElementById("boardAwaitFeedback").innerHTML = ``;
  document.getElementById("boardDone").innerHTML = ``;
  arrayTodo = 0;
  arrayInProgresse = 0;
  arrayAwaitFeedback = 0;
  arrayDone = 0;
  renderBoard();
}
