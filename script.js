function load() {
  renderSidebar();
}

function renderSidebar() {
  let container = document.getElementById("sidebar");
  container.innerHTML = `${templateRenderSidebar()}`;
}

function renderSidebarSummary(i) {
  let id = "summary" + i;
  let container = document.getElementById(id);
  container.innerHTML = `${templateRenderSidebarSummary(i)}`;
  sidebarFocus(id);
}

function templateRenderSidebarSummary(id) {
  if (id === 1) {
    return `
        <a class="summary_focus" href="index.html">
          <img src="assets/img/summary_focus.svg" alt="summary" />
          <p>Summary</p>
        </a>
      `;
  }
  if (id === 2) {
    return `
      <a class="summary_focus" href="task.html">
        <img src="assets/img/addTask_focus.svg" alt="addTask" />
        <p>Add Task</p>
      </a>
    `;
  }
  if (id === 3) {
    return `
      <a class="summary_focus" href="board.html">
        <img src="assets/img/board_focus.svg" alt="board" />
        <p>Board</p>
      </a>
    `;
  }
  if (id === 4) {
    return `
      <a class="summary_focus" href="contact.html">
        <img src="assets/img/contact_focus.svg" alt="contact" />
        <p>contacts</p>
      </a>
    `;
  }
}

function sidebarFocus(id) {
  document.getElementById(id).classList.add("bgSummary_focus");
}
