let tasks = [];
let tasksIds = [];
let subtasks = [];
let subtasksIds = [];
let subtaskFinished = [];
let assignedAccounts = [];
let assignedAccountsIds = [];
let arrayTodo = 0;
let arrayÎnProgresse = 0;
let arrayAwaitFeedback = 0;
let arrayDone = 0;
let currentDraggedElement;

async function initBoard() {
  tasks = await loadData("tasks/");
  fetchTaskIds();
  renderBoard();
}
async function renderBoard() {
  countNotTask();
  RenderNotTask();
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

async function renderTasks(task, taskId) {
  let titel = task.titel;
  let description = task.description;
  let kategory = task.kategory;
  let backgroundColorKategory = null;
  let prio = task.prio;
  let step = "board" + task.step;

  if (kategory === "Technical Task") {
    backgroundColorKategory = "#1fd7c1";
  } else {
    backgroundColorKategory = "#0038ff";
  }
  let container = document.getElementById(step);
  container.innerHTML += `${templateRenderTask(
    titel,
    description,
    kategory,
    taskId,
    backgroundColorKategory,
    prio
  )}`;
}

function renderSubtasks(taskId) {
  let amountsubtasks = subtasksIds.length;
  let amountsubtasksFinished = subtaskFinished.length;
  let subtasksInPercent = (100 / amountsubtasks) * amountsubtasksFinished;
  let container = document.getElementById("subtasks" + taskId);
  if (amountsubtasks === 0) {
    container.innerHTML = ``;
  } else {
    container.innerHTML += `${templateRenderSubtasks(
      subtasksInPercent,
      amountsubtasksFinished,
      amountsubtasks
    )}`;
  }
}

function renderAssignedAccounts(taskId) {
  let amountAssignedAccounts = assignedAccountsIds.length;
  let container = document.getElementById("accounts" + taskId);
  let accountnr;
  if (amountAssignedAccounts === 0) {
    container.innerHTML = ``;
  } else {
    for (let i = 0; i < amountAssignedAccounts; i++) {
      let accountId = assignedAccountsIds[i];
      let account = assignedAccounts[accountId];
      let initials = account.initials;
      let color = account.color;
      if (i == 0) {
        accountnr = 1;
      } else {
        accountnr = 2;
      }
      container.innerHTML += `${templateRenderAssignedAccounts(
        initials,
        accountnr,
        color
      )}`;
    }
  }
}

function countNotTask() {
  for (let i = 0; i < tasksIds.length; i++) {
    let taskId = tasksIds[i];
    let task = tasks[taskId];
    let step = task.step;

    if (step == "Todo") {
      arrayTodo++;
    }
    if (step == "InProgress") {
      arrayÎnProgresse++;
    }
    if (step == "AwaitFeedback") {
      arrayAwaitFeedback++;
    }
    if (step == "Done") {
      arrayDone++;
    }
  }
}

function RenderNotTask() {
  if (arrayTodo > 0) {
    document.getElementById("boardTodo").innerHTML = ``;
  }
  if (arrayÎnProgresse > 0) {
    document.getElementById("boardInProgress").innerHTML = ``;
  }
  if (arrayAwaitFeedback > 0) {
    document.getElementById("boardAwaitFeedback").innerHTML = ``;
  }
  if (arrayDone > 0) {
    document.getElementById("boardDone").innerHTML = ``;
  }

  //
  if (arrayTodo == 0) {
    document.getElementById("boardTodo").innerHTML = `                
    <div class="board_no_task">No task To do</div>`;
  }
  if (arrayÎnProgresse == 0) {
    document.getElementById("boardInProgress").innerHTML = `                
    <div class="board_no_task">No task To do</div>`;
  }
  if (arrayAwaitFeedback == 0) {
    document.getElementById("boardAwaitFeedback").innerHTML = `                
    <div class="board_no_task">No task To do</div>`;
  }
  if (arrayDone == 0) {
    document.getElementById("boardDone").innerHTML = `                
    <div class="board_no_task">No task To do</div></div>`;
  }
}

async function fetchTaskIds() {
  let taskResponse = tasks;
  let taskKeysArray = Object.keys(taskResponse);

  for (let i = 0; i < taskKeysArray.length; i++) {
    tasksIds.push(taskKeysArray[i]);
  }
}

async function fetchSubTaskFinished() {
  subtaskFinished = [];
  for (let i = 0; i < subtasksIds.length; i++) {
    subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    if (subtask.status === "finished") {
      subtaskFinished.push(subtask);
    }
  }
}

async function fetchSubTaskIds() {
  subtasksIds = [];
  if (subtasks !== null) {
    subtasksIds = Object.keys(subtasks);
  }
}

async function fetchAssignedAccountsIds() {
  assignedAccountsIds = [];
  if (assignedAccounts !== null) {
    assignedAccountsIds = Object.keys(assignedAccounts);
  }
}

async function PostTask() {
  await postData("/tasks", {
    description: "Build start page with recipe recommendation...",
    kategory: "user Story",
    titel: "Kochwelt page & Recipe Recommender",
    prio: "low",
    step: "Done",
  });
}

async function PostSubTask(TaskId) {
  await postData("/tasks/" + TaskId + "/subtasks", {
    titel: "Test test test",
    status: "finished",
  });
}

async function PostassignedAccounts(TaskId, accountId) {
  await postData("/tasks/" + TaskId + "/assignedAccounts", {
    initials: "EM",
    id: accountId,
    color: "pink_helitrope",
  });
}

async function PutTask(TaskId) {
  let task = tasks[TaskId];
  contentDescription = task.description;
  contentKategory = task.kategory;
  contentTitel = task.titel;
  contentPrio = task.prio;
  contentStep = task.step;

  await patchData("/tasks/" + TaskId, {
    description: contentDescription,
    kategory: contentKategory,
    titel: contentTitel,
    prio: contentPrio,
    step: contentStep,
  });
}

async function PatchSubTask(TaskId) {
  let task = tasks[currentDraggedElement];
  subtasks = task.subtasks;
  fetchSubTaskIds();
  fetchSubTaskFinished();
  for (let i = 0; i < subtasksIds.length; i++) {
    subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    let contentTitel = subtask.titel;
    let contentStatus = subtask.status;
    await patchData("/tasks/" + TaskId + "/subtasks/" + subtaskId, {
      titel: contentTitel,
      status: contentStatus,
    });
  }
}

async function PatchAssignedAccounts(TaskId) {
  let task = tasks[currentDraggedElement];
  assignedAccounts = task.assignedAccounts;
  fetchAssignedAccountsIds();
  for (let i = 0; i < assignedAccountsIds.length; i++) {
    let accountId = assignedAccountsIds[i];
    let account = assignedAccounts[accountId];
    let contentInitials = account.initials;
    let contentColor = account.color;
    await patchData("/tasks/" + TaskId + "/assignedAccounts/" + accountId, {
      initials: contentInitials,
      id: accountId,
      color: contentColor,
    });
  }
}

async function PatchStep(TaskId) {
  let task = tasks[TaskId];
  contentStep = task.step;
  await patchData("/tasks/" + TaskId, {
    step: contentStep,
  });
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  tasks[currentDraggedElement]["step"] = category;
  await PatchStep(currentDraggedElement);
  reRenderBoard();
}

function reRenderBoard() {
  document.getElementById("boardTodo").innerHTML = ``;
  document.getElementById("boardInProgress").innerHTML = ``;
  document.getElementById("boardAwaitFeedback").innerHTML = ``;
  document.getElementById("boardDone").innerHTML = ``;
  arrayTodo = 0;
  arrayÎnProgresse = 0;
  arrayAwaitFeedback = 0;
  arrayDone = 0;
  renderBoard();
}

function dNone(id) {
  document.getElementById(id).classList.toggle("d-none");
}

function taskMoveForward() {
  let id = null;
  let container = document.getElementById("taskDetail");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    if (pos == 35) {
      clearInterval(id);
    } else {
      pos++;
      container.style.right = pos + "vw";
    }
  }
}

function taskMoveBack() {
  let id = null;
  let container = document.getElementById("taskDetail");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    if (pos == 35) {
      clearInterval(id);
      dNone("taskdetailBg");
    } else {
      pos++;
      container.style.right = "-" + pos + "vh";
    }
  }
}

function renderDetailTask() {
  let container = document.getElementById("taskDetail");
  container.innerHTML = `${templateRenderDetailTask()}`;
  taskMoveForward();
}
