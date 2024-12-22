const tasksIds = [];
let subtasksIds = [];
let subtaskFinished = [];

async function renderTasks() {
  await fetchTaskIds();
  let container = document.getElementById("boardTodo");
  container.innerHTML = ``;
  for (let i = 0; i < tasksIds.length; i++) {
    const taskId = tasksIds[i];
    await fetchSubTaskIds(taskId);
    await fetchSubTaskFinished(taskId);
    let task = await loadData("tasks/" + taskId);
    let titel = task.titel;
    let description = task.description;
    let kategory = task.kategory;
    let amountsubtasks = subtasksIds.length;
    let amountsubtasksFinished = subtaskFinished.length;
    container.innerHTML += `${templateRenderTask(
      titel,
      description,
      kategory,
      taskId,
      amountsubtasks,
      amountsubtasksFinished
    )}`;
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
  let SubTaskKeysArray = Object.keys(SubTaskResponse);
  subtasksIds = [];

  for (let i = 0; i < SubTaskKeysArray.length; i++) {
    subtasksIds.push(SubTaskKeysArray[i]);
  }
}

async function PostTask() {
  await postData("/tasks", {
    description: "Test test test",
    kategory: "Test test test",
    titel: "Test test test",
  });
}

async function PostSubTask(TaskId) {
  await postData("/tasks/" + TaskId + "/subtasks", {
    titel: "Test test test",
    status: "finished",
  });
}
