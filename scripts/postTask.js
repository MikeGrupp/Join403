/**
 * Boolean to track the validation status of a task form
 *
 * @type {boolean}
 */
let validation = false;

/**
 * Adds a new task
 *
 * @async
 * @param {string} side - Indicates whether the task is added from the board or the add task page ("board" or "addTask")
 */
async function addTask(side) {
  addTaskValidation();
  if (validation) {
    await postTask();
    tasks = await loadData("tasks/");
    fetchTaskIds();
    let taskId = tasksIds[tasksIds.length - 1];
    await postSubtask(taskId);
    await postAssignedAccounts(taskId);
    clearAddTask();
    if (side === "board") {
      tasksIds = [];
      fetchTaskIds();
      taskMoveBack("addTaskBoard", "addTaskBoardBg");
      reRenderBoard();
    }
    createToast("successNewTask");
    if (side === "addTask") {
      setTimeout(() => window.location.href = "./board.html", 925);
    }
  }
}

/**
 * Validates the input fields for adding a new task
 * Checks if the title, due date, and category are filled
 * Displays error messages and highlights invalid fields if necessary
 */
function addTaskValidation() {
  let title = document.getElementById("addTaskTitle").value;
  let dueDate = document.getElementById("addTaskDate").value;
  if (title === "") {
    dNone("addTaskRequiredTitle");
    document.getElementById("addTaskTitle").classList.add("border_red");
  } else if (dueDate === "") {
    dNone("addTaskRequiredDueDate");
    document.getElementById("addTaskDate").classList.add("border_red");
  } else if (category === "") {
    dNone("addTaskRequiredCategory");
    document.getElementById("addTaskCategory").classList.add("border_red");
  } else {
    validation = true;
  }
}

/**
 * Posts a new task to the Database
 *
 * @async
 */
async function postTask() {
  let dueDate = document.getElementById("addTaskDate").value;
  let [year, month, day] = dueDate.split("-");
  let formattedDate = `${day}/${month}/${year}`;
  await postData("/tasks", {
    description: document.getElementById("addTaskDescription").value,
    category: category,
    titel: document.getElementById("addTaskTitle").value,
    prio: currentPrio,
    step: step,
    dueDate: formattedDate,
  });
}

/**
 * Posts assigned account data to a specific task
 *
 * @async
 * @param {string|number} taskId - The ID of the task to which the accounts are assigned.  This could be a string or number.
 */
async function postAssignedAccounts(taskId) {
  for (let i = 0; i < assignedContacts.length; i++) {
    let contact = assignedContacts[i];
    await patchData("/tasks/" + taskId + "/assignedAccounts/" + contact.id, {
      name: contact.name,
      initials: contact.initials,
      color: contact.color,
      id: contact.id,
    });
  }
}

/**
 * Posts subtasks for a given task ID
 *
 * @async
 * @param {string|number} taskId - The ID of the parent task
 */
async function postSubtask(taskId) {
  for (let i = 0; i < addTaskSubtasks.length; i++) {
    let title = addTaskSubtasks[i];
    await postData("/tasks/" + taskId + "/subtasks", {
      titel: title,
      status: "open",
    });
  }
}
