let tasks = [];
let tasksIds = [];
let subtasks = [];
let subtasksIds = [];
let subtaskFinished = [];
let assignedAccounts = [];
let assignedAccountsIds = [];
let searchTasks = [];
let arrayTodo = 0;
let arrayInProgresse = 0;
let arrayAwaitFeedback = 0;
let arrayDone = 0;
let currentDraggedElement;

async function initBoard() {
  tasks = await loadData("tasks/");
  fetchTaskIds();
  renderBoard();
}
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

async function renderTasks(task, taskId) {
  let title = task.titel;
  let description = task.description;
  let category = task.kategory;
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
      if (i == 0) {
        accountNr = 1;
      } else {
        accountNr = 2;
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
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    if (subtask.status === "finished") {
      subtaskFinished.push(subtask);
    }
  }
}

async function fetchSubTaskIds() {
  subtasksIds = [];
  try {
    if (subtasks !== null) {
      subtasksIds = Object.keys(subtasks);
    }
  } catch (err) {}
}

async function fetchAssignedAccountsIds() {
  assignedAccountsIds = [];
  if (assignedAccounts !== null) {
    assignedAccountsIds = Object.keys(assignedAccounts);
  }
}

async function postTask() {
  await postData("/tasks", {
    description: "Build start page with recipe recommendation...",
    kategory: "user Story",
    titel: "Kochwelt page & Recipe Recommender",
    prio: "low",
    step: "Done",
    dueDate: "15/1/2025",
  });
}

async function postSubTask(taskId) {
  await postData("/tasks/" + taskId + "/subtasks", {
    titel: "Test test test",
    status: "finished",
  });
}

async function postAssignedAccounts(taskId) {
  await postData("/tasks/" + taskId + "/assignedAccounts", {
    name: "Eliot Mannheim",
    initials: "EM",
    color: "pink_helitrope",
    id: "-1",
  });
}

async function putTask(taskId) {
  let task = tasks[taskId];
  let contentDescription = task.description;
  let contentCategory = task.kategory;
  let contentTitle = task.titel;
  let contentPrio = task.prio;
  let contentStep = task.step;
  let contentDueDate = task.dueDate;

  await patchData("/tasks/" + taskId, {
    description: contentDescription,
    kategory: contentCategory,
    titel: contentTitle,
    prio: contentPrio,
    step: contentStep,
    dueDate: contentDueDate,
  });
}

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

async function patchStep(taskId) {
  let task = tasks[taskId];
  contentStep = task.step;
  await patchData("/tasks/" + taskId, {
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
  await patchStep(currentDraggedElement);
  reRenderBoard();
}

function reRenderBoard() {
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
      dNone("taskDetailBg");
    } else {
      pos++;
      container.style.right = "-" + pos + "vh";
    }
  }
}

function renderDetailTask(taskId) {
  let task = tasks[taskId];
  let title = task.titel;
  let description = task.description;
  let category = task.kategory;
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
    title,
    description,
    category,
    backgroundColorCategory,
    prio,
    dueDate
  )}`;
  renderDetailAccounts(task);
  renderDetailSubtasks(taskId);
  taskMoveForward();
}

function renderDetailAccounts(task) {
  assignedAccounts = task.assignedAccounts;
  fetchAssignedAccountsIds();
  let amountAssignedAccounts = assignedAccountsIds.length;

  for (let i = 0; i < amountAssignedAccounts; i++) {
    let accountId = assignedAccountsIds[i];
    let account = assignedAccounts[accountId];
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

async function patchStatusSubtask(taskId, subtaskId) {
  let subtask = tasks[taskId].subtasks[subtaskId];
  contentSubtaskStatus = subtask.status;
  await patchData("/tasks/" + taskId + "/subtasks/" + subtaskId, {
    status: contentSubtaskStatus,
  });
}

function search() {
  let filterword = document.getElementById("taskSearch").value;
  let length = filterword.length;
  searchTasks = [];
  tasksIds = [];
  fetchTaskIds();
  if (length === 0) {
    document.getElementById("taskSearch").value = "";
    reRenderBoard();
  } else if (length > 2) {
    for (let i = 0; i < tasksIds.length; i++) {
      let taskId = tasksIds[i];
      let title = tasks[taskId].titel;
      let description = tasks[taskId].description;
      if (title.includes(filterword) || description.includes(filterword)) {
        searchTasks.push(taskId);
        tasksIds = searchTasks;
        reRenderBoard();
      }
    }
  } else {
    alert("It must include at least 3 letters.");
  }
}
