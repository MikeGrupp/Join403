/**
 * Renders a subtask container
 *
 * @param {number} i - Subtask index
 * @param {string} subtaskText - Subtask description
 * @returns {string} HTML string containing the subtask container
 */
function templateRenderSubtaskContainer(i, subtaskText) {
  return `
        <div class="subtask_d_flex">
          <img src="assets/img/point.png" />
          ${subtaskText}
        </div>
        <div class="subtask_button d-none" id="subtaskImg${i}">
          <div class="subtask_edit_button" onclick="subtaskRenderEdit(${i})">
            <img src="assets/img/edit.svg" alt="edit" >
          </div>
          <div class="subtask_delete_button" onclick="deleteSubtask(${i})">
            <img src="assets/img/delete.svg" alt="delete" />
          </div>
        </div>
    `;
}

/**
 * Renders a Add Button
 */
function templateAddTaskRenderAddButtonWithoutInput() {
  return `
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

/**
 * Renders a Add Button
 */
function templateAddTaskRenderAddButtonWithInput() {
  return `
      <button class="add_button" onclick="reRenderSubtask()">
        <img src="assets/img/Property 1=close.svg" alt="add" />
      </button>
      <button class="add_button2">
        <img
          src="assets/img/Property 1=check.svg"
          onclick="addTaskAddSubtask()"
          alt="add"
        />
      </button>
    `;
}

/**
 * Renders a Dropdown Container for Contacts
 */
function templaterenderDropdownContainerContacts(
  contactId,
  initials,
  name,
  color
) {
  return `
      <div
        class="dropdown_option"
        onclick="addTaskAssignedContacts('${contactId}')"
      >
        <div class="dropdown_name">
          <div class="task_account1 bg_${color}">${initials}</div>
          <div>${name}</div>
        </div>
        <input
          onclick="addTaskAssignedContactsCheckbox('${contactId}')"
          id="checkbox${contactId}"
          type="checkbox"
        />
      </div>
    `;
}

/**
 * Renders a Add Button
 */
function templateAddTaskRenderAddButtonPlusButton() {
  return ` 
      <button class="add_button" onclick="reRenderSubtask()">
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

/**
 * Renders the edit function for subtasks
 */
function templateSubtaskRenderEdit(subtaskText, id) {
  return `
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
 * Renders a Prio
 */
function templateRenderPrio() {
  return `
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
}
