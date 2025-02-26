/**
 * Renders a task card for the board view
 *
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @param {string} category - Task category
 * @param {string} taskId - Unique identifier for the task
 * @param {string} backgroundColorCategory - CSS color for category background
 * @param {string} prio - Task priority level
 * @returns {string} HTML string containing the task card
 */
function templateRenderTask(
  title,
  description,
  category,
  taskId,
  backgroundColorCategory,
  prio
) {
  return `
      <div
        class="board_task"
        draggable="true"
        ondragstart="startDragging('${taskId}')"
        id="${taskId}"
        onclick="dNone('taskDetailBg'), initRenderDetailTask('${taskId}')"
      >
        <div class="wrapper">
          <div
            class="board_category"
            style="--backgroundCategory: ${backgroundColorCategory}"
          >${category}</div>
          <div class="task_headline">${title}</div>
          <div class="task_description">${description}</div>
          <div class="task_subtasks" id="subtasks${taskId}"></div>
          <div class="task_underline">
            <div class="task_accounts" id="accounts${taskId}"></div>
            <div class="task_important">
              <img src="assets/img/prio_${prio}.svg" alt="${prio}" />
            </div>
          </div>
        </div>
      </div>
    `;
}

/**
 * Renders the subtasks progress section
 *
 * @param {number} subtasksInPercent - Percentage of completed subtasks
 * @param {number} amountSubtasksFinished - Number of completed subtasks
 * @param {number} amountSubtasks - Total number of subtasks
 * @returns {string} HTML string containing the subtasks progress section
 */
function templateRenderSubtasks(
  subtasksInPercent,
  amountSubtasksFinished,
  amountSubtasks
) {
  return `
      <div
        class="task_progress_bar"
        style="--backgroundProgressbar: ${subtasksInPercent}%;"
      ></div>
      <div class="task_subtask_number">${amountSubtasksFinished}/${amountSubtasks} Subtasks</div>
    `;
}

/**
 * Renders the detailed task view
 *
 * @param {string} taskId - Unique identifier for the task
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @param {string} category - Task category
 * @param {string} backgroundColorCategory - CSS color for category background
 * @param {string} prio - Task priority level
 * @param {string} dueDate - Task due date
 * @returns {string} HTML string containing the detailed task view
 */
function templateRenderDetailTask(
  taskId,
  title,
  description,
  category,
  backgroundColorCategory,
  prio,
  dueDate
) {
  return ` 
    <div class="wrapper">
      <div class="task_detail_category">
        <div
          class="board_category"
          style="--backgroundCategory: ${backgroundColorCategory}"
        >${category}</div>
        <div class="detail_task_close_button">
          <img
            src="assets/img/close.svg"
            alt="close task"
            onclick="taskMoveBack('taskDetail','taskDetailBg')"
          />
        </div>
      </div>
      <div class="task_detail_headline">${title}</div>
      <div class="detail_task_information">
        <div class="detail_task_description">${description}</div>
        <div class="detail_task_due_date">
          <div class="detail_task_due_date_key">Due date:</div>
          <div class="detail_task_due_date_content">${dueDate}</div>
        </div>
        <div class="detail_task_due_date">
          <div class="detail_task_due_date_key">Priority:</div>
          <div class="detail_task_due_date_content">
            ${prio}
            <img src="assets/img/prio_${prio}.svg" alt="medium" />
          </div>
        </div>
      </div>
      <div class="task_detail_assigned_accounts">
        <div class="task_detail_assigned_accounts_key">Assigned To:</div>
        <div
          class="task_detail_assigned_accounts_content"
          id="detailAssignedAccounts"
        ></div>
      </div>
      <div class="task_detail_subtasks" id="detailSubtasks"></div>
      <div class="detail_task_edit_delete">
        <div class="detail_task_delete" onclick="deleteTaskFromTasks('${taskId}')">
          <div class="detail_task_delete_img" id="detailTaskDeleteImg"></div>
          Delete
        </div>
        <div class="detail_task_edit" onclick="initRenderEditTask('${taskId}')">
          <div class="detail_task_edit_img" id="detailTaskEditImg"></div>
          Edit
        </div>
      </div>
    </div>`;
}

/**
 * Renders assigned account details
 *
 * @param {string} name - User's full name
 * @param {string} initials - User's initials
 * @param {string} backgroundColor - CSS color class for the avatar
 * @returns {string} HTML string containing the assigned account details
 */
function templateRenderDetailAccounts(name, initials, backgroundColor) {
  return ` 
      <div class="task_detail_assigned_account_content">
        <div class="task_account1 bg_${backgroundColor}">${initials}</div>
        <div class="task_account_name">${name}</div>
      </div>`;
}

/**
 * Renders a subtask item in the detailed task view
 *
 * @param {string} title - Subtask title
 * @param {string} status - Subtask status
 * @param {string} checked - HTML checked attribute if subtask is complete
 * @param {string} taskId - Parent task identifier
 * @param {string} subtaskId - Subtask identifier
 * @returns {string} HTML string containing the subtask item
 */
function templateRenderDetailSubtasks(
  title,
  status,
  checked = "",
  taskId,
  subtaskId
) {
  return `
      <div class="task_detail_subtask">
        <input onclick="checkSubtask('${taskId}', '${subtaskId}')" type="checkbox" ${checked}/>
        <div class="subtask_text">${title}</div>
      </div>
    `;
}

/**
 * Renders the detailed task edit view
 *
 * @param {string} taskId - Unique identifier for the task
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @param {string} formattedDate - Formatted due date
 * @returns {string} HTML string containing the task edit form
 */
function templateRenderDetailEditTask(
  taskId,
  title,
  description,
  formattedDate
) {
  return `
      <div class="wrapper">
        <div
          class="editTask_closing_button"
          onclick="taskMoveBack('taskDetail','taskDetailBg')"
        >
          <div class="add_button">
            <img src="assets/img/buttonCancel.svg" alt="close" />
          </div>
        </div>
        <div class="editTask_container">
          <div class="addTask_formular_first">
            <label class="addTask_formular_headline" for="addTaskTitle">
              Title
              <div class="userFeedbackMsg d-none" id="userFeedbackTitle"></div>
            </label>
            <input
              class="input"
              placeholder="Enter a title"
              id="addTaskTitle"
              name="title"
              type="text"
              value="${title}"
            />
          </div>
          <div class="addTask_formular_second">
            <label class="addTask_formular_headline" for="addTaskDescription">
              Description
            </label>
            <textarea
              placeholder="Enter a Description"
              id="addTaskDescription"
              name="Description"
            >${description}</textarea>
          </div>
          <div class="addTask_formular_second">
            <label class="addTask_formular_headline" for="addTaskDate">
              Due Date
            </label>
            <input
              id="addTaskDate"
              value="${formattedDate}"
              class="input"
              name="Date"
              type="date"
            />
            <div class="dropdown_wrapper"></div>
          </div>
          <div class="addTask_formular_second">
            <div class="addTask_formular_headline">Prio</div>
            <div class="addTask_prio_container" id="prioContainer">
              <div
                class="addTask_prio"
                id="prioUrgent"
                onclick="renderPrio('urgent')"
              >
                Urgent
                <img src="assets/img/prio_urgent.svg" alt="Urgent" />
              </div>
              <div
                class="addTask_prio addTask_prio_focus_medium"
                id="prioMedium"
                onclick="renderPrio('medium')"
              >
                Medium
                <img src="assets/img/Prio media.svg" alt="Medium" />
              </div>
              <div class="addTask_prio" id="prioLow" onclick="renderPrio('low')">
                Low
                <img src="assets/img/prio_low.svg" alt="Low" />
              </div>
            </div>
          </div>
          <div class="addTask_formular_second">
            <label class="addTask_formular_headline" for="addTaskAssignedTo">
              Assigned to
            </label>
            <div class="addTask_subtask_container" id="addTaskContactContainer">
              <input
                class="input_with_button"
                id="addTaskAssignedTo"
                name="AssignedTo"
                type="text"
                placeholder="Select contacts to assign"
                onfocus="inputDropdownMenuFocus()"
                oninput="searchContacts()"
              />
              <div class="delete_button">
                <button class="add_button" onclick="arrowDropdownMenu()">
                  <img
                    id="dropdownButton"
                    style="width: 24px; height: 24px"
                    src="assets/img/arrowDropDown.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div class="dropdown_wrapper">
              <div class="dropdown_container d-none" id="dropdownContainer"></div>
            </div>
            <div class="dropdown_wrapper">
              <div
                class="addTask_assigned_contacts"
                id="assignedContactsContainer"
              ></div>
            </div>
            <div class="dropdown_wrapper">
              </div>
            </div>
            <div class="addTask_formular_second_subtask">
              <label class="addTask_formular_headline" for="addTaskSubtask">
                Subtask
                <div class="userFeedbackMsg d-none" id="userFeedbackSubTask"></div>
              </label>
              <div class="addTask_subtask_container" id="addTaskSubtaskContainer">
                <input
                  class="input_with_button"
                  placeholder="Add new subtask"
                  id="addTaskSubtask"
                  name="subtask"
                  type="text"
                  oninput="addTaskRenderAddButton();"
                />
                <div class="delete_button" id="addTaskSubtaskDeleteButton">
                  <button
                    class="add_button"
                    onclick="addTaskRenderAddButtonPlusButton()"
                  >
                    <img src="assets/img/Property 1=add.svg" alt="add" />
                  </button>
                </div>
              </div>
              <div class="dropdown_wrapper">
                <div class="subtask_container_edit" id="subtaskContainer"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="board_edit">
          <button class="standard_btn" onclick="editTask('${taskId}')">
            OK <img src="assets/img/check.svg" alt="Create Task" />
          </button>
        </div>
      </div>
    `;
}

/**
 * Renders assigned account avatars
 *
 * @param {string} initials - User initials
 * @param {number} accountNr - Account number for positioning
 * @param {string} color - CSS color class for the avatar
 * @param {number} position - Position offset for overlapping avatars
 * @returns {string} HTML string containing the assigned account avatar
 */
function templateRenderAssignedAccounts(initials, accountNr, color, position) {
  return `
              <div class="task_account${accountNr} bg_${color}" style="--position: -${position}px">${initials}</div>
  
  `;
}
