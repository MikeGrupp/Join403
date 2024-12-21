const tasksIds = [];

async function renderTasks() {
  await fetchTaskIds();
  for (let i = 0; i < tasksIds.length; i++) {
    const id = tasksIds[i];
    let task = await loadData(`tasks/${id}`);
    let titel = task.titel;
    let description = task.description;
    let kategory = task.kategory;
    let container = document.getElementById("boardTodo");
    container.innerHTML += `${templateRenderTask(
      titel,
      description,
      kategory,
      id
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
