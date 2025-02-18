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
  addTaskValidation();
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
    dNone("addTaskRequiredTitle");
    document.getElementById("addTaskTitle").classList.add("border_red");
    return false;
  }
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
    dNone("addTaskRequiredDueDate");
    document.getElementById("addTaskDate").classList.add("border_red");
    return false;
  }
  return true;
}


/**
 * Validates the task category
 * 
 * @returns {boolean} True if valid, false otherwise
 */
function validateCategory() {
  let category = document.getElementById("addTaskCategory").value;
  if (category === "") {
    dNone("addTaskRequiredCategory");
    document.getElementById("addTaskCategory").classList.add("border_red");
    return false;
  }
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
  return isValidTitle && isValidDueDate && isValidCategory;
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
