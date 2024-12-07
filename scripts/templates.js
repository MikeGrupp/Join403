function templateRenderSidebar() {
  return `
    <div class="logo">
      <img src="assets/img/Logo2.svg" alt="Logo" />
    </div>
    <div class="sidebar_menu">
      <div class="sidebar_links">
        <a href="index.html" class="bgSummary" id="summary1">
          <div class="summary">
            <img src="assets/img/summary.svg" alt="summary" />
            <p>Summary</p>
          </div>
        </a>
        <a href="task.html" class="bgSummary" id="summary2">
          <div class="summary">
            <img src="assets/img/addTask.svg" alt="addTask" />
            <p>Add Task</p>
          </div>
        </a>
        <a href="board.html" class="bgSummary" id="summary3">
          <div class="summary">
            <img src="assets/img/board.svg" alt="board" />
            <p>Board</p>
          </div>
        </a>
        <a href="contact.html" class="bgSummary" id="summary4">
          <div class="summary">
            <img src="assets/img/contact.svg" alt="contact" />
            <p>Contacts</p>
          </div>
        </a>
      </div>
      <div class="sidebar_subMenu">
        <a class="summary" href="privacy.html">
          <p>Privacy Policy</p>
        </a>
        <a class="summary" href="legal_notice.html">
          <p>Legal notice</p>
        </a>
      </div>
    </div>
  `;
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
        <p>Contacts</p>
      </a>
    `;
  }
}
