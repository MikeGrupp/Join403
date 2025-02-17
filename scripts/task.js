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
 * String representing the current step of a task. Defaults to "Todo"
 *
 * @type {string}
 */
let step = "Todo";

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
  container.innerHTML = templateRenderPrio();

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
