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
  tasksIds = [];
  fetchTaskIds();
  if (length === 0) {
    document.getElementById("taskSearch").value = "";
    document.getElementById("BoardRequiredSearch").classList.add("d-none");
    reRenderBoard();
  } else if (length > 0) {
    for (let i = 0; i < tasksIds.length; i++) {
      let taskId = tasksIds[i];
      let title = tasks[taskId].titel.toLowerCase();
      let description = tasks[taskId].description.toLowerCase();
      if (title.includes(filterword) || description.includes(filterword)) {
        searchTasks.push(taskId);
      }
    }
    document.getElementById("BoardRequiredSearch").classList.add("d-none");
    tasksIds = searchTasks;
    reRenderBoard();
    if (searchTasks.length === 0) {
      dNone("BoardRequiredSearch");
      document.getElementById("BoardRequiredSearch").classList.remove("d-none");
    }
  }
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
