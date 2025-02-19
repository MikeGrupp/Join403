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
 * @param {string} site - Indicates whether the task is added from the board or the add task page ("board" or "addTask")
 */
async function addTask(site) {
  let validation = addTaskValidation();
  if (!validation) {
    return;
  }
  const taskId = await createTaskWithSubtasks();
  handlePostTaskSuccess(site, taskId);
}

/**
* Creates a new task and its associated subtasks
* 
* @async
* @returns {string} The ID of the created task
*/
async function createTaskWithSubtasks() {
  await postTask();
  tasks = await loadData("tasks/");
  fetchTaskIds();
  const taskId = tasksIds[tasksIds.length - 1];
  await postSubtask(taskId);
  await postAssignedAccounts(taskId);
  return taskId;
}

/**
* Handles successful task creation
* 
* @async
* @param {string} site - The site where the task was added from
* @param {string} taskId - The ID of the created task
*/
async function handlePostTaskSuccess(site, taskId) {
  clearAddTask();
  if (site === "board") {
      handleBoardSiteSuccess();
  } else if (site === "addTask") {
      handleAddTaskSiteSuccess();
  }
  createToast("successNewTask");
}

/**
* Handles success specifically for board site additions
*/
function handleBoardSiteSuccess() {
  tasksIds = [];
  fetchTaskIds();
  taskMoveBack("addTaskBoard", "addTaskBoardBg");
  reRenderBoard();
}

/**
* Handles success specifically for add task page additions
*/
function handleAddTaskSiteSuccess() {
  setTimeout(() => window.location.href = "./board.html", 925);
}

/**
 * Validates the task title
 * 
 * @returns {boolean} True if valid, false otherwise
 */
function validateTitle() {
  let title = document.getElementById("addTaskTitle").value;
  if (title === "") {
    document.getElementById("addTaskRequiredTitle").classList.remove("d-none");
    document.getElementById("addTaskTitle").classList.add("border_red");
    return false;
  }
  document.getElementById("addTaskRequiredTitle").classList.add("d-none");
  document.getElementById("addTaskTitle").classList.remove("border_red");
  return true;
}

/**
 * Validates the task due date
 * 
 * @returns {boolean} True if valid, false otherwise
 */
function validateDueDate() {
  let dueDate = document.getElementById("addTaskDate").value;
  if (dueDate === "") {
    document.getElementById("addTaskRequiredDueDate").classList.remove("d-none");
    document.getElementById("addTaskDate").classList.add("border_red");
    return false;
  }
  document.getElementById("addTaskRequiredDueDate").classList.add("d-none");
  document.getElementById("addTaskDate").classList.remove("border_red");
  return true;
}


/**
 * Validates the task category
 * 
 * @returns {boolean} True if valid, false otherwise
 */
function validateCategory() {
  if (category === "") {
    document.getElementById("addTaskRequiredCategory").classList.remove("d-none");
    document.getElementById("addTaskCategory").classList.add("border_red");
    return false;
  }
  document.getElementById("addTaskRequiredCategory").classList.add("d-none");
  document.getElementById("addTaskCategory").classList.remove("border_red");
  return true;
}

/**
 * Validates all input fields for adding a new task
 * 
 * @returns {boolean} True if all fields are valid, false otherwise
 */
function addTaskValidation() {
  let isValidTitle = validateTitle();
  let isValidDueDate = validateDueDate();
  let isValidCategory = validateCategory();
  return isValidTitle && isValidDueDate && isValidCategory === true ? true : false;
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
