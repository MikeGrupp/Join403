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
 * Renders the priority selection UI container
 */
function renderPrioContainer() {
  let container = document.getElementById("prioContainer");
  container.innerHTML = templateRenderPrio();
}

/**
 * Sets up the priority data
 * 
 * @returns {object} - An object containing priority information
 */
function getPrioData() {
  return {
    low: { img: "Prio baja.svg", class: "addTask_prio_focus_low" },
    medium: { img: "Prio media.svg", class: "addTask_prio_focus_medium" },
    urgent: { img: "Prio alta.svg", class: "addTask_prio_focus_urgent" }
  };
}

/**
 * Updates the selected priority in the UI
 * 
 * @param {string} prio - The priority to select ('low', 'medium', or 'urgent')
 * @param {object} prios - The priority data
 */
function updateSelectedPrio(prio, prios) {
  if (prios[prio]) {
    let { img, class: className } = prios[prio];
    setPrioImageAndClass(prio, img, className);
    currentPrio = prio;
  }
}

/**
 * Sets the image and class for the selected priority
 * 
 * @param {string} prio - The priority
 * @param {string} img - The image filename
 * @param {string} className - The CSS class name
 */
function setPrioImageAndClass(prio, img, className) {
  let imgContainer = document.getElementById(`prio${prio.charAt(0).toUpperCase() + prio.slice(1)}`);
  imgContainer.innerHTML = `${prio.charAt(0).toUpperCase() + prio.slice(1)} <img src="assets/img/${img}" alt="${prio}" />`;
  imgContainer.classList.add(className);
}


/**
 * Renders and updates the priority selection UI
 *
 * @param {string} prio - The priority to select ('low', 'medium', or 'urgent')
 */
function renderPrio(prio) {
  renderPrioContainer();
  let prios = getPrioData();
  updateSelectedPrio(prio, prios);
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
 * Clears the input fields for task details
 */
function clearTaskInputs() {
  document.getElementById("addTaskTitle").value = "";
  document.getElementById("addTaskDescription").value = "";
  document.getElementById("addTaskDate").value = "";
  document.getElementById("addTaskAssignedTo").value = "";
}

/**
 * Resets the assigned contacts and checkboxes
 */
function resetAssignedContacts() {
  for (let i = 0; i < contactIds.length; i++) {
    let contactId = contactIds[i];
    let currentCheckBox = document.getElementById("checkbox" + contactId);
    currentCheckBox.checked = false;
  }
  assignedContacts = [];
  renderAddTaskAssignedContacts();
}

/**
 * Resets task priority, category, and subtasks
 */
function resetTaskProperties() {
  renderPrio("medium");
  renderCategory("Select Task Category");
  category = "";
  addTaskSubtasks = [];
  renderSubtaskContainer();
}

/**
 * Clears validation error styles
 */
function clearValidationErrorStyles() {
  document.getElementById("addTaskTitle").classList.remove("border_red");
  document.getElementById("addTaskDate").classList.remove("border_red");
  document.getElementById("addTaskCategory").classList.remove("border_red");
}

/**
 * Hides required field error messages
 */
function hideRequiredFieldErrors() {
  document.getElementById("addTaskRequiredTitle").classList.add("d-none");
  document.getElementById("addTaskRequiredDueDate").classList.add("d-none");
  document.getElementById("addTaskRequiredCategory").classList.add("d-none");
  document.getElementById("addTaskRequiredContacts").classList.add("d-none");
}

/**
 * Clears the add task form and resets its state
 */
function clearAddTask() {
  clearTaskInputs();
  reRenderSubtask();
  resetAssignedContacts();
  resetTaskProperties();
  clearValidationErrorStyles();
  hideRequiredFieldErrors();
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
 * Displays a message in the specified message box.
 *
 * @param {string} msg - The message to be displayed.
 * @param {string} id - The ID of the message box element.
 */
function postUserFeedback(msg, id) {
  let userFeedbackId = document.getElementById(id);
  userFeedbackId.classList.remove('d-none');
  userFeedbackId.innerHTML = msg
}