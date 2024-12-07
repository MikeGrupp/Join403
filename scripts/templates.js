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
            <p>contacts</p>
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
