/**
 * An array of task objects
 *
 * @type {Array<Object>}
 */
let tasks = [];

/**
 * An array of task IDs
 *
 * @type {Array<string>}
 */
let tasksIds = [];

/**
 * An array of subtask objects
 *
 * @type {Array<Object>}
 */
let subtasks = [];

/**
 * An array of subtask IDs
 *
 * @type {Array<string>}
 */
let subtasksIds = [];

/**
 * An array of finished subtask objects
 *
 * @type {Array<Object>}
 */
let subtaskFinished = [];

/**
 * An array of assigned account objects
 *
 * @type {Array<Object>}
 */
let assignedAccounts = [];

/**
 * An array of assigned account IDs
 *
 * @type {Array<string>}
 */
let assignedAccountsIds = [];

/**
 * The number of tasks in the "Todo" category
 *
 * @type {number}
 */
let arrayTodo = 0;

/**
 * The number of tasks in the "In Progress" category
 *
 * @type {number}
 */
let arrayInProgresse = 0;

/**
 * The number of tasks in the "Await Feedback" category
 *
 * @type {number}
 */
let arrayAwaitFeedback = 0;

/**
 * The number of tasks in the "Done" category
 *
 * @type {number}
 */
let arrayDone = 0;

/**
 * Initializes the board by loading task data, fetching task IDs, and rendering the board
 *
 * @async
 */
async function initBoard() {
  tasks = await loadData("tasks/");
  fetchTaskIds();
  renderBoard();
}

/**
 * Renders the board by counting tasks, rendering the "no task" messages, and rendering each task
 *
 * @async
 */
async function renderBoard() {
  boardNoTask();
  for (let i = 0; i < tasksIds.length; i++) {
    let taskId = tasksIds[i];
    let task = tasks[taskId];
    subtasks = task.subtasks;
    assignedAccounts = task.assignedAccounts;
    fetchBoardIds();
    fetchSubTaskFinished();
    renderTasks(task, taskId);
    renderSubtasks(taskId);
    renderZeroAssignedAccounts(taskId);
  }
}

/**
 * fetch Board Ids
 */
function fetchBoardIds() {
  fetchSubTaskIds();
  fetchAssignedAccountsIds();
}

/**
 * Renders if no task the Container NoTask
 */
function boardNoTask() {
  countNoTask();
  renderNoTask();
}

/**
 * Renders a task on the board
 *
 * @async
 * @param {Object} task - The task object
 * @param {string} taskId - The ID of the task
 */
async function renderTasks(task, taskId) {
  let step = "board" + task.step;
  let container = document.getElementById(step);
  container.innerHTML += `${templateRenderTask(
    task.titel,
    task.description,
    task.category,
    taskId,
    getCategoryColor(task.category),
    task.prio
  )}`;
}

/**
 * Determines the background color based on the task category
 * @param {string} category - The category of the task
 * @returns {string} - The background color for the category
 */
function getCategoryColor(category) {
  return category === "Technical Task" ? "#1fd7c1" : "#0038ff";
}

/**
 * Renders the subtasks for a given task
 *
 * @param {string} taskId - The ID of the task
 */
function renderSubtasks(taskId) {
  let subtasksInPercent = (100 / subtasksIds.length) * subtaskFinished.length;
  let container = document.getElementById("subtasks" + taskId);
  if (subtasksIds.length === 0) {
    container.innerHTML = ``;
  } else {
    container.innerHTML += `${templateRenderSubtasks(
      subtasksInPercent,
      subtaskFinished.length,
      subtasksIds.length
    )}`;
  }
}

/**
 * Renders the assigned accounts for a given task
 *
 * @param {string} taskId - The ID of the task
 */
function renderZeroAssignedAccounts(taskId) {
  let container = document.getElementById("accounts" + taskId);
  assignedAccountsIds.length === 0 ? container.innerHTML = ``: renderAssignedAccounts(container);
}

/**
 * Renders the assigned accounts for a given task
 *
 * @param {string} container - The current div
 */
function renderAssignedAccounts(container) {
  let length = assignedAccountsIds.length < 3 ? assignedAccountsIds.length : 2;
    for (let i = 0; i < length; i++) {
      let account = assignedAccounts[assignedAccountsIds[i]];
      container.innerHTML += `${getAssignedAccountsParams(account, i)}`;
    }
    assignedAccountsIds.length > 3 ? notRenderContacts(container): "";
}

/**
 * Renders the assigned accounts for a given task
 *
 * @param {string} container - The current div
 */
function notRenderContacts(container) {
  let notRendertAmount = assignedAccountsIds.length - 2;
    container.innerHTML += `
    <div style="--position: -16px" class="task_account2 bg_grey">+${notRendertAmount}</div>
  `;
}

/**
 * Generates params for templateRenderAssignedAccounts.
 * @returns {string} - The generated HTML.
 */
function getAssignedAccountsParams(account, i) {
  return templateRenderAssignedAccounts(
    account.initials,
    i === 0 ? 1 : 2,
    account.color,
    i * 8
  );
}

/**
 * Counts the number of tasks in each category
 */
function countNoTask() {
  let counts = countTaskSteps();
  arrayTodo = counts.Todo;
  arrayInProgresse = counts.InProgress;
  arrayAwaitFeedback = counts.AwaitFeedback;
  arrayDone = counts.Done;
}

/**
 * Counts tasks for each step.
 * @returns {Object} - Object with task counts per category.
 */
function countTaskSteps() {
  let counts = { Todo: 0, InProgress: 0, AwaitFeedback: 0, Done: 0 };
  tasksIds.forEach((taskId) => counts[tasks[taskId].step]++);
  return counts;
}

/**
 * Renders the "no task" messages for each category
 */
function renderNoTask() {
  document.getElementById("boardTodo").innerHTML =
    arrayTodo > 0 ? "" : `<div class="board_no_task">No tasks To do</div>`;
  document.getElementById("boardInProgress").innerHTML =
    arrayInProgresse > 0 ? "" : `<div class="board_no_task">No tasks In progress</div>`;
  document.getElementById("boardAwaitFeedback").innerHTML =
    arrayAwaitFeedback > 0 ? "" : `<div class="board_no_task">No tasks Await feedback</div>`;
  document.getElementById("boardDone").innerHTML =
    arrayDone > 0 ? "" : `<div class="board_no_task">No tasks Done</div></div>`;
}

/**
 * Fetches the IDs of all tasks
 *
 * @async
 */
async function fetchTaskIds() {
  tasksIds = [];
  let taskResponse = tasks;
  let taskKeysArray = Object.keys(taskResponse);
  for (let i = 0; i < taskKeysArray.length; i++) {
    tasksIds.push(taskKeysArray[i]);
  }
}

/**
 * Fetches the finished subtasks for a given task
 *
 * @async
 */
async function fetchSubTaskFinished() {
  subtaskFinished = [];
  for (let i = 0; i < subtasksIds.length; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    if (subtask.status === "finished") {
      subtaskFinished.push(subtask);
    }
  }
}

/**
 * Fetches the IDs of all subtasks for a given task
 *
 * @async
 */
async function fetchSubTaskIds() {
  subtasksIds = [];
  try {
    if (subtasks !== null) {
      subtasksIds = Object.keys(subtasks);
    }
  } catch (err) {}
}

/**
 * Fetches the IDs of all assigned accounts for a given task
 *
 * @async
 */
async function fetchAssignedAccountsIds() {
  assignedAccountsIds = [];
  if (assignedAccounts !== undefined) {
    assignedAccountsIds = Object.keys(assignedAccounts);
  }
}

/**
 * Updates a task on the database
 *
 * @async
 * @param {string} taskId - The ID of the task to update
 */
async function putTask(taskId) {
  let task = tasks[taskId];
  await patchData("/tasks/" + taskId, {
    description: task.description,
    category: task.category,
    titel: task.titel,
    prio: task.prio,
    step: task.step,
    dueDate: task.dueDate,
  });
}

/**
 * Updates the subtasks for a given task on the database
 *
 * @async
 * @param {string} taskId - The ID of the task to update
 */
async function patchSubTask(taskId) {
  let task = tasks[currentDraggedElement];
  subtasks = task.subtasks;
  fetchSubTaskIds();
  fetchSubTaskFinished();
  for (let i = 0; i < subtasksIds.length; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    await patchData("/tasks/" + taskId + "/subtasks/" + subtaskId, {
      titel: subtask.titel,
      status: subtask.status,
    });
  }
}

/**
 * Updates the assigned accounts for a given task on the database
 *
 * @async
 * @param {string} taskId - The ID of the task to update
 */
async function patchAssignedAccounts(taskId) {
  let task = tasks[currentDraggedElement];
  assignedAccounts = task.assignedAccounts;
  fetchAssignedAccountsIds();
  for (let i = 0; i < assignedAccountsIds.length; i++) {
    let accountId = assignedAccountsIds[i];
    let account = assignedAccounts[accountId];
    await patchData("/tasks/" + taskId + "/assignedAccounts/" + accountId, {
      initials: account.initials,
      color: account.color,
      name: account.name,
    });
  }
}

/**
 * Selects the step/status of a task
 *
 * @param {string} taskStep - The step/status to set for the task
 */
function selectStep(taskStep) {
  step = taskStep;
}

/**
 * Sets the inner HTML of the "addTaskButtonCancel" element to include a cancel button with an image
 */
function addTaskBoardResetCancelButton(id) {
  let container = document.getElementById(id);
  container.innerHTML =
    'Cancel <img src="assets/img/buttonCancel.svg" alt="cancel"/>';
}

/**
 * Renders the cancel button within the add task board
 */
function addTaskBoardRenderCancelButton(id) {
  let container = document.getElementById(id);
  container.innerHTML =
    'Cancel <img src="assets/img/buttonCancelHover.svg" alt="cancel"/>';
}
