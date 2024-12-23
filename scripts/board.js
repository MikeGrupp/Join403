const tasksIds = [];
let subtasksIds = [];
let subtaskFinished = [];
let arrayTodo = 0;
let arrayÎnProgresse = 0;
let arrayAwaitFeedback = 0;
let arrayDone = 0;

async function renderBoard() {
  await fetchTaskIds();
  for (let i = 0; i < tasksIds.length; i++) {
    const taskId = tasksIds[i];
    await fetchSubTaskIds(taskId);
    await fetchSubTaskFinished(taskId);
    let task = await loadData("tasks/" + taskId);
    countNotTask(task);
    RenderNotTask(task);
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

function countNotTask(task) {
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
  console.log(arrayTodo, arrayÎnProgresse, arrayAwaitFeedback, arrayDone);
}

function RenderNotTask() {
  if (arrayTodo == 1) {
    document.getElementById("boardTodo").innerHTML = ``;
    arrayTodo++;
  }
  if (arrayÎnProgresse == 1) {
    document.getElementById("boardInProgress").innerHTML = ``;
    arrayÎnProgresse++;
  }
  if (arrayAwaitFeedback == 1) {
    document.getElementById("boardAwaitFeedback").innerHTML = ``;
    arrayAwaitFeedback++;
  }
  if (arrayDone == 1) {
    document.getElementById("boardDone").innerHTML = ``;
    arrayDone++;
  }
}

async function fetchTaskIds() {
  let taskResponse = await loadData("tasks");
  let taskKeysArray = Object.keys(taskResponse);

  for (let i = 0; i < taskKeysArray.length; i++) {
    tasksIds.push(taskKeysArray[i]);
  }
}

async function fetchSubTaskFinished(taskid) {
  subtaskFinished = [];
  for (let z = 0; z < subtasksIds.length; z++) {
    let subtaskId = subtasksIds[z];
    let subtask = await loadData("tasks/" + taskid + "/subtasks/" + subtaskId);
    if (subtask.status === "finished") {
      subtaskFinished.push(subtaskId);
    }
  }
}

async function fetchSubTaskIds(taskId) {
  let SubTaskResponse = await loadData("tasks/" + taskId + "/subtasks");
  subtasksIds = [];
  if (SubTaskResponse !== null) {
    let SubTaskKeysArray = Object.keys(SubTaskResponse);
    for (let i = 0; i < SubTaskKeysArray.length; i++) {
      subtasksIds.push(SubTaskKeysArray[i]);
    }
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
