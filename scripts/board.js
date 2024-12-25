let tasks = [];
let subtasks = [];
const tasksIds = [];
let subtasksIds = [];
let subtaskFinished = [];
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
    fetchSubTaskIds(taskId);
    fetchSubTaskFinished(taskId);
    renderTasks(task, taskId);
  }
}

async function renderTasks(task, taskId) {
  let titel = task.titel;
  let description = task.description;
  let kategory = task.kategory;
  let amountsubtasks = subtasksIds.length;
  let amountsubtasksFinished = subtaskFinished.length;
  let subtasksInPercent = (100 / amountsubtasks) * amountsubtasksFinished;
  let backgroundColorKategory = null;
  let prio = task.prio;
  let step = "board" + task.step;

  if (kategory === "technical Task") {
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
    amountsubtasks,
    amountsubtasksFinished,
    subtasksInPercent,
    backgroundColorKategory,
    prio
  )}`;
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
  console.log(arrayTodo, arrayÎnProgresse, arrayAwaitFeedback, arrayDone);
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

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  tasks[currentDraggedElement]["step"] = category;
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
