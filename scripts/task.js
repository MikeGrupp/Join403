/**
 * Array to store subtasks for a task
 *
 * @type {Array<string>}
 */
let addTaskSubtasks = [];

/**
 * Array to store contact IDs
 *
 * @type {Array<string>}
 */
let contactIds = [];

/**
 * Array to store assigned contacts
 * @type {Array<Object>}
 */
let assignedContacts = [];

/**
 * Array to store search results for contacts
 * @type {Array<string>}
 */
let searchContactsArray = [];

/**
 * Boolean to track the status of the dropdown button for contacts
 * @type {boolean}
 */
let statusDropDownButton = false;

/**
 * String representing the current priority of a task. Defaults to "medium"
 * @type {string}
 */
let currentPrio = "medium";

/**
 * String representing the category of a task
 * @type {string}
 */
let category = "";

/**
 * Boolean to track the validation status of a task form
 *
 * @type {boolean}
 */
let validation = false;

/**
 * Array to store subtasks for editing
 *
 * @type {Array<Object>}
 */
let editSubtasks = [];

/**
 * String representing the current step of a task. Defaults to "Todo"
 *
 * @type {string}
 */
let step = "Todo";

/**
 * String representing the current amount of Accounts
 *
 * @type {string}
 */
let addedAccounts = 0;

/**
 * Initializes the add task functionality. Loads task data, fetches contact IDs, and renders the contact dropdown
 * @async
 */
async function initAddTask() {
  await load("task");
  await fetchContactsIds();
  renderDropdownContainerContacts();
  assignedAccounts = [];
  assignedAccountsIds = [];
}

/**
 * Renders the dropdown container with contacts
 */
function renderDropdownContainerContacts() {
  let container = document.getElementById("dropdownContainer");
  container.innerHTML = ``;
  for (let i = 0; i < contactIds.length; i++) {
    let contactId = contactIds[i];
    let contact = storedContacts[contactId];
    let name = contact.name;
    let initials = contact.initials;
    let color = contact.color;
    container.innerHTML += `
    <div class="dropdown_option" onclick="addTaskAssignedContacts('${contactId}')">
      <div class="dropdown_name">
        <div class="task_account1 bg_${color}">
        ${initials}
        </div>
        <div>
          ${name}
        </div>
      </div>
        <input id="checkbox${contactId}" type="checkbox">
    </div>
  `;
  }
  checkAssignedContacts();
}

/**
 * Renders the assigned contacts
 */
function renderAddTaskAssignedContacts() {
  let container = document.getElementById("assignedContactsContainer");
  container.innerHTML = ``;
  for (let i = 0; i < assignedContacts.length; i++) {
    let assignedContact = assignedContacts[i];
    let initials = assignedContact.initials;
    let color = assignedContact.color;
    container.innerHTML += `
      <div class="task_account1 bg_${color}">${initials}</div>
    `;
  }
}

/**
 * Searches for contacts based on the input value
 *
 * @async
 */
async function searchContacts() {
  let filterword = document
    .getElementById("addTaskAssignedTo")
    .value.toLowerCase();
  let length = filterword.length;
  searchContactsArray = [];
  contactIds = [];
  await fetchContactsIds();
  if (length === 0) {
    document.getElementById("addTaskAssignedTo").value = "";
    renderDropdownContainerContacts();
  } else if (length > 0) {
    for (let i = 0; i < contactIds.length; i++) {
      let contactId = contactIds[i];
      let name = storedContacts[contactId].name.toLowerCase();
      if (name.includes(filterword)) {
        searchContactsArray.push(contactId);
      }
    }
    contactIds = searchContactsArray;
    renderDropdownContainerContacts();
  }
}

/**
 * Adds or removes a contact from the assigned contacts list
 *
 * @param {string} contactId - The ID of the contact to add or remove
 */
function addTaskAssignedContacts(contactId) {
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  let assignedContact = storedContacts[contactId];
  if (addedAccounts < 4) {
    if (currentCheckBox.checked == false) {
      assignedAccounts.push(assignedContact);
      assignedAccountsIds.push(assignedContact);
      assignedContacts.push(assignedContact);
      currentCheckBox.checked = true;
      addedAccounts++;
    } else {
      let index = assignedContacts.findIndex((item) => item.id === contactId);
      assignedAccounts.splice(assignedContact);
      assignedAccountsIds.splice(assignedContact);
      assignedContacts.splice(index, 1);
      currentCheckBox.checked = false;
      addedAccounts--;
    }
    document.getElementById("addTaskRequiredContacts").classList.add("d-none");
  } else {
    if (currentCheckBox.checked == true) {
      let index = assignedContacts.findIndex((item) => item.id === contactId);
      assignedAccounts.splice(assignedContact);
      assignedAccountsIds.splice(assignedContact);
      assignedContacts.splice(index, 1);
      currentCheckBox.checked = false;
      addedAccounts--;
      document
        .getElementById("addTaskRequiredContacts")
        .classList.add("d-none");
    } else {
      document
        .getElementById("addTaskRequiredContacts")
        .classList.remove("d-none");
    }
  }
  renderAddTaskAssignedContacts();
}

/**
 * Fetches contact IDs and stores them in the `contactIds` array
 *
 * @async
 */
async function fetchContactsIds() {
  setStoredContacts(await loadContacts());
  let contactResponse = storedContacts;
  let contactKeysArray = Object.keys(contactResponse);
  for (let i = 0; i < contactKeysArray.length; i++) {
    contactIds.push(contactKeysArray[i]);
  }
}

/**
 * Toggles the dropdown menu for assigned contacts
 */
function arrowDropdownMenu() {
  if (statusDropDownButton === false) {
    document.getElementById("addTaskAssignedTo").focus();
  } else {
    statusDropDownButton = false;
    dNone("dropdownContainer");
    rotate90("dropdownButton");
  }
}

/**
 * Handles the blur event on the contact dropdown input
 */
function inputDropdownMenuBlur() {
  if (statusDropDownButton === true) {
    dNone("dropdownContainer");
    rotate90("dropdownButton");
    statusDropDownButton = false;
  }
}

/**
 * Handles the focus event on the contact dropdown input
 */
function inputDropdownMenuFocus() {
  if (statusDropDownButton === false) {
    dNone("dropdownContainer");
    rotate90("dropdownButton");
    statusDropDownButton = true;
  }
}

/**
 * Renders the cancel button within the "addTaskButtonCancel" container
 */
function addTaskRenderCancelButton(id) {
  let container = document.getElementById(id);
  container.innerHTML =
    'Clear <img src="assets/img/buttonCancelHover.svg" alt="cancel"/>';
}

/**
 * Renders the cancel button within the add task board
 */
function addTaskBoardRenderCancelButton(id) {
  let container = document.getElementById(id);
  container.innerHTML =
    'Cancel <img src="assets/img/buttonCancelHover.svg" alt="cancel"/>';
}

/**
 * Adds a "Clear" button with a cancel icon to the "addTaskButtonCancel" container
 */
function addTaskResetCancelButton(id) {
  let container = document.getElementById(id);
  container.innerHTML =
    'Clear <img src="assets/img/buttonCancel.svg" alt="cancel"/>';
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
 * Dynamically renders the add subtask input field and associated buttons
 */
function addTaskRenderAddButton() {
  let input = document.getElementById("addTaskSubtask").value;
  if (input.length === 0) {
    let container = document.getElementById("addTaskSubtaskContainer");
    container.innerHTML = `
      <input
        class="input_with_button"
        placeholder="Add new subtask"
        id="addTaskSubtask"
        name="subtask"
        type="text"
        oninput="addTaskRenderAddButton();"
      />
      <div class="delete_button" id="addTaskSubtaskDeleteButton">
        <button class="add_button" onclick="addTaskRenderAddButtonPlusButton()">
          <img src="assets/img/Property 1=add.svg" alt="add" />
        </button>
      </div>
    `;
  }
  if (input.length > 0) {
    let container = document.getElementById("addTaskSubtaskDeleteButton");
    container.innerHTML = ` 
      <button
        class="add_button"
        onclick="reRenderSubtask()"
      >
        <img src="assets/img/Property 1=close.svg" alt="add" />
      </button>
      <button class="add_button2">
        <img
          src="assets/img/Property 1=check.svg"
          onclick="addTaskAddSubtask()"
          alt="add"
        />
      </button>`;
  }
  document.getElementById("addTaskSubtask").focus();
}

/**
 * Renders the add task button and the plus button within the specified container
 */
function addTaskRenderAddButtonPlusButton() {
  let container = document.getElementById("addTaskSubtaskDeleteButton");
  container.innerHTML = ` 
    <button
      class="add_button"
      onclick="reRenderSubtask()"
    >
      <img src="assets/img/Property 1=close.svg" alt="add" />
    </button>
    <button class="add_button2">
      <img
        src="assets/img/Property 1=check.svg"
        onclick="addTaskAddSubtask()"
        alt="add"
      />
    </button>`;
  document.getElementById("addTaskSubtask").focus();
}

/**
 * Clears the input field for adding subtasks and re-renders the "Add" button.
 */
function reRenderSubtask() {
  document.getElementById("addTaskSubtask").value = "";
  addTaskRenderAddButton();
}

/**
 * Adds a new task or subtask to the respective arrays and updates the UI
 */
function addTaskAddSubtask() {
  let input = document.getElementById("addTaskSubtask").value;
  addTaskSubtasks.push(input);
  let arrayEditSubtask = {
    status: "open",
    titel: input,
  };
  editSubtasks.push(arrayEditSubtask);
  renderSubtaskContainer();
  reRenderSubtask();
}

/**
 * Renders the subtask container by dynamically creating and adding subtask elements to the DOM
 */
function renderSubtaskContainer() {
  let container = document.getElementById("subtaskContainer");
  container.innerHTML = ``;
  for (let i = 0; i < addTaskSubtasks.length; i++) {
    let subtaskText = addTaskSubtasks[i];
    container.innerHTML += `
    <div class="addTask_subtask" id="subtask${i}" onmouseout="dNone('subtaskImg${i}')" onmouseover="dNone('subtaskImg${i}')">
      ${templateRenderSubtaskContainer(i, subtaskText)}
    </div>
    `;
  }
}

/**
 * Renders the subtask edit input field for a given subtask ID.
 * This function replaces the subtask text with an input field, allowing the user to edit the subtask.
 * It also adds delete and checkmark buttons for managing the subtask.
 *
 * @param {number} id - The ID of the subtask to edit
 */
function subtaskRenderEdit(id) {
  container = document.getElementById("subtask" + id);
  toggleClassWithoutHover(id);
  let subtaskText = addTaskSubtasks[id];
  document.getElementById("subtask" + id).onmouseover = null;
  document.getElementById("subtask" + id).onmouseout = null;
  container.innerHTML = `
    <div class="subtask_d_flex addTask_subtask_container">
      <input id="editSubtask${id}" type="text" style="font-size: 14px; padding: 4px 15px;" value="${subtaskText}" class="input_with_button">
      <div class="subtask_button">
        <div class="subtask_edit_button">
          <img src="assets/img/delete.svg" alt="delete" onclick="deleteSubtask(${id})">
        </div>
        <div class="subtask_delete_button">
          <img src="assets/img/Property 1=check.svg" alt="check" onclick="finishedEditSubtask(${id})">
        </div>
      </div>
      </div>
    </div>
  `;
}

/**
 * Finishes editing a subtask, updating the task list and UI
 *
 * @param {number|string} id - The ID of the subtask that was edited.  This can be a number or a string.
 */
function finishedEditSubtask(id) {
  let editText = document.getElementById("editSubtask" + id).value;
  addTaskSubtasks[id] = editText;
  editSubtasks[id].titel = editText;
  let onmouseoverId = "subtaskImg" + id;
  container = document.getElementById("subtask" + id);
  container.innerHTML = `${templateRenderSubtaskContainer(id, editText)}`;
  document.getElementById("subtask" + id).onmouseover = function () {
    dNone(onmouseoverId);
  };
  document.getElementById("subtask" + id).onmouseout = function () {
    dNone(onmouseoverId);
  };
}

/**
 * Toggles the "without_hover_background" class on the element with the specified ID.
 * The ID is dynamically generated by prefixing "subtask" to the provided input.
 *
 * @param {string|number} id - The ID of the subtask element, without the "subtask" prefix.
 *                          This will be concatenated with "subtask" to form the final ID.
 */
function toggleClassWithoutHover(id) {
  let container = document.getElementById("subtask" + id);
  container.classList.toggle("without_hover_background");
}

/**
 * Deletes a subtask at the specified index
 *
 * @param {number} i - The index of the subtask to delete
 */
function deleteSubtask(i) {
  addTaskSubtasks.splice(i, 1);
  editSubtasks.splice(i, 1);
  renderSubtaskContainer();
}

/**
 * Rotates an element 90 degrees by toggling a CSS class
 *
 * @param {string} id - The ID of the element to rotate
 */
function rotate90(id) {
  document.getElementById(id).classList.toggle("rotate90");
}

/**
 * Renders and updates the priority selection UI
 *
 * @param {string} prio - The priority to select ('low', 'medium', or 'urgent')
 */
function renderPrio(prio) {
  let container = document.getElementById("prioContainer");
  container.innerHTML = `
    <div class="addTask_prio" id="prioUrgent" onclick="renderPrio('urgent')">
      Urgent
      <img src="assets/img/prio_urgent.svg" alt="Urgent" />
    </div>
    <div class="addTask_prio" id="prioMedium" onclick="renderPrio('medium')">
      Medium
      <img src="assets/img/prio_medium.svg" alt="Medium" />
    </div>
    <div class="addTask_prio" id="prioLow" onclick="renderPrio('low')">
      Low
      <img src="assets/img/prio_low.svg" alt="Low" />
    </div>
  `;

  if (prio === "low") {
    let imgContainer = document.getElementById("prioLow");
    imgContainer.innerHTML = `
      Low
      <img src="assets/img/Prio baja.svg" alt="Low" />
    `;
    document.getElementById("prioLow").classList.add("addTask_prio_focus_low");
    currentPrio = "low";
  }

  if (prio === "medium") {
    let imgContainer = document.getElementById("prioMedium");
    imgContainer.innerHTML = `
      Medium
      <img src="assets/img/Prio media.svg" alt="Medium" />
    `;
    document
      .getElementById("prioMedium")
      .classList.add("addTask_prio_focus_medium");
    currentPrio = "medium";
  }

  if (prio === "urgent") {
    let imgContainer = document.getElementById("prioUrgent");
    imgContainer.innerHTML = `
      Urgent
      <img src="assets/img/Prio alta.svg" alt="urgent" />
    `;
    document
      .getElementById("prioUrgent")
      .classList.add("addTask_prio_focus_urgent");
    currentPrio = "urgent";
  }
}

/**
 * Renders the category headline in the UI
 *
 * @param {string} input - The category name to display
 */
function renderCategory(input) {
  category = input;
  let Container = document.getElementById("addTaskCategoryHeadline");
  Container.innerHTML = `${category}`;
}

/**
 * Adds a new task
 *
 * @async
 * @param {string} side - Indicates whether the task is added from the board or the add task page ("board" or "addTask")
 */
async function addTask(side) {
  addTaskValidation();
  if (validation === true) {
    await postTask();
    tasks = await loadData("tasks/");
    fetchTaskIds();
    let taskId = tasksIds[tasksIds.length - 1];
    await postSubtask(taskId);
    await postAssignedAccounts(taskId);
    clearAddTask();
    if (side === "board") {
      tasks = await loadData("tasks/");
      tasksIds = [];
      fetchTaskIds();
      taskMoveBack("addTaskBoard", "addTaskBoardBg");
      reRenderBoard();
    }
    createToast("successNewTask");
    if (side === "addTask") {
      setTimeout(function () {
        window.location.href = "./board.html";
      }, 925);
    }
  }
}

/**
 * Validates the input fields for adding a new task
 * Checks if the title, due date, and category are filled
 * Displays error messages and highlights invalid fields if necessary
 */
function addTaskValidation() {
  let title = document.getElementById("addTaskTitle").value;
  let dueDate = document.getElementById("addTaskDate").value;
  if (title === "") {
    dNone("addTaskRequiredTitle");
    document.getElementById("addTaskTitle").classList.add("border_red");
  } else {
    if (dueDate === "") {
      dNone("addTaskRequiredDueDate");
      document.getElementById("addTaskDate").classList.add("border_red");
    } else {
      if (category === "") {
        dNone("addTaskRequiredCategory");
        document.getElementById("addTaskCategory").classList.add("border_red");
      } else {
        validation = true;
      }
    }
  }
}

/**
 * Posts a new task to the Database
 *
 * @async
 */
async function postTask() {
  let title = document.getElementById("addTaskTitle").value;
  let description = document.getElementById("addTaskDescription").value;
  let dueDate = document.getElementById("addTaskDate").value;
  let [year, month, day] = dueDate.split("-");
  let formattedDate = `${day}/${month}/${year}`;
  await postData("/tasks", {
    description: description,
    category: category,
    titel: title,
    prio: currentPrio,
    step: step,
    dueDate: formattedDate,
  });
}

/**
 * Posts assigned account data to a specific task
 *
 * @async
 * @param {string|number} taskId - The ID of the task to which the accounts are assigned.  This could be a string or number.
 */
async function postAssignedAccounts(taskId) {
  for (let i = 0; i < assignedContacts.length; i++) {
    let contact = assignedContacts[i];
    let name = contact.name;
    let initials = contact.initials;
    let color = contact.color;
    let id = contact.id;
    await patchData("/tasks/" + taskId + "/assignedAccounts/" + id, {
      name: name,
      initials: initials,
      color: color,
      id: id,
    });
  }
}

/**
 * Posts subtasks for a given task ID
 *
 * @async
 * @param {string|number} taskId - The ID of the parent task
 */
async function postSubtask(taskId) {
  for (let i = 0; i < addTaskSubtasks.length; i++) {
    let title = addTaskSubtasks[i];
    await postData("/tasks/" + taskId + "/subtasks", {
      titel: title,
      status: "open",
    });
  }
}

/**
 * Clears the input fields and resets the state of the add task form
 */
function clearAddTask() {
  document.getElementById("addTaskTitle").value = "";
  document.getElementById("addTaskDescription").value = "";
  document.getElementById("addTaskDate").value = "";
  document.getElementById("addTaskAssignedTo").value = "";
  reRenderSubtask();
  for (let i = 0; i < contactIds.length; i++) {
    let contactId = contactIds[i];
    let currentCheckBox = document.getElementById("checkbox" + contactId);
    if ((currentCheckBox.checked = true)) {
      currentCheckBox.checked = false;
    }
  }
  assignedContacts = [];
  renderAddTaskAssignedContacts();
  renderPrio("medium");
  renderCategory("Select Task Category");
  category = "";
  addTaskSubtasks = [];
  renderSubtaskContainer();
  document.getElementById("addTaskTitle").focus();
  document.getElementById("addTaskTitle").classList.remove("border_red");
  document.getElementById("addTaskDate").classList.remove("border_red");
  document.getElementById("addTaskCategory").classList.remove("border_red");
  document.getElementById("addTaskRequiredTitle").classList.add("d-none");
  document.getElementById("addTaskRequiredDueDate").classList.add("d-none");
  document.getElementById("addTaskRequiredCategory").classList.add("d-none");
}

document
  .getElementById("addTaskSubtaskContainer")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTaskAddSubtask();
    }
  });

document.addEventListener("click", function (event) {
  let maindiv = document.getElementById("dropdownContainer");
  let sideDiv = document.getElementById("addTaskContactContainer");
  if (
    maindiv &&
    !maindiv.contains(event.target) &&
    (!sideDiv || !sideDiv.contains(event.target))
  ) {
    inputDropdownMenuBlur();
  }
});

/**
 * Edits an existing task
 *
 * @async
 * @param {string} taskId - The ID of the task to edit
 */
async function editTask(taskId) {
  await patchTask(taskId);
  await patchAssignedAccounts2(taskId);
  await patchSubtasks(taskId);
  tasks = await loadData("tasks/");
  reRenderBoard();
  taskMoveBack("taskDetail", "taskDetailBg");
  addTaskSubtasks = [];
}

/**
 * Updates an existing task with the provided details
 *
 * @async
 * @param {string} taskId - The ID of the task to be updated
 */
async function patchTask(taskId) {
  let titel = document.getElementById("addTaskTitle").value;
  let description = document.getElementById("addTaskDescription").value;
  let dueDate = document.getElementById("addTaskDate").value;
  let [year, month, day] = dueDate.split("-");
  let formattedDate = `${day}/${month}/${year}`;
  let taskStep = tasks[taskId].step;
  await patchData("/tasks/" + taskId, {
    description: description,
    titel: titel,
    prio: currentPrio,
    step: taskStep,
    dueDate: formattedDate,
  });
}

/**
 * Updates the assigned accounts for a given task
 *
 * @async
 * @param {string|number} taskId - The ID of the task to update.  This should be a string or number
 *                             that can be coerced into a string for URL construction
 */
async function patchAssignedAccounts2(taskId) {
  await deleteData("/tasks/" + taskId + "/assignedAccounts");
  await postAssignedAccounts(taskId);
}

/**
 * Patches subtasks for a given task ID.  This function deletes existing subtasks
 * and then posts updated subtasks.
 *
 * @async
 * @param {string|number} taskId - The ID of the task for which to patch subtasks.
 *                             This can be a string or a number.
 */
async function patchSubtasks(taskId) {
  await deleteData("/tasks/" + taskId + "/subtasks");
  await postEditSubtasks(taskId);
}

/**
 * Posts edited subtasks for a given task ID
 *
 * @async
 * @param {string|number} taskId - The ID of the parent task.  Should be coercible to a string
 */
async function postEditSubtasks(taskId) {
  for (let i = 0; i < editSubtasks.length; i++) {
    let editSubtask = editSubtasks[i];
    let titel = editSubtask.titel;
    let status = editSubtask.status;
    await postData("/tasks/" + taskId + "/subtasks", {
      titel: titel,
      status: status,
    });
  }
}

/**
 * Loads and populates the `editSubtasks` array with subtask objects based on `subtasksIds`
 */
function loadEditSubtasksArray() {
  let amountSubtasks = subtasksIds.length;
  editSubtasks = [];
  for (let i = 0; i < amountSubtasks; i++) {
    let subtaskId = subtasksIds[i];
    let subtask = subtasks[subtaskId];
    editSubtasks.push(subtask);
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
