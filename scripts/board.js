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
  if (assignedAccounts !== undefined) {
    assignedAccountsIds = Object.keys(assignedAccounts);
  }
}

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

async function removeExistingContactFromTasks(contactId) {
  tasks = await loadData("tasks/");
  for (const taskId in tasks) {
    if (tasks.hasOwnProperty(taskId)) {
      const task = tasks[taskId];
      if (
        task.assignedAccounts &&
        task.assignedAccounts.hasOwnProperty(contactId)
      ) {
        deleteContactFromTasks(taskId, contactId);
      }
    }
  }
  return contactId;
}

async function deleteContactFromTasks(taskId, contactId) {
  return await deleteData(
    "/tasks/" + taskId + "/assignedAccounts/" + contactId
  );
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
  removeHighlight("boardTodo");
  removeHighlight("boardInProgress");
  removeHighlight("boardAwaitFeedback");
  removeHighlight("boardDone");
  removeHighlightBorder();
  tasks[currentDraggedElement]["step"] = category;
  await patchStep(currentDraggedElement);
  reRenderBoard();
}

async function reRenderBoard() {
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

function taskMoveForward(div) {
  let id = null;
  let container = document.getElementById(div);
  let pos = 0;
  let position = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  if (div === "taskDetail") {
    position = 35;
  }
  if (div === "addTaskBoard") {
    position = 50;
  }
  if (div === "taskDetail" && window.innerWidth < 1025) {
    position = 20;
  }
  function frame() {
    if (pos == position) {
      clearInterval(id);
    } else {
      pos++;
      if (div === "taskDetail") {
        container.style.right = pos + "vw";
      }
      if (div === "addTaskBoard") {
        container.style.right = "calc(" + pos + "vw - 384px)";
      }
    }
  }
}

function taskMoveBack(div, BgDiv) {
  let id = null;
  let container = document.getElementById(div);
  let pos = 0;
  clearInterval(id);
  let position = 0;
  id = setInterval(frame, 1);
  if (div === "taskDetail") {
    position = 35;
  }
  if (div === "addTaskBoard") {
    position = 50;
  }
  if (div === "taskDetail" && window.innerWidth < 1025) {
    position = 20;
  }
  function frame() {
    if (pos == position) {
      clearInterval(id);
      dNone(BgDiv);
    } else {
      pos++;
      if (div === "taskDetail") {
        container.style.right = -pos + "vw";
      }
      if (div === "addTaskBoard") {
        container.style.right = "calc( -" + pos + "vw - 384px)";
      }
    }
  }
}

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

function renderDetailEditTask(taskId) {
  let task = tasks[taskId];
  let title = task.titel;
  let description = task.description;
  let prio = task.prio;
  let dueDate = task.dueDate;
  let [day, month, year] = dueDate.split("/");
  let formattedDate = `${year}-${month}-${day}`;
  let container = document.getElementById("taskDetail");
  container.innerHTML = `${templateRenderDetailEditTask(
    taskId,
    title,
    description,
    formattedDate
  )}`;
  renderEditAccounts(taskId);
  renderEditSubtasks(taskId);
  renderPrio(prio);
  loadEditSubtasksArray();
}

function renderEditAccounts(taskId) {
  task = tasks[taskId];
  let amountAssignedAccounts = assignedAccountsIds.length;
  assignedContacts = [];
  let container = document.getElementById("assignedContactsContainer");
  container.innerHTML = ``;
  for (let i = 0; i < amountAssignedAccounts; i++) {
    let account = assignedAccounts[i];
    let initials = account.initials;
    let color = account.color;
    assignedContacts.push(account);
    container.innerHTML += `
      <div class="task_account1 bg_${color}">${initials}</div>
    `;
  }
  renderDropdownContainerContacts();
}

function checkAssignedContacts() {
  let amountAssignedAccounts = assignedAccountsIds.length;
  for (let i = 0; i < amountAssignedAccounts; i++) {
    try {
      let account = assignedAccounts[i];
      let id = "checkbox" + account.id;
      let currentCheckBox = document.getElementById(id);
      currentCheckBox.checked = true;
    } catch (error) {}
  }
}

function renderEditSubtasks(taskId) {
  addTaskSubtasks = [];
  task = tasks[taskId];
  subtasks = task.subtasks;
  fetchSubTaskIds();
  let amountSubtasks = subtasksIds.length;

  for (let i = 0; i < amountSubtasks; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    let title = subtask.titel;
    addTaskSubtasks.push(title);
    renderSubtaskContainer();
    reRenderSubtask();
  }
}

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
  let filterword = document.getElementById("taskSearch").value.toLowerCase();
  let length = filterword.length;
  searchTasks = [];
  tasksIds = [];
  fetchTaskIds();
  if (length === 0) {
    document.getElementById("taskSearch").value = "";
    document.getElementById("BoardRequiredSearch").classList.add("d-none");
    reRenderBoard();
  } else if (length > 0) {
    for (let i = 0; i < tasksIds.length; i++) {
      let taskId = tasksIds[i];
      let title = tasks[taskId].titel.toLowerCase();
      let description = tasks[taskId].description.toLowerCase();
      if (title.includes(filterword) || description.includes(filterword)) {
        searchTasks.push(taskId);
      }
    }
    document.getElementById("BoardRequiredSearch").classList.add("d-none");
    tasksIds = searchTasks;
    reRenderBoard();
    if (searchTasks.length === 0) {
      dNone("BoardRequiredSearch");
      document.getElementById("BoardRequiredSearch").classList.remove("d-none");
    }
  }
}

document.addEventListener("keydown", function (event) {
  try {
    if (event.key === "Enter") {
      search();
    }
  } catch (error) {}
});

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function removeHighlightBorder() {
  document
    .getElementById("boardTodo")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById("boardInProgress")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById("boardAwaitFeedback")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById("boardDone")
    .classList.remove("drag_area_highlight_border");
  document
    .getElementById(currentDraggedElement)
    .classList.remove("animation_task_drag_and_drop");
}

function highlightBorder() {
  document
    .getElementById("boardTodo")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById("boardInProgress")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById("boardAwaitFeedback")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById("boardDone")
    .classList.add("drag_area_highlight_border");
  document
    .getElementById(currentDraggedElement)
    .classList.add("animation_task_drag_and_drop");
}

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

async function deleteExistingTask(taskId) {
  await deleteTask(taskId);
  return taskId;
}

async function deleteTask(taskId) {
  return await deleteData("/tasks/" + taskId);
}
