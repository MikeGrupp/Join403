/**
 *  Initializes the EditTask
 *
 * @param {string} taskId - The ID of the task
 */
function initRenderEditTask(taskId){
  let task = tasks[taskId];
  renderDetailEditTask(task,taskId)
  renderEditAccounts();
  renderEditSubtasks(task);
  renderPrio(task.prio);
  loadEditSubtasksArray();
}

/**
 * Renders the edit form for a task
 *
 * @param {string} taskId - The ID of the task
 */
function renderDetailEditTask(task,taskId) {
  let [day, month, year] = task.dueDate.split("/");
  let formattedDate = `${year}-${month}-${day}`;
  let container = document.getElementById("taskDetail");
  container.innerHTML = `${templateRenderDetailEditTask(
    taskId,
    task.titel,
    task.description,
    formattedDate
  )}`;
}

/**
 * Renders the assigned accounts in the edit form for a task
 */
function renderEditAccounts() {
  assignedContacts = [];
  assignedContacts = assignedAccounts;
  addedAccounts = assignedAccountsIds.length;
  let container = document.getElementById("assignedContactsContainer");
  let length = assignedAccountsIds.length < 6 ? assignedAccountsIds.length : 5;
  let notRendertAmount = assignedAccountsIds.length - 5;
  container.innerHTML = ``;
  for (let i = 0; i < length; i++) {
    let account = assignedAccounts[i];
    container.innerHTML += `
        <div class="task_account1 bg_${account.color}">${account.initials}</div>
      `;
  }
  assignedAccountsIds.length > 3 ? container.innerHTML += `<div class="task_account1 bg_grey">+${notRendertAmount}</div>`: "";
  renderDropdownContainerContacts();
}

/**
 * Checks the assigned contacts in the edit form
 */
function checkAssignedContacts() {
  let amountAssignedAccounts = assignedAccountsIds.length;
  for (let i = 0; i < amountAssignedAccounts; i++) {
    try {
      let account = assignedAccounts[i];
      let id = "checkbox" + account.id;
      let currentCheckBox = document.getElementById(id);
      currentCheckBox.checked = true;
    } catch (error) {}
  }
}

/**
 * Renders the subtasks in the edit form for a task
 *
 * @param {string} taskId - The ID of the task
 */
function renderEditSubtasks(task) {
  addTaskSubtasks = [];
  subtasks = task.subtasks;
  fetchSubTaskIds();
  for (let i = 0; i < subtasksIds.length; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    addTaskSubtasks.push(subtask.titel);
    renderSubtaskContainer();
    reRenderSubtask();
  }
}

/**
 * Edits an existing task
 *
 * @async
 * @param {string} taskId - The ID of the task to edit
 */
async function editTask(taskId) {
  await patchTask(taskId);
  await patchAssignedAccounts2(taskId);
  await patchSubtasks(taskId);
  tasks = await loadData("tasks/");
  reRenderBoard();
  taskMoveBack("taskDetail", "taskDetailBg");
  addTaskSubtasks = [];
}

/**
 * Updates an existing task with the provided details
 *
 * @async
 * @param {string} taskId - The ID of the task to be updated
 */
async function patchTask(taskId) {
  let dueDate = document.getElementById("addTaskDate").value;
  let [year, month, day] = dueDate.split("-");
  let formattedDate = `${day}/${month}/${year}`;
  await patchData("/tasks/" + taskId, {
    description: document.getElementById("addTaskDescription").value,
    titel: document.getElementById("addTaskTitle").value,
    prio: currentPrio,
    step: tasks[taskId].step,
    dueDate: formattedDate,
  });
}

/**
 * Updates the assigned accounts for a given task
 *
 * @async
 * @param {string|number} taskId - The ID of the task to update.  This should be a string or number
 *                             that can be coerced into a string for URL construction
 */
async function patchAssignedAccounts2(taskId) {
  await deleteData("/tasks/" + taskId + "/assignedAccounts");
  await postAssignedAccounts(taskId);
}

/**
 * Patches subtasks for a given task ID.  This function deletes existing subtasks
 * and then posts updated subtasks.
 *
 * @async
 * @param {string|number} taskId - The ID of the task for which to patch subtasks.
 *                             This can be a string or a number.
 */
async function patchSubtasks(taskId) {
  await deleteData("/tasks/" + taskId + "/subtasks");
  await postEditSubtasks(taskId);
}

/**
 * Posts edited subtasks for a given task ID
 *
 * @async
 * @param {string|number} taskId - The ID of the parent task.  Should be coercible to a string
 */
async function postEditSubtasks(taskId) {
  for (let i = 0; i < editSubtasks.length; i++) {
    let editSubtask = editSubtasks[i];
    let titel = editSubtask.titel;
    let status = editSubtask.status;
    await postData("/tasks/" + taskId + "/subtasks", {
      titel: titel,
      status: status,
    });
  }
}

/**
 * Loads and populates the `editSubtasks` array with subtask objects based on `subtasksIds`
 */
function loadEditSubtasksArray() {
  let amountSubtasks = subtasksIds.length;
  editSubtasks = [];
  for (let i = 0; i < amountSubtasks; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    editSubtasks.push(subtask);
  }
}
