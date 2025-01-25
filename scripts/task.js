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
        <button class="add_button">
          <img src="assets/img/Property 1=add.svg" alt="add" />
        </button>
      </div>
    `;
  }
  if (input.length === 1) {
    let container = document.getElementById("AddTaskSubtaskDeleteButton");
    container.innerHTML = ` 
      <button class="add_button">
        <img src="assets/img/Property 1=close.svg" alt="add" />
      </button>
      <button class="add_button2">
        <img src="assets/img/Property 1=check.svg" alt="add" />
      </button>`;
  }
  document.getElementById("AddTaskSubtask").focus();
}
