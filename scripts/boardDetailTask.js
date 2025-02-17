/**
 * Renders the details of a task
 *
 * @param {string} taskId - The ID of the task
 */
function renderDetailTask(taskId) {
  let task = tasks[taskId];
  let title = task.titel;
  let description = task.description;
  let category = task.category;
  let backgroundColorCategory = null;
  let prio = task.prio;
  let dueDate = task.dueDate;
  if (category === "Technical Task") {
    backgroundColorCategory = "#1fd7c1";
  } else {
    backgroundColorCategory = "#0038ff";
  }
  let container = document.getElementById("taskDetail");
  container.innerHTML = `${templateRenderDetailTask(
    taskId,
    title,
    description,
    category,
    backgroundColorCategory,
    prio,
    dueDate
  )}`;
  renderDetailAccounts(task);
  renderDetailSubtasks(taskId);
  taskMoveForward("taskDetail");
}

/**
 * Renders the assigned accounts for a task in the detail view
 *
 * @param {object} task - The task object containing assigned accounts
 */
function renderDetailAccounts(task) {
  assignedAccounts = task.assignedAccounts;
  fetchAssignedAccountsIds();
  assignedAccounts = [];
  for (let i = 0; i < assignedAccountsIds.length; i++) {
    let assignedAccountId = assignedAccountsIds[i];
    let assignedContact = storedContacts[assignedAccountId];
    assignedAccounts.push(assignedContact);
  }
  let amountAssignedAccounts = assignedAccountsIds.length;

  for (let i = 0; i < amountAssignedAccounts; i++) {
    let account = assignedAccounts[i];
    let name = account.name;
    let initials = account.initials;
    let backgroundColor = account.color;
    let container = document.getElementById("detailAssignedAccounts");
    container.innerHTML += `${templateRenderDetailAccounts(
      name,
      initials,
      backgroundColor
    )}`;
  }
}

/**
 * Renders the subtasks for a task in the detail view
 *
 * @param {string|number} taskId - The ID of the task
 */
function renderDetailSubtasks(taskId) {
  task = tasks[taskId];
  subtasks = task.subtasks;
  fetchSubTaskIds();
  let amountSubtasks = subtasksIds.length;

  if (amountSubtasks > 0) {
    let container = document.getElementById("detailSubtasks");
    container.innerHTML = `
        <div class="detail_subtasks_headline">Subtasks</div>
        <div class="task_detail_subtasks_container" id="detailSubtasksContainer"></div>
      `;
  }

  for (let i = 0; i < amountSubtasks; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    let title = subtask.titel;
    let status = subtask.status;
    let checked;
    if (status === "finished") {
      checked = "checked";
    }
    let container = document.getElementById("detailSubtasksContainer");
    container.innerHTML += `${templateRenderDetailSubtasks(
      title,
      status,
      checked,
      taskId,
      subtaskId
    )}`;
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
