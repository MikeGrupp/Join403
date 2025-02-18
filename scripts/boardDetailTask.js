/**
 *  Initializes the DetailTask
 *
 * @param {string} taskId - The ID of the task
 */
function initRenderDetailTask(taskId){
  let task = tasks[taskId];
  renderDetailTask(task, taskId);
  renderDetailAccounts(task, taskId);
  subtasks = task.subtasks;
  fetchSubTaskIds();
  renderDetailSubtasksContainer()
  renderDetailSubtasks(taskId);
  taskMoveForward("taskDetail");
}

/**
 * Renders the details of a task
 *
 * @param {string} taskId - The ID of the task
 */
function renderDetailTask(task, taskId) {
  let container = document.getElementById("taskDetail");
  container.innerHTML = `${templateRenderDetailTask(
    taskId,
    task.titel,
    task.description,
    task.category,
    getCategoryColor(task.category),
    task.prio,
    task.dueDate
  )}`;
}

/**
 * Renders the assigned accounts for a task in the detail view
 *
 * @param {object} task - The task object containing assigned accounts
 */
function renderDetailAccounts(task, taskId) {
  assignedAccounts = task.assignedAccounts;
  fetchAssignedAccountsIds();
  fetchAssignedAccounts();
  for (let i = 0; i < assignedAccountsIds.length; i++) {
    let account = assignedAccounts[i];
    document.getElementById("detailAssignedAccounts").innerHTML += `${templateRenderDetailAccounts(
      account.name,
      account.initials,
      account.color
    )}`;
  }
}

/**
 * Push assigned Accounts
 *
 */
function fetchAssignedAccounts(){
  assignedAccounts = [];
  for (let i = 0; i < assignedAccountsIds.length; i++) {
    let assignedAccountId = assignedAccountsIds[i];
    let assignedContact = storedContacts[assignedAccountId];
    assignedAccounts.push(assignedContact);
  }
}

/**
 * Renders the subtasks for a task in the detail view
 *
 * @param {string|number} taskId - The ID of the task
 */
function renderDetailSubtasks(taskId) {
  for (let i = 0; i < subtasksIds.length; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    let checked = subtask.status === "finished" ? "checked" : "open";
    document.getElementById("detailSubtasksContainer").innerHTML += `${templateRenderDetailSubtasks(
      subtask.titel,
      subtask.status,
      checked,
      taskId,
      subtaskId
    )}`;
  }
}

/**
 * render the container for the Subtasks
 */
function renderDetailSubtasksContainer() {
  if (subtasksIds.length > 0) {
    let container = document.getElementById("detailSubtasks");
    container.innerHTML = `
        <div class="detail_subtasks_headline">Subtasks</div>
        <div class="task_detail_subtasks_container" id="detailSubtasksContainer"></div>
      `;
  }
}

/**
 * Checks or unchecks a subtask and updates its status
 *
 * @param {string|number} taskId - The ID of the parent task
 * @param {string|number} subtaskId - The ID of the subtask
 */
function checkSubtask(taskId, subtaskId) {
  let status = tasks[taskId].subtasks[subtaskId].status;
  if (status !== "finished") {
    tasks[taskId].subtasks[subtaskId].status = "finished";
  } else {
    tasks[taskId].subtasks[subtaskId].status = "open";
  }
  reRenderBoard();
  patchStatusSubtask(taskId, subtaskId);
}

/**
 * Patches the status of a subtask on the database
 *
 * @async
 * @param {string|number} taskId - The ID of the parent task
 * @param {string|number} subtaskId - The ID of the subtask
 */
async function patchStatusSubtask(taskId, subtaskId) {
  let subtask = tasks[taskId].subtasks[subtaskId];
  contentSubtaskStatus = subtask.status;
  await patchData("/tasks/" + taskId + "/subtasks/" + subtaskId, {
    status: contentSubtaskStatus,
  });
}

/**
 * Deletes a task from the tasks data
 *
 * @async
 * @param {string|number} taskId - The ID of the task to delete
 */
async function deleteTaskFromTasks(taskId) {
  tasks = await loadData("tasks/");
  if (tasks.hasOwnProperty(taskId)) {
    await deleteExistingTask(taskId);
    createToast("successDeleteTask");
    taskMoveBack();
    setTimeout(function () {
      window.location.href = "./board.html";
    }, 800);
  }
}

/**
 * Deletes an existing task
 *
 * @async
 * @param {string|number} taskId - The ID of the task to delete
 * @returns {Promise<string|number>} The ID of the deleted task
 */
async function deleteExistingTask(taskId) {
  await deleteTask(taskId);
  return taskId;
}

/**
 * Deletes a task from the database
 *
 * @async
 * @param {string|number} taskId - The ID of the task to delete
 * @returns {Promise<any>} The response from the database
 */
async function deleteTask(taskId) {
  return await deleteData("/tasks/" + taskId);
}
