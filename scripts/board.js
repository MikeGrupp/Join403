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
  countNoTask();
  renderNoTask();
  for (let i = 0; i < tasksIds.length; i++) {
    let taskId = tasksIds[i];
    let task = tasks[taskId];
    subtasks = task.subtasks;
    assignedAccounts = task.assignedAccounts;
    fetchSubTaskIds();
    fetchSubTaskFinished();
    fetchAssignedAccountsIds();
    renderTasks(task, taskId);
    renderSubtasks(taskId);
    renderAssignedAccounts(taskId);
  }
}

/**
 * Renders a task on the board
 *
 * @async
 * @param {Object} task - The task object
 * @param {string} taskId - The ID of the task
 */
async function renderTasks(task, taskId) {
  let title = task.titel;
  let description = task.description;
  let category = task.category;
  let backgroundColorCategory = null;
  let prio = task.prio;
  let step = "board" + task.step;
  if (category === "Technical Task") {
    backgroundColorCategory = "#1fd7c1";
  } else {
    backgroundColorCategory = "#0038ff";
  }
  let container = document.getElementById(step);
  container.innerHTML += `${templateRenderTask(
    title,
    description,
    category,
    taskId,
    backgroundColorCategory,
    prio
  )}`;
}

/**
 * Renders the subtasks for a given task
 *
 * @param {string} taskId - The ID of the task
 */
function renderSubtasks(taskId) {
  let amountSubtasks = subtasksIds.length;
  let amountSubtasksFinished = subtaskFinished.length;
  let subtasksInPercent = (100 / amountSubtasks) * amountSubtasksFinished;
  let container = document.getElementById("subtasks" + taskId);
  if (amountSubtasks === 0) {
    container.innerHTML = ``;
  } else {
    container.innerHTML += `${templateRenderSubtasks(
      subtasksInPercent,
      amountSubtasksFinished,
      amountSubtasks
    )}`;
  }
}

/**
 * Renders the assigned accounts for a given task
 *
 * @param {string} taskId - The ID of the task
 */
function renderAssignedAccounts(taskId) {
  let amountAssignedAccounts = assignedAccountsIds.length;
  let container = document.getElementById("accounts" + taskId);
  let accountNr;
  if (amountAssignedAccounts === 0) {
    container.innerHTML = ``;
  } else {
    for (let i = 0; i < amountAssignedAccounts; i++) {
      let accountId = assignedAccountsIds[i];
      let account = assignedAccounts[accountId];
      let initials = account.initials;
      let color = account.color;
      let position = i * 8;
      accountNr = 2;
      if (i == 0) {
        accountNr = 1;
      }
      container.innerHTML += `${templateRenderAssignedAccounts(
        initials,
        accountNr,
        color,
        position
      )}`;
    }
  }
}

/**
 * Counts the number of tasks in each category
 */
function countNoTask() {
  for (let i = 0; i < tasksIds.length; i++) {
    let taskId = tasksIds[i];
    let task = tasks[taskId];
    let step = task.step;
    if (step == "Todo") {
      arrayTodo++;
    }
    if (step == "InProgress") {
      arrayInProgresse++;
    }
    if (step == "AwaitFeedback") {
      arrayAwaitFeedback++;
    }
    if (step == "Done") {
      arrayDone++;
    }
  }
}

/**
 * Renders the "no task" messages for each category
 */
function renderNoTask() {
  if (arrayTodo > 0) {
    document.getElementById("boardTodo").innerHTML = ``;
  }
  if (arrayInProgresse > 0) {
    document.getElementById("boardInProgress").innerHTML = ``;
  }
  if (arrayAwaitFeedback > 0) {
    document.getElementById("boardAwaitFeedback").innerHTML = ``;
  }
  if (arrayDone > 0) {
    document.getElementById("boardDone").innerHTML = ``;
  }
  if (arrayTodo == 0) {
    document.getElementById("boardTodo").innerHTML = `                
    <div class="board_no_task">No tasks To do</div>`;
  }
  if (arrayInProgresse == 0) {
    document.getElementById("boardInProgress").innerHTML = `                
    <div class="board_no_task">No tasks In progress</div>`;
  }
  if (arrayAwaitFeedback == 0) {
    document.getElementById("boardAwaitFeedback").innerHTML = `                
    <div class="board_no_task">No tasks Await feedback</div>`;
  }
  if (arrayDone == 0) {
    document.getElementById("boardDone").innerHTML = `                
    <div class="board_no_task">No tasks Done</div></div>`;
  }
}

/**
 * Fetches the IDs of all tasks
 *
 * @async
 */
async function fetchTaskIds() {
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
  let contentDescription = task.description;
  let contentCategory = task.category;
  let contentTitle = task.titel;
  let contentPrio = task.prio;
  let contentStep = task.step;
  let contentDueDate = task.dueDate;
  await patchData("/tasks/" + taskId, {
    description: contentDescription,
    category: contentCategory,
    titel: contentTitle,
    prio: contentPrio,
    step: contentStep,
    dueDate: contentDueDate,
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
    let contentTitle = subtask.titel;
    let contentStatus = subtask.status;
    await patchData("/tasks/" + taskId + "/subtasks/" + subtaskId, {
      titel: contentTitle,
      status: contentStatus,
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
    let contentInitials = account.initials;
    let contentColor = account.color;
    let contentName = account.name;
    await patchData("/tasks/" + taskId + "/assignedAccounts/" + accountId, {
      initials: contentInitials,
      color: contentColor,
      name: contentName,
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
