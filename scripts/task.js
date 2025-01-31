let addTaskSubtasks = [];
let contactIds = [];
let assignedContacts = [];
let searcheContacts = [];
let statusDropDownButton = false;

async function initAddTask() {
  await load("task");
  await fetchContactsIds();
  renderDropdownContainerContacts();
}

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
    <div class="dropdown_option" onclick="addtaskAssignedContacts('${contactId}')">
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
}

function renderAddtaskAssignedContacts() {
  let container = document.getElementById("AssignedContactsContainer");
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

function searchContacts() {
  let filterword = document
    .getElementById("AddTaskAssignedTo")
    .value.toLowerCase();
  let length = filterword.length;
  searcheContacts = [];
  contactIds = [];
  fetchContactsIds();
  if (length === 0) {
    document.getElementById("AddTaskAssignedTo").value = "";
    renderDropdownContainerContacts();
  } else if (length > 0) {
    for (let i = 0; i < contactIds.length; i++) {
      let contactId = contactIds[i];
      let name = storedContacts[contactId].name.toLowerCase();
      if (name.includes(filterword)) {
        searcheContacts.push(contactId);
      }
    }
    contactIds = searcheContacts;
    renderDropdownContainerContacts();
  }
}

function addtaskAssignedContacts(contactId) {
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  let assignedContact = storedContacts[contactId];
  if (currentCheckBox.checked == false) {
    assignedContacts.push(assignedContact);
    currentCheckBox.checked = true;
  } else {
    let index = assignedContacts.findIndex((item) => item.id === contactId);
    assignedContacts.splice(index, 1);
    currentCheckBox.checked = false;
  }
  renderAddtaskAssignedContacts();
}

async function fetchContactsIds() {
  let contactResponse = storedContacts;
  let contactKeysArray = Object.keys(contactResponse);
  for (let i = 0; i < contactKeysArray.length; i++) {
    contactIds.push(contactKeysArray[i]);
  }
}

function arrowDropdownMenu() {
  if (statusDropDownButton === false) {
    document.getElementById("AddTaskAssignedTo").focus();
  } else {
    statusDropDownButton = false;
    dNone("dropdownContainer");
    rotate90("dropdownButton");
  }
}

function inputDropdownMenuBlur() {
  if (statusDropDownButton === true) {
    dNone("dropdownContainer");
    rotate90("dropdownButton");
    statusDropDownButton = false;
  }
}

function inputDropdownMenuFocus() {
  if (statusDropDownButton === false) {
    dNone("dropdownContainer");
    rotate90("dropdownButton");
    statusDropDownButton = true;
  }
}

document.addEventListener("click", function (event) {
  let maindiv = document.getElementById("dropdownContainer"); // Replace with your div's ID
  let sideDiv = document.getElementById("addTaskContactContainer"); // Another div that should not trigger closing
  if (
    maindiv &&
    !maindiv.contains(event.target) &&
    (!sideDiv || !sideDiv.contains(event.target))
  ) {
    inputDropdownMenuBlur();
  }
});

function addTaskRenderCancelButton() {
  let container = document.getElementById("addTaskButtonCancel");
  container.innerHTML =
    'Clear <img src="assets/img/button_cancel_hover.svg" alt="cancel"/>';
}

function addTaskResetCancelButton() {
  let container = document.getElementById("addTaskButtonCancel");
  container.innerHTML =
    'Clear <img src="assets/img/button_cancel.svg" alt="cancel"/>';
}

function addTaskRenderAddButton() {
  let input = document.getElementById("AddTaskSubtask").value;
  if (input.length === 0) {
    let container = document.getElementById("AddTaskSubtaskContainer");
    container.innerHTML = `
      <input
        class="input_with_button"
        placeholder="Add new subtask"
        id="AddTaskSubtask"
        name="subtask"
        type="text"
        oninput="addTaskRenderAddButton();"
      />
      <div class="delete_button" id="AddTaskSubtaskDeleteButton">
        <button class="add_button" onclick="addTaskRenderAddButtonPlusButton()">
          <img src="assets/img/Property 1=add.svg" alt="add" />
        </button>
      </div>
    `;
  }
  if (input.length > 0) {
    let container = document.getElementById("AddTaskSubtaskDeleteButton");
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
          onclick="AddTaskAddSubtask()"
          alt="add"
        />
      </button>`;
  }
  document.getElementById("AddTaskSubtask").focus();
}

function addTaskRenderAddButtonPlusButton() {
  let container = document.getElementById("AddTaskSubtaskDeleteButton");
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
        onclick="AddTaskAddSubtask()"
        alt="add"
      />
    </button>`;
  document.getElementById("AddTaskSubtask").focus();
}

function reRenderSubtask() {
  document.getElementById("AddTaskSubtask").value = "";
  addTaskRenderAddButton();
}

function AddTaskAddSubtask() {
  let input = document.getElementById("AddTaskSubtask").value;
  addTaskSubtasks.push(input);
  renderSubtaskContainer();
  reRenderSubtask();
}

function renderSubtaskContainer() {
  let container = document.getElementById("subtaskContainer");
  container.innerHTML = ``;
  for (let i = 0; i < addTaskSubtasks.length; i++) {
    let subtaskText = addTaskSubtasks[i];
    container.innerHTML += `
    <div class="addtask_subtask" id="subtask${i}" onmouseout="dNone('subtaskImg${i}')" onmouseover="dNone('subtaskImg${i}')">
      ${templateRenderSubtaskContainer(i, subtaskText)}
    </div>
    `;
  }
}

function subtaskRenderEdit(id) {
  container = document.getElementById("subtask" + id);
  toggleClassWithoutHover(id);
  let subtaskText = addTaskSubtasks[id];
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

function finishedEditSubtask(id) {
  let editText = document.getElementById("editSubtask" + id).value;
  addTaskSubtasks[id] = editText;
  container = document.getElementById("subtask" + id);
  container.innerHTML = `${templateRenderSubtaskContainer(id, editText)}`;
}

function toggleClassWithoutHover(id) {
  let container = document.getElementById("subtask" + id);
  container.classList.toggle("without_hover_background");
}

function deleteSubtask(i) {
  addTaskSubtasks.splice(i, 1);
  renderSubtaskContainer();
}

function rotate90(id) {
  document.getElementById(id).classList.toggle("rotate90");
}

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
  }
}

function renderCategory(category) {
  let Container = document.getElementById("AddTaskCategoryHeadline");
  Container.innerHTML = `${category}`;
}
