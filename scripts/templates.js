function templateRenderSidebar() {
  return `
      <div class="logo">
        <img src="assets/img/Logo2.svg" alt="Logo" />
      </div>
      <div class="sidebar_menu">
        <div class="sidebar_links">
          <a class="summary" href="index.html">
            <img src="assets/img/summary.svg" alt="summary" />
            <p>Summary</p>
          </a>
          <a class="summary" href="task.html">
            <img src="assets/img/addTask.svg" alt="addTask" />
            <p>Add Task</p>
          </a>
          <a class="summary" href="board.html">
            <img src="assets/img/board.svg" alt="board" />
            <p>Board</p>
          </a>
          <a class="summary" href="contact.html">
            <img src="assets/img/contact.svg" alt="contact" />
            <p>contacts</p>
          </a>
        </div>
        <div class="sidebar_subMenu">
          <a class="summary" href="privacy.html">
            <p>Privacy Policy</p>
          </a>
          <a class="summary" href="contact.html">
            <p>Legal notice</p>
          </a>
        </div>
      </div>
    `;
}
